const fs = require('fs');
const readline = require('readline');
const dijkstra = require('./dijkstra.js');

const arquivoGrafo = fs.readFileSync('data/grafo.json', 'utf8');
const grafo = JSON.parse(arquivoGrafo);
let resposta;

console.log(grafo);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function iniciarBusca()
{
  rl.question('Digite o ponto de origem: ', (origem) =>
  {
    rl.question('Digite o ponto de destino: ', (destino) =>
    {
      if((origem in grafo) && (destino in grafo))
      {
        console.log('\n-----------------------------------------');
        console.log(`Buscando o melhor caminho de ${origem} para ${destino}...`);
        console.log('-----------------------------------------');

        const resultado = dijkstra(grafo, origem, destino);

        if (resultado) {
          console.log(`Menor caminho: ${resultado.caminho.join(' -> ')}`);
          console.log(`Custo total: ${resultado.custo}`);
        }
        else {
          console.log(`Não foi encontrado um caminho de ${origem} para ${destino}.`);
        }

        console.log('\n');

        rl.question('Deseja verificar um novo caminho? (S/N): ', (resposta) =>
        {
          const respostaNormalizada = resposta.toLowerCase();

          if (respostaNormalizada === 's' || respostaNormalizada === 'sim') {
            iniciarBusca();
          }
          else {
            rl.close();
          }
        });
      }
      else {
        console.error('\n[ERRO] Origem ou destino inválido!');
        console.log(`Os pontos disponíveis são: ${Object.keys(grafo).join(', ')}`);
        console.log('Por favor, tente novamente.\n');
        iniciarBusca();
      }
    });
  });
}
iniciarBusca();








