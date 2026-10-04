/**
 * CineMatch Web — módulo de classes.
 *
 * Responsabilidade: `Conteudo` e `Serie`, com herança e uso de `this`, e o
 * método que compara os gêneros favoritos com os de uma série e classifica a
 * compatibilidade.
 */

/**
 * Prepara um texto para comparação: caixa baixa, sem acento e sem espaço nas
 * pontas. Ela normaliza para comparar, não traduz: "Comédia" continua
 * "comédia" e não vira "Comedy".
 * @param {string} texto
 * @returns {string}
 */
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Classe base do catálogo: um item com título, tipo, gêneros e duração.
 * Usa `this` para guardar os atributos no construtor e lê-los nos métodos.
 * @param {string} titulo - Título do conteúdo.
 * @param {string} tipo - Tipo do conteúdo (ex.: "Série").
 * @param {string[]} generos - Lista de gêneros.
 * @param {number|null} duracaoMinutos - Duração em minutos ou null.
 */
export class Conteudo {
  constructor(titulo, tipo, generos, duracaoMinutos) {
    this.titulo = titulo;
    this.tipo = tipo;
    this.generos = generos;
    this.duracaoMinutos = duracaoMinutos;
  }

  /**
   * Título, tipo e duração numa frase só; duração ausente vira "N/D".
   * @returns {string}
   */
  exibirResumo() {
    const semDuracao = this.duracaoMinutos === null || this.duracaoMinutos === undefined;
    const duracao = semDuracao ? "N/D" : `${this.duracaoMinutos} min`;
    return `${this.titulo} (${this.tipo}) — ${duracao}`;
  }

  /**
   * Gêneros separados por vírgula.
   * @returns {string}
   */
  exibirGeneros() {
    return `Gêneros: ${this.generos.join(", ")}`;
  }
}

/**
 * Série: herda de `Conteudo` e acrescenta `temporadas`.
 * Chama `super(...)` antes de usar `this` — sem isso, `this` é ReferenceError.
 * @param {string} titulo - Título da série.
 * @param {string[]} generos - Lista de gêneros.
 * @param {number|null} duracaoMinutos - Duração média ou null.
 * @param {number|null|undefined} temporadas - Número de temporadas (opcional).
 */
export class Serie extends Conteudo {
  constructor(titulo, generos, duracaoMinutos, temporadas) {
    // Guarda dentro do super(): é ele quem escreve this.generos, e undefined quebraria o join().
    super(titulo, "Série", generos === undefined ? [] : generos, duracaoMinutos);
    // Opcional ausente vira null: o valor que não chegou tem um só formato a ler.
    this.temporadas = temporadas === undefined ? null : temporadas;
  }

  /**
   * Número de temporadas numa frase, com "N/D" quando o valor não chegou.
   * @returns {string}
   */
  exibirTemporadas() {
    const semTemporadas = this.temporadas === null || this.temporadas === undefined;
    const texto = semTemporadas ? "N/D" : this.temporadas;
    return `${this.titulo} tem ${texto} temporada(s)`;
  }

  /**
   * Compara os gêneros favoritos com os desta série e devolve o objeto que o
   * card consome: gêneros em comum, gêneros não explorados, percentual
   * e faixa. O denominador é o total de gêneros DO CONTEÚDO, nunca o do perfil.
   * @param {string[]} generosFavoritos - valores dos checkboxes, em inglês
   * @returns {{ generosEmComum: string[], generosNaoExplorados: string[], percentual: string, classificacao: string }}
   */
  calcularCompatibilidade(generosFavoritos) {
    const favoritosNormalizados = generosFavoritos.map(normalizarTexto);

    // Dois filter com o mesmo predicado, um negando: o segundo é o de sobra, que a fórmula pura não produz.
    const generosEmComum = this.generos.filter((genero) =>
      favoritosNormalizados.includes(normalizarTexto(genero)),
    );
    const generosNaoExplorados = this.generos.filter((genero) =>
      !favoritosNormalizados.includes(normalizarTexto(genero)),
    );

    // Arredondamento antes da faixa, e a faixa lê o valor arredondado: 79,5 vira 80 e é Alta; invertido, cairia em Média.
    const percentual = (
      (generosEmComum.length / this.generos.length) *
      100
    ).toFixed(0);

    // Os textos das faixas são contrato com o renderizarCard e com as classes do badge no CSS.
    let classificacao;
    if (Number(percentual) >= 80) {
      classificacao = "Alta afinidade";
    } else if (Number(percentual) >= 50) {
      classificacao = "Média afinidade";
    } else {
      classificacao = "Baixa afinidade";
    }

    return {
      generosEmComum: generosEmComum,
      generosNaoExplorados: generosNaoExplorados,
      percentual: percentual,
      classificacao: classificacao,
    };
  }
}
