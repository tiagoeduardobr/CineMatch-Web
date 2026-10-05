# Plano — M1-T01 Bootstrap do projeto (RF15 parcial)

> **Para agentes:** este plano é executado pelo subagente `dev`. Ao final, o subagente `code-review` revisa o diff e o subagente `git-commit` faz o versionamento. **Nenhum agente fora do `git-commit` executa `git add`, `git commit`, `git push` ou `git checkout`** (AGENTS.md, seção 8). Os checkboxes deste arquivo são progresso de plano e **não** levam timestamp — timestamp é exclusividade do `docs/KANBAN.md`.

| Dado | Valor |
| --- | --- |
| Tarefa | `M1-T01` — RF15 (parcial) Bootstrap do projeto |
| Backlog canônico | `docs/KANBAN.md` (linhas 96–98, 128 e 136). **Não** existe `docs/PROJECT_BACKLOG_*.md` neste projeto |
| Branch | `feature/cinematch-web` — branch **fixa** e já ativa; este plano **não** cria branch |
| Cria | `package.json`, `index.html`, `style.css`, `ui.js`, `modelo.js`, `script.js`, `.gitignore` — todos na raiz `C:\Users\Lucas\CineMatch-Web\` |
| Modifica | `docs/KANBAN.md` |
| Fora do escopo | `npm install`, `package-lock.json`, `README.md`, qualquer RF de `M1-T02` a `M1-T23` |

## Como rodar

Todos os comandos abaixo rodam com a **raiz do repositório como diretório atual** (`workdir = C:\Users\Lucas\CineMatch-Web`). Os caminhos de arquivo citados nas tasks são absolutos; dentro dos comandos eles são relativos à raiz.

## Objetivo

Deixar o repositório pronto para receber o código: os cinco arquivos do RF14 na raiz, cada um com o mínimo de estrutura que deixe claro qual é a sua responsabilidade, mais o `package.json` do `live-server` (parte do RF15) e um `.gitignore` que impeça o `node_modules/` de ser versionado quando a M1-T18 rodar `npm install`. **Nenhuma funcionalidade é implementada aqui** — a tarefa cria o esqueleto, não o produto.

## Escopo

- **Dentro:** criar 7 arquivos, atualizar 4 pontos do `docs/KANBAN.md`, 2 commits em Conventional Commits.
- **Fora:** `npm install` e a validação do servidor (M1-T18); HTML semântico completo, og tags e `meta description` (M1-T02 e M1-T16); qualquer regra de layout, Flexbox ou CSS Grid (M1-T04 e M1-T12); `addEventListener`, `localStorage`, `fetch`, `setTimeout` (M1-T05 a M1-T15); as classes `Conteudo` e `Serie` (M1-T09); `renderizarCard` (M1-T11); `README.md` (M1-T20); **`push`** — nunca, sem pedido explícito do usuário.

## Decisões já tomadas (o dev não precisa decidir nada)

| # | Assunto | Escolha | Por quê |
| --- | --- | --- | --- |
| 1 | Nome e versão do pacote | `name: "cinematch-web"`, `version: "0.1.0"`, `private: true` | nome em minúsculas e sem espaço é a única forma aceita pelo npm; `private: true` impede publicação acidental; `0.1.0` é a primeira versão de um projeto que ainda nem roda |
| 2 | Versão do `live-server` | `"live-server": "^1.2.2"` em `devDependencies` | `npm view live-server dist-tags` retorna `latest: 1.2.2`, publicada em 15/01/2026. **Não há lockfile no repositório hoje**, então não existe versão legada a preservar. O `^` aceita correções de patch e minor, e a instalação é **local**, como exige o RF15 |
| 3 | Bloco `scripts` | `"start": "live-server"`, texto exato | é o valor literal que a M1-T18 especifica; a porta 8080 já é o padrão do `live-server`, então acrescentar `--port` só criaria divergência com o backlog |
| 4 | `"type": "module"` | incluído | o projeto é ESM de ponta a ponta: declara a intenção (o README da M1-T20 precisa explicar ESM contra CommonJS) e evita o aviso `MODULE_TYPELESS_PACKAGE_JSON` do Node durante a verificação. O navegador não depende disso — quem carrega os módulos é o `<script type="module">` |
| 5 | O que entra nos "arquivos em branco" | `index.html` com o esqueleto mínimo e o `<script type="module">`; `style.css` só com cabeçalho; `ui.js` e `modelo.js` com cabeçalho e um `export` provisório; `script.js` com cabeçalho, os dois `import` e um `console.log` | arquivo literalmente vazio some de todo editor, não diz nada sobre o propósito e some da revisão. Um esqueleto com comentário registra **qual RF** vai preencher cada arquivo — isso já ajuda o Critério 3 (organização do repositório) — e permite verificar o grafo de módulos agora, sem navegador |
| 6 | Nome dos `export` provisórios | `PLACEHOLDER_UI` e `PLACEHOLDER_MODELO` | um nome curto como `UI` seria confundido com a API de verdade que a M1-T11 define. Com o prefixo `PLACEHOLDER_`, um `Select-String -Pattern 'PLACEHOLDER'` lista tudo o que falta substituir, e código inacabado não passa por pronto |
| 7 | `.gitignore` faz parte da tarefa? | **Sim**, com `node_modules/` | o `node_modules/` nasce na M1-T18; sem `.gitignore` beforehand existe uma janela em que um `git add` distraído versiona milhares de arquivos. É um arquivo de bootstrap por natureza e não traz dependência nenhuma |
| 8 | Onde ficam os arquivos | todos na **raiz** do repositório | AGENTS.md seção 3. A pasta `Frontend` **não existe** nesta máquina (`Test-Path -LiteralPath Frontend` retorna `False`) e não é versionada: não criá-la e não construir nada dentro dela |

## Dependências

### Matriz de Dependências

| Task | Depende de | Premissa |
| --- | --- | --- |
| Task 1 — `package.json` | — | nada |
| Task 2 — `index.html` | — | nada |
| Task 3 — `style.css` | Task 2 | o `<link rel="stylesheet" href="style.css">` do `index.html` precisa resolver |
| Task 4 — `ui.js` e `modelo.js` | Task 1 | a verificação `node --check` dos módulos ES se apoia no `"type": "module"`; sem ele o Node ainda passa (a partir do v22 ele detecta a sintaxe sozinho), mas avisa `MODULE_TYPELESS_PACKAGE_JSON` |
| Task 5 — `script.js` | Task 1, Task 4 | `node script.js` só funciona se os dois `import` resolverem para arquivos que existam e exportem exatamente os nomes importados |
| Task 6 — `.gitignore` | — | nada |
| Task 7 — `docs/KANBAN.md` | Tasks 1 a 6 | a tarefa só é marcada como concluída depois que os 7 arquivos existem e passaram nas verificações |
| Task 8 — revisão e commit | Tasks 1 a 7 | `code-review` é obrigatório antes de qualquer commit; `git-commit` faz o `git add` e o `git commit` |

**Paralelizáveis:** Task 1 e Task 2 são independentes e podem ser feitas em qualquer ordem. A Task 6 é independente de todas as outras.

### Pré-requisitos

Antes de qualquer task:

```powershell
git branch --show-current   # esperado: feature/cinematch-web
git status --porcelain -- . ':!.opencode'
```

**Esperado:** a primeira linha devolve `feature/cinematch-web` e a segunda devolve **nenhuma saída fora de `.opencode/`**. O `?? .opencode/` que aparece no `git status` completo é o próprio diretório de planos — está previsto ser versionado na Task 8 e não é bloqueio.

Só pare e avise o usuário quando o que aparecer estiver **fora** de `.opencode/`: arquivo rastreado modificado (prefixo ` M` ou `MM`) ou arquivo untracked que não seja `.opencode/`. Nesses casos, não criar branch nova e não commitar por cima de trabalho alheio.

---

## Tasks

### Task 1 — `package.json` do `live-server`

- [x] **Criar `C:\Users\Lucas\CineMatch-Web\package.json`** com o conteúdo exato abaixo, em UTF-8, terminador de linha LF. **Não** rodar `npm install`, **não** criar `package-lock.json`.

```json
{
  "name": "cinematch-web",
  "version": "0.1.0",
  "description": "CineMatch Web: recomendação de séries em tempo real, com HTML5, CSS3 (Flexbox) e JavaScript de módulos ES nativos.",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "live-server"
  },
  "devDependencies": {
    "live-server": "^1.2.2"
  }
}
```

**Acceptance:** Given o `package.json` recém-criado, When o npm o lê, Then ele é JSON válido e devolve `name` `cinematch-web`, `version` `0.1.0`, `private` `true`, `type` `module`, `scripts.start` `live-server` e `devDependencies."live-server"` `^1.2.2`.

**Nota sobre acentuação:** o arquivo é UTF-8. Se a descrição aparecer sem acento **no console**, é o console do PowerShell corrompendo a exibição, não o arquivo — confira com a ferramenta de leitura antes de "consertar" (AGENTS.md, seção 7).

#### Verificação

**Run:**
```powershell
npm pkg get name version private type scripts devDependencies description
```
**Expected:** código de saída 0 e o objeto impresso com `name` `cinematch-web`, `version` `0.1.0`, `private` `true`, `type` `module`, `scripts` contendo `"start": "live-server"`, `devDependencies` contendo `"live-server": "^1.2.2"` e a descrição com acentuação correta.

**Run (guarda de escopo):**
```powershell
Test-Path -LiteralPath node_modules
Test-Path -LiteralPath package-lock.json
```
**Expected:** `False` e `False` — nada foi instalado; a instalação é da M1-T18. Se qualquer um der `True`, o `npm install` rodou cedo demais.

---

### Task 2 — `index.html` com o esqueleto mínimo

- [x] **Criar `C:\Users\Lucas\CineMatch-Web\index.html`** com o conteúdo exato abaixo.

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CineMatch Web</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- Bootstrap da tarefa M1-T01 (RF15 parcial).
         A estrutura semântica completa, o h1, a meta description e as og tags
         são da tarefa M1-T02; a acessibilidade e o SEO são da M1-T16. -->
    <script type="module" src="script.js"></script>
  </body>
</html>
```

**Por que este conteúdo e não um arquivo vazio:** `charset`, `viewport`, `title`, o link do CSS e o `<script type="module">` são o mínimo para o documento ser HTML5 válido e para os outros artefatos do bootstrap já resolverem. `header`, `main`, `section`, `article`, `footer`, o `h1`, a `meta description` e as og tags ficam **inteiros para a M1-T02** — se forem escritos aqui, a M1-T02 perde o objeto.

**Acceptance:** Given o `index.html` criado, When ele é lido, Then contém `lang="pt-BR"`, `charset`, `viewport`, `title`, o link para `style.css` e `<script type="module" src="script.js"></script>`, e não contém nenhum landmark nem tag de SEO.

#### Verificação

**Run:**
```powershell
Test-Path -LiteralPath index.html
Select-String -Path index.html -Pattern 'lang="pt-BR"','<meta charset="UTF-8"','<link rel="stylesheet" href="style.css"','<script type="module" src="script.js"></script>' -SimpleMatch
```
**Expected:** `True` e quatro linhas impressas, uma para cada padrão, com número de linha.

**Run (guarda de escopo):**
```powershell
Select-String -Path index.html -Pattern '<h1','<header','<main','<section','<article','<footer','og:title','name="description"' -SimpleMatch
```
**Expected:** **nenhuma saída**. Se aparecer alguma, o dev antecipou a M1-T02 ou a M1-T16: remover antes de seguir.

---

### Task 3 — `style.css` com o cabeçalho

- [x] **Criar `C:\Users\Lucas\CineMatch-Web\style.css`** com o conteúdo exato abaixo. **Nenhuma regra** — só o comentário.

```css
/*
 * CineMatch Web — estilos da aplicação.
 *
 * Esqueleto da tarefa M1-T01 (RF15 parcial). Este arquivo existe para que o
 * <link rel="stylesheet"> do index.html já resolva e para deixar registrada a
 * separação de responsabilidade entre marcação e estilo.
 *
 * As regras entram na M1-T04 (tela do formulário) e na M1-T12 (grade de cards),
 * sempre com Flexbox e mobile-first. CSS Grid, Sass e CSS-in-JS estão fora do
 * escopo do Módulo 01 e não podem aparecer aqui (AGENTS.md, seção 2).
 */
```

**Por que só comentário:** qualquer regra escrita agora ou antecipa a M1-T04/M1-T12, ou vira lixo a ser apagado. Comentário é o único conteúdo que serve ao propósito do arquivo de bootstrap sem roubar trabalho de outra tarefa.

**Acceptance:** Given o `style.css` criado, When ele é lido, Then tem conteúdo maior que zero byte, tem o cabeçalho acima e não declara nenhuma regra de estilo.

#### Verificação

**Run:**
```powershell
Test-Path -LiteralPath style.css
(Get-Item -LiteralPath style.css).Length -gt 0
```
**Expected:** `True` e `True` — o arquivo existe e não está zerado.

**Run (guarda de escopo):**
```powershell
Select-String -Path style.css -Pattern 'display: grid','display:grid','@media','{' -SimpleMatch
```
**Expected:** **nenhuma saída** — nem CSS Grid (proibido), nem media query, nem qualquer bloco de regra. O único `{` possível seria o do exemplo em comentário, que não existe neste conteúdo.

---

### Task 4 — `ui.js` e `modelo.js` (módulos com `export` provisório)

- [x] **Criar `C:\Users\Lucas\CineMatch-Web\ui.js`:**

```js
/**
 * CineMatch Web — módulo de tela.
 *
 * Responsabilidade (AGENTS.md, seção 3): renderizar os cards de recomendação e
 * as mensagens de carregando, vazio e erro. O código entra na M1-T11 (RF08).
 *
 * Esqueleto da tarefa M1-T01 (RF15 parcial): este export provisório existe para
 * que o `import` do script.js já resolva desde o primeiro dia. Nada aqui é
 * funcional ainda — a constante PLACEHOLDER_UI é apagada na M1-T11.
 */
export const PLACEHOLDER_UI = {
  pronto: false,
};
```

- [x] **Criar `C:\Users\Lucas\CineMatch-Web\modelo.js`:**

```js
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
```

**Acceptance:** Given os dois módulos criados, When o Node os analisa, Then ambos são ES modules sintaticamente válidos e cada um exporta a sua constante `PLACEHOLDER_*`, sem nenhuma classe e sem tocar no DOM.

#### Verificação

**Run:**
```powershell
node --check ui.js
node --check modelo.js
```
**Expected:** os dois comandos terminam com código 0 e sem imprimir nada. Um erro de sintaxe sai em vermelho e com código 1.

**Run:**
```powershell
Select-String -Path ui.js,modelo.js -Pattern 'export const PLACEHOLDER_UI','export const PLACEHOLDER_MODELO' -SimpleMatch
```
**Expected:** uma linha em `ui.js` com `PLACEHOLDER_UI` e uma linha em `modelo.js` com `PLACEHOLDER_MODELO`.

**Run (guarda de escopo):**
```powershell
Select-String -Path ui.js,modelo.js -Pattern 'class ','document.','addEventListener','fetch(' -SimpleMatch
```
**Expected:** **nenhuma saída** — as classes são da M1-T09, o DOM é da M1-T11 e a API é da M1-T07.

---

### Task 5 — `script.js` com os `import` dos módulos irmãos

- [x] **Criar `C:\Users\Lucas\CineMatch-Web\script.js`:**

```js
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
import { PLACEHOLDER_UI } from './ui.js';
import { PLACEHOLDER_MODELO } from './modelo.js';

// Confirmação de que o grafo de módulos carregou. Este arquivo também é lido
// pelo Node na verificação (`node script.js`), então ele não pode tocar em
// `document`, `window` nem `localStorage` aqui em cima.
console.log('CineMatch Web: bootstrap carregado.', {
  ui: PLACEHOLDER_UI,
  modelo: PLACEHOLDER_MODELO,
});
```

**Acceptance:** Given os três módulos JS criados, When o Node executa `script.js`, Then ele resolve `./ui.js` e `./modelo.js`, encontra os dois `export` importados e imprime a mensagem de bootstrap com código de saída 0.

#### Verificação

**Run:**
```powershell
node script.js
```
**Expected:** imprime `CineMatch Web: bootstrap carregado. { ui: { pronto: false }, modelo: { pronto: false } }` e termina com código 0. Este é o teste mais forte da sessão: prova que os três arquivos são ES modules válidos, que os caminhos relativos resolvem e que **os nomes importados existem de fato**. Se der `SyntaxError: The requested module './ui.js' does not provide an export named ...`, o nome do `export` e o do `import` divergiram.

**Run:**
```powershell
Select-String -Path script.js -Pattern "from './ui.js'","from './modelo.js'" -SimpleMatch
```
**Expected:** duas linhas, uma por `import`, com caminho relativo e extensão `.js`.

**Run (guarda de escopo):**
```powershell
Select-String -Path script.js -Pattern 'fetch\(','localStorage\.','addEventListener','setTimeout','document\.','window\.'
```
**Expected:** **nenhuma saída** — nada de RF02, RF03, RF04, RF10 ou RF12 foi antecipado.

**Por que o ponto escapado e sem `-SimpleMatch`:** esta guarda precisa casar **código, não comentário**. Com `-SimpleMatch` e o padrão `localStorage` o portão reprovava o arquivo correto: o cabeçalho de responsabilidade e o comentário de segurança citam `` `localStorage` `` entre crases, e o portão devolvia 2 linhas. Terminando o padrão em `\.`, o casamento só acontece em uso real da API — `localStorage.` não aparece em comentário nenhum, porque ali a palavra vem seguida de crase. Os outros cinco padrões seguem idênticos ao que já passava; apenas perderam o `-SimpleMatch` e cada ponto foi escapado para não virar curinga.

### Checkpoint 1: grafo de módulos validado

- Verificar: os 5 arquivos de código existem e o grafo de módulos ES carrega sem erro.
- Validação: `Test-Path index.html, style.css, script.js, ui.js, modelo.js` retorna `True` para todos e `node script.js` imprime a mensagem de bootstrap com código 0. Se falhar, corrigir a Task 4 ou 5 antes de seguir.

---

### Task 6 — `.gitignore`

- [x] **Criar `C:\Users\Lucas\CineMatch-Web\.gitignore`** com o conteúdo exato abaixo.

```gitignore
# Dependências do npm (entram na M1-T18, com `npm install`)
node_modules/

# Logs
npm-debug.log*
yarn-error.log*
*.log

# Sistema operacional
.DS_Store
Thumbs.db
Desktop.ini

# Editores e IDE (o projeto não usa build; nada disso faz parte do repositório)
.vscode/
.idea/

# NÃO ignorar: package-lock.json — ele registra a versão exata do live-server
# NÃO ignorar: .opencode/ — os planos de implementação entram no histórico
```

**Acceptance:** Given o `.gitignore` criado, When o Git avalia um caminho, Then `node_modules/` é ignorado e `package-lock.json`, `.opencode/plans/m1-t01-bootstrap.md` e `index.html` **não** são ignorados.

**Por que `.opencode/` continua versionado:** o item 5.8 do briefing pede no vídeo "como as tarefas foram organizadas antes de começar". O histórico dos planos é a evidência disso e ainda alimenta o Critério 3.

#### Verificação

**Run:**
```powershell
git check-ignore -v node_modules/teste.js
```
**Expected:** imprime `.gitignore:2:node_modules/	node_modules/teste.js` (a linha 2 é a regra `node_modules/`) e sai com código 0.

**Run:**
```powershell
git check-ignore -v package-lock.json
git check-ignore -v .opencode/plans/m1-t01-bootstrap.md
git check-ignore -v index.html
```
**Expected:** **nenhuma saída** e código de saída 1 nos três casos. Ignorar o lockfile quebraria a reprodutibilidade do `live-server`, e ignorar `.opencode/` apagaria do histórico o registro do planejamento.

---

### Task 7 — Marcar `M1-T01` como concluída no `docs/KANBAN.md`

- [x] **Pegar o timestamp real** (nunca digitar à mão; no PowerShell `date` é alias de `Get-Date` e não entende `strftime`):

```powershell
Get-Date -Format 'dd/MM/yyyy:HH:mm'
```

- [x] **Remover** a linha 98 (a entrada `- [ ] \`M1-T01\` ...` da seção `## Em Andamento`) e deixar a seção assim:

```markdown
## Em Andamento

- _Nenhuma tarefa em andamento no momento._
```

As quatro colunas são obrigatórias no quadro (AGENTS.md, seção 5). A linha em itálico, sem checkbox, apenas marca que a coluna está genuinamente vazia — não conta como tarefa nem para o total de 24.

- [x] **Adicionar** no fim da seção `## Concluído`, depois da linha do `M1-T00`, o texto original da tarefa **preservado** e com o checkbox e o sufixo trocados:

```markdown
- [x] `M1-T01` **RF15 (parcial) — Bootstrap do projeto.** Criar a estrutura de arquivos do projeto dentro da pasta versionada no Git (`index.html`, `style.css`, `script.js`, `ui.js`, `modelo.js`) e o `package.json` com o script de `live-server`, deixando o repositório pronto para receber o código; aqui só são criados os arquivos em branco e o `package.json` — a instalação e a validação do `live-server` ficam em `M1-T18`. _Sem dependências._ – Concluído em DD/MM/AAAA:HH:MM
```

Substitua `DD/MM/AAAA:HH:MM` pelo timestamp do comando acima.

- [x] **Atualizar a coluna "Coluna atual" da linha da RF15** (tabela Rastreabilidade, linha 128): `Em Andamento / A Fazer` → `Concluído / A Fazer`.

- [x] **Atualizar a coluna "Coluna atual" da linha do Critério 3** (tabela de Critérios e obrigações, linha 136): `Em Andamento / A Fazer` → `Concluído / A Fazer`. A tabela do Critério 3 é a segunda ocorrência da string no arquivo; deixá-la com o valor antigo deixa o quadro se contradizendo.

- [x] **Não mexer** em mais nada: a legenda (linhas 34 e 42), a linha da `M1-T18` (linha 87, continua em A Fazer) e as menções a `M1-T01` nas linhas 71, 76 e 87 (as dependências declaradas pelas outras tarefas) permanecem como estão.

**Sobre o checklist final de entrega (linhas 167 a 190): não marcar nenhum item.** Nenhum item deste checklist pode ser marcado aqui. Todos eles pertencem a uma task posterior:

| Item do checklist | Por que fica pendente |
| --- | --- |
| Criei o index.html com HTML semântico | depende da M1-T02 (RF01) |
| Criei o style.css com Flexbox e responsividade | depende da M1-T04 e da M1-T12 (RF09) |
| Separei script.js, ui.js e modelo.js com import/export | a separação é entregue na M1-T17 (RF14); aqui há só o esqueleto |
| Servi o projeto com um pacote local (ex.: live-server) | depende da M1-T18, que instala e valida o `live-server` |
| Fiz commits e usei ao menos uma branch de feature no GitHub | o push não é permitido sem pedido explícito do usuário, e a consolidação é da M1-T21 |

A lista é a reprodução literal da seção 7 do briefing, então **não se cria item novo** para o bootstrap. Registrar o bootstrap é o `package.json` no repositório e a linha no quadro.

**Acceptance:** Given o `docs/KANBAN.md` com as quatro edições aplicadas, When o arquivo é lido, Then nenhuma linha da `M1-T01` continua pendente, ela aparece uma vez em *Concluído* com `- [x]` e o timestamp real, e as duas linhas de "Coluna atual" dizem `Concluído / A Fazer`.

#### Verificação

**Run:**
```powershell
Select-String -Path docs\KANBAN.md -Pattern '^- \[x\].*M1-T01'
```
**Expected:** exatamente uma linha, a de *Concluído*, terminando em `– Concluído em DD/MM/AAAA:HH:MM` com a data e a hora reais (dia, mês, ano, dois pontos, hora e dois dígitos de minuto).

**Run:**
```powershell
Select-String -Path docs\KANBAN.md -Pattern '^- \[ \] `M1-T01`'
Select-String -Path docs\KANBAN.md -Pattern 'Em Andamento / A Fazer'
```
**Expected:** **nenhuma saída** nos dois comandos — não sobrou checkbox pendente da M1-T01 e nenhuma linha de rastreabilidade aponta para a coluna antiga.

**Por que ancorar o ID com a crase:** o padrão largo `^- \[ \].*M1-T01` também casa as linhas 71, 76 e 87, onde as outras tarefas declaram `_Depende de: M1-T01._` — e a Task 7 manda preservá-las. Fixando a crase logo depois de `M1-T01`, só a linha da própria tarefa pode casar. Medido no `docs/KANBAN.md` de hoje: o padrão largo devolve **4** linhas (71, 76, 87 e a 98) e o ancorado devolve **1**, que é exatamente a linha 98 — a que precisa sair. Depois das edições desta task, o ancorado devolve 0; o largo continua devolvendo **3**, que são justamente as dependências que a Task 7 manda preservar (as linhas 71, 76 e 87) — e é por isso que só o ancorado serve de portão.

**Run (estrutura preservada):**
```powershell
Select-String -Path docs\KANBAN.md -Pattern '## Em Andamento','## Concluído','## Rastreabilidade','## Checklist final de entrega'
```
**Expected:** quatro linhas, uma de cada seção — as quatro colunas e as seções do quadro continuam no lugar.

**Run (contagem do total):**
```powershell
Select-String -Path docs\KANBAN.md -Pattern '^- \[x\]' | Measure-Object | Select-Object -ExpandProperty Count
```
**Expected:** `3` — o `M1-T00` (linha 104), a nova linha do `M1-T01` em *Concluído* e o item "Criei o quadro Kanban" (linha 186) do checklist final. Hoje, antes desta task, o total é `2`; esta task acrescenta exatamente uma linha `- [x]`, então o resultado só fecha em `3` se a linha da M1-T01 entrou.

---

### Task 8 — Revisão e versionamento

- [ ] Delegar ao subagente **`code-review`**: revisar o diff contra a RF15 parcial, contra a seção 3 do `AGENTS.md` e contra as guardas de escopo das Tasks 2 a 5. Se houver achado, corrigir e rodar de novo a verificação da task afetada.
- [ ] Delegar ao subagente **`git-commit`**: dois commits na branch `feature/cinematch-web`, **versionando por nome explícito** (nunca `git add .` nem `git add -A`) e **sem `push`**:

```bash
git add package.json index.html style.css script.js ui.js modelo.js .gitignore
git commit -m "feat: cria estrutura inicial do projeto e package do live-server"

git add docs/KANBAN.md .opencode/plans/m1-t01-bootstrap.md
git commit -m "docs: registra a conclusao do bootstrap no quadro kanban"
```

Os dois prefixos (`feat:` e `docs:`) são os exemplificados no briefing; uma linha, minúscula, sem ponto final. **Não** commitar `node_modules/` nem `package-lock.json` (o lockfile nasce na M1-T18).

**Acceptance:** Given os 7 arquivos novos e o `docs/KANBAN.md` alterado, When o `git-commit` versiona e commita, Then o repositório tem 2 commits novos no topo, o working tree fica limpo e nenhum `node_modules/` entra no índice.

#### Verificação

**Run:**
```powershell
git status --porcelain
```
**Expected:** **nenhuma saída** — depois do commit não sobra nada modificado nem não rastreado. Se `node_modules/` aparecer como untracked, o `.gitignore` da Task 6 não foi criado ou não foi versionado.

**Run:**
```powershell
git ls-files --eol package.json index.html style.css script.js ui.js modelo.js .gitignore docs/KANBAN.md
```
**Expected:** `i/lf` em todos — o índice guarda LF, como manda o `.gitattributes` (`*.md`, `*.js`, `*.css`, `*.html` com `text eol=lf`). Esta máquina tem `core.autocrlf=true`, então o `w/` pode aparecer como `crlf` em `package.json` e `.gitignore`, que não são cobertos pelo `.gitattributes`: isso é normal e não suja o diff. Já em `index.html`, `style.css`, os três `.js` e `docs/KANBAN.md`, o esperado é `w/lf` também.

**Run:**
```powershell
git log --oneline -3
git branch --show-current
```
**Expected:** no topo, `feat: cria estrutura inicial do projeto e package do live-server` e, abaixo dele, `docs: registra a conclusao do bootstrap no quadro kanban`; a branch continua sendo `feature/cinematch-web`.

---

### Checkpoint 2: os 7 arquivos existem e o `package.json` é válido

- Verificar: a raiz do repositório tem `package.json`, `index.html`, `style.css`, `script.js`, `ui.js`, `modelo.js` e `.gitignore`, nenhum deles com 0 byte.
- Validação: o comando da **Verificação Final** abaixo, primeira e segunda linhas. Não seguir para o `docs/KANBAN.md` com algum arquivo faltando.

---

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
| --- | --- | --- | --- |
| Módulos ES não funcionam via `file://` — quem abrir o `index.html` por duplo clique vê a página sem JavaScript e conclui que o bootstrap quebrou | Alta | Médio | o bootstrap ainda não é testável no navegador, porque o `live-server` só é instalado na M1-T18. Por isso a verificação da sessão é `node script.js`, que valida o grafo de módulos sem servidor; o aviso "só funciona por `npm start`" está no cabeçalho do `script.js` |
| Escopo estourando: o dev "melhora" o `index.html` com `<h1>`, landmarks e og tags, e a M1-T02 fica sem o que fazer | Média | Alto | cada task de código traz um **check de escopo negativo** (`Select-String` que precisa não encontrar nada); o `code-review` compara o diff com a seção 3 do `AGENTS.md` e com a linha 98 do `docs/KANBAN.md` |
| `node_modules/` versionado por engano quando a M1-T18 rodar `npm install` | Baixa | Alto | o `.gitignore` é criado na Task 6, **antes** de qualquer instalação; `git check-ignore` e `git ls-files` no Task 8 confirmam que a regra está ativa e que nada de `node_modules/` foi para o índice |
| CRLF no Windows (`core.autocrlf=true` nesta máquina) sujar o diff do `docs/KANBAN.md` | Média | Baixo | o `.gitattributes` já força `text eol=lf` em `*.md`, `*.js`, `*.css` e `*.html`, e não pode ser removido; a Task 7 mexe só nas linhas necessárias, sem reescrever o arquivo inteiro, e o Task 8 confere `i/lf` com `git ls-files --eol` |
| A pasta `Frontend` receber os arquivos por engano | Baixa | Alto | ela nem existe nesta máquina (`Test-Path -LiteralPath Frontend` → `False`) e não é versionada; todos os caminhos das tasks são absolutos e apontam para a raiz, e a Verificação Final checa que ela continua ausente |
| Os `PLACEHOLDER_*` sobreviverem à M1-T09 e à M1-T11 virando código morto no projeto final | Média | Médio | o prefixo `PLACEHOLDER_` foi escolhido exatamente para isso: um `Select-String -Pattern 'PLACEHOLDER'` lista tudo o que falta substituir; as Tasks 4 e 5 registram em comentário que a constante é apagada em M1-T09 e M1-T11 |
| Acentuação em UTF-8 corrompida ao escrever o `package.json` ou o `docs/KANBAN.md` | Média | Médio | o console do PowerShell corrompe a exibição, não o arquivo; `npm pkg get ... description` e a ferramenta de leitura confirmam o conteúdo real. Nunca "corrigir" acentuação que só está errada na tela |

## Verificação Final

Rodar com a raiz do repositório como diretório atual, depois que o `git-commit` conclude:

```powershell
'package.json','index.html','style.css','script.js','ui.js','modelo.js','.gitignore' | ForEach-Object { "$_ -> $(Test-Path -LiteralPath $_) / $((Get-Item -LiteralPath $_).Length) bytes" }
Test-Path -LiteralPath Frontend
Test-Path -LiteralPath node_modules
npm pkg get name scripts devDependencies
node script.js
Select-String -Path script.js,ui.js,modelo.js -Pattern 'PLACEHOLDER' -SimpleMatch
git status --porcelain
git branch --show-current
git log --oneline -6
```

**Resultado esperado:**

- Sete linhas, uma por arquivo, todas com `True` e com tamanho **maior que 0** — nenhum arquivo em branco de verdade.
- `False` para `Frontend` (a pasta não foi criada) e `False` para `node_modules` (nada foi instalado; isso é da M1-T18).
- `npm pkg get` com `name` `cinematch-web`, `scripts.start` `live-server` e `devDependencies."live-server"` `^1.2.2`.
- `node script.js` imprimindo `CineMatch Web: bootstrap carregado.` com código 0.
- **Nove** linhas com `PLACEHOLDER`: 5 em `script.js` (o comentário "placeholders", os dois `import` e as duas propriedades do `console.log`) e 2 em cada módulo irmão (o comentário e o `export`). O `Select-String` é case-insensitive, então o "placeholders" do comentário também entra na contagem.
- `git status --porcelain` **vazio** (nada modificado, nada untracked).
- `feature/cinematch-web` na branch, e 6 commits no `git log`, sendo os dois do topo os desta tarefa.

**Feito quando:** todas as oito tasks marcadas, o `code-review` sem achado aberto e o `git status` limpo. O `M1-T01` só está concluído no quadro depois disso — e o próximo passo do projeto é a M1-T02, que agora está desbloqueada.
### Nota de medição — valores reais dos portões

Nenhum `Expected:` com número foi estimado: os sete arquivos prescritos foram montados num diretório scratch e o `docs/KANBAN.md` foi reproduzido com as quatro edições da Task 7 aplicadas. Os comandos foram rodados literalmente.

| Portão | Valor medido |
| --- | --- |
| `git status --porcelain` completo | `?? .opencode/` — 1 linha. Por isso o pré-requisito usa o pathspec `':!.opencode'`, que devolve 0 |
| Guarda de escopo da Task 5, padrão antigo (`localStorage` com `-SimpleMatch`) | 2 linhas — o cabeçalho de responsabilidade e o comentário de segurança citam `` `localStorage` `` entre crases |
| Guarda de escopo da Task 5, padrão corrigido (`localStorage\.` em regex) | 0 linhas |
| `PLACEHOLDER` nos três `.js` | 9 linhas — 5 em `script.js` e 2 em cada módulo irmão; o `Select-String` é case-insensitive, então o "placeholders" do comentário também conta |
| `^- \[ \].*M1-T01` no quadro de hoje | **4** linhas (71, 76, 87 e 98) — a revisão registrou 3, mas a linha 98, que é a própria tarefa, também casa com o padrão largo |
| `^- \[ \] `M1-T01`` no quadro de hoje | 1 linha, a de número 98 — o portão ancorado tem força e pega a pendência se ela sobrar |
| `^- \[ \] `M1-T01`` depois da Task 7 | 0 linhas |
| `^- \[x\]` antes da Task 7 | 2 linhas (104 e 186) |
| `^- \[x\]` depois da Task 7 | 3 linhas (104, a nova da M1-T01 e 186) |

Única diferença em relação aos valores da revisão: o padrão largo de pendência devolve 4 linhas, e não 3, porque além das três linhas de dependência (71, 76 e 87) ele também casa com a linha 98 da própria M1-T01. A correção por ancoragem com crase resolve as duas situações: no quadro de hoje ela acusa a linha indevida, e depois da task o portão fecha em zero.

## Feature list

```json
{
  "features": [
    {
      "id": 1,
      "name": "Criar package.json com o script start do live-server em devDependencies",
      "status": "pending",
      "acceptance": [
        "Given o package.json criado, When o npm o lê, Then ele é JSON válido e devolve name cinematch-web, version 0.1.0, private true, type module, scripts.start live-server e devDependencies.live-server ^1.2.2",
        "Given a M1-T01, When se procura node_modules e package-lock.json, Then os dois estão ausentes, porque a instalação é da M1-T18"
      ]
    },
    {
      "id": 2,
      "name": "Criar index.html com o esqueleto mínimo e o script type=module",
      "status": "pending",
      "acceptance": [
        "Given o index.html criado, When ele é lido, Then contém lang=pt-BR, charset, viewport, title, o link para style.css e o script type=module apontando para script.js",
        "Given o index.html criado, When se procura h1, header, main, section, article, footer, og:title ou meta description, Then nada é encontrado, porque esses são da M1-T02 e da M1-T16"
      ]
    },
    {
      "id": 3,
      "name": "Criar style.css apenas com o cabeçalho, sem nenhuma regra",
      "status": "pending",
      "acceptance": [
        "Given o style.css criado, When ele é lido, Then tem mais de 0 byte e não declara nenhuma regra, media query nem CSS Grid",
        "Given o style.css criado, When o navegador carrega a página, Then o link do stylesheet resolve sem erro 404"
      ]
    },
    {
      "id": 4,
      "name": "Criar ui.js e modelo.js com export provisório PLACEHOLDER",
      "status": "pending",
      "acceptance": [
        "Given ui.js e modelo.js criados, When o Node analisa os dois, Then ambos são ES modules válidos e cada um exporta a sua constante PLACEHOLDER",
        "Given ui.js e modelo.js criados, When se procura class, document. ou addEventListener, Then nada é encontrado, porque as classes são da M1-T09 e o DOM é da M1-T11"
      ]
    },
    {
      "id": 5,
      "name": "Criar script.js com os import dos módulos irmãos e o console.log de bootstrap",
      "status": "pending",
      "acceptance": [
        "Given os três módulos JS, When se roda node script.js, Then ele resolve ./ui.js e ./modelo.js, encontra os exports importados e imprime a mensagem de bootstrap com código 0",
        "Given script.js, When se procura fetch(, localStorage., addEventListener, setTimeout, document. ou window. com o ponto escapado e sem -SimpleMatch, Then nada é encontrado"
      ]
    },
    {
      "id": 6,
      "name": "Criar .gitignore ignorando node_modules e preservando lockfile e planos",
      "status": "pending",
      "acceptance": [
        "Given o .gitignore criado, When o Git avalia node_modules/teste.js, Then o caminho é ignorado",
        "Given o .gitignore criado, When o Git avalia package-lock.json, .opencode/plans/m1-t01-bootstrap.md e index.html, Then nenhum dos três é ignorado"
      ]
    },
    {
      "id": 7,
      "name": "Mover M1-T01 para Concluído no docs/KANBAN.md com timestamp real",
      "status": "pending",
      "acceptance": [
        "Given o quadro atualizado, When se procura a linha de M1-T01, Then não sobra nenhuma linha com - [ ] para a M1-T01 e ela aparece uma vez em Concluído, com - [x] e o sufixo – Concluído em DD/MM/AAAA:HH:MM preenchido com a data real",
        "Given o quadro atualizado, When se procura Em Andamento / A Fazer, Then a string não aparece mais na Rastreabilidade nem na tabela de Critérios",
        "Given o quadro atualizado, When se conta as linhas com - [x], Then o resultado é 3: o M1-T00, a nova linha do M1-T01 em Concluído e o item Criei o quadro Kanban do checklist"
      ]
    },
    {
      "id": 8,
      "name": "Revisar com code-review e versionar com git-commit em dois commits",
      "status": "pending",
      "acceptance": [
        "Given o diff do bootstrap, When o code-review roda, Then não há achado aberto",
        "Given os 7 arquivos novos e o KANBAN alterado, When o git-commit versiona por nome explícito, Then há 2 commits novos, o working tree fica limpo e nenhum node_modules entra no índice",
        "Given os commits criados, When se roda git status e git log, Then não há push feito e a branch continua sendo feature/cinematch-web"
      ]
    }
  ]
}
```
