/**
 * CineMatch Web — módulo de tela.
 *
 * Responsabilidade (AGENTS.md, seção 3): renderizar os cards de recomendação e
 * as mensagens de carregando, vazio e erro. JÁ FEITO NA M1-T11 (RF08): o
 * renderizarCard está escrito mais abaixo, e é ele que dá nome ao módulo.
 *
 * Esqueleto da tarefa M1-T01 (RF15 parcial): o export provisório PLACEHOLDER_UI
 * existia aqui para que o `import` do script.js resolvesse desde o primeiro dia,
 * e nada mais era funcional. JÁ FEITO NA M1-T11: ele foi apagado no mesmo passo
 * em que o renderizarCard entrou, e o que o script.js importa deste módulo são
 * agora funções.
 */

// ────────────────────────────────────────────────────────────────────────────
// ESBOÇO COMENTADO DA INTERFACE — MAPA DE TRABALHO, NÃO CÓDIGO
// ────────────────────────────────────────────────────────────────────────────
/**
 * O QUE ESTE TRECHO É
 *   O mapa do que ainda vai ser escrito neste arquivo. Cada bloco marcado com
 *   o prefixo de tarefa aponta um passo do roteiro da seção 5.1 do briefing e
 *   diz o que escrever naquele ponto, por que ele existe, de qual exercício de
 *   aula veio a técnica e o que o professor pediu no briefing.
 *
 *   NADA DAQUILO É EXECUTÁVEL. São comentários: a página funciona exatamente
 *   igual antes e depois de ler este arquivo. Citar, não copiar: a forma final
 *   é sua, e você precisa saber explicar cada linha.
 *
 *   O ESTADO DAS TASKS NÃO MORA AQUI. O `docs/KANBAN.md` é a fonte de verdade
 *   do que já está feito; nenhum checkbox muda por causa deste esboço.
 *
 * A REGRA DESTE ARQUIVO
 *   TUDO aqui toca a tela e NADA aqui calcula. Este módulo escreve no DOM e
 *   devolve o que a tela precisa; a fórmula da compatibilidade é do
 *   modelo.js e a ordem das etapas é do script.js. Se um bloco deste arquivo
 *   precisa decidir se a afinidade é alta ou média, ele está no lugar errado.
 *
 * ROTEIRO DESTE ARQUIVO (a ordem é a da seção 5.1 do briefing)
 *   M1-T06  reabrir o formulário quando o perfil é trocado
 *   M1-T07  mostrar a mensagem de erro da API
 *   M1-T08  mostrar a mensagem de catálogo vazio
 *   M1-T11  renderizar um card por série recomendada
 *   M1-T13  escrever a saudação na tela (o corpo do callback)
 *   M1-T14  mostrar o número que a closure accountou
 *   M1-T15  estado de carregando e o atraso proposital na exibição
 *   M1-T16  o alt e o aria-label dos elementos criados por aqui
 *   M1-T17  a lista final de export deste arquivo
 *
 * SOBRE A BRANCH
 *   Os blocos abaixo apontam a branch feature/cinematch-web-interface, que é
 *   a do Lucas e onde este arquivo pertence. Na prática os três .js estão
 *   hoje juntos na feature/cinematch-web, e a recomendação era manter assim até
 *   a M1-T11 implementar o renderizarCard. JÁ FEITO NA M1-T11: a implementação
 *   rodou na branch de lógica, a feature/cinematch-web, e não na do Lucas — as
 *   linhas do cabeçalho do bloco dele sobreviveram sem alteração, o rótulo, o
 *   `ETAPA 4 DE 9 · BRANCH` e o `DONO DESTA ETAPA: Lucas.`, e o que está abaixo
 *   delas é acréscimo: o `EXECUTADA EM:` e a anotação `JÁ FEITO NA M1-T11:`. O
 *   corpo do roteiro não sobreviveu, virou a implementação. DONO DESTA ETAPA
 *   continua sendo o do autor do esboço, e quem executou a etapa foi outra
 *   pessoa. O campo DONO DESTA ETAPA de cada bloco é o que importa no dia a dia.
 *
 * PLACEHOLDER_UI
 *   JÁ FEITO NA M1-T11: saiu junto com o renderizarCard, que é o que o
 *   script.js importa deste módulo agora. Ela estava acima desta região de
 *   propósito — os dois export provisório e o esboço conviviam no arquivo,
 *   e o import do script.js precisava resolver desde o primeiro dia.
 *
 * SOBRE OS CAMINHOS semana-XX/
 *   As referências a exercício de aula (semana-08/, semana-11/ e semana-12/,
 *   aqui neste arquivo) apontam para o repositório das aulas, que NÃO está
 *   clonado nesta cópia de trabalho: só o cinematch_antigo/ está. O caminho é
 *   referência, não arquivo para abrir. Se a pasta não existir no seu disco,
 *   o esboço não inventou o caminho — o repositório é que está em outro lugar.
 *
 * REGRAS DESTE MÓDULO (AGENTS.md, seções 2 e 2.1)
 *   Permitido: HTML5 semântico, CSS3 com Flexbox, JavaScript com módulos ES
 *   nativos, fetch, localStorage e o live-server via npm.
 *   Proibido: React, React Native, Vue, Angular, Next.js, qualquer outro
 *   framework JS, TypeScript, bundlers e build (Webpack, Vite, Babel), CSS
 *   Grid, Sass, CSS-in-JS, back-end, servidor ou banco de dados, fetch com
 *   POST/PUT/DELETE gravando em servidor, jQuery, axios, qualquer biblioteca
 *   não vista em aula e !important.
 *   Sem perguntar antes de usar: ?. , Object.assign, structuredClone,
 *   AbortController, IntersectionObserver, ResizeObserver, debounce,
 *   throttle, <template>, padStart e o namespace Intl. (localeCompare com
 *   "pt-BR" NÃO é esse namespace e está liberado). O método que apaga UMA
 *   chave saiu da lista porque foi ensinado; o clear, que apaga todas, não.
 *   ?? apareceu uma vez em cinematch_antigo/cinematch.js:211 e não foi
 *   ensinado: não replique.
 *   Três estados da chamada à API, sempre: carregando, vazio e erro.
 */

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T06 · RF03 · Persistir perfil no localStorage
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 1 DE 9 · BRANCH: feature/cinematch-web-interface · DEPENDE DE: M1-T05
// DONO DESTA ETAPA: Lucas.
// O QUE FAZER AQUI
//   - Escrever a função que torna o formulário visível de novo e esconde os
//     cards, para o clique no botão "Trocar perfil".
//   - O botão é do index.html (M1-T03) e o id dele é o do contrato de ids
//     registrado no cabeçalho de região do js/script.js. Combinar antes.
//   - O registro em localStorage é do Tiago, no js/script.js, na mesma
//     M1-T06. Aqui é só a parte de tela: o que muda é o atributo `hidden` do
//     formulário e do container dos cards, e mais nada. É atributo nativo do
//     HTML, que o AGENTS.md autorizou, e dispensa utilitário de CSS.
// POR QUE ESTE TRECHO EXISTE
//   O RF03 pede, além de salvar, um botão "Trocar perfil" para o caso de
//   querer recomeçar. Sem a tela ceder de volta, o botão não faz nada
//   visível: o usuário clica e a grade de cards continua na frente.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   semana-11/ceu-aberto/script.js — a forma do getItem que devolve o padrão
//   quando não há nada salvo. É a mesma ideia aplicada ao contrário: aqui o
//   padrão é "formulário à mostra", e o salvo é que esconde.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF03, pág. 6)
//   "Na próxima visita, se já existir um perfil salvo, pule o formulário e vá
//   direto para o catálogo (com um botão 'Trocar perfil' para o caso de
//   querer recomeçar)."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - Trocar de perfil recomeça a sessão: se a M1-T14 já tiver contado
//     recalculados, o contador volta a zero. Combinar a ordem entre as duas
//     etapas, uma em cada arquivo.
//   - O botão nunca pode recarregar a página, e o motivo não é o que parece. O
//     localStorage SOBREVIVE ao recarregamento — ele é por origem, não por
//     sessão — então recarregar não perde o registro. O que se perde é a
//     página: um recarregamento que caia em file:// derruba os import por
//     CORS e deixa o index.html sem nenhum JavaScript (risco 2 do quadro), e o
//     estado que só existe em memória, como o contador da M1-T14, se perde
//     junto. Por isso o clique é tratado com preventDefault e a troca é
//     resolvida na tela, como este bloco escreve.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// M1-T07 · RF04 · BUSCAR CATÁLOGO REAL VIA FETCH
// ────────────────────────────────────────────────────────────────────────────
/**
 * O QUE ESTE TRECHO FAZ
 *   Recebe uma frase pronta e a escreve em #resultados-status, o role="status"
 *   com aria-live="polite" do index.html, para a pessoa ver o resultado da
 *   busca de catálogo na própria tela.
 *
 * POR QUE ESTE TRECHO EXISTE
 *   RF04 pág. 7 do briefing: "se a busca falhar, mostrar uma mensagem de erro
 *   na tela em vez de deixar a página quebrada ou o formulário sem resposta
 *   nenhuma". O fetch mora no js/script.js, mas quem vê a falha é a pessoa
 *   usuária, e quem escreve na tela é este módulo — a regra do cabeçalho do
 *   arquivo: tudo aqui toca a tela e nada calcula. Deixar a falha só no
 *   console não conta como entrega.
 *
 * POR QUE textContent E NÃO innerHTML
 *   O destino do valor é a defesa contra XSS (AGENTS.md §7): textContent
 *   escreve o valor como texto e nunca o interpreta como marcação, enquanto
 *   innerHTML interpretaria o que quer que chegasse. A crase não muda nada
 *   nessa frente — ${} não escapa, não sanitiza e não neutraliza —, então a
 *   proteção está no destino do valor, não na sintaxe da string.
 *
 * POR QUE SOBRESCREVER #resultados-status LIMPA O CARREGANDO SEM CÓDIGO EXTRA
 *   Porque os dois estados escrevem no MESMO elemento: a frase de erro
 *   substitui a de carregando por consequência, sem nenhuma instrução extra
 *   apagando a anterior. É a regra que o esboço desta etapa cobrava — "os dois
 *   estados não podem ficar na tela ao mesmo tempo" — resolvida pelo alvo
 *   comum, não por código de limpeza.
 *
 * POR QUE A FRASE CHEGA PRONTA DE FORA
 *   Este módulo só toca a tela: quem compõe o texto é o catch do js/script.js,
 *   que é quem sabe o que falhou (rede, resposta.ok, corpo inesperado). Aqui
 *   não se decide mensagem nem causa — só se escreve o que foi recebido, e é
 *   isso que mantém o cálculo e o fluxo fora deste arquivo.
 *
 * O QUE NÃO FAZ
 *   Não despeja `erro` cru: a função recebe português, sem stack trace. A
 *   pilha de erros fica para a aba Network e o Console do DevTools, que é onde
 *   o risco 12 do quadro manda conferir a resposta bruta da TVMaze — no código
 *   entregue não entra console.log nem o erro cru do fetch na tela.
 *
 * TRECHO DO BRIEFING (docs/BRIEFING.md, RF04, pág. 7)
 *   "Não precisa ser sofisticado — o mínimo é: se a busca falhar, mostrar uma
 *   mensagem de erro na tela em vez de deixar a página quebrada ou o
 *   formulário sem resposta nenhuma."
 *
 * CONFORMIDADE
 *   - Citar, não copiar: o exemplo acima é do professor, comentado como
 *     referência. A forma final é sua, e você precisa saber explicar cada
 *     linha.
 *   - Erro de API é o estado "erro" do trio (carregando, vazio, erro). O
 *     "vazio" é da M1-T08 e o "carregando" é da M1-T15: três mensagens
 *     diferentes para três causas diferentes, e nenhuma delas é a mesma
 *     função com texto trocado ao acaso.
 */
export function exibirMensagemDeErro(texto) {
  const statusResultados = document.querySelector("#resultados-status");
  statusResultados.textContent = texto;
}

// ────────────────────────────────────────────────────────────────────────────
// M1-T08 · RF05 · TRATAR O CATÁLOGO COM MÉTODOS DE ARRAY
// ────────────────────────────────────────────────────────────────────────────
/**
 * O QUE ESTE TRECHO FAZ
 *   Escreve a frase do estado vazio em #resultados-status quando o array de
 *   catálogo tratado na M1-T08 chega com zero itens: "Não encontramos
 *   recomendações agora.", com o recado opcional de falha de persistência
 *   anexado quando existe. É a terceira face do trio (carregando, vazio,
 *   erro) que a seção 7 do AGENTS.md manda sempre tratar.
 *
 * POR QUE A FRASE É ESSA
 *   É a frase do professor, RF05 pág. 7: catálogo vazio é melhor explicado
 *   do que renderizar uma grade de cards vazia sem explicação — o esboço que
 *   este bloco consumiu trazia a citação e dizia que "a decisão de estilo é
 *   sua". O ponto final é exatamente essa decisão de estilo: ele deixa a
 *   frase autônoma e prepara a junção com o aviso logo abaixo.
 *
 * POR QUE É UMA FUNÇÃO SEPARADA DE exibirMensagemDeErro
 *   Três estados, três causas, três mensagens. Catálogo vazio é SUCESSO com
 *   zero resultado: o fetch respondeu, o corpo chegou inteiro, só o filtro é
 *   que não deixou nada de pé. API fora do ar, resposta.ok falso ou corpo
 *   inesperado são FALHA — a causa da exibirMensagemDeErro da M1-T07. Reusar
 *   aquela função com texto trocado perderia o requisito dos três estados,
 *   que é justamente o que o esboço da etapa 3 proibia.
 *
 * POR QUE aviso ENTRA AQUI
 *   Invariante da M1-T07: o estado de carregando apaga o recado de
 *   localStorage, então todo destino que sobrescreve #resultados-status
 *   precisa repassar o aviso, senão ele morre antes do paint. Com
 *   aviso === "" a frase-base fica intacta. A frase-base termina em ponto
 *   final e o aviso começa com espaço: a junção limpa é a mesma aritmética
 *   das frases de sucesso e de erro.
 *
 * POR QUE textContent E NÃO innerHTML
 *   O destino do valor é a defesa contra XSS (AGENTS.md §7): textContent
 *   escreve o valor como texto e nunca o interpreta como marcação, enquanto
 *   innerHTML interpretaria o que quer que chegasse. A frase aqui é fixa —
 *   ninguém digita nada neste caminho —, mas o hábito é o mesmo de sempre, e
 *   a crase não muda nada nessa frente: ${} não escapa nem sanitiza.
 *
 * POR QUE O ALVO É O MESMO #resultados-status DAS OUTRAS MENSAGENS
 *   Porque sobrescrever limpa o carregando sem código extra: os três estados
 *   escrevem no MESMO elemento (o p com role="status" do index.html), então a
 *   frase anterior some por consequência, sem nenhuma instrução de limpeza —
 *   pelo mesmo mecanismo do sucesso e do erro.
 *
 * CONTRATO DE NOME
 *   exibirMensagemDeCatalogoVazio é o nome que o js/script.js importa e o
 *   que a lista de exports da M1-T17 espera ("a mensagem de catálogo
 *   vazio"). Trocar o nome exige trocar os dois lados do módulo.
 *
 * TRECHO DO BRIEFING (docs/BRIEFING.md, RF05, pág. 7)
 *   "E se o catálogo chegar vazio (porque o RF04 caiu no catch, ou porque o
 *   filtro não sobrou nada)? Trate esse caso também — uma mensagem simples
 *   como 'Não encontramos recomendações agora' é melhor do que renderizar
 *   uma grade de cards vazia sem explicação."
 *
 * CONFORMIDADE
 *   - Citar, não copiar: a frase é a do professor e este bloco a reproduz
 *     com o ponto final da decisão de estilo; você precisa saber explicar
 *     cada linha.
 *   - Uma grade de cards vazia sem texto é o que o risco 5 do quadro trata:
 *     o vazio é estado da tela, não silêncio.
 */
export function exibirMensagemDeCatalogoVazio(aviso) {
  const statusResultados = document.querySelector("#resultados-status");
  statusResultados.textContent = `Não encontramos recomendações agora.${aviso}`;
}

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T11 · RF08 · Renderizar os cards no DOM
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 4 DE 9 · BRANCH: feature/cinematch-web-interface · DEPENDE DE: M1-T10
// DONO DESTA ETAPA: Lucas.
// EXECUTADA EM: feature/cinematch-web por Tiago em 02/10/2026:20:08, por
// decisão do usuário; ver a divergência registrada na M1-T11 do docs/KANBAN.md.
// JÁ FEITO NA M1-T11: o corpo deste bloco virou a implementação logo abaixo —
// renderizarCard. A etapa rodou; o que sobrou do roteiro é o cabeçalho e esta
// anotação.
/**
 * RF08 · M1-T11 · Monta um card de série recomendada e anexa em #resultados.
 *
 * Uma série por card, sempre com os cinco campos do RF08
 * (docs/BRIEFING.md:257): título, gêneros em comum, gêneros não explorados,
 * percentual de compatibilidade e a classificação.
 *
 * Nenhum dado da API é escrito como marcação: tudo passa por textContent, que
 * coloca o valor na tela como texto e nunca o interpreta como HTML. É o que
 * mantém o título de uma série do TVMaze longe do innerHTML, mesmo com acento,
 * aspas ou tag no meio do nome.
 *
 * A ordem dos filhos copia o template do index.html: midia primeiro, com a
 * faixa de classificação dentro, e depois o conteúdo. O badge é position
 * absolute, então precisa de um ancestral posicionado — e o único que existe na
 * árvore do card é .midia-serie (position: relative no css/style.css). Por isso
 * a faixa mora ali e não no conteúdo.
 *
 * A faixa traduz o rótulo que a Serie já calculou em classe de cor. Não é a
 * fórmula de compatibilidade de novo: os limiares 80 e 50 vivem em um lugar
 * só, no método calcularCompatibilidade de js/modelo.js. Aqui há apenas
 * rótulo virando classe, e o texto exibido é o rótulo inteiro — "Alta
 * afinidade", e não "Alta".
 *
 * Esta função não limpa a tela nem percorre a lista: quem faz isso, uma vez, é
 * renderizarCards em js/script.js. Aqui é só construção de um card.
 *
 * @param {{ titulo: string, generosEmComum: string[], generosNaoExplorados:
 *   string[], percentual: string, classificacao: string }} resultado
 *   Objeto devolvido por calcularCompatibilidades, com os cinco campos já
 *   prontos: percentual vem como string e classificacao como um dos três
 *   rótulos de afinidade.
 */
export function renderizarCard(resultado) {
  const card = document.createElement("article");
  card.className = "card-serie";

  // A faixa de classificação fica em .midia-serie porque .badge é
  // position: absolute: sem um ancestral posicionado, ela se ancoraria no
  // bloco inicial da página e apareceria fora do card.
  const midia = document.createElement("div");
  midia.className = "midia-serie";

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

  // O conteúdo é o que o css/style.css estiliza com padding e gap; as três
  // linhas são os campos que a M1-T10 passou a devolver. `generosEmComum` e
  // `percentual` — o `compatibilidade` de antes — são rótulos que o
  // cinematch_antigo/cinematch.js já batizou no bloco exibirRecomendacaoPrincipal;
  // `generosNaoExplorados` não vem desse bloco, e sim do `generosFaltantes` que
  // obterConteudosPorGenero monta e listarGenerosFaltantes e recomendarProximoGenero
  // usam. Por campo e por nome de função, nunca por linha: regra em
  // docs/KANBAN.md, Convenções técnicas.
  const conteudo = document.createElement("div");
  conteudo.className = "conteudo-serie";

  const titulo = document.createElement("h3");
  titulo.className = "titulo-serie";
  titulo.textContent = resultado.titulo;
  conteudo.appendChild(titulo);

  // Não existe filtro de afinidade no fluxo, então um array vazio é o caso
  // comum e não o raro: séries com 0% de compatibilidade renderizam aqui. O
  // join de array vazio devolve "", que leria como uma linha truncada; o
  // fallback com || deixa a linha inteira presente e legível.
  const emComum = resultado.generosEmComum.join(", ") || "nenhum";
  const naoExplorados = resultado.generosNaoExplorados.join(", ") || "nenhum";
  const linhas = [
    `Gêneros em comum: ${emComum}`,
    `Gêneros não explorados: ${naoExplorados}`,
    `Compatibilidade: ${resultado.percentual}%`,
  ];
  // Laço clássico com let i: a mesma forma de cinematch_antigo/cinematch.js:397,
  // a única do arquivo que declara o i. As formas das linhas 171 e 330 não
  // declaram e quebram com ReferenceError em módulo ES (AGENTS.md 2.1).
  for (let i = 0; i < linhas.length; i++) {
    const paragrafo = document.createElement("p");
    paragrafo.textContent = linhas[i];
    conteudo.appendChild(paragrafo);
  }

  card.appendChild(midia);
  card.appendChild(conteudo);
  document.querySelector("#resultados").appendChild(card);
}

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T13 · RF10 · Usar callback
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 5 DE 9 · BRANCH: feature/cinematch-web-interface · DEPENDE DE: M1-T11
// DONO DESTA ETAPA: Lucas.
// O QUE FAZER AQUI
//   - Escrever a função que escreve a saudação na tela, usando o nome do
//     briefing: exibirMensagemDeBoasVindas(nome).
//   - Esta função é o CORPO do callback. Quem a cria, a passa como argumento
//     e a dispara é o Tiago, no js/script.js, na M1-T13 (etapa 7 de lá).
//     Aqui não há callback: há a função que ele recebe.
//   - Ela recebe o nome e escreve na tela. Nada de cálculo, nada de API.
// POR QUE ESTE TRECHO EXISTE
//   O RF10 mede a passagem da função, que é do script.js. O que essa função
//   faz com o nome é deste módulo. Separar os dois lados é o que deixa cada
//   arquivo com uma responsabilidade só.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/cinematch.js — saudacaoDespedida(usuario, callback) na
//   linha 511, que é o exemplo de função que recebe outra função. O que se
//   copia aqui é a forma de receber um dado e escrever na tela, não o console.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF10, pág. 8)
//   "Crie uma função de callback disparada quando o catálogo termina de
//   carregar — por exemplo, uma função exibirMensagemDeBoasVindas(nome)
//   chamada após a busca e renderização inicial."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - O nome da função é contrato com o script.js: combinar antes de
//     divergir.
//   - Usar textContent para escrever o nome. Nome é digitado por pessoa
//     usuária, e é o mesmo caminho de XSS da etapa 4.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T14 · RF11 · Usar closure
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 6 DE 9 · BRANCH: feature/cinematch-web-interface · DEPENDE DE: M1-T14 (lógica, js/script.js)
// DONO DESTA ETAPA: Lucas.
// O QUE FAZER AQUI
//   - Escrever a função que mostra na tela o número que a closure accountou.
//   - Ela recebe o total como parâmetro e escreve. O total NÃO é calculado
//     aqui nem guardado aqui: quem guarda é a closure do Tiago, no
//     js/script.js, na M1-T14 (etapa 8 de lá).
//   - O contrato entre os dois: o script.js passa o número, esta função
//     escreve. Se o número não chegar, não quebrar a tela.
// POR QUE ESTE TRECHO EXISTE
//   O RF11 pede duas coisas: o contador por closure e que ele apareça na
//   tela. A primeira é lógica, a segunda é tela. O contador invisível não
//   entrega o requisito, mesmo que a mecânica da closure esteja perfeita.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/cinematch.js — criarContadorDeRecomendacoes() (linha
//   102), que devolve obterTotal(). Aqui o que se copia é o formato da
//   informação: um total que chega pronto e só precisa ser exibido.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF11, pág. 8)
//   "Mantenha (ou recrie) um contador por closure — por exemplo, quantas
//   vezes a pessoa recalculou a compatibilidade nesta sessão — e exiba esse
//   número na tela."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - Callback e closure dividem o Critério 8 e o critério pede os DOIS: este
//     bloco mostra a closure, e a M1-T13 é o callback.
//   - O número começa em zero a cada sessão e volta a zero quando o perfil
//     troca (etapa 1 deste arquivo). Texto de zero é feio: "0 recalculados"
//     ainda é o estado inicial, e some com isso se ficar estranho.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T15 · RF12 · Browser API de tempo
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 7 DE 9 · BRANCH: feature/cinematch-web-interface · DEPENDE DE: M1-T07, M1-T11
// DONO DESTA ETAPA: Lucas.
// O QUE FAZER AQUI
//   - Mostrar "Buscando as melhores séries pra você..." enquanto o fetch
//     corre. O script.js pede este estado ANTES de chamar a API, na M1-T07;
//     esta função é o que ele chama.
//   - Aplicar o setTimeout do atraso proposital AQUI, na exibição, entre o
//     estado de carregando e o momento de mostrar os cards. Delay pequeno: o
//     ponto é a mensagem ficar legível, não simular lentidão.
//   - Limpar a mensagem de carregando antes de renderizar os cards, para os
//     dois estados não aparecerem juntos.
// POR QUE ESTE TRECHO EXISTE
//   Uma chamada de rede leva tempo, e sem feedback a pessoa acha que a página
//   travou. É o estado "carregando" do trio que o RF04 e a seção 5.4 do
//   briefing exigem, e é o que o setTimeout do RF12 reforça.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/cinematch.js — buscarCatalogoSimulado() (linhas 81 a 91),
//   que usa setTimeout para simular latência. A forma do setTimeout é a
//   mesma; o lugar de uso é outro, e o motivo está em CONFORMIDADE.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF12, pág. 8)
//   "Enquanto o fetch busca os dados, mostre uma mensagem de carregamento
//   (ex.: 'Buscando as melhores séries pra você...'). Pode usar setTimeout
//   para um pequeno atraso proposital na exibição, reforçando o uso de
//   setTimeout/setInterval do bloco de Browser APIs."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - O setTimeout vai NA EXIBIÇÃO e NUNCA dentro do fetch. Dentro do fetch
//     o atraso se somaria à latência da rede e mascararia justamente o estado
//     de erro que a M1-T07 precisa mostrar: a página pareceria travada, e não
//     fora do ar. O briefing (RF04, pág. 6) e o risco 4 do quadro pedem o
//     contrário do que o instinto sugere, e por isso está escrito aqui.
//   - O projeto antigo usava setTimeout dentro de uma Promise para simular a
//     API. Aqui a API é real: não repetir esse padrão.
//   - É este bloco que faz o trio fechar: carregando (aqui), vazio (etapa 3)
//     e erro (etapa 2). O Critério 13 é avaliado nos três.
//   - Geolocation é o bônus opcional do RF12, do backlog, e não entra aqui:
//     não conta nota e pede permissão de localização.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T16 · RF13 · SEO básico e acessibilidade
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 8 DE 9 · BRANCH: feature/cinematch-web-interface · DEPENDE DE: M1-T12
// DONO DESTA ETAPA: Lucas.
// O QUE FAZER AQUI
//   - SÓ o que este módulo cria. O RF13 é, no todo, title, meta description,
//     og tags, label ligado por for e id, contraste e lang="pt-BR" — e isso
//     é do index.html e do style.css, nas M1-T02 e M1-T16, que também são
//     suas. Aqui a parte é outra:
//   - O alt nas imagens que entram no card. A imagem da TVMaze é um recurso
//     remoto e vem sem descrição: o texto alternativo escreve o que o alt
//     não é, e nunca repete o título que já está ao lado.
//   - O aria-label nos campos e botões criados por este arquivo, e foco
//     visível no card, para navegação por teclado.
//   - Um card sem foco não é alcançado pelo teclado, e a grade inteira vira
//     inacessível: o :focus-visible do CSS é da M1-T12, o alvo é daqui.
// POR QUE ESTE TRECHO EXISTE
//   O RF13 fala de acessibilidade da página, e quase tudo dela vem do HTML
//   estático. O que este módulo gera nasce DEPOIS, em tempo de execução, e
//   o leitor de tela não perdoa o que não tem alt nem rótulo. Sem este
//   bloco, a parte dinâmica da página fica fora do requisito.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   semana-11/ceu-aberto/index.html — og:title, meta description e
//   aria-label. O padrão é o mesmo do HTML: rótulo descritivo no atributo,
//   não texto genérico.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF13, pág. 9)
//   "Título e meta description descritivos, <label> associado a cada campo do
//   formulário (via for/id), texto alternativo em qualquer imagem usada, e
//   contraste de cores adequado."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - "texto alternativo em qualquer imagem usada" vale também para imagem
//     vinda de API. É o requisito mais fácil de esquecer aqui, porque a
//     imagem não está no index.html.
//   - Contraste e foco visível são CSS, não JS: são da M1-T16 e da M1-T12.
//   - aria-label descreve a função, não o tipo. "Rótulo do campo", "apagar" e
//     "número" não dizem nada para quem usa leitor de tela.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T17 · RF14 · Separar os módulos ES
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 9 DE 9 · BRANCH: feature/cinematch-web-interface · DEPENDE DE: M1-T11, M1-T12, M1-T13, M1-T14, M1-T15
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Esta é a etapa de fechamento: conferir a lista de export deste arquivo
//     e fazer o nome de cada um bater com o import do js/script.js.
//   - A lista prevista, no total, é esta: a função de reabrir o formulário
//     (M1-T06), exibirMensagemDeErro (M1-T07), a mensagem de catálogo vazio
//     (M1-T08), renderizarCard (M1-T11), a saudação (M1-T13), o contador
//     (M1-T14), o carregando com o atraso (M1-T15) e o que for criado pelo
//     RF13.
//   - JÁ FEITO NA M1-T11: APAGAR PLACEHOLDER_UI, que estava na linha 11 deste
//     arquivo quando este esboço foi escrito, no mesmo passo em que
//     renderizarCard entrou. Ele era provisório e existia só para o import do
//     script.js resolver desde o primeiro dia.
//   - Exportar o que o outro módulo precisa e nada mais. O que existe aqui é
//     named export, com export na frente da declaração, que é o que o
//     exemplo do professor usa.
// POR QUE ESTE TRECHO EXISTE
//   O RF14 é o que amarra os três arquivos. Sem esta conferência, um nome
//   exportado que não bate com o import só falha em tempo de execução, e o
//   erro aparece longe da linha que causou — a mesma armadilha da linha de
//   bootstrap que o script.js teve até o fim da M1-T06.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   semana-12/modulos/ — o slug.js da pasta faz export e o index.js faz
//   import do que foi exportado. O README.md da pasta é o "antes", com
//   require e module.exports: require vira import, module.exports vira
//   export.
//   O "depois" é o commit a413b0c, de 18/09/2026; sem ele, parece CommonJS.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF14, pág. 9)
//   export function renderizarCard(resultado) { /* ... */ }
//   export function exibirMensagemDeErro(texto) { /* ... */ }
//   e, no script.js:
//   import { renderizarCard, exibirMensagemDeErro } from './ui.js';
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - Os nomes do exemplo do professor são o contrato: renderizarCard e
//     exibirMensagemDeErro. O script.js já os chama assim, e renomear de um
//     lado só quebra do outro.
//   - ESTA ETAPA É DO TIAGO E ESTÁ NA BRANCH DO LUCAS DE PROPÓSITO. A
//     M1-T17 é o grafo de módulos, que é transversal: o nome de cada export
//     daqui tem de bater com o import do js/script.js, e é o Tiago quem fecha
//     esse acordo, como fecha o mesmo grafo do lado dele. Não ler a
//     divergência como engano de preenchimento, e não trocar a branch por
//     causa dela.
//   - Conferir também o caminho: './ui.js', com ponto e com extensão. Sem o
//     ponto, vira bare specifier: o navegador não resolve o nome e falha.
//   - Uma função de tela que ninguém importa é código morto. Se um export
//     ficou sem uso, o problema está no import do script.js ou no bloco
//     correspondente daqui.
// ────────────────────────────────────────────────────────────────────────────
