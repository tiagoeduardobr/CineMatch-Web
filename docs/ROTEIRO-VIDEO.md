# Roteiro — vídeo de 7 minutos (`M1-T22`)

Documento de apoio à gravação prevista no item **5.8 do briefing**. Cobre os 5 questionamentos obrigatórios, em ordem, com tempo fechado para caber nos **7 minutos**.

> **Antes de gravar.** O tópico 4 pergunta pelas branches, e o fluxo só termina quando o código chega na `main`. Grave **depois** que o `README.md` existir e o merge `develop → main` (`M1-T21`) acontecer. Gravar antes é descrever um fluxo que ainda não terminou.

> **Cheque 10 minutos antes:** `npm start` abrindo em `localhost:8080`, internet ligada (TVMaze) e perfil já preenchido — a demonstração é a segunda coisa que você mostra, não a primeira coisa que você descobre no meio da gravação.

| Tópico | Tempo | Janela |
| --- | --- | --- |
| Abertura | 20s | 0:00 — 0:20 |
| 1. Objetivo e demonstração | 150s | 0:20 — 2:50 |
| 2. Como executar | 45s | 2:50 — 3:35 |
| 3. Organização das tarefas | 75s | 3:35 — 4:50 |
| 4. Branches | 75s | 4:50 — 6:05 |
| 5. O que faltou | 45s | 6:05 — 6:50 |
| Encerramento | 10s | 6:50 — 7:00 |

---

## 0:00 — 0:20 · Abertura

> "Isso aqui é o CineMatch Web, o projeto final do Módulo 01. Em sete minutos eu mostro o que ele faz, como roda, como organizei o trabalho, quais branches criei e o que eu mudaria se começasse de novo."

---

## 0:20 — 2:50 · Tópico 1 — Objetivo e demonstração

**Diga:**

> "O CineMatch JS rodava no terminal: uma pessoa digitava `node cinematch.js`, escolhia gêneros e recebia uma recomendação de um catálogo que eu tinha inventado. Funcionava, mas só rodava no meu computador, e só quem sabia abrir o terminal conseguia usar.
>
> O objetivo deste projeto é pegar essa mesma lógica e dar a ela uma interface que qualquer pessoa abre no navegador — inclusive no celular. A pessoa preenche um formulário com nome, idade e gêneros; o perfil fica guardado no `localStorage`; o site busca o catálogo **real** na API pública da TVMaze; e devolve cards com séries ordenadas por compatibilidade, com um badge dizendo se a afinidade é alta, média ou baixa."

**Tela — demonstração em 3 movimentos:**

1. Formulário: preencha na frente da câmera, mostre os erros de validação se deixar um campo vazio.
2. Os cards aparecendo — e diga o que a pessoa está vendo: *"esse aqui tem 92% de afinidade porque temos três gêneros em comum"*.
3. Recarregue a página — o perfil volta sozinho. É o `localStorage` provando que funciona.

**Frases que valem mostrar, porque é o que o professor pontua (Critério 5):**

> "A faixa não é chute: acima de 80% é **alta afinidade**, acima de 50% é **média**, abaixo é **baixa** — e o valor é arredondado **antes** de comparar, senão um 79,5 cairia em média e o card mentiria."

**Se quiser encaixar uma linha sobre os requisitos, é aqui:**

> "Tem `fetch` com `try/catch` e `response.ok`, três estados de tela — carregando, vazio e erro —, `localStorage` sempre protegido por `try/catch`, e os resultados são construídos com `createElement` e `textContent`, nunca com `innerHTML`. Dado que vem de fora da API nunca é interpretado como marcação."

---

## 2:50 — 3:35 · Tópico 2 — Como executar

> "É HTML, CSS e JavaScript puro — sem framework, sem bundler, sem build. Os três módulos usam `import` e `export` nativos, então **não pode** abrir o `index.html` com duplo clique: módulo ES não roda por `file://` e dá erro de CORS. O caminho é:
>
> ```bash
> npm install
> npm start
> ```
>
> Isso sobe o `live-server` na porta 8080 e a página abre sozinha."

**Tela:** rode os dois comandos no terminal e deixe o navegador abrindo.

---

## 3:35 — 4:50 · Tópico 3 — Organização das tarefas

> "Antes de escrever uma linha de código, eu separei o trabalho em **25 tasks** num quadro Kanban — `M1-T00` até `M1-T24` —, cada uma com seus critérios de aceitação e rastreabilidade para os 15 requisitos funcionais. Cada task só sai de *A Fazer* quando o código **funciona e foi testado**, não quando foi escrito.
>
> Hoje estão fechadas **19**. As seis que faltam são de entrega: teste integrado, README, consolidação do fluxo, este vídeo, links e um bônus de interface.
>
> A regra que usei pra não me perder: uma task só entra em *Em andamento* com timestamp e responsável na própria linha, e o checkbox é a única fonte de verdade do estado."

**Tela:** abra o `docs/KANBAN.md` e role pelas colunas — mostre *Concluído* cheia e o bloco de proveniência com data e nome.

---

## 4:50 — 6:05 · Tópico 4 — Branches

> "Quatro branches, e cada uma tem um papel:
>
> - **`main`** — branch de produção. Ela recebe o código só no fim do projeto, por exigência do professor. Guarda a entrega oficial.
> - **`develop`** — branch de integração. Todo trabalho converge aqui. É onde eu testo o conjunto antes de fechar.
> - **`feature/cinematch-web`** — a minha branch de lógica: API, classes, compatibilidade, `localStorage`.
> - **`feature/cinematch-web-interface`** — a branch de interface do meu parceiro: HTML, CSS, formulário, cards, design system.
>
> O fluxo é `feature/*` → `develop` → `main`, no final. **Não** criei uma branch por requisito — o objetivo foi mostrar que sei separar trabalho numa branch de feature e trazer de volta, não multiplicar branches."

**Números que sustentam o discurso:**

> "São **111 commits** em `develop`, todos em Conventional Commits: **20** `feat:`, **11** `style:`, **38** `docs:`, além de `chore:` e `refactor:` e os merges. Arquivo por arquivo, com `git add <arquivo>` — nunca `git add .`"

**Tela:** `git branch -a`, depois `git log --oneline --graph --all | head -30`.

---

## 6:05 — 6:50 · Tópico 5 — O que faltou e o que eu melhoraria

> "Três coisas, sem maquiagem.
>
> **Primeiro:** o catálogo pega só a primeira página da TVMaze. Dá pra buscar `?page=1`, `?page=2` e ampliar bastante — está no backlog.
>
> **Segundo:** quem está vendo os cards não consegue filtrar por gênero nem ordenar por avaliação sem preencher o formulário de novo. As funções de array já estão lá — o `sort` com `localeCompare` em português existe —, falta só a interface chamar.
>
> **Terceiro:** falta o teste integrado em celular de verdade. Eu validei o comportamento, mas o teste manual em dispositivo físico ainda é pendência minha."

**Encerramento:**

> "Isso é o CineMatch Web: mesma lógica do terminal, agora com cara de produto. Obrigado."

---

## Avisos práticos

1. **Rosto e luz** — o item 5.8 cobra explicitamente rosto visível e local bem iluminado. Vertical ou horizontal, tanto faz.
2. **Não decore os números** — se errar um, erra na frente do professor. Deixe o terminal aberto atrás e leia de lá.
3. **Insira o vídeo no `README.md`** — é dica do próprio briefing, e já vale o Critério 3.

**Ritmo:** 420 segundos no total. Se estourar, corte no tópico 5 — os quatro primeiros são obrigatórios por serem perguntas objetivas; o quinto é o que aceita resumo.
