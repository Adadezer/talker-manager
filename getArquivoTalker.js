const fs = require('fs');

function getArquivoTalker() {
  return JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
}

module.exports = getArquivoTalker;