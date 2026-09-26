# CineMatch Web — Quadro Kanban

**Recomendação de Séries em Tempo Real** — Projeto Avaliativo Final, Módulo 01, Semana 13.

Evolução do *CineMatch JS* (motor de recomendação que rodava no terminal Node.js com catálogo fictício) para uma aplicação web com formulário de perfil, persistência em `localStorage`, catálogo real buscado na TVMaze API via `fetch` e cards de recomendação calculados por compatibilidade.

| Metadado | Valor |
| --- | --- |
| **Projeto** | CineMatch Web: Recomendação de Séries em Tempo Real |
| **Disciplina / módulo** | Desenvolvimento Mobile — Módulo 01 — Semana 13 (Projeto Avaliativo Final) |
| **Prazo de entrega** | 05/10/2026 até 22h (vale a última atualização no repositório do GitHub) |
| **Branch de trabalho** | `feature/cinematch-web` (individual — em squad: `feature/interface` e `feature/logica`) |
| **Branch alvo** | `develop` → `main` (todo o código deve chegar à `main` no final; em squad o fluxo é o mesmo, com as duas branches de feature) |
| **API utilizada** | TVMaze API — `https://api.tvmaze.com/shows?page=0` (API pública, sem chave) |
| **Stack** | HTML5 + CSS3 (Flexbox, mobile-first) + JavaScript com módulos ES nativos — sem frameworks, sem build |
| **Pacote de apoio** | `live-server` via npm (apenas servidor local de desenvolvimento) |
| **Total de tarefas** | 24 tarefas (`M1-T00` a `M1-T23`) + 8 itens no Backlog (7 bônus das seções 8 e RF12 + 1 opcional da seção 5.4) |

---

## Legenda e convenções

### Identificadores de tarefa

- `M1-T##` = **M**ódulo **0**1, **T**arefa de número `##`.
- A numeração começa em `M1-T00` (planejamento do quadro) e vai até `M1-T23` (publicação e envio no AVA).
- O prefixo `RF##` antes do título é o **Requisito Funcional** do briefing (seção 5.3) que a tarefa entrega. Tarefas de entrega, teste, documentação, versionamento, vídeo e publicação não têm RF direto e recebem o rótulo **Entrega**.
- Cada tarefa é rastreada contra o critério de avaliação correspondente na seção [Rastreabilidade](#rastreabilidade).

### Mecanismo de rastreio (checkboxes)

- `- [ ]` = tarefa **pendente**.
- `- [x]` = tarefa **concluída**, sempre acompanhada de `– Concluído em DD/MM/AAAA:HH:MM` para registrar a data real da conclusão.
- O checkbox é a única fonte de verdade do andamento: a tarefa só sai de *A Fazer* quando o código estiver funcionando e testado, não quando estiver escrito — exceto quando for a única tarefa em execução, que fica na coluna *Em Andamento*.

### Colunas do quadro

| Coluna | Significado |
| --- | --- |
| **Backlog** | Ideias de bônus e melhorias **sem nota**. Não têm `M1-T##` e não entram na rastreabilidade de RF. |
| **A Fazer** | Cadeia principal de desenvolvimento, na ordem do passo a passo sugerido (seção 5.1 do briefing). |
| **Em Andamento** | Tarefa em execução agora — no máximo uma por vez, para manter o foco. |
| **Concluído** | Tarefas finalizadas, com data registrada. |

### Convenções técnicas

- **Proibido** (fora do escopo do Módulo 01): React, Next, React Native, Vue, Angular, TypeScript, Webpack/Vite/Babel, CSS Grid, Sass, CSS-in-JS, back-end/banco de dados, jQuery, axios.
- **Obrigatório**: HTML semântico, CSS externo com Flexbox, responsividade mobile-first, `createElement`/`classList` no DOM, `addEventListener` + `preventDefault`, `localStorage` com JSON, `fetch` com `try/catch` e `response.ok`, módulos ES com `import`/`export`, Git com branches e commits descritivos.

---

## Backlog

Ideias de bônus da seção 8 do briefing e melhorias possíveis. **Não contam para nota** — só entram na coluna *Concluído* depois que todos os RFs estiverem entregues.

> Os itens do Backlog reproduzem as ideias de bônus da seção 8 do briefing (opcional, sem nota) mais o bônus opcional do RF12 (Geolocation) e o item opcional da seção 5.4 (Bootstrap / Font Awesome via CDN). Nenhum deles conta para a nota.

- [ ] **Filtro por gênero** na tela de resultados, para refinar sem preencher o formulário de novo
- [ ] **Ordenar os cards** por compatibilidade, nome ou avaliação (reaproveitando `sort`)
- [ ] **Buscar mais de uma página** da TVMaze API (`?page=1`, `?page=2`...) para ampliar o catálogo disponível
- [ ] **Publicar o projeto de verdade** — GitHub Pages, Netlify ou Vercel — para ter um link público no portfólio
- [ ] **Modo escuro**, com um toggle simples de tema reforçando a manipulação de classes via `classList`
- [ ] **Combinar com uma API de filmes**, voltando a ter "filmes e séries" como no mini-projeto original
- [ ] **Geolocation API** para uma sugestão contextual (saudação ou recomendação diferente conforme a localização), como bônus do RF12
- [ ] **Bootstrap / Font Awesome** via CDN (opcional do PDF, seção 5.4) — se usar, apenas via CDN e sem `npm install`

---

## A Fazer

- [ ] `M1-T02` **RF01 — HTML semântico da página.** Montar a estrutura de `index.html` com `header`, `main`, `section`, `article` (um por série recomendada) e `footer`, um único `h1`, `<title>`, `<meta name="description">`, og tags (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`) e `lang="pt-BR"` no `<html>`. _Depende de: M1-T01._
- [ ] `M1-T03` **RF02 — Formulário de perfil.** Montar `<form id="form-perfil">` dentro da `<main>`: `<label for="nome">` com `<input type="text" id="nome" required>`, `<label for="idade">` com `<input type="number" id="idade" min="1" required>`, `<fieldset>` + `<legend>Gêneros favoritos</legend>` com checkboxes `name="genero"` (Drama, Comédia, Ação e outros) e `<button type="submit">Ver recomendações</button>`. _Depende de: M1-T02._
- [ ] `M1-T04` **RF09 — Estilo da tela do formulário (1ª metade).** Criar `style.css` externo, mobile-first, aplicando box model, cores, espaçamento e Flexbox no formulário, usando o wireframe da seção 3 do briefing como referência. _Depende de: M1-T03._
- [ ] `M1-T05` **RF02 — Captura e validação do formulário.** Em `script.js`, registrar `addEventListener('submit', ...)` com `preventDefault()`, montar o objeto `usuario` com `{ nome, idade, generosFavoritos }` (lendo os checkboxes por `name="genero"`), confirmar com `console.log` e exibir feedback de erro acessível quando a validação falhar (nome vazio, idade fora de faixa, nenhum gênero marcado). _Depende de: M1-T03, M1-T04._
- [ ] `M1-T06` **RF03 — Persistir perfil no `localStorage`.** Salvar com `localStorage.setItem('cinematchPerfil', JSON.stringify(usuario))` e recuperar com `getItem` + `JSON.parse`, tratando o `null` da primeira visita; com perfil salvo, pular o formulário e ir direto ao catálogo; adicionar botão "Trocar perfil" que limpa o registro e reabre o formulário. _Depende de: M1-T05._
- [ ] `M1-T07` **RF04 — Buscar catálogo real via `fetch`.** Implementar `async function buscarCatalogo()` com `await fetch('https://api.tvmaze.com/shows?page=0')` dentro de `try/catch`, validar `response.ok` e registrar o resultado bruto no `console` antes de tratar; em caso de falha, acionar `exibirMensagemDeErro` para que a página nunca fique travada. _Depende de: M1-T01, M1-T06._
- [ ] `M1-T08` **RF05 — Tratar o catálogo com métodos de array.** Encadear ao menos 3 métodos: `filter` (só séries com `genres.length > 0` e `rating.average`), `sort` por `rating.average` decrescente, `slice` para limitar a 8 itens e `map` para normalizar em `{ id, titulo, tipo, generos, duracaoMinutos }`; tratar catálogo vazio com a mensagem "Não encontramos recomendações agora". _Depende de: M1-T07._
- [ ] `M1-T09` **RF06 — Adaptar as classes `Conteudo` e `Serie`.** Criar `modelo.js` com `export class Conteudo` (construtor, atributos e método usando `this`) e `export class Serie extends Conteudo`, adaptando o construtor para receber os dados já tratados no RF05. _Depende de: M1-T08._
- [ ] `M1-T10` **RF07 — Calcular e classificar a compatibilidade.** Regra do projeto anterior: gêneros em comum dividido pelo total de gêneros do conteúdo, vezes 100; classificar em Alta/Média/Baixa afinidade com `if-else`, `switch-case` ou ternário, e levantar os gêneros não explorados (a seção 5.4 considera bem-vindo um laço explícito para montar a lista de gêneros não explorados). _Depende de: M1-T09._
- [ ] `M1-T11` **RF08 — Renderizar os cards no DOM.** Em `ui.js`, criar `export function renderizarCard(resultado)` com `document.createElement('article')`, `className`/`classList` e `appendChild` em `#resultados`, exibindo título, gêneros em comum, gêneros não explorados, percentual de compatibilidade e o badge de classificação. _Depende de: M1-T10._
- [ ] `M1-T12` **RF09 — Estilizar a grade de cards.** Em `style.css`, organizar os cards com Flexbox (`flex-wrap`, linha no desktop e coluna no celular) usando media query para o breakpoint mobile, com classes bem nomeadas em vez de `!important` ou seletores de tag genéricos. _Depende de: M1-T04, M1-T11._
- [ ] `M1-T13` **RF10 — Usar callback.** Criar `exibirMensagemDeBoasVindas(nome)` e dispará-la como callback assim que o catálogo terminar de carregar e a renderização inicial for concluída, exibindo a saudação na tela. _Depende de: M1-T11._
- [ ] `M1-T14` **RF11 — Usar closure.** Manter um contador por closure — por exemplo, quantas vezes a compatibilidade foi recalculada nesta sessão — e exibir esse número na tela. _Depende de: M1-T13._
- [ ] `M1-T15` **RF12 — Browser API de tempo.** Mostrar "Buscando as melhores séries pra você..." enquanto o `fetch` corre e usar `setTimeout` para um pequeno atraso proposital antes de exibir o resultado. _Depende de: M1-T07, M1-T11._
- [ ] `M1-T16` **RF13 — SEO básico e acessibilidade.** Garantir `alt` em todas as imagens, foco visível (`:focus-visible`), `aria-label` nos campos e botões, contraste de cores adequado, `lang="pt-BR"`, `title`/`meta description` descritivos e revisão das og tags. _Depende de: M1-T12._
- [ ] `M1-T17` **RF14 — Separar os módulos ES.** Dividir em `script.js` (fluxo: formulário, `localStorage`, busca e cálculo), `ui.js` (tela: renderizar cards, mensagens de carregando, vazio e erro) e `modelo.js` (classes), ligando tudo com `import`/`export` e `<script type="module" src="script.js"></script>` no `index.html`. _Depende de: M1-T11, M1-T12, M1-T13, M1-T14, M1-T15._
- [ ] `M1-T18` **RF15 — Servir o projeto com `live-server`.** Criar `package.json` com o script `"start": "live-server"` e `live-server` em `devDependencies` (instalação local, não global), rodar `npm install` e validar que os módulos ES carregam pelo servidor. _Depende de: M1-T01, M1-T17._
- [ ] `M1-T19` **Entrega — Teste integrado do zero.** Limpar `cinematchPerfil` do `localStorage`, recarregar, refazer o formulário e conferir se os cards aparecem corretamente; repetir o teste com a internet desligada para validar a mensagem de erro; testar em desktop e celular. _Depende de: M1-T18._
- [ ] `M1-T20` **Entrega — Escrever o `README.md`.** Documentar o nome do software, o problema que ele resolve, as técnicas e linguagens utilizadas, como executar e quais melhorias são possíveis; explicar em poucas linhas a diferença entre CommonJS (`require`/`module.exports`, do CineMatch JS original) e ESM (`import`/`export`, usado aqui), as escolhas de `const`/`let` e onde o escopo de bloco importou, além de justificar o uso sem `!important`; incluir alguma imagem ou diagrama para melhorar o entendimento, como sugere a seção 5.7. _Depende de: M1-T19._
- [ ] `M1-T21` **Entrega — Commits descritivos e fluxo de branches.** Fazer pelo menos 5 commits padronizados por funcionalidade (prefixos `feat:`, `style:`, `docs:`) seguindo o fluxo `feature/cinematch-web` → `develop` → `main`, garantindo que todo o código esteja na `main` ao final; em squad: 8 commits e as duas branches de feature da seção 5.6. Não é preciso criar uma branch para cada RF — o objetivo é mostrar que sabe separar trabalho numa branch de feature e trazer de volta para a `develop`, não multiplicar branches. _Depende de: M1-T20._
- [ ] `M1-T22` **Entrega — Gravar o vídeo de até 7 minutos.** Abordar os 5 tópicos do item 5.8: objetivo do sistema e demonstração de funcionamento; o que deve ser feito para executar o sistema; como as tarefas foram organizadas antes de começar; quais branches foram criadas e o objetivo de cada uma; e o que falta no código que poderia ser melhorado. Pode gravar na vertical ou na horizontal, mas é importante que o rosto apareça e que a gravação seja feita em um local com boa iluminação; deixar o vídeo no Google Drive em modo leitor ou no YouTube como "não listado". _Depende de: M1-T21._
- [ ] `M1-T23` **Entrega — Publicar e enviar os links.** Publicar o repositório no GitHub como repositório público, publicar este quadro Kanban com link público de acesso (a seção 5.5 aceita Trello, GitHub Projects, Notion, um quadro simples no README, planilha ou imagem) e enviar os links no AVA (repositório público, quadro Kanban e vídeo de apresentação), respeitando o prazo de 05/10/2026 até 22h. _Depende de: M1-T22._

---

## Em Andamento

- _Nenhuma tarefa em andamento no momento._

---

## Concluído

- [x] `M1-T00` **Planejar o quadro — Ler o briefing e mapear os 15 RFs e o passo a passo sugerido em tarefas.** Levantamento dos requisitos funcionais RF01–RF15 (seção 5.3), do passo a passo sugerido (seção 5.1), da organização de projeto (5.2), dos requisitos técnicos (5.4), do versionamento Git/GitHub (5.6), dos critérios de avaliação (seção 6), do checklist final de entrega (seção 7) e das ideias de bônus (seção 8), convertendo cada passo em uma tarefa rastreável deste quadro. – Concluído em 25/09/2026:20:28
- [x] `M1-T01` **RF15 (parcial) — Bootstrap do projeto.** Criar a estrutura de arquivos do projeto dentro da pasta versionada no Git (`index.html`, `style.css`, `script.js`, `ui.js`, `modelo.js`) e o `package.json` com o script de `live-server`, deixando o repositório pronto para receber o código; aqui só são criados os arquivos em branco e o `package.json` — a instalação e a validação do `live-server` ficam em `M1-T18`. _Sem dependências._ – Concluído em 25/09/2026:22:51

---

## Rastreabilidade

Cada linha da tabela abaixo mapeia um requisito funcional do briefing (seção 5.3) à tarefa que o entrega, à coluna em que ele está e ao peso correspondente na nota de 0 a 10.

| RF | Requisito funcional (seção 5.3) | Tarefa(s) | Coluna atual | Peso na avaliação |
| --- | --- | --- | --- | --- |
| **RF01** | Estruturar a página com HTML semântico | `M1-T02`, `M1-T16` | A Fazer | Critério 9 — Estrutura da página HTML — **0,50**, compartilhado com a RF13 |
| **RF02** | Criar o formulário de perfil com tratamento de erro | `M1-T03`, `M1-T05` | A Fazer | Critério 11 — Formulário e validação — **0,50** |
| **RF03** | Persistir o perfil com `localStorage` | `M1-T06` | A Fazer | Critério 14 — LocalStorage — **0,50** |
| **RF04** | Buscar o catálogo real via `fetch` | `M1-T07` | A Fazer | Critério 13 — Consumo de dados — **0,50**, compartilhado com a RF12 |
| **RF05** | Tratar o catálogo com métodos de array | `M1-T08` | A Fazer | Critério 6 — Utilização de métodos — **0,50** |
| **RF06** | Reaproveitar e adaptar as classes do projeto anterior | `M1-T09` | A Fazer | Critério 7 — Utilização de métodos de classe — **0,50** |
| **RF07** | Calcular e classificar a compatibilidade | `M1-T10` | A Fazer | Critério 5 — Compatibilidade entre perfil e catálogo — **1,00** |
| **RF08** | Renderizar os resultados no DOM | `M1-T11` | A Fazer | Critério 12 — Conteúdo dinâmico — **0,50** |
| **RF09** | Estilizar com Flexbox e responsividade | `M1-T04`, `M1-T12` | A Fazer | Critério 10 — Responsividade — **0,50** |
| **RF10** | Usar callback | `M1-T13` | A Fazer | Critério 8 — Emprego de callback e closure — **0,50**, compartilhado com a RF11 (callback) |
| **RF11** | Usar closure | `M1-T14` | A Fazer | Critério 8 — Emprego de callback e closure — **0,50**, compartilhado com a RF10 (closure) |
| **RF12** | Usar uma Browser API de tempo | `M1-T15` | A Fazer | Critério 13 — Consumo de dados — **0,50**, compartilhado com a RF04 (estado "carregando") |
| **RF13** | SEO básico e acessibilidade | `M1-T16` | A Fazer | Critério 9 — Estrutura da página HTML — **0,50**, compartilhado com a RF01 (SEO e acessibilidade) |
| **RF14** | Organizar o código em módulos ES (`import`/`export`) | `M1-T17` | A Fazer | Critério 15 — Módulos ES — **0,50** |
| **RF15** | Servir o projeto com um pacote via npm | `M1-T01`, `M1-T18` | Concluído / A Fazer | Sem critério próprio na seção 6 — registrado no Critério 3 (organização do repositório), que já aparece abaixo; ver nota sobre o compartilhamento de pontos |

### Critérios e obrigações cobertos por tarefas sem RF exclusivo

| Critério | Peso | Tarefa(s) | Coluna atual |
| --- | --- | --- | --- |
| 1 — Realizou a gravação de um vídeo? | **1,50** | `M1-T22` | A Fazer |
| 2 — Versionamento com branches e commits | **1,00** | `M1-T21` | A Fazer |
| 3 — Organização dos arquivos no repositório | **1,00** | `M1-T01`, `M1-T18`, `M1-T20` | Concluído / A Fazer |
| 4 — Modelagem do perfil da pessoa usuária e catálogo de séries | **0,50** | `M1-T05` (objeto `usuario`), `M1-T08` (array de séries tratado) | A Fazer |
| Teste integrado do zero (item 18 do checklist) | **Sem peso** — não é critério notado, é boa prática | `M1-T19` | A Fazer |
| Links no AVA e prazo de 05/10/2026 22h (itens 2 e 4 da seção 4) | **Sem peso** — é penalidade, não critério | `M1-T23` | A Fazer |

> **Nota sobre o mapeamento e o compartilhamento de pontos.** O mapeamento da RF15 para o Critério 3 é forçado: o `package.json` é um arquivo do repositório, mas o critério trata de "estrutura de pastas e README.md". A seção 6 não tem critério específico para npm; a seção 5.4 lista `npm`/`package.json` como requisito técnico obrigatório sem critério notado. Manter o mapeamento assume que o avaliador conta o `package.json` como organização do repositório. Além disso, os RF10 e RF11 dividem o Critério 8 (0,50 entre os dois), os RF01 e RF13 dividem o Critério 9 e os RF04 e RF12 dividem o Critério 13: quem for somar os pesos na nota precisa contar cada um desses critérios apenas uma vez.

**Cobertura:** RF01 a RF15 mapeados, sem lacunas. **Como ler a coluna "Peso":** ela mostra o **peso do critério** da seção 6, não os pontos atribuídos a cada RF. Quando dois RFs cobrem o mesmo critério, o ponto é **compartilhado** — some cada critério **uma única vez**. Os 15 critérios somam **10,00 pontos**; a soma literal das duas tabelas dá **11,50** porque os critérios 8, 9 e 13 aparecem em duas linhas cada. A RF15 não tem critério próprio e aparece somada apenas dentro do Critério 3. As tarefas `M1-T19` e `M1-T23` são obrigações administrativas, fora da tabela de critérios notados.

---

## Riscos e bloqueios

| # | Risco / bloqueio | Impacto | Mitigação |
| --- | --- | --- | --- |
| 1 | **CORS na TVMaze API** — o `fetch` roda em `http://localhost:8080` (servido pelo `live-server`), que é uma origem diferente de `api.tvmaze.com` | Baixo — a mitigação já é o padrão da API; só quebra se a TVMaze mudar o cabeçalho | A TVMaze responde com `Access-Control-Allow-Origin: *`; confirmar no DevTools (aba Network) que a requisição não está sendo barrada e nunca desabilitar a segurança do navegador para "fazer funcionar" |
| 2 | **Módulos ES não funcionam via `file://`** — abrir o `index.html` por duplo clique dispara erro de CORS nos `import` | Alto — a página fica sem JavaScript | Servir sempre com `npm start` (`live-server`) e documentar isso no `README.md`; o botão "Trocar perfil" nunca deve recarregar via `file://` |
| 3 | **`localStorage` recusa ou perde dados** — em modo privado os navegadores modernos ainda permitem `localStorage`, mas com cota reduzida e limpo ao fechar a aba; o modo de falha real é a **cota excedida ou o storage limpo pelo navegador** (e, em navegadores antigos, o `setItem` pode lançar exceção) | Médio — quebra o RF03 e trava o fluxo | Envolver leitura e escrita em `try/catch` e seguir sem persistência, avisando a pessoa usuária na tela |
| 4 | **API fora do ar, lenta ou com formato inesperado** | Médio — página em branco sem explicação | `try/catch` + validação de `response.ok` + os três estados (carregando, vazio e erro) com mensagem amigável; o `setTimeout` do RF12 fica só na exibição, nunca dentro do `fetch` |
| 5 | **Catálogo filtrado até zero séries** — os filtros de `genres.length` e `rating.average` podem eliminar tudo em uma página | Médio — grade de cards vazia sem motivo | Tratar o caso com a mensagem "Não encontramos recomendações agora" e, se necessário, ampliar a página consultada ou o `slice` |
| 6 | **Prazo apertado: 05/10/2026 até 22h**, contado pela última atualização no GitHub | Alto — perda de nota | Deixar o merge final na `main` até as 21h30 e não modificar o repositório depois de receber a nota |
| 7 | **Vídeo acima de 7 minutos** ou com permissão de visualização errada | Médio — penalidade no Critério 1 (peso 1,50) | Cronometrar a gravação, cortar takes excedentes e revisar a permissão "qualquer pessoa com o link" antes de enviar |
| 8 | **Nota zero por plágio** — o briefing penaliza cópia da internet ou de colegas com nota 0 | Alto — zera a avaliação | Escrever todas as linhas do zero, comentar o raciocínio e saber explicar cada trecho; usar o briefing e a documentação apenas como referência. A seção 4 do briefing autoriza pedir ajuda à IA, desde que o resultado seja adaptado ao desafio e cada linha seja explicada com segurança — a penalidade é pela cópia, não pelo uso da ferramenta |
| 9 | **Links não submetidos no AVA** geram penalidade na nota | Alto — perda direta de pontos | Submeter os links do item 4 do briefing assim que o repositório, o quadro e o vídeo estiverem públicos |

---

## Checklist final de entrega

Reprodução do "Checklist Final de Entrega" da seção 7 do briefing, para conferência antes do envio no AVA.

- [ ] Criei o repositório público no GitHub
- [ ] Criei o index.html com HTML semântico
- [ ] Criei o style.css com Flexbox e responsividade
- [ ] Criei o formulário de perfil (nome, idade, gêneros)
- [ ] Implementei localStorage para persistir o perfil
- [ ] Busquei o catálogo real via fetch na TVMaze API
- [ ] Tratei erros da chamada à API (try/catch e mensagem amigável se falhar ou vier vazio)
- [ ] Tratei o catálogo com pelo menos 3 métodos de array
- [ ] Adaptei as classes Conteudo e Serie (herança e this)
- [ ] Calculei e classifiquei a compatibilidade
- [ ] Renderizei os resultados dinamicamente no DOM
- [ ] Usei callback
- [ ] Usei closure
- [ ] Usei uma Browser API de tempo (setTimeout/SetInterval/Geolocation)
- [ ] Separei script.js, ui.js e modelo.js com import/export
- [ ] Servi o projeto com um pacote local (ex.: live-server)
- [ ] Cuidei de SEO básico e acessibilidade
- [ ] Testei em desktop e celular
- [ ] Criei o README.md
- [x] Criei o quadro Kanban
- [ ] Fiz commits e usei ao menos uma branch de feature no GitHub
- [ ] Gravei o vídeo de até 7 minutos
- [ ] Coloquei o vídeo com permissão correta para ver via link
- [ ] Enviei os links no AVA
