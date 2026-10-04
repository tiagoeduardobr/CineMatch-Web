/**
 * CineMatch Web — módulo de fluxo.
 *
 * Responsabilidade: formulário e validação, persistência do perfil em
 * `localStorage`, busca do catálogo real na TVMaze com `fetch` e orquestração
 * do cálculo da compatibilidade. Importa a tela de `./ui.js` e as classes de
 * `./modelo.js`.
 *
 * O arquivo roda também no Node (`node js/script.js`, da verificação): por
 * isso a inicialização fica atrás do guard `typeof document !== "undefined"`,
 * no fim, que separa o navegador do Node.
 * A página só funciona servida por `npm start` — módulos ES não carregam via
 * file://, por causa do CORS.
 */
import {
  renderizarCard,
  exibirMensagemDeErro,
  exibirErrosDeFormulario,
  exibirMensagemDeCatalogoVazio,
  exibirMensagemDeBoasVindas,
  exibirContadorDeRecalculos,
  exibirMensagemDeCarregando,
  exibirResultadosComAtraso,
} from "./ui.js";
import { Conteudo, Serie } from "./modelo.js";

const CHAVE_PERFIL = "cinematchPerfil";

/**
 * Grava o perfil em `localStorage` e devolve se conseguiu.
 * O try/catch cobre o modo de falha real do storage — cota excedida ou origem
 * bloqueada: a falha vira `false` e o fluxo segue, em vez de cortar o submit.
 */
function salvarPerfil(usuario) {
  try {
    localStorage.setItem(CHAVE_PERFIL, JSON.stringify(usuario));
    return true;
  } catch (erro) {
    return false;
  }
}

/**
 * Lê o perfil gravado e devolve o objeto, ou null quando não há perfil.
 * `!perfilSalvo` cobre o null da primeira visita e também a string vazia. O
 * try/catch cobre storage bloqueado e JSON inválido: nos dois casos, a resposta
 * é visita sem perfil, que é o caminho mais seguro.
 */
function lerPerfilSalvo() {
  try {
    const perfilSalvo = localStorage.getItem(CHAVE_PERFIL);

    if (!perfilSalvo) {
      return null;
    }

    return JSON.parse(perfilSalvo);
  } catch (erro) {
    return null;
  }
}

/**
 * Apaga o registro do perfil, tirando a chave do `localStorage`.
 * `removeItem` apaga SÓ esta chave e o getItem volta a devolver null, que é o
 * contrato da primeira visita; `clear()` apagaria todas as chaves da origem e é
 * proibido neste projeto. O try/catch é o mesmo do salvarPerfil.
 */
function limparPerfilSalvo() {
  try {
    localStorage.removeItem(CHAVE_PERFIL);
    return true;
  } catch (erro) {
    return false;
  }
}

/**
 * Troca a tela para o lado do catálogo: esconde o formulário e escreve a
 * saudação com o nome da pessoa.
 * Esconde o FORMULÁRIO, e não a .secao-perfil inteira: a seção contém o botão
 * "Trocar perfil" e esconder a seção esconderia o botão junto.
 * `aviso` entra no fim da frase e quase sempre é "" — ele só recebe texto
 * quando a gravação do perfil falhou.
 */
function mostrarResultados(usuario, aviso) {
  const secaoPerfil = document.querySelector(".secao-perfil");
  const secaoResultados = document.querySelector(".secao-resultados");
  const formPerfil = document.querySelector("#form-perfil");
  const statusResultados = document.querySelector("#resultados-status");
  const botaoTrocarPerfil = document.querySelector("#botao-trocar-perfil");

  secaoPerfil.hidden = true;
  secaoResultados.hidden = false;
  formPerfil.hidden = true;
  botaoTrocarPerfil.hidden = false;

  // A crase não é defesa contra XSS: o que defende é o textContent da linha abaixo.
  const saudacao = `Olá, ${usuario.nome}! Suas recomendações serão carregadas em seguida.`;
  statusResultados.textContent = `${saudacao}${aviso}`;
}

/**
 * Devolve o formulário para a tela, tirando o `hidden`, e escreve a `mensagem`
 * que o chamador quiser.
 * Os campos são limpos pelo chamador antes de reabrir: assim, "Trocar perfil"
 * começa uma nova coleta, sem dados do perfil anterior no meio.
 */
function mostrarFormulario(mensagem) {
  const secaoPerfil = document.querySelector(".secao-perfil");
  const secaoResultados = document.querySelector(".secao-resultados");
  const formPerfil = document.querySelector("#form-perfil");
  const formularioStatus = document.querySelector("#formulario-status");
  const botaoTrocarPerfil = document.querySelector("#botao-trocar-perfil");

  secaoPerfil.hidden = false;
  secaoResultados.hidden = true;
  formPerfil.hidden = false;
  botaoTrocarPerfil.hidden = true;
  formularioStatus.textContent = mensagem;
}

/**
 * Devolve todas as mensagens da validação do perfil.
 * A função só verifica os dados; a criação da lista acessível fica em ui.js.
 */
function validarUsuario(usuario) {
  const erros = [];

  if (usuario.nome === "") {
    erros.push("Informe seu nome.");
  }

  if (Number.isNaN(usuario.idade) || usuario.idade < 1) {
    erros.push("Informe uma idade válida.");
  }

  if (usuario.generosFavoritos.length === 0) {
    erros.push("Selecione pelo menos um gênero favorito.");
  }

  return erros;
}

/**
 * Liga o formulário e o botão "Trocar perfil": valida no submit, grava o
 * perfil, mostra os resultados e dispara a busca do catálogo.
 */
function iniciarFormulario() {
  const formPerfil = document.querySelector("#form-perfil");
  const botaoTrocarPerfil = document.querySelector("#botao-trocar-perfil");

  botaoTrocarPerfil.addEventListener("click", function () {
    const registroFoiLimpo = limparPerfilSalvo();
    formPerfil.reset();

    if (registroFoiLimpo) {
      mostrarFormulario(
        "Preencha o formulário de novo para receber outras recomendações.",
      );
    } else {
      mostrarFormulario(
        `Preencha o formulário de novo. Não conseguimos atualizar o registro deste navegador, então ele pode abrir sozinho na próxima visita.`,
      );
    }
  });

  formPerfil.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const formData = new FormData(formPerfil);
    const nome = formData.get("nome");
    const idade = Number(formData.get("idade"));
    const generosFavoritos = formData.getAll("genero");

    const usuario = {
      nome: nome.trim(),
      idade: idade,
      generosFavoritos: generosFavoritos,
    };

    const erros = validarUsuario(usuario);

    if (erros.length > 0) {
      exibirErrosDeFormulario(erros);
      return;
    }

    const persistiu = salvarPerfil(usuario);
    let aviso = "";

    if (!persistiu) {
      aviso = ` Não foi possível salvar o perfil neste navegador, então ele não será lembrado na próxima visita.`;
    }

    mostrarResultados(usuario, aviso);

    buscarCatalogo(aviso, usuario.generosFavoritos, usuario.nome);
  });
}

const URL_CATALOGO = "https://api.tvmaze.com/shows?page=0";

let catalogoBruto = [];

/**
 * Esvazia #resultados e desenha um card por série da lista.
 * O seletor é escopado em #resultados porque #template-card-serie também tem a
 * classe card-serie e é IRMÃO de #resultados: um seletor global apagaria o
 * template da página, sem erro nenhum no console.
 * @param {Array<{ titulo: string, generosEmComum: string[], generosNaoExplorados:
 *   string[], percentual: string, classificacao: string }>} lista
 *   Lista devolvida por calcularCompatibilidades.
 */
function renderizarCards(lista) {
  const container = document.querySelector("#resultados");
  const anteriores = container.querySelectorAll(".card-serie");
  for (let i = 0; i < anteriores.length; i++) {
    anteriores[i].remove();
  }
  for (let i = 0; i < lista.length; i++) {
    renderizarCard(lista[i]);
  }
}

/**
 * Encerra a busca disparando o callback que recebeu.
 * O que importa é a FORMA, não o efeito: quem recebe a função é quem decide o
 * momento de chamá-la. Chamar a saudação direto daria o mesmo texto na tela e
 * não dispararia o callback.
 * @param {string} nome - repassado ao callback como argumento.
 * @param {Function} callback - função a ser disparada; recebe `nome`.
 */
function concluirBusca(nome, callback) {
  callback(nome);
}

/**
 * Busca o catálogo real na TVMaze e leva o resultado da chamada para a tela.
 * A ordem é carregando, rede, corpo e tratamento, com qualquer
 * falha caindo no mesmo catch. `aviso` é repassado a cada destino que
 * sobrescreve #resultados-status — ver o motivo no comentário da frase de erro.
 * @param {string} aviso - recado de falha de persistência, ou "".
 * @param {string[]} generosFavoritos - gêneros do perfil, por parâmetro.
 * @param {string} nome - nome da pessoa, para a saudação de boas-vindas.
 */
async function buscarCatalogo(aviso, generosFavoritos, nome) {
  const statusResultados = document.querySelector("#resultados-status");

  renderizarCards([]);
  exibirMensagemDeCarregando();

  const mensagemDeErro = criarMensagemDeErroDaBusca(aviso);

  try {
    const resposta = await fetch(URL_CATALOGO);

    if (resposta.ok === false) {
      throw new Error(`A TVMaze respondeu com status ${resposta.status}.`);
    }

    const corpo = await resposta.json();

    if (corpo === null || corpo.length === undefined) {
      throw new Error("A resposta da TVMaze não veio como lista de séries.");
    }

    catalogoBruto = corpo;

    catalogoTratado = tratarCatalogo(catalogoBruto);
    catalogoRecomendado = calcularCompatibilidades(generosFavoritos);

    exibirResultadosComAtraso(function () {
      try {
        renderizarCards(catalogoRecomendado);

        concluirBusca(nome, exibirMensagemDeBoasVindas);

        exibirContadorDeRecalculos(contadorRecomendacoes.obterTotal());

        if (catalogoTratado.length === 0) {
          exibirMensagemDeCatalogoVazio(aviso);
        } else {
          statusResultados.textContent = `Catálogo carregado: ${catalogoBruto.length} séries disponíveis, ${catalogoTratado.length} depois do tratamento.${aviso}`;
        }
      } catch (erro) {
        tratarErroDaBusca(mensagemDeErro);
      }
    });
  } catch (erro) {
    tratarErroDaBusca(mensagemDeErro);
  }
}

/**
 * Mantém a mensagem amigável da rede em um único lugar.
 * O erro técnico não é exposto na tela; o fluxo mostra a orientação ensinada
 * para falhas de fetch e conserva o aviso de persistência quando existir.
 */
function criarMensagemDeErroDaBusca(aviso) {
  return `Não foi possível carregar as séries agora. Verifique sua conexão com a internet e tente novamente.${aviso}`;
}

/**
 * Centraliza os dois caminhos de falha da busca: rede/resposta e renderização
 * atrasada. Ambos terminam no estado de erro da interface.
 */
function tratarErroDaBusca(mensagem) {
  exibirMensagemDeErro(mensagem);
}

let catalogoTratado = [];

let catalogoRecomendado = [];

/**
 * Filtra, ordena por nota, corta nos 8 primeiros e devolve a forma
 * { id, titulo, tipo, generos, duracaoMinutos, imagem } que calcularCompatibilidades instancia.
 * A ordem filter → sort → slice → map não é intercambiável: só se ordena o que
 * sobrou do filtro, e só se corta o topo já ordenado. O sort é mutável, mas
 * reordena o array NOVO que o filter acabou de criar — catalogoBruto fica
 * intacto. `tipo` é o literal "Série" porque o campo type da TVMaze é outra
 * taxonomia, em inglês; `duracaoMinutos` recebe runtime com o null repassado
 * como está: inventar 0 seria mentir sobre a duração.
 * @param {Array} bruto lista crua devolvida pela TVMaze.
 */
function tratarCatalogo(bruto) {
  return bruto
    .filter(
      (serie) =>
        serie.genres !== null &&
        serie.genres !== undefined &&
        serie.genres.length > 0 &&
        serie.rating !== null &&
        serie.rating !== undefined &&
        serie.rating.average,
    )
    .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, 8)
    .map((serie) => ({
      id: serie.id,
      titulo: serie.name,
      tipo: "Série",
      generos: serie.genres,
      duracaoMinutos: serie.runtime,
      imagem:
        serie.image === null || serie.image === undefined
          ? ""
          : serie.image.medium,
    }));
}

/**
 * Percorre o catálogo tratado, instancia uma `Serie` para cada item e monta o
 * objeto que a tela vai consumir no card. Esta é a ORQUESTRAÇÃO: a
 * fórmula e os limiares vivem no método `calcularCompatibilidade`, em
 * js/modelo.js, e não são copiados para cá. Não reordena nem recorta — a ordem
 * é a que o filtro acima gravou.
 * @param {string[]} generosFavoritos - valores dos checkboxes, em inglês
 * @returns {Array<{ titulo: string, imagem: string, generosEmComum: string[], generosNaoExplorados: string[], percentual: string, classificacao: string }>}
 */
function calcularCompatibilidades(generosFavoritos) {
  const recomendacoes = catalogoTratado.map((item) => {
    const serie = new Serie(item.titulo, item.generos, item.duracaoMinutos);
    const compatibilidade = serie.calcularCompatibilidade(generosFavoritos);

    return {
      titulo: item.titulo,
      imagem: item.imagem,
      generosEmComum: compatibilidade.generosEmComum,
      generosNaoExplorados: compatibilidade.generosNaoExplorados,
      percentual: compatibilidade.percentual,
      classificacao: compatibilidade.classificacao,
    };
  });

  contadorRecomendacoes.incrementar();

  return recomendacoes;
}

/**
 * Cria o contador e devolve o par de funções que mexe nele.
 * O `total` só é alcançável pelas duas funções devolvidas: ninguém de fora lê
 * nem escreve, e é isso que uma closure é. Devolver o número nu tiraria a
 * parte difícil — quem o recebesse poderia alterá-lo.
 * @returns {{ incrementar: Function, obterTotal: Function }} par que opera
 *   sobre o total privado.
 */
function criarContadorDeRecomendacoes() {
  let total = 0;

  /**
   * Soma uma casa no total privado e devolve o novo valor.
   */
  function incrementar() {
    total++;
    return total;
  }

  /**
   * Lê o total privado, sem alterá-lo.
   */
  function obterTotal() {
    return total;
  }

  return {
    incrementar: incrementar,
    obterTotal: obterTotal,
  };
}

const contadorRecomendacoes = criarContadorDeRecomendacoes();

if (typeof document !== "undefined") {
  const perfilSalvo = lerPerfilSalvo();

  if (perfilSalvo) {
    mostrarResultados(perfilSalvo, "");

    buscarCatalogo("", perfilSalvo.generosFavoritos, perfilSalvo.nome);
  } else {
    mostrarFormulario("Preencha o formulário para receber recomendações.");
  }

  iniciarFormulario();
}
