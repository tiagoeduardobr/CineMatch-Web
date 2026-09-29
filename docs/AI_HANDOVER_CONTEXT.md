# Contexto de Handover — CineMatch Web

> Gerado em **29/09/2026**. `HEAD` no momento da escrita: **`4a89b5d`** (`docs: sincroniza o quadro com o estado real do código`), branch corrente `feature/cinematch-web-interface`, **1 commit à frente do remoto** — o `4a89b5d` **não foi pushado**. `develop` = `9914ee5`, `main` = `e47b81d`, `feature/cinematch-web` = `8af3368`. Detalhes na seção 2.

## O que este arquivo é

Este é um **snapshot de uma sessão específica**, não um documento de projeto. Ele registra o estado do repositório ao fim de uma sessão de agente, as decisões que foram tomadas e o motivo delas, o que ainda está errado e o que fazer agora.

Ele **não** substitui nada:

- **`AGENTS.md`** continua sendo a fonte de verdade do **workflow** dos agentes — stack, regras do quadro, fluxo de Git, convenções.
- **`docs/KANBAN.md`** continua sendo a fonte de verdade do **estado** das tasks — o checkbox da linha é o único registro válido.
- O **PDF do briefing** continua sendo a fonte de verdade do **que é exigido**.

O que este arquivo acrescenta é o **raciocínio** e a **memória de pesquisa** da sessão: fatos já apurados que a próxima sessão não precisa rederivar, e erros de agente que já custaram tempo. **Substituir a cada nova sessão.** Se um número aqui não bater com o que você encontrar no repositório, o repositório vence: atualize este arquivo.

**A propriedade do formato: os hashes aqui ficam um commit atrás de si mesmos.** Este arquivo é versionado dentro do próprio repositório que ele descreve. No instante em que o snapshot é commitado, os hashes que ele cita passam a ser os de **antes** do próprio commit — não há como ser de outro jeito sem uma corrida. Concretamente: este arquivo é escrito sobre a árvore de `4a89b5d` e cita `feature/cinematch-web-interface` = `4a89b5d` e `develop` = `9914ee5`; o commit que o carregar terá outro hash, e a `develop` só ganha um merge depois disso. Ler `develop` = `9914ee5` num arquivo commitado acima de `4a89b5d` é o resultado esperado, não inconsistência. A regra acima continua valendo e é a que resolve: **quando um hash aqui não bater com o repositório, o repositório vence** — e o caso mais comum de divergência é justamente este, o de um commit atrás.

**Como este arquivo foi escrito.** Todo hash, contagem, caminho e linha aqui veio de um comando rodado nesta sessão, em `C:\Users\Lucas\CineMatch-Web`. Duas coisas **não** foram feitas e por isso não têm número: `git fetch` não foi rodado (problema 3 da seção 7) e **nenhum navegador foi aberto** — nem nesta sessão, nem na anterior. O que não deu para verificar está marcado como **não verificado**, e o motivo está escrito. Não acrescente número de memória.

---

## 1. O projeto

### Contexto e prazo

CineMatch Web — recomendação de séries em tempo real. Projeto avaliativo final da disciplina *Desenvolvimento Mobile — React Native*, **Módulo 01, Semana 13**, professor **Matheus de Nadai**. É a evolução do CineMatch JS da semana 6, que rodava no terminal Node.js com catálogo fictício.

| Dado | Valor |
| --- | --- |
| Peso na nota | **60% da nota do módulo** — 15 critérios somando 10,00 pontos |
| Prazo | **05/10/2026 até 22h**, contado pela última atualização no GitHub |
| Margem no momento desta escrita | Cerca de **6 dias** — a versão de 28/09 dizia 7, e a diferença é exatamente um dia |
| API de catálogo | TVMaze — `https://api.tvmaze.com/shows?page=0` (pública, sem chave) |
| Remoto | `https://github.com/tiagoeduardobr/CineMatch-Web.git` |

### Restrição de stack — domina tudo

**Permitido:** HTML5 semântico, CSS3 com **Flexbox**, JavaScript com **módulos ES nativos** (`import`/`export`), `fetch`, `localStorage`, `live-server` via npm.

**Proibido:** React, Next.js, qualquer outro framework JS, TypeScript, bundlers e build, **CSS Grid**, Sass, CSS-in-JS, back-end, servidor ou banco de dados, jQuery, axios.

O nome da disciplina engana: o Módulo 01 é **HTML + CSS + JS puros**. O briefing só mencionou Flexbox, então **não use CSS Grid**. Usar item proibido zera o mérito do módulo.

### O que existe em disco nesta sessão

`git ls-tree -r --name-only HEAD` devolve **21 arquivos rastreados** — o mesmo número de 28/09, porque a sessão não versionou nada novo.

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

Os 21 rastreados incluem ainda `.gitignore`, `.opencode/plans/m1-t01-bootstrap.md`, `package-lock.json`, `run_opencode_web.bat`, o PDF do briefing e os três arquivos de `cinematch_antigo/`.

**Nenhuma linha de código mudou nesta sessão.** `git status --short` não devolve nenhum arquivo rastreado modificado, o que prova que `index.html`, `css/style.css`, os três `.js` e o `package.json` estão idênticos ao `HEAD` = `4a89b5d`.

`Select-String` com `-SimpleMatch` nos três módulos: `addEventListener` = 0, `preventDefault` = 0, `fetch` = 0, `setTimeout` = 0, `createElement` = 0, `.map` = 0, `.filter` = 0, `.sort` = 0, `.find` = 0. As 2 ocorrências de `localStorage` estão em `js/script.js:4` e `js/script.js:21`, ambas **dentro de comentário**, e as 2 ocorrências de `Conteudo` e `Serie` estão em `js/modelo.js:4` e `js/modelo.js:5`, também em comentário — **nenhuma classe existe**. Os placeholders continuam: `export const PLACEHOLDER_UI` (`js/ui.js:11`, com `pronto: false` na 12) e `export const PLACEHOLDER_MODELO` (`js/modelo.js:11`, `pronto: false` na 12). **Nenhum comportamento existe nos três módulos ainda** — é o próximo trabalho de verdade.

### 1.1 O que o `npm install` deixou em disco — e o que ele não deixou

`node_modules` **agora existe**. É a mudança material da sessão, e ela muda o problema 4 da seção 7.

| Medida | Comando | Resultado |
| --- | --- | --- |
| Existe? | `Test-Path -LiteralPath node_modules` | `True` |
| Criado em | `Get-Item node_modules \| Select CreationTime` | **29/09/2026 14:58:36** |
| Pacotes de primeiro nível | `Get-ChildItem node_modules -Directory -Force \| Where-Object Name -ne '.bin'` | **146** |
| Deles, quantos têm `package.json` | mesmo comando, filtrando por `Test-Path package.json` | **146** |
| Pastas com escopo `@...` | mesmo comando, `Where-Object Name -like '@*'` | **0** |
| Pacotes contando os aninhados | `Get-ChildItem node_modules -Directory -Force -Recurse \| Where-Object { Test-Path $_/package.json -and Name -notin 'node_modules','.bin' }` | **191** |
| Só os aninhados | o mesmo, filtrando `\node_modules\[^\\]+\node_modules\` | **45** |
| `node_modules\.bin\live-server.cmd` | `Test-Path -LiteralPath node_modules\.bin\live-server.cmd` | `True` |
| Versão do `live-server` | `node_modules/live-server/package.json` → `.version` | **1.2.2** |
| Entradas de primeiro nível no lock | `Select-String package-lock.json -Pattern '^\s{4}"node_modules/[^/]+"'` | **150** |
| Versão do Node | `node --version` | **v26.7.0** |
| `package-lock.json` sujou o repositório? | `git status --short --untracked-files=no` | **vazio** — conteúdo inalterado |

O número **146** é de pacotes **de primeiro nível**; o **191** conta os 45 aninhados; o **150** é de chaves de primeiro nível no `package-lock.json`, das quais 4 são opcionais e não instalam no Windows (`bindings`, `file-uri-to-path`, `fsevents`, `nan` — `Select-String` com contexto no lock). São três métricas diferentes, e o multiplicador muda conforme a escolhida: **escreva sempre qual métrica você usou**.

**O que o `npm install` NÃO fez:** ninguém subiu o `live-server`, ninguém conferiu se os três `.js` voltam com `Content-Type: text/javascript`, e **a página nunca foi aberta no navegador**. A validação do servidor é **não verificada** nesta sessão e na anterior — o bloqueio deixou de ser a instalação, mas continua sendo a validação.

### 1.2 Três PNGs untracked em `assets/`

`git ls-files --others --exclude-standard` devolve exatamente três arquivos, todos em `assets/`, com nomes de captura de tela de 28/09:

- `Captura de tela 2026-09-28 223830.png` (67.405 bytes)
- `Captura de tela 2026-09-28 223843.png` (66.973 bytes)
- `Captura de tela 2026-09-28 223908.png` (60.745 bytes)

Já estavam untracked **antes** desta sessão e **não** foram adicionados, movidos nem removidos: ficaram de fora do commit `4a89b5d` de propósito, porque versionar captura de tela de tela não é artefato do projeto. `git ls-files assets` devolve só `assets/main.png`. Decisão de mantê-los fora do versionamento é do usuário — **não** os versione nem os apague por conta própria.

---

## 2. Estado do Git — verificado em 29/09/2026

### 2.1 O commit da sessão

Um único commit, e ele **não foi pushado**.

| Commit | Branch | Mensagem |
| --- | --- | --- |
| `4a89b5d` | `feature/cinematch-web-interface` | `docs: sincroniza o quadro com o estado real do código` |

`git status --short --branch` devolve `## feature/cinematch-web-interface...origin/feature/cinematch-web-interface [ahead 1]`. O único arquivo versionado foi `docs/KANBAN.md`; a mensagem do commit descreve a sincronização em detalhe.

`git rev-list --count HEAD` = **27** commits no total. O `4a89b5d` é o último; o anterior na branch é o `279d8e0`, que é também a ponta remota da branch de interface.

### 2.2 Branches

`git branch -a -vv` e `git rev-parse` das quatro branches. As quatro têm tracking.

| Branch | Commit | Distâncias medidas |
| --- | --- | --- |
| `main` | `e47b81d` | `develop..main` = **0** · `main..develop` = **36** |
| `develop` | `9914ee5` | — |
| `feature/cinematch-web` | `8af3368` | `develop..feature/cinematch-web` = **0** · `feature/cinematch-web..develop` = **12** |
| `feature/cinematch-web-interface` | `4a89b5d` | `develop..feature/cinematch-web-interface` = **1** · `feature/cinematch-web-interface..develop` = **11** |

Todos os números saem de `git rev-list --count <a>..<b>`.

**`git rev-list --count develop..main` = 0: a `main` é ancestral da `develop` e nada foi mergeado nela. Comportamento correto**, conforme o `AGENTS.md` §6, que manda integrar `develop` → `main` só no fim do projeto. **Não é atraso, e nenhum agente deve "corrigir" a `main` por conta própria** — merge nela agora quebra o fluxo que o Critério 2 do briefing avalia.

**`develop..feature/cinematch-web` = 0 e `feature/cinematch-web..develop` = 12: a branch de lógica é ancestral da `develop`.** `git merge-base --is-ancestor feature/cinematch-web develop` sai com código **0**, confirmando. Ela está **atrasada, e só isso** — nenhum commit exclusivo, nenhum trabalho perdido. O único número isolado sugere risco e não há risco; o que falta é um fast-forward para enxergar o trabalho de interface na própria árvore.

**A branch de interface está 1 à frente da `develop`, e esse commit é o `4a89b5d`, ainda não publicado.** A integrate em 28/09 (`286cab2`) já está dentro da `develop` de agora: `develop` = `9914ee5` tem a mensagem `Merge branch 'feature/cinematch-web-interface' into develop`.

### 2.3 Working tree

**3 arquivos untracked, nenhum rastreado modificado.** `git status --short` devolve só as três linhas `?? assets/…` descritas na subseção 1.2. É o único ruído do repositório, e é intencional.

### 2.4 O remoto andou depois do último `fetch` — os refs de tracking estão defasados

Este é o achado de medição mais importante desta sessão, e ele **não** aparece em `git branch -vv`.

`git ls-remote --heads origin` conversa com o servidor **sem** precisar de `fetch`, e ele discorda de dois dos refs de tracking locais:

| Branch | ref local `origin/<branch>` | servidor (`git ls-remote --heads origin`) | Situação |
| --- | --- | --- | --- |
| `main` | `e47b81d` | `e47b81d` | igual |
| `feature/cinematch-web-interface` | `279d8e0` | `279d8e0` | igual |
| `develop` | `9914ee5` | **`ce13eaf1`** | **servidor à frente** |
| `feature/cinematch-web` | `de67ecf` | **`d77920c`** | **servidor à frente** |

Ou seja: a afirmação "as 4 branches estão em sincronia com o remoto" é verdadeira **contra o ref de tracking** e **falsa contra o servidor**, em duas branches. O `git fetch` desta sessão **não foi rodado** — foi uma decisão de escopo, para não tocar em refs locais num arquivo de snapshot. **Quanto o servidor está à frente é não verificado**: só um `git fetch` responderia, e ele não foi feito. É o problema 3 da seção 7.

> **Regra prática herdada da lição 4.3 e reconfirmada aqui:** antes de afirmar o estado de uma branch remota, compare `git rev-parse origin/<branch>` com `git ls-remote --heads origin`. Se divergirem, o servidor está à frente e o `origin/*` no disco é lixo de quando o `fetch` rodou. A lição 4.3 dizia "rode `git fetch`"; a variante **sem escrita** é comparar com o `ls-remote`, que não altera ref nenhum e por isso é seguro dentro de uma sessão de snapshot.

### 2.5 O que **não** foi feito nesta sessão

Explicitamente, para que a próxima sessão não assuma o contrário:

- **Nenhum `git fetch`** (e ver 2.4 — por isso há um problema aberto).
- **Nenhum `git push`**, nem de `4a89b5d`, nem de outra coisa.
- **Nenhum `git add`, `git commit`, `git merge` ou criação de branch** por este agente — o commit é de outro agente.
- **Nenhum `npm install` novo** e **nenhum `live-server` subido**.
- **Nenhum navegador aberto.**

---

## 3. O que foi feito nesta sessão

### 3.1 Um subagente cancelado deixou um `npm install` rodado até o fim

O briefing passado ao subagente dizia que `node_modules` **não existia** — e dizia com razão, porque a medição de pouco antes confirmava. O subagente executou o `npm install` e, em seguida, **foi cancelado**. A instalação, porém, **continuou no disco** e terminou sozinha: `node_modules` tem CreationTime **29/09/2026 14:58:36** e está completo, com `live-server` 1.2.2 e o executável em `.bin`.

Consequência prática: a **task seguinte foi escrita com a instrução de que `node_modules` não existia**, e o subagente que a executou conseguiu **corrigir a premissa errada sozinho**, medindo o disco e ajustando a nota de progresso da `M1-T18` no quadro. Isso salvou a task, mas só porque o subagente **mediu em vez de confiar no briefing**. A lição está na subseção 4.6.

### 3.2 O quadro foi sincronizado com o código — commit `4a89b5d`

O único arquivo versionado na sessão. O que mudou em `docs/KANBAN.md`:

| Mudança | Detalhe |
| --- | --- |
| `M1-T05` voltou de *Em Andamento* para *A Fazer* | estava com timestamp desde 26/09 mas com **implementação zero**; o bloco de proveniência foi removido, porque task em *A Fazer* não o leva. Derrubou o WIP de 3 para 2 |
| 8 tasks ganharam nota `*Progresso:*` com referência de linha | `M1-T02`, `M1-T04`, `M1-T05`, `M1-T12`, `M1-T16`, `M1-T17`, `M1-T18`, `M1-T21` |
| 2 tasks ganharam nota `*Bloqueio:*`, que faltava | `M1-T18` e `M1-T21` |
| Rastreabilidade | RF02 passou a `Em Andamento / A Fazer`; Critério 4 passou a `A Fazer` — as duas tasks de cada um caíram na mesma coluna |
| Riscos | risco 10 revisado; **risco 11 criado** para a `M1-T12` atrasada em relação ao próprio código |

**Nenhuma task foi movida para *Concluído*.** A regra do `AGENTS.md` §5 só deixa uma task sair de *A Fazer* quando o código funciona **e** foi testado, e nada foi testado em navegador. É por isso que o quadro segue com 2 tasks em *Concluído* e 2 em *Em Andamento*.

Uma divergência menor que vale registrar: a nota de progresso da `M1-T21` diz "**26 commits** no `HEAD`". Era verdade quando a nota foi escrita; depois do próprio commit `4a89b5d` o número virou **27**. O número na nota é um instantâneo, não uma constante — meça antes de citar.

### 3.3 Nenhuma linha de código mudou

Evidência, não impressão: `git status --short` não lista nenhum arquivo rastreado modificado, e `docs/KANBAN.md` é o único arquivo do commit `4a89b5d`. Contagens de linha de `index.html` (210), `css/style.css` (458), `js/script.js` (25), `js/ui.js` (13), `js/modelo.js` (13) e `package.json` (13) são **as mesmas de 28/09**, medidas por `[System.IO.File]::ReadAllLines(...)`. O `package-lock.json` também está com o conteúdo inalterado — o `npm install` não sujou o repositório.

### 3.4 O code-review pegou um número escrito sem comando

O quadro recebeu "**148 pacotes**" em uma nota, e **nenhuma medida defensável dava 148**: são 146 de primeiro nível, 191 com aninhados, 150 no lock. O code-review pegou antes do commit, e o número foi removido. A lição está na subseção 4.7.

---

## 4. A lição mais importante

As subseções 4.1 a 4.5 são a **memória de pesquisa** deste arquivo e foram verificadas de novo nesta sessão: todas as afirmações continuam verdadeiras. As subseções 4.6 e 4.7 são novas.

### 4.1 Dois agentes anteriores afirmaram fatos errados

Um agente anterior **afirmou dois fatos errados** numa seção que existe justamente para não afirmar fatos errados:

1. Escreveu que `??` não aparecia em nenhum dos dois repositórios das aulas. **Aparece** — em `cinematch_antigo/cinematch.js:211`, no cálculo do próximo id. Ele não foi ensinado, mas existe. **Reverificado hoje:** o arquivo tem 533 linhas e exatamente 1 ocorrência, na linha 211.
2. Escreveu que os `.js` de `semana-12/modulos/` ainda estavam em CommonJS. **Já são ESM**: `index.js` faz `import`, `slug.js` faz `export`, e o `package.json` já tem `"type": "module"`. O professor corrigiu o exercício no commit `a413b0c`, de 18/09/2026.

Nos dois casos o agente **tinha a evidência na tela e escreveu o contrário**. Ambos foram encontrados pelo code review, um por um.

### 4.2 A regra que decorre

**Assertar de memória é o modo de falha mais provável neste projeto.** Toda afirmação factual nova precisa ser conferida contra o arquivo antes de virar texto de documentação. Se você não abriu o arquivo, você não sabe — escreva "não verificado" em vez de arriscar. A versão 27/09 deste arquivo existia justamente para carregar esse histórico, e por isso ele foi preservado em vez de reescrito do zero.

**A forma que o mesmo erro assume quando o fato é um número.** Um número sem o comando que o produziu é um número inventado, por mais plausível que pareça — "148 pacotes instalados" é exatamente o tipo de valor que a memória produz e a medição não confirma. E o multiplicador de contagem **varia conforme a métrica escolhida**: pacotes de primeiro nível, pacotes com aninhados e entradas do lock são três números diferentes para o mesmo `node_modules`. **Escreva qual métrica você usou**, junto com o comando. Um número acompanhado do método que o produziu é um fato; um número sozinho é um palpite bem vestido.

### 4.3 A ocorrência de 28/09, do mesmo tipo

Um agente **afirmou que a `develop` não tinha nada exclusivo em relação à branch de interface, e que a integração seria um fast-forward. Estava errado.** A razão foi específica e generalizável: o `origin/develop` **local estava desatualizado**, porque o clone não tinha feito `fetch`. O `fetch` da sessão seguinte revelou que a `develop` tinha andado. A correção não veio de raciocínio, veio de `git fetch`.

> **Regra: antes de afirmar qualquer coisa sobre o estado de uma branch remota, compare `git rev-parse origin/<branch>` com `git ls-remote --heads origin` — ou rode `git fetch` e releia o ref. Um `origin/*` no disco é uma cópia de quando o `fetch` rodou, não o estado do servidor.** Esta sessão remedeu o achado pelo caminho sem escrita: o `ls-remote` mostrou `develop` em `ce13eaf1` no servidor contra `9914ee5` no disco.

O mesmo agente chegou a dizer, mais tarde, que uma branch local "já existia" quando outra medição recente mostrava que não existia, e que um `git merge` tinha retornado `Already up to date` apesar de ele estar na branch errada. **O estado final estava correto, mas a narrativa do agente não batia com a sequência.**

> **Regra: não confie na narração de um subagente sobre o que ele fez — verifique o estado final com o comando de leitura, você mesmo.**

Foi o que salvou a operação aqui: `git rev-parse` das árvores e `git branch -a -vv` confirmaram o resultado independentemente do que o agente dizia. São comandos de leitura, não de escrita, e podem ser repetidos sem risco.

### 4.4 A ocorrência de 28/09, do mesmo tipo: a estratégia de merge

O orquestrador **previu que o merge da interface na `develop` seria um fast-forward. Estava errado.** A causa foi a mesma da 4.3: tratou *"a `develop` é ancestral da branch de feature"* como se valesse sempre. Não vale.

O que aconteceu, medido: `167aa01` era o **segundo pai** do merge `91ed3a7` — a `develop` **já tinha integrado** a branch de interface no ciclo anterior. Então estava **7 commits à frente** da interface, não atrás, e o ponto de divergência era o próprio `167aa01`. Com as branches divergidas, fast-forward era impossível. Saiu merge commit `286cab2`, sem conflito.

> **Regra: antes de escolher a estratégia de merge, confira a topologia, não a posição aparente das branches.** Os dois comandos são `git show --no-patch --format='%P' develop` (quem são os pais do merge anterior) e `git merge-base <a> <b>` (onde as branches se separaram). Quem prevê a estratégia pela posição aparente erra; quem olha a topologia acerta.

**O comportamento do subagente de Git foi o correto.** Ele **parou e reportou a premissa errada** em vez de executar o merge sob uma estratégia que sabia incompatível com a topologia. E, antes de commitar, fez um **teste round-trip de acentuação** — gravar e reler a mensagem de commit e comparar os bytes — porque o `--amend` estava proibido e uma mensagem corrompida seria **irreversível**. Vale registrar o cuidado: é o `--amend` proibido que transforma a checagem em obrigatória, e a checagem é o que torna a correção possível sem reescrever histórico. Essa checagem voltou a ser necessária em 29/09 — ver o gotcha da codepage na seção 9.

### 4.5 Um erro de processo da sessão de 27/09

O mesmo agente da seção 4.1 rodou `git restore docs/KANBAN.md` ao achar que um subagente tinha escrito fora do escopo — e as edições eram do usuário, feitas em paralelo. Não houve perda (o usuário reaplicou), mas a decisão foi tomar **ação destrutiva sobre trabalho do usuário sem perguntar**.

Daí decorre a regra de orquestração deste projeto: **delegar implementação ao `dev` e revisão ao `code-review` antes de seguir**; nunca editar arquivo do projeto diretamente; **nunca reverter alteração do usuário sem antes perguntar**.

### 4.6 Um subagente cancelado deixa efeito no disco, e a task seguinte herda a premissa velha

O briefing da `M1-T18` dizia que `node_modules` não existia. **A premissa estava certa quando foi escrita** — foi medida pouco antes — e **ficou errada antes de a task ser executada**, porque o subagente da task anterior tinha iniciado o `npm install` e então foi cancelado. A instalação continuou rodando sozinha e deixou 146 pacotes de primeiro nível em disco.

Duas lições, e a segunda é a que evita a próxima:

> **Regra 1: um subagente cancelado pode ter dejado efeito de filesystem.** Cancelar o agente não desfaz o processo que ele disparou. Antes de tratar qualquer premissa de briefing como atual, meça o disco de novo.

> **Regra 2: a task seguinte precisa reter o estado remede-o, não confiar no briefing anterior.** O briefing descreve o momento em que foi escrito, e o disco muda entre a escrita e a execução. Quem redige a task tem que reescrever no próprio texto o que é **verificável agora** — "o `node_modules` pode ou não existir: meça com `Test-Path` antes de agir" — em vez de afirmar o que era verdade na hora da redação.

O que salvou a execução foi o comportamento do subagente: ele **mediu, encontrou a premissa falsa e corrigiu a nota do quadro por conta própria**, em vez de tentar satisfazer um briefing impossível. Isso é o comportamento certo e vale como exemplo — é a mesma lição 4.3, aplicada a um efeito de disco em vez de um ref de branch.

### 4.7 Número escrito sem comando: a mesma lição da 4.2, aplicada ao quadro

O quadro ganhou "**148 pacotes**" numa nota de progresso. **Nenhuma medição defensável produz 148.** As três que existem hoje, todas reproduzíveis:

| Métrica | Comando | Resultado |
| --- | --- | --- |
| Pacotes de primeiro nível (sem `.bin`) | `Get-ChildItem node_modules -Directory -Force \| Where-Object Name -ne '.bin'` | **146** |
| Pacotes com os aninhados | idem, `-Recurse`, filtrando os que têm `package.json` | **191** (45 aninhados) |
| Entradas de primeiro nível no lock | `Select-String package-lock.json -Pattern '^\s{4}"node_modules/[^/]+"'` | **150** |

O 148 não é aproximação de nenhum deles. **A lição já está escrita na 4.2 e vale reforçada com o caso concreto:** em documentação — e o quadro é documentação — um número sem o comando que o produziu é um número inventado, e o multiplicador de contagem varia conforme a métrica escolhida. **Escreva qual métrica**, ou não escreva o número. Quem pegou foi o code-review; quem não pegasse publicaria um dado falso no entregável avaliado.

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
| `??` aparece 1×, e não foi ensinado | `cinematch_antigo/cinematch.js:211` (arquivo com 533 linhas, 1 ocorrência) |
| `semana-12/modulos/` já é ESM | `index.js` faz `import`, `slug.js` faz `export`, `package.json` com `"type": "module"`; commit `a413b0c`, 18/09/2026 — confirmado pelo `AGENTS.md` §2.1 |
| `normalizarTexto()` | `cinematch_antigo/cinematch.js:284`, **não** em `catalogo.js` |
| Globais implícitos quebram em módulo ES | `cinematch_antigo/cinematch.js` linhas 31 (`opcao = prompt(...)`), 171 (`for (i = 0; i < catalogo.length; i++)`) e 330 (`for (i = 0; i < resultado.length; i++)`) |
| O curso já proíbe a regra de especificidade de última instância, então isso aqui não é divergência entre o que se ensinou e o que se pode entregar | a única ocorrência no material das aulas é um comentário em `semana-10/exercicio-especificidade/style.css:116` |
| `semana-11/ceu-aberto/script.js` não tem `try/catch` | 69 linhas, zero `try`/`catch` |
| `og:` e `meta description` só no `ceu-aberto` | os `index.html` das semanas 09 e 10 têm `lang`, `<title>` e landmarks, mas zero `og`/`description` |
| Briefing não menciona LF/CRLF, encoding nem `.gitattributes` | varredura das 16 páginas, zero ocorrências |
| Escopo real do versionamento (5.6) | branches mínimas, mínimo 5 commits individual / 8 squad, prefixos exemplificados (`feat:`, `style:`, `docs:`), fluxo até a `main` |
| **A seção 3 do briefing tem só DOIS estados e nenhum login** | `docs/BRIEFING.md:81` — *"o formulário de perfil e os resultados com os cards de recomendação"*. `Select-String -Pattern login` no `BRIEFING.md` devolve **0** ocorrências. É o que autoriza tratar a tela de login como bônus fora do escopo |
| **A ponta remota da branch de bootstrap já não existia** | `acd92b5` (26/09/2026 12:15:49) é o `Merge pull request #1 from tiagoeduardobr/feature/cinematch-web-bootstrap`, com pais `e47b81d` e `ac072eb` |
| **`core.autocrlf = true` nesta máquina** | `git config --get core.autocrlf` = `true` |
| **Identidade do Git já configurada** | `git config --get user.name` = `lucas`; `user.email` = `lucasgd123@gmail.com`. Não rode `git config` |
| **Não existe configuração de lint de Markdown** | `git ls-files` filtrado por `markdownlint\|editorconfig\|eslint\|prettier` devolve **nada**. Não há `.markdownlint.json`, nem `.editorconfig`, nem `.eslintrc` |
| **`docs/KANBAN.md` está com LF puro** | varredura byte a byte: **0** bytes CR em 34.525 bytes, 215 linhas |
| **A grade de cards já existe no CSS** | `css/style.css`: `.resultados` nas linhas 393 e 450, `.card-serie` nas linhas 401 e 455, `flex-wrap: wrap` nas linhas 209, 220, 365, 432 e 452, `@media (max-width: 768px)` na 204 e `@media (min-width: 769px)` na 418 |
| **Os botões da tela** | `index.html:188` é o `<button type="submit">Ver recomendações</button>`; `122` e `123` são `<button type="button">Entrar</button>` e `<button type="button">Criar conta</button>`; `62`, `68` e `73` são os três botões da navbar, todos `type="button"` com `aria-label` |
| **O `index.html` já carrega os módulos ES** | `index.html:208` — `<script type="module" src="./js/script.js"></script>` |
| **`node_modules` é ignorado pelo Git** | `.gitignore` lista `node_modules/`; `git status` não o mostra entre os untracked |
| **A `main` é ancestral da `develop`, e isso é o comportamento correto** | `git rev-list --count develop..main` = **0**; `main..develop` = **36**. O `AGENTS.md` §6 proíbe merge na `main` antes do fim do projeto |
| **A branch de lógica é ancestral da `develop`** | `git rev-list --count develop..feature/cinematch-web` = **0**; `feature/cinematch-web..develop` = **12**; `git merge-base --is-ancestor` sai com código 0 |
| **A mensagem do commit `4a89b5d` está íntegra em UTF-8** | `git log -1 --format=%B 4a89b5d` gravado direto em arquivo: **1.039 bytes, sem BOM, UTF-8 estrito válido, 0 caractere de substituição**, e `$txt.Contains("código")` = `True` no primeiro byte do arquivo. O console mostra mojibake; o arquivo está certo — ver o gotcha da seção 9 |
| **A mensagem do commit `279d8e0` continua sendo a ponta remota da interface** | `git ls-remote --heads origin` devolve `279d8e0` para `refs/heads/feature/cinematch-web-interface`, igual ao ref de tracking local |

---

## 7. Problemas abertos

### 7.1 O botão de submit do perfil hoje recarrega a página

**Era o problema 2 de 28/09 e piorou em termos de rastreio.** Nada chama `preventDefault()`: `Select-String -SimpleMatch preventDefault` nos três módulos devolve **0**. Clicar em "Ver recomendações" (`index.html:188`) faz um GET nativo e joga o perfil na query string.

A mudança: a `M1-T05` **voltou para *A Fazer*** no commit `4a89b5d`, com implementação zero — `js/script.js` tem 25 linhas e só tem os dois `import` (16-17) e um `console.log` (22-24), sem `addEventListener`, sem `preventDefault` e sem o objeto `usuario`. **Ninguém está trabalhando nela agora**, e a dependência declarada continua registrada como `*Bloqueio:*` na própria linha do quadro, junto com o risco 10 revisado. O risco se mantém integralmente.

### 7.2 Risco latente na tela de login: e-mail e senha na query string

Inerte, e continua válido. Se o bônus virar `type="submit"` sem `preventDefault()`, o GET padrão manda **e-mail e senha para a query string** e para o histórico do navegador — CWE-598, owasp A02. Hoje é inerte, porque os dois botões são `type="button"` (`index.html:122` e `123`). Quem algum dia implementar esse bônus tem que colocar o `preventDefault()` **antes** de mexer no `type`.

### 7.3 Os refs de tracking estão defasados: o servidor andou em 2 das 4 branches

**Novo nesta sessão.** `git ls-remote --heads origin` mostra `develop` em `ce13eaf1` e `feature/cinematch-web` em `d77920c` no servidor, contra `9914ee5` e `de67ecf` nos refs locais. O `git fetch` não foi rodado, por decisão de escopo.

**Não verificado, e por quê:** quanto o servidor está à frente. Só um `git fetch` — que altera refs locais e estava fora do escopo desta sessão — responderia. **Não rode `git push` para "resolver":** commitar e publicar com base num `origin/*` velho é exatamente o risco que a lição 4.3 descreve, e o `AGENTS.md` §6 proíbe push sem pedido explícito do usuário. **Antes de qualquer push, `git fetch` e releia os refs.**

### 7.4 Não houve verificação em navegador — parcialmente resolvido

**Era o problema 4 de 28/09.** A instalação deixou de ser o bloqueio: `node_modules` existe, com 146 pacotes de primeiro nível, `live-server` 1.2.2 e o executável em `.bin` (medições na subseção 1.1). A **validação continua pendente**: ninguém subiu o `live-server`, ninguém conferiu se os três `.js` voltam como `text/javascript`, e **a página nunca foi aberta no navegador** — nem nesta sessão, nem na anterior. Nenhuma afirmação de comportamento neste arquivo pode ser tratada como testada.

A cascata dos três botões da navbar, do botão de submit e dos dois botões de login segue resolvida por **análise estática**, não por execução. A confirmação mais barata que existe é rodar `npm start`, abrir a página e olhar os três botões — e o `AGENTS.md` §7 proíbe abrir via `file://`, porque os módulos ES morrem de CORS.

### 7.5 Lacuna do `.gitattributes` com `*.json`

Continua válido, e continua sendo **decisão do usuário, não tomada**. A regra cobre `md`, `js`, `css`, `html` e `bat`, mas **não** `*.json`. Com `core.autocrlf=true`, o `cspell.json` está em disco em CRLF. Não quebra nada — o índice grava LF e o status fica limpo. É cosmético. **Não "resolva" por conta própria:** acrescentar `*.json` ao `.gitattributes` mexe em todos os `.json` do repositório, e essa é uma escolha do usuário.

### 7.6 Duas imagens do briefing não são verificáveis por texto

Continua válido. O wireframe (Seção 3) e a **estrutura de pastas** (Seção 5.2) são figuras no PDF. A Seção 3 do `AGENTS.md`, que descreve `js/`, `css/`, `assets/` e `index.html` na raiz, é **derivada, não comprovada** pela transcrição. Alguém precisa abrir a página da Seção 5.2 no PDF e conferir com os olhos antes de apresentar isso como exigência do professor no vídeo.

### 7.7 A lógica da semana 6 ainda não foi portada — é o próximo trabalho de verdade

**Continua válido e continua sendo a lacuna central do projeto.** `js/modelo.js` (13 linhas), `js/script.js` (25 linhas) e `js/ui.js` (13 linhas) são placeholders: `PLACEHOLDER_UI` e `PLACEHOLDER_MODELO`, ambos com `pronto: false`. **Não existe nenhuma classe `Conteudo` ou `Serie`**, e nenhum método de array, nenhum `fetch`, nenhum `setTimeout`, nenhum `localStorage` em código.

**Oito RFs dependem disso e estão zerados:** RF04 a RF08 e RF10 a RF12, na cadeia de **nove tasks** `M1-T07` a `M1-T15`. Enquanto os três módulos não tiverem conteúdo, **a `M1-T17` não fecha, a `M1-T18` não valida, a `M1-T19` não testa, a `M1-T20` não escreve o README, e o vídeo da `M1-T22` não tem o que mostrar**. É a dependência de maior profundidade da cadeia inteira.

### 7.8 Tamanho do squad — a pergunta continua aberta, o WIP não

**Metade deste item foi resolvida nesta sessão, metade continua aberta.** O que **mudou:** o WIP saiu do teto. Com a `M1-T05` de volta para *A Fazer*, a coluna *Em Andamento* tem **2** tasks (`M1-T03` e `M1-T04`) em vez de 3 — dentro do limite de 3 do squad de 2 e acima do limite de 1 do trabalho solo. A pergunta de WIP está resolvida.

O que **continua aberto:** o `docs/KANBAN.md` marca `M1-T03` e `M1-T04` como "por Lucas" e a `M1-T05` como "por Tiago" — dois nomes distintos, o que indica squad de 2. **Falta confirmar com o usuário se o squad ainda tem 2 pessoas ativas.** Disso dependem duas coisas concretas: o **limite de WIP** (1 no solo, 3 no squad) e a **meta de commits** (**5** no individual, **8** no squad). Não assuma nenhuma das duas.

### Resolvidos nesta sessão

| Item | Destino |
| --- | --- |
| **Problema 1 de 28/09 — a `M1-T12` adiantada no quadro.** A grade de cards já existe no CSS, mas a task em *A Fazer* ainda descrevia `flex-wrap` como trabalho dela | **Resolvido como problema deste arquivo.** Virou o **risco 11** do `docs/KANBAN.md`, que registra o bloqueio (sem o `<article>` da `M1-T11` não existe elemento para a regra estilizar) e a mitigação (fechar a `M1-T11` primeiro, depois conferir os dois breakpoints pelo `live-server`). A `M1-T12` também ganhou nota `*Progresso:*` e `*Bloqueio:*` no quadro |
| **Problema 8 de 28/09 (parte do WIP) — WIP no teto com 3 tasks em *Em Andamento*** | **Resolvido.** WIP caiu para 2. A parte sobre o tamanho do squad reabriu como item 7.8 acima |
| **`node_modules` inexistente** | **Resolvido.** `npm install` rodou em 29/09/2026 14:58:36, 146 pacotes de primeiro nível, `live-server` 1.2.2. A validação do servidor virou o item 7.4 |

---

## 8. Estado das tasks

Conferido no `docs/KANBAN.md` em 29/09/2026, **por coluna**, e não por checkbox — ver a ressalva logo abaixo.

| Coluna | Tasks | Quantidade |
| --- | --- | --- |
| Concluído | `M1-T00`, `M1-T01` | 2 |
| Em Andamento | `M1-T03`, `M1-T04` | 2 |
| A Fazer | `M1-T02`, e `M1-T05` a `M1-T23` | 20 |
| Backlog | 9 itens de bônus, sem ID — não contam nota | 9 |

Total: **24 tarefas** (`M1-T00` a `M1-T23`) + **9 itens de Backlog**. Bate com os metadados do próprio quadro, na linha 17. A soma 2 + 2 + 20 = 24 fecha.

### A contagem de checkbox ingênua dá dois números errados

`Select-String -Path docs\KANBAN.md -Pattern '\- \[x\]'` devolve **5**, e `-Pattern '\- \[ \]'` devolve **56**. **Os dois estão errados.** As ocorrências não são só de task:

- Das **5** ocorrências de `- [x]`, **2 estão na legenda** — linhas 33 e 43, que descrevem a notação em prosa. Das 3 restantes, 2 são tasks (`M1-T00`, na linha 126, e `M1-T01`, na linha 127) e **1 é o item do checklist** "Criei o quadro Kanban", na linha 211.
- Das **56** ocorrências de `- [ ]`, **2 também estão na legenda** — linhas 32 e 42, pela mesma razão. As 54 restantes são 20 de *A Fazer* + 2 de *Em Andamento* + 9 de *Backlog* + 23 do checklist.

Os números reais de checkbox são **`- [x]` = 3** e **`- [ ]` = 54**. A conta fecha: a contagem ingênua soma 61, a real soma 57, e a diferença são exatamente as **4** ocorrências de legenda que o `Select-String` não distingue de uma task. **Nunca conte checkbox com substituição ingenua neste quadro: conte por coluna.**

> **Este é exatamente o número que a versão de 28/09 já registrava** — o que confirma que **ele não tinha erro**. O que mudou entre 28/09 e 29/09 foi **só a distribuição entre colunas**: *A Fazer* foi de 19 para 20 (a `M1-T05` voltou), *Em Andamento* foi de 3 para 2. O total de 24 não se moveu.

O checklist final de entrega do `KANBAN.md` tem **24 itens, dos quais 23 estão pendentes** — só "Criei o quadro Kanban" está marcado. Os itens de entrega ainda zerados são os três mais pesados do projeto: **vídeo de até 7 minutos** (peso 1,50), **quadro Kanban publicado com link** e **os três links no AVA**.

**Nenhuma task foi movida para *Concluído* nesta sessão**, e a razão está registrada no commit `4a89b5d`: nada foi testado em navegador, e a regra do `AGENTS.md` §5 só deixa uma task sair de *A Fazer* quando o código funciona **e** foi testado.

---

## 9. Gotchas do ambiente Windows

- **O diretório temporário externo muda de máquina para máquina.** O valor literal é **`C:\Users\<usuário>\AppData\Local\Temp\opencode`**, e só existe uma cópia dele por usuário do Windows. **Confira, não copie do arquivo.** O `Test-Path` da sessão de 28/09, rodada na máquina do Lucas, deu `True` para `C:\Users\Lucas\AppData\Local\Temp\opencode` e `False` para o caminho do Tiago. **Motivo da divergência: o arquivo foi escrito na máquina do Tiago e aquela sessão rodou na do Lucas.** É o único lugar fora do repositório onde escrita é permitida.
- **`rg` (ripgrep) não está instalado nesta máquina.** `Get-Command rg` falha e devolve `$null` — a documentação e os prompts de outros agentes assumem que ele existe. Um comando de verificação escrito com `rg` falha com "comando não reconhecido", e o pior efeito é **indireto**: uma checagem de ausência que usa `rg` falha pelo motivo errado e escreve mal como **"FALHA: ainda existe"**, jogando o agente na direção oposta da verdadeira. Use a ferramenta de busca dedicada ou `Select-String`. Vale conferir a existência da ferramenta antes de confiar no resultado de um comando que depende dela.
- **O console do PowerShell está em codepage 850 e gera mojibake falso ao reler saída UTF-8 do git.** O número é medido: `[Console]::OutputEncoding.WebName` devolve `ibm850`, `CodePage` devolve `850`, e `chcp` confirma a página 850 ativa. São **dois** problemas distintos, e confundi-los custa tempo: um é a **escrita** do arquivo (o próximo gotcha), o outro é a **leitura** da saída. Este já produziu um resultado falso nesta sessão: `git log -1 --format=%B` pelo pipeline do PowerShell mostrou acentuação corrompida, e a leitura pelo console fez crer que a mensagem do commit `4a89b5d` estava estragada. **Estava certa.** A leitura confiável é gravar a saída do git **direto em arquivo via `cmd`** (`cmd /c "git ... > arquivo"`) e ler os bytes com .NET, conferindo `BOM`, validade de UTF-8 estrito, contagem de caractere de substituição e mojibake. Feito assim nesta sessão: **1.039 bytes, sem BOM, UTF-8 estrito válido, 0 caractere de substituição, e `.Contains("código")` = `True`** — o arquivo está correto e só a tela mente. Note que a corrupção é **intermitente**: a mesma mensagem passou limpa em uma leitura e suja em outra, o que é a assinatura de um problema de console e não de arquivo.
- **O console do PowerShell corrompe acentuação na escrita** — acentos e cedilhas aparecem como `?` ou como um caractere de substituição Unicode (`U+FFFD`) no terminal, mesmo que o arquivo esteja correto em UTF-8. **Nunca** "conserte" acentuação que só está errada na tela do terminal: isso corromperia o arquivo de verdade.
- **Python não está instalado nesta máquina.** `python` e `python3` resolvem só para o stub da Microsoft Store em `C:\Users\Lucas\AppData\Local\Microsoft\WindowsApps\`, e `python --version` falha com a mensagem de "instalar da Microsoft Store". `py` não existe. Então a receita do `AGENTS.md` de extrair texto de PDF com `pypdf` **não é utilizável aqui** — a versão 6.15.0 que o `AGENTS.md` cita **não foi verificada nesta máquina** e provavelmente pertence à máquina do Tiago. O `node` existe e é a **v26.7.0** nesta máquina. Quem precisar ler o PDF, use a transcrição em `docs/BRIEFING.md` ou instale o Python.
- **`Measure-Object -Line` conta só linhas não-vazias.** Use `[System.IO.File]::ReadAllLines(<arquivo>); $a.Count` para a contagem real. Já causou um falso alarme numa sessão anterior: um arquivo com 186 linhas reportou 160.
- **Comandos negados por permissão:** `python -c`, `node -e`, `sed`, `awk`, `tee`, `cat >`, `Set-Content`, `Out-File`. Grave um script em arquivo e execute. Atenção: nesta máquina o `python -c` nem chega à negativa do ambiente, porque o Python não existe (veja acima). **`rg` também entra nesta lista por ausência**, não por negativa.
- **`core.autocrlf=true` nesta máquina.** É a causa do comportamento de CRLF no `*.json` descrito no problema 7.5. Não remova as regras do `.gitattributes`: sem as de LF o Windows converte tudo e o `docs/KANBAN.md` aparece sujo em todo diff.
- **`Select-String` sem `-SimpleMatch` trata o padrão como regex**, e um parêntese não escapado — `fetch(`, `.map(` — faz o comando inteiro falhar com "expressão regular não válida". Pior: a variável de resultado **fica com o valor da iteração anterior**, e o número impresso em seguida é o do item anterior, não o do atual. **Use `-SimpleMatch` para padrão literal e uma variável nova por padrão.**
- `cspell.json` é configuração do Code Spell Checker, não faz parte da aplicação. Não entra em nenhum RF.
- **O modelo não lê PDF.** Para extrair, use `pypdf` a partir de um script gravado — viável apenas onde o Python exista.

---

## 10. Próximos passos sugeridos

1. **Portar a lógica da semana 6 para módulos ES. Este é o próximo trabalho de verdade** (problema 7.7), e é a dependência de maior profundidade da cadeia: **oito RFs e nove tasks** estão bloqueados atrás dele. As classes `Conteudo` e `Serie extends Conteudo` em `js/modelo.js`, e a compatibilidade com `compatibilidade()` e `obterConteudosPorGenero()` em `js/script.js`. **Porte a lógica, não o estilo**: o `cinematch.js` é código de terminal e usa globais sem declarar (linhas 31, 171 e 330), que quebram com `ReferenceError` em módulo ES. Declare com `let` ou `const` ao portar.
2. **Subir o `live-server` e abrir a página no navegador** (problema 7.4). O `npm install` já está feito, então o passo é curto e é a única forma de sair da análise estática: `npm start`, abrir a página, olhar os três botões da navbar, o botão de submit e os dois botões de login, e conferir na aba Network que os três `.js` voltam como `text/javascript`. **Não abra via `file://`.** Enquanto isso não acontecer, nenhuma task pode sair de *A Fazer* pela regra do `AGENTS.md` §5.
3. **Retomar a `M1-T05` junto com a `M1-T03`**, como bloco acoplado, e só depois da validação do passo 2. A task está em *A Fazer* com implementação zero e com a dependência declarada registrada; o risco 10 do quadro descreve exatamente por que a captura do `submit` não pode ser aberta antes de o formulário existir e passar no teste integrado.
4. **Fechar o `M1-T02` e o `M1-T16`, que destravam três tasks.** O `index.html` tem hoje só `charset`, `viewport` e `<title>`. Faltam a `meta description`, as og tags e o skip link. A `M1-T12` está no risco 11: o CSS da grade já existe, então confirme o que ainda falta antes de marcar.
5. **Rodar `git fetch` antes de qualquer push**, e comparar `git rev-parse origin/<branch>` com `git ls-remote --heads origin` (problema 7.3). O commit `4a89b5d` está **1 à frente e não foi pushado**, e duas branches do servidor já divergiram dos refs locais. **Push é decisão do usuário**: nunca faça push sem pedido explícito, e nunca force push neste repositório, nem com `--force` nem com `--force-with-lease`.
6. **Confirmar o tamanho do squad** — se ainda são 2 pessoas ativas (problema 7.8). Disso dependem o limite de WIP e a meta de commits: **5 no individual, 8 no squad**.
7. **Abrir a Seção 5.2 do PDF** e conferir a estrutura de pastas com os olhos, antes de apresentá-la como exigência do professor.
8. **Decidir o `.gitattributes` para `*.json`** — decisão do usuário, ainda não tomada (problema 7.5).
