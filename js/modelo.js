/**
 * CineMatch Web — módulo de classes.
 *
 * Responsabilidade (AGENTS.md, seção 3): definir as classes `Conteudo` e
 * `Serie`, com herança e uso de `this`. As classes entram na M1-T09 (RF06).
 *
 * Esqueleto da tarefa M1-T01 (RF15 parcial): este export provisório existe para
 * que o `import` do script.js já resolva desde o primeiro dia. Nada aqui é
 * funcional ainda — a constante PLACEHOLDER_MODELO é apagada na M1-T09.
 */
export const PLACEHOLDER_MODELO = {
  pronto: false,
};

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
 * PLACEHOLDER_MODELO
 *   A constante da linha 11 PERMANECE e só sai na M1-T09, quando as classes
 *   reais entrarem. Ela está acima desta região de propósito: o export
 *   provisório e o esboço convivem, e o import do script.js precisa resolver
 *   desde o primeiro dia.
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
 *   throttle, <template>, localStorage.removeItem, padStart e o namespace
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
//   - APAGAR PLACEHOLDER_MODELO, que está na linha 11 deste arquivo, e
//     tirar o nome do import do js/script.js, no mesmo passo.
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
//     fluxo: o console.log de bootstrap do script.js referencia
//     PLACEHOLDER_MODELO, e por isso quebraria junto se este export sumisse
//     sem ele ser ajustado.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T10 · RF07 · Calcular e classificar a compatibilidade
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 2 DE 3 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T09
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - O método que compara os gêneros do perfil com os da instância e devolve
//     o objeto de resultado: generosEmComum, generosNaoExplorados, percentual
//     e classificacao.
//   - A fórmula: gêneros em comum dividido pelo total de gêneros do CONTEÚDO,
//     vezes 100. O denominador é do conteúdo, não do perfil — é o que o
//     briefing e o projeto da semana 6 fazem, e inverter isso muda a nota.
//   - A classificação, com if-else: 80 ou mais é Alta, 50 ou mais é Média, o
//     resto é Baixa. O Critério 5 pesa 1,00 e ele exige a faixa, não só o
//     número.
//   - A lista de gêneros não explorados é o filtro de sobra: os da instância
//     que não estão entre os favoritos. A seção 5.4 do briefing diz que um
//     laço explícito para montar essa lista é bem-vindo, e o filter resolve
//     com um método que o RF05 já contou.
//   - Onde o resultado é montado, e o que a tela consome: o contrato de campos
//     com o js/ui.js é este, e é a lista de campos que o renderizarCard da
//     M1-T11 vai ler.
// POR QUE ESTE TRECHO EXISTE
//   O RF07 é o cálculo, e ele precisa de contexto para existir: a mesma
//   conta feita sobre um objeto solto não é método de instância. Colocando o
//   cálculo na Serie, this passa a ter função de verdade e a herança da M1-T09
//   se justifica. A alternativa é função pura no script.js, que é mais
//   parecida com o projeto antigo e deixa a classe sem função — a escolha é
//   sua, e ela está registrada aqui como pergunta, não como resposta.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/cinematch.js — compatibilidade() (linhas 292 a 321) é a
//   fórmula: ela mapeia o catálogo, normaliza os favoritos com normalizarTexto,
//   filtra os gêneros em comum, divide e classifica nos limiares da linha 304
//   (>= 80, Alta) e da linha 306 (>= 50, Média). A orquestração, que é o papel
//   do script.js e não deste arquivo, é calcularCompatibilidades() (linha 323).
//   E obterConteudosPorGenero() (linha 472) NÃO chama a fórmula nem serve de
//   exemplo de orquestração: ela reimplementa o filtro de gêneros (477 a 479)
//   e devolve { conteudo, generosEmComum, generosFaltantes } (486 a 490). A
//   referência útil dela é o generosFaltantes da linha 481, que é a linha de
//   onde a lista de gêneros não explorados é montada — e é essa lista que este
//   arquivo precisa devolver por this.
//   Para a ORDENAÇÃO por afinidade, a referência é o bloco .sort(...) dentro
//   de recomendarProximoGenero (linhas 438 a 448), cujo desempate usa
//   localeCompare(..., "pt-BR") na linha 447. As linhas 357 a 359 NÃO são
//   essa referência: ali é um compatibilidade() seguido de um .find().
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF07, pág. 7)
//   "Mantém a mesma regra do projeto anterior (gêneros em comum / total de
//   gêneros do conteúdo × 100) e a mesma classificação por faixa
//   (Alta/Média/Baixa afinidade), usando if-else, switch-case ou ternário —
//   só que agora o resultado é exibido na tela, não no console."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - A normalização dos dois lados, e só de caixa e acento. O normalizarTexto
//     (cinematch_antigo/cinematch.js:284) NÃO traduz: "Comédia" continua
//     "comédia" e não vira "Comedy". A comparação é direta com o value que o
//     Lucas pôs no HTML, e esse value precisa estar em inglês. Se a lista do
//     HTML vier em português, toda série sai com 0% e o Critério 5, que pesa
//     1,00, quebra sem erro visível.
//   - O nome dos campos é contrato com o js/ui.js. O projeto antigo devolvia
//     compatibilidade e afinidade; aqui o nome é percentual e classificacao,
//     porque é o que o contrato de classes do card e o CSS da M1-T12
//     esperam. Mudar de nome é permitido, mas os dois lados têm de mudar
//     juntos e o vídeo tem de explicar.
//   - Evitar divisão por array vazio: o filtro de generos.length > 0 já veio
//     da M1-T08, e é o que evita isso aqui.
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
