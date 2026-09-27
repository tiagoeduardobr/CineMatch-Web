class Conteudo {
  constructor(titulo, tipo, generos, duracaoMinutos) {
    this.titulo = titulo;
    this.tipo = tipo;
    this.generos = generos;
    this.duracaoMinutos = duracaoMinutos;
  }

  exibirResumo() {
    return `${this.titulo} (${this.tipo}) — ${this.duracaoMinutos} min`;
  }

  exibirGeneros() {
    return `Gêneros: ${this.generos.join(", ")}`;
  }
}

class Serie extends Conteudo {
  constructor(titulo, generos, duracaoMinutos, temporadas) {
    super(titulo, "Série", generos, duracaoMinutos);
    this.temporadas = temporadas;
  }

  exibirTemporadas() {
    return `${this.titulo} tem ${this.temporadas} temporada(s)`;
  }
}

class Filme extends Conteudo {
  constructor(titulo, generos, duracaoMinutos) {
    super(titulo, "Filme", generos, duracaoMinutos);
  }
}

function criarInstanciaConteudo(conteudo) {
  if (conteudo instanceof Conteudo) {
    return conteudo;
  }

  if (conteudo.tipo === "Série") {
    return new Serie(
      conteudo.titulo,
      conteudo.generos,
      conteudo.duracaoMinutos,
      conteudo.temporadas,
    );
  }

  if (conteudo.tipo === "Filme") {
    return new Filme(conteudo.titulo, conteudo.generos, conteudo.duracaoMinutos);
  }

  return new Conteudo(
    conteudo.titulo,
    conteudo.tipo,
    conteudo.generos,
    conteudo.duracaoMinutos,
  );
}

module.exports = { Conteudo, Serie, Filme, criarInstanciaConteudo };
