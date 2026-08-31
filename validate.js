const fs = require('fs');

const arquivo = process.argv[2] || 'index.html';

if (!fs.existsSync(arquivo)) {
  console.error(`❌ Arquivo "${arquivo}" não encontrado`);
  process.exit(1);
}

const html = fs.readFileSync(arquivo, 'utf-8');
const erros = [];

// 1. Estrutura essencial
const estrutura = {
  '<!DOCTYPE html>': html.trimStart().toLowerCase().startsWith('<!doctype html>'),
  '<html': /<html[\s>]/i.test(html),
  '</html>': /<\/html>/i.test(html),
  '<head>': /<head[\s>]/i.test(html),
  '</head>': /<\/head>/i.test(html),
  '<body>': /<body[\s>]/i.test(html),
  '</body>': /<\/body>/i.test(html),
};

for (const [tag, presente] of Object.entries(estrutura)) {
  if (!presente) erros.push(`Tag essencial ausente: ${tag}`);
}

// 2. Balanceamento de tags (pilha)
const tagsVazias = new Set(['meta', 'link', 'img', 'br', 'hr', 'input', 'doctype']);
const pilha = [];
const regex = /<\/?([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?\/?>/g;
let match;

while ((match = regex.exec(html)) !== null) {
  const tagCompleta = match[0];
  const nome = match[1].toLowerCase();
  const ehFechamento = tagCompleta.startsWith('</');
  const ehAutofechada = tagCompleta.endsWith('/>');

  if (ehFechamento) {
    const topo = pilha.pop();
    if (topo !== nome) {
      erros.push(`Tag de fechamento </${nome}> não corresponde à tag aberta <${topo || 'nenhuma'}>`);
    }
  } else if (!ehAutofechada && !tagsVazias.has(nome)) {
    pilha.push(nome);
  }
}

if (pilha.length > 0) {
  erros.push(`Tags não fechadas: ${pilha.join(', ')}`);
}

// 3. Checagem extra: tabela com cabeçalho e corpo
if (/<table[\s>]/i.test(html)) {
  if (!/<thead[\s>]/i.test(html)) erros.push('Tabela sem <thead>');
  if (!/<tbody[\s>]/i.test(html)) erros.push('Tabela sem <tbody>');
}

// Resultado
if (erros.length > 0) {
  console.error('❌ HTML quebrado - problemas encontrados:');
  erros.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('✅ HTML válido - nenhuma linha quebrada encontrada');
}
