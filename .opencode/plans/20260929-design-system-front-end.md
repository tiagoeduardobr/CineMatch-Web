# Plano de implementação — Design system do front-end do CineMatch Web

**Data:** 29/09/2026
**Branch:** `feature/cinematch-web-interface` (fixa do squad — `AGENTS.md` §6. Não criar branch nova.)
**Escopo:** `index.html`, `css/style.css` e `docs/`. **Nada em `js/`.**
**Base de medição:** `develop` — `css/style.css` com 540 linhas, `index.html` com 225 linhas, `docs/KANBAN.md` com 215 linhas.

---

## 0. Por que este plano existe

Um `task-planner` produziu uma estrutura com três erros factuais medidos (tabela de mapeamento com variáveis inexistentes, inventário de hex inexistente e mapeamento mecânico que invertia a hierarquia de texto). Este plano usa **somente dados medidos nesta sessão**, com `Select-String`, e registra as divergências encontradas entre os dados recebidos e a medição real.

### 0.1 Divergências medidas (o medido vence)

| Dado recebido | Medido em `develop` | Efeito no plano |
| --- | --- | --- |
| `--cine-bg`: 5 usos | **2** (L83 `body`, L201 `.capa`) | contagem corrigida no mapeamento |
| `--cine-panel`: 4 usos | **2** (L261 `.cartao-login, .cartao-perfil`, L417 `.cartao-filme`) | idem |
| `--cine-line`: 9 usos | **6** (L259, 316, 361, 381, 414, 479) | idem |
| `--cine-gold`: 15 usos | **13** (L134, 145, 182, 277, 327, 335, 337, 351, 366, 391, 415, 457, 473) | `--cor-dourado` fica com **15**, não 17 |
| `--cine-line-nav`: 3 usos | **1** (L99, `border-bottom` da navbar) | **piora** o risco da inversão de hierarquia — ver 0.2 |
| "hoje só a navbar tem `:focus-visible`" | **falso** — `:focus-visible` de campos e botões já existe em **L323-329** | o que falta é `:focus` puro e `transition: border-color` |
| grade de 3 colunas no desktop | hoje são **2 colunas**: `flex: 1 1 calc(50% - 8px)` (L521-523) | T5 muda 2 → 3; é decisão de design, não refactor |
| item ativo da nav | **não existe** — nenhum `aria-current` nem classe `.ativo` no `index.html` | a classe fica disponível sem efeito, sem inventar JS |

Confirmados sem divergência: 540 linhas; 13 variáveis em L58-72; cabeçalho em L1-56; media queries em L219 / L484 / L526; **zero hex fora do `:root`**; exatamente 5 `rgba()` fora do `:root`; `.genero` em L375; 3 `<h2>` em L98, L130 e L195; `<footer>` em L219; `M1-T24` é o próximo ID livre.

### 0.2 Risco registrado — inversão de hierarquia de borda

O mapeamento manda `--cine-line-nav` (alfa **0.22**) → `--cor-borda-forte` (alfa **0.55**). Com a medição real, esse token tem **um único consumidor**: o `border-bottom` da navbar. O efeito é o oposto do que 3 usos amorteceriam: a **única** borda da página passaria de discreta para a mais forte do design system, enquanto cards e campos ficam em 0.28. O plano **segue o mapeamento pedido** (é decisão do usuário), registra a inversão na nota de progresso da `M1-T24` e deixa a reversão para um único token como ajuste de uma linha.

### 0.3 Decisões que exigem conta explícita

**D1 — Gap da grade no desktop.** Duas contas fecham exatamente. Escolhi **A**:

| | conta | aritmética | veredito |
| --- | --- | --- | --- |
| **A (escolhida)** | `gap: 21px` + `flex: 1 1 calc(33.333% - 14px)` | 3 × (33.333% − 14px) = 99.999% − 42px; 2 gaps × 21px = 42px; **total 99.999%** | fecha; 0.001% ≈ 0,011px a 1100px, arredondado a 0 pelo navegador (base flex arredondada a 1/64px), então **não** quebra o `flex-wrap` |
| B | `gap: 28px` + `flex: 1 1 calc((100% - 56px) / 3)` | 3 × ((100% − 56px)/3) = 100% − 56px; 2 gaps × 28px = 56px; **total 100%** | matematicamente exato, mas introduz divisão em `calc()` |

**Motivo de escolher A:** (1) é a conta do próprio spec e o arquivo já usa só subtração em `calc()` (L502 `calc(50% - 9px)`, L522 `calc(50% - 8px)`) — dividir dentro de `calc()` é um padrão que não existe no arquivo e provavelmente não foi ensinado, e o `AGENTS.md` §2.1 manda não usar o que não foi ensinado; (2) o resíduo de 0.001% é irrelevante na prática; (3) manter o gap de 21px **dentro** do `@media (min-width: 769px)` preserva o `gap: 16px` da coluna no mobile, que é onde ele é usado.

**D2 — Ordem das media queries.** Mover as três para o fim do arquivo é seguro, **preservando a ordem relativa atual**: `max-width: 768px` → `min-width: 769px` → `max-width: 560px`.

- 768 e 769 são **mutuamente exclusivos** → a ordem entre eles é irrelevante.
- 560 é **subconjunto** de 768 (ambas casam a 500px) → **560 precisa vir depois de 768** para vencer o desempate por cascata (mesma especificidade, vence a última). A ordem atual já é a correta.
- **Não inverter a estratégia da navbar.** A navbar e a capa refinam por `max-width: 768px` (**desktop-first**); login, perfil e cards partem do mobile e estendem por `min-width: 769px` (**mobile-first**). Isso é uma **ilha conhecida**, deliberada e já documentada no cabeçalho do CSS. Registrar como dívida, não corrigir.

**D3 — Cápsula `.genero` marcada.** Com o `<input>` **dentro** do `<label>`, não existe forma de a CSS estilizar o label a partir do checkbox **sem** `:has()`: o CSS não sobe de filho para pai. O `:has()` está proibido. Duas saídas reais:

| | solução | custo | veredito |
| --- | --- | --- | --- |
| **A (escolhida)** | o JS da `M1-T05` alterna `.genero--selecionado` via `classList` no `change` | nenhuma mudança no HTML; a `M1-T05` já tem o ponto de listener | **escolhida** |
| B | reescrever os 10 `<label class="genero">` para `<input>` + `<label for>` irmãos e estilizar com `input:checked + .genero` | mexe no HTML da `M1-T03` (que está *Em Andamento*); sai do padrão de `<label>` envolvendo o `input` | rejeitada |

**A vira contrato público:** `.genero--selecionado` é declarado no CSS, documentado no cabeçalho e registrado na `M1-T24` para o parceiro. Degradar sem JS é seguro — a cápsula fica no visual não marcado.

**D4 — `--cor-dourado-escuro` (`#9c7743`).** Design system não carrega token órfão. **Uso honesto encontrado:** ele fecha a **escala de 3 degraus do badge de compatibilidade**, em que o dourado mais escuro marca a faixa mais fraca — a cor escurece quando a afinidade cai, o que é semanticamente coerente com o RF07.

- `.badge-alta` → `var(--cor-dourado-claro)` · `.badge-media` → `var(--cor-dourado)` · `.badge-baixa` → `var(--cor-dourado-escuro)`

Se, ao implementar T5, o JS do parceiro não consumir `badge-baixa`, **remover o token** e registrar o motivo na nota de progresso — não deixar declarado sem uso.

---

## 1. Contrato CSS ↔ JS (lido de `js/ui.js` L244-261, não inventado)

O `js/ui.js` do parceiro já declara, em comentário, as classes que o CSS precisa estilizar. Este plano satisfaz esse contrato.

| Classe | O que é | Onde é definida |
| --- | --- | --- |
| `#resultados` | container dos cards | `index.html` L200 |
| `.card-serie` | o `article` de cada card | **T5** — substitui `.cartao-filme` |
| `.badge` | elemento da classificação | **T5**, sobre a mídia |
| `.badge-alta` / `.badge-media` / `.badge-baixa` | uma classe por faixa | **T5** |
| `.genero--selecionado` | cápsula marcada | **T6** — contrato novo, este plano |

Os **10 `data-campo`** do template são `poster`, `title`, `rating`, `releaseDate`, `duration`, `genres`, `synopsis`, `status`, `platform`, `url`. **Nenhum pode ser apagado** — o JS do parceiro os preenche.

> ⚠️ **Portão de segurança antes de renomear:** o `id="template-card-filme"` e o `data-tipo="filme"` são referenciados por algum `.js`? A verificação de T5 responde isso. Se houver referência, **renomear só a classe** e manter `id` e `data-tipo`.

---

## T0 — Fast-forward da branch de interface · **PRÉ-REQUISITO DURO**

Sem esta task, **todas as outras editam a versão errada do arquivo**: a branch está 18 commits atrás e ainda carrega o `css/pages.css` removido em `fe33524`.

**Arquivos:** nenhum editado. É operação de branch.

- [ ] Confirmar o bloqueio: `git rev-list --count feature/cinematch-web-interface..develop` → 18, e `git rev-list --count develop..feature/cinematch-web-interface` → 0
- [ ] Confirmar que o fast-forward é seguro: `git merge-base --is-ancestor feature/cinematch-web-interface develop`
- [ ] Estar em `feature/cinematch-web-interface`
- [ ] Fazer o merge: `git merge --ff-only develop`
- [ ] Confirmar que o `css/pages.css` sumiu: `git ls-tree --name-only HEAD css/` deve listar **só** `css/style.css`
- [ ] Confirmar a linha de base: `css/style.css` tem **540** linhas e o `:root` tem **13** variáveis em L58-72

**Verificação**

Run:
```powershell
git rev-list --count develop..feature/cinematch-web-interface
git ls-tree --name-only HEAD css/
$a = Get-Content css\style.css; $a.Count
```
Expected: `0`; `css/style.css` e nada mais; `540`.

---

## T1 — Registrar a `M1-T24` no quadro · **antes de qualquer código**

O `AGENTS.md` §5 exige task no quadro **antes** de existir. `M1-T24` é o próximo ID livre (o quadro vai até `M1-T23`); IDs nunca são reaproveitados.

**Arquivos:** `docs/KANBAN.md`

- [ ] **Cabeçalho (L17):** `24 tarefas (M1-T00 a M1-T23)` → `25 tarefas (M1-T00 a M1-T24)`
- [ ] **L26 (legenda):** `vai até M1-T23` → `vai até M1-T24`
- [ ] **Coluna *A Fazer*:** acrescentar `M1-T24` com `- [ ]`, **sem** bloco de proveniência (task em *A Fazer* não o leva), **sem** marcar como concluída
- [ ] **Rastreabilidade:** `M1-T24` é de bônus de interface fora do escopo do briefing — **não** entra na tabela de RF nem na de critérios notados; acrescentar uma linha na nota de cobertura dizendo que ela é bônus sem nota
- [ ] **Registrar na `M1-T24` o contrato CSS ↔ JS** da seção 1 deste plano, mais os 10 `data-campo` intocáveis
- [ ] **Registrar na `M1-T24` as duas inversões** medidas: a hierarquia de borda (0.22 → 0.55 em um único consumidor) e a inversão de texto (`--cine-text-soft` → `--cor-texto`, `--cine-text` → `--cor-texto-secundario`)
- [ ] **Registrar a decisão D3**: `.genero--selecionado` é contrato público, alternado pela `M1-T05`
- [ ] **Nenhuma task existente muda de coluna nem de checkbox** — em especial `M1-T02`, `M1-T04`, `M1-T12` e `M1-T16` continuam exatamente como estão

**Verificação**

Run:
```powershell
Select-String -Path docs\KANBAN.md -Pattern '25 tarefas'
Select-String -Path docs\KANBAN.md -Pattern '^- \[ \] `M1-T24`'
Select-String -Path docs\KANBAN.md -Pattern '^- \[x\]' | Measure-Object | Select-Object -ExpandProperty Count
```
Expected: `25 tarefas` em 1 linha; `M1-T24` em *A Fazer* com `- [ ]` em 1 linha; contagem de `- [x]` continua sendo **3**, e o **3** se decompõe em `M1-T00` e `M1-T01`, já concluídas, mais o item de checklist `- [x] Criei o quadro Kanban` da seção de checklist final — medido nesta sessão em L126, L127 e L211. O ponto da verificação é que o número **não muda**: T1 acrescenta `- [ ]` e nada marca como concluído.

> **Armadilha conhecida e já documentada no handoff:** contar checkbox com substituição ingênua dá 5 e 56, ambos errados. Conte **por coluna**, nunca no total.

---

## T2 — Reordenar as media queries para o fim do arquivo

Task estrutural, feita **antes** das novas regras para que tudo o que vier depois caia num bloco contíguo antes delas.

**Arquivos:** `css/style.css`

- [ ] Recortar o bloco `@media (max-width: 768px)` (L219-246) inteiro, sem alterar seu conteúdo
- [ ] Recortar o bloco `@media (min-width: 769px)` (L484-524) inteiro
- [ ] Recortar o bloco `@media (max-width: 560px)` (L526-540) inteiro
- [ ] Colar os três no fim do arquivo **nesta ordem**: 768 → 769 → 560 (é a ordem relativa atual, e 560 precisa vir depois de 768)
- [ ] Remover a linha em branco solta antes do `}` do bloco de 768 (hoje L244-246)
- [ ] **Não inverter a estratégia da navbar** — a navbar continua em `max-width` (desktop-first), o resto em `min-width` (mobile-first). Registrar como ilha conhecida, conforme D2
- [ ] Não alterar nenhuma regra dentro dos três blocos nesta task

**Verificação**

Run:
```powershell
Select-String -Path css\style.css -Pattern '^@media' | ForEach-Object { "$($_.LineNumber): $($_.Line.Trim())" }
Select-String -Path css\style.css -Pattern '^\t\.barra-navegacao \{' | ForEach-Object { $_.LineNumber }
Select-String -Path css\style.css -Pattern '^@media \(max-width: 768px\)' | ForEach-Object { $_.LineNumber }
```
Expected: **exatamente 3** linhas, em ordem ascendente, sendo `max-width: 768px` < `min-width: 769px` < `max-width: 560px`; o `.barra-navegacao` indentado com **tab** aparece **1 vez**, com número de linha **maior** que o da regra base (L88) — provando que a navbar ficou dentro da media query `max-width`; e `^@media \(max-width: 768px\)` aparece **1 vez**.

> ⚠️ **Os dois primeiros padrões precisam de `^`.** O cabeçalho do CSS (L13 e L15) **explica em prosa** a estratégia das duas media queries, e o termo `@media` aparece lá. Buscar o termo solto devolve **5** linhas em vez de 3, e a verificação passa a ser inútil. O mesmo vale para `max-width: 768px` solto, que casa a L13. Já medido nesta sessão.

> ⚠️ Precisa de navegador para confirmar que nada mudou visualmente nos três breakpoints.

---

## T3 — Paleta nova, literais órfãos e cabeçalho do CSS

**Arquivos:** `css/style.css`

> ⚠️ **T2 desloca em −28 todas as referências ≥ 219: localize por seletor, não por número de linha.** T2 é pré-requisito duro desta task e reinsere o bloco `@media (max-width: 768px)` no fim do arquivo, de modo que tudo o que hoje está em L219 ou depois passa a estar 28 linhas acima. Os números desta task — a coluna de 3.1 e as referências de 3.2 — foram medidos no arquivo **antes** de T2: as **contagens de uso seguem válidas**, e só as **posições** envelhecem. Localize por seletor (`.capa`, `.botao-navegacao--perfil`, `.cartao-login`, e assim por diante), nunca pelo número. O `:root` de 3.1 (L58-72) e o cabeçalho de 3.3 (L1-56) ficam **abaixo** de 219 e não se movem.

### 3.1 `:root` (L58-72) — substituição integral, sem convivência

- [ ] Substituir o bloco `:root` inteiro pelas **13** variáveis da paleta nova, em ordem: `--cor-fundo`, `--cor-fundo-secundario`, `--cor-card`, `--cor-card-hover`, `--cor-dourado`, `--cor-dourado-claro`, `--cor-dourado-escuro`, `--cor-texto`, `--cor-texto-secundario`, `--cor-texto-muted`, `--cor-borda`, `--cor-borda-forte`, `--cor-sombra`

**Valores literais dos 13 tokens — a fonte é a paleta do design system, e estes são os valores, na mesma ordem da lista acima:**

| Token | Valor | Forma |
| --- | --- | --- |
| `--cor-fundo` | `#050505` | hex |
| `--cor-fundo-secundario` | `#0b0b0b` | hex |
| `--cor-card` | `#111111` | hex |
| `--cor-card-hover` | `#171717` | hex |
| `--cor-dourado` | `#d9ae6d` | hex |
| `--cor-dourado-claro` | `#e8c88f` | hex |
| `--cor-dourado-escuro` | `#9c7743` | hex |
| `--cor-texto` | `#eee3d5` | hex |
| `--cor-texto-secundario` | `#bdb3a7` | hex |
| `--cor-texto-muted` | `#81786e` | hex |
| `--cor-borda` | `rgba(217, 174, 109, 0.28)` | **rgba** |
| `--cor-borda-forte` | `rgba(217, 174, 109, 0.55)` | **rgba** |
| `--cor-sombra` | `rgba(0, 0, 0, 0.55)` | **rgba** |

- [ ] **A divisão entre `rgba()` e hex é fixa e é o que torna o "10 hex" da verificação derivável:** exatamente **3** tokens são `rgba()` — `--cor-borda` (alfa 0.28), `--cor-borda-forte` (alfa 0.55) e `--cor-sombra` (alfa 0.55) — e exatamente **10** são hexadecimais, os outros dez da tabela. Os três `rgba()` estão lá porque os três precisam de **alfa**; CSS não aplica alfa a um hex
- [ ] ⚠️ **`--cor-sombra` é `rgba(0, 0, 0, 0.55)` — o alfa é 0.55, não 0.28.** O `0.28` que circula neste plano é o `box-shadow` **antigo** de `css/style.css` L262 (`.cartao-login, .cartao-perfil`), listado em 3.2, e é o `box-shadow` antigo que está sendo **substituído** por `var(--cor-sombra)` — ele não é o valor do token
- [ ] Aplicar o mapeamento semântico (contagens **medidas**, não as recebidas):

| atual | → novo | usos medidos | seletor consumidor |
| --- | --- | --- | --- |
| `--cine-bg` | `--cor-fundo` | 2 | 83, 201 |
| `--cine-navbar` | **literal** `rgba(5, 5, 5, 0.85)` | 1 | 98 |
| `--cine-panel` | `--cor-card` | 2 | 261, 417 |
| `--cine-field` | `--cor-fundo-secundario` | 2 | 318, 429 |
| `--cine-line` | `--cor-borda` | 6 | 259, 316, 361, 381, 414, 479 |
| `--cine-line-nav` | `--cor-borda-forte` | 1 | 99 ⚠️ ver 0.2 |
| **`--cine-text-soft`** | **`--cor-texto`** | **7** | 106, 118, 164, 306, 383, 441, 467 |
| **`--cine-text`** | **`--cor-texto-secundario`** | **2** | 84, 319 |
| `--cine-muted` | `--cor-texto-muted` | 4 | 285, 452, 461, 480 |
| `--cine-btn-text` | `--cor-fundo` | 1 | 338 |
| `--cine-gold` | `--cor-dourado` | 13 | ver T3.1 |
| `--cine-gold-light` | `--cor-dourado` | 2 | 139, 184 |
| `--cine-gold-hover` | `--cor-dourado-claro` | 1 | 346 |

- [ ] **Não aplicar o mapeamento mecanicamente.** `--cine-text-soft` (#eee5d8) é o tom **mais claro** da paleta antiga e vai para `--cor-texto`; `--cine-text` (#e4ded4) é **mais escuro** e vai para `--cor-texto-secundario`. Inverter os dois inverteria a hierarquia de texto
- [ ] `--cor-dourado` termina com **15** usos (13 + 2), não 17

### 3.2 Literais fora do `:root` — os 5 `rgba()`, zero hex

- [ ] L183 `rgba(238, 227, 213, 0.12)` → `rgba(217, 174, 109, 0.12)` (`.botao-navegacao:hover/:focus-visible`)
- [ ] L189 `rgba(238, 227, 213, 0.2)` → `rgba(217, 174, 109, 0.2)` (`.botao-navegacao--perfil`)
- [ ] L194 `rgba(238, 227, 213, 0.3)` → `rgba(217, 174, 109, 0.3)` (`.botao-navegacao--perfil:hover`)
- [ ] L262 `rgba(0, 0, 0, 0.28)` → `var(--cor-sombra)` (`.cartao-login, .cartao-perfil`)
- [ ] L355 `rgba(232, 200, 143, 0.1)` → `rgba(217, 174, 109, 0.1)` (botão secundário `:hover`)
- [ ] **Nenhum hex solto** pode aparecer fora do `:root` — a medição confirmou que hoje não há nenhum
- [ ] Manter `font-family: Georgia, "Times New Roman", serif` no `body` sem alteração

### 3.3 Cabeçalho do CSS (L1-56) — reescrever

- [ ] Documentar os **13** tokens, um por linha, no lugar do bloco atual de L24-47, **pelo nome e pelo papel** (superfundo, texto principal, borda discreta, e assim por diante) — **sem repetir o valor literal**: o cabeçalho fica **antes** do `:root` no arquivo, e repetir hex lá faria a contagem de hex da verificação passar de 10 sem que nada estivesse errado
- [ ] Registrar a **hierarquia de profundidade** de superfície: `fundo` → `fundo-secundario` → `card` → `card-hover`
- [ ] Registrar a **hierarquia de texto** em 3 níveis e dizer explicitamente que ela é semântica, não por proximidade de luminância
- [ ] **Documentar a exceção da navbar**: `rgba(5, 5, 5, 0.85)` é literal porque `--cor-fundo-secundario` é **opaco** e mataria a translucidez exigida pelo spec; CSS não aplica alfa a um hex. É a **única** exceção
- [ ] Registrar os **raios**: 8px nos cards, 20px nas cápsulas
- [ ] Registrar os **breakpoints** 560 / 768 / 769, deixando explícito que **768 é o mobile**
- [ ] Registrar a **ilha mobile-first / desktop-first** da navbar (D2)
- [ ] **Manter** a explicação de por que não há `!important` (a divisão entre botão primário e contornado por `:last-of-type`, e o primário de `#form-perfil` por seletor de ID) e a proibição de CSS Grid
- [ ] **Manter** a nota de que este é o único bloco de variáveis do projeto

**Verificação**

Run:
```powershell
Select-String -Path css\style.css -Pattern 'var\(--cine-' | Measure-Object | Select-Object -ExpandProperty Count
Select-String -Path css\style.css -Pattern '#[0-9a-fA-F]{3,8}' | ForEach-Object { "$($_.LineNumber): $($_.Line.Trim())" }
Select-String -Path css\style.css -Pattern 'rgba\(238, 227, 213|rgba\(232, 200, 143|rgba\(0, 0, 0, 0\.28' | Measure-Object | Select-Object -ExpandProperty Count
Select-String -Path css\style.css,index.html -Pattern 'display:\s*grid|!important\s*;|:has\(|@import|grid-template|\.s[ac]ss' | Measure-Object | Select-Object -ExpandProperty Count
```
Expected: `0` (nenhum `--cine-` sobrevive); **10** hex — exatamente os 10 tokens hexadecimais da tabela de 3.1, todos dentro do bloco `:root` e nenhum depois dele, já que os outros 3 tokens da paleta são `rgba()` e o cabeçalho não repete literal; `0` (os 5 `rgba()` antigos foram substituídos); `0` na varredura de proibidos.

> ⚠️ **A varredura de proibidos usa `!important\s*;`, e não o termo solto.** O cabeçalho do CSS (L49 e L54) **explica por que não há `!important`** — e essa explicação é obrigatória. Buscar o termo solto dá 2 falsos positivos. A forma com `;` casa só a declaração real.

> ⚠️ Precisa de navegador: hover de navbar, hover do botão primário e do secundário, e a translucidez da navbar sobre a capa.

---

## T4 — Card vertical `.card-serie` e badge de classificação

Spec itens 7 e 10. Renomeia a família `*-filme` → `*-serie` e satisfaz o contrato de `js/ui.js` L244-261.

**Arquivos:** `index.html` (template L201-215), `css/style.css` (blocos `.resultados`, `.cartao-filme`, `.cartaz-filme`, `.conteudo-filme`, `.titulo-filme`, `.metadados-filme`, `.generos-filme`, `.nota-filme`, `.sinopse-filme`, `.status-filme`, `.plataforma-filme`, `.link-filme` e as regras dentro das duas media queries)

### 4.1 Portão — medir antes de renomear

- [ ] `Select-String -Path js\*.js -Pattern 'template-card-filme|cartao-filme|cartaz-filme|conteudo-filme|titulo-filme|metadados-filme|generos-filme|nota-filme|sinopse-filme|status-filme|plataforma-filme|link-filme|data-tipo'`
- [ ] **Se não houver match:** renomear classe, `id` e `data-tipo` livremente
- [ ] **Se houver match:** renomear **apenas as classes** e manter `id="template-card-filme"` e `data-tipo="filme"`; registrar a decisão na nota de progresso da `M1-T24`

### 4.2 HTML — redesenhar a hierarquia visual mantendo os 10 `data-campo`

- [ ] `<div id="template-card-filme" class="cartao-filme">` → `<article id="template-card-serie" class="card-serie" hidden>` (sujeito a 4.1). `article` porque o RF08 pede um `article` por série
- [ ] Criar o invólucro `<div class="midia-serie">` envolvendo a imagem — é ele que recebe `position: relative` para o badge ficar sobre a mídia
- [ ] `.cartaz-filme` → `.cartaz-serie` com `data-campo="poster"` **presente**
- [ ] Acrescentar o badge **dentro** de `.midia-serie`, depois da `<img>`: `<span class="badge badge-media">Média</span>` — a classe de faixa é a que o JS sobrescreve
- [ ] `.conteudo-filme` → `.conteudo-serie`; `.titulo-filme` → `.titulo-serie` (`data-campo="title"`); `.metadados-filme` → `.metadados-serie` com `data-campo="rating"`, `releaseDate` e `duration`; `.generos-filme` → `.generos-serie` (`data-campo="genres"`); `.sinopse-filme` → `.sinopse-serie` (`data-campo="synopsis"`); `.status-filme` → `.status-serie` (`data-campo="status"`); `.plataforma-filme` → `.plataforma-serie` (`data-campo="platform"`); `.link-filme` → `.link-serie` (`data-campo="url"`)
- [ ] **Os 10 `data-campo` continuam presentes.** Nenhum apagado, nenhum renomeado
- [ ] O `hidden` continua no template

### 4.3 CSS — o card vertical

- [ ] `.card-serie`: `display: flex`, `flex-direction: column`, `overflow: hidden`, `background: var(--cor-card)`, `border: 1px solid var(--cor-borda)`, `border-radius: 8px`, `box-shadow: 0 10px 30px var(--cor-sombra)`
- [ ] `.card-serie[hidden] { display: none; }` — obrigatório: o `display: flex` acima sobrescreveria o `display: none` do atributo `hidden`
- [ ] `.midia-serie { position: relative; }`
- [ ] `.cartaz-serie`: `width: 100%`, `aspect-ratio: 2 / 3`, `object-fit: cover`, **`display: block`** (mate o gap de linha de base), `background: var(--cor-fundo-secundario)`
- [ ] `.card-serie:hover`: `background: var(--cor-card-hover)` e `border-color: var(--cor-borda-forte)`, com a linha de transição **escrita exatamente assim**: `transition: background-color 0.2s ease, border-color 0.2s ease;` — ⚠️ **a ordem é fixa, `background-color` primeiro.** A verificação de T6 conta as linhas que casam com o padrão `transition: border-color`, e essa contagem só dá 1 se a lista **não** começar por `border-color`; invertendo a ordem o mesmo código passaria a dar 2, sem que nada estivesse errado
- [ ] `.conteudo-serie`: `display: flex`, `flex-direction: column`, `gap: 9px`, `padding: 16px`, `min-width: 0`
- [ ] `.titulo-serie`: `color: var(--cor-texto)`, `font-size: 18px`, `font-weight: 400`
- [ ] `.metadados-serie` e `.generos-serie`: `display: flex`, `flex-wrap: wrap`, `gap: 8px`, `color: var(--cor-texto-muted)`, `font-size: 13px`
- [ ] `.nota-serie`: `color: var(--cor-dourado)`
- [ ] `.sinopse-serie`: `color: var(--cor-texto-muted)`, `line-height: 1.5`
- [ ] `.status-serie` e `.plataforma-serie`: `color: var(--cor-texto-secundario)`, `font-size: 13px`
- [ ] `.link-serie`: `color: var(--cor-dourado)`, `font-size: 14px`
- [ ] Remover o `border-left: 3px solid var(--cine-gold)` do card antigo: o filete lateral foi substituído pelo badge

### 4.4 CSS — badge de classificação (3 faixas, escala de dourado)

- [ ] `.badge`: `position: absolute`, `top: 10px`, `right: 10px`, `padding: 4px 10px`, `border-radius: 20px`, `font-size: 12px`, `letter-spacing: 0.4px`, `color: var(--cor-fundo)`, `font-weight: 700`
- [ ] `.badge-alta { background: var(--cor-dourado-claro); }` · `.badge-media { background: var(--cor-dourado); }` · `.badge-baixa { background: var(--cor-dourado-escuro); }`
- [ ] Confirmar que `.badge-baixa` tem consumidor real; se não tiver, **remover `--cor-dourado-escuro` do `:root`** e registrar o motivo (D4)

### 4.5 CSS — a grade (decisão D1)

- [ ] `.resultados` base: manter `flex-direction: column` e `gap: 16px` no mobile
- [ ] Dentro de `@media (min-width: 769px)`: `.resultados { gap: 21px; }` e `.card-serie { flex: 1 1 calc(33.333% - 14px); }` — **3 colunas**, conta D1
- [ ] Dentro de `@media (max-width: 560px)`: remover as regras de `gap`/`padding`/`flex-basis` do cartaz que existiam para o card horizontal e passar a ajustar `padding` de `.conteudo-serie` e `font-size` de `.titulo-serie`
- [ ] Apagar os vestígios do card horizontal: `flex: 0 0 140px` no cartaz e a `width` fixa

**Verificação**

Run:
```powershell
Select-String -Path index.html -Pattern 'data-campo' | Measure-Object | Select-Object -ExpandProperty Count
Select-String -Path css\style.css -Pattern 'filme' | Measure-Object | Select-Object -ExpandProperty Count
Select-String -Path css\style.css -Pattern 'card-serie|badge-alta|badge-media|badge-baixa|\.badge\b|midia-serie'
Select-String -Path css\style.css -Pattern 'calc\(33\.333% - 14px\)' | Measure-Object | Select-Object -ExpandProperty Count
Select-String -Path css\style.css,index.html -Pattern 'display:\s*grid|!important\s*;|:has\(|@import|grid-template|\.s[ac]ss' | Measure-Object | Select-Object -ExpandProperty Count
```
Expected: **10** `data-campo` (nenhum perdido); `0` ocorrências de `filme` no CSS; as classes do contrato presentes no CSS; **1** ocorrência de `calc(33.333% - 14px)`; `0` na varredura de proibidos.

> ⚠️ **Precisa de navegador.** É a task de maior risco visual do plano: grade de 3 colunas sem overflow em 769px, `aspect-ratio` 2/3 com `object-fit`, badge sobre a mídia, e hover do card.

---

## T5 — Cápsula `.genero`, `.genero--selecionado` e `.separador`

Spec itens 9 e 11.

**Arquivos:** `css/style.css` (`.genero`, `.generos`, `.lista-generos`, e a regra nova `.separador`), `index.html` (3 separadores)

### 5.1 Cápsula `.genero` (já existe em L375 — não recriar)

- [ ] Manter `display: inline-flex`, `min-height: 38px`, `gap: 8px`, `padding: 7px 10px`
- [ ] `border-radius: 3px` → **`20px`**
- [ ] `background: var(--cor-fundo-secundario)`
- [ ] `border: 1px solid rgba(217, 174, 109, 0.18)` — o alfa **0.18** é o do spec, mais discreto que o `--cor-borda` (0.28) porque a cápsula é um controle, não uma superfície
- [ ] `color: var(--cor-texto)`
- [ ] Acrescentar a linha de transição **escrita exatamente assim**: `transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;` — ⚠️ **mesma ordem fixa de T4.3, `background-color` primeiro**, e T5 roda **antes** de T6: deixar `border-color` em primeiro lugar faria a contagem de T6 dar 2 em vez de 1
- [ ] `.genero:hover`: borda mais visível
- [ ] `.genero input` mantém `accent-color: var(--cor-dourado)`

### 5.2 `.genero--selecionado` — contrato público (decisão D3)

- [ ] Declarar `.genero--selecionado`: `background: var(--cor-dourado)`, `color: var(--cor-fundo)`, `border-color: var(--cor-dourado)`
- [ ] **Usar `:has()` NÃO** — está proibido e não é necessário
- [ ] Documentar no cabeçalho do CSS que **a classe é alternada por JavaScript** na `M1-T05`, e que sem JS a cápsula fica no visual não marcado
- [ ] **Não editar `js/script.js`** — o registro do contrato no quadro (feito em T1) é o que o parceiro consome

### 5.3 `.separador` (spec item 11) — elemento novo no HTML

- [ ] CSS: `.separador { height: 1px; border: 0; margin: 16px 0; background: linear-gradient(to right, transparent, var(--cor-borda-forte), transparent); }` — `margin` é **obrigatório** porque o reset `*` (L74-78) zera a margem padrão do `<hr>`
- [ ] `<hr class="separador">` **logo após o `</h2>` de `#login-titulo`**, dentro de `.cartao-login` — ancore pelo **elemento**, nunca por número de linha
- [ ] `<hr class="separador">` **logo após o `</h2>` de `#perfil-titulo`**, dentro de `.cartao-perfil` — mesma âncora
- [ ] `<hr class="separador">` **logo após o `</div>` de `.cabecalho-resultados`**, e **não** entre o `<h2>` e o `<p>`
- [ ] ⚠️ **Por que âncora semântica e não número de linha:** os 3 `<hr>` de T5 se deslocam **entre si** — o do login ocupa uma linha e empurra o do perfil e o dos resultados, de modo que as três posições se alteram enquanto a task é executada. Quem lê 98, 130 e 195 como alvo edita o ponto errado da sequência sem perceber. A âncora `</h2>` de `#login-titulo`, `</h2>` de `#perfil-titulo` e `</div>` de `.cabecalho-resultados` é estável nas três inserções e independe da ordem em que os `<hr>` são acrescentados
- [ ] ⚠️ **Por que o terceiro muda de lugar:** dentro de `@media (min-width: 769px)`, `.cabecalho-resultados` vira `display: flex` com `justify-content: space-between` (L509-514). Um `<hr>` entre o `<h2>` e o `<p>` entraria como **terceiro item flex** no meio do par e quebraria o alinhamento. Colocado depois do `</div>`, ele fica fora do flex e separa o cabeçalho de `#resultados` — que é a mesma função
- [ ] **Nenhum separador no `<footer>`**: ele já tem `border-top` (regra do `footer` em `css/style.css`, hoje L479) e ganharia uma segunda linha. **Não citar número de linha do `<footer>` aqui**: T4 desloca o bloco, porque acrescenta linhas no template acima dele

**Verificação**

Run:
```powershell
Select-String -Path index.html -Pattern 'class="separador"' | ForEach-Object { $_.LineNumber }
$sep = @(Select-String -Path index.html -Pattern 'class="separador"' | ForEach-Object { $_.LineNumber })
$foot = (Select-String -Path index.html -Pattern '<footer>' | Select-Object -First 1).LineNumber
"footer: $foot"
"separadores depois do footer: $((@($sep | Where-Object { $_ -gt $foot })).Count)"
Select-String -Path css\style.css -Pattern 'genero--selecionado|\.separador|linear-gradient'
Select-String -Path css\style.css,index.html -Pattern ':has\(|\.s[ac]ss|@import|<style' | Measure-Object | Select-Object -ExpandProperty Count
```
Expected: **3** separadores, um **logo após o `</h2>` de `#login-titulo`**, um **logo após o `</h2>` de `#perfil-titulo`** e um **logo após o `</div>` de `.cabecalho-resultados`** — **sem** nenhum após o `<footer>`; `footer: 222` ou mais — o `<footer>` que hoje está na **L219** migra para baixo, porque T4 acrescenta **≥ 3 linhas** dentro do template (envolve a `<img>` na `.midia-serie` e insere o badge), e o número exato depende de como o implementador quebra as linhas; `separadores depois do footer: 0`, que é o que esta checagem realmente valida; as três regras presentes; `0` para `:has()`, Sass, `@import` e `<style>` inline.

> ⚠️ **O `Expected` cita âncoras de elemento, e não de linha, de propósito.** Os 3 `<hr>` desta própria task se deslocam **entre si** durante a inserção — cada um ocupa uma linha e empurra os seguintes —, então qualquer trio de números de linha publicado aqui envelheceria antes de a task terminar. As três asserções duras do `Expected` não dependem de posição: a contagem dos separadores, o piso do `<footer>` e a comparação com a linha do `<footer>`.

> ⚠️ **O `<footer>` é medido como `≥ 222`, e não com número fixo, de propósito.** A Task anterior à verificação (T4) reescreve o template em L201-216, que fica **acima** do `<footer>`; fixar a posição transformaria um resultado correto em verificação vermelha. O `Expected` foi trocado pela comparação com a linha do `<footer>` (`separadores depois do footer: 0`), que é a propriedade que o requisito do spec item 11 de fato exige — nenhum separador no rodapé — e que sobrevive a qualquer quantidade de linhas que T4 adicione.

> ⚠️ **Precisa de navegador:** cápsula marcada/desmarcada ao clicar, `border-radius: 20px` e o degradê dos três separadores.

---

## T6 — Estados que ainda não existem

**Arquivos:** `css/style.css`, `docs/KANBAN.md` e `.opencode/plans/20260929-design-system-front-end.md` — o CSS recebe os estados, e o quadro recebe o registro do estado ativo da navegação na `M1-T24` (bullet "Item ativo da nav"). Declarar o quadro aqui evita que o commit da task saia com o `docs/KANBAN.md` por fora. O próprio plano entra na lista porque é **untracked** desde a criação (`.gitignore` não ignora `.opencode/`, e os planos entram no histórico): sem versioná-lo, o `git status --porcelain` de T8 nunca fica vazio. O commit que o versiona é o **1** de 8.2.

- [ ] **`:focus` puro nos campos**, além do `:focus-visible` que já existe em L323-329 — **um único bloco com seletor agrupado**, no padrão que já existe em `css/style.css` L323-326, e **não** duas regras separadas:

	```css
	.formulario-login input:focus,
	#form-perfil input:focus {
		border-color: var(--cor-dourado);
	}
	```

	**Não mexer** nas regras de `:focus-visible` de L323-329 — elas já atendem ao RF13. ⚠️ **Por que agrupado e não duas regras:** escrever `.formulario-login input:focus` e `#form-perfil input:focus` em dois blocos separados continua funcionando no navegador, mas quebra a contagem de T6, porque o padrão de contagem é por **linha** e não por regra
- [ ] **`transition: border-color 0.2s ease`** nos campos de `.formulario-login` e `#form-perfil` (hoje não há transition nenhuma neles) — **num único bloco de seletor agrupado**, no mesmo padrão que já existe em `css/style.css` L310-312, onde hoje vive o `border` da L316. Isso faz a transição ficar em **1 linha** e ser a única do arquivo com esse padrão:

	```css
	.formulario-login input,
	#form-perfil input {
		transition: border-color 0.2s ease;
	}
	```

	⚠️ **Não repetir a lista em dois estados nem em dois campos.** `.formulario-login input` e `#form-perfil input` em **duas** regras separadas produzem **2** linhas com `transition: border-color` e deixam a verificação vermelha sem que nada esteja errado na implementação. O seletor agrupado é o que garante o `1`, do mesmo jeito que a ordem fixa garante que T4.3 e T5.1 não acrescentem mais nenhuma
- [ ] **`box-shadow: 0 20px 50px var(--cor-sombra)`** em `.cartao-login` e `.cartao-perfil`, maior que o `0 10px 30px` do card — é a hierarquia de profundidade do design system
- [ ] **Item ativo da nav:** **verificar se existe estado ativo** — medido: **não existe**. Nenhum `aria-current` e nenhuma classe `.ativo` no `index.html`
- [ ] Diante da ausência: declarar a classe de estado ativo **disponível e sem efeito** (`.links-navegacao .ativo { border-bottom: 2px solid var(--cor-dourado); }`) e registrar no cabeçalho do CSS e na `M1-T24` que **ela não produz efeito até o JS do parceiro aplicar a classe**. **Não inventar JS, não editar `js/`**
- [ ] Manter `:focus` e `:focus-visible` consistentes entre navbar e formulários, sem `!important`

**Verificação**

Run:
```powershell
Select-String -Path css\style.css -Pattern 'focus-visible' | Measure-Object | Select-Object -ExpandProperty Count
Select-String -Path css\style.css -Pattern 'transition: border-color'
Select-String -Path css\style.css -Pattern '0 20px 50px var\(--cor-sombra\)' | Measure-Object | Select-Object -ExpandProperty Count
Select-String -Path index.html -Pattern 'aria-current|class="[^"]*ativo' | Measure-Object | Select-Object -ExpandProperty Count
```
Expected: **7** ocorrências de `focus-visible` — 3 na navbar (`.links-navegacao a`, `.botao-navegacao`, `.botao-navegacao--perfil`) e 4 linhas de seletor no bloco dos dois formulários. **O número não pode mudar**: é a prova de que T6 apenas *acrescentou* `:focus` e não mexeu no `:focus-visible` que já atendia ao RF13; `1` `transition: border-color`; `1` box-shadow `0 20px 50px`; `0` no HTML, confirmando que o estado ativo realmente não existe e que a classe é inerte por enquanto.

> ⚠️ **Por que `1` e não `2` na contagem de `transition: border-color`.** O `1` é sustentado por **duas** decisões independentes, e as duas precisam valer. **Primeira, a ordem:** o padrão casa a **substring** `transition: border-color`, e a única linha que a contém é a de T6, `transition: border-color 0.2s ease`, porque T6 abre a lista por `border-color`. As linhas de T4.3 e T5.1 existem no mesmo arquivo e **também** animam `border-color`, mas ambas começam por `transition: background-color`, então o padrão não as casa. **Segunda, o agrupamento:** como o padrão conta **linhas**, não regras, os dois campos de T6 precisam sair de um **único** seletor agrupado. Medido nesta sessão: hoje o arquivo tem **3** `transition` pré-existentes — L121 `color`, L167 `color, background-color` e L341 `background-color, color` — e **nenhuma** abre por `border-color`, então o `0` atual vem só de T6, e só continua `1` se a regra for única. Nenhuma outra task deste plano introduz `transition` começando por `border-color`. É por isso que a ordem está fixada nas duas tasks e o seletor agrupado nas duas bullets acima, e não é detalhe de formatação.

> ⚠️ **Precisa de navegador:** foco visível por teclado em cada campo, e hover/foco da navbar.

---

## T7 — Notas de progresso sem número de linha

As notas `*Progresso:*` de `M1-T02`, `M1-T04`, `M1-T12` e `M1-T16` citam linhas de `css/style.css` — e, na `M1-T02` e na `M1-T16`, linhas de `index.html` — e já ficaram erradas três vezes seguidas. Este plano **reescreve o arquivo inteiro**, o que torna cada uma dessas referências errada de novo na mesma edição. O `AGENTS.md` §5 **não** exige número de linha.

**Arquivos:** `docs/KANBAN.md`

- [ ] **Regra única das quatro notas, sem exceção e sem lista:** trocar **TODAS** as referências de número de linha por **seletores, classes, IDs ou nomes de elemento** — **sem enumerar quais são**, **sem tentar prever quais se deslocam** e sem deixar nenhuma de fora. Registrar em cada uma das quatro notas que a remoção foi **deliberada**, não um esquecimento. As quatro seguem **esta** regra, e não uma variante cada uma. ⚠️ **Por que a regra é escrita uma vez, aqui, e as quatro notas apenas apontam para ela:** quatro bullets quase iguais divergem entre si assim que um deles envelhece, que foi exatamente o que aconteceu quando a `M1-T02` recebeu o tratamento e as outras três ficaram com listas parciais — o mesmo defeito, três vezes. Uma regra só não tem como divergir de si mesma
- [ ] `M1-T04` — **o que o seletor substitui**, e nada além disso: o bloco `*` de reset; o `:root` único, o único bloco de variáveis do arquivo, com as 13 variáveis `--cor-*`; as três media queries, cada uma identificada pela sua condição — `max-width: 768px`, `min-width: 769px` e `max-width: 560px`; a regra Flexbox de `#form-perfil`; e o `<link rel="stylesheet">` do `<head>`, que é o que carrega `css/style.css` na página
- [ ] `M1-T12` — **o que o seletor substitui**: `.resultados` em coluna; `.card-serie`, o card vertical que T4 põe no lugar de `.cartao-filme`; e o corte para linha no desktop dentro de `@media (min-width: 769px)`, com `flex: 1 1 calc(33.333% - 14px)` em **3 colunas**
- [ ] `M1-T16` — **o que o seletor substitui**, sem número em nenhum deles: o `alt` da `<img class="imagem-capa">`; o `:focus-visible` em `.links-navegacao a`, `.botao-navegacao` e `.botao-navegacao--perfil` e nos `input` e `button` de `.formulario-login` e de `#form-perfil`; o `aria-label` nos três `button.botao-navegacao` dentro de `.acoes-navegacao`; o `aria-labelledby` nas três `section` que o referenciam — `.secao-login`, `.secao-perfil` e `.secao-resultados`; o `role="group"` com o próprio `aria-label` em `.acoes-navegacao`; e o `role="status"` com `aria-live="polite"` no `#resultados-status`, dentro de `.cabecalho-resultados`
- [ ] `M1-T02` — **o que o seletor substitui**: `lang="pt-BR"` no `<html>`, o `<title>` do `<head>`, o `h1` único e os landmarks `header`, `nav`, `main` e `footer` citados pelo nome do elemento, e as quatro `section` pela classe — `.capa`, `.secao-login`, `.secao-perfil` e `.secao-resultados`. As referências desta nota são do `index.html`; as das outras três, do `css/style.css` ⚠️ **Correção de classe na passagem:** a nota diz hoje que o `h1` é `.logo` e essa classe **não existe** — o `h1` é `<h1 class="marca">`; corrigir junto com a remoção do número
- [ ] Acrescentar à `M1-T24` a regra permanente: notas de progresso citam **seletor**, nunca linha
- [ ] **Nenhuma task sai de A Fazer** — nada foi validado em navegador. `M1-T04` continua *Em Andamento*; `M1-T02`, `M1-T12` e `M1-T16` continuam *A Fazer*, com `- [ ]`

**Verificação**

Run:
```powershell
$kan = 'docs\KANBAN.md'
$pat = '`css/style\.css`\s+[\d, e]+|\((bloco )?\d{1,3}(-\d{1,3})?\)'
$refs = @(Select-String -Path $kan -Pattern $pat -AllMatches)
"geral: $($refs.Matches.Count)"
"escopo T7: $((@($refs | Where-Object { $_.Line -match '^- \[.\] `M1-T(02|04|12|16)`' })).Matches.Count)"
Select-String -Path $kan -Pattern '^- \[x\]' | Measure-Object | Select-Object -ExpandProperty Count
Select-String -Path $kan -Pattern '^- \[ \] `M1-T\d\d`.*[Ee]m andamento desde' | Measure-Object | Select-Object -ExpandProperty Count
```

Expected: `geral` cai de **28** para **6**; `escopo T7` cai de **22** para **0**; contagem de `- [x]` continua **3**; linhas de task com bloco de proveniência continuam **2**. O escopo de T7 é medido **por identificador de task, não por número de linha**: o filtro casa a linha cujo checkbox abre com `` `M1-T02` ``, `` `M1-T04` ``, `` `M1-T12` `` ou `` `M1-T16` ``, e é essa a unidade que a task reescreve.

> **Números medidos hoje, não estimados:** há **28** referências a linha no quadro — **22** dentro do escopo desta task (`M1-T02` = 7, `M1-T04` = 7, `M1-T12` = 5, `M1-T16` = 3) e **6** fora dela (`M1-T05`, `M1-T17`, `M1-T18`, que citam `js/` e `package.json` e **não são escopo desta task**). As 6 remanescerão, de propósito.
>
> **Por que o filtro é por identificador, e por que está ancorado em `^- \[.\] `M1-T``:** T1 insere a `M1-T24` na coluna *A Fazer* (hoje L93-112) e desloca a `M1-T04`, que está em *Em Andamento*. Um filtro por número de linha continuaria dando os `Expected:` certos por coincidência, mas deixaria de cobrir as 7 referências da `M1-T04` **sem avisar**. Já a forma frouxa, `$_.Line -match 'M1-T(02|04|12|16)'`, é **pior que o número de linha**: medido nesta sessão, ela devolve **27** em vez de 22, porque a linha da `M1-T05` cita a `M1-T04` como dependência e a da `M1-T17` cita a `M1-T12` — e as 3 + 2 = 5 referências extras são justamente as 6 fora do escopo, que esta task não pode reescrever. Ancorar no checkbox da própria task separa os dois conjuntos.
>
> **Dois erros de regex já_medidos nesta sessão, para não repetir:**
> - O padrão precisa de `-AllMatches`, senão devolve 1 por linha em vez de todas.
> - O padrão de *bloco de proveniência* precisa ser ancorado em `^- \[ \] `M1-T``, porque `Em andamento desde` também aparece **2 vezes na legenda** (L42 e L47). Buscar o termo solto dá **4**, não 2 — a mesma armadilha de contagem ingênua que o handoff já documenta.
>
> A varredura acima mira referências a **linha**, e o padrão casa duas formas: `` `arquivo` NNN `` e `(NNN)`. Ela é a **medição** desta task, não o critério dela: existem referências na forma `` `index.html` NNN ``, **sem parênteses**, que o padrão **não** enxerga, e é por isso que a regra é "TODAS, sem enumerar quais" — ela cobre justamente as referências que a varredura não alcança, e é o que dispensa a revisão à mão que uma lista enumerada exigiria. Essas invisíveis não entram nem no **28** nem no **6**, então não afetam nenhum dos dois `Expected:`.

---

## T8 — Commits e sincronização do handoff

**Arquivos:** `docs/AI_HANDOVER_CONTEXT.md` e os arquivos de código já alterados nas tasks anteriores.

### 8.1 Sincronizar o handoff

- [ ] `docs/AI_HANDOVER_CONTEXT.md` L397: `M1-T02, e M1-T05 a M1-T23` → `... a M1-T24`, e a quantidade `20` → `21`
- [ ] L400: `Total: **24 tarefas** (M1-T00 a M1-T23)` → `**25 tarefas** (M1-T00 a M1-T24)`; refazer a soma `2 + 2 + 21 = 25`
- [ ] L186: a tabela que lista as 8 tasks com nota `*Progresso:*` passa a dizer que as notas foram **reescritas sem número de linha**
- [ ] Registrar nesta versão do handoff: a paleta nova, o card vertical, o contrato CSS ↔ JS, as 3 divergências medidas de contagem, a inversão de borda de 0.22 → 0.55, e a ordem das media queries
- [ ] Manter o aviso de que **contagem ingênua de checkbox dá números errados** (5 e 56); contar sempre por coluna

### 8.2 Commits — delegar ao agente `git-commit`

Conventional Commits, uma linha, minúscula, sem ponto final. `git add <arquivo>` **nomeado**, nunca `git add .`.

| # | Prefixo | Arquivos | Escopo |
| --- | --- | --- | --- |
| 1 | `docs:` | `docs/KANBAN.md`, `.opencode/plans/20260929-design-system-front-end.md` | registra a `M1-T24` e a regra de notas sem número de linha; versiona o plano, que nasce untracked e sem ele o `git status --porcelain` de 8.3 nunca esvazia |
| 2 | `style:` | `css/style.css` | paleta `--cor-*`, literais órfãos e cabeçalho do CSS |
| 3 | `style:` | `index.html`, `css/style.css` | card vertical `.card-serie` com badge de classificação |
| 4 | `style:` | `index.html`, `css/style.css`, `docs/KANBAN.md` | cápsula `.genero`, `.genero--selecionado`, `.separador` e estados — o `docs/KANBAN.md` entra por causa do registro do estado ativo da navegação na `M1-T24`, feito em T6 |
| 5 | `docs:` | `docs/KANBAN.md`, `docs/AI_HANDOVER_CONTEXT.md` | notas de progresso e sincronização do handoff |

- [ ] Antes de cada commit, `git merge --ff-only origin/develop` se `git log --oneline develop..origin/develop` acusar commits
- [ ] **Sem force push** — nem `--force` nem `--force-with-lease`
- [ ] **Sem `push`**, a menos que o usuário peça explicitamente nesta conversa
- [ ] **Nenhuma branch nova**: tudo em `feature/cinematch-web-interface`

**Verificação**

Run:
```powershell
git log --oneline -6
git log --oneline develop..feature/cinematch-web-interface
git status --porcelain
```
Expected: os 5 commits acima, em ordem, todos na branch de interface; a lista mostra os 5 mais recentes sem `main`; `git status --porcelain` **vazio** (nada por versionar).

---

## 2. Ordem e pré-requisitos

```
T0 (fast-forward)  ← pré-requisito DURO de tudo
 └─ T1 (registrar M1-T24 no quadro)   ← antes de qualquer código (AGENTS.md §5)
     └─ T2 (reordenar media queries)  ← estrutural, antes das regras novas
         └─ T3 (paleta + cabeçalho)
             └─ T4 (card vertical + badge)
                 └─ T5 (cápsula + separador)
                     └─ T6 (estados)
                         └─ T7 (notas sem número de linha)
                             └─ T8 (commits + handoff)
```

Nenhum pré-requisito oculto: T4 depende de T3 (o `--cor-sombra` e o `--cor-card-hover` nascem em T3), T5 depende de T3 (o degradê usa `--cor-borda-forte`), T6 depende de T3 (o `--cor-sombra` do contêiner) e T7 depende de T4 (a nota da `M1-T12` só pode ser reescrita depois que `.card-serie` existir).

## 3. Tasks que não podem ser validadas sem navegador

| Task | Sem navegador dá para validar | Só o navegador fecha |
| --- | --- | --- |
| T0 | contagem, `ls-tree`, nº de linhas | — |
| T1 | presença de `M1-T24`, `- [x]` = 3 | — |
| T2 | ordem das 3 media queries | se os 3 breakpoints continuam iguais |
| T3 | 0 `--cine-`, 10 hex no `:root`, 0 proibidos | hover de navbar, hover dos botões, translucidez |
| T4 | 10 `data-campo`, 0 `filme`, 1 `calc` | grade de 3 colunas sem overflow, `aspect-ratio`, badge, hover |
| T5 | 3 separadores, regras presentes | cápsula marcada, raio 20px, degradê |
| T6 | 4 `:focus-visible`, 1 transição, 0 `aria-current` | foco por teclado, hover/foco da navbar |
| T7 | 0 referência a linha, contagens de checkbox | — |
| T8 | log, status vazio | — |

**Por isso nenhuma task existente pode ser marcada como concluída** (`AGENTS.md` §5: só sai de *A Fazer* quando o código funciona **e** foi testado). A `M1-T24` nasce em *A Fazer* com `- [ ]` e fica lá.

## 4. Proibições reconfirmadas

Nada abaixo pode aparecer em `css/style.css` ou `index.html`: CSS Grid, `!important`, Sass, CSS-in-JS, `@import`, `<style>` inline, React, TypeScript, bundler, jQuery, axios, `:has()`, e qualquer construção da lista de "não ensinado" do `AGENTS.md` §2.1.

Liberados e já em uso, mantidos: `transition`, `linear-gradient`, `box-shadow`, `aspect-ratio`, `clamp()`, `calc()`, pseudo-elementos, `object-fit`.
