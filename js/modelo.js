/**
 * CineMatch Web — módulo de classes.
 *
 * Responsabilidade (AGENTS.md, seção 3): definir as classes `Conteudo` e
 * `Serie`, com herança e uso de `this`. As classes entraram na M1-T09 (RF06).
 *
 * JÁ FEITO NA M1-T09: as classes Conteudo e Serie entraram no lugar deste
 * export provisório, que existia só para que o import do js/script.js
 * resolvesse. O que está abaixo é funcional: construtor com atributos em
 * this, e métodos que os leem.
 */

/**
 * Prepara um texto para comparação: caixa baixa, sem acento e sem espaço nas
 * pontas. É a `normalizarTexto` do projeto da semana 6
 * (cinematch_antigo/cinematch.js:284) e ela NÃO traduz: "Comédia" continua
 * "comédia" e não vira "Comedy". Fica aqui, sem `export`, porque é detalhe do
 * cálculo — a lista de exports deste módulo é `Conteudo` e `Serie`.
 * @param {string} texto
 * @returns {string}
 */
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Classe base Conteudo (RF06).
 * Representa um item de catálogo com atributos comuns.
 * Usa `this` para guardar e ler atributos no construtor e nos métodos.
 * @param {string} titulo - Título do conteúdo.
 * @param {string} tipo - Tipo do conteúdo (ex.: "Série").
 * @param {string[]} generos - Lista de gêneros.
 * @param {number|null} duracaoMinutos - Duração em minutos ou null.
 */
export class Conteudo {
  constructor(titulo, tipo, generos, duracaoMinutos) {
    this.titulo = titulo;
    this.tipo = tipo;
    this.generos = generos;
    this.duracaoMinutos = duracaoMinutos;
  }

  /**
   * Retorna resumo legível do conteúdo.
   * Contrato M1-T08: `serie.runtime` pode vir como está (null/ausente).
   * Tratamos null OU undefined para não gerar "undefined min".
   * @returns {string}
   */
  exibirResumo() {
    const semDuracao = this.duracaoMinutos === null || this.duracaoMinutos === undefined;
    const duracao = semDuracao ? "N/D" : `${this.duracaoMinutos} min`;
    return `${this.titulo} (${this.tipo}) — ${duracao}`;
  }

  /**
   * Retorna gêneros separados por vírgula.
   * @returns {string}
   */
  exibirGeneros() {
    return `Gêneros: ${this.generos.join(", ")}`;
  }
}

/**
 * Classe Serie (RF06) — herda de Conteudo.
 * Acrescenta o atributo `temporadas` e comportamento próprio.
 * Chama `super(titulo, "Série", generos, duracaoMinutos)` — com generos
 * normalizado para lista vazia quando ausente — antes de usar `this`
 * (referência: cinematch_antigo/class.js:20).
 * @param {string} titulo - Título da série.
 * @param {string[]} generos - Lista de gêneros.
 * @param {number|null} duracaoMinutos - Duração média ou null.
 * @param {number|null|undefined} temporadas - Número de temporadas (opcional).
 */
export class Serie extends Conteudo {
  constructor(titulo, generos, duracaoMinutos, temporadas) {
    // Generos ausente viraria lista vazia: sem isto, o .join() em
    // exibirGeneros() quebraria. A guarda fica na chamada do super, e não
    // depois: super() já escreveu this.generos, e a referência da semana 6
    // (cinematch_antigo/class.js:19-22) atribui o atributo uma vez só.
    super(titulo, "Série", generos === undefined ? [] : generos, duracaoMinutos);
    // Parâmetro opcional ausente: normaliza undefined -> null (não é regra getItem).
    this.temporadas = temporadas === undefined ? null : temporadas;
  }

  /**
   * Retorna informação de temporadas.
   * Acrescenta comportamento à mãe (prova da herança). Usa `this.titulo` herdado.
   * @returns {string}
   */
  exibirTemporadas() {
    const semTemporadas = this.temporadas === null || this.temporadas === undefined;
    const texto = semTemporadas ? "N/D" : this.temporadas;
    return `${this.titulo} tem ${texto} temporada(s)`;
  }

  /**
   * Compara os gêneros favoritos da pessoa com os gêneros desta série e devolve
   * o objeto que o card da M1-T11 consome (RF07). A regra é a do projeto da
   * semana 6 (cinematch_antigo/cinematch.js:292-321): gêneros em comum dividido
   * pelo total de gêneros do CONTEÚDO, vezes 100, com o resultado arredondado
   * ANTES de virar faixa.
   *
   * O denominador é o do conteúdo, nunca o do perfil — é o que o briefing pede
   * (docs/BRIEFING.md:251) e inverter isso muda a nota.
   *
   * Não há guarda de divisão por zero aqui, e é proposital: o `filter` de
   * `generos.length > 0` da M1-T08 (js/script.js, dentro de tratarCatalogo) é
   * o que garante o denominador. Uma guarda exigiria `Array.isArray`, que não
   * foi ensinado (AGENTS.md 2.1).
   *
   * @param {string[]} generosFavoritos - valores dos checkboxes, em inglês
   * @returns {{ generosEmComum: string[], generosNaoExplorados: string[], percentual: string, classificacao: string }}
   */
  calcularCompatibilidade(generosFavoritos) {
    const favoritosNormalizados = generosFavoritos.map(normalizarTexto);

    // Dois `filter` com o mesmo predicado, um negando: o primeiro fica com o que
    // a pessoa já conhece, o segundo é o filtro de sobra — os gêneros da série
    // que NÃO estão entre os favoritos. É o `generosFaltantes` da referência
    // (cinematch_antigo/cinematch.js:481), o campo que o RF07 pede e que a
    // fórmula pura não produz. `filter` é método que o RF05 já contou.
    const generosEmComum = this.generos.filter((genero) =>
      favoritosNormalizados.includes(normalizarTexto(genero)),
    );
    const generosNaoExplorados = this.generos.filter((genero) =>
      !favoritosNormalizados.includes(normalizarTexto(genero)),
    );

    // O arredondamento vem ANTES da faixa, e a faixa lê o valor arredondado:
    // 79,5% vira "80" e é Alta. Inverter a ordem faria 79,5 cair em Média.
    const percentual = (
      (generosEmComum.length / this.generos.length) *
      100
    ).toFixed(0);

    // Os limiares são do briefing: 80 ou mais é Alta, 50 ou mais é Média, o
    // resto é Baixa (docs/BRIEFING.md:251). Os textos são contrato com o
    // `renderizarCard` da M1-T11 e com as classes de badge do CSS (M1-T12).
    let classificacao;
    if (Number(percentual) >= 80) {
      classificacao = "Alta afinidade";
    } else if (Number(percentual) >= 50) {
      classificacao = "Média afinidade";
    } else {
      classificacao = "Baixa afinidade";
    }

    return {
      generosEmComum: generosEmComum,
      generosNaoExplorados: generosNaoExplorados,
      percentual: percentual,
      classificacao: classificacao,
    };
  }
}

// ────────────────────────────────────────────────────────────────────────────
// ESBOÇO COMENTADO DAS CLASSES — MAPA DE TRABALHO, NÃO CÓDIGO
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
 *   Aqui moram SÓ as classes. A fórmula da compatibilidade é método de uma
 *   instância, e não função solta no fluxo: é o que dá ao this do RF06 e ao
 *   this do RF07 um motivo de existir. O fluxo do script.js orquestra, a
 *   tela do ui.js escreve, e este arquivo guarda as duas coisas que os dois
 *   outros usam: os dados com forma e o cálculo que os transforma em
 *   resultado.
 *
 * ROTEIRO DESTE ARQUIVO (a ordem é a da seção 5.1 do briefing)
 *   M1-T09  as classes Conteudo e Serie, com herança
 *   M1-T10  o método que compara e classifica a compatibilidade
 *   M1-T17  a lista final de export e o nome que o script.js importa
 *
 * PLACEHOLDER_MODELO — JÁ SAIU NA M1-T09, junto com o import do
 *   js/script.js. Não existe mais nesta região. A nota fica porque a etapa
 *   M1-T17 ainda remete a ela. Ver também js/script.js:19-21 e 791-792.
 *
 * SOBRE OS CAMINHOS semana-XX/
 *   A referência a exercício de aula (semana-12/, o exemplo de módulos ES)
 *   aponta para o repositório das aulas, que NÃO está clonado nesta cópia de
 *   trabalho: só o cinematch_antigo/ está. O caminho é referência, não
 *   arquivo para abrir. Se a pasta não existir no seu disco, o esboço não
 *   inventou o caminho — o repositório é que está em outro lugar.
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
 *   throttle, <template>, o método que apaga uma chave do localStorage,
 *   padStart e o namespace
 *   Intl. (localeCompare com "pt-BR" NÃO é esse namespace e está liberado).
 *   ?? apareceu uma vez em cinematch_antigo/cinematch.js:211 e não foi
 *   ensinado: não replique.
 *   Três estados da chamada à API, sempre: carregando, vazio e erro.
 */

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T09 · RF06 · Adaptar as classes Conteudo e Serie
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 1 DE 3 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T08
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - export class Conteudo: construtor recebendo os dados já tratados na
//     M1-T08, atributos guardados COM THIS dentro do construtor, e um método
//     que leia esses atributos por this. É o this do RF06: sem ele, a classe
//     é um objeto com nome de classe.
//   - export class Serie extends Conteudo: chamar super(...) no construtor
//     antes de usar this, e acrescentar um método que a mãe não tem.
//   - O que a Serie ganha que a Conteudo não tem: o RF06 fala em série, e o
//     catálogo é de séries. Temporada e status de exibição são o que o
//     projeto da semana 6 já guardava e são um gancho concreto de herança.
//   - JÁ FEITO NA M1-T09: APAGAR PLACEHOLDER_MODELO, que estava na linha 11
//     quando este esboço foi escrito, e tirar o nome do import do
//     js/script.js, no mesmo passo.
// POR QUE ESTE TRECHO EXISTE
//   O RF06 é o reaproveitamento do que a semana 6 já fez, não a invenção de
//   um modelo novo. Adaptar é a palavra do briefing: as duas classes
//   continuam as mesmas e passam a receber o objeto do RF05.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/class.js — a linha 1 abre class Conteudo, a linha 18
//   abre class Serie extends Conteudo, a linha 20 é o super(titulo, "Série",
//   generos, duracaoMinutos) e as linhas 35 a 37 fazem o instanceof.
//   AVISO DE PORTE: aquele arquivo está em CommonJS, com module.exports na
//   linha 61. Aqui não existe require nem module.exports: o que se leva é a
//   lógica, e o que se escreve é export. Pior: o cinematch.js usa globais sem
//   declarar — opcao = prompt(...) na linha 31, e for (i = 0; ...) nas linhas
//   171 e 330. Copiado como está, isso dá ReferenceError em módulo ES, porque
//   em módulo o escopo é estrito. Todo identificador novo ganha let ou const.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF06, pág. 7, e RF14, pág. 9)
//   RF06: "Traga as classes Conteudo e Serie (com herança e uso de this) do
//   CineMatch JS para dentro de modelo.js. Adapte o construtor, se necessário,
//   para receber os dados já tratados no RF05."
//   RF14: export class Conteudo { /* ... */ }
//   export class Serie extends Conteudo { /* ... */ }
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - Critério 7 (peso 0,50) pede classe, construtor, atributos, método, this
//     e herança. A subclasse precisa ACESCENTAR comportamento, não só repetir
//     o da mãe: com a Serie fazendo exatamente o que a Conteudo já faz, a
//     herança existe escrita e não se justifica. Uma classe que só copia a
//     mãe é a forma de herança que a revisão pega primeiro.
//   - super(...) vem antes de qualquer this no construtor da subclasse. Usar
//     this antes de super não é estilo: é ReferenceError.
//   - Os nomesConteudo e Serie são contrato com o briefing, com o quadro e
//     com o que o professor vai procurar no código. Não renomear.
//   - A verificação é node --check neste arquivo e node js/script.js no
//     fluxo. A linha de bootstrap que o script.js usava para citar
//     PLACEHOLDER_MODELO saiu no fim da M1-T06, então hoje o único lugar que
//     ainda dependia deste export existir era o `import` do topo de lá: isso
//     já foi resolvido na M1-T09.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T17 · RF14 · Separar os módulos ES
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 3 DE 3 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T11, M1-T12, M1-T13, M1-T14, M1-T15
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Esta é a etapa de fechamento: conferir a lista de export deste arquivo
//     e fazer cada nome bater com o import do js/script.js.
//   - A lista é curta de propósito: Conteudo e Serie. O RF05 já entregou o
//     array tratado e o RF07 entrega o cálculo dentro da Serie, então este
//     arquivo não tem função de cálculo solta para exportar.
//   - Conferir o caminho do import: './modelo.js', com ponto e com extensão
//     explícita. Sem o ponto, vira bare specifier: o navegador não resolve e falha.
//   - A classe que o script.js instancia é a Serie, e é ela que recebe o
//     objeto do map da M1-T08.
// POR QUE ESTE TRECHO EXISTE
//   O grafo de módulos só funciona se os nomes baterem. Um export que não
//   casa com o import não dá erro no console de quem escreve: dá erro em
//   tempo de execução, no navegador, e a página fica sem JavaScript nenhum —
//   o pior sintoma possível, porque parece problema de sintaxe.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   semana-12/modulos/ — o README.md da pasta mostra o "antes", com require
//   e module.exports, e o slug.js da pasta já é o "depois", com export. A
//   frase que resolve: require vira import, module.exports vira export.
//   Aqui o browser resolve o módulo pela tag type="module" do script no
//   index.html, e não por package.json — que é do Node.
//   O "depois" é o commit a413b0c, de 18/09/2026; sem ele, parece CommonJS.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF14, pág. 9)
//   // modelo.js
//   export class Conteudo { /* ... */ }
//   export class Serie extends Conteudo { /* ... */ }
//   // script.js
//   import { Conteudo, Serie } from './modelo.js';
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - A forma é named export, com export na frente da class. O exemplo do
//     professor é exatamente esse, e o import do outro lado é nomeado também.
//   - Exportar default não foi ensinado e divergiria do exemplo: não usar.
//   - Lembrar que o PLACEHOLDER_MODELO já saiu na M1-T09. Se ele ainda
//     estiver aqui quando esta etapa rodar, o grafo está com nome duplicado
//     e o import do script.js fica ambíguo.
// ────────────────────────────────────────────────────────────────────────────
