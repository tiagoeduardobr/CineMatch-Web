const catalogo = require("./catalogo");
const prompt = require("prompt-sync")();
const { Conteudo, Serie, Filme, criarInstanciaConteudo } = require("./class");

let usuario = null;
const contadorRecomendacoes = criarContadorDeRecomendacoes();

async function menu(usuario, catalogo) {
  do {
    console.clear();
    console.log("\n================ CineMatch =================");
    console.log("0 - Criar meu perfil");
    console.log("1 - Ver meu perfil");
    console.log("2 - Ver catálogo completo");
    console.log("3 - Adicionar conteúdo ao catálogo");
    console.log("4 - Calcular compatibilidade com todos os conteúdos");
    console.log("5 - Ver o conteúdo mais recomendado");
    console.log("6 - Ver gêneros faltantes por conteúdo");
    console.log("7 - Recomendação personalizada");
    console.log("8 - Excluir meu perfil");
    console.log("9 - Carregar catálogo simulado");
    console.log("10 - Sair");
    console.log("=============================================");
    if (!usuario) {
      console.log("Nenhum perfil de usuario encontrado. Crie um perfil.");
    } else {
      console.log(`Usuário logado: ${usuario.nome}`);
    }
    console.log(`Recomendações geradas: ${contadorRecomendacoes.obterTotal()}`);
    console.log("=============================================\n");
    opcao = prompt("Escolha uma opção: ");
    switch (opcao) {
      case "0":
        usuario = criarPerfil(usuario);
        break;
      case "1":
        exibirPerfil(usuario);
        break;
      case "2":
        exibirCatalogo(catalogo);
        break;
      case "3":
        adicionarConteudoCatalogo(catalogo);
        break;
      case "4":
        calcularCompatibilidades(usuario, catalogo);
        break;
      case "5":
        exibirRecomendacaoPrincipal(usuario, catalogo);
        break;
      case "6":
        listarGenerosFaltantes(usuario, catalogo);
        break;
      case "7":
        recomendarProximoGenero(usuario, catalogo);
        break;
      case "8":
        usuario = excluirPerfil(usuario);
        break;
      case "9":
        catalogo = await buscarCatalogoSimulado();
        voltarMenu();
        break;
      case "10":
        saudacaoDespedida(usuario, despedida);
        break;
      default:
        defaultMenu();
        break;
    }
  } while (opcao !== "10");
}

function voltarMenu() {
  let voltarMenu;
  do {
    voltarMenu = prompt("Voltar para menu S/N: ");
  } while (voltarMenu.toUpperCase() !== "S");
}

function buscarCatalogoSimulado() {
  console.clear();
  console.log("\n================ CineMatch =================\n");
  console.log("Carregando catálogo...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(catalogo);
    }, 2000);
    console.log("Catálogo carregado com sucesso!\n");
  });
}

async function iniciarSistema() {
  console.clear();
  console.log("\n================ CineMatch =================\n");
  console.log("Carregando catálogo...");
  const catalogoCarregado = await buscarCatalogoSimulado();
  console.log("Catálogo carregado com sucesso!");
  await menu(usuario, catalogoCarregado);
}

function criarContadorDeRecomendacoes() {
  let total = 0;

  return {
    incrementar() {
      total++;
      return total;
    },
    obterTotal() {
      return total;
    },
  };
}

function criarPerfil(usuario) {
  console.clear();
  console.log("\n========= CineMatch - Criar Perfil ========\n");
  if (!usuario) {
    const nome = formatarNome(prompt("Qual é o seu nome? "));
    let idade;
    idade = Number(prompt("Qual é a sua idade? "));
    if (Number.isNaN(idade)) {
      console.log("Digite uma idade válida!");
      idade = Number(prompt("Qual é a sua idade? "));
    }
    const generosInput = prompt(
      "Quais gêneros você mais gosta? (separe por vírgula, ex: Ação, Comédia, Terror): ",
    );

    const generosFavoritos = generosInput
      .split(",")
      .map((genero) => padronizarGenero(genero))
      .filter(Boolean);

    const novoUsuario = {
      nome: nome,
      idade: idade,
      generosFavoritos: generosFavoritos,
    };

    return (usuario = novoUsuario);
  } else {
    console.log(
      "Usuário já cadastrado, para cadastrar novo usuário volte ao menu e exclua o atual!\n",
    );
    console.log("=============================================\n");
    voltarMenu();
    return usuario;
  }
  voltarMenu();
}

function exibirPerfil(usuario) {
  console.clear();
  console.log("\n======== CineMatch - Exibir Perfil ========\n");
  if (!usuario) {
    console.log("Nenhum perfil de usuario encontrado. Crie um perfil.\n");
  } else {
    console.log(
      `Nome: ${usuario.nome} \nIdade: ${usuario.idade} \nGeneros favoritos: ${usuario.generosFavoritos.join(", ")}\n`,
    );
  }

  voltarMenu();
}

function exibirCatalogo(catalogo) {
  console.clear();
  console.log("\n========= CineMatch - Exibir Catálogo ========\n");
  for (i = 0; i < catalogo.length; i++) {
    const conteudo = criarInstanciaConteudo(catalogo[i]);
    console.log(conteudo.exibirResumo());
    console.log(conteudo.exibirGeneros());
    if (conteudo instanceof Serie) {
      console.log(conteudo.exibirTemporadas());
    }
    console.log("");
  }
  console.log("\n=============================================\n");
  voltarMenu();
}

function adicionarConteudoCatalogo(catalogo) {
  console.clear();
  console.log("\n========= CineMatch - Adicionar Conteúdo ========\n");

  const titulo = formatarNome(prompt("Título do conteúdo: "));
  const tipoInformado = prompt("Tipo (Filme/Série): ");
  const tipoNormalizado = normalizarTexto(tipoInformado);

  const generosInput = prompt(
    "Gêneros (separe por vírgula, ex: Ação, Drama, Ficção científica): ",
  );

  const generos = generosInput
    .split(",")
    .map((genero) => padronizarGenero(genero))
    .filter(Boolean);

  const duracaoMinutos = Number(prompt("Duração em minutos: "));

  if (Number.isNaN(duracaoMinutos)) {
    console.log("Duração inválida. O conteúdo não foi adicionado.");
    voltarMenu();
    return catalogo;
  }

  let novoConteudo;
  const proximoId = catalogo.length
    ? Math.max(...catalogo.map((conteudo) => conteudo.id ?? 0)) + 1
    : 1;

  if (tipoNormalizado === "serie" || tipoNormalizado === "série") {
    const temporadas = Number(prompt("Número de temporadas: "));

    if (Number.isNaN(temporadas)) {
      console.log(
        "Número de temporadas inválido. O conteúdo não foi adicionado.",
      );
      voltarMenu();
      return catalogo;
    }

    novoConteudo = new Serie(titulo, generos, duracaoMinutos, temporadas);
  } else if (tipoNormalizado === "filme") {
    novoConteudo = new Filme(titulo, generos, duracaoMinutos);
  } else {
    novoConteudo = new Conteudo(
      titulo,
      formatarNome(tipoInformado),
      generos,
      duracaoMinutos,
    );
  }

  novoConteudo.id = proximoId;

  catalogo.push(novoConteudo);

  console.log("\nConteúdo adicionado com sucesso:");
  console.log(novoConteudo.exibirResumo());
  if (novoConteudo instanceof Serie) {
    console.log(novoConteudo.exibirTemporadas());
  }

  voltarMenu();
  return catalogo;
}

function formatarNome(nome) {
  return nome
    .trim()
    .split(/\s+/)
    .map(
      (parte) => parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase(),
    )
    .join(" ");
}

function padronizarGenero(genero) {
  const generosPadronizados = {
    acao: "Ação",
    aventura: "Aventura",
    animacao: "Animação",
    comedia: "Comédia",
    crime: "Crime",
    drama: "Drama",
    familia: "Família",
    fantasia: "Fantasia",
    "ficcao cientifica": "Ficção científica",
    faroeste: "Faroeste",
    misterio: "Mistério",
    musical: "Musical",
    romance: "Romance",
    suspense: "Suspense",
    terror: "Terror",
  };

  const chaveNormalizada = normalizarTexto(genero);
  return generosPadronizados[chaveNormalizada] || formatarNome(genero);
}

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function compatibilidade(usuario, catalogo) {
  const resultado = catalogo.map((conteudo) => {
    const generosFavoritosNormalizados =
      usuario.generosFavoritos.map(normalizarTexto);

    const generosEmComum = conteudo.generos.filter((genero) =>
      generosFavoritosNormalizados.includes(normalizarTexto(genero)),
    );
    const match = generosEmComum.length / conteudo.generos.length;
    const porCento = (match * 100).toFixed(0);

    let afinidade;
    if (Number(porCento) >= 80) {
      afinidade = "Alta afinidade";
    } else if (Number(porCento) >= 50) {
      afinidade = "Média afinidade";
    } else {
      afinidade = "Baixa afinidade";
    }

    return {
      titulo: conteudo.titulo,
      tipo: conteudo.tipo,
      compatibilidade: porCento,
      generosEmComum: generosEmComum,
      afinidade: afinidade,
    };
  });
  return resultado;
}

function calcularCompatibilidades(usuario, catalogo) {
  console.clear();
  console.log("\n=== CineMatch - Calcular Compatibilidades ===\n");
  if (!usuario) {
    console.log("Nenhum perfil de usuário encontrado. Crie um perfil.\n");
  } else {
    const resultado = compatibilidade(usuario, catalogo);
    for (i = 0; i < resultado.length; i++) {
      console.log(`
        Título: ${resultado[i].titulo}
        Tipo: ${resultado[i].tipo}
        Compatibilidade: ${resultado[i].compatibilidade}%
        Gêneros em comum: ${resultado[i].generosEmComum.join(", ")}
        Afinidade: ${resultado[i].afinidade}
        `);
    }
    let voltarMenu;
    do {
      voltarMenu = prompt("Voltar para menu S/N: ");
    } while (voltarMenu.toUpperCase() !== "S");
    return resultado;
  }
}

function exibirRecomendacaoPrincipal(usuario, catalogo) {
  console.clear();
  console.log("\n======== CineMatch - Recomendação Principal ========");

  if (!usuario) {
    console.log("\nNenhum perfil de usuário encontrado. Crie um perfil.\n");
    voltarMenu();
    return;
  }

  const resultados = compatibilidade(usuario, catalogo);
  const resultado = resultados.find(
    (recomendacao) => Number(recomendacao.compatibilidade) === 100,
  );

  if (!resultado) {
    console.log("\nNenhum conteúdo com compatibilidade total foi encontrado.");
    console.log("\n====================================================\n");
  } else {
    contadorRecomendacoes.incrementar();
    console.log(`
    Conteúdo mais recomendado:
     
    Título: ${resultado.titulo}
    Tipo: ${resultado.tipo}
    Compatibilidade: ${resultado.compatibilidade}%
    Gêneros em comum: ${resultado.generosEmComum.join(", ")}
    Afinidade ${resultado.afinidade}
        `);
    console.log("====================================================\n");
  }

  voltarMenu();
}

function listarGenerosFaltantes(usuario, catalogo) {
  console.clear();
  console.log("\n======== CineMatch - Gêneros Faltantes ========\n");

  if (!usuario) {
    console.log("Nenhum perfil de usuário encontrado. Crie um perfil.\n");
    voltarMenu();
    return;
  }

  const conteudosComGenerosFaltantes = obterConteudosPorGenero(
    usuario,
    catalogo,
  );

  for (let i = 0; i < conteudosComGenerosFaltantes.length; i++) {
    const item = conteudosComGenerosFaltantes[i];

    console.log(`Para "${item.conteudo.titulo}", você ainda não explorou:`);

    if (item.generosFaltantes.length === 0) {
      console.log("- Nenhum gênero faltante para este conteúdo.");
    } else {
      for (let j = 0; j < item.generosFaltantes.length; j++) {
        console.log(`- ${item.generosFaltantes[j]}`);
      }
    }

    console.log("");
  }

  voltarMenu();
}

function recomendarProximoGenero(usuario, catalogo) {
  console.clear();
  console.log("\n======== CineMatch - Recomendação Personalizada ========\n");

  if (!usuario) {
    console.log("Nenhum perfil de usuário encontrado. Crie um perfil.\n");
    voltarMenu();
    return;
  }

  const conteudosComGenerosFaltantes = obterConteudosPorGenero(
    usuario,
    catalogo,
  ).filter((item) => item.generosFaltantes.length > 0);

  if (conteudosComGenerosFaltantes.length === 0) {
    console.log("Você já explorou todos os gêneros disponíveis no catálogo.");
    console.log("\n========================================================\n");
    voltarMenu();
    return;
  }

  conteudosComGenerosFaltantes.sort((a, b) => {
    if (b.generosEmComum.length !== a.generosEmComum.length) {
      return b.generosEmComum.length - a.generosEmComum.length;
    }

    if (a.generosFaltantes.length !== b.generosFaltantes.length) {
      return a.generosFaltantes.length - b.generosFaltantes.length;
    }

    return a.conteudo.titulo.localeCompare(b.conteudo.titulo, "pt-BR");
  });

  const sugestao = conteudosComGenerosFaltantes[0];
  const generoSugerido = sugestao.generosFaltantes[0];
  const generoAtualPreferido =
    usuario.generosFavoritos[0] || "seus gêneros favoritos";

  contadorRecomendacoes.incrementar();

  console.log(`Recomendação personalizada para ${usuario.nome}:\n`);
  console.log(
    `Você já curte ${generoAtualPreferido} — que tal arriscar um pouco de ${generoSugerido}?`,
  );
  console.log(
    `"${sugestao.conteudo.titulo}" pode ser um ótimo próximo título.`,
  );
  console.log(
    `Conteúdo selecionado porque ainda falta explorar: ${sugestao.generosFaltantes.join(", ")}`,
  );
  console.log("\n========================================================\n");

  voltarMenu();
}

function obterConteudosPorGenero(usuario, catalogo) {
  const generosFavoritosNormalizados =
    usuario.generosFavoritos.map(normalizarTexto);

  return catalogo.map((conteudo) => {
    const generosEmComum = conteudo.generos.filter((genero) =>
      generosFavoritosNormalizados.includes(normalizarTexto(genero)),
    );

    const generosFaltantes = conteudo.generos.filter(
      (genero) =>
        !generosFavoritosNormalizados.includes(normalizarTexto(genero)),
    );

    return {
      conteudo: conteudo,
      generosEmComum: generosEmComum,
      generosFaltantes: generosFaltantes,
    };
  });
}

function excluirPerfil(usuario) {
  console.clear();
  console.log("\n========= CineMatch - Excluir Perfil ========\n");
  let excluirPerfil;
  if (!usuario) {
    console.log("Nenhum perfil de usuario encontrado. Crie um perfil.\n");
  } else {
    excluirPerfil = prompt("Excluir perfil? S/N: ");
    if (excluirPerfil.toUpperCase() === "S") {
      usuario = null;
    } else {
      voltarMenu();
    }
  }
  return usuario;
}

function saudacaoDespedida(usuario, callback) {
  console.clear();
  console.log("\n================ CineMatch =================");
  if (usuario) {
    console.log(`\nObrigado por usar nossos serviços, ${usuario.nome}!`);
  } else {
    console.log("\nObrigado por usar nossos serviços!");
  }
  callback();
  console.log("\n=============================================\n");
}
const despedida = () => {
  console.log("Até a próxima maratona!");
};

function defaultMenu() {
  console.log("Opção inválida, tente novamente.");
  voltarMenu();
}

//Início programa.

iniciarSistema();
