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
  renderizarCards,
  exibirMensagemDeErro,
  exibirErrosDeFormulario,
  mostrarResultados,
  mostrarFormulario,
  exibirMensagemDeCatalogoVazio,
  exibirMensagemDeCatalogoCarregado,
  resetarControlesDeResultados,
  exibirMensagemDeBoasVindas,
  exibirContadorDeRecalculos,
  exibirMensagemDeCarregando,
  exibirResultadosComAtraso,
  iniciarTema,
  iniciarListaFavoritos,
} from "./ui.js";
import { Serie } from "./modelo.js";

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

const URL_CATALOGO = "https://api.tvmaze.com/shows?page=";
const PAGINAS_CATALOGO = [0, 1, 2];

let catalogoBruto = [];

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
 * Cidades de referência usadas para encontrar a mais próxima da localização.
 * A lista local segue o exemplo do exercício `ceu-aberto-cidade`: não há
 * geocodificação externa nem envio de coordenadas para outro serviço.
 */
const cidadesDeReferencia = [
  { nome: "Florianópolis", latitude: -27.5954, longitude: -48.548 },
  { nome: "São José", latitude: -27.6136, longitude: -48.6366 },
  { nome: "Palhoça", latitude: -27.6453, longitude: -48.6697 },
  { nome: "Biguaçu", latitude: -27.4941, longitude: -48.6556 },
  { nome: "Blumenau", latitude: -26.9194, longitude: -49.0661 },
  { nome: "Brusque", latitude: -27.0979, longitude: -48.9107 },
  { nome: "Joinville", latitude: -26.3045, longitude: -48.8487 },
  { nome: "Itajaí", latitude: -26.9101, longitude: -48.6705 },
  { nome: "Balneário Camboriú", latitude: -26.9926, longitude: -48.6352 },
  { nome: "Navegantes", latitude: -26.8946, longitude: -48.6546 },
  { nome: "Jaraguá do Sul", latitude: -26.4851, longitude: -49.0713 },
  { nome: "São Bento do Sul", latitude: -26.2505, longitude: -49.3785 },
  { nome: "Rio do Sul", latitude: -27.2143, longitude: -49.643 },
  { nome: "Lages", latitude: -27.815, longitude: -50.3264 },
  { nome: "Chapecó", latitude: -27.1004, longitude: -52.6152 },
  { nome: "Concórdia", latitude: -27.2342, longitude: -52.0279 },
  { nome: "Caçador", latitude: -26.7757, longitude: -51.012 },
  { nome: "Videira", latitude: -27.0083, longitude: -51.1517 },
  { nome: "Criciúma", latitude: -28.6775, longitude: -49.3697 },
  { nome: "Tubarão", latitude: -28.4713, longitude: -49.0144 },
  { nome: "Araranguá", latitude: -28.9358, longitude: -49.4858 },
  { nome: "Mafra", latitude: -26.1114, longitude: -49.8052 },
  { nome: "São Paulo", latitude: -23.5505, longitude: -46.6333 },
  { nome: "Curitiba", latitude: -25.4284, longitude: -49.2733 },
  { nome: "Porto Alegre", latitude: -30.0346, longitude: -51.2177 },
  { nome: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729 },
];

function distanciaAte(cidade, latitude, longitude) {
  return (
    Math.abs(cidade.latitude - latitude) +
    Math.abs(cidade.longitude - longitude)
  );
}

function cidadeMaisProxima(latitude, longitude) {
  let maisProxima = cidadesDeReferencia[0];

  for (let i = 1; i < cidadesDeReferencia.length; i++) {
    const cidade = cidadesDeReferencia[i];

    if (
      distanciaAte(cidade, latitude, longitude) <
      distanciaAte(maisProxima, latitude, longitude)
    ) {
      maisProxima = cidade;
    }
  }

  return maisProxima;
}

/**
 * Usa a permissão de localização para personalizar a saudação com a cidade
 * de referência mais próxima. A recusa não interrompe as recomendações.
 */
function solicitarSaudacaoComGeolocalizacao(nome) {
  if (!("geolocation" in navigator)) {
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (posicao) {
      const cidade = cidadeMaisProxima(
        posicao.coords.latitude,
        posicao.coords.longitude,
      );
      exibirMensagemDeBoasVindas(nome, cidade.nome);
    },
    function () {
      // Recusar a permissão não altera o fluxo das recomendações.
    },
  );
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
  generoSelecionado = "";
  ordenacaoSelecionada = "compatibilidade";
  termoPesquisa = "";
  document.querySelector("#campo-pesquisa").value = "";
  renderizarCards([]);
  resetarControlesDeResultados();
  exibirMensagemDeCarregando();

  const mensagemDeErro = criarMensagemDeErroDaBusca(aviso);

  try {
    const respostas = await Promise.all(
      PAGINAS_CATALOGO.map((pagina) => buscarPaginaCatalogo(pagina)),
    );

    catalogoBruto = [];
    for (let i = 0; i < respostas.length; i++) {
      for (let j = 0; j < respostas[i].length; j++) {
        catalogoBruto.push(respostas[i][j]);
      }
    }

    catalogoTratado = tratarCatalogo(catalogoBruto);
    catalogoRecomendado = calcularCompatibilidades(generosFavoritos);

    exibirResultadosComAtraso(function () {
      try {
        renderizarCards(ordenarEFiltrarRecomendacoes());

        concluirBusca(nome, exibirMensagemDeBoasVindas);
        solicitarSaudacaoComGeolocalizacao(nome);

        exibirContadorDeRecalculos(contadorRecomendacoes.obterTotal());

        if (catalogoTratado.length === 0) {
          exibirMensagemDeCatalogoVazio(aviso);
        } else {
          exibirMensagemDeCatalogoCarregado(
            catalogoBruto.length,
            catalogoTratado.length,
            aviso,
          );
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
 * Busca uma página da TVMaze e valida seu contrato antes de devolvê-la.
 * A página é uma unidade da busca, mas qualquer falha é tratada pelo catch
 * principal para que a interface não mostre um catálogo incompleto.
 */
async function buscarPaginaCatalogo(pagina) {
  const resposta = await fetch(`${URL_CATALOGO}${pagina}`);

  if (resposta.ok === false) {
    throw new Error(`A TVMaze respondeu com status ${resposta.status}.`);
  }

  const corpo = await resposta.json();

  if (corpo === null || corpo.length === undefined) {
    throw new Error("A resposta da TVMaze não veio como lista de séries.");
  }

  return corpo;
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

let generoSelecionado = "";
let ordenacaoSelecionada = "compatibilidade";

/**
 * Liga os controles de resultado uma única vez e redesenha a lista sempre que
 * uma preferência muda. A lista original permanece intacta para permitir
 * trocar o filtro sem buscar o catálogo novamente.
 */
function iniciarControlesDeResultados() {
  const filtroGenero = document.querySelector("#filtro-genero");
  const ordenacaoResultados = document.querySelector("#ordenacao-resultados");

  filtroGenero.addEventListener("change", function () {
    generoSelecionado = filtroGenero.value;
    renderizarCards(ordenarEFiltrarRecomendacoes());
  });

  ordenacaoResultados.addEventListener("change", function () {
    ordenacaoSelecionada = ordenacaoResultados.value;
    renderizarCards(ordenarEFiltrarRecomendacoes());
  });
}

let termoPesquisa = "";

function iniciarNavegacao() {
  const botaoMenu = document.querySelector("#botao-menu");
  const menu = document.querySelector("#menu-navegacao");
  const botaoPesquisa = document.querySelector("#botao-pesquisar");
  const painelPesquisa = document.querySelector("#painel-pesquisa");
  const campoPesquisa = document.querySelector("#campo-pesquisa");
  const botaoPerfil = document.querySelector("#botao-perfil-nav");
  const links = menu.querySelectorAll("a");
  const capa = document.querySelector(".capa");
  const sobre = document.querySelector("#sobre");
  const secaoPerfil = document.querySelector(".secao-perfil");
  const secaoResultados = document.querySelector(".secao-resultados");
  const secaoLista = document.querySelector("#minha-lista");
  let estadoPrincipal = null;

  function preencherPerfilSalvo(perfilSalvo) {
    const campoNome = document.querySelector("#nome");
    const campoIdade = document.querySelector("#idade");
    const camposGenero = document.querySelectorAll('input[name="genero"]');

    campoNome.value = perfilSalvo.nome;
    campoIdade.value = perfilSalvo.idade;

    for (let i = 0; i < camposGenero.length; i++) {
      camposGenero[i].checked =
        perfilSalvo.generosFavoritos.indexOf(camposGenero[i].value) !== -1;
    }
  }

  function mostrarSobre() {
    if (!sobre.hidden) {
      return;
    }

    estadoPrincipal = {
      capa: capa.hidden,
      perfil: secaoPerfil.hidden,
      resultados: secaoResultados.hidden,
      lista: secaoLista.hidden,
      sobre: sobre.hidden,
    };
    capa.hidden = true;
    secaoPerfil.hidden = true;
    secaoResultados.hidden = true;
    secaoLista.hidden = true;
    sobre.hidden = false;
  }

  function mostrarLista() {
    if (
      !secaoLista.hidden &&
      capa.hidden &&
      secaoPerfil.hidden &&
      secaoResultados.hidden &&
      sobre.hidden
    ) {
      return;
    }

    estadoPrincipal = {
      capa: capa.hidden,
      perfil: secaoPerfil.hidden,
      resultados: secaoResultados.hidden,
      lista: secaoLista.hidden,
      sobre: sobre.hidden,
    };
    capa.hidden = true;
    secaoPerfil.hidden = true;
    secaoResultados.hidden = true;
    sobre.hidden = true;
    secaoLista.hidden = false;
  }

  function mostrarPerfil() {
    if (
      !secaoPerfil.hidden &&
      capa.hidden &&
      secaoResultados.hidden &&
      secaoLista.hidden &&
      sobre.hidden
    ) {
      return;
    }

    const perfilSalvo = lerPerfilSalvo();

    if (perfilSalvo) {
      preencherPerfilSalvo(perfilSalvo);
    }

    estadoPrincipal = {
      capa: capa.hidden,
      perfil: secaoPerfil.hidden,
      resultados: secaoResultados.hidden,
      lista: secaoLista.hidden,
      sobre: sobre.hidden,
    };
    capa.hidden = true;
    secaoResultados.hidden = true;
    secaoLista.hidden = true;
    sobre.hidden = true;
    secaoPerfil.hidden = false;
    document.querySelector("#form-perfil").hidden = false;
  }

  function mostrarInicio() {
    const perfilSalvo = lerPerfilSalvo();

    sobre.hidden = estadoPrincipal === null ? true : estadoPrincipal.sobre;
    capa.hidden = estadoPrincipal === null ? false : estadoPrincipal.capa;
    secaoPerfil.hidden =
      estadoPrincipal === null ? Boolean(perfilSalvo) : estadoPrincipal.perfil;
    secaoResultados.hidden =
      estadoPrincipal === null ? !perfilSalvo : estadoPrincipal.resultados;
    secaoLista.hidden =
      estadoPrincipal === null ? !perfilSalvo : estadoPrincipal.lista;
    estadoPrincipal = null;
  }

  botaoMenu.addEventListener("click", function () {
    const aberto = menu.classList.toggle("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute(
      "aria-label",
      aberto ? "Fechar menu de navegação" : "Abrir menu de navegação",
    );
  });

  botaoPesquisa.addEventListener("click", function () {
    const aberto = painelPesquisa.hidden;
    painelPesquisa.hidden = !aberto;
    botaoPesquisa.setAttribute("aria-expanded", String(aberto));

    if (aberto) {
      campoPesquisa.focus();
    }
  });

  campoPesquisa.addEventListener("input", function () {
    termoPesquisa = campoPesquisa.value.trim().toLocaleLowerCase("pt-BR");
    renderizarCards(ordenarEFiltrarRecomendacoes());
  });

  botaoPerfil.addEventListener("click", function () {
    mostrarPerfil();
    document.querySelector("#nome").focus();
    menu.classList.remove("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      const destino = links[i].getAttribute("href");

      if (destino === "#sobre") {
        mostrarSobre();
      } else if (destino === "#minha-lista") {
        mostrarLista();
      } else if (destino === "#perfil-titulo") {
        mostrarPerfil();
      } else if (destino === "#conteudo-principal") {
        mostrarInicio();
      } else {
        mostrarInicio();
      }

      for (let j = 0; j < links.length; j++) {
        links[j].removeAttribute("aria-current");
      }
      links[i].setAttribute("aria-current", "page");
      menu.classList.remove("menu-aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
    });
  }
}

/**
 * Filtra pelo gênero escolhido e ordena uma cópia das recomendações.
 */
function ordenarEFiltrarRecomendacoes() {
  let listaVisivel = catalogoRecomendado;

  if (termoPesquisa !== "") {
    listaVisivel = listaVisivel.filter((recomendacao) =>
      recomendacao.titulo.toLocaleLowerCase("pt-BR").includes(termoPesquisa),
    );
  }

  if (generoSelecionado !== "") {
    listaVisivel = catalogoRecomendado.filter((recomendacao) =>
      recomendacao.generos.includes(generoSelecionado),
    );
  }

  const copia = listaVisivel.slice();

  copia.sort(function (a, b) {
    if (ordenacaoSelecionada === "avaliacao") {
      return b.avaliacao - a.avaliacao;
    }

    if (ordenacaoSelecionada === "titulo") {
      return a.titulo.localeCompare(b.titulo, "pt-BR");
    }

    return Number(b.percentual) - Number(a.percentual);
  });

  return copia;
}

/**
 * Filtra, ordena por nota, corta nos 8 primeiros e devolve a forma
 * { id, titulo, tipo, generos, duracaoMinutos, imagem, avaliacao } que
 * calcularCompatibilidades instancia.
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
      avaliacao: serie.rating.average,
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
 * @returns {Array<{ titulo: string, imagem: string, avaliacao: number, generos: string[], generosEmComum: string[], generosNaoExplorados: string[], percentual: string, classificacao: string }>}
 */
function calcularCompatibilidades(generosFavoritos) {
  const recomendacoes = catalogoTratado.map((item) => {
    const serie = new Serie(item.titulo, item.generos, item.duracaoMinutos);
    const compatibilidade = serie.calcularCompatibilidade(generosFavoritos);

    return {
      id: item.id,
      titulo: item.titulo,
      imagem: item.imagem,
      avaliacao: item.avaliacao,
      generos: item.generos,
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
    solicitarSaudacaoComGeolocalizacao(perfilSalvo.nome);

    buscarCatalogo("", perfilSalvo.generosFavoritos, perfilSalvo.nome);
  } else {
    mostrarFormulario("Preencha o formulário para receber recomendações.");
  }

  iniciarFormulario();
  iniciarControlesDeResultados();
  iniciarNavegacao();
  iniciarListaFavoritos(function () {
    renderizarCards(ordenarEFiltrarRecomendacoes());
  });
  iniciarTema();
}
