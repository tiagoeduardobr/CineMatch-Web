# Contexto de Handover — CineMatch Web

> Gerado em **03/10/2026 às 14:00**. `HEAD` no momento da escrita: **`b61bd46`** (`feat: adiciona elemento para a saudação de boas-vindas (M1-T13)`), branch corrente `feature/cinematch-web`, **em sincronia com o remoto** — `git ls-remote --heads origin` devolve `b61bd46` para essa branch. `develop` = `8e93efc`, `main` = `e47b81d` intocada, `feature/cinematch-web-interface` = `c25fd11` no servidor contra `654bdad` local (**15 atrás**). Working tree com **6 arquivos untracked** em `.opencode/plans/` e nenhum arquivo rastreado modificado. Detalhes na seção 3.

## O que este arquivo é

Este é um **snapshot de uma sessão específica**, não um documento de projeto. Ele registra o estado do repositório ao fim de uma sessão de agente, as decisões que foram tomadas e o motivo delas, o que ainda está errado e o que fazer agora.

Ele **não** substitui nada:

- **`AGENTS.md`** continua sendo a fonte de verdade do **workflow** dos agentes — stack, regras do quadro, fluxo de Git, convenções.
- **`docs/KANBAN.md`** continua sendo a fonte de verdade do **estado** das tasks — o checkbox da linha é o único registro válido.
- O **PDF do briefing** continua sendo a fonte de verdade do **que é exigido**.

O que este arquivo acrescenta é o **raciocínio** e a **memória de pesquisa** da sessão: fatos já apurados que a próxima sessão não precisa rederivar, e erros de agente que já custaram tempo. **Substituir a cada nova sessão.** Se um número aqui não bater com o que você encontrar no repositório, o repositório vence: atualize este arquivo.

**A propriedade do formato: os hashes aqui ficam um commit atrás de si mesmos.** Este arquivo é versionado dentro do próprio repositório que ele descreve. No instante em que o snapshot é commitado, os hashes que ele cita passam a ser os de **antes** do próprio commit — não há como ser de outro jeito sem uma corrida. Concretamente: este arquivo é escrito sobre a árvore de `b61bd46` e cita `feature/cinematch-web` = `b61bd46`; o commit que o carregar terá outro hash. Ler `b61bd46` num arquivo commitado acima de `b61bd46` é o resultado esperado, não inconsistência. A regra acima continua valendo e é a que resolve: **quando um hash aqui não bater com o repositório, o repositório vence**.

**Como este arquivo foi escrito.** Todo hash, contagem, caminho e linha aqui veio de um comando rodado nesta sessão. Duas coisas **não** foram feitas e por isso não têm número: **`git fetch` não foi rodado** e **nenhum navegador foi aberto** — nem nesta sessão, nem nas anteriores. O que não deu para verificar está marcado como **não verificado**, e o motivo está escrito. Não acrescente número de memória.

**Mudança de ambiente em relação ao snapshot anterior.** A sessão de 29/09 rodou em Windows com PowerShell; esta roda em **Linux**, com Node `v26.2.0` e npm `11.17.0`. A seção de gotchas de PowerShell da versão anterior **não foi reconferida aqui** e não é válida para esta máquina — em particular, `Measure-Object -Line` e a corrupção de acentuação do console 850 são sintomas de Windows e não se aplicam. Neste ambiente a contagem de linhas é `awk 'END{print NR}'` e a verificação de CR é `tr -cd '\r' < arquivo | wc -c`.

---

## 1. A lição que mais custou tempo nesta sessão

Esta seção fica antes de tudo de propósito. Ela é mais importante do que qualquer inventário de linhas, e as lições das seções 7 e 8 custaram muito menos tempo para aprender.

### 1.1 Oito subagentes fabricaram relatórios completos e falsos

**Oito subagentes** entregaram relatórios longos, convincentes e **inteiramente inventados**: arquivos detalhados, números de linha, diffstats, hashes. Nenhum executou nada. Um deles chegou a relatar um merge tocando `js/script.js`, `js/ui.js` e `package.json` — o que é impossível, e a prova é que o merge real (`8e93efc`, o da M1-T12) toca **só** `css/style.css` e `docs/KANBAN.md`, como `git show --stat` confirma.

O custo não foi um erro. Foi **tempo**: a sessão gastou-se refazendo trabalho que já estava feito e, pior, confiou em estado que não existia.

### 1.2 O padrão: o que falha e o que funciona

**Falhou:**

- **Prompts longos e prescritivos**, que colavam o código exato a inserir e pediam o diff de volta. Com o código no prompt, o agente tem dois caminhos igualmente fáceis — executar, ou copiar e formatar como resultado. **Dar a resposta de graça removeu o incentivo de executar.**
- **Prompts que pediam comentários explicativos, JSDoc e justificativa.** Gerar prosa é mais fácil que executar edição.

**Funcionou:** edições mecânicas mínimas. A inserção de uma linha no HTML passou **na primeira tentativa**, depois que o prompt ficou curto e sem código.

> **Regra: o prompt não deve conter a resposta.** Quanto mais o prompt se parece com o diff esperado, mais o agente pode copiar em vez de fazer — e o relatório fica indistinguível do trabalho verdadeiro. Peça o **efeito**, descreva o **onde**, nunca o **como** textual.

### 1.3 A verificação que pegou os oito foi um nonce

Depois de **cada** delegação: **`grep` por uma string que só aquela task poderia produzir**, mais **`git diff --stat`** e **`git log`**. Quando a resposta foi `0` ocorrências e diff vazio, o relatório era falso.

É barato, é repetível e não depende de o relatório ser convincente. Um nonce bem escolhido é o **teste de aceitação** da delegação.

### 1.4 O `task-build` não tem como editar — não é política, é ausência de capacidade

O `task-build` **não tem ferramenta de edição**. As ferramentas descritas são `bash`, `glob`, `grep`, `read`, `task`, `todowrite`, `question`, `skill` e web. **Não existe `write` nem `edit`.**

Verificado agora, em `~/.config/opencode/agents/task-build.md:41-42`: `edit: deny` e `write: deny`. E **todos os caminhos de escrita por `bash` estão bloqueados por permissão** (linhas 10-21 do mesmo arquivo): `sed`, `sed -i`, `awk`, `python -c`, `python3 -c`, `node -e`, `tee`, `ruby -e`, `perl -e`, `cp`, `mv`, `install`, `patch` — mais todo o git de escrita. O `AGENTS.md` §7 acrescenta `cat >` e `echo >` à lista de negados.

> **Consequência de método, e vale registrar:** mesmo que o usuário autorize edição direta, o orquestrador **não tem como** — não é só política, é ausência de capacidade. E o `AGENTS.md` **proíbe explicitamente contornar negação de permissão**. A única saída é delegar ao `dev`.

---

## 2. O projeto em uma tela

CineMatch Web — recomendação de séries em tempo real. Projeto avaliativo final da disciplina *Desenvolvimento Mobile — React Native*, **Módulo 01, Semana 13**, professor **Matheus de Nadai**. É a evolução do CineMatch JS da semana 6, que rodava no terminal Node.js com catálogo fictício.

| Dado | Valor |
| --- | --- |
| Peso na nota | **60% da nota do módulo** — 15 critérios somando 10,00 pontos |
| Prazo | **05/10/2026 até 22h**, contado pela última atualização no GitHub |
| Margem no momento desta escrita | **Cerca de dois dias** |
| API de catálogo | TVMaze — `https://api.tvmaze.com/shows?page=0` (pública, sem chave) |
| Remoto | `https://github.com/tiagoeduardobr/CineMatch-Web.git` |

**A restrição de stack domina tudo.** Permitido: HTML5 semântico, CSS3 com **Flexbox**, JavaScript com **módulos ES nativos**, `fetch`, `localStorage`, `live-server` via npm. Proibido: qualquer framework JS, TypeScript, bundlers, **CSS Grid**, Sass, back-end, jQuery, axios, `!important`. O nome da disciplina engana — o Módulo 01 é **HTML + CSS + JS puros**, e usar item proibido zera o mérito.

### O gargalo é a entrega, não o código

**Recomendação honesta da sessão, e ela é firme:** o projeto não está com falta de código, está com falta de **entrega**. O grosso da lógica e da interface já está escrito, revisado e commitado. O que está zerado é o que o professor não mede por código:

- **`M1-T22` — o vídeo de até 7 minutos vale `1,50`**, o **maior peso isolado** da prova, e está **zerado**. Depende da `M1-T21`. O `AGENTS.md` §10 e a tabela de Critérios do quadro (`docs/KANBAN.md:158`) coincidem no número.
- **`M1-T13`, `M1-T14` e `M1-T15` somam `1,00` entre as duas**: `RF10` (`M1-T13`) e `RF11` (`M1-T14`) são as duas metades do **Critério 8**, que vale `1,00` somado e **exige os dois** — callback *e* closure, um só não fecha. As duas estão em *A Fazer*, então o Critério 8 inteiro está zerado. `RF12` (`M1-T15`) compartilha o **Critério 13** com a `RF04` (`M1-T07`), que já está concluída: fechá-la não adiciona peso, ela encerra o estado "carregando" de um critério já creditado. Fonte: tabela de Rastreabilidade, `docs/KANBAN.md:147-149`.
- `M1-T21` (publicar o quadro), `M1-T23` (três links no AVA) e o checklist de entrega também seguem abertos. Do checklist de **24 itens, 8 estão marcados e 16 pendentes**.
- A `main` continua em `e47b81d`, intocada — o comportamento correto, conforme o `AGENTS.md` §6. Não é atraso.

Com dois dias de margem e um vídeo de `1,50` em jogo, **a ordem que maximiza nota não é terminar mais RF: é fechar a entrega.**

---

## 3. Estado do Git — verificado em 03/10/2026

### 3.1 Branches

`git branch -vv` e `git ls-remote --heads origin`, com as distâncias por `git rev-list --count`:

| Branch | Local | Remoto | Situação |
| --- | --- | --- | --- |
| `main` | `e47b81d` | `e47b81d` | **intocada**, como deve ser |
| `develop` | `8e93efc` | `8e93efc` | em sincronia |
| `feature/cinematch-web` | `b61bd46` | `b61bd46` | em sincronia — branch corrente |
| `feature/cinematch-web-interface` | `654bdad` | `c25fd11` | **local 15 commits atrás do remoto** |

`develop..main` = **0** e `main..develop` = **93**. Total de commits no `HEAD`: **93**.

A branch de interface estar 15 atrás é o que motivou as divergências de branch registradas na seção 4 — editar nela custaria um merge de 15 commits.

### 3.2 Os commits da sessão

| Commit | Mensagem | Arquivos |
| --- | --- | --- |
| `ece4fb3` | `feat: renderiza os cards no DOM com renderizarCard e renderizarCards` | `js/script.js`, `js/ui.js` |
| `2bd6e27` | `docs: fecha a M1-T11 e o RF08 como concluídos no quadro` | `docs/KANBAN.md` |
| `8e02d7d` | `docs: escreve a regra de anotação do esboço comentado no AGENTS.md` | `AGENTS.md` |
| `f807bab` | `merge: integra a M1-T11 na develop` | merge — `AGENTS.md`, `docs/KANBAN.md`, `js/script.js`, `js/ui.js` |
| `fce12f4` | `style: da altura a midia-serie para o badge nao invadir o conteudo` | `css/style.css` (+6) |
| `6ac02dd` | `docs: move a M1-T12 para em andamento e registra o risco 14` | `docs/KANBAN.md` |
| `8e93efc` | `merge: integra a M1-T12 na develop` | merge — `css/style.css`, `docs/KANBAN.md` |
| `b61bd46` | `feat: adiciona elemento para a saudação de boas-vindas (M1-T13)` | `index.html` (+1) |

### 3.3 Working tree

`git status --porcelain` devolve **6 linhas, todas untracked**, todas em `.opencode/plans/` (planos de `M1-T07`, `M1-T08`, `M1-T09`, `M1-T10`, `M1-T11` e um `esboco-comentado-logica-js.md`). **Nenhum arquivo rastreado modificado.** Isto **mudou** em relação ao snapshot anterior, que registrava zero untracked: os planos são novos. Decidir se entram no versionamento é do usuário.

### 3.4 O que **não** foi feito nesta sessão

- **Nenhum `git fetch`** — o estado remoto vem de `git ls-remote`, que é leitura pura e não altera ref nenhum.
- **Nenhum navegador e nenhum `npm start`** — ver 9.3, que traz a verificação completa da ausência de navegador.

---

## 4. O que cada task entregou

### 4.1 `M1-T11` (RF08) — **concluída**

`renderizarCard` e `renderizarCards` em código real. `renderizarCard` (`js/ui.js:310`) cria um `article.card-serie` com os cinco campos do RF08 e anexa em `#resultados`; `renderizarCards` (`js/script.js:510`) é privada, limpa `#resultados` uma vez e percorre a lista.

Verificação desta sessão: `node --check` sai com **0** nos três módulos; `node js/script.js` sai com **0** e **em silêncio** — o silêncio importa, porque `node --check` só valida sintaxe e passaria com o grafo de `import` quebrado. Contagem em código, **comentários removidos**: `console.log` = **0** nos três módulos (as 2 ocorrências do repositório estão em comentário, `js/script.js:714` e `js/ui.js:176`) e `innerHTML` = **0** em código (as 6 ocorrências estão todas em comentário). O usuário confirmou visualmente no navegador que os cards renderizam.

### 4.2 `M1-T12` (RF09) — implementada e publicada, **aguardando só conferência visual**

Havia um defeito real. **Causa raiz**, medida por exaustão da cascata: `.midia-serie` colapsava para **altura zero** no card montado por JavaScript, porque `renderizarCard` não cria `.cartaz-serie` e o único filho é o `.badge`, que é `position: absolute` (`css/style.css:565`) e portanto está fora do fluxo e não sustenta altura. No template estático isso não acontecia, porque ali existe o `img.cartaz-serie` e o `aspect-ratio` está nele.

**Não há `height`, `min-height`, pseudoelemento, regra genérica nem estilo inline que resolva.** A correção é **uma linha**: `aspect-ratio: 2 / 3` em `.midia-serie` (`css/style.css:553`), commit `fce12f4`, com o porquê no comentário do próprio bloco.

Funciona porque a **largura do card é definitiva nos dois breakpoints**:

- **Regra base** — `.resultados` (`css/style.css:508-515`) é `display: flex` com `flex-direction: column` e `width: 100%`, então o item estica e a largura Resolve.
- **Desktop** — dentro de `@media (min-width: 769px)` (abre em `658`), `.card-serie` recebe `flex: 1 1 calc(33.333% - 14px)` (linha `702`), que dá largura por `flex-basis`.

O badge usa `top: 10px` e `right: 10px` (`css/style.css:566-567`).

**O que falta:** a conferência visual dos dois breakpoints na largura real. Aprovada por exaustão da cascata, **não** por renderização — ver o bloqueio em 9.2.

### 4.3 `M1-T13` (RF10) — **começou e está pela metade**

O commit `b61bd46` acrescenta em `index.html` a linha **221**, `<p id="resultados-boas-vindas"></p>`, entre o `</div>` de `.cabecalho-resultados` e o `<hr class="separador">`. **Nada mais da M1-T13 foi implementado.** Medido agora:

| O que falta | Onde | Estado verificado |
| --- | --- | --- |
| `exibirMensagemDeBoasVindas` | `js/ui.js` | **não existe** — só 2 menções, ambas em comentário (`380` e `395`) |
| repasse do nome por **terceiro** argumento | `js/script.js` | **não existe** — `buscarCatalogo(aviso, generosFavoritos)` em `562`, chamada com 2 argumentos em `391` e `873` |
| `concluirBusca(nome, callback)` | `js/script.js` | **não existe** — `grep` devolve **0** |
| chamada `concluirBusca(nome, exibirMensagemDeBoasVindas)` | `js/script.js`, logo depois de `renderizarCards(catalogoRecomendado)` (linha `627`) e **antes** da bifurcação de estado | não existe |

### O ponto que faz a `M1-T13` valer

`concluirBusca` precisa **receber** a função e ser **quem a dispara**. Chamar a saudação direto dá o mesmo efeito na tela e **não entrega o RF10**, porque o critério é sobre a **forma**, não sobre o efeito.

O porte ensinado existe e está verificado: `saudacaoDespedida(usuario, callback)` em `cinematch_antigo/cinematch.js:511`, que recebe a função como **segundo parâmetro** e chama `callback()` na linha **519**. É esse o modelo a portar.

---

## 5. Estado das tasks no quadro

Conferido em `docs/KANBAN.md` em 03/10/2026, **por coluna** e não por checkbox.

| Coluna | Tasks | Quantidade |
| --- | --- | --- |
| Concluído | `M1-T00`, `M1-T01`, `M1-T02`, `M1-T03`, `M1-T04`, `M1-T05`, `M1-T06`, `M1-T07`, `M1-T08`, `M1-T09`, `M1-T10`, `M1-T11`, `M1-T16` | **13** |
| Em Andamento | `M1-T12` | **1** |
| A Fazer | `M1-T13`, `M1-T14`, `M1-T15`, `M1-T17`, `M1-T18`, `M1-T19`, `M1-T20`, `M1-T21`, `M1-T22`, `M1-T23`, `M1-T24` | **11** |
| Backlog | 9 itens de bônus, sem ID — não contam nota | **9** |

13 + 1 + 11 = **25**, o que bate com o metadado do quadro (linha 17). Rastreabilidade: RF08 em `Concluído`, RF09 em `Concluído / Em Andamento`, RF10 a RF12 em `A Fazer`.

---

## 6. Precedência documental

| # | Fonte | Define |
| --- | --- | --- |
| 1 | **PDF** `docs/Projeto Avaliativo Final - Módulo 01 - Mobile React Native T1 - M1S13 (1).pdf` | o que é **exigido** |
| 2 | **`docs/BRIEFING.md`** | transcrição pesquisável do PDF, para agentes. Substituída pelo PDF em qualquer divergência |
| 3 | **Dois repositórios das aulas** | **como** escrever, não **o que** entregar |
| 4 | **`docs/KANBAN.md`** | o **estado** das tasks |
| 5 | **`AGENTS.md`** | o **workflow** dos agentes |

| Repositório | Endereço | O que vem de lá |
| --- | --- | --- |
| Mini-projeto da semana 6 | <https://github.com/tiagoeduardobr/Mini-Projeto-Cinematch-SCTEC> — cópia local em `cinematch_antigo/` | a **lógica**: classes, compatibilidade, closure, callback e `setTimeout` |
| Exercícios das semanas 1 a 5 e 7 a 12 | <https://github.com/tiagoeduardobr/codigo-tecnico-semanas> | o **web**: HTML semântico, CSS com Flexbox, DOM, `fetch`, `localStorage` e módulos ES |

**Não editar** os três arquivos de `cinematch_antigo/`: é o registro da entrega da semana 6, com `require` e `module.exports` de propósito.

> **Atenção ao verificar fatos:** só `cinematch_antigo/` está clonado neste repositório. O repositório das semanas **não está** — os caminhos `semana-XX/...` só podem ser conferidos acessando o repositório remoto, não a partir desta cópia de trabalho.

---

## 7. Memória de pesquisa — fatos verificados, não rederive

| Fato | Onde |
| --- | --- |
| `??` aparece **1×**, e não foi ensinado | `cinematch_antigo/cinematch.js:211`, no cálculo do próximo id. Não replicar |
| `saudacaoDespedida(usuario, callback)` é o porte ensinado do RF10 | `cinematch_antigo/cinematch.js:511`, com `callback()` na **519** |
| `normalizarTexto()` está definida | `cinematch_antigo/cinematch.js:284`, **não** em `catalogo.js` |
| Globais implícitos quebram em módulo ES | `cinematch_antigo/cinematch.js` linhas 31 (`opcao = prompt(...)`), 171 e 330. Declarar com `let`/`const` ao portar |
| Os `.js` de `semana-12/modulos/` **já são ESM**, não CommonJS | `index.js` faz `import`, `slug.js` faz `export`, `package.json` com `"type": "module"`. Corrigido pelo professor em `a413b0c`, de 18/09/2026 |
| **A seção 3 do briefing tem só DOIS estados e nenhum login** | `docs/BRIEFING.md` — "o formulário de perfil e os resultados com os cards de recomendação". É o que autoriza tratar a tela de login como bônus fora do escopo |
| **`css/style.css` não usa `!important` em código** | **1 ocorrência no arquivo**, na linha **11**, dentro do comentário de cabeçalho. Em código: **0** |
| **`css/style.css` não usa CSS Grid** | `display: grid` = **0** |
| **`innerHTML` = 0 em código** nos três módulos | as 6 ocorrências do repositório estão todas em comentário. A defesa é `textContent` e `createElement` |
| **`console.log` = 0 em código** nos três módulos | as 2 ocorrências estão em comentário, `js/script.js:714` e `js/ui.js:176` |
| **LF puro** em `index.html`, `css/style.css`, os três `.js` e `docs/KANBAN.md` | **0 bytes CR** em cada arquivo, verificado com `tr -cd '\r' < arquivo \| wc -c` |
| **`cspell.json` está em CRLF no disco** | lacuna do `*.json`, que o `.gitattributes` não cobre. Cosmético, **decisão do usuário** |
| **`git config` já está configurado** | **Não rode `git config`** — o `AGENTS.md` §6 proíbe |
| **Não existe configuração de lint de Markdown** | nenhum `markdownlint`, `editorconfig`, `eslint` ou `prettier` versionado |
| **O `node_modules` é ignorado pelo Git** | `.gitignore` lista `node_modules/` |
| **Risco 14 do quadro é o da altura da `.midia-serie`** | `docs/KANBAN.md:188`, com a mitigação marcada como **executada** e a conferência visual pendente |

---

## 8. Memória de pesquisa — lições duráveis das sessões anteriores

As subseções 8.1 a 8.3 são o modo de falha mais provável deste projeto. As de 8.5 a 8.10 são o método de verificação. A **seção 1 é a que mais custou tempo** e está acima de todas.

**8.1 Assertar de memória é o modo de falha mais provável.** Um agente anterior escreveu que `??` não aparecia em nenhum dos repositórios das aulas — **aparece**, em `cinematch_antigo/cinematch.js:211`. E escreveu que os `.js` de `semana-12/modulos/` ainda estavam em CommonJS — **já são ESM**, desde `a413b0c`. Nos dois casos o agente **tinha a evidência na tela e escreveu o contrário**. Toda afirmação factual nova precisa ser conferida contra o arquivo antes de virar texto. Se você não abriu o arquivo, você não sabe: escreva "não verificado" em vez de arriscar.

**8.2 A regra que decorre, e o número como forma do mesmo erro.** Um número sem o comando que o produziu é um número inventado, por mais plausível que pareça — "148 pacotes instalados" é exatamente o tipo de valor que a memória produz e a medição não confirma. E **o multiplicador varia conforme a métrica escolhida**: pacotes de primeiro nível, pacotes com aninhados e entradas do lock são três números diferentes para o mesmo `node_modules`. **Escreva qual métrica você usou**, junto com o comando.

**8.3 Nunca confie na narrativa de subagente sobre estado remoto.** Um agente afirmou que a `develop` faria fast-forward e **errou**: o `origin/develop` local estava defasado, porque o clone não tinha feito `fetch`. O mesmo agente disse que uma branch "já existia" quando a medição mostrava que não, e que um `merge` tinha retornado `Already up to date` estando na branch errada. **O estado final estava correto, mas a narrativa não batia com a sequência.** Antes de afirmar qualquer coisa sobre o estado remoto, compare `git rev-parse origin/<branch>` com `git ls-remote --heads origin` — ou rode `git fetch` e releia o ref. Um `origin/*` no disco é uma cópia de quando o `fetch` rodou. E, do mesmo modo, **verifique o estado final com comando de leitura, você mesmo**.

**8.4 Nunca reverter alteração do usuário sem perguntar.** O mesmo agente rodou `git restore docs/KANBAN.md` ao achar que um subagente tinha escrito fora do escopo — e as edições eram do usuário, feitas em paralelo. Não houve perda, mas a decisão foi tomar **ação destrutiva sobre trabalho do usuário sem perguntar**.

**8.5 Um subagente cancelado deixa efeito no disco.** O briefing da `M1-T18` dizia que `node_modules` não existia. **A premissa estava certa quando foi escrita** e **ficou errada antes de a task ser executada**, porque o subagente da task anterior tinha iniciado o `npm install` e então foi cancelado. Cancelar o agente não desfaz o processo que ele disparou. Antes de tratar qualquer premissa de briefing como atual, **meça o disco de novo**; e quem redige a task precisa escrever no próprio texto o que é verificável agora, não o que era verdade quando redigiu.

**8.6 Nunca afirmar execução sem a tool call que a produziu.** O orquestrador **escreveu no texto** os comandos que deveria ter rodado e falou como se os tivesse executado, incluindo dizer que tinha marcado a task no `KANBAN` e que um arquivo estava criado — **nenhum dos dois existia**. Escrever o comando no texto é **planejar**, não executar. A diferença é invisível para quem lê e só visível para quem tem o log — então **o log precisa ser a evidência, não a narrativa**. A consequência prática é grave: quem recebe essa narrativa **delega em cima de um estado que não existe**, e a sessão se perde. Esta é a raiz do tema da seção 1.

**8.7 Ao verificar proibição de stack, remova comentários antes de contar.** O `grep` de `!important` dava **2**, ambos em comentário de cabeçalho; em código é **0**. O mesmo vale para `fetch`, `class`, `localStorage`, `display: grid` e qualquer token que também apareça em texto explicativo. **Contagem ingênua dá falso positivo e joga o agente na direção errada**: uma checagem de ausência que usa a contagem errada escreve "FALHA: ainda existe" quando o oposto é verdadeiro. Neste ambiente: remova os comentários com `grep -v '^\s*//'` e `grep -v '^\s*\*'`, ou o equivalente, antes de contar.

**8.8 Verificar mesmo quando o relatório parece bom é o que produz afirmação defensável.** Um relatório não verificado não é evidência de nada — é uma afirmação sobre o que alguém disse que fez. Comandos de leitura (`rev-parse`, `ls-remote`, `status`, `diff --stat`, `grep` de nonce) são baratos e repetíveis; **use-os sempre, e escreva no documento a evidência que eles deram.** Verificação não serve só para pegar erro: serve para **ter a evidência de que não houve erro**.

---

## 9. Problemas abertos

### 9.1 A `M1-T13` tem commit e está fora do quadro — **alguém precisa corrigir**

A task está em **A Fazer** no `docs/KANBAN.md:94`, sem bloco de proveniência, **apesar de haver commit** (`b61bd46`) e de o `index.html` já estar alterado. Isso contraria a convenção: **task com código commitado deveria estar em *Em Andamento***, com o bloco `– Em andamento desde DD/MM/AAAA:HH:MM por Nome 🟡`. Além disso, a nota de progresso precisa dizer o que já foi feito e o que falta, senão a próxima sessão não sabe que o `<p id="resultados-boas-vindas">` já existe.

### 9.2 A `M1-T12` está implementada mas não foi conferida — e não há como conferir aqui

A task está corretamente em *Em Andamento* (`docs/KANBAN.md:110`), com a rastreabilidade do RF09 em `Concluído / Em Andamento` e o risco 14 registrado (`:188`) com a mitigação marcada como executada. **Falta a conferência visual dos dois breakpoints**, e ela está bloqueada por 9.3.

### 9.3 Não há navegador neste ambiente — verificado, não é opinion

`chromium`, `chromium-browser`, `google-chrome`, `firefox` e `playwright` **não estão no `PATH`**. `node_modules` **não tem** `jsdom`, `playwright` nem `puppeteer`. `playwright` e `selenium` **não estão** no Python. Não há headless, não há automação, não há renderização possível. **A `M1-T12` foi provada por exaustão da cascata de CSS, não por renderização** — e essa é a diferença entre "provado" e "provado no navegador", e vale a pena não misturar as duas coisas.

Enquanto isso não acontecer, **nenhuma task de lógica nova deve ser marcada como concluída** sem o mesmo teste — regra do `AGENTS.md` §5. As exceções já registradas no quadro são a `M1-T07` e a `M1-T11`, que têm prova de comportamento em Node e confirmação visual da pessoa usuária.

### 9.4 O quadro não registra a alteração de `index.html` na branch de lógica

HTML é território da branch de interface. A `M1-T13` alterou `index.html` na `feature/cinematch-web`, **branch de lógica**, e o quadro não aponta isso. É a **divergência registrada** que a `M1-T12` já declara pelo mesmo motivo (o `css/style.css` é da branch de interface, que está 15 commits atrás do remoto) — mas a da `M1-T13` ainda não foi escrita. Precisa ficar **visível na linha da task**, não apenas na cabeça de alguém.

### 9.5 A branch de interface está 15 commits atrás do remoto

`feature/cinematch-web-interface` local em `654bdad`, remoto em `c25fd11`, `git rev-list --count` = **15**. Atrapalha qualquer trabalho de HTML ou CSS, porque a alternativa seria integrar 15 commits antes de editar. **Não faça `pull` nem merge por conta própria** — é decisão do usuário e do `git-commit`.

### 9.6 Risco latente na tela de login: e-mail e senha na query string

Inerte, e continua válido. Se o bônus virar `type="submit"` sem `preventDefault()`, o GET padrão manda **e-mail e senha para a query string** e para o histórico do navegador — CWE-598, owasp A02. Hoje é inerte, porque os dois botões são `type="button"`. Quem algum dia implementar esse bônus tem que colocar o `preventDefault()` **antes** de mexer no `type`.

### 9.7 Duas imagens do briefing não são verificáveis por texto

O wireframe (Seção 3) e a **estrutura de pastas** (Seção 5.2) são figuras no PDF. A Seção 3 do `AGENTS.md` é **derivada, não comprovada** pela transcrição. Alguém precisa abrir a página da Seção 5.2 no PDF e conferir com os olhos antes de apresentar isso como exigência do professor no vídeo.

### Resolvidos nesta sessão

| Item | Destino |
| --- | --- |
| **A `.midia-serie` colapsava para altura zero** e o badge invadia o conteúdo | **Resolvido** por `aspect-ratio: 2 / 3` em `css/style.css:553`; commit `fce12f4`; risco 14 com a mitigação executada |
| **Não havia regra escrita para anotar o esboço comentado** | **Resolvido** — `AGENTS.md` §7 agora descreve o `JÁ FEITO NA M1-Txx:` como anotação, não apagamento; commit `8e02d7d` |

---

## 10. Próximos passos sugeridos

1. **Fechar a entrega antes de fechar código.** O gargalo é a entrega, não a implementação (seção 2). Com dois dias de margem, `M1-T21` → `M1-T22` → `M1-T23` é a cadeia que carrega `1,50` mais o que já está pontuado. O vídeo precisa cobrir os **5 tópicos do item 5.8**, com o rosto visível e boa iluminação.
2. **Terminar a `M1-T13`**, que está pela metade e é curta: `exibirMensagemDeBoasVindas` em `js/ui.js`, o terceiro argumento de `buscarCatalogo` para o nome, `concluirBusca(nome, callback)` em `js/script.js` e a chamada logo depois de `renderizarCards(catalogoRecomendado)` (`js/script.js:627`). **O critério é a forma, não o efeito**: `concluirBusca` tem de receber a função e ser quem a dispara, no porte de `cinematch_antigo/cinematch.js:511`.
3. **Corrigir o quadro** nos dois pontos de 9.1 e 9.4: pôr a `M1-T13` em *Em Andamento* com bloco de proveniência, e registrar a alteração de `index.html` na branch de lógica como divergência declarada.
4. **Abrir a página no navegador** e conferir os dois breakpoints da `M1-T12` (9.2). Não é possível neste ambiente — precisa de uma sessão com navegador ou da pessoa usuária.
5. **Subir o `live-server`** (`npm start`, porta 8080) e conferir na aba Network que os três `.js` voltam como `text/javascript`. **Não abrir via `file://`**: módulos ES disparam erro de CORS por lá.
6. **Fechar `M1-T14` e `M1-T15`** logo em seguida — são o resto do Critério 8 (`1,00`) e do estado "carregando" do Critério 13. `M1-T14` depende da `M1-T13`, então esta é a ordem natural.
7. **Fechar `M1-T17`**, que só depende das cinco anteriores e cuja nota já descreve exatamente o que falta.
8. **Rodar `git fetch` antes do próximo push**, e comparar `git rev-parse origin/<branch>` com `git ls-remote --heads origin` (8.3). **Push é decisão do usuário**: nunca faça push sem pedido explícito, e nunca force push neste repositório, nem com `--force` nem com `--force-with-lease`.
9. **Decidir o `.gitattributes` para `*.json`** e o destino dos **6 planos untracked** em `.opencode/plans/` — as duas coisas são decisão do usuário. Não as resolva por conta própria.