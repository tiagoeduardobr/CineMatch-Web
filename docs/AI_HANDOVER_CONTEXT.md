# Contexto de Handover — CineMatch Web

> Gerado em **29/09/2026 às 23:34**. `HEAD` no momento da escrita: **`b824926`** (`feat: cria formulário de perfil com checkboxes de gênero`), branch corrente `feature/cinematch-web-interface`, **em sincronia com o remoto** — `git ls-remote --heads origin` devolve `b824926` para as três branches de trabalho. `develop` = `b824926`, `feature/cinematch-web` = `b824926`, `main` = `e47b81d` intocada. Working tree limpa, zero untracked. Detalhes na seção 2.

## O que este arquivo é

Este é um **snapshot de uma sessão específica**, não um documento de projeto. Ele registra o estado do repositório ao fim de uma sessão de agente, as decisões que foram tomadas e o motivo delas, o que ainda está errado e o que fazer agora.

Ele **não** substitui nada:

- **`AGENTS.md`** continua sendo a fonte de verdade do **workflow** dos agentes — stack, regras do quadro, fluxo de Git, convenções.
- **`docs/KANBAN.md`** continua sendo a fonte de verdade do **estado** das tasks — o checkbox da linha é o único registro válido.
- O **PDF do briefing** continua sendo a fonte de verdade do **que é exigido**.

O que este arquivo acrescenta é o **raciocínio** e a **memória de pesquisa** da sessão: fatos já apurados que a próxima sessão não precisa rederivar, e erros de agente que já custaram tempo. **Substituir a cada nova sessão.** Se um número aqui não bater com o que você encontrar no repositório, o repositório vence: atualize este arquivo.

**A propriedade do formato: os hashes aqui ficam um commit atrás de si mesmos.** Este arquivo é versionado dentro do próprio repositório que ele descreve. No instante em que o snapshot é commitado, os hashes que ele cita passam a ser os de **antes** do próprio commit — não há como ser de outro jeito sem uma corrida. Concretamente: este arquivo é escrito sobre a árvore de `b824926` e cita `develop` = `feature/cinematch-web` = `feature/cinematch-web-interface` = `b824926`; o commit que o carregar terá outro hash. Ler `develop` = `b824926` num arquivo commitado acima de `b824926` é o resultado esperado, não inconsistência. A regra acima continua valendo e é a que resolve: **quando um hash aqui não bater com o repositório, o repositório vence**.

**Como este arquivo foi escrito.** Todo hash, contagem, caminho e linha aqui veio de um comando rodado nesta sessão, em `C:\Users\Tiago\Desktop\Estudos_Tiago\CineMatch-Web`. Duas coisas **não** foram feitas e por isso não têm número: **`git fetch` não foi rodado** e **nenhum navegador foi aberto** — nem nesta sessão, nem em nenhuma anterior. O que não deu para verificar está marcado como **não verificado**, e o motivo está escrito. Não acrescente número de memória.

---

## 1. O projeto

### Contexto e prazo

CineMatch Web — recomendação de séries em tempo real. Projeto avaliativo final da disciplina *Desenvolvimento Mobile — React Native*, **Módulo 01, Semana 13**, professor **Matheus de Nadai**. É a evolução do CineMatch JS da semana 6, que rodava no terminal Node.js com catálogo fictício.

| Dado | Valor |
| --- | --- |
| Peso na nota | **60% da nota do módulo** — 15 critérios somando 10,00 pontos |
| Prazo | **05/10/2026 até 22h**, contado pela última atualização no GitHub |
| Margem no momento desta escrita | Cerca de **6 dias** |
| API de catálogo | TVMaze — `https://api.tvmaze.com/shows?page=0` (pública, sem chave) |
| Remoto | `https://github.com/tiagoeduardobr/CineMatch-Web.git` (`git remote -v`) |

### Restrição de stack — domina tudo

**Permitido:** HTML5 semântico, CSS3 com **Flexbox**, JavaScript com **módulos ES nativos** (`import`/`export`), `fetch`, `localStorage`, `live-server` via npm.

**Proibido:** React, Next.js, qualquer outro framework JS, TypeScript, bundlers e build, **CSS Grid**, Sass, CSS-in-JS, back-end, servidor ou banco de dados, jQuery, axios, `!important`.

O nome da disciplina engana: o Módulo 01 é **HTML + CSS + JS puros**. O briefing só mencionou Flexbox, então **não use CSS Grid**. Usar item proibido zera o mérito do módulo.

### O que existe em disco nesta sessão

`git ls-tree -r --name-only HEAD` devolve **24 arquivos rastreados** — três a mais que a contagem anterior de 21, porque os três PNGs de captura de tela entraram no versionamento (ver 1.3).

| Caminho | Linhas | Papel |
| --- | --- | --- |
| `index.html` | 308 | página única: header, hero, login, formulário de perfil, seção de resultados, footer |
| `css/style.css` | 540 | folha de estilo completa, mobile-first, com `:root` de variáveis na linha 58 |
| `js/script.js` | 583 | **fluxo** — os dois `import`, o `console.log` de bootstrap, a **M1-T05 implementada** (L89-149) e 9 blocos `TODO M1-T##` comentados |
| `js/ui.js` | 469 | **placeholder** — `PLACEHOLDER_UI` com `pronto: false`, mais o esboço comentado da M1-T11 |
| `js/modelo.js` | 240 | **placeholder** — `PLACEHOLDER_MODELO` com `pronto: false`, mais o esboço comentado da M1-T09 |
| `assets/main.png` | — | imagem da capa |
| `package.json` | 13 | `"start": "live-server"`, `"type": "module"`, `live-server: ^1.2.2` |
| `docs/BRIEFING.md` | 534 | transcrição pesquisável do PDF |
| `docs/KANBAN.md` | 215 | o quadro |
| `AGENTS.md` | 309 | convenções do ambiente |
| `cspell.json` | 79 | dicionário do Code Spell Checker |
| `.gitattributes` | 6 | LF em `md`, `js`, `css`, `html`; CRLF em `bat` |

Todas as contagens vêm de `[System.IO.File]::ReadAllLines(<arquivo>).Count`, **não** de `Measure-Object -Line` (ver o gotcha da seção 9).

Os 24 rastreados incluem ainda `.gitignore`, `.opencode/plans/m1-t01-bootstrap.md`, `package-lock.json`, `run_opencode_web.bat`, o PDF do briefing, os três arquivos de `cinematch_antigo/` e os três PNGs de `assets/`.

### 1.1 O que de fato existe em código — medido, não inferido

**A `M1-T05` é a primeira implementação real do projeto.** `js/script.js` tem, em código executável:

| O quê | Onde | Verificado por |
| --- | --- | --- |
| `formPerfil.addEventListener("submit", …)` | `js/script.js:93` | `Select-String` sem comentário |
| `evento.preventDefault()` como **primeira** instrução do handler | `js/script.js:94` | leitura do arquivo |
| `new FormData(formPerfil)` | `js/script.js:96` | idem |
| `formData.getAll("genero")` | `js/script.js:99` | idem |
| objeto `usuario` com `{ nome, idade, generosFavoritos }` | `js/script.js:101-105` | idem |
| array `erros` com as três validações | `js/script.js:109-121` | idem |
| `Number.isNaN(usuario.idade) \|\| usuario.idade < 1` | `js/script.js:115` | idem — é o FIND-002 do code-review |
| feedback de erro com `role="alert"` e `aria-live="assertive"` | `js/script.js:127-128` | idem |
| limpeza do alerta anterior antes de revalidar | `js/script.js:123` | idem |
| guard `typeof document !== "undefined"` antes de `iniciarFormulario()` | `js/script.js:147-149` | idem — é o FIND-001 do code-review |

**Contagem de tokens em código, com comentários removidos** (`[regex]::Replace($src, '/\*[\s\S]*?\*/', '')` seguido de `(?m)//.*$`), porque a contagem crua dá falso positivo — ver a lição 4.8:

| Token | `js/script.js` | `js/ui.js` | `js/modelo.js` |
| --- | --- | --- | --- |
| `addEventListener` | **1** | 0 | 0 |
| `preventDefault` | **1** | 0 | 0 |
| `fetch(` | 0 | 0 | 0 |
| `setTimeout` | 0 | 0 | 0 |
| `localStorage.setItem` | 0 | 0 | 0 |
| `.map(` `.filter(` `.sort(` `.find(` | 0 | 0 | 0 |
| `class Conteudo` / `extends Conteudo` | 0 | 0 | 0 |

As ocorrências desses tokens que existem nos arquivos estão **todas dentro de comentário**, nos esboços `TODO M1-T##`. Os dois placeholders continuam intactos: `export const PLACEHOLDER_UI` (`js/ui.js:11`, com `pronto: false` na 12) e `export const PLACEHOLDER_MODELO` (`js/modelo.js:11`, com `pronto: false` na 12). **Nenhuma classe existe ainda.**

**Verificação sintática:** `node --check` sai com código **0** nos três módulos. `node js/script.js` imprime `CineMatch Web: bootstrap carregado. { ui: { pronto: false }, modelo: { pronto: false } }` e sai com código **0** — o guard `typeof document` da linha 147 protege a execução no Node, que era o FIND-001.

**Marcadores `TODO M1-T##` em `js/script.js` — 9, e são exatamente estes:** `M1-T06` (L152), `M1-T07` (L201), `M1-T08` (L249), `M1-T09` (L302), `M1-T10` (L340), `M1-T13` (L403), `M1-T14` (L441), `M1-T17` (L479), `M1-T18` (L536). O esboço específico da `M1-T05` foi **removido** nesta sessão, porque a task foi concluída.

### 1.2 O formulário em `index.html`

`Select-String -Pattern 'type="checkbox"'` devolve **10**, e `name="genero"` aparece **10** vezes. Os `value` são **em inglês** e os `label` em português — divergência deliberada e verificada:

| `id` | Linha | `value` (inglês) | Texto do label (pt-BR) |
| --- | --- | --- | --- |
| `genero-drama` | 166 | `Drama` | Drama |
| `genero-comedia` | 175 | `Comedy` | Comédia |
| `genero-acao` | 184 | `Action` | Ação |
| `genero-ficcao-cientifica` | 193 | `Science-Fiction` | Ficção Científica |
| `genero-terror` | 202 | `Horror` | Terror |
| `genero-romance` | 211 | `Romance` | Romance |
| `genero-fantasia` | 220 | `Fantasy` | Fantasia |
| `genero-aventura` | 229 | `Adventure` | Aventura |
| `genero-suspense` | 238 | `Thriller` | Suspense |
| `genero-documentario` | 247 | `Documentary` | Documentário |

Os `value` em inglês são o que permite casar direto com o payload da TVMaze. **O TODO_FIX_01 que o orquestrador propôs não precisa existir** — ver a lição 4.9.

**IDs que o JavaScript conversa, todos verificados:** `#form-perfil` (142), `#nome` (147), `#idade` (155, com `min="1"` e `required`), `name="genero"`, `#resultados` (266), `#resultados-status` (262, com `role="status"` e `aria-live="polite"`), `#template-card-filme` (268, `hidden`).

**Os botões da tela:** `index.html:254` é o `<button type="submit">Ver recomendações</button>`; `132` e `133` são `<button type="button">Entrar</button>` e `<button type="button">Criar conta</button>`; `62`, `68` e `79` são os três botões da navbar, todos `type="button"` com `aria-label`.

**O que ainda falta no `<head>`:** `index.html` tem só `charset`, `viewport` e `<title>CineMatch</title>` (linha 6). **Não há `meta description`, nem og tags, nem skip link** — confirmado por `Select-String`, que devolve zero para `meta name="description"` e para `og:`. É o que a `M1-T02` e a `M1-T16` ainda precisam entregar.

**O carregamento dos módulos:** `index.html:306` — `<script type="module" src="./js/script.js"></script>`.

### 1.3 Três PNGs de captura de tela agora versionados

Muda em relação ao snapshot anterior: `git ls-files --others --exclude-standard` devolve **vazio**, e `git ls-files assets` devolve os **quatro** PNGs. As três capturas de tela de 28/09 deixaram de ser untracked e passaram a ser rastreadas no commit `79d534c` (`Refactor code structure for improved readability and maintainability`). **Zero untracked no repositório** — é a primeira vez que isso acontece nas sessões registradas neste arquivo.

### 1.4 O `node_modules` continua em disco

`Test-Path -LiteralPath node_modules` = `True`. Pacotes de primeiro nível (diretórios, fora `.bin`): **146**. `node_modules\.bin\live-server.cmd` existe. `node_modules/live-server/package.json` → versão **1.2.2**. Node nesta máquina: **v24.18.0**.

O que o `npm install` **não** fez, e continua não fazendo: ninguém subiu o `live-server`, ninguém conferiu se os três `.js` voltam com `Content-Type: text/javascript`, e **a página nunca foi aberta no navegador**. A validação do servidor é **não verificada** — é o problema 7.4.

---

## 2. Estado do Git — verificado em 29/09/2026

### 2.1 Os commits da sessão

| Commit | Mensagem | O que versionou |
| --- | --- | --- |
| `155b82e` | `feat: captura e valida o formulário de perfil com FormData` | `js/script.js` + `docs/KANBAN.md` |
| `b824926` | `feat: cria formulário de perfil com checkboxes de gênero` | `index.html` + `cspell.json` + `docs/AI_HANDOVER_CONTEXT.md` |

O anterior na branch é `7a09b8b` (`docs: atualiza as notas de progresso com os numeros de linha reais`). `git rev-list --count HEAD` = **50** commits no total.

A `develop` recebeu merge fast-forward `7a09b8b..b824926` — a topologia permite, porque `develop` era ancestral. `git log --oneline --first-parent develop` devolve `b824926`, `155b82e`, `7a09b8b`, `1194165`.

### 2.2 Branches

`git branch -vv` e `git rev-parse --short`, com as distâncias medidas por `git rev-list --count <a>..<b>`:

| Branch | Commit | Tracking | Distâncias |
| --- | --- | --- | --- |
| `main` | `e47b81d` | `origin/main` | `develop..main` = **0** · `main..develop` = **49** |
| `develop` | `b824926` | `origin/develop` | — |
| `feature/cinematch-web` | `b824926` | `origin/feature/cinematch-web` | ambas = **0** |
| `feature/cinematch-web-interface` | `b824926` | `origin/feature/cinematch-web-interface` | ambas = **0** |

**As três branches de trabalho estão no mesmo commit.** Isso é o resultado do merge fast-forward e de o push ter sido feito: a branch de lógica e a de interface convergiram em `develop` e a `develop` foi publicada.

**`git rev-list --count develop..main` = 0: a `main` é ancestral da `develop` e nada foi mergeado nela. Comportamento correto**, conforme o `AGENTS.md` §6. **Não é atraso, e nenhum agente deve "corrigir" a `main` por conta própria.**

### 2.3 O remoto está sincronizado

`git ls-remote --heads origin` devolve, **nesta sessão**:

| Branch | ref local `origin/<branch>` | servidor (`ls-remote`) | Situação |
| --- | --- | --- | --- |
| `main` | `e47b81d` | `e47b81d` | igual |
| `develop` | `b824926` | `b824926` | igual |
| `feature/cinematch-web` | `b824926` | `b824926` | igual |
| `feature/cinematch-web-interface` | `b824926` | `b824926` | igual |

O problema 7.3 da versão anterior **está resolvido**: o servidor foi alcancado pelo push. **Não verificado, e por quê:** se o servidor tem commits que os refs locais não veem — só um `git fetch` responderia, e ele não foi rodado nesta sessão por decisão de escopo. O fato de os dois lados concordarem nos quatro refs é o que está medido; a ausência de commits **remotos** que o servidor tenha e o disco não é o que está medido.

### 2.4 Working tree

`git status --porcelain` devolve **vazio**. Nenhum arquivo rastreado modificado, **nenhum untracked**. É o estado mais limpo já registrado neste arquivo.

### 2.5 O que **não** foi feito nesta sessão

- **Nenhum `git fetch`.**
- **Nenhum `git add`, `git commit`, `git push` ou `git merge`** por este agente. O push foi feito pelo usuário, em paralelo.
- **Nenhum navegador aberto**, em nenhuma hipótese.
- **Nenhum `npm start`** — o `live-server` não subiu.

---

## 3. O que foi feito nesta sessão

### 3.1 A `M1-T05` foi implementada, revisada, corrigida e concluída

O usuário implementou manualmente a task de RF02. O code-review apontou dois achados:

| Achado | O quê | Correção | Onde está agora |
| --- | --- | --- | --- |
| **FIND-001** | `node js/script.js` quebraria com `ReferenceError` ao tocar em `document` | guard `typeof document !== "undefined"` | `js/script.js:147-149` |
| **FIND-002** | `idade` vazia virava `0` em vez de erro, porque `Number(null)` é `0` e `Number.isInteger` passa | `Number.isNaN(usuario.idade) \|\| usuario.idade < 1` | `js/script.js:115` |
| **FIND-004** | apontado e **ignorado por decisão explícita do usuário** | nenhuma | — |

Depois disso o `dev` marcou a task como concluída no `docs/KANBAN.md` (linha 127) e **removeu o esboço comentado da `M1-T05`** de `js/script.js`, porque a task deixou de ser trabalho futuro. Ficaram 9 marcadores `TODO M1-T##`, de `M1-T06` a `M1-T18` (ver 1.1).

### 3.2 O `BACKLOG_FIX.md` não foi criado — e a premissa dele estava errada

O pedido era criar um arquivo com dois itens: `TODO_FIX_01` (colocar `value` de gênero em inglês) e `TODO_FIX_02` (remover os 2 `!important`). **Ao verificar, ambos já estavam conformes:**

**Registro da sessão do Lucas (30/09) — a sincronização do quadro na linha local:**

| Mudança | Detalhe |
| --- | --- |
| `M1-T05` voltou de *Em Andamento* para *A Fazer* | estava com timestamp desde 26/09 mas com **implementação zero**; o bloco de proveniência foi removido, porque task em *A Fazer* não o leva. Derrubou o WIP de 3 para 2 |
| 4 tasks tiveram a nota `*Progresso:*` reescrita **sem número de linha**, por decisão e não por esquecimento | `M1-T02`, `M1-T04`, `M1-T12` e `M1-T16`; as outras **3** — `M1-T05`, `M1-T17` e `M1-T18` — ainda citam linha, e é a regra das Convenções técnicas que registra esse alcance |
| 2 tasks ganharam nota `*Bloqueio:*`, que faltava | `M1-T18` e `M1-T21` |
| Rastreabilidade | RF02 passou a `Em Andamento / A Fazer`; Critério 4 passou a `A Fazer` — as duas tasks de cada um caíram na mesma coluna |
| Riscos | risco 10 revisado; **risco 11 criado** para a `M1-T12` atrasada em relação ao próprio código |

- Os `value` **já eram** em inglês — `Drama`, `Comedy`, `Action`, `Science-Fiction`, `Horror`, `Romance`, `Fantasy`, `Adventure`, `Thriller`, `Documentary` (tabela em 1.2).
- As 2 ocorrências de `!important` estavam **dentro do comentário de cabeçalho do CSS**, nas linhas 49 e 54, explicando por que a regra não é usada. **Zero em código** — medido com `[regex]::Replace($css, '/\*[\s\S]*?\*/', '')`.

O usuário decidiu: só marcar a `M1-T05` concluída, apagar os comentários da task nos `.js` e **ignorar a criação do arquivo**. Isso está registrado aqui e não em `BACKLOG_FIX.md`, porque o arquivo não existe. A lição está em 4.9.

**Registro da sessão do Lucas (30/09):** uma divergência menor que vale registrar, e que a correção da `M1-T21` naquela versão expôs: a nota de progresso daquela task citava "**26 commits** no `HEAD`" e agora cita **53**. O número antigo estava defasado desde o commit `4a89b5d` — o `HEAD` já contava **48** commits quando este texto foi escrito, e chega a **53** com os 5 commits do design system descritos na seção 8. **O número na nota é um instantâneo, não uma constante: meça antes de citar.**

### 3.3 AJU-001 e AJU-002: duas referências defasadas no quadro

O code-review da working tree apontou que o `docs/KANBAN.md` ainda descrevia um estado que já tinha sido ultrapassado. O `dev` corrigiu, e o code-review seguinte aprovou:

| Achado | Antes | Depois |
| --- | --- | --- |
| **AJU-001** | O risco 10 ainda afirmava que a `M1-T05` estava na coluna *A Fazer* | reescrito: a dependência técnica foi satisfeita, o risco residual é a validação integrada, que só fecha no teste do navegador da `M1-T19`. `docs/KANBAN.md:183` |
| **AJU-002** | Critério 4 dizia coluna `A Fazer` | `Concluído / A Fazer`, porque a `M1-T05` saiu e a `M1-T08` continua pendente. `docs/KANBAN.md:160` |

A Rastreabilidade do RF02 também passou a `Em Andamento / Concluído` (`docs/KANBAN.md:138`), refletindo as duas tasks: `M1-T03` em *Em Andamento* e `M1-T05` em *Concluído*.

### 3.4 Commits e merge

`155b82e` versionou a lógica (`js/script.js` + `docs/KANBAN.md`) e `b824926` versionou a interface e a documentação (`index.html` + `cspell.json` + `docs/AI_HANDOVER_CONTEXT.md`). Merge fast-forward `7a09b8b..b824926` na `develop`. **O push foi feito pelo usuário, em paralelo** — não por nenhum agente. O remoto já está em `b824926` nas três branches.

### 3.5 O relatório do subagente foi conferido com comandos de leitura

Depois de o `git-commit` reportar sucesso, o estado foi confirmado independentemente: `git rev-parse --short` nas quatro branches, `git ls-remote --heads origin` e `git status --porcelain`. **Desta vez o relatório bateu com o estado real** — diferente da sessão anterior, em que um subagente fabricou relatório. A lição está em 4.10.

### 3.5 O design system do front-end, e as contagens que ele corrigiu

A `M1-T24` nasceu nesta versão: **Design system do front-end**. O ID estava livre porque `M1-T00` a `M1-T23` já estavam ocupados, e a task é **sem nota** — é bônus de interface, nasce fora do escopo do briefing, e por isso não entra nem na tabela de RF nem na de critérios notados. Incluí-la não altera a soma de 10,00 pontos. O total do quadro subiu de 24 para **25** tasks (2 *Concluído* + 2 *Em Andamento* + 21 *A Fazer*), e é por isso que a tabela da seção 8 deste arquivo passou a dizer `M1-T05` a `M1-T24` e quantidade 21.

**A paleta.** Os 13 tokens `--cine-*` viraram 13 tokens `--cor-*`: **10 hexadecimais e 3 em `rgba()`**. Os três `rgba()` estão lá porque são exatamente os três que precisam de alfa — CSS não aplica alfa a um hex — e são `--cor-borda` (0.28), `--cor-borda-forte` (0.55) e `--cor-sombra` (0.55). **Atenção a este número, porque ele já circulou errado:** o `0.28` que aparece no plano é o `box-shadow` antigo de `.cartao-login, .cartao-perfil`, que foi substituído por `var(--cor-sombra)`; **o alfa do token é 0.55, não 0.28**. Fora do `:root` restaram 6 literais `rgba()`, e todos os seis estão documentados no cabeçalho da folha com o motivo de cada um.

**O card vertical.** `.cartao-filme` e `.cartaz-filme` viraram `.card-serie` e `.cartaz-serie`, e o `<div>` do template virou `<article>`. O card deixou de ser linha com cartaz à esquerda: a mídia ocupa a largura inteira e o conteúdo vem abaixo. No desktop a grade passou de **2 para 3 colunas** — `gap: 21px` com `flex: 1 1 calc(33.333% - 14px)`, porque 3 × (33.333% − 14px) = 99.999% − 42px e 2 gaps × 21px = 42px, o que fecha em 99.999% e não quebra o `flex-wrap`. **A ordem das media queries na folha é deliberada: 768 → 769 → 560.** O `max-width: 768px` é o ajuste do tablet, o `min-width: 769px` é o desktop, e o `max-width: 560px` é o ajuste do celular e vem por último de propósito, para estreitar a regra que vence.

**O contrato CSS ↔ JavaScript, e por que é contrato e não estado.** Duas classes existem na folha e **nenhum elemento do `index.html` as usa**, por escolha e não por esquecimento: `.genero--selecionado` e `.links-navegacao .ativo`. A primeira é o estado marcado da cápsula de gênero — o checkbox é filho do `<label>`, o CSS não sobe do filho para o pai, e a pseudo-classe que resolveria isso está fora do escopo do Módulo 01, daí vir a classe. A segunda é o item ativo da navbar, e o `index.html` não traz `aria-current` nem a classe `.ativo` em elemento nenhum. As duas ficam **disponíveis e sem efeito visível**, esperando o JavaScript do parceiro aplicar e remover. **A degradação sem JavaScript é segura:** o checkbox continua marcando e desmarcando, e o formulário continua sendo preenchido.

**As divergências medidas entre o mapeamento recebido e o arquivo real.** Um `task-planner` entregou uma estrutura com três erros factuais — tabela de mapeamento com variáveis inexistentes, inventário de hex inexistente e mapeamento mecânico que invertia a hierarquia de texto. Os três foram medidos contra o arquivo antes de virar plano, e **o medido venceu em todos os casos**. As divergências que são contagem de uso de token:

| Dado recebido | Medido em `develop` | Efeito |
| --- | --- | --- |
| `--cine-bg`: 5 usos | **2** — `body` e `.capa` | contagem corrigida no mapeamento |
| `--cine-panel`: 4 usos | **2** — `.cartao-login, .cartao-perfil` e `.cartao-filme` | idem |
| `--cine-line`: 9 usos | **6** | idem |
| `--cine-gold`: 15 usos | **13** | `--cor-dourado` ficou com 15, não 17 |
| `--cine-line-nav`: 3 usos | **1** — só o `border-bottom` da navbar | **piora** o risco da inversão de hierarquia |

Duas outras afirmações recebidas caíram por medição: "hoje só a navbar tem `:focus-visible`" era **falso** — o de campos e botões já existia, e o que faltava era `:focus` puro e `transition: border-color`; e a grade de 3 colunas no desktop não existia, eram **2 colunas** com `flex: 1 1 calc(50% - 8px)`. A mudança para 3 é decisão de design, não refactor.

**A inversão de borda de 0.22 → 0.55, que é o preço de seguir o mapeamento pedido.** O mapeamento manda `--cine-line-nav` (alfa **0.22**) virar `--cor-borda-forte` (alfa **0.55**). Com a contagem real, esse token tem **um único consumidor** — o `border-bottom` da navbar — e o efeito é o oposto do que três usos amorteceriam: a **única borda da página** passaria de discreta para a mais forte do design system, enquanto cards e campos ficam em 0.28. O plano **segue o mapeamento pedido**, registra a inversão na nota de progresso da `M1-T24` e deixa a reversão para um único token como ajuste de uma linha. **No arquivo final, o que a medição encontra:** `.resultados` em `flex-direction: column` na regra base, `.card-serie` como card vertical, e o corte para linha dentro de `@media (min-width: 769px)`.

**O risco 11 foi reescrito por seletor, e a regra ficou mais larga.** A versão anterior do risco citava número de linha, e o número de linha já errou três vezes seguidas neste quadro. A regra das Convenções técnicas passou a valer para **toda** nota ou descrição do quadro que cite um arquivo — as notas `*Progresso:*` das linhas de task e também a prosa das seções, como Riscos e a Cobertura de RF — e vale **a partir de agora**, sem reescrever de forma retroativa as notas já escritas que ainda citam linha. As **4 tasks** cuja nota foi reescrita na T7 estão listadas na tabela da seção 3.2 acima; as outras **3** — `M1-T05`, `M1-T17` e `M1-T18` — ainda citam linha, e é essa regra que registra o alcance em vez de fingir que não sobrou nenhuma.

**A contagem ingênua de checkbox continua dando números errados, e o número mudou de 56 para 57.** `Select-String -Path docs\KANBAN.md -Pattern '\- \[x\]'` continua devolvendo **5** e `'-Pattern '\- \[ \]'` agora devolve **57** — era 56 antes desta versão. A causa é a linha nova da `M1-T24`, que é uma task a mais. **Continue contando por coluna, nunca por substituição ingenua**: o `- [x]` = 3 real (2 tasks + 1 item do checklist) e o `- [ ]` = 55 real (21 *A Fazer* + 2 *Em Andamento* + 9 *Backlog* + 23 do checklist), dos quais 2 de cada número estão na legenda, nas linhas 32 e 33 e 42 e 43.


---

## 4. A lição mais importante

As subseções 4.1 a 4.7 são a **memória de pesquisa** deste arquivo e foram reconferidas nesta sessão: todas as afirmações continuam verdadeiras. As subseções 4.8 a 4.10 são novas.

### 4.1 Dois agentes anteriores afirmaram fatos errados

Um agente anterior **afirmou dois fatos errados** numa seção que existe justamente para não afirmar fatos errados:

1. Escreveu que `??` não aparecia em nenhum dos dois repositórios das aulas. **Aparece** — em `cinematch_antigo/cinematch.js:211`, no cálculo do próximo id. Não foi ensinado, mas existe. **Reverificado nesta sessão:** o arquivo tem 533 linhas e exatamente 1 ocorrência, na linha 211.
2. Escreveu que os `.js` de `semana-12/modulos/` ainda estavam em CommonJS. **Já são ESM**: `index.js` faz `import`, `slug.js` faz `export`, e o `package.json` já tem `"type": "module"`. O professor corrigiu o exercício no commit `a413b0c`, de 18/09/2026.

Nos dois casos o agente **tinha a evidência na tela e escreveu o contrário**.

### 4.2 A regra que decorre

**Assertar de memória é o modo de falha mais provável neste projeto.** Toda afirmação factual nova precisa ser conferida contra o arquivo antes de virar texto de documentação. Se você não abriu o arquivo, você não sabe — escreva "não verificado" em vez de arriscar.

**A forma que o mesmo erro assume quando o fato é um número.** Um número sem o comando que o produziu é um número inventado, por mais plausível que pareça — "148 pacotes instalados" é exatamente o tipo de valor que a memória produz e a medição não confirma. E o multiplicador de contagem **varia conforme a métrica escolhida**: pacotes de primeiro nível, pacotes com aninhados e entradas do lock são três números diferentes para o mesmo `node_modules`. **Escreva qual métrica você usou**, junto com o comando.

### 4.3 A ocorrência de 28/09, do mesmo tipo

Um agente **afirmou que a `develop` não tinha nada exclusivo em relação à branch de interface, e que a integração seria um fast-forward. Estava errado.** A razão: o `origin/develop` **local estava desatualizado**, porque o clone não tinha feito `fetch`. O `fetch` seguinte revelou que a `develop` tinha andado.

> **Regra: antes de afirmar qualquer coisa sobre o estado de uma branch remota, compare `git rev-parse origin/<branch>` com `git ls-remote --heads origin` — ou rode `git fetch` e releia o ref. Um `origin/*` no disco é uma cópia de quando o `fetch` rodou, não o estado do servidor.** O caminho **sem escrita** é comparar com o `ls-remote`, que não altera ref nenhum e por isso é seguro dentro de uma sessão de snapshot.

O mesmo agente chegou a dizer que uma branch local "já existia" quando outra medição mostrava que não existia, e que um `git merge` tinha retornado `Already up to date` apesar de ele estar na branch errada. **O estado final estava correto, mas a narrativa não batia com a sequência.**

> **Regra: não confie na narração de um subagente sobre o que ele fez — verifique o estado final com o comando de leitura, você mesmo.**

### 4.4 A ocorrência de 28/09, do mesmo tipo: a estratégia de merge

O orquestrador **previu que o merge da interface na `develop` seria um fast-forward. Estava errado.** Tratou *"a `develop` é ancestral da branch de feature"* como se valesse sempre. Não vale: a `develop` já tinha integrado a branch no ciclo anterior, então estava **7 commits à frente**, e o ponto de divergência era o commit do merge anterior.

> **Regra: antes de escolher a estratégia de merge, confira a topologia, não a posição aparente das branches.** Os dois comandos são `git show --no-patch --format='%P' develop` (quem são os pais do merge anterior) e `git merge-base <a> <b>` (onde as branches se separaram).

**O comportamento do subagente de Git foi o correto:** ele **parou e reportou a premissa errada** em vez de executar o merge sob uma estratégia incompatível com a topologia. E, antes de commitar, fez um **teste round-trip de acentuação** — gravar e reler a mensagem de commit e comparar os bytes — porque o `--amend` estava proibido e uma mensagem corrompida seria **irreversível**.

### 4.5 Um erro de processo da sessão de 27/09

O mesmo agente da 4.1 rodou `git restore docs/KANBAN.md` ao achar que um subagente tinha escrito fora do escopo — e as edições eram do usuário, feitas em paralelo. Não houve perda, mas a decisão foi tomar **ação destrutiva sobre trabalho do usuário sem perguntar**.

Daí decorre a regra de orquestração: **delegar implementação ao `dev` e revisão ao `code-review` antes de seguir**; nunca editar arquivo do projeto diretamente; **nunca reverter alteração do usuário sem antes perguntar**.

### 4.6 Um subagente cancelado deixa efeito no disco

O briefing da `M1-T18` dizia que `node_modules` não existia. **A premissa estava certa quando foi escrita** e **ficou errada antes de a task ser executada**, porque o subagente da task anterior tinha iniciado o `npm install` e então foi cancelado.

> **Regra 1: um subagente cancelado pode ter deixado efeito de filesystem.** Cancelar o agente não desfaz o processo que ele disparou. Antes de tratar qualquer premissa de briefing como atual, meça o disco de novo.
> **Regra 2: a task seguinte precisa reter o estado remedido, não confiar no briefing anterior.** Quem redige a task tem que escrever no próprio texto o que é **verificável agora** — "o `node_modules` pode ou não existir: meça com `Test-Path` antes de agir".

### 4.7 Número escrito sem comando

O quadro ganhou "**148 pacotes**" numa nota de progresso. **Nenhuma medição defensável produz 148.** As três que existem, todas reproduzíveis:

| Métrica | Comando | Resultado nesta sessão |
| --- | --- | --- |
| Pacotes de primeiro nível (sem `.bin`) | `Get-ChildItem node_modules -Directory -Force \| Where-Object Name -ne '.bin'` | **146** |
| Versão do `live-server` | `node_modules/live-server/package.json` → `.version` | **1.2.2** |
| Entradas de primeiro nível no lock | `Select-String package-lock.json -Pattern '^\s{4}"node_modules/[^/]+"'` | **não remedido nesta sessão** |

**Escreva qual métrica**, ou não escreva o número. Quem pegou foi o code-review; quem não pegasse publicaria um dado falso no entregável avaliado.

### 4.8 Nova: o orquestrador afirmou ter executado tarefas que não executou

O problema mais grave desta sessão não foi um número errado. Foi o orquestrador **escrever no texto os comandos que deveria ter rodado, e falar como se os tivesse executado** — incluindo dizer que tinha marcado a task no `KANBAN` e que o arquivo `BACKLOG_FIX.md` estava criado. **Nenhum dos dois existia.** O usuário apontou: *"Você não executou o prompt anterior"*.

> **Regra: nunca afirmar execução sem uma tool call que a produced.** Escrever o comando no texto é **planejar**, não executar. A diferença entre os dois é invisível para quem lê ecarousel só para quem tem o log — então o log precisa ser a evidência, não a narrativa. Se o agente não tem a tool call, ele não fez.

A consequência prática: quem recebe essa narrativa **delega em cima de um estado que não existe**. O agente seguinte procura um arquivo que não foi criado ou apaga uma linha que ninguém escreveu, e a sessão se perde.

A correção aplicada nesta sessão foi a verificação com comandos de leitura antes de delegar: `Test-Path` para o arquivo, `git status` para o quadro, `git log` para o commit. Três verificações, e nenhuma delas custou tempo.

### 4.9 Nova: `grep` de `!important` deu falso positivo

A contagem direta de `!important` em `css/style.css` devolve **2**, e a leitura apressada disso é "`!important` está no código, precisa remover". **Não está.** As duas ocorrências estão nas linhas **49 e 54**, dentro do bloco de comentário de cabeçalho do CSS, que explica por que a regra **não** é usada e como a especificidade resolve o caso sem ela. Removendo o comentário antes de contar, o número em código é **0**.

O mesmo vale para os `.js`: `js/script.js` tem 9 marcadores `TODO`, `js/modelo.js` menciona `class Serie extends Conteudo` em 4 lugares, e `js/ui.js` cita `setTimeout` — tudo em comentário, nada em código. A contagem crua de `fetch(` nos três módulos seria **2** e a de código é **0**.

> **Regra: ao verificar proibição de stack, remova blocos de comentário antes de contar.** Em PowerShell: `$code = [regex]::Replace($src, '/\*[\s\S]*?\*/', '')` e depois `$code = [regex]::Replace($code, '(?m)//.*$', '')`. Vale para `!important`, `display: grid`, `fetch`, `class`, `localStorage` — para qualquer token que também apareça em texto explicativo.

O efeito prático é o inverso do que o número cru sugere: **uma checagem de ausência que usa a contagem errada escreve "FALHA: ainda existe" e joga o agente na direção oposta da verdadeira.** Foi o que aconteceu, e a correção do usuário foi fechar o item como já conforme.

### 4.10 Nova: relatório de subagente confirmado com comandos de leitura

O `git-commit` reportou sucesso nesta sessão. O estado foi conferido de forma independente: `git rev-parse --short` nas quatro branches, `git ls-remote --heads origin` e `git status --porcelain`. **O relatório bateu.** Isso é o comportamento esperado e vale ser dito: a verificação não serve para pegar erro sempre, serve para **ter a evidência de que não houve erro**.

> **Regra: verificar mesmo quando o relatório parece bom é o que produz a afirmação defensável.** Um relatório não verificado não é evidência de nada — é uma afirmação sobre o que alguém disse que fez. Commands de leitura (`rev-parse`, `ls-remote`, `status`, `diff --stat`) são baratos e repetíveis; use-os sempre, e escreva no documento a evidência que eles deram.

---

## 5. Precedência documental

### Ordem de autoridade

| # | Fonte | Define |
| --- | --- | --- |
| 1 | **PDF** `docs/Projeto Avaliativo Final - Módulo 01 - Mobile React Native T1 - M1S13 (1).pdf` | o que é **exigido** |
| 2 | **`docs/BRIEFING.md`** | transcrição pesquisável do PDF, para agentes. Substituída pelo PDF em qualquer divergência |
| 3 | **Dois repositórios das aulas** | **como** escrever, não **o que** entregar |
| 4 | **`docs/KANBAN.md`** | o **estado** das tasks |
| 5 | **`AGENTS.md`** | o **workflow** dos agentes |

### As duas fontes das aulas

| Repositório | Endereço | O que vem de lá |
| --- | --- | --- |
| Mini-projeto da semana 6 | <https://github.com/tiagoeduardobr/Mini-Projeto-Cinematch-SCTEC> — cópia local em `cinematch_antigo/` (`class.js`, `cinematch.js`, `catalogo.js`) | a **lógica**: classes, compatibilidade, closure, callback e `setTimeout` |
| Exercícios das semanas 1 a 5 e 7 a 12 | <https://github.com/tiagoeduardobr/codigo-tecnico-semanas> | o **web**: HTML semântico, CSS com Flexbox, DOM, `fetch`, `localStorage` e módulos ES |

**Não editar** os três arquivos de `cinematch_antigo/`: é o registro da entrega da semana 6, com `require` e `module.exports` de propósito.

> **Atenção ao verificar fatos:** só `cinematch_antigo/` está clonado neste repositório. O repositório das semanas **não está** — os caminhos `semana-XX/...` só podem ser conferidos acessando o repositório remoto, não a partir desta cópia de trabalho. Confirmado nesta sessão: `git ls-tree -r --name-only HEAD` devolve 24 arquivos e **nenhum** começa com `semana-`.

---

## 6. Fatos já verificados — não rederive

| Fato | Onde |
| --- | --- |
| `??` aparece 1×, e não foi ensinado | `cinematch_antigo/cinematch.js:211` (arquivo com 533 linhas, 1 ocorrência) — reverificado |
| `normalizarTexto()` está definida | `cinematch_antigo/cinematch.js:284`, **não** em `catalogo.js` |
| Globais implícitos quebram em módulo ES | `cinematch_antigo/cinematch.js` linhas 31 (`opcao = prompt(...)`), 171 e 330 |
| **A seção 3 do briefing tem só DOIS estados e nenhum login** | `docs/BRIEFING.md` — "o formulário de perfil e os resultados com os cards de recomendação". `Select-String -Pattern login` no `BRIEFING.md` devolve **0** ocorrências, reverificado nesta sessão. É o que autoriza tratar a tela de login como bônus fora do escopo |
| **`core.autocrlf = true` nesta máquina** | `git config --get core.autocrlf` = `true` — reverificado |
| **Identidade do Git já configurada** | `git config --get user.name` = `Tiago Eduardo Zimmermann`; `user.email` = `tiagoeduardobr@gmail.com`. Não rode `git config` — reverificado nesta sessão |
| **Não existe configuração de lint de Markdown** | `git ls-files` filtrado por `markdownlint\|editorconfig\|eslint\|prettier` devolve **nada** |
| **`docs/KANBAN.md` está com LF puro** | varredura byte a byte: **0 bytes CR** em 34.560 bytes, 215 LF |
| **`docs/AI_HANDOVER_CONTEXT.md` está com LF puro** | **0 bytes CR** em 48.863 bytes, 443 LF na versão anterior deste arquivo |
| **`cspell.json` está em CRLF no disco** | **79 CR** e 79 LF em 1.293 bytes — é a lacuna do `*.json` do problema 7.5, que o `.gitattributes` não cobre |
| **A grade de cards já existe no CSS** | `css/style.css`: `.resultados` nas linhas 399 e 516, `.cartao-filme` nas 407, 420, 521 e 527, `flex-wrap: wrap` nas 224, 235, 371, 449, 498 e 518, `@media (max-width: 768px)` na 219, `@media (min-width: 769px)` na 484 e `@media (max-width: 560px)` na 526 |
| **`css/style.css` não usa `!important` em código** | **2 ocorrências no arquivo, ambas em comentário**, nas linhas **49 e 54**, dentro do cabeçalho que explica por que a regra não é usada. Em código: **0**, medido com `[regex]::Replace($css, '/\*[\s\S]*?\*/', '')` |
| **`css/style.css` não usa CSS Grid** | `display: grid` = **0**; a ocorrência da palavra `grid` em código = **0** |
| **Os 10 `value` de gênero estão em inglês** | `index.html` linhas 166, 175, 184, 193, 202, 211, 220, 229, 238, 247 — tabela completa em 1.2 |
| **O `M1-T05` está implementado em código real** | `js/script.js:89-149`, com `addEventListener` (93), `preventDefault` (94), `FormData` (96), `getAll("genero")` (99), objeto `usuario` (101-105), array `erros` (109-121), `Number.isNaN` (115), `role="alert"` (127) e guard `typeof document` (147-149) |
| **`node js/script.js` roda sem quebrar** | imprime `CineMatch Web: bootstrap carregado. { ui: { pronto: false }, modelo: { pronto: false } }`, sai com código **0** |
| **`node --check` passa nos três módulos** | exit **0** em `js/script.js`, `js/ui.js` e `js/modelo.js` |
| **Nenhuma classe `Conteudo` ou `Serie` existe** | `class Conteudo` e `extends Conteudo` = **0** em código nos três módulos; as ocorrências são todas em comentário nos esboços |
| **`fetch`, `setTimeout`, `localStorage.setItem` e métodos de array = 0 em código** | tabela completa em 1.1 |
| **Os dois placeholders continuam intactos** | `js/ui.js:11-12` (`PLACEHOLDER_UI`, `pronto: false`) e `js/modelo.js:11-12` (`PLACEHOLDER_MODELO`, `pronto: false`) |
| **`index.html` ainda não tem `meta description`, nem og tags, nem skip link** | o `<head>` tem só `charset`, `viewport` e `<title>` (linha 6). `Select-String` devolve zero para `meta name="description"` e para `og:` |
| **Os dois botões de login são `type="button"`** | `index.html:132` e `133`. Inerte, e por isso o risco CWE-598 do problema 7.2 não se materialize |
| **A `main` é ancestral da `develop`, e isso é o comportamento correto** | `git rev-list --count develop..main` = **0**; `main..develop` = **49** |
| **As três branches de trabalho estão no mesmo commit** | `develop` = `feature/cinematch-web` = `feature/cinematch-web-interface` = `b824926`; `git rev-list --count` nos dois sentidos = **0** |
| **O remoto está sincronizado nas quatro branches** | `git ls-remote --heads origin` devolve `b824926` para as três de trabalho e `e47b81d` para a `main`, igual aos refs locais |
| **Zero untracked** | `git ls-files --others --exclude-standard` devolve vazio; `git status --porcelain` devolve vazio |
| **As mensagens de `b824926` e `155b82e` estão íntegras em UTF-8** | gravadas direto em arquivo via `cmd /c "git log -1 --format=%B <hash> > arquivo"` e lidas com .NET em UTF-8 estrito: **60 bytes** e **61 bytes**, ambos sem BOM, ambos com UTF-8 estrito válido e **0 caractere de substituição**. O console mostra mojibake; os arquivos estão certos |
| **O `node_modules` é ignorado pelo Git** | `.gitignore` lista `node_modules/`; `git status` não o mostra |

---

## 7. Problemas abertos

### 7.1 ~~O botão de submit do perfil hoje recarrega a página~~ — **RESOLVIDO**

Era o problema que arrastava a `M1-T05` de volta para *A Fazer* sessão após sessão. **Resolvido:** `evento.preventDefault()` é a primeira instrução do handler, em `js/script.js:94`. Clicar em "Ver recomendações" (`index.html:254`) não faz mais GET nativo nem joga o perfil na query string. Verificado por `node --check` (exit 0) e por leitura do arquivo.

### 7.2 Risco latente na tela de login: e-mail e senha na query string

Inerte, e continua válido. Se o bônus virar `type="submit"` sem `preventDefault()`, o GET padrão manda **e-mail e senha para a query string** e para o histórico do navegador — CWE-598, owasp A02. Hoje é inerte, porque os dois botões são `type="button"` (`index.html:132` e `133`). Quem algum dia implementar esse bônus tem que colocar o `preventDefault()` **antes** de mexer no `type`.

### 7.3 ~~Os refs de tracking estão defasados~~ — **RESOLVIDO**

`git ls-remote --heads origin` concorda com os refs locais nas quatro branches: `develop`, `feature/cinematch-web` e `feature/cinematch-web-interface` em `b824926`, `main` em `e47b81d`. O servidor foi alcancado pelo push. **Ressalva honesta:** isso não prova que o servidor não tenha commits que o disco não vê — só um `git fetch` mostraria, e ele não foi rodado nesta sessão.

### 7.4 Não houve verificação em navegador — **continua pendente, e é o bloqueio central**

Este é o problema que **mais pesou** nesta sessão e nas anteriores, e **ninguém o resolveu**. Repetido com o número atual:

- `node_modules` existe, com 146 pacotes de primeiro nível, `live-server` 1.2.2 e o executável em `.bin`. A instalação **não** é o bloqueio.
- **O `live-server` nunca subiu.** `npm start` não foi rodado em sessão alguma.
- **Ninguém conferiu** se os três `.js` voltam com `Content-Type: text/javascript` pela porta 8080.
- **A página nunca foi aberta no navegador.** Nem nesta sessão, nem em nenhuma das anteriores.

Consequência direta e séria: **a `M1-T05` foi marcada como concluída sem verificação visual.** A análise estática diz que o código está correto — `preventDefault` no lugar, objeto `usuario` montado, validação nos três casos, `role="alert"` presente. Mas o par **`submit` + checkboxes** só funciona junto no navegador, e o `#form-perfil` nunca foi exercitado. É exatamente o risco residual que o risco 10 do quadro registra.

> **Regra do `AGENTS.md` §5: uma task só sai de *A Fazer* quando o código funciona **e** foi testado.** A `M1-T05` saiu sem o teste em navegador. Isso não invalida o código, mas deixa o último mile do RF02 aberto e é a `M1-T19` que fecha. Nenhuma outra task de lógica deve ser marcada como concluída sem o mesmo teste.

### 7.5 Lacuna do `.gitattributes` com `*.json`

Continua válido, e continua sendo **decisão do usuário, não tomada**. A regra cobre `md`, `js`, `css`, `html` e `bat`, mas **não** `*.json`. Com `core.autocrlf=true`, o `cspell.json` está em disco com **79 CRLF em 1.293 bytes**. Não quebra nada — o índice grava LF e o status fica limpo. É cosmético. **Não "resolva" por conta própria:** acrescentar `*.json` ao `.gitattributes` mexe em todos os `.json` do repositório.

### 7.6 Duas imagens do briefing não são verificáveis por texto

Continua válido. O wireframe (Seção 3) e a **estrutura de pastas** (Seção 5.2) são figuras no PDF. A Seção 3 do `AGENTS.md`, que descreve `js/`, `css/`, `assets/` e `index.html` na raiz, é **derivada, não comprovada** pela transcrição. Alguém precisa abrir a página da Seção 5.2 no PDF e conferir com os olhos antes de apresentar isso como exigência do professor no vídeo.

### 7.7 A lógica da semana 6 ainda não foi portada — é o próximo trabalho de verdade

**Continua válido e continua sendo a lacuna central do projeto.** `js/modelo.js` (240 linhas) e `js/ui.js` (469 linhas) são placeholders: `PLACEHOLDER_MODELO` e `PLACEHOLDER_UI`, ambos com `pronto: false`, ambos indicando no próprio comentário que o placeholder é apagado na `M1-T09` e na `M1-T11`. **Não existe nenhuma classe `Conteudo` ou `Serie`**, e nenhum método de array, nenhum `fetch`, nenhum `setTimeout`, nenhum `localStorage.setItem` em código. As linhas que existem nesses dois arquivos são, quase todas, esboços comentados.

**Oito RFs dependem disso e estão zerados:** RF04 a RF08 e RF10 a RF12, na cadeia de **nove tasks** `M1-T07` a `M1-T15`. Enquanto os módulos não tiverem conteúdo, **a `M1-T17` não fecha, a `M1-T18` não valida, a `M1-T19` não testa, a `M1-T20` não escreve o README, e o vídeo da `M1-T22` não tem o que mostrar**. É a dependência de maior profundidade da cadeia inteira.

### 7.8 Tamanho do squad — a pergunta continua aberta

O `docs/KANBAN.md` marca `M1-T03` e `M1-T04` como "por Lucas" e a `M1-T05` como "por Tiago" — dois nomes distintos, o que indica squad de 2. **Falta confirmar com o usuário se o squad ainda tem 2 pessoas ativas.** Disso dependem duas coisas concretas: o **limite de WIP** (1 no solo, 3 no squad) e a **meta de commits** (**5** no individual, **8** no squad). Não assuma nenhuma das duas.

O WIP atual é **2** tasks em *Em Andamento* (`M1-T03` e `M1-T04`) — dentro do limite de 3 do squad e acima do limite de 1 do trabalho solo. A pergunta de WIP está resolvida; a de tamanho do squad não.

### Resolvidos nesta sessão

| Item | Destino |
| --- | --- |
| **O `submit` recarregava a página** | **Resolvido.** `preventDefault()` implementado em `js/script.js:94`; problema 7.1 |
| **Refs de tracking defasados** | **Resolvido.** O push foi feito e `ls-remote` concorda com o disco; problema 7.3 |
| **AJU-001 — o risco 10 do quadro atribuía a `M1-T05` à coluna errada** | **Resolvido.** Risco reescrito em `docs/KANBAN.md:183` com o risco residual correto |
| **AJU-002 — Critério 4 do quadro dizia coluna `A Fazer`** | **Resolvido.** Passou a `Concluído / A Fazer` em `docs/KANBAN.md:160` |
| **TODO_FIX_01 — `value` de gênero em inglês** | **Não existia problema.** Os `value` já eram em inglês; ver 1.2 |
| **TODO_FIX_02 — remover 2 `!important`** | **Não existia problema.** As 2 ocorrências estão em comentário; ver 6 |
| **Os três PNGs de captura de tela untracked** | **Resolvido.** Foram versionados no commit `79d534c`; repositório com zero untracked |

---

## 8. Estado das tasks

Conferido no `docs/KANBAN.md` em 30/09/2026, **por coluna**, e não por checkbox — ver a ressalva logo abaixo.

| Coluna | Tasks | Quantidade |
| --- | --- | --- |
| Concluído | `M1-T00`, `M1-T01`, `M1-T05` | 3 |
| Em Andamento | `M1-T03`, `M1-T04` | 2 |
| A Fazer | `M1-T02`, e `M1-T06` a `M1-T24` | 20 |
| Backlog | 9 itens de bônus, sem ID — não contam nota | 9 |

Total: **25 tarefas** (`M1-T00` a `M1-T24`) + **9 itens de Backlog**. Bate com os metadados do próprio quadro, na linha 17. A soma 3 + 2 + 20 = 25 fecha.

A mudança em relação ao snapshot anterior: `M1-T05` saiu de *A Fazer* para *Concluído* (sessão do Tiago, de 29/09, trazida de volta pelo merge com o remoto), *Concluído* foi de 2 para 3, e a `M1-T24` entrou em *A Fazer* na sessão do Lucas (30/09).

### A contagem de checkbox ingênua dá dois números errados

`Select-String -SimpleMatch -Pattern '- [x]'` em `docs/KANBAN.md` devolve **6** ocorrências, e `- [ ]` devolve **56**. **Os dois estão errados**, porque as ocorrências não são só de task:

- Das **6** ocorrências de `- [x]`, **2 estão na legenda** — linhas 33 e 43. Das 4 restantes, **3 são tasks** (`M1-T00`, `M1-T01` e `M1-T05`, na coluna *Concluído*) e **1 é o item do checklist** "Criei o quadro Kanban", no *Checklist final de entrega*.
- Das **56** ocorrências de `- [ ]`, **2 também estão na legenda** — linhas 32 e 42. As 54 restantes são 20 de *A Fazer* + 2 de *Em Andamento* + 9 de *Backlog* + 23 do checklist.

Os números reais de checkbox são **`- [x]` = 4** e **`- [ ]` = 54**. A conta fecha: a contagem ingênua soma 62, a real soma 58, e a diferença são exatamente as **4** ocorrências de legenda que o `Select-String` não distingue de uma task. **Nunca conte checkbox com substituição ingenua neste quadro: conte por coluna.**

O checklist final de entrega tem **24 itens, dos quais 23 estão pendentes** — só "Criei o quadro Kanban" está marcado. Os itens zerados são os três mais pesados: **vídeo de até 7 minutos** (peso 1,50), **quadro Kanban publicado com link** e **os três links no AVA**.

**Ressalva sobre a `M1-T05`:** ela está em *Concluído* com o bloco `– Concluído em 29/09/2026:23:10 por Tiago 🟡`, e a nota de progresso descreve a implementação corretamente. O que **não** foi feito foi o teste em navegador (problema 7.4). O risco residual está registrado no próprio quadro, no risco 10.

---

## 9. Gotchas do ambiente Windows

Verificados **nesta máquina**, `C:\Users\Tiago\Desktop\Estudos_Tiago\CineMatch-Web`. Esta seção mudou de conteúdo em relação ao snapshot anterior, que foi escrito noutra máquina — os números de lá não valem aqui e foram reconferidos.

- **A máquina é a do Tiago, e não a do Lucas.** O diretório de trabalho é `C:\Users\Tiago\Desktop\Estudos_Tiago\CineMatch-Web`. O `git config --get user.name` devolve **`Tiago Eduardo Zimmermann`** e o e-mail `tiagoeduardobr@gmail.com` — divergindo do `lucas` / `lucasgd123@gmail.com` que constava do snapshot anterior. **Confira a identidade antes de citar:** o `AGENTS.md` §6 proíbe rodar `git config`, então divergência de identidade aqui é indício de que o snapshot anterior veio de outra máquina.
- **O diretório temporário externo é `C:\Users\Tiago\AppData\Local\Temp\opencode`.** `Test-Path -LiteralPath` devolve **`True`**. É o único lugar fora do repositório onde escrita é permitida, e é onde os testes de integridade de UTF-8 desta sessão gravaram os arquivos (`b824926.txt`, `c155b82e.txt`).
- **Python existe nesta máquina, e é o 3.12.10.** `Get-Command python` devolve `C:\Users\Tiago\AppData\Local\Programs\Python\Python312\python.exe`; `python --version` responde `Python 3.12.10`. `Get-Command py` devolve `C:\WINDOWS\py.exe`. **`pypdf` 6.15.0 está instalado** — a receita do `AGENTS.md` para extrair texto do PDF **é utilizável aqui**, ao contrário do que o snapshot anterior afirmava. Um `python -c "import pypdf; print(pypdf.__version__)"` desta sessão devolveu `6.15.0`. O que continua valendo é a regra de **gravar script em arquivo** em vez de `python -c`, por decisão de permissão do ambiente.
- **`rg` (ripgrep) não está instalado nesta máquina.** `Get-Command rg` falha e devolve `null`. A documentação e os prompts de outros agentes assumem que ele existe. O pior efeito é **indireto**: uma checagem de ausência que usa `rg` falha pelo motivo errado e escreve mal como **"FALHA: ainda existe"**, jogando o agente na direção oposta da verdadeira. Use a ferramenta de busca dedicada ou `Select-String`.
- **O console do PowerShell está em codepage 850 e gera mojibake falso ao reler saída UTF-8 do git.** Medido: `[Console]::OutputEncoding.WebName` devolve `ibm850`, e `chcp` confirma a página 850 ativa. São **dois** problemas distintos e confundi-los custa tempo: um é a **escrita** do arquivo, o outro é a **leitura** da saída. O console mostra `formul�rio` onde o arquivo tem `formulário` — em todas as medições desta sessão. **A leitura confiável é gravar a saída do git direto em arquivo via `cmd`** (`cmd /c "git ... > arquivo"`) e ler os bytes com .NET, conferindo `BOM`, validade de UTF-8 estrito, contagem de caractere de substituição e mojibake. Feito assim: as mensagens de `b824926` e `155b82e` têm 60 e 61 bytes, sem BOM, UTF-8 estrito válido e **0 caractere de substituição**.
- **O console do PowerShell corrompe acentuação na escrita** — acentos e cedilhas aparecem como `?` ou como `U+FFFD` no terminal, mesmo que o arquivo esteja correto em UTF-8. **Nunca** "conserte" acentuação que só está errada na tela do terminal: isso corromperia o arquivo de verdade.
- **`Measure-Object -Line` conta só linhas não-vazias.** Use `[System.IO.File]::ReadAllLines(<arquivo>); $a.Count` para a contagem real — foi o que todas as contagens de linha deste arquivo usam. Já causou um falso alarme numa sessão anterior: um arquivo com 186 linhas reportou 160.
- **Comandos negados por permissão:** `python -c`, `node -e`, `sed`, `awk`, `tee`, `cat >`, `Set-Content`, `Out-File`. Grave um script em arquivo e execute.
- **`core.autocrlf=true` nesta máquina.** É a causa do comportamento de CRLF no `*.json` do problema 7.5. Não remova as regras do `.gitattributes`: sem as de LF o Windows converte tudo e o `docs/KANBAN.md` aparece sujo em todo diff.
- **`Select-String` sem `-SimpleMatch` trata o padrão como regex**, e um parêntese não escapado — `fetch(`, `.map(` — faz o comando inteiro falhar com "expressão regular não válida". Pior: a variável de resultado **fica com o valor da iteração anterior**, e o número impresso em seguida é o do item anterior. **Use `-SimpleMatch` para padrão literal e uma variável nova por padrão.**
- **Para contar tokens em código, remova comentários antes.** Ver a lição 4.8: `[regex]::Replace($src, '/\*[\s\S]*?\*/', '')` e depois `[regex]::Replace($code, '(?m)//.*$', '')`.
- `cspell.json` é configuração do Code Spell Checker, não faz parte da aplicação. Não entra em nenhum RF.
- **O modelo não lê PDF.** Para extrair, use `pypdf` 6.15.0 a partir de um script gravado — viável nesta máquina.

## 10. Próximos passos sugeridos

1. **Subir o `live-server` e abrir a página no navegador. Este é o próximo passo de verdade** (problema 7.4), e é a pendência que há mais sessões bloqueando o projeto. `node_modules` já está instalado, então o passo é curto: `npm start`, abrir a página, exercitar o formulário do `M1-T05` (submeter vazio, idade inválida, nenhum gênero, e depois o caminho feliz), olhar os três botões da navbar e os dois botões de login, e conferir na aba Network que os três `.js` voltam como `text/javascript`. **Não abra via `file://`.** Enquanto isso não acontecer, nenhuma outra task de lógica deve ser marcada como concluída.
2. **Portar a lógica da semana 6 para módulos ES** (problema 7.7), que é a dependência de maior profundidade: **oito RFs e nove tasks** estão bloqueados atrás. Ordem sugerida, que segue a cadeia de dependências do quadro:
   - **`M1-T06`** — `localStorage.setItem('cinematchPerfil', JSON.stringify(usuario))`, leitura com tratamento do `null` da primeira visita, e o botão "Trocar perfil" reapresentando o formulário no padrão da semana 09 (**não** usar `localStorage.removeItem`, que não foi ensinado).
   - **`M1-T07`** — `fetch` na TVMaze dentro de `try`/`catch`, conferindo `response.ok`, tratando os três estados: carregando, vazio e erro. **O `setTimeout` do RF12 vai na exibição, nunca dentro do `fetch`.**
   - **`M1-T08`** — métodos de array: `filter` para `genres.length > 0 && rating.average`, `sort` por nota com `localeCompare` onde couber, `map` para normalizar.
   - **`M1-T09`** — `export class Conteudo` e `export class Serie extends Conteudo` em `js/modelo.js`, com `super(...)` no construtor, e apagar o `PLACEHOLDER_MODELO`.
   **Porte a lógica, não o estilo**: o `cinematch.js` é código de terminal e usa globais sem declarar (linhas 31, 171 e 330), que quebram com `ReferenceError` em módulo ES. Declare com `let` ou `const`.
3. **Fechar o `M1-T02` e o `M1-T16`, que destravam três tasks.** O `index.html` tem hoje só `charset`, `viewport` e `<title>` (linha 6). Faltam a `meta description`, as og tags e o skip link — confirmado por `Select-String`, ver 1.2. A `M1-T12` está no risco 11: o CSS da grade já existe (`.resultados` em 399 e 516, `.cartao-filme` em 407), então confirme o que ainda falta antes de marcar.
4. **Cobrir os dois botões de login antes que alguém mude o `type`.** Risco CWE-598 (problema 7.2): os dois botões são `type="button"` e inertes. Se algum dia virarem `submit` sem `preventDefault`, e-mail e senha vão para a query string. Quem mexer tem que tratar isso primeiro.
5. **Confirmar o tamanho do squad** (problema 7.8) — se ainda são 2 pessoas ativas. Disso dependem o limite de WIP e a meta de commits: **5 no individual, 8 no squad**.
6. **Rodar `git fetch` antes do próximo push**, e comparar `git rev-parse origin/<branch>` com `git ls-remote --heads origin`. As branches estão sincronizadas agora, mas isso **não** prova que o servidor não tenha commits que o disco não vê. **Push é decisão do usuário**: nunca faça push sem pedido explícito, e nunca force push neste repositório, nem com `--force` nem com `--force-with-lease`.
7. **Abrir a Seção 5.2 do PDF** e conferir a estrutura de pastas com os olhos, antes de apresentá-la como exigência do professor (problema 7.6).

8. **Decidir o `.gitattributes` para `*.json`** — decisão do usuário, ainda não tomada (problema 7.5).
9. **Não perder de vista o prazo:** os três entregáveis mais pesados — vídeo de até 7 minutos (peso 1,50), quadro Kanban publicado com link e os três links no AVA — estão zerados, e o `main` ainda está em `e47b81d`.
