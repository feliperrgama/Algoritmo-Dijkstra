const fs = require('fs');
const readline = require('readline');
const dijkstra = require('./dijkstra.js');

const arquivoGrafo = fs.readFileSync('data/grafo.json', 'utf8');
const grafo = JSON.parse(arquivoGrafo);

console.log(grafo);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o ponto de origem: ', (origem) => {
  console.log(`Origem definida como: ${origem}`);

  rl.question('Digite o ponto de destino: ', (destino) => {
    console.log(`Destino definido como: ${destino}`);

    console.log('\n-----------------------------------------');
    console.log(`Buscando o melhor caminho de ${origem} para ${destino}...`);
    console.log('-----------------------------------------');

    const resultado = dijkstra(grafo, origem, destino);
    console.log(resultado);

    rl.close();
  });
});






