# Contexto de Handover — CineMatch Web

> Gerado em **27/09/2026**. Commit base: **`e6085eb`**. Branch no momento da escrita: `feature/cinematch-web-interface`.

## O que este arquivo é

Este é um **snapshot de uma sessão específica**, não um documento de projeto. Ele registra o estado do repositório ao fim de uma sessão de agente, as decisões que foram tomadas e o motivo delas, o que ainda está errado e o que fazer agora.

Ele **não** substitui nada:

- **`AGENTS.md`** continua sendo a fonte de verdade do **workflow** dos agentes — stack, regras do quadro, fluxo de Git, convenções.
- **`docs/KANBAN.md`** continua sendo a fonte de verdade do **estado** das tasks — o checkbox da linha é o único registro válido.
- O **PDF do briefing** continua sendo a fonte de verdade do **que é exigido**.

O que este arquivo acrescenta é o **raciocínio** e a **memória de pesquisa** da sessão: fatos já apurados que a próxima sessão não precisa rederivar, e erros de agente que já custaram tempo. **Substituir a cada nova sessão.** Se um número aqui não bater com o que você encontrar no repositório, o repositório vence: atualize este arquivo.

---

## 1. O projeto

### Contexto e prazo

CineMatch Web — recomendação de séries em tempo real. Projeto avaliativo final da disciplina *Desenvolvimento Mobile — React Native*, **Módulo 01, Semana 13**, professor **Matheus de Nadai**. É a evolução do CineMatch JS da semana 6, que rodava no terminal Node.js com catálogo fictício.

| Dado | Valor |
| --- | --- |
| Peso na nota | **60% da nota do módulo** — 15 critérios somando 10,00 pontos |
| Prazo | **05/10/2026 até 22h**, contado pela última atualização no GitHub |
| Margem no momento desta escrita | cerca de **8 dias** |
| API de catálogo | TVMaze — `https://api.tvmaze.com/shows?page=0` (pública, sem chave) |

### Restrição de stack — domina tudo

**Permitido:** HTML5 semântico, CSS3 com **Flexbox**, JavaScript com **módulos ES nativos** (`import`/`export`), `fetch`, `localStorage`, `live-server` via npm.

**Proibido:** React, Next.js, qualquer outro framework JS, TypeScript, bundlers e build, **CSS Grid**, Sass, CSS-in-JS, back-end, servidor ou banco de dados, jQuery, axios.

O nome da disciplina engana: o Módulo 01 é **HTML + CSS + JS puros**. O briefing só mencionou Flexbox, então **não use CSS Grid**. Usar item proibido zera o mérito do módulo.

---

## 2. Estado do Git — verificado em 27/09/2026

### Commits desta sessão

Todos já **publicados por push do usuário**.

| Commit | Mensagem |
| --- | --- |
| `cc23395` | `docs: adiciona seção 2.1 com a fonte de verdade do código das aulas` |
| `b0f7284` | `docs: ajusta marcadores de ênfase e separador das linhas do quadro` |
| `567509b` | `docs: adiciona transcrição do briefing e fixa a versão do live-server` |
| `e6085eb` | `chore: corrige marcação do briefing e o schema do cspell` |

### Branches

`git for-each-ref refs/heads` e `refs/remotes`, em 27/09/2026:

| Branch | Commit | Observação |
| --- | --- | --- |
| `develop` | `e6085eb` | — |
| `feature/cinematch-web` | `7e36d38` | 5 commits de merge à frente da `develop`, mas **árvore idêntica** — `git diff --name-only 7e36d38 e6085eb` retorna zero arquivos. Mesmo conteúdo, grafo diferente |
| `feature/cinematch-web-interface` | `e6085eb` | branch corrente |
| `main` | `e47b81d` | **17 commits atrás** de `develop` (`git rev-list --count main..develop`) |

Os commits da `develop` já foram incorporados às branches de feature. **Nada foi mergeado na `main`** — comportamento correto: o `AGENTS.md` proíbe merge na `main` antes do fim do projeto.

### Working tree

**Limpa.** `git status --short` não retorna nada: nenhum arquivo modificado e nenhum untracked no momento da verificação.

---

## 3. O que foi feito nesta sessão

1. **`AGENTS.md` §2.1 — "Fonte de verdade do código"** (+65 linhas; o arquivo ficou com 308 linhas). Subseção nova, inserida depois da Seção 2, sem renumerar as demais. Contém: as duas fontes curriculares, a regra de precedência, tabela RF→arquivo de referência para RF02 a RF14, a lista do que **não** foi ensinado, e a tabela de conflitos entre o que o curso ensina e o que o briefing proíbe.
2. **`docs/BRIEFING.md`** (534 linhas) — transcrição pesquisável das 16 páginas do PDF do briefing, criada porque agentes não conseguem ler PDF. Contém os 15 RFs, as seções 5.1 a 5.8, os critérios de avaliação e o checklist de entrega. É **transcrição, não resumo**: nenhuma palavra do professor foi alterada, inclusive onde o texto está gramaticalmente quebrado.
3. **Correção de lint** — 4 erros `MD036` no `BRIEFING.md` (ênfase forte em linha isolada convertida em heading) e 3 erros de schema no `cspell.json` (`"version": 0` → `"0.2"` e `"language": ["en","pt-br"]` → `"en,pt-br"`). **Nenhuma regra foi silenciada:** não existe `.markdownlint.json` nem comentário `markdownlint-disable`.
4. **`package-lock.json` versionado** — trava `live-server` em 1.2.2, que é a versão que o RF15 do briefing especifica literalmente.

---

## 4. A lição mais importante desta sessão

### Dois fatos afirmados errados

Um agente anterior **afirmou dois fatos errados** numa seção que existe justamente para não afirmar fatos errados:

1. Escreveu que `??` não aparecia em nenhum dos dois repositórios das aulas. **Aparece** — em `cinematch_antigo/cinematch.js:211`, no cálculo do próximo id. Ele não foi ensinado, mas existe.
2. Escreveu que os `.js` de `semana-12/modulos/` ainda estavam em CommonJS. **Já são ESM**: `index.js` faz `import`, `slug.js` faz `export`, e o `package.json` já tem `"type": "module"`. O professor corrigiu o exercício no commit `a413b0c`, de 18/09/2026.

Nos dois casos o agente **tinha a evidência na tela e escreveu o contrário**. Ambos foram encontrados pelo code review, um por um.

### A regra que decorre

**Assertar de memória é o modo de falha mais provável neste projeto.** Toda afirmação factual nova precisa ser conferida contra o arquivo antes de virar texto de documentação. Se você não abriu o arquivo, você não sabe — escreva "não verificado" em vez de arriscar.

### Um erro de processo

O mesmo agente rodou `git restore docs/KANBAN.md` ao achar que um subagente tinha escrito fora do escopo — e as edições eram do usuário, feitas em paralelo. Não houve perda (o usuário reaplicou), mas a decisão foi tomar **ação destrutiva sobre trabalho do usuário sem perguntar**.

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

> **Atenção ao verificar fatos:** só `cinematch_antigo/` está clonado neste repositório. O repositório das semanas **não está** — os caminhos `semana-XX/...` citados abaixo só podem ser conferidos acessando o repositório remoto, não a partir desta cópia de trabalho.

---

## 6. Fatos já verificados — não rederive

| Fato | Onde |
| --- | --- |
| `??` aparece 1×, e não foi ensinado | `cinematch_antigo/cinematch.js:211` |
| `semana-12/modulos/` já é ESM | `index.js` faz `import`, `slug.js` faz `export`, `package.json` com `"type": "module"`; commit `a413b0c`, 18/09/2026 |
| `normalizarTexto()` | `cinematch_antigo/cinematch.js:284`, **não** em `catalogo.js` |
| Globais implícitos quebram em módulo ES | `cinematch_antigo/cinematch.js` linhas 31, 171 e 330 |
| `!important` não é conflito: o curso já proíbe | única ocorrência é um comentário em `semana-10/exercicio-especificidade/style.css:116` |
| `semana-11/ceu-aberto/script.js` não tem `try/catch` | 69 linhas, zero `try`/`catch` |
| `og:` e `meta description` só no `ceu-aberto` | os `index.html` das semanas 09 e 10 têm `lang`, `<title>` e landmarks, mas zero `og`/`description` |
| Briefing não menciona LF/CRLF, encoding nem `.gitattributes` | varredura das 16 páginas, zero ocorrências |
| Escopo real do versionamento (5.6) | branches mínimas, mínimo 5 commits individual / 8 squad, prefixos exemplificados (`feat:`, `style:`, `docs:`), fluxo até a `main` |

---

## 7. Problemas abertos

1. **Duas imagens do briefing não são verificáveis por texto.** O wireframe (Seção 3) e a **estrutura de pastas** (Seção 5.2) são figuras no PDF. A Seção 3 do `AGENTS.md`, que descreve `js/`, `css/`, `assets/` e `index.html` na raiz, é **derivada, não comprovada** pela transcrição. Alguém precisa abrir a página da Seção 5.2 no PDF e conferir com os olhos antes de apresentar isso como exigência do professor no vídeo.

2. **A lógica da semana 6 ainda não foi portada.** `js/modelo.js` (13 linhas), `js/script.js` (25 linhas) e `js/ui.js` (13 linhas) são placeholders. É o próximo trabalho de verdade.

3. **Lacuna do `.gitattributes`:** a regra cobre `md`, `js`, `css`, `html` e `bat`, mas **não** `*.json`. Com `core.autocrlf=true`, o `package.json` e o `cspell.json` ficam CRLF em disco e o Git emite `LF will be replaced by CRLF` ao tocá-los. Não quebra nada — o índice grava LF e o status fica limpo. É cosmético, e a decisão é do usuário; ainda não foi tomada.

4. **Divisão de trabalho e WIP.** O `docs/KANBAN.md` marca `M1-T03` e `M1-T04` como "por Lucas" e `M1-T05` como "por Tiago" — dois nomes distintos, o que indica squad de 2. A divisão segue exatamente o que o `AGENTS.md` §5 descreve: HTML e CSS da mesma tela são tasks acopladas e compartilham um slot, enquanto a task de lógica ocupa o outro. Com 3 tasks em *Em Andamento*, o WIP está **no teto** que a regra define para squad de 2, e **2 acima** do limite de 1 do trabalho solo. O que falta confirmar com o usuário é se o squad ainda tem 2 pessoas ativas — disso dependem o WIP e a contagem mínima de commits (**5 no individual, 8 no squad**).

---

## 8. Estado das tasks

| Coluna | Tasks | Quantidade |
| --- | --- | --- |
| Concluído | `M1-T00`, `M1-T01` | 2 |
| Em Andamento | `M1-T03`, `M1-T04`, `M1-T05` | 3 |
| A Fazer | `M1-T02` e `M1-T06` a `M1-T23` | 19 |
| Backlog | 8 itens de bônus, sem ID — não contam nota | 8 |

Total: 24 tarefas (`M1-T00` a `M1-T23`) + 8 itens de Backlog.

O checklist final de entrega do `KANBAN.md` tem 24 itens, dos quais **23 estão pendentes** — só "Criei o quadro Kanban" está marcado. Os itens de entrega ainda zerados são os três mais pesados do projeto: **vídeo de até 7 minutos** (peso 1,50), **quadro Kanban publicado com link** e **os três links no AVA**.

---

## 9. Gotchas do ambiente Windows

- **O console do PowerShell corrompe acentuação na saída** — acentos e cedilhas aparecem como `?` ou como um caractere de substituição Unicode (`U+FFFD`) no terminal, mesmo que o arquivo esteja correto em UTF-8. **Nunca** "conserte" acentuação que só está errada na tela do terminal: isso corromperia o arquivo de verdade.
- **`Measure-Object -Line` conta só linhas não-vazias.** Use `$a = Get-Content <arquivo>; $a.Count` para a contagem real.
- **Comandos negados por permissão:** `python -c`, `node -e`, `sed`, `awk`, `tee`, `cat >`, `Set-Content`, `Out-File`. Grave um script em arquivo e execute. O diretório externo para trabalho temporário é `C:\Users\Tiago\AppData\Local\Temp\opencode` — o único lugar fora do repositório onde escrita é permitida.
- **O modelo não lê PDF.** Para extrair, use `pypdf` (instalado, versão 6.15.0) a partir de um script gravado.
- **`core.autocrlf=true` nesta máquina.** É a causa do comportamento de CRLF no `*.json` descrito no problema 3.
- `cspell.json` é configuração do Code Spell Checker, não faz parte da aplicação. Não entra em nenhum RF.

---

## 10. Próximos passos sugeridos

1. **Confirmar o tamanho do squad** — se ainda são 2 pessoas ativas. Disso dependem o limite de WIP e a meta de commits: **5 no individual, 8 no squad**.
2. **Conferir a branch antes de começar a lógica.** A branch corrente é `feature/cinematch-web-interface`, mas a `M1-T05` (modelagem do perfil, marcada "por Tiago") é task de **lógica**, e o `AGENTS.md` §6 atribui lógica a `feature/cinematch-web` e interface a `feature/cinematch-web-interface`. Confirmar com o usuário se a `M1-T05` deve ser feita na branch de lógica.
3. **Portar a lógica da semana 6 para módulos ES:** as classes `Conteudo` e `Serie extends Conteudo` em `js/modelo.js`, e a compatibilidade com `compatibilidade()` e `obterConteudosPorGenero()` em `js/script.js`. **Porte a lógica, não o estilo**: o `cinematch.js` é código de terminal e usa globais sem declarar (linhas 31, 171 e 330), que quebram com `ReferenceError` em módulo ES. Declare com `let` ou `const` ao portar.
4. **Abrir a Seção 5.2 do PDF** e conferir a estrutura de pastas com os olhos, antes de apresentá-la como exigência do professor.
5. **Push é decisão do usuário.** Nunca fazer push sem pedido explícito.
