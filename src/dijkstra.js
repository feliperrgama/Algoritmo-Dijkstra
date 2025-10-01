const TinyQueue = require('tinyqueue').default;

function dijkstra(grafo, noOrigem, noDestino)
{

  if (noOrigem === noDestino) {
    return {
      caminho: [noOrigem],
      custo: 0
    };
  }
  
  const distancias = {};
  const predecessores = {};

  const fila = new TinyQueue([], (a, b) => a.custo - b.custo);

  for(const no in grafo) {
    distancias[no] = Infinity;
    predecessores[no] = null;
  }
  distancias[noOrigem] = 0;

  fila.push({ no: noOrigem, custo: 0 });

  while(fila.length > 0)
  {
    const { no: noAtual } = fila.pop();

    if(noAtual === noDestino) break;

    for(const vizinho in grafo[noAtual])
    {
      const custoAteVizinho = grafo[noAtual][vizinho];
      const novaDistancia = distancias[noAtual] + custoAteVizinho;

      if(novaDistancia < distancias[vizinho])
        {
        distancias[vizinho] = novaDistancia;
        predecessores[vizinho] = noAtual;
        fila.push({ no: vizinho, custo: novaDistancia });
      }
    }
  }

  if(predecessores[noDestino] === null) {
    return null;
  }
  const caminho = [];
  let passoAtual = noDestino;

  while(passoAtual !== null)
  {
    caminho.push(passoAtual);
    passoAtual = predecessores[passoAtual]
  }
  caminho.reverse();

  return {
    caminho: caminho,
    custo: distancias[noDestino]
  };
}

module.exports = dijkstra;
