/**
 * CineMatch Web — módulo de fluxo.
 *
 * Responsabilidade (AGENTS.md, seção 3): formulário, `localStorage`, busca na
 * API e cálculo da compatibilidade. Isso tudo entra depois, nas tarefas M1-T05 a
 * M1-T10. Este arquivo é o esqueleto da tarefa M1-T01 (RF15 parcial).
 *
 * Os `import` abaixo já apontam para os dois módulos irmãos, na mesma pasta, com
 * caminho relativo e extensão explícita — é assim que o navegador resolve módulos
 * ES. Os placeholders existiam para que este arquivo carregasse sem erro: o
 * PLACEHOLDER_MODELO saiu na M1-T09 (modelo.js) e o PLACEHOLDER_UI saiu na
 * M1-T11 (ui.js). JÁ FEITO NA M1-T11: o import já traz o renderizarCard.
 * JÁ FEITO NA M1-T13: e o exibirMensagemDeBoasVindas, o corpo do callback do
 * RF10, que este arquivo recebe como argumento e dispara em concluirBusca.
 * JÁ FEITO NA M1-T14: e o exibirContadorDeRecalculos, a função de tela do
 * número que a closure do RF11 accountou — este arquivo lê o total e repassa.
 * JÁ FEITO NA M1-T15: e o exibirMensagemDeCarregando e o
 * exibirResultadosComAtraso, o estado de carregando do RF12 e o atraso
 * proposital da exibição — os dois nascem em js/ui.js, porque os dois são de
 * tela, e este arquivo só os chama.
 *
 * A página só funciona servida por `npm start` (live-server): módulos ES não
 * carregam via file://, por causa do CORS. O live-server é instalado na M1-T18.
 */
import {
  renderizarCard,
  exibirMensagemDeErro,
  exibirMensagemDeCatalogoVazio,
  exibirMensagemDeBoasVindas,
  exibirContadorDeRecalculos,
  exibirMensagemDeCarregando,
  exibirResultadosComAtraso,
} from "./ui.js";
import { Conteudo, Serie } from "./modelo.js";

// Os dois `import` acima continuam apontando para os módulos irmãos, na
// mesma pasta. Nenhum dos dois nomes placeholder aparece no corpo do
// arquivo. JÁ FEITO NA M1-T09: PLACEHOLDER_MODELO saiu no mesmo passo em
// que as classes entraram em modelo.js. JÁ FEITO NA M1-T11: PLACEHOLDER_UI
// saiu no mesmo passo em que o renderizarCard entrou em ui.js, e o `import`
// do topo foi ajustado junto: sem esse ajuste o nome deixa de existir em
// ui.js e o grafo de módulos não carrega. Ver o bloco M1-T17.
// JÁ FEITO NA M1-T13: o mesmo `import` do topo ganhou mais um nome,
// exibirMensagemDeBoasVindas, porque o RF10 é medido sobre a passagem da
// função — e uma função só é passada como argumento se foi importada antes.
// É o mesmo contrato dos outros três: o nome existe em ui.js e é citado aqui.
// JÁ FEITO NA M1-T14: o mesmo `import` do topo ganhou um quinto nome,
// exibirContadorDeRecalculos, e o motivo é o mesmo da M1-T13: o número que a
// closure do RF11 accountou precisa de uma função de tela, e essa função só
// pode ser chamada daqui se foi importada antes. A leitura do total fica deste
// lado, em `contadorRecomendacoes.obterTotal()`, e não do lado de lá: passar o
// par para o ui.js daria ao módulo de tela acesso ao estado privado.
// A referência por número de linha que este bloco usava saiu junto: o `import`
// do ui.js passou a ocupar várias linhas, e foi para o número de linha que o
// próprio quadro proíbe em nota — vale por seletor, ID ou nome de elemento.
//
// JÁ FEITO NA M1-T15: o mesmo `import` do topo ganhou mais dois nomes,
// exibirMensagemDeCarregando e exibirResultadosComAtraso, e o motivo é o mesmo
// dos quatro anteriores: os dois são de tela, e só podem ser chamados daqui se
// foram importados antes. A escrita direta da frase de carregando em
// #resultados-status saiu de buscarCatalogo no mesmo passo — é o débito que a
// nota da M1-T07 do docs/KANBAN.md marcou para esta task. O atraso do RF12
// também não é escrito aqui: este arquivo só passa a apresentação adiada para
// a função de tela, que é quem segura o setTimeout.
//
// NÃO HÁ LINHA DE CONSOLE NESTE ARQUIVO, e isso é decisão, não esquecimento:
// o professor não quer código de console no material entregue. O que a linha de
// bootstrap fazia — provar que os três módulos carregaram — continua verificável
// sem ela, na aba Network e no Console do DevTools, que é onde qualquer erro
// de módulo aparece sozinho.
//
// Este arquivo também é lido pelo Node na verificação (`node js/script.js`), e
// é por isso que a execução tem de parar antes de tocar em `document`,
// `window` e `localStorage`. O guard `typeof document !== "undefined"` no fim
// do arquivo é o que separa o navegador do Node, e ele não é um detalhe: sem
// ele, `node js/script.js` quebra com ReferenceError.

// ────────────────────────────────────────────────────────────────────────────
// ESBOÇO COMENTADO DA LÓGICA — MAPA DE TRABALHO, NÃO CÓDIGO
// ────────────────────────────────────────────────────────────────────────────
/**
 * O QUE ESTE TRECHO É
 *   O mapa do que ainda vai ser escrito neste arquivo. Cada bloco marcado com
 *   o prefixo de tarefa aponta um passo do roteiro da seção 5.1 do briefing e
 *   diz o que escrever naquele ponto, por que ele existe, de qual exercício de
 *   aula veio a técnica e o que o professor pediu no briefing.
 *
 *   NADA DAQUILO É EXECUTÁVEL. São comentários: a página funciona exatamente
 *   igual antes e depois de ler este arquivo. A lógica entra quando cada um
 *   escrever o seu bloco, e a forma final é de quem implementa. Citar, não
 *   copiar: a forma final é sua, e você precisa saber explicar cada linha.
 *
 *   O ESTADO DAS TASKS NÃO MORA AQUI. O `docs/KANBAN.md` é a fonte de verdade
 *   do que já está feito; nenhum checkbox muda por causa deste esboço.
 *
 * ROTEIRO DESTE ARQUIVO (a ordem é a da seção 5.1 do briefing)
 *   M1-T05  captura no submit e validação do formulário
 *   M1-T06  persistir o perfil no localStorage
 *   M1-T07  buscar o catálogo real na TVMaze com fetch
 *   M1-T08  tratar o catálogo com métodos de array
 *   M1-T09  instanciar as classes que vivem em modelo.js
 *   M1-T10  orquestrar o cálculo da compatibilidade
 *   M1-T13  disparar o callback depois da renderização inicial
 *   M1-T14  guardar o contador numa closure
 *   M1-T17  amarrar o grafo de módulos: import e export
 *   M1-T18  servir com npm start, porque file:// não carrega módulo
 *
 * CONTRATO DE IDS COM O HTML (M1-T03, do Lucas, em index.html)
 *   O JavaScript conversa com o HTML por estes seletores, e os nomes vêm do
 *   exemplo do professor: no RF02 (pág. 5) para o formulário e no RF08
 *   (pág. 8) para o container dos cards. Nenhum dos dois lados renomeia
 *   sozinho:
 *     #form-perfil    o <form> que dispara o evento submit
 *     #nome           campo de nome, com o label apontando por for="nome"
 *     #idade          campo de idade, com min="1" e required
 *     name="genero"   atributo comum a todos os checkboxes de gênero
 *     #resultados     onde os cards de recomendação são anexados
 *     #botao-trocar-perfil   o <button type="button"> que reabre o formulário.
 *                     Esse id NÃO está no exemplo do briefing: foi combinado
 *                     entre as duas pessoas e já está escrito no index.html,
 *                     dentro de .cartao-perfil e logo acima do #form-perfil.
 *                     É o botão que o bloco M1-T06, mais abaixo, escuta.
 *
 * REGRAS DESTE MÓDULO (AGENTS.md, seções 2 e 2.1)
 *   Permitido: HTML5 semântico, CSS3 com Flexbox, JavaScript com módulos ES
 *   nativos, fetch, localStorage e o live-server via npm.
 *   Proibido: React, React Native, Vue, Angular, Next.js, qualquer outro
 *   framework JS, TypeScript, bundlers e build (Webpack, Vite, Babel), CSS
 *   Grid, Sass, CSS-in-JS, back-end, servidor ou banco de dados, fetch com
 *   POST/PUT/DELETE gravando em servidor, jQuery, axios, qualquer biblioteca
 *   não vista em aula e !important.
 *   Sem perguntar antes de usar: ?. , Object.assign, structuredClone,
 *   AbortController, IntersectionObserver, ResizeObserver, debounce,
 *   throttle, <template>, padStart e o namespace Intl. (localeCompare com
 *   "pt-BR" NÃO é esse namespace e está liberado). O método que apaga UMA
 *   chave saiu da lista porque foi ensinado; o clear, que apaga todas, não.
 *   ?? apareceu uma vez em cinematch_antigo/cinematch.js:211 e não foi
 *   ensinado: não replique.
 *   Três estados da chamada à API, sempre: carregando, vazio e erro.
 */

// ────────────────────────────────────────────────────────────────────────────
// M1-T06 · RF03 · PERSISTIR O PERFIL NO localStorage
// ────────────────────────────────────────────────────────────────────────────
/**
 * O QUE ESTE TRECHO FAZ
 *   Grava o perfil quando o formulário é enviado, recupera o perfil gravado
 *   quando a página abre de novo, pula o formulário para quem já tem perfil e
 *   devolve o formulário para o botão "Trocar perfil".
 *
 * POR QUE ESTE TRECHO EXISTE
 *   O RF03 pede que o perfil sobreviva ao recarregamento. O localStorage é o
 *   único armazenamento que o Módulo 01 autorizou (AGENTS.md, seção 2): sem
 *   ele, cada F5 joga o perfil fora e o formulário reaparece toda vez.
 *
 * REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
 *   semana-11/ceu-aberto/script.js — a FORMA do setItem(chave, valor) e do
 *   getItem(...). Duas diferenças em relação a esse arquivo, e as duas são
 *   deliberadas: o try/catch exigido pela seção 7 do briefing não aparece lá
 *   e foi acrescentado aqui; e o padrão do getItem virou `if`, porque o que a
 *   função devolve na ausência de perfil é null, e não a string que um
 *   `|| padrão` devolveria.
 *
 * POR QUE ESTA PARTE MORA AQUI E NÃO NO ui.js
 *   A divisão do AGENTS.md, seção 3, manda que tudo que toca a tela vá para
 *   ui.js, e o esboço da M1-T06 em js/ui.js atribui ao Lucas a função de
 *   reabrir o formulário. Ela ainda não foi escrita, e o RF03 precisa existir
 *   antes dela. Escrever no DOM a partir deste arquivo é uma dívida
 *   temporária, assumida aqui e registrada como pendência no docs/KANBAN.md.
 *
 * TRECHO DO BRIEFING (docs/BRIEFING.md, RF03, pág. 6)
 *   localStorage.setItem('cinematchPerfil', JSON.stringify(usuario));
 *   const perfilSalvo = localStorage.getItem('cinematchPerfil');
 *   if (perfilSalvo) {
 *     const usuario = JSON.parse(perfilSalvo);
 *     // pula o formulário e mostra o catálogo direto
 *   }
 *
 * CONFORMIDADE
 *   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado
 *     como referência. A forma final é sua, e você precisa saber explicar cada
 *     linha.
 *   - Um registro de confirmação é o que o RF04 do briefing pedia para
 *     comprovar a chamada de rede. O professor afastou esse registro do código
 *     entregue, e a entrega substitui essa evidência por esta: o resultado
 *     aparece na tela, em #resultados-status, e a falha de armazenamento
 *     também. O conflito está registrado como risco 12 no docs/KANBAN.md.
 */

// A chave do registro é uma constante e não um texto repetido: o nome é o
// contrato entre quem grava e quem lê, e dois literais que divergem quebram o
// perfil sem erro nenhum, porque o getItem só devolve null. `const` porque o
// valor não muda depois de declarado, e o escopo de módulo já impede que ele
// vire um global — que é exatamente o que o RF11 proíbe para o contador.
const CHAVE_PERFIL = "cinematchPerfil";

/**
 * Grava o perfil e devolve se conseguiu.
 *
 * POR QUE O try/catch: o modo de falha real do localStorage não é erro de
 * sintaxe, é cota excedida ou storage limpo pelo navegador — risco 3 do
 * quadro. Nesses casos o setItem lança exceção, e uma exceção sem tratamento
 * dentro do evento submit corta o resto do fluxo: a pessoa preencheu o
 * formulário, não viu erro nenhum e ficou sem resposta. Então a falha da
 * persistência vira aviso na tela e o app segue funcionando, só deixa de
 * lembrar do perfil na próxima visita. Isso é o que o risco 3 pede: seguir
 * sem persistência, em vez de quebrar.
 *
 * POR QUE DEVOLVE booleano: quem chama precisa saber se pode prometer que o
 * perfil ficou guardado, e um objeto truthy não distingue "gravado" de "não
 * gravado".
 */
function salvarPerfil(usuario) {
  try {
    localStorage.setItem(CHAVE_PERFIL, JSON.stringify(usuario));
    return true;
  } catch (erro) {
    // `erro` não é repassado para a tela: quem lê a mensagem é a pessoa, e o
    // que ela lê é português e sem stack trace.
    return false;
  }
}

/**
 * Lê o perfil gravado e devolve o objeto, ou null quando não há perfil.
 *
 * O `if (!perfilSalvo)` é o mesmo mecanismo do `getItem(...) || padrão` da
 * semana 11, escrito com if: o getItem devolve null na primeira visita, e o
 * null e a string vazia são os dois falsy, então um teste só cobre os dois
 * casos. Não é `perfilSalvo === null` de propósito: a string vazia ainda pode
 * estar na chave de quem usou a versão anterior deste arquivo, que sobrescrevia
 * com "", e ela também precisa contar como "sem perfil".
 *
 * O try/catch cobre dois lançamentos, não um: o getItem lança quando o
 * storage está bloqueado, e o JSON.parse lança quando o conteúdo da chave não
 * é JSON — o que acontece se alguém editar a chave à mão no DevTools ou se uma
 * versão anterior do app tiver gravado outro formato. Nos dois casos o
 * tratamento é o mesmo, e é o mais seguro: tratar como visita sem perfil.
 */
function lerPerfilSalvo() {
  try {
    const perfilSalvo = localStorage.getItem(CHAVE_PERFIL);

    if (!perfilSalvo) {
      return null;
    }

    return JSON.parse(perfilSalvo);
  } catch (erro) {
    return null;
  }
}

/**
 * Apaga o registro do perfil, tirando a chave do `localStorage`.
 *
 * POR QUE ESTE MÉTODO E NÃO SOBRESCREVER COM "": quando este bloco foi
 * escrito, o AGENTS.md 2.1 punha o método que apaga uma chave na lista do
 * que não pode ser usado sem perguntar, e a informação estava errada — ele
 * foi ensinado. A solução da época era `setItem(CHAVE_PERFIL, "")`, e ela
 * resolvia pelo avesso: apagava o conteúdo e deixava a chave, e um registro
 * vazio na origem é um estado que a aplicação nunca pediu para ter. Com
 * removeItem a frase diz o que quer dizer — "esta chave não existe mais" —
 * e o getItem volta a devolver null, que é o contrato da primeira visita:
 * o efeito para quem lê é o mesmo, e agora é pela API, não por truque.
 *
 * POR QUE O try/catch: o mesmo do salvarPerfil — cota excedida ou storage
 * bloqueado lançam exceção, e sem tratamento o clique ficaria sem resposta.
 */
function limparPerfilSalvo() {
  try {
    localStorage.removeItem(CHAVE_PERFIL);
    return true;
  } catch (erro) {
    return false;
  }
}

/**
 * Troca a tela para o lado do catálogo: esconde o formulário e escreve a
 * mensagem com o nome da pessoa.
 *
 * O que é escondido é o FORMULÁRIO, e não a .secao-perfil inteira. A seção
 * contém o botão "Trocar perfil", e esconder a seção junto esconderia o botão
 * junto — o RF03 pede os dois, e um anula o outro.
 *
 * O `hidden` é atributo nativo do HTML, e a propriedade dele no DOM: atribuir
 * true põe o atributo e false tira. Ele resolve o "esconder" sem classe de CSS
 * e sem !important.
 *
 * `aviso` entra no fim da frase e quase sempre é "": ele só recebe texto
 * quando a gravação do perfil falhou. É a forma de levar à tela o que o catch
 * já devolveu por booleano.
 */
function mostrarResultados(usuario, aviso) {
  const secaoPerfil = document.querySelector(".secao-perfil");
  const secaoResultados = document.querySelector(".secao-resultados");
  const formPerfil = document.querySelector("#form-perfil");
  const statusResultados = document.querySelector("#resultados-status");
  const botaoTrocarPerfil = document.querySelector("#botao-trocar-perfil");

  secaoPerfil.hidden = true;
  secaoResultados.hidden = false;
  formPerfil.hidden = true;
  botaoTrocarPerfil.hidden = false;

  // Template literal, e não concatenação com `+`: a crase é a forma de
  // interpolar valor neste projeto. Mas a crase NÃO é a defesa contra XSS:
  // `${}` não escapa nada, e trocar `+` por crase não mudaria nada nessa
  // frente. A defesa é o DESTINO do valor, e o destino aqui é o textContent
  // lá embaixo: escreve o nome como texto e nunca o interpreta como
  // marcação. É o mesmo caminho que a M1-T11 aplica nos cards, e aqui o dado
  // é o nome que quem preencheu o formulário digitou.
  const saudacao = `Olá, ${usuario.nome}! Suas recomendações serão carregadas em seguida.`;
  statusResultados.textContent = `${saudacao}${aviso}`;
}

/**
 * Devolve o formulário para a tela, tirando o `hidden` e escribiendo a mensagem
 * que o chamador quiser.
 *
 * Os campos são limpos pelo chamador antes de reabrir o formulário. Assim,
 * "Trocar perfil" começa uma nova coleta, sem deixar dados do perfil anterior
 * misturados com o novo.
 */
function mostrarFormulario(mensagem) {
  const secaoPerfil = document.querySelector(".secao-perfil");
  const secaoResultados = document.querySelector(".secao-resultados");
  const formPerfil = document.querySelector("#form-perfil");
  const formularioStatus = document.querySelector("#formulario-status");
  const botaoTrocarPerfil = document.querySelector("#botao-trocar-perfil");

  secaoPerfil.hidden = false;
  secaoResultados.hidden = true;
  formPerfil.hidden = false;
  botaoTrocarPerfil.hidden = true;
  formularioStatus.textContent = mensagem;
}

function iniciarFormulario() {
  const formPerfil = document.querySelector("#form-perfil");
  const formularioStatus = document.querySelector("#formulario-status");
  const botaoTrocarPerfil = document.querySelector("#botao-trocar-perfil");

  botaoTrocarPerfil.addEventListener("click", function () {
    // `preventDefault` não cabe aqui e o motivo é o tipo do botão: ele é
    // type="button" no index.html, e não type="submit", então ele não submete
    // nada e não recarrega a página. O que ele NÃO pode fazer é recarregar —
    // o registro do localStorage sobrevive ao recarregamento, mas um
    // recarregamento que caia em file:// derruba os import por CORS e deixa o
    // index.html sem nenhum JavaScript (risco 2 do quadro).
    const registroFoiLimpo = limparPerfilSalvo();
    formPerfil.reset();

    if (registroFoiLimpo) {
      mostrarFormulario(
        "Preencha o formulário de novo para receber outras recomendações.",
      );
    } else {
      // Mesma regra do risco 3 no caminho inverso: a falha do storage é
      // avisada e o formulário abre de qualquer forma. O aviso precisa dizer a
      // consequência, que é o que importa: o perfil velho pode voltar a pular
      // o formulário na próxima visita. A frase abaixo é uma crase sem `${}`:
      // não entra valor nenhum nela, e o texto inteiro fica em uma linha só.
      mostrarFormulario(
        `Preencha o formulário de novo. Não conseguimos atualizar o registro deste navegador, então ele pode abrir sozinho na próxima visita.`,
      );
    }
  });

  formPerfil.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const formData = new FormData(formPerfil);
    const nome = formData.get("nome");
    const idade = Number(formData.get("idade"));
    const generosFavoritos = formData.getAll("genero");

    const usuario = {
      nome: nome.trim(),
      idade: idade,
      generosFavoritos: generosFavoritos,
    };

    const erros = [];

    if (usuario.nome === "") {
      erros.push("Informe seu nome.");
    }

    if (Number.isNaN(usuario.idade) || usuario.idade < 1) {
      erros.push("Informe uma idade válida.");
    }

    if (usuario.generosFavoritos.length === 0) {
      erros.push("Selecione pelo menos um gênero favorito.");
    }

    formularioStatus.textContent = "";

    if (erros.length > 0) {
      const mensagemErros = document.createElement("ul");
      mensagemErros.setAttribute("role", "alert");
      mensagemErros.setAttribute("aria-live", "assertive");

      for (let i = 0; i < erros.length; i++) {
        const itemErro = document.createElement("li");
        itemErro.textContent = erros[i];
        mensagemErros.appendChild(itemErro);
      }

      formularioStatus.appendChild(mensagemErros);
      return;
    }

    const persistiu = salvarPerfil(usuario);
    let aviso = "";

    if (!persistiu) {
      // O espaço inicial é proposital: o aviso entra no fim da saudação e
      // também no fim das frases dos TRÊS destinos de buscarCatalogo —
      // sucesso, erro e vazio (exibirMensagemDeCatalogoVazio, da M1-T08) —,
      // já que a mesma task de evento apaga tudo que estava no elemento. O
      // espaço no início + o ponto no fim é o que garante a junção limpa
      // nos três destinos, sem espaço duplo e sem frase colada.
      aviso = ` Não foi possível salvar o perfil neste navegador, então ele não será lembrado na próxima visita.`;
    }

    mostrarResultados(usuario, aviso);

    // Chamada sem `await` (fire-and-forget), e só neste ponto: a validação já
    // passou, o perfil já foi resolvido e o caminho de erros — que tem
    // `return` — nunca chega aqui. Buscar catálogo sem perfil válido não tem
    // para quem recomendar. Não sobra rejeição pendurada porque o catch
    // interno de buscarCatalogo nunca relança. O `aviso` vai junto: sem
    // repassá-lo, a função sobrescreveria a saudação e o recado de storage
    // na mesma task de evento, antes de qualquer paint. O `nome` é o terceiro
    // argumento e é o que a saudação do RF10 vai escrever: ele vem do campo
    // #nome do próprio formulário, já aparado e validado acima.
    buscarCatalogo(aviso, usuario.generosFavoritos, usuario.nome);
  });
}

// ────────────────────────────────────────────────────────────────────────────
// M1-T07 · RF04 · BUSCAR CATÁLOGO REAL VIA FETCH
// ────────────────────────────────────────────────────────────────────────────
/**
 * O QUE ESTE TRECHO FAZ
 *   Busca o catálogo real na TVMaze com fetch GET, escreve na tela os três
 *   momentos da chamada — carregando antes da rede, sucesso com a contagem e
 *   erro amigável quando algo falha — e guarda a resposta bruta em
 *   catalogoBruto, que a M1-T08 vai tratar.
 *
 * POR QUE ESTE TRECHO EXISTE
 *   O catálogo fictício da semana 6 estava no código e nunca falhava. Uma
 *   chamada de rede falha de verdade: a internet cai, a API sai do ar, a
 *   resposta vem com formato inesperado. Sem tratar isso, a página trava ou
 *   fica em branco sem explicação nenhuma para a pessoa — é o que o RF04
 *   (pág. 6) descreve e é o risco 4 do quadro. Este bloco fecha a coluna do
 *   Critério 13: try/catch + response.ok + estados da chamada.
 *
 * POR QUE FICA ANTES DO GUARD `typeof document !== "undefined"`
 *   Ordem de avaliação do módulo. O guard roda no carregamento e, com perfil
 *   salvo, chama buscarCatalogo já na primeira execução; se URL_CATALOGO e
 *   catalogoBruto fossem declaradas DEPOIS dele, essa chamada cairia em
 *   temporal dead zone — a função em si o hoisting resolve, a constante não.
 *   Declarar tudo antes do guard é o que elimina a corrida entre a
 *   inicialização e as declarações.
 *
 * POR QUE AS DUAS CHAMADAS NÃO LEVAM `await`
 *   Fire-and-forget: o guard e o handler submit continuam síncronos, e o
 *   catch interno de buscarCatalogo nunca relança, então não sobra rejeição
 *   sem tratamento. As duas chamadas também só existem onde há perfil
 *   válido — é a mesma razão de existir do bloco: sem perfil não há para
 *   quem recomendar.
 *
 * POR QUE NÃO HÁ CONSOLE, NEM ATRASO E NEM AS FERRAMENTAS FORA DA SEÇÃO 2.1
 *   O professor afastou o registro no console do código entregue (risco 12):
 *   a resposta bruta da TVMaze se confere na aba Network do DevTools, e o
 *   erro de rede aparece na tela, por exibirMensagemDeErro. O atraso
 *   proposital do RF12 é da M1-T15 e vai na EXIBIÇÃO: somado dentro desta
 *   função, ele atrasaria também o estado de erro e mascararia justamente a
 *   falha que este bloco existe para mostrar (risco 4).
 *   JÁ FEITO NA M1-T15: o atraso entrou, e continua FORA da chamada de rede —
 *   ele mora em exibirResultadosComAtraso, em js/ui.js, e esta função só o
 *   agenda DEPOIS de a rede responder e de o catálogo estar tratado e
 *   calculado. O catch, que é o que este parágrafo defende, continua sem
 *   atraso nenhum: a falha aparece na hora, com a frase amigável.
 *   AbortController,
 *   encadeamento opcional `?.`, `??`, Object.assign, axios e POST/PUT/DELETE
 *   estão fora do que a seção 2.1 libera sem perguntar: a chamada é um fetch
 *   GET puro, de leitura.
 *
 * REFERÊNCIA ENSINADA (AGENTS.md, seção 2.1)
 *   semana-11/ceu-aberto-api/script.js — a forma do try/catch com
 *   response.ok === false e throw new Error. O repositório das semanas não
 *   está clonado nesta máquina: é referência remota, citada como exemplo — a
 *   forma final deste bloco é escrita daqui, linha a linha.
 *
 * TRECHO DO BRIEFING (docs/BRIEFING.md, RF04, pág. 6 e 7)
 *   pág. 6: "O array fictício do CineMatch JS nunca falhava — ele estava
 *   sempre ali, no código. [...] Sem tratar isso, a página trava ou fica em
 *   branco sem explicação nenhuma pra pessoa usuária."
 *   pág. 7, a forma pedida:
 *   async function buscarCatalogo() {
 *     const resposta = await fetch('https://api.tvmaze.com/shows?page=0');
 *     ...
 *   }
 *
 * CONFORMIDADE
 *   - Citar, não copiar: o trecho acima é o exemplo do professor, comentado
 *     como referência. A forma final é sua, e você precisa saber explicar
 *     cada linha.
 *   - Os TRÊS estados da chamada, sempre: carregando (antes do fetch), erro
 *     (no catch) e sucesso com contagem (no fim do try). O estado VAZIO é da
 *     M1-T08: aqui uma lista vazia legítima passa crua, porque decidir o que
 *     sobrevive de genres e rating é o RF05.
 *   - `const` por padrão — URL_CATALOGO é contrato num lugar só, da mesma
 *     razão da CHAVE_PERFIL; `let` só em catalogoBruto, que muda a cada
 *     busca. Toda interpolação é template literal com ${}, e a defesa contra
 *     XSS é o destino do valor (textContent), nunca a crase.
 *   - `catch (erro)` ignora o erro, no mesmo padrão do salvarPerfil: à tela
 *     vai a frase amigável, em português — nunca erro.message nem stack
 *     trace. A causa continua acessível na aba Network.
 */

// A URL do catálogo é constante pela mesma razão da chave do perfil: o
// contrato fica escrito uma vez só, e uma troca de página é uma edição, não
// dois literais para manter em sincronia. `const` porque o valor não muda
// depois de declarado, e o escopo de módulo já impede que ele vire global.
const URL_CATALOGO = "https://api.tvmaze.com/shows?page=0";

// `let` porque este é o único valor do bloco que muda: a cada chamada de
// buscarCatalogo o catálogo novo sobrescreve o anterior, e é essa a tarefa
// da variável — a M1-T08 vai ler justamente o que ficou guardado aqui. O
// array começa vazio para a leitura nunca estourar se algo consumir a
// variável antes de a rede responder.
let catalogoBruto = [];

/**
 * RF08 · M1-T11 · Limpa a #resultados e desenha um card por série recomendada.
 *
 * A limpeza mora aqui, e não em ui.js, por dois motivos que valem mais que a
 * organização: o ui.js não conhece catalogoRecomendado, que é estado deste
 * arquivo; e limpar por card renderizado custaria uma reconstrução por item.
 * Aqui a tela é esvaziada uma vez e a lista inteira é percorrida em seguida.
 *
 * O seletor é escopado no container de propósito. #template-card-serie, no
 * index.html, também tem a classe card-serie e é IRMÃO de #resultados, então
 * document.querySelectorAll(".card-serie") o apagaria junto com os cards — e
 * o template sumiria da página sem nenhum erro no console. Procurar dentro de
 * #resultados não tem como alcançá-lo.
 *
 * Os dois laços são o for clássico com let i, que é a forma que o
 * cinematch_antigo/cinematch.js:397 usa e a que o AGENTS.md §2.1 manda portar
 * (as formas das linhas 171 e 330 do mesmo arquivo não declaram o i e quebram
 * em módulo ES). Não é map porque aqui não há array novo: o efeito é na tela.
 * E não é o método com callback porque ele não tem fonte neste repositório —
 * ver o item da M1-T09 no docs/KANBAN.md.
 *
 * @param {Array<{ titulo: string, generosEmComum: string[], generosNaoExplorados:
 *   string[], percentual: string, classificacao: string }>} lista
 *   Lista devolvida por calcularCompatibilidades.
 */
function renderizarCards(lista) {
  const container = document.querySelector("#resultados");
  const anteriores = container.querySelectorAll(".card-serie");
  for (let i = 0; i < anteriores.length; i++) {
    anteriores[i].remove();
  }
  for (let i = 0; i < lista.length; i++) {
    renderizarCard(lista[i]);
  }
}

/**
 * RF10 · M1-T13 · Encerra a busca disparando o callback que recebeu.
 *
 * POR QUE ESTA FUNÇÃO EXISTE E NÃO BASTA CHAMAR A SAUDAÇÃO DIRETO
 *   O RF10 é medido sobre a FORMA, não sobre o efeito: uma função recebida como
 *   parâmetro e disparada por quem a recebeu. Escrever
 *   `exibirMensagemDeBoasVindas(nome)` direto produziria exatamente o mesmo
 *   texto na tela e NÃO entregaria o requisito — o que separa callback de
 *   chamada comum é que quem recebe a função é quem decide o momento de
 *   dispará-la e o que ela recebe como argumento. Por isso o nome tem dono
 *   próprio e o disparo acontece dentro do corpo, e não no call site.
 *
 * POR QUE O NOME É REPASSADO AO CALLBACK
 *   O callback não busca nada: ele só escreve na tela. Quem tem o nome é o
 *   fluxo, e o nome chega aqui por parâmetro — vem do #nome do formulário ou do
 *   registro cinematchPerfil, repassado pelo terceiro argumento de
 *   buscarCatalogo. O callback(nome) é o que entrega o dado a quem precisa
 *   dele, no mesmo formato de um parâmetro comum.
 *
 * POR QUE NÃO É UMA FLAG "PRONTO"
 *   Uma variável dizendo que a busca acabou resolveria o mesmo efeito na tela
 *   com menos código, e é por isso que ela não vale: o Critério 8 mede a
 *   mecânica do callback, e flag não é callback.
 *
 * REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
 *   cinematch_antigo/cinematch.js:511 — saudacaoDespedida(usuario, callback)
 *   recebe a função como segundo parâmetro e a chama no corpo, na linha 519;
 *   a chamada de exemplo, saudacaoDespedida(usuario, despedida), está na
 *   linha 65. O que se porta é a FORMA — receber e disparar no corpo — e não o
 *   console, que o professor afastou do código entregue.
 *
 * @param {string} nome - nome da pessoa, repassado ao callback como argumento.
 * @param {Function} callback - função a ser disparada; recebe `nome`.
 */
function concluirBusca(nome, callback) {
  callback(nome);
}

/**
 * Busca o catálogo real e leva o resultado da chamada para a tela.
 *
 * A ordem interna é a do RF04: carregando, depois a rede, depois o corpo, e
 * qualquer passo que falhe cai no mesmo catch. `response.ok` é conferido
 * ANTES de ler o corpo, porque status 200 não garante corpo útil — e uma
 * resposta de erro ainda tem corpo (HTML de página de erro, por exemplo),
 * que seria lido como se fosse o catálogo.
 *
 * JÁ FEITO NA M1-T15: hoje há DOIS catch neste fluxo, e não um. O de cima é o
 * do fetch e continua cobrindo rede, `response.ok`, corpo inesperado e o
 * tratamento; o segundo embrulha a apresentação do resultado, que passou a
 * rodar dentro de um `setTimeout` (em js/ui.js) e por isso cai FORA do alcance
 * deste. A frase de erro é a mesma nos dois — ela virou uma `const` antes do
 * try justamente para não ser escrita duas vezes.
 *
 * O corpo é lido com `await resposta.json()` DENTRO do try de propósito:
 * json() lança em corpo que não é JSON, e essa exceção precisa cair no
 * mesmo lugar das demais, com a mesma mensagem, sem um catch à parte.
 *
 * O que NÃO faz: não escreve no console — a evidência da chamada continua
 * sendo a aba Network do DevTools (risco 12). Filtrar genres e rating e
 * tratar o catálogo vazio a função DELEGA: ela chama tratarCatalogo, da
 * região M1-T08 declarada logo abaixo, dentro do próprio try, e escreve o
 * estado vazio por exibirMensagemDeCatalogoVazio quando o tratamento vem
 * zerado. A lista vazia legítima continua passando crua pelo guard de
 * formato — decidir o que sobrevive de genres e rating é o RF05, e é a
 * tratarCatalogo que essa decisão foi delegada.
 *
 * POR QUE O PARÂMETRO `aviso` EXISTE E É REPASSADO A CADA ESTADO
 *   O aviso de falha de persistência da M1-T06 ("Não foi possível salvar o
 *   perfil…", risco 3 do quadro) é escrito em `#resultados-status` pelo
 *   submit ANTES desta função ser chamada — e esta função, na linha do
 *   carregando, sobrescreve o MESMO elemento na mesma task de evento, antes
 *   de qualquer paint acontecer. Sem repassar o aviso aqui, ele seria
 *   substituído no mesmo tick em que foi escrito e NUNCA apareceria na
 *   tela: é exatamente a regressão apontada no code-review da Task 3, que
 *   derrubaria o "avisando a pessoa usuária na tela" da M1-T06. Por isso o
 *   aviso entra de novo na frase de sucesso, na frase de erro e na frase do
 *   estado vazio (M1-T08), e por isso
 *   o estado de carregando NÃO o leva: o texto do carregando é o literal do
 *   briefing (RF12) e não pode ser alterado.
 *
 * @param {string[]} generosFavoritos - gêneros favoritos do perfil. Chegam por
 *   parâmetro e não por estado de módulo: o perfil já vive em cinematchPerfil,
 *   e um `let` a mais aqui seria uma segunda fonte da verdade que ficaria
 *   velha depois do botão "Trocar perfil".
 * @param {string} nome - nome da pessoa, para a saudação do RF10. Chega pelo
 *   mesmo caminho dos outros dois, por parâmetro, e é o terceiro na ordem: o
 *   nome é do formulário e, como os gêneros, não é recalculado aqui — é
 *   repassado. JÁ FEITO NA M1-T13: antes desta task o nome não chegava a lugar
 *   nenhum, porque esta função só recebia `aviso` e `generosFavoritos` e nenhum
 *   dos dois é o nome; a saudação ficava sem dado para escrever.
 */
async function buscarCatalogo(aviso, generosFavoritos, nome) {
  const statusResultados = document.querySelector("#resultados-status");

  // ESTADO 1 — carregando, escrito ANTES do fetch, por
  // exibirMensagemDeCarregando (js/ui.js). JÁ FEITO NA M1-T15: a frase saiu
  // daqui e passou a ser escrita pelo módulo de tela, que é onde ela sempre
  // deveria ter morado — é o débito que a nota da M1-T07 do docs/KANBAN.md
  // marcou para esta task. O texto continua sendo o literal do briefing, e o
  // alvo continua sendo o mesmo #resultados-status: pedir o estado antes da
  // chamada é o que distingue "rede lenta" de "página parada" — sem isto, os
  // dois parecem a mesma coisa na tela.
  exibirMensagemDeCarregando();

  // A frase de erro fica pronta UMA vez e serve para os DOIS catch deste
  // fluxo: o do fetch, lá embaixo, e o da apresentação adiada, que a M1-T15
  // criou. O segundo só existiu porque a apresentação saiu do alcance do
  // primeiro: o callback do setTimeout executa em outra task de evento, depois
  // de este try já ter terminado, e sem um try/catch do lado de dentro uma
  // exceção de DOM viraria página quebrada em vez de estado de erro — a mesma
  // consequência que o comentário da renderização prometia. O `${aviso}` entra
  // pela mesma razão de sempre: o carregando apagou o recado de persistência
  // no mesmo tick em que ele foi escrito, e sem repassá-lo aqui a pessoa nunca
  // veria o aviso. Junta sem espaço duplo porque o aviso já começa com um
  // espaço e a frase anterior termina em ponto; com "" (guard), nada muda.
  const mensagemDeErro = `Não foi possível carregar as séries agora. Verifique sua conexão com a internet e tente novamente.${aviso}`;

  try {
    // Fetch GET puro, sem axios e sem escrita em servidor: o Módulo 01 só
    // autoriza leitura. Rede indisponível lança aqui, dentro do try, e cai no
    // catch — não é um caminho de erro à parte, é o mesmo.
    const resposta = await fetch(URL_CATALOGO);

    // response.ok ANTES de ler o corpo, e na forma da referência ensinada:
    // `ok === false` (e não um `!ok` implícito) deixa a intenção legível. O
    // throw pula direto para o catch, sem else nenhum — e é por isso que o
    // corpo só é lido quando a resposta é boa.
    if (resposta.ok === false) {
      throw new Error(`A TVMaze respondeu com status ${resposta.status}.`);
    }

    // json() também lança, e como está DENTRO do try cai no mesmo catch do
    // erro de rede, com a mesma frase: para quem está na tela, corpo que não
    // é JSON e rede fora não são problemas diferentes.
    const corpo = await resposta.json();

    // Guarda de formato, também lançada para o mesmo catch. Usa
    // `length === undefined` e não Array.isArray: o método não aparece no
    // material clonado e está fora do que a seção 2.1 libera sem perguntar.
    // Uma lista vazia LEGÍTIMA passa daqui sem virar erro — tratar o vazio é
    // a M1-T08, e fazer aqui descartaria o corpo cru que ela precisa ler.
    if (corpo === null || corpo.length === undefined) {
      throw new Error("A resposta da TVMaze não veio como lista de séries.");
    }

    // A resposta bruta fica guardada SEM filtro nenhum: genres e rating
    // incompletos são reais na TVMaze, e decidir o que sobrevive é o
    // trabalho do RF05 (M1-T08), não desta chamada.
    catalogoBruto = corpo;

    // O tratamento roda AQUI, dentro do try, e não fora dele: se
    // tratarCatalogo lançar por qualquer motivo — dado novo da API com
    // formato inesperado, por exemplo —, a exceção cai no catch abaixo e
    // vira o estado de erro amigável, nunca uma página quebrada. É a mesma
    // proteção do `await resposta.json()` e do guard de formato, que também
    // lançam para o mesmo lugar.
    catalogoTratado = tratarCatalogo(catalogoBruto);

    // A orquestração do RF07 roda AQUI, dentro do try, pelo mesmo motivo do
    // tratamento acima: se uma série vier com formato inesperado, a exceção cai
    // no catch e vira estado de erro, nunca página quebrada. Ela roda ANTES da
    // bifurcação das mensagens, e é por isso que a frase de sucesso passa a ser a
    // prova de que o cálculo rodou. E aqui não entra cópia da fórmula: os
    // limiares vivem no método da Serie, em js/modelo.js, então mudam em um
    // lugar só.
    catalogoRecomendado = calcularCompatibilidades(generosFavoritos);

    // RF12 · M1-T15 — a apresentação do resultado é ADIADA por
    // exibirResultadosComAtraso (js/ui.js), que é quem segura o setTimeout. O
    // atraso entra aqui, depois de a rede responder e de o catálogo estar
    // tratado e calculado, e nunca dentro do fetch: é a regra do AGENTS.md §7
    // e a mitigação do risco 4 do quadro — somado à chamada de rede, ele
    // atrasaria também o estado de erro. Este call site é, então, o único ponto
    // em que o RF12 acontece: a rede já respondeu, e o que se adia é só o
    // desenho do resultado.
    //
    // O try/catch que embrulha a apresentação DENTRO do callback não é
    // redundância: o setTimeout executa em OUTRA task de evento, depois que o
    // try externo desta função já terminou, então uma exceção de DOM não
    // chegaria mais no catch lá embaixo. Com ele, a consequência é a mesma de
    // sempre — exceção vira estado de erro amigável, nunca página quebrada —,
    // só que 800 ms depois. É por isso que a frase de erro virou uma `const`
    // antes do try: os dois catch escrevem o mesmo texto, com o mesmo aviso, e
    // sem a string ficar escrita em dois lugares.
    exibirResultadosComAtraso(function () {
      try {
        // A renderização dos cards roda PRIMEIRO aqui, antes da bifurcação das
        // mensagens, pelo mesmo motivo do cálculo lá em cima. JÁ FEITO NA
        // M1-T15: ela saiu do try externo e passou a rodar dentro deste — o
        // comentário que existia prometia que uma exceção de DOM viraria
        // estado de erro, e é este try/catch que mantém a promessa, porque o
        // catch de fora já não alcança esta execução. Ela entra ANTES do if do
        // estado vazio porque, quando o tratamento não deixa nada de pé, a
        // limpeza ainda roda — é isso que impede os cards do perfil anterior
        // de sobrarem quando o botão "Trocar perfil" leva a um catálogo vazio.
        // O carregando já foi apagado por exibirResultadosComAtraso antes de
        // chegar até aqui, então ele nunca convive com os cards.
        renderizarCards(catalogoRecomendado);

        // RF10 · M1-T13 — o callback, disparado aqui. `exibirMensagemDeBoasVindas`
        // entra como ARGUMENTO, sem parênteses: quem a recebe é `concluirBusca`, e é
        // ela quem a dispara, no corpo. Chamar a saudação direto aqui daria o
        // mesmo efeito na tela e não entregaria o RF10, que é medido sobre a forma.
        //
        // A ORDEM É DE LEITURA, não de execução: a saudação entra DEPOIS de
        // renderizarCards e ANTES da bifurcação dos estados. Antes dos cards, ela
        // chegaria sozinha na tela e a frase de sucesso — que é a prova de que o
        // cálculo rodou — viraria a última linha lida. Depois da bifurcação, o
        // cartão de estado já teria falado por último e a saudação entraria como
        // remendo, e não como chegada.
        //
        // Ela escreve em #resultados-boas-vindas, o <p> que fica entre o
        // #resultados-status e o <hr class="separador"> no index.html, e por isso a
        // bifurcação logo abaixo não apaga o nome: os quatro estados escrevem no
        // #resultados-status, que é outro elemento.
        //
        // JÁ FEITO NA M1-T15: a chamada passou a rodar dentro da apresentação
        // adiada, e nada mudou na forma nem na ordem relativa — o callback
        // continua sendo argumento de concluirBusca, continua depois dos cards
        // e continua antes da bifurcação; o que mudou foi quando ela acontece,
        // 800 ms depois, junto com o resto do desenho do resultado.
        concluirBusca(nome, exibirMensagemDeBoasVindas);

        // RF11 · M1-T14 — o total vai para a tela. `obterTotal()` é lido do par
        // criado uma vez no carregamento do módulo, e o NÚMERO PRONTO é repassado
        // para a função de tela: quem guarda não escreve, e quem escreve não
        // calcula nem guarda. É o contrato do par de funções da closure com a
        // função de exibição, e ele fica na mesma linha do callback da RF10 acima:
        // as duas coisas que a tela recebe prontas depois que os cards estão
        // pintados.
        //
        // O alvo é #resultados-contador, o <p> que fica dentro de
        // .cabecalho-resultados no index.html, e NÃO o #resultados-status: os
        // quatro estados da chamada — carregando, sucesso, erro e o catálogo
        // vazio — sobrescrevem o #resultados-status por consequência, e o contador
        // morreria junto com o primeiro deles. É o mesmo motivo que separou a
        // saudação da M1-T13 em outro elemento, e vale para o mesmo elemento: o
        // número sobrevive à bifurcação dos estados logo abaixo.
        //
        // A leitura é feita aqui, e não dentro da função de tela, por uma razão
        // que é o próprio RF11: quem lê o total é o código que tem o par, e passar
        // o par para a função de tela a faria capaz de mexer no estado privado —
        // que é justamente o que a fechamento esconde.
        //
        // JÁ FEITO NA M1-T15: a leitura passou a acontecer dentro da
        // apresentação adiada, e continua sendo feita DESTE lado: o par segue
        // no módulo de fluxo, e o número chega pronto à função de tela.
        exibirContadorDeRecalculos(contadorRecomendacoes.obterTotal());

        // ESTADO 2 — sucesso, agora com a bifurcação do RF05. Continua
        // sobrescrevendo o carregando no MESMO elemento, e a regra "os estados
        // não podem ficar na tela ao mesmo tempo" se resolve pelo alvo comum.
        // JÁ FEITO NA M1-T15: passou a existir também um código de limpeza
        // explícito — a primeira instrução do callback do setTimeout, em
        // js/ui.js, apaga o carregando ANTES dos cards desenharem, enquanto a
        // sobrescrita de aqui continua sendo o que troca um estado FINAL por
        // outro. Os dois mecanismos se complementam: um tira o carregando na
        // hora certa, o outro impede que dois estados finais coexistam. Quando
        // o tratamento não deixa nada de pé, quem fala é o estado VAZIO —
        // exibirMensagemDeCatalogoVazio, da M1-T08, com a frase do professor;
        // caso contrário, a frase de sucesso mostra OS DOIS números, o bruto que
        // veio da API e o tratado que segue adiante (240 → 8 medidos), que é a
        // evidência na tela do RF05 no lugar do registro de console que o
        // briefing pedia (risco 12). Dizer só "240 séries disponíveis" seria
        // enganoso: são 8 que fluem para a M1-T09. O `${aviso}` reentra nos
        // DOIS ramos desta bifurcação (vazio e sucesso); o terceiro destino, o
        // erro, é o catch lá no fim desta função — e o deste próprio try, se a
        // apresentação falhar antes de escrever qualquer um dos dois. O
        // carregando apagou a saudação com o recado de storage na mesma task
        // de evento: sem repassar, o aviso morreria antes do paint. O
        // carregando CONTINUA sem o aviso, porque o texto dele é o literal do
        // briefing (RF12) e não pode ser alterado. O aviso já vem com espaço no
        // início e as frases terminam em ponto, então a junção não gera espaço
        // duplo nem palavra colada; com "" (guard), nada muda.
        if (catalogoTratado.length === 0) {
          // Não é falha da chamada: o fetch respondeu, o corpo chegou inteiro,
          // só o filtro do RF05 não deixou nada de pé. Por isso a frase é a do
          // professor e não a de erro — três causas, três mensagens.
          exibirMensagemDeCatalogoVazio(aviso);
        } else {
          statusResultados.textContent = `Catálogo carregado: ${catalogoBruto.length} séries disponíveis, ${catalogoTratado.length} depois do tratamento.${aviso}`;
        }
      } catch (erro) {
        // ESTADO 3 (metade da apresentação) — exceção do DESENHO, não da rede.
        // `erro` é ignorado do mesmo jeito do catch externo: à tela vai a frase
        // amigável, com o mesmo `${aviso}`, e nunca erro.message nem stack
        // trace. Este catch é o preço de a apresentação ter saído do try de
        // cima — sem ele, a exceção sairia sem tratamento nenhum, porque o
        // setTimeout roda em outra task de evento —, e ele mantém a promessa do
        // comentário da renderização: exceção de DOM vira estado de erro,
        // nunca página quebrada.
        exibirMensagemDeErro(mensagemDeErro);
      }
    });
  } catch (erro) {
    // ESTADO 3 — erro. `erro` é ignorado, no mesmo padrão do salvarPerfil:
    // quem lê a mensagem é a pessoa, e o que ela lê é português, sem
    // erro.message e sem stack trace — a causa continua acessível na aba
    // Network. Aqui também não entra atraso nenhum: adiar a frase faria a
    // página parecer travada com o erro já conhecido, que é o efeito
    // contrário do que o RF04 pede. JÁ FEITO NA M1-T15: é justamente este o
    // contraste que o RF12 pede — o atraso proposital existe só no caminho de
    // exibição do resultado, embrulhado acima; a falha de rede continua sendo
    // anunciada na hora, no mesmo tick em que o fetch rejeita. O `${aviso}`
    // reentra pelo mesmo motivo do estado de sucesso: o carregando apagou o
    // recado de persistência, e sem repassá-lo aqui ele nunca chegaria ao
    // paint. Junta sem espaço duplo porque o aviso já começa com um espaço e a
    // frase anterior termina com ponto; com "" (guard), não muda nada.
    exibirMensagemDeErro(mensagemDeErro);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// M1-T08 · RF05 · TRATAR O CATÁLOGO COM MÉTODOS DE ARRAY
// ────────────────────────────────────────────────────────────────────────────
/**
 * O QUE ESTE TRECHO FAZ
 *   Toma o catálogo bruto que a M1-T07 guardou em catalogoBruto e devolve o
 *   array de no máximo 8 objetos { id, titulo, tipo, generos, duracaoMinutos }
 *   que a M1-T10 instancia. A cadeia filter → sort → slice → map é a do
 *   briefing e é ela que fecha o Critério 6 (utilização de métodos de array),
 *   mede a linha da M1-T08 no Critério 4 e ativa o estado vazio do trio da
 *   seção 7: quando o filtro não sobra nada, a tela explica em vez de deixar
 *   uma grade vazia sem explicação (risco 5 do quadro).
 *
 * POR QUE FICA ANTES DO GUARD `typeof document !== "undefined"`
 *   Ordem de avaliação do módulo, o mesmo argumento da M1-T07: o guard roda
 *   no carregamento e, com perfil salvo, chama buscarCatalogo já na primeira
 *   execução — e buscarCatalogo grava em catalogoTratado. Se a `let` fosse
 *   declarada DEPOIS do guard, essa chamada cairia em temporal dead zone e
 *   daria ReferenceError. A função, o hoisting resolve; a variável, não.
 *
 * POR QUE tratarCatalogo É PURA
 *   Sem document, sem fetch e sem escrita em #resultados: recebe um array e
 *   devolve outro. Decidir o estado da tela e escrever no DOM são papéis
 *   separados — a §3 do AGENTS.md manda dados no script.js e tela no ui.js,
 *   e é por isso que a frase do estado vazio mora em
 *   exibirMensagemDeCatalogoVazio, em js/ui.js. A pureza é também o que
 *   permite chamá-la dentro do try de buscarCatalogo: se ela lançar por
 *   qualquer motivo, o catch vira estado de erro amigável, nunca página
 *   quebrada.
 *
 * POR QUE `let` SÓ EM catalogoTratado E `const` NO RESTO
 *   `const` é o padrão do projeto: o valor não muda depois de declarado, e o
 *   escopo de módulo já impede que ele vire global. `let` fica em
 *   catalogoTratado porque é o único valor desta região que muda — a cada
 *   chamada de buscarCatalogo o resultado daquela busca sobrescreve o
 *   anterior. O `[]` inicial é para a leitura nunca estourar se algo consumir
 *   a variável antes de a rede responder, a mesma razão do `let
 *   catalogoBruto` da M1-T07. Toda interpolação de valor é template literal.
 *
 * POR QUE NÃO HÁ CONSOLE, ATRASO NEM AS APIs FORA DA SEÇÃO 2.1
 *   - console.log: o professor afastou o registro no console do código
 *     entregue (risco 12). A evidência do RF05 virou a própria mensagem de
 *     sucesso, que agora mostra os dois números — bruto e tratado.
 *   - setTimeout: o atraso proposital do RF12 é da M1-T15 e vai na
 *     EXIBIÇÃO, nunca no tratamento dos dados; dentro de um fetch ele
 *     mascararia justamente o estado de erro (risco 4).
 *     JÁ FEITO NA M1-T15: esta função continua sem setTimeout nenhum — o
 *     atraso mora em exibirResultadosComAtraso, em js/ui.js, e é chamado por
 *     buscarCatalogo DEPOIS que o tratamento já rodou.
 *   - ??, ?. e Object.assign não foram ensinados (§2.1), e Array.isArray não
 *     aparece no material: quem checa lista usa `length === undefined`, como
 *     o próprio buscarCatalogo já faz. O null do runtime é repassado como
 *     está, sem valor inventado — detalhe no JSDoc da função.
 *   - innerHTML: este bloco não escreve na tela, então não há destino nenhum
 *     aqui; quando houver, a defesa contra XSS é o DESTINO do valor
 *     (textContent), nunca a crase. Comentários que citam a proibição, como
 *     estes, são permitidos.
 *
 * REFERÊNCIA ENSINADA (AGENTS.md, seção 2.1)
 *   cinematch_antigo/cinematch.js — map (linhas 293 e 476), filter (297,
 *   429 e 477), sort com desempate por localeCompare("pt-BR") (438-448) e
 *   slice (256). Aqui o sort é numérico por nota, na ordem literal do
 *   briefing; localeCompare continua liberado, mas ordena TÍTULO, não nota —
 *   seria desempate opcional, sem efeito no top-8 medido.
 *
 * TRECHO DO BRIEFING (docs/BRIEFING.md, RF05, pág. 7)
 *   const catalogo = dados
 *     .filter(serie => serie.genres.length > 0 && serie.rating.average)
 *     .sort((a, b) => b.rating.average - a.rating.average)
 *     .slice(0, 8)
 *     .map(serie => ({ id: serie.id, titulo: serie.name, tipo: "Série", ... }));
 *   "E se o catálogo chegar vazio [...] uma mensagem simples como 'Não
 *   encontramos recomendações agora' é melhor do que renderizar uma grade de
 *   cards vazia sem explicação."
 *
 * CONFORMIDADE
 *   - Citar, não copiar: a cadeia acima é o exemplo do professor, comentada
 *     como referência. A forma final é a que está escrita aqui, e cada linha
 *     precisa ser explicável.
 *   - `aviso` entra nos destinos vazio e sucesso e NUNCA no carregando: o
 *     texto do carregando é literal do briefing (RF12) e não pode mudar,
 *     enquanto todo destino que sobrescreve #resultados-status tem de
 *     repassar o recado de persistência para que ele chegue ao paint.
 *   - Sem `!important`, sem CSS Grid e sem escrita em servidor: este bloco é
 *     só dados, e a stack é a do Módulo 01.
 */

// `let` porque este é o segundo valor do módulo que muda: a cada chamada de
// buscarCatalogo o tratamento daquela busca sobrescreve o anterior, e é essa
// a tarefa da variável — a M1-T10 instancia Serie a partir dela e consome a
// lista. O array começa vazio para a leitura nunca estourar se
// algo consumir a variável antes de a rede responder, mesma razão do
// catalogoBruto.
let catalogoTratado = [];

// `let` como as duas de cima: a M1-T11 vai percorrer este array para montar os cards; até lá, ninguém lê.
let catalogoRecomendado = [];

/**
 * Devolve o catálogo bruto tratado: filtrado, ordenado por nota, cortado nos
 * 8 primeiros e convertido na forma { id, titulo, tipo, generos,
 * duracaoMinutos } que a M1-T10 instancia.
 *
 * POR QUE A ORDEM É filter → sort → slice → map E NÃO QUALQUER OUTRA
 *   É a ordem literal do briefing, e a única que entrega o que a frase
 *   promete:
 *   - filter primeiro: descarta o que não tem gênero nem nota, que é dado
 *     incompleto real da TVMaze — medido nos 240 itens: 5 sem gênero e 4 com
 *     rating.average null. Sem esse filtro, o sort compararia undefined
 *     contra número e a ordenação sairia no achismo.
 *   - sort DEPOIS do filter, e não antes: só faz sentido ordenar o que
 *     sobrou. O sort é MUTÁVEL — ele reordena o array que recebe —, mas aqui
 *     isso não atinge catalogoBruto: `filter` devolve um array NOVO, então o
 *     sort reordena a cópia que a própria cadeia acabou de criar, nunca o
 *     array que o fetch devolveu. É por isso que não há cópia extra com [...]
 *     nem um slice() antes de ordenar: seria código a mais para um risco que
 *     a cadeia já elimina.
 *   - slice(0, 8) DEPOIS do sort: recortar antes pegaria os 8 primeiros em
 *     ordem de chegada da API, ordenaria só esses oito e o top-8 sairia
 *     errado. Primeiro ordena-se tudo, depois corta-se o topo.
 *   - map por último: é o único método que escreve a forma nova, e só o que
 *     passou pelos três passos anteriores chega a ele.
 *
 * POR QUE tipo É O LITERAL "SÉRIE" E NÃO serie.type
 *   O campo type da TVMaze é outra taxonomia, em inglês — medido nos 240
 *   itens: Scripted 212, Animation 14, Reality 10, Talk Show 3, Documentary
 *   1. `tipo: serie.type` mandaria "Scripted" para um modelo que só conhece
 *   "Filme"/"Série" e quebraria a semântica do projeto anterior. O literal é
 *   também o que o exemplo do professor escreve no briefing e o que o
 *   contrato da M1-T09 espera: cinematch_antigo/class.js:20 faz
 *   `super(titulo, "Série", generos, duracaoMinutos)` e a linha 40 decide
 *   por `conteudo.tipo === "Série"`.
 *
 * POR QUE duracaoMinutos RECEBE serie.runtime COM O null REPASSADO
 *   `runtime` é o campo de minutos da TVMaze e o exemplo do professor já
 *   escreve `duracaoMinutos: serie.runtime`. Ele pode vir null — medido em
 *   11 dos 240 itens, embora nenhum do top-8 esteja nulo hoje —, e repassar o
 *   null como está é honesto: inventar 0 seria mentir sobre a duração de uma
 *   série. `??` resolveria na sintaxe, mas não foi ensinado (AGENTS.md §2.1:
 *   só apareceu em cinematch_antigo/cinematch.js:211 e não deve ser
 *   replicado). Nenhum consumidor atual lê o campo; se um dia exibirem
 *   duração, quem exibe trata o null com if-else ou ternário, ambos
 *   ensinados no RF07.
 */
function tratarCatalogo(bruto) {
  return bruto
    .filter((serie) => serie.genres.length > 0 && serie.rating.average)
    .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, 8)
    .map((serie) => ({
      id: serie.id,
      titulo: serie.name,
      tipo: "Série",
      generos: serie.genres,
      duracaoMinutos: serie.runtime,
      imagem:
        serie.image === null || serie.image === undefined
          ? ""
          : serie.image.medium,
    }));
}

/**
 * Percorre o catálogo tratado, instancia uma `Serie` para cada item e monta o
 * objeto que a tela vai consumir no card (RF07). Esta é a ORQUESTRAÇÃO; a
 * fórmula e os limiares vivem no método `calcularCompatibilidade` da `Serie`,
 * em `js/modelo.js`, e aqui não entra cópia deles.
 *
 * O `map` da M1-T08 já deixou o array com no máximo 8 itens, filtrado por
 * `generos.length > 0` e ordenado por `rating.average` — esta função não
 * reordena nem recorta: a ordem dos cards é a mesma que a M1-T08 gravou.
 *
 * @param {string[]} generosFavoritos - valores dos checkboxes, em inglês
 * @returns {Array<{ titulo: string, imagem: string, generosEmComum: string[], generosNaoExplorados: string[], percentual: string, classificacao: string }>}
 */
function calcularCompatibilidades(generosFavoritos) {
  const recomendacoes = catalogoTratado.map((item) => {
    const serie = new Serie(item.titulo, item.generos, item.duracaoMinutos);
    const compatibilidade = serie.calcularCompatibilidade(generosFavoritos);

    // O objeto do card tem os cinco campos que o RF08 lê
    // (docs/BRIEFING.md:257) e nenhum outro: o `id` da M1-T08 não é copiado
    // porque ninguém o consome.
    return {
      titulo: item.titulo,
      imagem: item.imagem,
      generosEmComum: compatibilidade.generosEmComum,
      generosNaoExplorados: compatibilidade.generosNaoExplorados,
      percentual: compatibilidade.percentual,
      classificacao: compatibilidade.classificacao,
    };
  });

  // RF11 · M1-T14 — o contador conta AQUI, e não em outro lugar. "Quantas
  // vezes a pessoa recalculou a compatibilidade" (RF11) é o que esta função é:
  // ela recalcula, então é nela que o total anda uma casa. Contar na chamada
  // de buscarCatalogo daria o mesmo número na tela, porque também é uma
  // recalculação por busca — e não entregaria o RF11, que é medido sobre a
  // mecânica da closure, não sobre a frequência do evento.
  contadorRecomendacoes.incrementar();

  return recomendacoes;
}

// ────────────────────────────────────────────────────────────────────────────
// M1-T14 · RF11 · CONTADOR DE RECALCULAÇÕES POR CLOSURE
// ────────────────────────────────────────────────────────────────────────────
/**
 * POR QUE ESTA REGIÃO FICA ANTES DO GUARD `typeof document !== "undefined"`
 *   A mesma ordem de avaliação da M1-T07 e da M1-T08: o guard roda no
 *   carregamento do módulo e, com perfil salvo, chama buscarCatalogo já na
 *   primeira execução — e o cálculo de compatibilidade mexe no contador. Se a
 *   `const contadorRecomendacoes` fosse declarada DEPOIS do guard, essa
 *   chamada cairia em temporal dead zone e daria ReferenceError. A função, o
 *   hoisting resolve; a variável, não.
 */

/**
 * RF11 · M1-T14 · Cria o contador e devolve o par de funções que mexe nele.
 *
 * POR QUE O TOTAL NÃO É UM `let` SOLTO NESTE ARQUIVO
 *   Um `let total = 0` no topo do módulo entregaria o mesmo número na tela e
 *   NÃO entregaria o requisito: o Critério 8 é medido sobre o ESCOPO FECHADO,
 *   e a prova de que o escopo é fechado é que ninguém de fora consegue ler nem
 *   escrever o total. Dentro desta factory o `total` é alcançado só pelas duas
 *   funções devolvidas — o resto do módulo, o `ui.js` e a página não têm caminho
 *   até ele, e é isso que a fechamento (closure) significa: a função devolvida
 *   continua enxergando o escopo de onde nasceu depois que a factory termina.
 *
 * POR QUE DEVOLVE UM PAR E NÃO UM NÚMERO
 *   Devolver o total nu tiraria a parte difícil do exercício: quem recebesse o
 *   número poderia alterá-lo, e o estado privado deixaria de ser privado. O par
 *   é a interface mínima que permite usar o estado sem expô-lo — `incrementar`
 *   muda, `obterTotal` só lê, e nenhuma das duas entrega a variável.
 *
 * POR QUE DECLARAR AS DUAS FUNÇÕES COM `function` E NÃO COM MÉTODO DO OBJETO
 *   É a forma equivalente, e o que muda é a legibilidade: cada função ganha o
 *   próprio nome para o JSDoc e para o stack trace, enquanto o par devolvido é
 *   escrito com as chaves explícitas, como o resto deste módulo — `nome:
 *   nome.trim()` no objeto `usuario`, `percentual: percentual` no objeto do
 *   card. A forma da referência é citada abaixo; a forma final é a escrita
 *   aqui, linha a linha.
 *
 * O `total++` é o incremento da referência (cinematch_antigo/cinematch.js:107),
 * que é a forma de `i++` já usada nos quatro laços deste projeto.
 *
 * @returns {{ incrementar: Function, obterTotal: Function }} par que opera
 *   sobre o total privado.
 */
function criarContadorDeRecomendacoes() {
  let total = 0;

  function incrementar() {
    total++;
    return total;
  }

  function obterTotal() {
    return total;
  }

  return {
    incrementar: incrementar,
    obterTotal: obterTotal,
  };
}

// A factory é chamada UMA VEZ, aqui no escopo do módulo, e o par devolvido
// fica guardado nesta `const` para o resto da vida da página. É este o ponto
// que decide se o RF11 está entregue ou não:
//
//   - se a factory fosse chamada DENTRO de quem usa o contador — dentro de
//     calcularCompatibilidades, dentro de buscarCatalogo, dentro do handler —,
//     cada chamada criaria um `total = 0` novo e o estado privado morreria
//     junto com a chamada. O número na tela seria sempre 1, e não haveria
//     closure nenhuma: seria uma variável comum com nome complicado. Por isso
//     a chamada é de módulo — e é `const`, pelo mesmo motivo de CHAVE_PERFIL e
//     URL_CATALOGO: o par é o contrato entre quem incrementa e quem lê, e não
//     é trocado. O escopo de módulo também é o que impede que ele vire global,
//     e um global entregaria o número na tela sem a mecânica que o Critério 8
//     mede.
const contadorRecomendacoes = criarContadorDeRecomendacoes();

if (typeof document !== "undefined") {
  const perfilSalvo = lerPerfilSalvo();

  if (perfilSalvo) {
    mostrarResultados(perfilSalvo, "");

    // Chamada sem `await`, na sequência da saudação: o guard segue síncrono
    // e o catch interno nunca relança. Só existe chamada quando o perfil já
    // está resolvido — no `else` não há para quem recomendar, e por isso o
    // caminho do formulário aberto não busca catálogo. O primeiro argumento é ""
    // de propósito: aqui não há aviso de persistência a sobreviver, porque o
    // perfil veio do próprio localStorage; o segundo são os gêneros favoritos,
    // lidos do mesmo perfil salvo; e o terceiro é o nome, lido do mesmo lugar —
    // é ele que a saudação do RF10 escreve quando a busca terminar.
    buscarCatalogo("", perfilSalvo.generosFavoritos, perfilSalvo.nome);
  } else {
    mostrarFormulario("Preencha o formulário para receber recomendações.");
  }

  iniciarFormulario();
}

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T09 · RF06 · Adaptar as classes Conteudo e Serie
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 5 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T08
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - JÁ FEITO NA M1-T09: Ampliar o import da linha 18 deste arquivo: ele
//     trazia só PLACEHOLDER_MODELO e passou a trazer as classes reais de
//     ./modelo.js.
//   - JÁ FEITO NA M1-T10: instanciar uma Serie para cada item do catálogo
//     tratado na M1-T08. Acontece dentro de calcularCompatibilidades(), que
//     percorre com map e chama o método calcularCompatibilidade() da Serie
//     (js/modelo.js, etapa 2). O bullet fica aqui porque este bloco é
//     referenciado pelo bloco M1-T17.
//   - JÁ FEITO NA M1-T09: APAGAR PLACEHOLDER_MODELO de modelo.js e do import
//     daqui, no mesmo passo. Ele era provisório e existia só para o grafo
//     carregar.
// POR QUE ESTE TRECHO EXISTE
//   O RF06 é o reaproveitamento do que a semana 6 já fez. Adaptar é a palavra
//   do briefing: as classes continuam sendo Conteudo e Serie, mas recebem os
//   dados já tratados no RF05, e o construtor volta a ser chamado com this.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/class.js — a linha 1 abre `class Conteudo`, a linha 18
//   abre `class Serie extends Conteudo`, a linha 20 é o super(...) e as
//   linhas 35 a 37 fazem o instanceof. Esse arquivo está em CommonJS
//   (module.exports na linha 61): porte a lógica, não o estilo.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF06, pág. 7)
//   "Traga as classes Conteudo e Serie (com herança e uso de this) do
//   CineMatch JS para dentro de modelo.js. Adapte o construtor, se
//   necessário, para receber os dados já tratados no RF05."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - JÁ FEITO NA M1-T09: Pisar no PLACEHOLDER_MODELO agora não quebra nada
//     por si só, porque a linha de bootstrap que o referenciava saiu no fim
//     da M1-T06: o único lugar que ainda citava o nome era o `import` do
//     topo. Apagar o nome daqui e de lá no mesmo passo foi o que fechou.
//     Ver o bloco M1-T17.
//   - A subclasse precisa ACRESCENTAR comportamento, não só repetir o da
//   mãe: o Critério 7 pede classe, construtor, atributos, método, this e
//   herança. Uma Serie que não ganha nada da Conteudo tem herança escrita
//   e sem função. Ver js/modelo.js, etapa 1.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T13 · RF10 · Usar callback
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 7 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T11
// DONO DESTA ETAPA: Tiago.
// EXECUTADA EM: feature/cinematch-web por Tiago em 03/10/2026:15:47.
// JÁ FEITO NA M1-T13: a etapa rodou inteira, e o que ficou no lugar é o
// cabeçalho, estas anotações e a implementação em concluirBusca e na chamada
// dentro de buscarCatalogo. Os três bullets do roteiro abaixo foram cumpridos
// como estavam escritos, e nenhum precisou de decisão nova.
// O QUE FAZER AQUI
//   - JÁ FEITO NA M1-T13: passar a função de saudação como ARGUMENTO, sem
//     chamá-la direto. A função entrou na posição de callback e quem a dispara
//     é quem a recebeu — concluirBusca(nome, callback) chama callback(nome) no
//     corpo, e o call site só entrega a referência.
//   - JÁ FEITO NA M1-T13: disparar assim que o catálogo termina de carregar E a
//     renderização inicial acaba. A chamada ficou logo depois de
//     renderizarCards(catalogoRecomendado) e antes da bifurcação dos estados,
//     dentro do try. A ordem se mantém: os cards já estão na tela quando a
//     saudação aparece, e a frase de sucesso ainda é a última coisa lida.
//   - JÁ FEITO NA M1-T13: o nome da pessoa precisou chegar até aqui, e esse
//     acréscimo não estava no roteiro. `buscarCatalogo` recebia `aviso` e
//     `generosFavoritos`, e nenhum dos dois é o nome — sem ele o callback não
//     teria o que escrever. O nome passou a ser o TERCEIRO parâmetro de
//     buscarCatalogo, repassado pelo nome e a saudação como argumento.
//     `exibirMensagemDeBoasVindas(nome)` continua com o nome do briefing, e a
//     função que escreve na tela continua sendo do Lucas, em js/ui.js.
// POR QUE ESTE TRECHO EXISTE
//   O RF10 é sobre a forma, não sobre a saudação. Passar uma função como
//   argumento e deixar quem a chamou decidir o momento é o que separa callback
//   de uma chamada comum. Uma variável de flag dizendo "pronto" também
//   resolveria o efeito, mas não entregaria o requisito.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/cinematch.js — saudacaoDespedida(usuario, callback) na
//   linha 511: a função recebe o callback como segundo parâmetro e chama
//   callback() na linha 519. A chamada de exemplo, com
//   saudacaoDespedida(usuario, despedida), está na linha 65.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF10, pág. 8)
//   "Crie uma função de callback disparada quando o catálogo termina de
//   carregar — por exemplo, uma função exibirMensagemDeBoasVindas(nome)
//   chamada após a busca e renderização inicial."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - Callback e closure dividem o Critério 8, e o critério pede os DOIS. Este
//     bloco é o callback; o M1-T14 logo abaixo é a closure. Um não substitui
//     o outro.
//   - A seta, que é o arrow function, é a forma mais curta de escrever o
//     callback quando ele cabe em uma linha; se ficar longo, use function.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T14 · RF11 · Usar closure
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 8 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T13
// DONO DESTA ETAPA: Tiago.
// EXECUTADA EM: feature/cinematch-web por Tiago em 03/10/2026:16:19.
// JÁ FEITO NA M1-T14: a etapa rodou inteira. O que ficou no lugar é o
// cabeçalho, estas anotações e a implementação em três pontos: a região nova
// antes do guard `typeof document !== "undefined"`, o incremento dentro de
// calcularCompatibilidades e a leitura do total dentro de buscarCatalogo.
// O QUE FAZER AQUI
//   - JÁ FEITO NA M1-T14: a factory. `criarContadorDeRecomendacoes()` declara o
//     `let total = 0` e DEVOLVE o par que mexe nele — `incrementar`, que soma
//     uma casa e devolve o novo total, e `obterTotal`, que só lê. O total fica
//     numa variável que só o par criado por ela enxerga, e é isso que é a
//     closure: as duas funções continuam alcancando o escopo de onde nasceram
//     depois que a factory termina, e ninguém de fora do par chega nele.
//   - JÁ FEITO NA M1-T14: a factory é chamada UMA VEZ, na `const
//     contadorRecomendacoes`, no escopo do módulo, antes do guard — que é o
//     ponto que decide se a entrega vale. Chamá-la dentro de quem usa o
//     contador mataria o estado privado a cada chamada e o número na tela seria
//     sempre 1, sem closure nenhuma. O par é repassado por quem precisa do
//     número: dentro de calcularCompatibilidades ele incrementa, e dentro de
//     buscarCatalogo ele é lido por `obterTotal()` e o número pronto vai para a
//     função de tela.
//   - JÁ FEITO NA M1-T14, pela metade, e a outra metade está escrita: o
//     contador começa em zero a cada sessão sem nenhuma linha de código — nada
//     o grava fora da memória da página, e o RF11 fala em "nesta sessão", então
//     guardá-lo no localStorage mudaria o significado sem ter sido pedido. O
//     `incrementar()` do par também não zera, e por isso a segunda metade desta
//     bullet — voltar a zero quando o perfil troca — ficou de fora. Onde ela
//     mora é o clique do #botao-trocar-perfil, que é a etapa 1 do js/ui.js e
//     ainda não foi escrita; hoje esse clique é tratado em iniciarFormulario,
//     aqui no js/script.js (risco 13 do quadro), e ele não esconde os cards do
//     perfil anterior, então zerar o número ali deixaria a tela contando uma
//     coisa e mostrando outra. A volta a zero entra no mesmo passo em que a
//     etapa 1 do ui.js for escrita, com um `zerar()` no par — e não antes, para
//     não deixar no grafo uma função que ninguém chama.
//   - JÁ FEITO NA M1-T14: o número vai para a tela pelo Lucas, em js/ui.js
//     (etapa 6, mesma M1-T14), em `exibirContadorDeRecalculos(total)`. Aqui é
//     só onde o total mora: a chamada passa o número pronto e o ui.js escreve.
//     JÁ FEITO NA M1-T14, com desvio declarado: a etapa 6 do esboço de lá é do
//     Lucas e foi executada pelo Tiago, na branch de lógica, porque a função só
//     existe para ser chamada por este arquivo — o mesmo motivo que a M1-T11 e a
//     M1-T13 registraram. O alvo na tela é o `<p id="resultados-contador">` do
//     index.html, dentro de .cabecalho-resultados, e o `index.html` é território
//     da branch de interface: a divergência está na nota da M1-T14 do
//     docs/KANBAN.md.
// POR QUE ESTE TRECHO EXISTE
//   O RF11 pede um estado que sobreviva entre chamadas sem virar uma
//     variável global. Uma variável let solta no topo do módulo resolveria o
//   número e entregaria zero do requisito: o que prova a closure é que o
//   total não é acessível de fora da factory.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   cinematch_antigo/cinematch.js — criarContadorDeRecomendacoes() (linha
//   102), que devolve incrementar() e obterTotal() operando sobre um total
//   fechado, fora do alcance do resto do arquivo.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF11, pág. 8)
//   "Mantenha (ou recrie) um contador por closure — por exemplo, quantas
//   vezes a pessoa recalculou a compatibilidade nesta sessão — e exiba esse
//   número na tela."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - Nada de variável global para o total: o Critério 8 é sobre o escopo
//     fechado, e um global entrega o número sem a mecânica.
//   - Voltar a zero no carregamento da página é o esperado: o RF11 fala em
//     "nesta sessão". Guardar o total no localStorage aria mudaria o
//     significado e não foi pedido.
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T17 · RF14 · Separar os módulos ES
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 9 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T11, M1-T12, M1-T13, M1-T14, M1-T15
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - ESTA É A ETAPA DE FECHAMENTO. As outras nove já escreveram o conteúdo
//     dos três arquivos; aqui é o que amarra eles e o que troca os nomes.
//   - Os DOIS import das linhas 16 e 17 PERMANECEM. Eles não saem: o RF14 é
//     exatamente este arranjo, e trocar import por require (ou por script
//     inline) desfaz o módulo.
//   - O que muda é o que vem dentro dos dois: o PLACEHOLDER_MODELO já saiu na
//     M1-T09, quando as classes entraram em modelo.js. JÁ FEITO NA M1-T11:
//     o PLACEHOLDER_UI saiu no mesmo passo em que o renderizarCard entrou
//     em ui.js. Cada um saiu na SUA task, e não nesta.
//   - Conferir que cada nome importado existe e é exportado no outro arquivo.
//     Um nome que não bate falha em tempo de execução, sem aviso no console.
//   - Conferir o index.html: um único script, type="module", apontando para
//     ./js/script.js. É o Lucas que escreve a tag, na M1-T02.
// POR QUE ESTE TRECHO EXISTE
//   Sem o grafo amarrado, cada arquivo funciona sozinho e a página não vê
//   nada. O RF14 existe para o cálculo, a tela e as classes ficarem em
//   arquivos separados e ainda assim se enxergarem. Três arquivos já cumprem
//   o requisito com folga: não fatiar mais.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   semana-12/modulos/ — o README.md da pasta mostra o "antes", com
//   require e module.exports; os .js da própria pasta já são o "depois", com
//   import e export, e o index.js é quem faz o import do slug.js exportado.
//   A frase que resolve a dúvida: require vira import, module.exports vira
//   export, e o pacote precisa de "type": "module" — que o package.json deste
//   projeto tem, e é o que faz o node js/script.js passar. No navegador a chave
//   não conta: quem resolve o módulo é a tag type="module" do script no
//   index.html.
//   O "depois" é o commit a413b0c, de 18/09/2026; sem ele, parece CommonJS.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF14, pág. 9)
//   // modelo.js
//   export class Conteudo { /* ... */ }
//   export class Serie extends Conteudo { /* ... */ }
//   // ui.js
//   export function renderizarCard(resultado) { /* ... */ }
//   export function exibirMensagemDeErro(texto) { /* ... */ }
//   // script.js
//   import { Conteudo, Serie } from './modelo.js';
//   import { renderizarCard, exibirMensagemDeErro } from './ui.js';
// CONFORMIDADE
//   - A linha de bootstrap que referenciava os dois placeholders foi removida
//     no fim da M1-T06, porque o professor não quer código de console no
//     material entregue. Consequência prática: cada vez que um dos
//     placeholders sair, o `import` correspondente do topo deste arquivo tem de
//     ser ajustado no mesmo passo, porque é ele — e só ele — que ainda cita o
//     nome. Sem isso o import vira specifier sem export, e o erro aparece longe
//     da linha que causou.
//   - Caminho relativo e com extensão explícita: './ui.js', não './ui'. O
//     navegador não procura extensão sozinho.
//   - Citar, não copiar: os nomes dos exports acima são os do exemplo do
//     professor, e é preciso saber explicar por que este projeto separa
//     renderizarCard (tela) do cálculo (fluxo).
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// TODO M1-T18 · RF15 · Servir o projeto com o live-server
// ────────────────────────────────────────────────────────────────────────────
// ETAPA 10 DE 10 · BRANCH: feature/cinematch-web · DEPENDE DE: M1-T01, M1-T17
// DONO DESTA ETAPA: Tiago.
// O QUE FAZER AQUI
//   - Nada é escrito dentro dos .js. Esta etapa é sobre o package.json e
//     sobre o hábito de rodar o projeto: npm install e npm start, na porta
//     8080, com live-server em devDependencies e não global.
//   - Abrir http://localhost:8080 e conferir que os três módulos carregaram,
//     olhando o console.
//   - Deixar isso escrito no README (M1-T20), que é onde a pessoa que avalia
//     vai procurar.
// POR QUE ESTE TRECHO EXISTE
//   Módulos ES NÃO carregam via file://. Dar duplo clique no index.html
//   dispara erro de CORS nos import e a página fica sem nenhum JavaScript, sem
//   mensagem útil. Servir por HTTP não é preferência: é requisito do módulo
//   ES nativo no navegador.
// REFERÊNCIA ENSAIADA (AGENTS.md 2.1)
//   O package.json deste próprio projeto, com o script "start": "live-server".
//   É a referência porque é o arquivo real do repositório, e é onde a
//   instalação local versus global do pacote foi decidida: devDependencies,
//   nunca npm install -g.
// TRECHO DO BRIEFING (docs/BRIEFING.md, RF15, pág. 9, e seção 5.1, pág. 5)
//   {
//     "name": "cinematch-web",
//     "scripts": {
//       "start": "live-server"
//     },
//     "devDependencies": {
//       "live-server": "^1.2.2"
//     }
//   }
//   e pág. 5: "Separe script.js, ui.js e modelo.js com import/export - e
//   sirva o projeto com live-server pra rodar como módulo."
// CONFORMIDADE
//   - Citar, não copiar: o bloco acima é o exemplo do professor, comentado como
//     referência. A forma final é sua, e você precisa saber explicar cada linha.
//   - O botão "Trocar perfil" nunca pode recarregar via file://, e o motivo não
//     é o que parece. O localStorage SOBREVIVE ao recarregamento — ele é por
//     origem, não por sessão — então o registro não se perde. O que se perde é
//     a página: recarregar em file:// derruba os import por CORS e deixa o
//     index.html sem nenhum JavaScript (risco 2 do quadro). Por isso a troca se
//     resolve com preventDefault, e não com um recarregamento.
//   - npm é a única ferramenta externa do projeto, e só como servidor local.
//   - A API responde com Access-Control-Allow-Origin: *, então o CORS não
//     bloqueia (risco 1 do quadro). Se aparecer erro de CORS na aba Network,
//     o caminho está errado: não é a API, é o file://.
// ────────────────────────────────────────────────────────────────────────────
