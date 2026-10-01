/**
 * CineMatch Web — módulo de fluxo.
 *
 * Responsabilidade (AGENTS.md, seção 3): formulário, `localStorage`, busca na
 * API e cálculo da compatibilidade. Isso tudo entra depois, nas tarefas M1-T05 a
 * M1-T10. Este arquivo é o esqueleto da tarefa M1-T01 (RF15 parcial).
 *
 * Os `import` abaixo já apontam para os dois módulos irmãos, na mesma pasta, com
 * caminho relativo e extensão explícita — é assim que o navegador resolve módulos
 * ES. Os placeholders existem para que este arquivo carregue sem erro e saiam na
 * M1-T09 (modelo.js) e na M1-T11 (ui.js).
 *
 * A página só funciona servida por `npm start` (live-server): módulos ES não
 * carregam via file://, por causa do CORS. O live-server é instalado na M1-T18.
 */
import { PLACEHOLDER_UI } from "./ui.js";
import { PLACEHOLDER_MODELO } from "./modelo.js";

// Confirmação de que o grafo de módulos carregou. Este arquivo também é lido
// pelo Node na verificação (`node script.js`), então ele não pode tocar em
// `document`, `window` nem `localStorage` aqui em cima.
console.log("CineMatch Web: bootstrap carregado.", {
  ui: PLACEHOLDER_UI,
  modelo: PLACEHOLDER_MODELO,
});

// ────────────────────────────────────────────────────────────────────────────
// ESBOÇO COMENTADO DA LÓGICA — MAPA DE TRABALHO, NÃO CÓDIGO
// ────────────────────────────────────────────────────────────────────────────
/**
 * O QUE ESTE TRECHO É
 *   O mapa do que ainda vai ser escrito neste arquivo. Cada bloco marcado com
 *   o prefixo de tarefa aponta um passo do roteiro da seção 5.1 do briefing e
 *   diz o que escrever naquele ponto, por que ele existe, de qual exercício de
 *   aula veio a técnica e o que o professor pediu no briefing.
 *
 *   NADA DAQUILO É EXECUTÁVEL. São comentários: a página funciona exatamente
 *   igual antes e depois de ler este arquivo. A lógica entra quando cada um
 *   escrever o seu bloco, e a forma final é de quem implementa. Citar, não
 *   copiar: a forma final é sua, e você precisa saber explicar cada linha.
 *
 *   O ESTADO DAS TASKS NÃO MORA AQUI. O `docs/KANBAN.md` é a fonte de verdade
 *   do que já está feito; nenhum checkbox muda por causa deste esboço.
 *
 * ROTEIRO DESTE ARQUIVO (a ordem é a da seção 5.1 do briefing)
 *   M1-T05  captura no submit e validação do formulário
 *   M1-T06  persistir o perfil no localStorage
 *   M1-T07  buscar o catálogo real na TVMaze com fetch
 *   M1-T08  tratar o catálogo com métodos de array
 *   M1-T09  instanciar as classes que vivem em modelo.js
 *   M1-T10  orquestrar o cálculo da compatibilidade
 *   M1-T13  disparar o callback depois da renderização inicial
 *   M1-T14  guardar o contador numa closure
 *   M1-T17  amarrar o grafo de módulos: import e export
 *   M1-T18  servir com npm start, porque file:// não carrega módulo
 *
 * CONTRATO DE IDS COM O HTML (M1-T03, do Lucas, em index.html)
 *   O JavaScript conversa com o HTML por estes seletores, e os nomes vêm do
 *   exemplo do professor: no RF02 (pág. 5) para o formulário e no RF08
 *   (pág. 8) para o container dos cards. Nenhum dos dois lados renomeia
 *   sozinho:
 *     #form-perfil    o <form> que dispara o evento submit
 *     #nome           campo de nome, com o label apontando por for="nome"
 *     #idade          campo de idade, com min="1" e required
 *     name="genero"   atributo comum a todos os checkboxes de gênero
 *     #resultados     onde os cards de recomendação são anexados
 *     #botao-trocar-perfil   A DEFINIR COM O LUCAS. Esse id não existe no
 *                     exemplo do briefing, e inventar um id só de um dos
 *                     lados quebra o botão. Combinar antes de codificar o
 *                     bloco M1-T06.
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
 *   throttle, <template>, localStorage.removeItem, padStart e o namespace
 *   Intl. (localeCompare com "pt-BR" NÃO é esse namespace e está liberado).
 *   ?? apareceu uma vez em cinematch_antigo/cinematch.js:211 e não foi
 *   ensinado: não replique.
 *   Três estados da chamada à API, sempre: carregando, vazio e erro.
 */

function iniciarFormulario() {
  const formPerfil = document.querySelector("#form-perfil");
  const statusResultados = document.querySelector("#resultados-status");

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

    console.log("Usuário capturado:", usuario);

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

    statusResultados.textContent = "";

    if (erros.length > 0) {
      const mensagemErros = document.createElement("ul");
      mensagemErros.setAttribute("role", "alert");
      mensagemErros.setAttribute("aria-live", "assertive");

      for (let i = 0; i < erros.length; i++) {
        const itemErro = document.createElement("li");
        itemErro.textContent = erros[i];
        mensagemErros.appendChild(itemErro);
      }

      statusResultados.appendChild(mensagemErros);
      return;
    }

    statusResultados.textContent =
      "Perfil recebido. Suas recomendações serão carregadas em seguida.";

    console.log("Perfil validado com sucesso:", usuario);
  });
}

if (typeof document !== "undefined") {
  iniciarFormulario();
}

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T06 · RF03 · Persistir perfil no localStorage
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 2 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T05
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Ao enviar o formulário, salvar com
//     localStorage.setItem('cinematchPerfil', JSON.stringify(usuario)).
//   - Na volta para a página, ler com localStorage.getItem e abrir com
//     JSON.parse. Tratar o null da primeira visita ANTES de usar: quem entra
//     pela primeira vez não tem nada salvo, e o getItem devolve null.
//   - Com perfil salvo, PULAR o formulário e ir direto ao catálogo.
//   - Ligar o botão "Trocar perfil" para reabrir o formulário na tela. A
//     parte de mostrar o formulário é do Lucas, em js/ui.js (mesma M1-T06).
// POR QUE ESTE TRECHO EXISTE
//   O RF03 pede que o perfil sobreviva ao recarregamento. O localStorage é o
//   único armazenamento que o Módulo 01 autorizou: sem ele, cada F5 joga o
//   perfil fora e o formulário reaparece toda vez.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   semana-11/ceu-aberto/script.js — a FORMA de setItem e de
//   getItem(...) || padrão. Atenção: o try/catch exigido pela seção 7 do
//   briefing NÃO aparece nesse arquivo e precisa ser acrescentado aqui.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF03, pág. 6)
//   localStorage.setItem('cinematchPerfil', JSON.stringify(usuario));
//   const perfilSalvo = localStorage.getItem('cinematchPerfil');
//   if (perfilSalvo) {
//     const usuario = JSON.parse(perfilSalvo);
//     // pula o formulário e mostra o catálogo direto
//   }
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - Envolva a LEITURA e a ESCRITA em try/catch. O modo de falha real não é
//     exceção de sintaxe: é cota excedida ou storage limpo pelo navegador
//     (risco 3 do quadro). Se a persistência falhar, siga sem ela e avise na
//     tela — o app funciona igual, só deixa de lembrar do perfil.
//   - QUESTÃO ABERTA (decisão do Tiago; este esboço não resolve): o botão
//     precisa "limpar o registro", e localStorage.removeItem NÃO foi ensinado
//     (AGENTS.md 2.1) — não usar sem perguntar. Três caminhos, todos só com o
//     que foi ensinado: (a) reapresentar o formulário sem mexer no registro,
//     sabendo que a próxima visita pula o formulário de novo porque o perfil
//     continua salvo; (b) sobrescrever a chave com '' e tratar string vazia
//     como "sem perfil"; (c) sobrescrever com JSON.stringify(null) e tratar o
//     null devolvido pelo JSON.parse como "sem perfil". Escolher um e
//     explicar a escolha no README da M1-T20.
//   - O id do botão "Trocar perfil" é a definir com o Lucas: ver o contrato
//     de ids no cabeçalho de região.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T07 · RF04 · Buscar catálogo real via fetch
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 3 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T01, M1-T06
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Declarar `async function buscarCatalogo()` no topo do módulo e chamar
//     depois que o perfil estiver resolvido (M1-T05 e M1-T06).
//   - Dentro de try/catch, `await fetch('https://api.tvmaze.com/shows?page=0')`.
//   - Validar response.ok ANTES de ler o corpo, e lançar um Error descrevendo o
//     problema quando a resposta não for ok.
//   - Registrar o resultado BRUTO no console ANTES de tratar qualquer coisa:
//     é o que o RF04 pede e o que permite conferir a API no DevTools.
//   - No catch, chamar exibirMensagemDeErro (do Lucas, em js/ui.js): a página
//     nunca pode ficar travada nem branca sem explicação.
//   - Antes do fetch, pedir o estado de carregando, "Buscando as melhores
//     séries pra você...". É a M1-T15, etapa 7 de js/ui.js.
// POR QUE ESTE TRECHO EXISTE
//   O catálogo fictício da semana 6 estava no código e nunca falhava. Uma
//   chamada de rede falha: a internet cai, a API sai do ar, a resposta vem
//   vazia. Sem tratar isso a página trava sem mensagem nenhuma.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   semana-11/ceu-aberto-api/script.js — a forma do fetch com try/catch,
//   response.ok === false e throw new Error.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF04, pág. 6 e 7)
//   pág. 6: "O array fictício do CineMatch JS nunca falhava — ele estava
//   sempre ali, no código. [...] Sem tratar isso, a página trava ou fica em
//   branco sem explicação nenhuma pra pessoa usuária."
//   pág. 7:
//   async function buscarCatalogo() {
//     const resposta = await fetch('https://api.tvmaze.com/shows?page=0');
//     ...
//   }
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - response.ok tem que ser validado: resposta 200 não garante corpo útil.
//   - Os TRÊS estados da chamada, sempre: carregando, vazio e erro. O estado
//     de carregando entra antes do fetch; o de erro, no catch; o de vazio é
//     da M1-T08.
//   - O setTimeout do RF12 (M1-T15) fica na EXIBIÇÃO, na etapa 7 de
//     js/ui.js, e NUNCA dentro do fetch: dentro dele o atraso se somaria à
//     latência da rede e mascararia justamente o estado de erro que este
//     bloco precisa mostrar.
//   - Sem usar sem perguntar: AbortController, encadeamento opcional e
//     Object.assign.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T08 · RF05 · Tratar o catálogo com métodos de array
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 4 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T07
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Encadear filter, sort, slice e map até chegar no array tratado de
//     { id, titulo, tipo, generos, duracaoMinutos }.
//   - O filtro exige as duas defesas: genres.length > 0 e rating.average.
//     Nem toda série da TVMaze tem gênero ou nota preenchidos, e usar um
//     undefined como número quebra a comparação do sort.
//   - O slice limita a 8 itens. O Módulo 01 pede slice e não dá nota
//     própria a ele: ele entra porque já estava no roteiro da semana 6.
//   - Tratar o catálogo vazio com a mensagem do professor. É o estado vazio
//     do trio, e o texto é o que o Lucas escreve na tela (mesma M1-T08, em
//     js/ui.js, etapa 3).
// POR QUE ESTE TRECHO EXISTE
//   A API devolve o JSON cru, com nomes em inglês, campos que às vezes não
//   existem e nenhuma ordem. O RF05 existe para transformar isso em um
//   array com a forma do projeto anterior, que o cálculo da M1-T10 consome.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/cinematch.js — map, filter, find e sort, com
//   localeCompare("pt-BR") para ordenar título em português. O localeCompare
//   está liberado e NÃO é o namespace Intl. O sort por afinidade do projeto
//   da semana 6, em recomendarProximoGenero (linhas 438-448), é o exemplo
//   mais próximo do que o sort vai fazer aqui.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF05, pág. 7; o bloco inteiro, com as
// duas linhas elididas aqui, está em docs/BRIEFING.md:227-239)
//   const catalogo = dados
//     .filter(serie => serie.genres.length > 0 && serie.rating.average)
//     .sort((a, b) => b.rating.average - a.rating.average)
//     .slice(0, 8)
//     .map(serie => ({
//         id: serie.id,
//         titulo: serie.name,
//         tipo: "Série",
//         ...
//     }));
//   "E se o catálogo chegar vazio [...] uma mensagem simples como 'Não
//   encontramos recomendações agora' é melhor do que renderizar uma grade de
//   cards vazia sem explicação."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - sort é MUTÁVEL: ele reordena o array que recebe. Faça slice antes de
//     sort, ou copie com [...] antes de ordenar, para não mexer no array que
//     o fetch devolveu.
//   - ?? apareceu uma vez em cinematch_antigo/cinematch.js:211 e NÃO foi
//     ensinado: não replicar. O valor padrão da nota entra por if-else.
//   - Backlog, sem nota: dá para buscar mais de uma página, com ?page=1, e
//     também para deixar um filtro por gênero na tela. "Depois", não agora.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T09 · RF06 · Adaptar as classes Conteudo e Serie
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 5 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T08
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Ampliar o import da linha 17 deste arquivo: hoje ele traz só
//     PLACEHOLDER_MODELO, e passa a trazer as classes reais de ./modelo.js.
//   - Instanciar uma Serie para cada item do catálogo tratado na M1-T08,
//     passando o objeto já tratado. As classes são escritas em js/modelo.js,
//     etapa 1 da M1-T09.
//   - APAGAR PLACEHOLDER_MODELO de modelo.js e do import daqui, no mesmo
//     passo. Ele é provisório e existia só para o grafo carregar.
// POR QUE ESTE TRECHO EXISTE
//   O RF06 é o reaproveitamento do que a semana 6 já fez. Adaptar é a palavra
//   do briefing: as classes continuam sendo Conteudo e Serie, mas recebem os
//   dados já tratados no RF05, e o construtor volta a ser chamado com this.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/class.js — a linha 1 abre `class Conteudo`, a linha 18
//   abre `class Serie extends Conteudo`, a linha 20 é o super(...) e as
//   linhas 35 a 37 fazem o instanceof. Esse arquivo está em CommonJS
//   (module.exports na linha 61): porte a lógica, não o estilo.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF06, pág. 7)
//   "Traga as classes Conteudo e Serie (com herança e uso de this) do
//   CineMatch JS para dentro de modelo.js. Adapte o construtor, se
//   necessário, para receber os dados já tratados no RF05."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - Pisar no PLACEHOLDER_MODELO quebra o grafo de módulos, porque o
//     console.log de bootstrap (linhas 22 a 25) ainda o referencia. Ver o
//     bloco M1-T17, que é onde isso está registrado por inteiro.
//   - A subclasse precisa ACRESCENTAR comportamento, não só repetir o da
//   mãe: o Critério 7 pede classe, construtor, atributos, método, this e
//   herança. Uma Serie que não ganha nada da Conteudo tem herança escrita
//   e sem função. Ver js/modelo.js, etapa 1.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T10 · RF07 · Calcular e classificar a compatibilidade
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 6 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T09
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Aqui é a ORQUESTRAÇÃO, não o cálculo. Percorrer com map as instâncias
//     de Serie montadas na M1-T09 e chamar, em cada uma, o método de
//     compatibilidade que a M1-T10 escreve em js/modelo.js (etapa 2).
//     Onde esse cálculo mora — método da Serie em modelo.js, e não função
//     pura aqui — é a Questão Aberta 2 do esboço, registrada como pergunta em
//     js/modelo.js, etapa 2. As duas cabem no briefing, e a escolha é sua.
//   - Montar o objeto que vai para a tela, com titulo, generosEmComum,
//     generosNaoExplorados, percentual e classificacao. A tela consome
//     exatamente esses campos: é o contrato com o Lucas.
//   - Decidir a ordem dos cards e o recorte final (o slice dos 8 já veio na
//     M1-T08; aqui é a ordem por afinidade, se for o caso).
//   - Ainda é válido testar pelo console antes de desenhar: o RF07 do
//     briefing explicita "ainda só no console, pra validar a lógica antes de
//     desenhar a tela".
// POR QUE ESTE TRECHO EXISTE
//   O cálculo sozinho não devolve nada visível. Alguém precisa percorrer o
//   catálogo, chamar o método e juntar o que a tela precisa. É o papel do
//   módulo de fluxo: orquestrar, sem saber detalhe de tela nem de fórmula.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/cinematch.js — três funções, com papéis distintos, e
//   confundi-las é o erro mais caro deste bloco.
//   compatibilidade() (linha 292) é a FÓRMULA: mapeia o catálogo, normaliza os
//   favoritos, divide e classifica nos limiares das linhas 304 e 306, mas não
//   sabe nada de tela nem de qual gênero não foi explorado.
//   calcularCompatibilidades() (linha 323) é a ORQUESTRAÇÃO, e é a referência
//   mais próxima do que este bloco escreve: ela chama a fórmula uma vez
//   (linha 329) e depois percorre o resultado item por item. Aqui o mesmo
//   papel é percorrer as instâncias de Serie e montar o objeto do card.
//   obterConteudosPorGenero() (linha 472) NÃO é a orquestração e NÃO chama a
//   fórmula: ela reimplementa o filtro de gêneros (linhas 477 a 479) sobre cada
//   item e devolve { conteudo, generosEmComum, generosFaltantes } (486 a 490).
//   A referência útil dela é por outro motivo: é de onde sai a lista de
//   gêneros NÃO explorados, o generosFaltantes da linha 481, que é o campo
//   que o RF07 pede e que a fórmula de compatibilidade() não produz.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF07, pág. 7)
//   "Mantém a mesma regra do projeto anterior (gêneros em comum / total de
//   gêneros do conteúdo × 100) e a mesma classificação por faixa
//   (Alta/Média/Baixa afinidade), usando if-else, switch-case ou ternário —
//   só que agora o resultado é exibido na tela, não no console."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - A fórmula e os limiares (>= 80 é Alta, >= 50 é Média) ficam no método
//     da Serie, em js/modelo.js. Aqui não entra cópias da fórmula: se ela
//     mudar, muda em um lugar só.
//   - O total é o de gêneros DO CONTEÚDO, não o do perfil. É o que o briefing
//     pede e o que o projeto da semana 6 fazia.
//   - A comparação é direta entre o value do checkbox e o gênero que a
//     TVMaze devolve, em inglês. Daqui não sai tradução: a normalização de
//     caixa e acento é do normalizarTexto() (cinematch_antigo/cinematch.js:284)
//     e ela NÃO traduz. A lista de value em inglês é do Lucas, na M1-T03.
//   - O Critério 5 pesa 1,00: é o cálculo mais pesado da nota. Conferir com
//     casos extremos, e não só com um perfil que funciona: um perfil que casa
//     com quase tudo empurra todo mundo para a faixa Alta e esconde tanto o
//     erro de divisão quanto o de faixa.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T13 · RF10 · Usar callback
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 7 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T11
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Passar a função de saudação como ARGUMENTO, não chamá-la direto: a
//     função entra na posição de callback e é quem a dispara.
//   - Disparar assim que o catálogo termina de carregar E a renderização
//     inicial acaba. Nessa ordem: antes disso a saudação chega na tela antes
//     dos cards, e a leitura fica estranha.
//   - O nome exibirMensagemDeBoasVindas(nome) é o do briefing, e a função
//     que escreve na tela é do Lucas, em js/ui.js (etapa 5, mesma M1-T13).
//     O corpo do callback mora lá; aqui mora a passagem.
// POR QUE ESTE TRECHO EXISTE
//   O RF10 é sobre a forma, não sobre a saudação. Passar uma função como
//   argumento e deixar quem a chamou decidir o momento é o que separa callback
//   de uma chamada comum. Uma variável de flag dizendo "pronto" também
//   resolveria o efeito, mas não entregaria o requisito.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/cinematch.js — saudacaoDespedida(usuario, callback) na
//   linha 511: a função recebe o callback como segundo parâmetro e chama
//   callback() na linha 519. A chamada de exemplo, com
//   saudacaoDespedida(usuario, despedida), está na linha 65.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF10, pág. 8)
//   "Crie uma função de callback disparada quando o catálogo termina de
//   carregar — por exemplo, uma função exibirMensagemDeBoasVindas(nome)
//   chamada após a busca e renderização inicial."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - Callback e closure dividem o Critério 8, e o critério pede os DOIS. Este
//     bloco é o callback; o M1-T14 logo abaixo é a closure. Um não substitui
//     o outro.
//   - A seta, que é o arrow function, é a forma mais curta de escrever o
//     callback quando ele cabe em uma linha; se ficar longo, use function.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T14 · RF11 · Usar closure
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 8 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T13
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Escrever a factory: uma função que cria o contador e DEVOLVE as
//     funções que mexem nele. O total fica numa variável que só o par criado
//     por ela enxerga — é essa a closure.
//   - Chamar a factory uma vez, guardando o par devolvido, e ir passando esse
//     par para quem precisar do número.
//   - O contador começa em zero a cada sessão e volta a zero quando o perfil
//     troca: quem trocou o perfil recalculou do começo.
//   - O número vai para a tela pelo Lucas, em js/ui.js (etapa 6, mesma
//     M1-T14). Aqui é só onde o total mora.
// POR QUE ESTE TRECHO EXISTE
//   O RF11 pede um estado que sobreviva entre chamadas sem virar uma
//     variável global. Uma variável let solta no topo do módulo resolveria o
//   número e entregaria zero do requisito: o que prova a closure é que o
//   total não é acessível de fora da factory.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/cinematch.js — criarContadorDeRecomendacoes() (linha
//   102), que devolve incrementar() e obterTotal() operando sobre um total
//   fechado, fora do alcance do resto do arquivo.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF11, pág. 8)
//   "Mantenha (ou recrie) um contador por closure — por exemplo, quantas
//   vezes a pessoa recalculou a compatibilidade nesta sessão — e exiba esse
//   número na tela."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - Nada de variável global para o total: o Critério 8 é sobre o escopo
//     fechado, e um global entrega o número sem a mecânica.
//   - Voltar a zero no carregamento da página é o esperado: o RF11 fala em
//     "nesta sessão". Guardar o total no localStorage aria mudaria o
//     significado e não foi pedido.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T17 · RF14 · Separar os módulos ES
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 9 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T11, M1-T12, M1-T13, M1-T14, M1-T15
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - ESTA É A ETAPA DE FECHAMENTO. As outras nove já escreveram o conteúdo
//     dos três arquivos; aqui é o que amarra eles e o que troca os nomes.
//   - Os DOIS import das linhas 16 e 17 PERMANECEM. Eles não saem: o RF14 é
//     exatamente este arranjo, e trocar import por require (ou por script
//     inline) desfaz o módulo.
//   - O que muda é o que vem dentro dos dois: PLACEHOLDER_MODELO sai quando
//     a M1-T09 escrever as classes de modelo.js, e PLACEHOLDER_UI sai quando
//     a M1-T11 escrever o renderizarCard de ui.js. Cada placeholder sai na
//     SUA task, não nesta.
//   - Conferir que cada nome importado existe e é exportado no outro arquivo.
//     Um nome que não bate falha em tempo de execução, sem aviso no console.
//   - Conferir o index.html: um único script, type="module", apontando para
//     ./js/script.js. É o Lucas que escreve a tag, na M1-T02.
// POR QUE ESTE TRECHO EXISTE
//   Sem o grafo amarrado, cada arquivo funciona sozinho e a página não vê
//   nada. O RF14 existe para o cálculo, a tela e as classes ficarem em
//   arquivos separados e ainda assim se enxergarem. Três arquivos já cumprem
//   o requisito com folga: não fatiar mais.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   semana-12/modulos/ — o README.md da pasta mostra o "antes", com
//   require e module.exports; os .js da própria pasta já são o "depois", com
//   import e export, e o index.js é quem faz o import do slug.js exportado.
//   A frase que resolve a dúvida: require vira import, module.exports vira
//   export, e o pacote precisa de "type": "module" — que o package.json deste
//   projeto tem, e é o que faz o node js/script.js passar. No navegador a chave
//   não conta: quem resolve o módulo é a tag type="module" do script no
//   index.html.
//   O "depois" é o commit a413b0c, de 18/09/2026; sem ele, parece CommonJS.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF14, pág. 9)
//   // modelo.js
//   export class Conteudo { /* ... */ }
//   export class Serie extends Conteudo { /* ... */ }
//   // ui.js
//   export function renderizarCard(resultado) { /* ... */ }
//   export function exibirMensagemDeErro(texto) { /* ... */ }
//   // script.js
//   import { Conteudo, Serie } from './modelo.js';
//   import { renderizarCard, exibirMensagemDeErro } from './ui.js';
// CONFORMIDADE
//   - O console.log de bootstrap das linhas 22 a 25 PERMANECE, e ele
//     referencia PLACEHOLDER_UI e PLACEHOLDER_MODELO. Consequência prática:
//     cada vez que um dos placeholders sair, no mesmo commit, esse console.log
//     tem de ser ajustado para o export novo. Sem isso, o import some e o
//     grafo inteiro quebra — e o erro aparece longe da linha que causou.
//   - Caminho relativo e com extensão explícita: './ui.js', não './ui'. O
//     navegador não procura extensão sozinho.
//   - Citar, não copiar: os nomes dos exports acima são os do exemplo do
//     professor, e é preciso saber explicar por que este projeto separa
//     renderizarCard (tela) do cálculo (fluxo).
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T18 · RF15 · Servir o projeto com o live-server
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 10 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T01, M1-T17
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Nada é escrito dentro dos .js. Esta etapa é sobre o package.json e
//     sobre o hábito de rodar o projeto: npm install e npm start, na porta
//     8080, com live-server em devDependencies e não global.
//   - Abrir http://localhost:8080 e conferir que os três módulos carregaram,
//     olhando o console.
//   - Deixar isso escrito no README (M1-T20), que é onde a pessoa que avalia
//     vai procurar.
// POR QUE ESTE TRECHO EXISTE
//   Módulos ES NÃO carregam via file://. Dar duplo clique no index.html
//   dispara erro de CORS nos import e a página fica sem nenhum JavaScript, sem
//   mensagem útil. Servir por HTTP não é preferência: é requisito do módulo
//   ES nativo no navegador.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   O package.json deste próprio projeto, com o script "start": "live-server".
//   É a referência porque é o arquivo real do repositório, e é onde a
//   instalação local versus global do pacote foi decidida: devDependencies,
//   nunca npm install -g.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF15, pág. 9, e seção 5.1, pág. 5)
//   {
//     "name": "cinematch-web",
//     "scripts": {
//       "start": "live-server"
//     },
//     "devDependencies": {
//       "live-server": "^1.2.2"
//     }
//   }
//   e pág. 5: "Separe script.js, ui.js e modelo.js com import/export - e
//   sirva o projeto com live-server pra rodar como módulo."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - O botão "Trocar perfil" nunca pode recarregar via file://, e o motivo não
//     é o que parece. O localStorage SOBREVIVE ao recarregamento — ele é por
//     origem, não por sessão — então o registro não se perde. O que se perde é
//     a página: recarregar em file:// derruba os import por CORS e deixa o
//     index.html sem nenhum JavaScript (risco 2 do quadro). Por isso a troca se
//     resolve com preventDefault, e não com um recarregamento.
//   - npm é a única ferramenta externa do projeto, e só como servidor local.
//   - A API responde com Access-Control-Allow-Origin: *, então o CORS não
//     bloqueia (risco 1 do quadro). Se aparecer erro de CORS na aba Network,
//     o caminho está errado: não é a API, é o file://.
// ────────────────────────────────────────────────────────────────────────────
