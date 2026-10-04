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
  statusResultados.textContent = texto;
}

/**
 * Monta a lista de erros do formulário dentro de #formulario-status.
 * A validação continua no módulo de fluxo; este módulo fica responsável por
 * transformar os erros em elementos visíveis e acessíveis.
 */
export function exibirErrosDeFormulario(erros) {
  const formularioStatus = document.querySelector("#formulario-status");
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
 * Escreve a frase do estado vazio em #resultados-status, com o aviso opcional
 * de falha de persistência anexado quando existe. É SUCESSO com zero resultado,
 * não falha — por isso é uma função própria, e não a de erro com texto trocado.
 */
export function exibirMensagemDeCatalogoVazio(aviso) {
  const statusResultados = document.querySelector("#resultados-status");
  statusResultados.textContent = `Não encontramos recomendações agora.${aviso}`;
}

/**
 * Monta um card de série recomendada e o anexa em #resultados, com os cinco
 * campos do card: título, gêneros em comum, gêneros não explorados,
 * percentual e classificação. Não limpa a lista nem percorre-a — quem faz isso
 * é renderizarCards, em js/script.js.
 *
 * @param {{ titulo: string, imagem: string, generosEmComum: string[],
 *   generosNaoExplorados: string[], percentual: string, classificacao: string }}
 *   resultado objeto devolvido por calcularCompatibilidades.
 */
export function renderizarCard(resultado) {
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
  ];
  for (let i = 0; i < linhas.length; i++) {
    const paragrafo = document.createElement("p");
    paragrafo.textContent = linhas[i];
    conteudo.appendChild(paragrafo);
  }

  card.appendChild(midia);
  card.appendChild(conteudo);
  document.querySelector("#resultados").appendChild(card);
}

/**
 * Escreve a saudação de boas-vindas em #resultados-boas-vindas.
 * É o CORPO do callback: quem a recebe como argumento e decide quando
 * dispará-la é `concluirBusca`, em js/script.js.
 * @param {string} nome - nome já validado no formulário, ou o do perfil salvo.
 */
export function exibirMensagemDeBoasVindas(nome) {
  const boasVindas = document.querySelector("#resultados-boas-vindas");

  // Alvo próprio: #resultados-status é sobrescrito por todos os estados da chamada.
  boasVindas.textContent = `Olá, ${nome}! Boas-vindas ao CineMatch: as recomendações abaixo vêm dos gêneros que você escolheu no perfil.`;
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
