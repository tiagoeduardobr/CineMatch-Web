/**
 * CineMatch Web — módulo de fluxo.
 *
 * Responsabilidade (AGENTS.md, seção 3): formulário, `localStorage`, busca na
 * API e cálculo da compatibilidade. Isso tudo entra depois, nas tarefas M1-T05 a
 * M1-T10. Este arquivo é o esqueleto da tarefa M1-T01 (RF15 parcial).
 *
 * Os `import` abaixo já apontam para os dois módulos irmãos, na mesma pasta, com
 * caminho relativo e extensão explícita — é assim que o navegador resolve módulos
 * ES. Os placeholders existem para que este arquivo carregue sem erro e saiam na
 * M1-T09 (modelo.js) e na M1-T11 (ui.js).
 *
 * A página só funciona servida por `npm start` (live-server): módulos ES não
 * carregam via file://, por causa do CORS. O live-server é instalado na M1-T18.
 */
import { PLACEHOLDER_UI } from './ui.js';
import { PLACEHOLDER_MODELO } from './modelo.js';

// Confirmação de que o grafo de módulos carregou. Este arquivo também é lido
// pelo Node na verificação (`node script.js`), então ele não pode tocar em
// `document`, `window` nem `localStorage` aqui em cima.
console.log('CineMatch Web: bootstrap carregado.', {
  ui: PLACEHOLDER_UI,
  modelo: PLACEHOLDER_MODELO,
});
