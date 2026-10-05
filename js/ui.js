/**
 * CineMatch Web — módulo de tela.
 *
 * Responsabilidade: tudo que escreve no DOM — os estados da chamada de catálogo
 * (carregando, sucesso, vazio e erro), os cards de recomendação, a saudação e o
 * contador de recálculos. Não calcula nada: a fórmula é de `./modelo.js` e a
 * ordem das etapas é de `./script.js`.
 */

/**
 * Escreve a frase recebida em #resultados-status, o elemento com role="status"
 * do index.html. Usada pelo estado de erro: a frase é composta pelo chamador,
 * que é quem sabe o que falhou (rede, resposta.ok, corpo inesperado).
 */
export function exibirMensagemDeErro(texto) {
  const statusResultados = document.querySelector("#resultados-status");
  statusResultados.classList.add("mensagem-erro");
  statusResultados.textContent = texto;
}

/**
 * Monta a lista de erros do formulário dentro de #formulario-status.
 * A validação continua no módulo de fluxo; este módulo fica responsável por
 * transformar os erros em elementos visíveis e acessíveis.
 */
export function exibirErrosDeFormulario(erros) {
  const formularioStatus = document.querySelector("#formulario-status");
  formularioStatus.classList.add("mensagem-erro");
  formularioStatus.textContent = "";

  const mensagemErros = document.createElement("ul");
  mensagemErros.setAttribute("role", "alert");
  mensagemErros.setAttribute("aria-live", "assertive");

  for (let i = 0; i < erros.length; i++) {
    const itemErro = document.createElement("li");
    itemErro.textContent = erros[i];
    mensagemErros.appendChild(itemErro);
  }

  formularioStatus.appendChild(mensagemErros);
}

/**
 * Troca a tela para o catálogo: esconde o formulário e mantém o aviso de
 * persistência junto da mensagem inicial sem interpretar dados como HTML.
 * O botão "Trocar perfil" fica na seção de resultados e permanece disponível.
 */
export function mostrarResultados(usuario, aviso) {
  const secaoPerfil = document.querySelector(".secao-perfil");
  const secaoResultados = document.querySelector(".secao-resultados");
  const formPerfil = document.querySelector("#form-perfil");
  const statusResultados = document.querySelector("#resultados-status");
  const botaoTrocarPerfil = document.querySelector("#botao-trocar-perfil");

  secaoPerfil.hidden = true;
  secaoResultados.hidden = false;
  formPerfil.hidden = true;
  botaoTrocarPerfil.hidden = false;

  statusResultados.classList.remove("mensagem-erro");
  const saudacao = `Olá, ${usuario.nome}! Suas recomendações serão carregadas em seguida.`;
  statusResultados.textContent = `${saudacao}${aviso}`;
}

/**
 * Devolve a tela ao formulário e escreve a mensagem de orientação recebida.
 * O chamador limpa os campos antes desta função para iniciar uma nova coleta.
 */
export function mostrarFormulario(mensagem) {
  const secaoPerfil = document.querySelector(".secao-perfil");
  const secaoResultados = document.querySelector(".secao-resultados");
  const formPerfil = document.querySelector("#form-perfil");
  const formularioStatus = document.querySelector("#formulario-status");
  const botaoTrocarPerfil = document.querySelector("#botao-trocar-perfil");

  secaoPerfil.hidden = false;
  secaoResultados.hidden = true;
  formPerfil.hidden = false;
  botaoTrocarPerfil.hidden = true;
  formularioStatus.classList.remove("mensagem-erro");
  formularioStatus.textContent = mensagem;
}

/**
 * Escreve a frase do estado vazio em #resultados-status, com o aviso opcional
 * de falha de persistência anexado quando existe. É SUCESSO com zero resultado,
 * não falha — por isso é uma função própria, e não a de erro com texto trocado.
 */
export function exibirMensagemDeCatalogoVazio(aviso) {
  const statusResultados = document.querySelector("#resultados-status");
  statusResultados.classList.remove("mensagem-erro");
  statusResultados.textContent = `Não encontramos recomendações agora.${aviso}`;
}

/**
 * Escreve o resumo do catálogo tratado no estado de sucesso da busca.
 */
export function exibirMensagemDeCatalogoCarregado(
  totalBruto,
  totalTratado,
  aviso,
) {
  const statusResultados = document.querySelector("#resultados-status");
  statusResultados.classList.remove("mensagem-erro");
  statusResultados.textContent = `Catálogo carregado: ${totalBruto} séries disponíveis, ${totalTratado} depois do tratamento.${aviso}`;
}

/**
 * Monta um card de série recomendada e o anexa em #resultados, com os cinco
 * campos do card: título, gêneros em comum, gêneros não explorados,
 * percentual e classificação. Não limpa a lista nem percorre-a — quem faz isso
 * é renderizarCards, em js/script.js.
 *
 * @param {{ id: number, titulo: string, imagem: string, generosEmComum: string[],
 *   generosNaoExplorados: string[], percentual: string, avaliacao: number,
 *   classificacao: string }}
 *   resultado objeto devolvido por calcularCompatibilidades.
 */
const CHAVE_FAVORITOS = "cinematchFavoritos";

function lerFavoritos() {
  try {
    const favoritosSalvos = localStorage.getItem(CHAVE_FAVORITOS);
    return favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
  } catch (erro) {
    return [];
  }
}

function salvarFavoritos(favoritos) {
  try {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
  } catch (erro) {
    return false;
  }
  return true;
}

function atualizarStatusDaLista(total) {
  const status = document.querySelector("#lista-status");
  status.textContent =
    total === 0
      ? "Suas séries favoritas aparecerão aqui."
      : `${total} série(s) salva(s) na sua lista.`;
}

function renderizarListaFavoritos() {
  const favoritos = lerFavoritos();
  const container = document.querySelector("#lista-favoritos");
  const anteriores = container.querySelectorAll(".card-serie");

  for (let i = 0; i < anteriores.length; i++) {
    anteriores[i].remove();
  }

  for (let i = 0; i < favoritos.length; i++) {
    renderizarCard(favoritos[i], "#lista-favoritos");
  }
  atualizarStatusDaLista(favoritos.length);
}

function alternarFavorito(resultado) {
  const favoritos = lerFavoritos();
  const indice = favoritos.findIndex((item) => item.id === resultado.id);

  if (indice === -1) {
    favoritos.push(resultado);
  } else {
    favoritos.splice(indice, 1);
  }

  if (salvarFavoritos(favoritos)) {
    renderizarListaFavoritos();
    renderizarCardsAtualizados();
  }
}

let redesenharCardsAtualizados = function () {};

function renderizarCardsAtualizados() {
  redesenharCardsAtualizados();
}

export function iniciarListaFavoritos(redesenharCards) {
  redesenharCardsAtualizados = redesenharCards;
  renderizarListaFavoritos();
}

function favoritoEstaSalvo(id) {
  return lerFavoritos().some((item) => item.id === id);
}

export function renderizarCard(resultado, seletor = "#resultados") {
  const card = document.createElement("article");
  card.className = "card-serie";

  // A faixa mora em .midia-serie porque .badge é absolute e precisa de um ancestral posicionado.
  const midia = document.createElement("div");
  midia.className = "midia-serie";

  if (resultado.imagem !== "") {
    const cartaz = document.createElement("img");
    cartaz.className = "cartaz-serie";
    cartaz.src = resultado.imagem;
    cartaz.alt = `Pôster da série ${resultado.titulo}`;
    midia.appendChild(cartaz);
  }

  const badge = document.createElement("span");
  badge.classList.add("badge");
  if (resultado.classificacao === "Alta afinidade") {
    badge.classList.add("badge-alta");
  } else if (resultado.classificacao === "Média afinidade") {
    badge.classList.add("badge-media");
  } else {
    badge.classList.add("badge-baixa");
  }
  badge.textContent = resultado.classificacao;
  midia.appendChild(badge);

  const conteudo = document.createElement("div");
  conteudo.className = "conteudo-serie";

  const titulo = document.createElement("h3");
  titulo.className = "titulo-serie";
  titulo.textContent = resultado.titulo;
  conteudo.appendChild(titulo);

  const emComum = resultado.generosEmComum.join(", ") || "nenhum";
  const naoExplorados = resultado.generosNaoExplorados.join(", ") || "nenhum";
  const linhas = [
    `Gêneros em comum: ${emComum}`,
    `Gêneros não explorados: ${naoExplorados}`,
    `Compatibilidade: ${resultado.percentual}%`,
    `Avaliação TVMaze: ${resultado.avaliacao}/10`,
  ];
  for (let i = 0; i < linhas.length; i++) {
    const paragrafo = document.createElement("p");
    paragrafo.textContent = linhas[i];
    conteudo.appendChild(paragrafo);
  }

  const favorito = document.createElement("button");
  const estaSalvo = favoritoEstaSalvo(resultado.id);
  favorito.className = "favorito-serie";
  favorito.type = "button";
  favorito.setAttribute("aria-pressed", String(estaSalvo));
  favorito.textContent = estaSalvo
    ? "Remover da minha lista"
    : "Adicionar à minha lista";
  favorito.addEventListener("click", function () {
    alternarFavorito(resultado);
  });
  conteudo.appendChild(favorito);

  card.appendChild(midia);
  card.appendChild(conteudo);
  document.querySelector(seletor).appendChild(card);
}

/**
 * Limpa apenas os cards reais dentro de #resultados e desenha a lista recebida.
 * O template antigo foi removido do HTML; cada card nasce em renderizarCard.
 *
 * @param {Array} lista - recomendações devolvidas pelo cálculo.
 */
export function renderizarCards(lista) {
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
 * Volta os controles para a configuração inicial ao começar uma nova busca.
 */
export function resetarControlesDeResultados() {
  document.querySelector("#filtro-genero").value = "";
  document.querySelector("#ordenacao-resultados").value = "compatibilidade";
}

const CHAVE_TEMA = "cinematchTema";

/**
 * Recupera a preferência visual sem interromper a aplicação se o storage
 * estiver indisponível.
 */
function lerTemaSalvo() {
  try {
    return localStorage.getItem(CHAVE_TEMA);
  } catch (erro) {
    return null;
  }
}

function salvarTema(tema) {
  try {
    localStorage.setItem(CHAVE_TEMA, tema);
  } catch (erro) {
    // A preferência é opcional; o tema continua ativo nesta sessão.
  }
}

function atualizarBotaoDeTema(tema) {
  const botaoTema = document.querySelector("#botao-tema");
  const temaSepiaAtivo = tema === "sepia";
  botaoTema.setAttribute(
    "aria-label",
    temaSepiaAtivo ? "Usar tema escuro" : "Usar tema sépia",
  );
  botaoTema.setAttribute("aria-pressed", String(temaSepiaAtivo));
}

export function iniciarTema() {
  const temaInicial = lerTemaSalvo();
  const tema = temaInicial === "sepia" ? "sepia" : "escuro";
  const botaoTema = document.querySelector("#botao-tema");

  document.body.classList.toggle("tema-sepia", tema === "sepia");
  atualizarBotaoDeTema(tema);

  botaoTema.addEventListener("click", function () {
    const novoTema = document.body.classList.contains("tema-sepia")
      ? "escuro"
      : "sepia";
    document.body.classList.toggle("tema-sepia", novoTema === "sepia");
    atualizarBotaoDeTema(novoTema);
    salvarTema(novoTema);
  });
}

/**
 * Escreve a saudação de boas-vindas em #resultados-boas-vindas.
 * É o CORPO do callback: quem a recebe como argumento e decide quando
 * dispará-la é `concluirBusca`, em js/script.js.
 * @param {string} nome - nome já validado no formulário, ou o do perfil salvo.
 */
export function exibirMensagemDeBoasVindas(nome, cidade = "") {
  const boasVindas = document.querySelector("#resultados-boas-vindas");

  // Alvo próprio: #resultados-status é sobrescrito por todos os estados da chamada.
  boasVindas.textContent = "";

  if (cidade === "") {
    boasVindas.textContent = `Olá, ${nome}! Boas-vindas ao CineMatch: as recomendações abaixo vêm dos gêneros que você escolheu no perfil.`;
    return;
  }

  boasVindas.appendChild(
    document.createTextNode(`Olá ${nome}, como está em ${cidade} hoje?`),
  );
  boasVindas.appendChild(document.createElement("br"));
  boasVindas.appendChild(
    document.createTextNode(
      "Boas-vindas ao CineMatch: as recomendações abaixo vêm dos gêneros que você escolheu no perfil.",
    ),
  );
}

/**
 * Escreve na tela o total de recálculos da compatibilidade.
 * Não calcula nem guarda o número: recebe o total pronto da closure, lido em
 * js/script.js. Zero e ausência de valor caem no mesmo ramo, sem quebrar a tela.
 * @param {number} total - quantas vezes a compatibilidade foi recalculada nesta
 *   sessão.
 */
export function exibirContadorDeRecalculos(total) {
  const contador = document.querySelector("#resultados-contador");

  if (!total) {
    contador.textContent =
      "Você ainda não recalculou a compatibilidade nesta sessão.";
    return;
  }

  contador.textContent = `Quantas vezes a compatibilidade foi recalculada nesta sessão: ${total}.`;
}

// Atraso da exibição, em ms: tempo de a frase de carregando ser percebida sem a tela parecer travada.
const ATRASO_DA_EXIBICAO_MS = 800;

/**
 * Mostra o estado de carregando enquanto o fetch corre, escrevendo a frase
 * fixa em #resultados-status. É o primeiro dos três estados da chamada.
 */
export function exibirMensagemDeCarregando() {
  const statusResultados = document.querySelector("#resultados-status");
  statusResultados.classList.remove("mensagem-erro");
  statusResultados.textContent = "Buscando as melhores séries pra você...";
}

/**
 * Dispara a apresentação do resultado depois do atraso, já com o
 * estado de carregando apagado.
 * @param {Function} apresentarResultados - desenha o resultado; roda dentro do
 *   atraso, em outro ciclo de eventos, por isso quem a chama a envolve em try/catch.
 */
export function exibirResultadosComAtraso(apresentarResultados) {
  // O atraso é de exibição e nunca da chamada de rede: dentro do fetch ele atrasaria também o estado de erro.
  setTimeout(function () {
    const statusResultados = document.querySelector("#resultados-status");

    // A limpeza vem antes de qualquer card, para os dois estados nunca coexistirem.
    statusResultados.textContent = "";

    apresentarResultados();
  }, ATRASO_DA_EXIBICAO_MS);
}
