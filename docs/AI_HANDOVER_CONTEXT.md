# Contexto de Handover — CineMatch Web

> Gerado em **28/09/2026**. Commit base: **`91ed3a7`** (`develop`, merge da interface). Branch no momento da escrita: `feature/cinematch-web-interface` em `167aa01`.

## O que este arquivo é

Este é um **snapshot de uma sessão específica**, não um documento de projeto. Ele registra o estado do repositório ao fim de uma sessão de agente, as decisões que foram tomadas e o motivo delas, o que ainda está errado e o que fazer agora.

Ele **não** substitui nada:

- **`AGENTS.md`** continua sendo a fonte de verdade do **workflow** dos agentes — stack, regras do quadro, fluxo de Git, convenções.
- **`docs/KANBAN.md`** continua sendo a fonte de verdade do **estado** das tasks — o checkbox da linha é o único registro válido.
- O **PDF do briefing** continua sendo a fonte de verdade do **que é exigido**.

O que este arquivo acrescenta é o **raciocínio** e a **memória de pesquisa** da sessão: fatos já apurados que a próxima sessão não precisa rederivar, e erros de agente que já custaram tempo. **Substituir a cada nova sessão.** Se um número aqui não bater com o que você encontrar no repositório, o repositório vence: atualize este arquivo.

**Como este arquivo foi escrito.** Todo hash, contagem, caminho e linha aqui veio de um comando rodado nesta sessão, em `C:\Users\Lucas\CineMatch-Web`. O que não deu para verificar está marcado como **não verificado**, e o motivo está escrito. Não acrescente número de memória.

---

## 1. O projeto

### Contexto e prazo

CineMatch Web — recomendação de séries em tempo real. Projeto avaliativo final da disciplina *Desenvolvimento Mobile — React Native*, **Módulo 01, Semana 13**, professor **Matheus de Nadai**. É a evolução do CineMatch JS da semana 6, que rodava no terminal Node.js com catálogo fictício.

| Dado | Valor |
| --- | --- |
| Peso na nota | **60% da nota do módulo** — 15 critérios somando 10,00 pontos |
| Prazo | **05/10/2026 até 22h**, contado pela última atualização no GitHub |
| Margem no momento desta escrita | cerca de **7 dias** |
| API de catálogo | TVMaze — `https://api.tvmaze.com/shows?page=0` (pública, sem chave) |
| Remoto | `https://github.com/tiagoeduardobr/CineMatch-Web.git` |

### Restrição de stack — domina tudo

**Permitido:** HTML5 semântico, CSS3 com **Flexbox**, JavaScript com **módulos ES nativos** (`import`/`export`), `fetch`, `localStorage`, `live-server` via npm.

**Proibido:** React, Next.js, qualquer outro framework JS, TypeScript, bundlers e build, **CSS Grid**, Sass, CSS-in-JS, back-end, servidor ou banco de dados, jQuery, axios.

O nome da disciplina engana: o Módulo 01 é **HTML + CSS + JS puros**. O briefing só mencionou Flexbox, então **não use CSS Grid**. Usar item proibido zera o mérito do módulo.

### O que existe em disco nesta sessão

`git ls-tree -r --name-only HEAD` devolve **21 arquivos rastreados**:

| Caminho | Linhas | Papel |
| --- | --- | --- |
| `index.html` | 210 | página única: header, hero, login, formulário de perfil, seção de resultados, footer |
| `css/style.css` | 458 | folha de estilo completa, mobile-first, com `:root` de variáveis na linha 52 |
| `js/script.js` | 25 | **placeholder** — só cabeçalho, os dois `import` e um `console.log` |
| `js/ui.js` | 13 | **placeholder** |
| `js/modelo.js` | 13 | **placeholder** |
| `assets/main.png` | — | imagem da capa |
| `package.json` | 13 | `"start": "live-server"`, `"type": "module"`, `live-server: ^1.2.2` |
| `docs/BRIEFING.md` | 534 | transcrição pesquisável do PDF |
| `docs/KANBAN.md` | 215 | o quadro |
| `AGENTS.md` | 309 | convenções do ambiente |
| `cspell.json` | 60 | dicionário do Code Spell Checker |
| `.gitattributes` | 6 | LF em `md`, `js`, `css`, `html`; CRLF em `bat` |

`git grep "preventDefault\|addEventListener\|localStorage\|fetch" -- js/` só encontra as duas menções **dentro de comentários**. **Nenhum comportamento existe nos três módulos ainda** — é o próximo trabalho de verdade.

`node_modules` **não existe** (`Test-Path` deu `False`): o `npm install` é a `M1-T18`.

---

## 2. Estado do Git — verificado em 28/09/2026

### Commits desta sessão

Cinco commits criados em 28/09/2026, todos já publicados. Os três primeiros são novos desta sessão; `4ce8c97` e `2dcae95` já eram locais e saíram no mesmo push.

| Commit | Data e hora | Autor | Mensagem |
| --- | --- | --- | --- |
| `4ce8c97` | 28/09 19:14:21 | lucas | `feat: add navigation actions with buttons for search, theme toggle, and profile access` |
| `2dcae95` | 28/09 19:23:40 | lucas | `Merge remote updates into interface branch` (merge de `4ce8c97` com `ae5046b`) |
| `f3afebb` | 28/09 20:48:20 | lucas | `feat: completa formulário de perfil e nomeia o grupo de ações da navbar` |
| `b188f1e` | 28/09 20:48:27 | lucas | `style: centraliza as cores em variáveis e documenta a folha de estilo` |
| `167aa01` | 28/09 20:48:34 | lucas | `docs: registra a tela de login como bônus e ajusta o dicionário do editor` |

O que cada um mudou (`git show --stat`):

- `f3afebb` — só `index.html`, +194/−61.
- `b188f1e` — só `css/style.css`, +290/−18. Criou o bloco `:root` e o cabeçalho de 51 linhas que documenta as variáveis.
- `167aa01` — `cspell.json` +1 (`"svh"`) e `docs/KANBAN.md` +3/−2 (contagem do Backlog de 8 para 9 e o item novo).

### Branches

`git branch -a -vv` e `git ls-remote --heads origin` concordam. **Quatro branches**, todas com tracking e em sincronia com o remoto. `origin/HEAD` aponta para `origin/main`.

| Branch | Commit | Observação |
| --- | --- | --- |
| `main` | `e47b81d` | **30 commits atrás** de `develop` (`git rev-list --count main..develop` = 30) e 0 no sentido inverso. Único commit: `docs: cria quadro kanban com os 15 RFs do CineMatch Web` |
| `develop` | `91ed3a7` | merge de integração desta sessão |
| `feature/cinematch-web` | `8af3368` | **6 commits atrás** de `develop` e **0 atrás** no sentido inverso — não tem nada de exclusivo, só ainda não enxerga o trabalho de interface na própria árvore |
| `feature/cinematch-web-interface` | `167aa01` | branch corrente, `HEAD` = `167aa01e443acd77d316697348ee01fc8affe497` |

O arquivo anterior dizia 17 commits de distância entre `main` e `develop`. Hoje são **30** — o número cresce a cada integração, não é um valor fixo.

**Nada foi mergeado na `main`.** Comportamento correto: o `AGENTS.md` §6 proíbe merge na `main` antes do fim do projeto.

### Working tree

**Limpa.** `git status --short --branch` devolve só a linha `## feature/cinematch-web-interface...origin/feature/cinematch-web-interface`, sem `ahead` nem arquivos. `git ls-files --others --exclude-standard` não devolve nada.

### O merge na `develop` e a árvore resultante

`develop` é o commit de merge `91ed3a71439be57d203e3ac67bfd846d86ea5bec`, mensagem `Merge branch 'feature/cinematch-web-interface' into develop`, dois pais: `8af3368` e `167aa01`.

A medição que interessa, feita **antes** do merge:

| Medida | Comando | Resultado |
| --- | --- | --- |
| Ponto de divergência | `git merge-base 8af3368 167aa01` | `ae5046b` |
| `develop` à frente da interface | `git rev-list --count 167aa01..8af3368` | **6** |
| Interface à frente da `develop` | `git rev-list --count 8af3368..167aa01` | **5** |
| Conteúdo dos 6 commits da `develop` | `git diff --name-only ae5046b 8af3368` | **0 arquivos** |

Ou seja: os 6 commits que a `develop` tinha à frente eram **merges de sincronização, sem conteúdo** — mesma árvore, grafo diferente. É por isso que o merge não tinha risco de conflito.

Depois do merge, a prova de que nada foi perdido nem enxertado:

| Árvore | Hash |
| --- | --- |
| `git rev-parse 'develop^{tree}'` | `617433321dd51cb72bd91b083f6ed2303d1e7302` |
| `git rev-parse 'feature/cinematch-web-interface^{tree}'` | `617433321dd51cb72bd91b083f6ed2303d1e7302` |

**Idênticas.**

### Branch apagada e branch ressincronizada

**`feature/cinematch-web-bootstrap` foi apagada**, local e remota. Nada se perdeu:

- A ponta remota **já não existia** no GitHub — `acd92b5`, de 26/09/2026 12:15:49, é o `Merge pull request #1 from tiagoeduardobr/feature/cinematch-web-bootstrap`, com pais `e47b81d` e `ac072eb`. O PR #1 consumiu a branch. Por isso o `git push --delete` respondeu `remote ref does not exist`: **esse é o estado desejado, não um erro.**
- A ponta local era `af49c56`, commit não publicado de 26/09 13:58:00, com a **mesma árvore** de `dd89698`, que já está no histórico da `develop` (foi cherry-picked para a interface no mesmo dia, 26/09 14:16:36). `git rev-parse 'af49c56^{tree}'` e `git rev-parse 'dd89698^{tree}'` devolvem os dois `a09e94d0775ec30639a5c26cfc5f40eb0d099eb3`.

**`feature/cinematch-web` foi feita fast-forward** de `fcfa9eb` para `8af3368`, +21 commits (`git rev-list --count fcfa9eb..8af3368`). A árvore antiga era `git ls-tree --name-only fcfa9eb` = `.gitattributes`, `AGENTS.md`, `docs` — **sem `index.html`, sem `js/`, sem `css/`, sem `package.json`**. Era anterior ao bootstrap e à reorganização em pastas. A branch não tinha nada de exclusivo: a diferença toda era o que o `develop` já tinha.

O `reflog` confirma as duas operações: `8af3368 HEAD@{2026-09-28 20:56:48}: merge origin/feature/cinematch-web: Fast-forward` e `91ed3a7 develop@{2026-09-28 21:07:58}: merge feature/cinematch-web-interface`.

### Os dois push desta sessão

Confirmados pelo reflog das referências remotas, que registra `update by push` com o valor antigo e o novo:

| Push | Ref | Movimento | Horário |
| --- | --- | --- | --- |
| Interface | `origin/feature/cinematch-web-interface` | `ae5046b` → `167aa01` | 28/09 21:06:38 |
| Integração | `origin/develop` | `8af3368` → `91ed3a7` | 28/09 21:08:18 |

**Sem force push, sem merge na `main`.** Ambos foram autorizados explicitamente pelo usuário na sessão.

---

## 3. O que foi feito nesta sessão

### 3.1 Três arquivos rastreados estavam deletados do disco, sem commit

`package.json`, `.gitignore` e o PDF do briefing em `docs/` sumiram da working tree sem nenhum commit registrando a remoção. Restaurados do `HEAD`, byte a byte. O que cada um custaria se tivesse ficado perdido:

| Arquivo | Por que é indispensável |
| --- | --- |
| `package.json` | É o que faz o `npm start` funcionar (RF15) e é onde mora o `"type": "module"` que declara o projeto como ESM de ponta a ponta |
| `.gitignore` | Protege o `node_modules` de ser versionado |
| `docs/Projeto Avaliativo Final - ... .pdf` | É a **fonte de verdade de precedência** — perde para nada, e o `BRIEFING.md` é só a cópia pesquisável |

### 3.2 Defeitos corrigidos no HTML e no CSS que o usuário já tinha escrito

| Defeito | Correção | Verificável no repositório? |
| --- | --- | --- |
| `#form-perfil` sem botão de submit, que a `M1-T03` exige literalmente | `<button type="submit">Ver recomendações</button>` na linha 188 do `index.html` | **Não.** O `index.html` versionado em `2dcae95` tinha 77 linhas e **não tinha `#form-perfil` nenhum**. O formulário vivia só na cópia de trabalho, nunca commitada. O que dá para afirmar é o estado atual, não o defeito |
| `<div class="nav-actions">` com `aria-label` em elemento de `role="generic"`, que não aceita nome acessível, então o rótulo era descartado | `role="group"` na linha 61 | **Sim.** O `index.html` de `2dcae95`, linha 40, era `<div class="nav-actions" aria-label="Ações rápidas">`, sem `role` |
| Bloco `:root` no meio do arquivo | `:root` na linha 52, antes do reset, com as **13** variáveis `--cor-*` documentadas no cabeçalho | **Parcialmente.** O CSS de `2dcae95` tinha 186 linhas e **nenhum** `:root` — ele foi criado no `b188f1e`. A posição antiga de linha 188 não é verificável: o arquivo da working tree nunca foi commitado |
| Comentários de cabeçalho afirmavam coisas falsas: diziam que a grade de cards era trabalho futuro, quando já existia no CSS, e que o formulário ainda não existia | Cabeçalho reescrito com o estado real | Sim, por inspeção do `git show b188f1e` |

### 3.3 A tela de login foi mantida, por decisão do usuário

A seção `.secao-login` (e-mail, senha, "Entrar" e "Criar conta") **não consta do briefing**. A seção 3 do PDF, transcrita em `docs/BRIEFING.md:81`, diz: *"O wireframe abaixo mostra dois estados da aplicação: o formulário de perfil e os resultados com os cards de recomendação."* **Dois estados, nenhum login** — e a palavra "login" não aparece nenhuma vez no `BRIEFING.md`. Some a isso que back-end é proibido no Módulo 01.

Decisão do usuário: manter. O risco de rasgo Some, e a divergência fica **declarada**, nunca silenciada:

- No comentário do `index.html`, linhas 36 a 42.
- No item do Backlog, `docs/KANBAN.md:87`, que diz na íntegra que **não consta do briefing**, que os dois botões são `type="button"` e **ainda não têm comportamento**, e que **não conta nota**.

Os dois botões estão assim hoje: `<button type="button">Entrar</button>` e `<button type="button">Criar conta</button>` (`index.html` linhas 122 e 123). São layout e estilo, nada mais. A contagem do Backlog foi de **8 para 9** nos dois lugares onde aparece: nos metadados (linha 17) e na nota acima da lista (linha 77).

### 3.4 Limite de escopo explícito

O usuário foi claro: **não desenvolver o projeto, só corrigir o que ele já tinha escrito.** Então não foram adicionados `meta description`, og tags nem skip link. `git grep "skip\|description" -- index.html` não devolve nada, e o `index.html` só tem `meta charset`, `meta viewport` e `<title>`. Essas são da `M1-T02` e da `M1-T16`, que **seguem pendentes de propósito** — mexer nelas agora roubaria o objeto das duas tasks.

### 3.5 `"svh"` no dicionário do editor

O Code Spell Checker assinalava as 5 ocorrências de `100svh` no CSS (`git grep -c "100svh" -- css/style.css` = 5). Acrescentado `"svh"` em `cspell.json:55`. É configuração de editor, não entra na aplicação nem em nenhum RF.

---

## 4. A lição mais importante desta sessão

### 4.1 Dois agentes anteriores afirmaram fatos errados

Um agente anterior **afirmou dois fatos errados** numa seção que existe justamente para não afirmar fatos errados:

1. Escreveu que `??` não aparecia em nenhum dos dois repositórios das aulas. **Aparece** — em `cinematch_antigo/cinematch.js:211`, no cálculo do próximo id. Ele não foi ensinado, mas existe.
2. Escreveu que os `.js` de `semana-12/modulos/` ainda estavam em CommonJS. **Já são ESM**: `index.js` faz `import`, `slug.js` faz `export`, e o `package.json` já tem `"type": "module"`. O professor corrigiu o exercício no commit `a413b0c`, de 18/09/2026.

Nos dois casos o agente **tinha a evidência na tela e escreveu o contrário**. Ambos foram encontrados pelo code review, um por um.

### 4.2 A regra que decorre

**Assertar de memória é o modo de falha mais provável neste projeto.** Toda afirmação factual nova precisa ser conferida contra o arquivo antes de virar texto de documentação. Se você não abriu o arquivo, você não sabe — escreva "não verificado" em vez de arriscar. A versão 27/09 deste arquivo existia justamente para carregar esse histórico, e por isso ele foi preservado em vez de reescrito do zero.

### 4.3 A ocorrência desta sessão, do mesmo tipo

Um agente **afirmou que a `develop` não tinha nada exclusivo em relação à branch de interface, e que a integração seria um fast-forward. Estava errado.** A razão foi específica e generalizável: o `origin/develop` **local estava desatualizado**, porque o clone não tinha feito `fetch`. O `fetch` da sessão seguinte revelou que a `develop` tinha andado. A correção não veio de raciocínio, veio de `git fetch`.

> **Regra: antes de afirmar qualquer coisa sobre o estado de uma branch remota, rode `git fetch` e releia o ref. Um `origin/*` no disco é uma cópia de quando o `fetch` rodou, não o estado do servidor.**

O mesmo agente chegou a dizer, mais tarde, que uma branch local "já existia" quando outra medição recente mostrava que não existia, e que um `git merge` tinha retornado `Already up to date` apesar de ele estar na branch errada. **O estado final estava correto, mas a narrativa do agente não batia com a sequência.**

> **Regra: não confie na narração de um subagente sobre o que ele fez — verifique o estado final com o comando de leitura, você mesmo.**

Foi o que salvou a operação aqui: `git rev-parse` das árvores e `git branch -a -vv` confirmaram o resultado independentemente do que o agente dizia. São comandos de leitura, não de escrita, e podem ser repetidos sem risco.

### 4.4 Um erro de processo da sessão anterior

O mesmo agente da seção 4.1 rodou `git restore docs/KANBAN.md` ao achar que um subagente tinha escrito fora do escopo — e as edições eram do usuário, feitas em paralelo. Não houve perda (o usuário reaplicou), mas a decisão foi tomar **ação destrutiva sobre trabalho do usuário sem perguntar**.

Daí decorre a regra de orquestração deste projeto: **delegar implementação ao `dev` e revisão ao `code-review` antes de seguir**; nunca editar arquivo do projeto diretamente; **nunca reverter alteração do usuário sem antes perguntar**.

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

Nenhum dos dois repositórios tem pasta da semana 6 nem da semana 13.

> **Atenção ao verificar fatos:** só `cinematch_antigo/` está clonado neste repositório. O repositório das semanas **não está** — os caminhos `semana-XX/...` citados abaixo só podem ser conferidos acessando o repositório remoto, não a partir desta cópia de trabalho. Confirmado nesta sessão: `git ls-tree -r --name-only HEAD` devolve 21 arquivos e nenhum começa com `semana-`.

---

## 6. Fatos já verificados — não rederive

| Fato | Onde |
| --- | --- |
| `??` aparece 1×, e não foi ensinado | `cinematch_antigo/cinematch.js:211` |
| `semana-12/modulos/` já é ESM | `index.js` faz `import`, `slug.js` faz `export`, `package.json` com `"type": "module"`; commit `a413b0c`, 18/09/2026 — confirmado pelo `AGENTS.md` §2.1 |
| `normalizarTexto()` | `cinematch_antigo/cinematch.js:284`, **não** em `catalogo.js` |
| Globais implícitos quebram em módulo ES | `cinematch_antigo/cinematch.js` linhas 31 (`opcao = prompt(...)`), 171 (`for (i = 0; i < catalogo.length; i++)`) e 330 (`for (i = 0; i < resultado.length; i++)`) |
| O curso já proíbe a regra de especificidade de última instância, então isso aqui não é divergência entre o que se ensinou e o que se pode entregar | a única ocorrência no material das aulas é um comentário em `semana-10/exercicio-especificidade/style.css:116` |
| `semana-11/ceu-aberto/script.js` não tem `try/catch` | 69 linhas, zero `try`/`catch` |
| `og:` e `meta description` só no `ceu-aberto` | os `index.html` das semanas 09 e 10 têm `lang`, `<title>` e landmarks, mas zero `og`/`description` |
| Briefing não menciona LF/CRLF, encoding nem `.gitattributes` | varredura das 16 páginas, zero ocorrências |
| Escopo real do versionamento (5.6) | branches mínimas, mínimo 5 commits individual / 8 squad, prefixos exemplificados (`feat:`, `style:`, `docs:`), fluxo até a `main` |
| **A seção 3 do briefing tem só DOIS estados e nenhum login** | `docs/BRIEFING.md:81` — *"o formulário de perfil e os resultados com os cards de recomendação"*. "login" não aparece nenhuma vez no `BRIEFING.md`. É o que autoriza tratar a tela de login como bônus fora do escopo |
| **Os 6 commits que a `develop` tinha à frente da interface eram vazios de conteúdo** | `git merge-base 8af3368 167aa01` = `ae5046b`; `git rev-list --count 167aa01..8af3368` = 6; `git diff --name-only ae5046b 8af3368` = **0 arquivos**. Por isso o merge de 28/09 não tinha risco de conflito |
| **A ponta remota da branch de bootstrap já não existia** | `acd92b5` (26/09/2026 12:15:49) é o `Merge pull request #1 from tiagoeduardobr/feature/cinematch-web-bootstrap`, com pais `e47b81d` e `ac072eb` — `git ls-remote --heads origin` hoje devolve só 4 branches |
| **`core.autocrlf = true` nesta máquina** | `git config --get core.autocrlf` |
| **Identidade do Git já configurada** | `git config --get user.name` = `lucas`; `user.email` = `lucasgd123@gmail.com`. Não rode `git config` |
| **Não existe configuração de lint de Markdown** | `git ls-files` só devolve `cspell.json` entre os arquivos de configuração. Não há `.markdownlint.json`, nem `.editorconfig`, nem `.eslintrc`, e não existe comentário `markdownlint-disable` em lugar nenhum |

---

## 7. Problemas abertos

1. **A `M1-T12` está adiantada no quadro.** A grade de cards **já existe no CSS**: `.resultados` nas linhas 393 e 450, `.card-serie` nas linhas 401 e 455, `flex-wrap: wrap` nas linhas 365, 432 e 452, e as duas media queries em `@media (max-width: 768px)` (linha 204) e `@media (min-width: 769px)` (linha 418). Mas a `M1-T12`, em `docs/KANBAN.md:100`, ainda descreve `flex-wrap` como trabalho dela. **Quem for executar a `M1-T12` vai achar que já está feito** — e a task não sai de *A Fazer* sem estar funcionando e testada, o que ainda não aconteceu. O que falta ali é a verificação, não a propriedade.

2. **O botão de submit do perfil hoje recarrega a página.** Nada chama `preventDefault()` ainda, porque a `M1-T05` (Tiago) está em aberto. Clicar em "Ver recomendações" (`index.html:188`) faz um GET nativo e joga o perfil na query string. É o comportamento esperado do RF02 e quem fecha é a `M1-T05`.

3. **Risco latente na tela de login: e-mail e senha na query string.** Se o bônus virar `type="submit"` sem `preventDefault()`, o GET padrão manda **e-mail e senha para a query string** e para o histórico do navegador — CWE-598, owasp A02. Hoje é inerte, porque os dois botões são `type="button"`. Quem algum dia implementar esse bônus tem que colocar o `preventDefault()` **antes** de mexer no `type`.

4. **Não houve verificação em navegador.** `node_modules` não existe e a instalação é a `M1-T18`. A cascata dos três botões da navbar, do botão de submit e dos dois botões de login foi resolvida por **análise estática**, não por execução. Quando rodar `npm install`, abrir a página e olhar os três botões é a confirmação mais barata que existe — e o `AGENTS.md` §7 proíbe abrir via `file://`, porque os módulos ES morrem de CORS.

5. **Lacuna do `.gitattributes`:** a regra cobre `md`, `js`, `css`, `html` e `bat`, mas **não** `*.json`. Com `core.autocrlf=true`, o `cspell.json` está em disco com **60 linhas CRLF e 0 LF** (contagem por regex sobre os bytes, arquivo com 967 bytes). O `package.json` está no mesmo regime. Não quebra nada — o índice grava LF e o status fica limpo. É cosmético, a decisão é do usuário e **ainda não foi tomada**. Não "resolva" por conta própria: acrescentar `*.json` ao `.gitattributes` mexe em todos os `.json` do repositório, e essa é uma escolha do usuário.

6. **Duas imagens do briefing não são verificáveis por texto.** O wireframe (Seção 3) e a **estrutura de pastas** (Seção 5.2) são figuras no PDF. A Seção 3 do `AGENTS.md`, que descreve `js/`, `css/`, `assets/` e `index.html` na raiz, é **derivada, não comprovada** pela transcrição. Alguém precisa abrir a página da Seção 5.2 no PDF e conferir com os olhos antes de apresentar isso como exigência do professor no vídeo.

7. **A lógica da semana 6 ainda não foi portada.** `js/modelo.js` (13 linhas), `js/script.js` (25 linhas) e `js/ui.js` (13 linhas) são placeholders. É o próximo trabalho de verdade.

8. **Divisão de trabalho e WIP.** O `docs/KANBAN.md` marca `M1-T03` e `M1-T04` como "por Lucas" e `M1-T05` como "por Tiago" — dois nomes distintos, o que indica squad de 2. A divisão segue exatamente o que o `AGENTS.md` §5 descreve: HTML e CSS da mesma tela são tasks acopladas e compartilham um slot, enquanto a task de lógica ocupa o outro. Com 3 tasks em *Em Andamento*, o WIP está **no teto** que a regra define para squad de 2, e **2 acima** do limite de 1 do trabalho solo. O que falta confirmar com o usuário é se o squad ainda tem 2 pessoas ativas — disso dependem o WIP e a contagem mínima de commits (**5 no individual, 8 no squad**).

---

## 8. Estado das tasks

Conferido no `docs/KANBAN.md` em 28/09/2026.

| Coluna | Tasks | Quantidade |
| --- | --- | --- |
| Concluído | `M1-T00`, `M1-T01` | 2 |
| Em Andamento | `M1-T03`, `M1-T04`, `M1-T05` | 3 |
| A Fazer | `M1-T02` e `M1-T06` a `M1-T23` | 19 |
| Backlog | 9 itens de bônus, sem ID — não contam nota | 9 |

Total: **24 tarefas** (`M1-T00` a `M1-T23`) + **9 itens de Backlog**. Bate com os metadados do próprio quadro, na linha 17: *"24 tarefas (`M1-T00` a `M1-T23`) + 9 itens no Backlog (7 bônus das seções 8 e RF12 + 1 opcional da seção 5.4 + 1 bônus de interface fora do escopo do briefing)"*. A soma 2 + 3 + 19 = 24 fecha.

O Backlog subiu de **8 para 9** nesta sessão, com a tela de login, e a contagem foi corrigida nos dois lugares onde aparece (linhas 17 e 77).

O checklist final de entrega do `KANBAN.md` tem **24 itens, dos quais 23 estão pendentes** — só "Criei o quadro Kanban" está marcado. Os itens de entrega ainda zerados são os três mais pesados do projeto: **vídeo de até 7 minutos** (peso 1,50), **quadro Kanban publicado com link** e **os três links no AVA**.

A verificação cruzada fecha: `- [ ]` = 54 no arquivo = 19 (A Fazer) + 3 (Em Andamento) + 9 (Backlog) + 23 (checklist). E `- [x]` = 3, sendo `M1-T00`, `M1-T01` e o item do checklist.

---

## 9. Gotchas do ambiente Windows

- **O diretório temporário externo muda de máquina para máquina.** O valor literal é **`C:\Users\<usuário>\AppData\Local\Temp\opencode`**, e só existe uma cópia dele por usuário do Windows. **Confira, não copie do arquivo.** O `Test-Path` desta sessão, rodada na máquina do Lucas, deu `True` para `C:\Users\Lucas\AppData\Local\Temp\opencode` e `False` para `C:\Users\Tiago\AppData\Local\Temp\opencode`. A versão 27/09 deste arquivo trazia o caminho do Tiago com valor literal, e o próximo agente que o copiasse sem conferir iria escrever no lugar errado — ou, pior, concluiria que o diretório não existe. **Motivo da divergência: este arquivo foi escrito na máquina do Tiago e esta sessão rodou na do Lucas.** É o único lugar fora do repositório onde escrita é permitida.
- **Python não está instalado nesta máquina.** `python` e `python3` resolvem só para o stub da Microsoft Store em `C:\Users\Lucas\AppData\Local\Microsoft\WindowsApps\`, e `python --version` falha com a mensagem de "instalar da Microsoft Store". `py` não existe. Então a receita do `AGENTS.md` de extrair texto de PDF com `pypdf` **não é utilizável aqui** — a versão 6.15.0 que o `AGENTS.md` cita **não foi verificada nesta máquina** e provavelmente pertence à máquina do Tiago. O `node` existe (`C:\Program Files\nodejs\node.exe`). Quem precisar ler o PDF, use a transcrição em `docs/BRIEFING.md` ou instale o Python.
- **O console do PowerShell corrompe acentuação na saída** — acentos e cedilhas aparecem como `?` ou como um caractere de substituição Unicode (`U+FFFD`) no terminal, mesmo que o arquivo esteja correto em UTF-8. **Nunca** "conserte" acentuação que só está errada na tela do terminal: isso corromperia o arquivo de verdade.
- **`Measure-Object -Line` conta só linhas não-vazias.** Use `$a = [System.IO.File]::ReadAllLines(<arquivo>); $a.Count` para a contagem real. Já causou um falso alarme numa sessão anterior: um arquivo com 186 linhas reportou 160.
- **Comandos negados por permissão:** `python -c`, `node -e`, `sed`, `awk`, `tee`, `cat >`, `Set-Content`, `Out-File`. Grave um script em arquivo e execute. Atenção: nesta máquina o `python -c` nem chega à negativa do ambiente, porque o Python não existe (veja acima).
- **`core.autocrlf=true` nesta máquina.** É a causa do comportamento de CRLF no `*.json` descrito no problema 5 da seção 7.
- `cspell.json` é configuração do Code Spell Checker, não faz parte da aplicação. Não entra em nenhum RF.
- **O modelo não lê PDF.** Para extrair, use `pypdf` a partir de um script gravado — viável apenas onde o Python exista.

---

## 10. Próximos passos sugeridos

1. **Fechar o `M1-T02` e o `M1-T16`, que destravam três tasks.** O `index.html` tem hoje só `charset`, `viewport` e `<title>`. Faltam a `meta description`, as og tags e o skip link. Cuidado com a `M1-T12`, que está adiantada (problema 1): ela descreve trabalho já feito no CSS, então confirme o que ainda falta antes de marcar.
2. **Portar a lógica da semana 6 para módulos ES:** as classes `Conteudo` e `Serie extends Conteudo` em `js/modelo.js`, e a compatibilidade com `compatibilidade()` e `obterConteudosPorGenero()` em `js/script.js`. **Porte a lógica, não o estilo**: o `cinematch.js` é código de terminal e usa globais sem declarar (linhas 31, 171 e 330), que quebram com `ReferenceError` em módulo ES. Declare com `let` ou `const` ao portar.
3. **Confirmar se a `M1-T05` deve ser feita na branch de lógica.** A branch corrente é `feature/cinematch-web-interface`, mas a `M1-T05` (modelagem do perfil, marcada "por Tiago") é task de **lógica**, e o `AGENTS.md` §6 atribui lógica a `feature/cinematch-web`. Confirmar com o usuário. A branch de lógica está 6 commits atrás da `develop` e já pode ser um fast-forward puro.
4. **Rodar `npm install` (`M1-T18`) e abrir a página.** É a confirmação pendente do problema 4 e a única forma de sair da análise estática.
5. **Abrir a Seção 5.2 do PDF** e conferir a estrutura de pastas com os olhos, antes de apresentá-la como exigência do professor.
6. **Confirmar o tamanho do squad** — se ainda são 2 pessoas ativas. Disso dependem o limite de WIP e a meta de commits: **5 no individual, 8 no squad**.
7. **Push é decisão do usuário.** Nunca fazer push sem pedido explícito. E nunca force push neste repositório, nem com `--force` nem com `--force-with-lease`.
