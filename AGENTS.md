# CineMatch Web — Instruções para Agentes

Este arquivo é carregado automaticamente no contexto de todos os agentes que trabalham neste repositório. Ele define a stack permitida, aponta o backlog canônico, fixa o fluxo de Git e registra as convenções que evitam retrabalho. O detalhamento de cada requisito funcional e o checklist de entrega vivem em `docs/KANBAN.md` e no briefing em PDF — aqui fica o essencial para não perder o rastreamento.

---

## 1. Contexto do Projeto

**CineMatch Web — Recomendação de Séries em Tempo Real.** Projeto avaliativo final da disciplina *Desenvolvimento Mobile — React Native*, **Módulo 01, Semana 13**, professor Matheus de Nadai. É a evolução do "CineMatch JS", que rodava no terminal Node.js com catálogo fictício: agora a mesma lógica de recomendação ganha interface web, persistência e catálogo real de uma API pública.

| Dado | Valor |
| --- | --- |
| Repositório | https://github.com/tiagoeduardobr/CineMatch-Web |
| Módulo | Desenvolvimento Mobile — Módulo 01 — Semana 13 (Projeto Avaliativo Final) |
| Prazo de entrega | 05/10/2026 até 22h, contado pela última atualização no GitHub |
| Peso na nota | 60% da nota do módulo — 15 critérios somando 10,00 pontos |
| API de catálogo | TVMaze — `https://api.tvmaze.com/shows?page=0` (pública, sem chave) |

A aplicação coleta perfil (nome, idade, gêneros) por formulário, persiste em `localStorage`, busca o catálogo na TVMaze via `fetch` e renderiza cards de recomendação calculados por compatibilidade.

**Plágio é nota 0.** O briefing autoriza usar IA, desde que o resultado seja adaptado e o aluno saiba explicar cada linha. Isso muda como o código deve ser escrito aqui: comentado, com o raciocínio explícito, não só o resultado.

---

## 2. Restrição de Stack

Esta é a regra mais importante do arquivo. Usar qualquer item proibido zera o mérito do módulo.

**Permitido:** HTML5 semântico, CSS3 (Flexbox, box model, mobile-first, media queries), JavaScript com **módulos ES nativos** (`import`/`export`), `fetch`, `localStorage`, npm apenas como ferramenta de apoio (`live-server`).

**Proibido (fora do escopo do Módulo 01):** React, Next.js, React Native, Vue, Angular, qualquer outro framework JS, TypeScript, bundlers e build (Webpack, Vite, Babel), CSS Grid, Sass, CSS-in-JS, back-end, servidor ou banco de dados, `fetch` com POST/PUT/DELETE gravando em servidor, jQuery, axios, e qualquer biblioteca não vista em aula.

**Não se deixe enganar pelo nome da disciplina.** O projeto se chama "Mobile React Native" e o PDF está na pasta `docs/`, mas o Módulo 01 é explicitamente **HTML + CSS + JS puros**. React Native chega no Módulo 02. O briefing só mencionou Flexbox, então **não use CSS Grid**.

### 2.1 Fonte de verdade do código

Nenhum agente escreve código novo aqui por analogia com "boas práticas" genéricas. Toda linha nova precisa ter origem em um destes dois repositórios, que são o material já ensinado na disciplina.

| Fonte | Endereço | O que vem de lá |
| --- | --- | --- |
| Mini-projeto da semana 6 | <https://github.com/tiagoeduardobr/Mini-Projeto-Cinematch-SCTEC>, cópia local em `cinematch_antigo/` | A **lógica**: classes, compatibilidade, closure, callback e `setTimeout` |
| Exercícios das semanas 1 a 5 e 7 a 12 | <https://github.com/tiagoeduardobr/codigo-tecnico-semanas> | O **web**: HTML semântico, CSS com Flexbox, DOM, `fetch`, `localStorage` e módulos ES |

A semana 6 é o mini-projeto da linha de cima e a semana 13 é este projeto. Nenhum dos dois repositórios tem pasta para elas.

`cinematch_antigo/` existe no repositório para ser lido offline. **Não edite os três arquivos** (`class.js`, `cinematch.js`, `catalogo.js`): é o registro da entrega da semana 6, com `require` e `module.exports` de propósito. O que este projeto consome é a *lógica* portada e reescrita em módulos ES dentro de `js/`. Porte a lógica, não o estilo: o `cinematch.js` é código de terminal e usa globais sem declarar, como `opcao = prompt(...)` e `for (i = 0; ...)`, que quebram com `ReferenceError` em módulo ES. Declare com `let` ou `const` ao portar.

**Precedência.** O PDF define o que o professor exige. Os dois repositórios acima definem *como* escrever isso. O `docs/KANBAN.md` define o estado das tasks. Este arquivo define como os agentes trabalham. Entre "o que foi ensinado" e "o que é permitido aqui", o PDF vence.

#### Onde cada RF já tem exemplo

| RF | Referência |
| --- | --- |
| RF02 Formulário e validação | `semana-09/exercicio-form/script.js` — `FormData`, `preventDefault()`, `getAll()`, array `erros` |
| RF03 `localStorage` | `semana-11/ceu-aberto/script.js` — `setItem(chave, valor)` e `getItem(...) \|\| padrão`. É a referência da **forma** da API; o `try/catch` exigido pela Seção 7 não aparece nesse arquivo e foi acrescentado em `js/script.js` pela `M1-T06`, nas funções `salvarPerfil()` e `lerPerfilSalvo()`. Os quatro métodos foram ensinados: `setItem` (salvar), `getItem` (ler), `removeItem` (remover **uma** chave) e `clear` (apagar **tudo**). Contrato do `getItem`: devolve **`null`** quando a chave não existe, **nunca `undefined`** |
| RF04 `fetch` | `semana-11/ceu-aberto-api/script.js` — `try`/`catch`, `response.ok === false`, `throw new Error` |
| RF05 Métodos de array | `cinematch_antigo/cinematch.js` — `map`, `filter`, `find` e `sort` com `localeCompare("pt-BR")` |
| RF06 Herança e `this` | `cinematch_antigo/class.js` — `Serie extends Conteudo`, `super()`, `instanceof` |
| RF07 Compatibilidade | `cinematch_antigo/cinematch.js` — `compatibilidade()` e `obterConteudosPorGenero()`, limiares 80 e 50 |
| RF08 Render no DOM | `semana-08/cinematch-createElement/script.js` — `createElement`, `textContent`, `appendChild`, `remove` |
| RF09 Flexbox e responsividade | `semana-10/` — media queries, `gap`, `clamp()` |
| RF10 Callback | `cinematch_antigo/cinematch.js` — `saudacaoDespedida(usuario, callback)` |
| RF11 Closure | `cinematch_antigo/cinematch.js` — `criarContadorDeRecomendacoes()` |
| RF12 `setTimeout` | `cinematch_antigo/cinematch.js` — `buscarCatalogoSimulado()` |
| RF13 SEO e acessibilidade | `semana-11/ceu-aberto/index.html` — `og:title`, `meta description`, `aria-label` |
| RF14 Módulos ES | `semana-12/modulos/` — a instrução do "antes" está no `README.md`: `require` vira `import`, `module.exports` vira `export`, `"type": "module"`. Os `.js` da pasta já são o "depois" (commit `a413b0c`, 18/09/2026): `index.js` faz `import` e `slug.js` faz `export` |

RF01 e RF15 não têm linha própria. O RF01 tem exemplo em `semana-11/ceu-aberto/index.html` — `og:title`, `og:description`, `og:image`, `meta description`, skip link e landmarks — e, para landmarks mais `lang` e `<title>`, nos `index.html` das semanas 09 e 10. O RF15 não tem exemplo ensinado: nenhum dos dois repositórios usa `live-server`, e a referência é o `package.json` deste projeto.

#### Não ensinado — não use sem perguntar

Nenhum item abaixo aparece em nenhum dos dois repositórios. Se um deliverable exigir algum deles, pergunte antes de escribir: encadeamento opcional `?.`, `Object.assign`, `structuredClone`, `AbortController`, `IntersectionObserver` e `ResizeObserver`, *debounce*, *throttle*, `<template>`, `padStart` e `Intl.`.

Um caso fora da lista, para não confundir: `??` aparece **uma vez** em `cinematch_antigo/cinematch.js:211`, no cálculo do próximo id. Não foi ensinado e não deve ser replicado.

Um contraponto, porque a lista é curta e pode ser lida ao contrário. `localeCompare` com `"pt-BR"` **não** é o namespace `Intl.` e está liberado — é o que o RF05 exige.

#### Conflitos entre o que foi ensinado e o que é permitido aqui

| O curso ensina | O que fazer neste projeto |
| --- | --- |
| CSS Grid, em `semana-11/ceu-aberto*/`, `semana-12/ceu-aberto/` e `semana-12/pokedex/` | **Não usar.** O briefing só autorizou Flexbox. Resolva com `flex-wrap` e `gap` |
| `require` e `module.exports`, em `cinematch_antigo/` | Reescrever em `import`/`export`, conforme `semana-12/modulos/` |
| `prompt-sync` e menu de terminal, em `cinematch_antigo/cinematch.js` | Substituir por formulário com `FormData` e `localStorage` |
| Catálogo fictício de 30 itens, em `cinematch_antigo/catalogo.js` | Substituir pela TVMaze com `fetch`, mantendo `normalizarTexto()`, que hoje vive em `cinematch_antigo/cinematch.js:284` |
| `setTimeout` embrulhado em `Promise` para simular latência, em `cinematch_antigo/cinematch.js` | O RF12 aqui é de **exibição**: o atraso proposital vai na renderização, nunca dentro do `fetch`, onde mascararia o estado de erro |
| `!important` | Reforço, não divergência: o curso já proíbe. `semana-10/exercicio-especificidade/` diz para ajustar o seletor ou apagar a regra, e o README do projeto exige explicar por que não usamos |

A regra geral: o repositório das aulas diz o que **se sabe fazer**; o briefing diz o que **se pode entregar**. Conflitando, o briefing vence — e o conflito vai registrado no `docs/KANBAN.md`, nunca silenciado.

---

## 3. Estrutura de Arquivos (RF14)

Três módulos JavaScript, cada um com uma responsabilidade. O briefing diz que três já cumprem o requisito com folga, e fatiar mais é **opcional, não exigência**.

| Arquivo | Responsabilidade |
| --- | --- |
| `js/script.js` | O **fluxo**: formulário, `localStorage`, busca na API e cálculo |
| `js/ui.js` | Tudo que toca a **tela**: renderizar cards, mensagens de carregando, vazio e erro |
| `js/modelo.js` | As **classes**: `Conteudo` e `Serie`, com herança e `this` |

Mais `css/style.css` e `assets/main.png`, com o `index.html` na raiz do repositório. O carregamento é feito por `<script type="module" src="./js/script.js"></script>`.

> **Onde cada coisa mora.** `css/` guarda a folha de estilo, `js/` guarda os módulos ES e `assets/` guarda as imagens. O `index.html` fica na raiz porque é o arquivo que o `live-server` serve em `/` — colocado em subpasta, a URL de entrada mudaria e o `npm start` deixaria de apontar para a página. Como os três módulos estão na mesma pasta, `script.js` importa `./ui.js` e `./modelo.js` com caminho relativo.

---

## 4. Requisitos Funcionais (RF01 a RF15)

| RF | Título curto | Tarefa |
| --- | --- | --- |
| RF01 | HTML semântico: landmarks, `title`, `meta description`, og tags | `M1-T02`, `M1-T16` |
| RF02 | Formulário de perfil e captura no `submit` com validação | `M1-T03`, `M1-T05` |
| RF03 | Persistir perfil com `localStorage` | `M1-T06` |
| RF04 | Buscar catálogo real via `fetch` na TVMaze com `try/catch` | `M1-T07` |
| RF05 | Tratar catálogo com três ou mais métodos de array | `M1-T08` |
| RF06 | Classes `Conteudo` e `Serie` com herança e `this` | `M1-T09` |
| RF07 | Calcular e classificar a compatibilidade | `M1-T10` |
| RF08 | Renderizar os resultados no DOM | `M1-T11` |
| RF09 | Flexbox e responsividade | `M1-T04`, `M1-T12` |
| RF10 | Callback | `M1-T13` |
| RF11 | Closure | `M1-T14` |
| RF12 | Browser API de tempo com `setTimeout` | `M1-T15` |
| RF13 | SEO básico e acessibilidade | `M1-T16` |
| RF14 | Módulos ES com `import` e `export` | `M1-T17` |
| RF15 | Servir com pacote via npm | `M1-T01`, `M1-T18` |

O detalhamento de cada RF, com critérios de aceitação e pesos, está em `docs/KANBAN.md`.

---

## 5. Backlog — docs/KANBAN.md (Seção Crítica)

Os agentes deste ambiente vêm configurados de outro projeto e esperam um backlog em `docs/PROJECT_BACKLOG_*.md`. **Neste projeto esse arquivo não existe. O backlog é `docs/KANBAN.md`.** Qualquer agente que procurar pelo caminho padrão vai concluir que não há backlog e perder o rastreamento.

**O que o arquivo contém:** cabeçalho com metadados, legenda e convenções, as 4 colunas obrigatórias (Backlog, A Fazer, Em Andamento, Concluído), tabela de Rastreabilidade (RF, tarefa, coluna, peso), riscos com mitigação e o checklist final de entrega com 24 itens, reprodução literal da seção 7 do briefing.

**IDs de tarefa:** `M1-T00` a `M1-T23`. A numeração é fixa e não muda; os IDs nunca são reaproveitados. Os itens da coluna *Backlog* são bônus sem nota e **não** têm ID `M1-T##`.

**Qual tarefa está em qual coluna não é registrado aqui.** O estado do quadro vive só no `docs/KANBAN.md`, que é a fonte de verdade — e o checkbox da linha é a única fonte de verdade do estado. O `AGENTS.md` registra apenas as regras: como marcar, como mover, com que formato. Antes de mover qualquer tarefa, **leia o `docs/KANBAN.md`**; se este arquivo e o quadro divergirem sobre o estado, o quadro vence.

**Como marcar uma tarefa como concluída:** troque `- [ ]` por `- [x]` **e** acrescente ao final da linha `– Concluído em DD/MM/AAAA:HH:MM por Nome` 🟡. O campo `por Nome` é **obrigatório no squad**: é ele que dá rastreabilidade de autoria, e o Critério 2 da avaliação (peso 1,00) pesa justamente em versionamento e na capacidade de mostrar quem fez o quê, quando. O timestamp tem de vir de um comando executado no momento, nunca digitado à mão: `Get-Date -Format 'dd/MM/yyyy:HH:mm'` (PowerShell, o shell deste ambiente) ou `date '+%d/%m/%Y:%H:%M'` (Git Bash ou outro shell POSIX) — ambos produzem exatamente o mesmo formato. Atenção: no PowerShell, `date` é alias de `Get-Date` e não entende `strftime`, então falha.

**Como marcar uma tarefa como em andamento:** mova a tarefa para a coluna *Em Andamento* **e** acrescente ao final da linha `– Em andamento desde DD/MM/AAAA:HH:MM por Nome` 🟡. É a mesma gramática da conclusão, com o rótulo trocado: `Concluído em` ↔ `Em andamento desde`. **Nunca** escreva só o nome da pessoa no fim da linha — sem estado, sem timestamp e sem marcador, a linha não é parseável e o quadro perde o registro de há quanto tempo a tarefa está na coluna. O limite de WIP é **1 por pessoa** — 1 no trabalho solo, 3 no squad de 2 pessoas, porque o HTML e o CSS da mesma tela são tasks acopladas e compartilham um slot, enquanto a task de lógica ocupa o outro. Dependência declarada **não** precisa estar resolvida para entrar na coluna, mas o bloqueio tem que ficar **visível na própria linha**, com a marca `_Bloqueio:_`, depois da nota de dependência e antes do bloco de proveniência. A nota descreve a dependência e pode citar a coluna em que ela está; o estado da **própria** task é definido só pelo checkbox, que continua sendo a única fonte de verdade. Havendo task na coluna, remova o placeholder `_Nenhuma tarefa em andamento no momento._`, que só existe enquanto a coluna está vazia.

**Bloco de proveniência (estado, timestamp e responsável):** o trecho final da linha é sempre `– <estado> DD/MM/AAAA:HH:MM por Nome` seguido de 🟡 — por exemplo `– Concluído em 25/09/2026:20:28 por Lucas 🟡`. O 🟡 é o único mecanismo de amarelo que funciona em todas as plataformas: GitHub, Trello, Notion e GitHub Projects, que a seção 5.5 do briefing aceita para publicar o quadro. **Não** tente o destaque com tag HTML: o GitHub removeu o `<mark>` da allowlist do sanitizador, e `<span style="…">` nunca teve `style` como atributo permitido, então as duas vazariam como texto literal no quadro publicado. O 🟡 marca **a proveniência, não o estado** — quem codifica o estado é o checkbox `- [ ]` / `- [x]`. O destaque vai **apenas** no bloco, nunca na linha inteira nem na descrição da tarefa.

**Regras de movimentação:**

- Ao concluir, mova a tarefa para a coluna *Concluído* e, se couber, atualize a coluna "Coluna atual" da linha correspondente na tabela de Rastreabilidade.
- Uma tarefa só sai de *A Fazer* quando o código **funciona e foi testado**, não quando foi apenas escrito. A única exceção é a coluna *Em Andamento*.
- **Não invente IDs novos** sem antes acrescentar a tarefa ao quadro.
- A coluna *Backlog* é a **lista canônica** dos bônus. Não duplique esses itens em outra seção.

---

## 6. Git — Fluxo e Override de Padrões

Os agentes deste ambiente vêm com regras padrão que **não se aplicam** aqui. Trate o quadro abaixo como override explícito.

| Regra padrão do ambiente | Neste projeto |
| --- | --- |
| Branch por tarefa, no formato `feature/{slug}` ou `feature/{CAT}-{NUM}` | Duas branches **fixas** de feature, uma por pessoa: `feature/cinematch-web` (lógica) e `feature/cinematch-web-interface` (interface/UI) |
| `main` e `develop` proibidos | **`main` e `develop` são obrigatórios**, por exigência do professor |
| Commit direto na branch de feature | Não. A integração acontece em `develop`: commit na branch de feature, merge em `develop`, e `develop` para `main` só no fim do projeto |

**Branches:** `main`, `develop` e as duas branches de feature do squad — `feature/cinematch-web` (lógica: API, classes, compatibilidade) e `feature/cinematch-web-interface` (interface: formulário, estilos, cards). A divisão é por pessoa: quem faz lógica commita na branch de lógica, quem faz interface commita na branch de interface. As duas convergem em `develop`.

**Desvio do briefing, e por quê.** A seção 5.6 do briefing sugere, para squad, `feature/interface` e `feature/logica`. Usamos `feature/cinematch-web` e `feature/cinematch-web-interface` porque `feature/cinematch-web` é o nome que o próprio briefing dá à branch individual, e o ambiente exige `feature/{slug}` fixo. Os papéis são os mesmos — um branch por pessoa, uma de interface e uma de lógica — então o Critério 2 é atendido. Vale a pena citar essa razão no vídeo, porque o item 5.8 pede para explicar quais branches foram criadas e para quê.

**Antes de commitar, atualizar a branch de integração.** O `develop` local pode ficar atrás do remoto depois de um merge via PR. Commitar em cima de um `develop` desatualizado gera push rejeitado por non-fast-forward, e a saída errada — um force push — apaga trabalho já mergeado. Confira com `git log --oneline develop..origin/develop`; se houver commits, faça fast-forward com `git merge --ff-only origin/develop` **antes** de commitar. Nunca force push neste repositório, nem com `--force` nem com `--force-with-lease`.

**Fluxo:** `feature/cinematch-web` e `feature/cinematch-web-interface` para `develop`, e `develop` para `main`. Todo o código deve chegar na `main` no fim do projeto — não faça merge na `main` antes disso. Mudança de convenção do próprio quadro e do `AGENTS.md` vai direto em `develop`, porque vale para as duas branches.

**Não é preciso criar uma branch por RF.** O objetivo é mostrar que se sabe separar trabalho numa branch de feature e trazê-la de volta. Não multiplicar branches.

**Commits:** mínimo de 5 no trabalho individual e 8 em squad. Use **Conventional Commits**, que é o estilo exemplificado no próprio briefing: `feat:`, `style:`, `docs:`. Uma linha, minúscula, sem ponto final. Exemplos que o briefing usa: `feat: busca catálogo real via fetch na TVMaze API`, `style: estiliza cards com flexbox e responsividade`, `docs: atualiza readme com instruções de execução`.

**NÃO faça `push` sem pedido explícito do usuário.** Publicar é decisão dele, não do agente. O mesmo vale para force push, com `--force` ou `--force-with-lease`: só mediante pedido explícito.

**Versione arquivos por nome explícito** (`git add <arquivo>`). Nunca `git add .` nem `git add -A`.

**`.gitattributes` fixa a quebra de linha por tipo de arquivo:** LF em `*.md`, `*.js`, `*.css` e `*.html`, e CRLF em `*.bat`. Não remova: sem as regras de LF o Windows converte tudo para CRLF e o `docs/KANBAN.md` passa a aparecer sujo em todo diff. A exceção do `*.bat` é o contrário: arquivo batch precisa de CRLF para o `cmd.exe` executar corretamente.

Os arquivos de identidade do Git já estão configurados no repositório. Não rode `git config`.

---

## 7. Convenções e Gotchas

### Restrições do ambiente (bloqueiam comandos)

O ambiente tem regras de permissão que **negam** comandos cujo uso seria atalho. Se um comando falhar por permissão, **não tente contornar** — escreva um arquivo de script e execute-o.

| Negado | Faça em vez disso |
| --- | --- |
| `python -c` e `python3 -c` | Grave um `script.py` e rode `python script.py` |
| `node -e` | Grave um arquivo `.js` e rode `node script.js` |
| `sed`, `sed -i`, `awk` | Use a ferramenta de edição dedicada |
| `tee`, `cat >`, `echo >` | Use a ferramenta de escrita dedicada |
| `cp`, `mv` | Delegue a um subagente com permissão de escrita |

O diretório externo para trabalho temporário, como scripts e extrações, é `C:\Users\Tiago\AppData\Local\Temp\opencode`. É o único lugar fora do repositório onde escrita é permitida.

### Gotchas do ambiente Windows e PowerShell

- **O modelo não lê PDF.** Para extrair texto de PDF use `pypdf`, já instalado na versão 6.15.0 com Python 3.12. Grave um script em vez de usar `python -c`.
- **`Measure-Object -Line` conta só linhas não-vazias.** Um arquivo com 42 linhas em branco reporta menos que o total real. Use `$a = Get-Content <arquivo>` seguido de `$a.Count` para a contagem real. Já causou um falso alarme nesta sessão.
- **O console do PowerShell corrompe acentuação na saída**, e `Módulo` vira `M�dulo`. O arquivo em si está correto em UTF-8. **Não "conserte" acentuação que só está errada na tela do terminal** — isso corromperia o arquivo.
- `Get-ChildItem`, `Get-Content` e `Set-Content` devem ser evitados em favor das ferramentas dedicadas de leitura, busca e escrita.

### Template literals são obrigatórios (convenção de sintaxe)

**Regra.** Toda string que interpola valor é escrita com **template literal** — crase com `${}` dentro. Concatenação com `+` não é usada em código novo: onde ela já existe, é caso para refatorar na próxima task que tocar o arquivo, e não para propagar.

**Por que isso não viola a seção 2.1.** A regra do "material ensinado" proíbe escrever por analogia com boa prática genérica, e template literal poderia parecer exatamente isso — uma preferência de estilo que ninguém viu em aula. Não é. A técnica **foi ensinada**, e a prova está no mini-projeto da semana 6, `cinematch_antigo/cinematch.js`, que interpola com crase nas linhas **27, 29, 161, 332 a 336 e 370 a 373**. Sem essas linhas, a regra seria opinião; com elas, é citação. É isso que impede alguém de tratar a convenção como "boa prática genérica". Quem precisar conferir, abra o arquivo — não reescreva a regra de memória.

**O caso atual já foi corrigido.** A convenção **já está aplicada** em `js/script.js`: medido em código, são **3 pontos** de interpolação com `${}` e **0** concatenações com `+`, as quatro que existiam tendo virado crase. A métrica não é a contagem crua: o próprio arquivo **comenta as duas sintaxes**, o que dá falso positivo, e por isso a contagem **remove os comentários antes de medir** — a receita está na lição **4.9** do `docs/AI_HANDOVER_CONTEXT.md`. O comentário que antes justificava a concatenação, perto da linha **261**, **foi reescrito** e hoje afirma o contrário do que afirmava: que a crase é a forma de interpolar valor neste projeto, e que a defesa contra XSS é o **destino** do valor, o `textContent`, não a crase — o aviso completo sobre isso é o blockquote logo abaixo. **Isso não revoga a convenção**, que continua valendo para código novo: a conformidade de hoje é consequência de uma task, não o motivo da regra, e o próximo `+` que aparecer é o mesmo caso que este era, refatorar na task que tocar o arquivo.

> **Advertência — template literal NÃO é defesa contra XSS, e nunca deve ser apresentado como tal.** `${}` não escapa, não sanitiza e não neutraliza nada. Dado que vem da API ou que foi digitado por pessoa usuária **é XSS** quando é interpolado numa string que depois é atribuída a `innerHTML`; é esse o risco que a regra acima **não** cobre. Trocar `+` por crase **não muda nada** nessa frente, porque o dado interpolado continua indo para o mesmo lugar — a crase muda a sintaxe, não o destino do valor.
>
> A defesa real, e a única, é **`textContent` e `createElement`**: eles escrevem o dado como texto e nunca o interpretam como marcação. É isso que os cards de fato usam hoje — medido no repositório, `innerHTML` aparece **0 vezes em código** nos três módulos, e as únicas ocorrências estão em comentários e no esboço comentado de `js/ui.js`. Se `innerHTML` entrar em código executado, isso vira violação, mesmo dentro de uma crase.

### Gotchas técnicas do projeto

- **Módulos ES não funcionam via `file://`.** Abrir o `index.html` por duplo clique dispara erro de CORS nos `import` e a página fica sem JavaScript. Sirva sempre com `npm start`, que roda o `live-server` na porta 8080. O botão "Trocar perfil" nunca deve recarregar via `file://`.
- **TVMaze API:** `https://api.tvmaze.com/shows?page=0` responde com `Access-Control-Allow-Origin: *`, então o CORS não bloqueia — mas confirme na aba Network do DevTools. **Nunca** desabilite a segurança do navegador para "fazer funcionar".
- **Nem toda série tem gênero ou nota preenchidos.** Sempre filtre antes de usar, verificando `genres.length > 0` e `rating.average`.
- **`localStorage`:** a chave é `cinematchPerfil`. Trate o `null` da primeira visita. `removeItem` **está disponível e foi ensinado**, então apagar o perfil salvo para o botão "Trocar perfil" é uso legítimo da API — apague a chave, não invente. `getItem` devolve **`null`** quando a chave não existe e **nunca `undefined`**: compare com `null` ou teste o valor, não com `=== undefined`. Envolva leitura e escrita em `try/catch`, porque o modo de falha real é **cota excedida ou storage limpo pelo navegador**, não exceção em `setItem`. Se a persistência falhar, siga sem ela e avise na tela. **`clear()` é proibido neste projeto:** ele apaga **todas** as chaves da origem, não só a do CineMatch, e destruiria o registro de qualquer outra aplicação servida no mesmo host — nunca chame, porque o efeito é indiscriminado.
- **Trate os três estados da chamada:** carregando, vazio e erro. O `setTimeout` do RF12 vai na **exibição**, nunca dentro do `fetch`, onde mascararia o estado de erro.
- **Escaping e XSS:** a defesa é **`textContent` e `createElement`**, não a crase. Os cards são construídos com `createElement` e escritos com `textContent`, que põem o dado na tela como texto e nunca o interpretam como marcação — é o que o código faz hoje, com `innerHTML` em código aparecendo **0 vezes** nos três módulos. Template literal é a **sintaxe obrigatória por convenção** (veja a subseção acima) e **não é, sozinha, proteção nenhuma**: `${}` não escapa nada. Se um dado da API, ou digitado por pessoa usuária, for interpolado numa string que depois entra em `innerHTML`, isso é XSS mesmo dentro de crase.

---

## 8. Agent Workflow — Orquestração

Existem cinco agentes globais já configurados, **fora deste repositório**, em `C:\Users\Tiago\.config\opencode\agents\`.

| Agente | Papel neste projeto |
| --- | --- |
| `task-build` | Orquestrador. Delega tudo aos demais e não edita código |
| `task-planner` | Planeja. **Deve ler `docs/KANBAN.md`, não procurar `docs/PROJECT_BACKLOG_*.md`** |
| `dev` | Implementa. Marca a task no `docs/KANBAN.md` com `Get-Date -Format 'dd/MM/yyyy:HH:mm'`, conforme a seção 5 |
| `code-review` | Revisa o código contra os RFs e a convenção do quadro |
| `git-commit` | Commits e branches. As duas branches fixas de feature (`feature/cinematch-web` e `feature/cinematch-web-interface`), com `main` e `develop` permitidos aqui |

Regras de orquestração que valem para este projeto:

1. **Nenhum agente edita código diretamente.** O `task-build` delega tudo ao `dev`, e o Git vai sempre para o `git-commit`. Nenhum agente fora do `git-commit` executa `git add`, `git commit`, `git push`, `git checkout -b` ou `git rm` por conta própria.
2. **Nenhum agente faz push** sem pedido explícito do usuário nesta conversa.
3. **Após cada task implementada, code review é obrigatório** antes da próxima task.
4. **Planos** vão para `.opencode/plans/`. Checkboxes de plano **não** levam timestamp, porque timestamp é exclusividade do `docs/KANBAN.md`.
5. **Tentativas:** máximo de 3 por task, com orçamento global de 20 tentativas por sessão.

---

## 9. Leitura Recomendada por Tarefa

Orçamento: **no máximo 200 linhas de `AGENTS.md` por prompt de subagente**. Filtre pela seção aplicável, não envie o arquivo inteiro.

| Tipo de tarefa | Ler do AGENTS.md | Fonte complementar |
| --- | --- | --- |
| Implementar RF de HTML e CSS: RF01, RF09, RF13 | Seções 2, 2.1 e 3 | `docs/KANBAN.md` → Rastreabilidade |
| Implementar RF de JS e POO: RF06, RF07, RF10, RF11 | Seções 2 e 2.1 | `docs/KANBAN.md` → tarefa correspondente |
| Implementar RF de rede e persistência: RF03, RF04, RF05, RF12 | Seções 2, 2.1, 3 e 7, gotchas técnicas | `docs/KANBAN.md` → riscos 1 a 5 |
| Renderizar no DOM: RF08 | Seções 2.1, 3 e 7 | `docs/KANBAN.md` → `M1-T11` |
| Mover, marcar ou criar task no quadro | Seção 5 | `docs/KANBAN.md` |
| Criar branch, commitar ou mergear | Seção 6 | Nenhuma |
| Push e publicação | Seção 6 | Nenhuma |
| Escrever o `README.md` | Seções 2, 2.1 e 3 | `docs/KANBAN.md` → `M1-T20` |
| Revisar código | Seções 2, 2.1, 3 e 7 | `docs/KANBAN.md` → Rastreabilidade |
| Orquestração e multi-agente | Seções 5, 8 e 9 | Nenhuma |

**Se um subagente não tem certeza de qual seção aplicar, mande-o ler o `AGENTS.md` completo antes de começar.**

---

## 10. Critérios de Avaliação

O briefing avalia 15 critérios somando **10,00 pontos**. A tabela completa com o mapeamento de RF para critério e peso está em `docs/KANBAN.md` → "Rastreabilidade". Destaque apenas o que mais pesa, porque é onde a nota se concentra:

- **Critério 1 — vídeo de até 7 minutos: 1,50**, o maior peso isolado. Precisa cobrir os 5 tópicos do item 5.8, com o rosto visível e boa iluminação. Inserir o vídeo no `README.md` é dica do próprio briefing.
- **Critério 2 — versionamento: 1,00.** Branches e commits padronizados.
- **Critério 3 — organização do repositório: 1,00.** Estrutura de pastas e `README.md`.
- **Critério 5 — compatibilidade e classificação: 1,00.** Gêneros em comum, gêneros não explorados e faixa Alta, Média ou Baixa.
- Os outros 11 critérios valem 0,50 cada.

Três critérios não têm RF exclusivo: o **Critério 8**, que exige callback **e** closure — os dois, não um deles —; o **Critério 9** (estrutura da página HTML), compartilhado entre a RF01 e a RF13; e o **Critério 13**, que exige `fetch` com `try/catch` + `response.ok` tratando os três estados. Some cada um **uma única vez**: é por isso que a soma literal das tabelas do `docs/KANBAN.md` dá 11,50 em vez de 10,00.

---

## 11. Entregáveis Finais

Além do código, o projeto exige:

- `README.md` com o nome do software, o problema resolvido, as técnicas, como executar, a **diferença entre CommonJS (`require` e `module.exports`) e ESM (`import` e `export`)**, as escolhas de `const` e `let` e o escopo de bloco, e por que não usa `!important`. Registre também quais melhorias podem ser aplicadas e insira alguma imagem ou diagrama para melhorar o entendimento.
- Quadro Kanban publicado com link acessível.
- Vídeo de até 7 minutos, no Google Drive em modo leitor ou no YouTube como "não listado".
- **Três links no AVA:** repositório público, quadro Kanban e vídeo. Link não submetido gera penalidade.

Prazo: **05/10/2026 até 22h**, contado pela última atualização no repositório.

---

## 12. Referências — Mapa de Arquivos

| Caminho | O que é |
| --- | --- |
| `docs/KANBAN.md` | **O backlog e a fonte de verdade do estado do quadro.** 24 tarefas, 15 RFs rastreados e 24 itens de checklist |
| `docs/BRIEFING.md` | Transcrição pesquisável do briefing, extraída do PDF. Útil porque agentes não leem PDF. Substituída pelo PDF em qualquer divergência |
| `docs/AI_HANDOVER_CONTEXT.md` | Snapshot de handoff entre sessões de agente: estado do repositório, decisões tomadas e problemas abertos. Substituído a cada nova sessão |
| `docs/Projeto Avaliativo Final - Módulo 01 - Mobile React Native T1 - M1S13 (1).pdf` | O briefing original, 16 páginas. Fonte de verdade; `docs/BRIEFING.md` é a cópia pesquisável |
| `.gitattributes` | Força LF em `md`, `js`, `css` e `html`, e CRLF em `bat`. Não remover |
| `index.html`, `css/style.css`, `js/script.js`, `js/ui.js`, `js/modelo.js`, `assets/main.png`, `package.json` | A aplicação e o `package.json` do `live-server`. O estado da implementação vive no `docs/KANBAN.md`, não aqui |
| `run_opencode_web.bat` | Sobe o `opencode web` em `127.0.0.1:4096`, sem senha e sem `.env`. Conveniência local |
| cinematch_antigo/class.js, cinematch_antigo/cinematch.js, cinematch_antigo/catalogo.js | Entrega da semana 6 e base da lógica: classes, compatibilidade, closure, callback e setTimeout. Não editar; consultar conforme a seção 2.1 |
| cspell.json | Dicionário de termos em pt-BR para o Code Spell Checker. Configuração de editor, não entra na aplicação |
| `.opencode/plans/` | Planos de implementação, quando houver |

### Resumo de convenções

Índice rápido das regras cujo porquê está na seção correspondente deste arquivo.

- Sem framework de JavaScript e sem CSS Grid: só HTML5, CSS3 com Flexbox e JavaScript puro.
- Módulos ES nativos, com `import` e `export`, nunca `require` nem `module.exports`.
- Template literal, com crase e `${}`, em toda string que interpola valor.
- `const` por padrão; `let` somente quando o valor realmente muda.
- Sem `console.log` no código entregue — o professor afastou esse requirement do briefing.
- Sem `!important`: ajuste o seletor ou apague a regra.
- `localStorage` sempre em `try/catch`, com `removeItem` liberado e `clear()` proibido.
- Versione arquivo por nome explícito, com `git add <arquivo>`.

> **Regra de precedência:** quando este arquivo, o `docs/KANBAN.md` e o PDF divergirem, o **PDF vence** — é o briefing do professor. Corrija os outros dois. Para o *como* escrever o código, a fonte de verdade é a seção 2.1.
