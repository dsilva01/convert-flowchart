// const { forEach } = require('./dados');
// const dados = require('./dados');
// const ligacoes = require('./ligacoes');
const vm = require('vm');

var script = new vm.Script(`var condicao;`);
script.runInThisContext();

var pp = "start";


export function compilar(data, conn) {
  pp = "start";
  while (pp !== "end") {
    try {
      let item = conn.find((element) => element.source === pp);
      if (item.source === pp && item.sourceHandle === null) {
        pp = item.target;
        execute(data.find(element => element.id === item.source), data, conn);
      } else if (item.source === pp && item.sourceHandle != null) {
        pp = item.target;
        execute(data.find(element => element.id === item.source), data, conn);
      }
    } catch (e) {
      console.error(e);
      break;
    }
  }
}


function execute(item, dados, ligacoes) {
  if (item.type === 'condicao') {
    script = new vm.Script(`condicao = ${item.data.value}`);
      script.runInThisContext();
    if (global["condicao"]) {
      let target = ligacoes.find(element => element.source === item.id && element.sourceHandle === 'Sim');
      pp =  target.target;
    } else if (!global["condicao"]) {
      let target = ligacoes.find(element => element.source === item.id && element.sourceHandle === 'Nao');
      pp =  target.target;
    }

  } else if (item.type === 'entrada') {
    script = new vm.Script(`var ${item.data.value}`);
      script.runInThisContext();
  } else if (item.type === 'processo') {
    script = new vm.Script(`${item.data.value}`);
      script.runInThisContext();
  } else if (item.type === 'saida') {
    // script = new vm.Script(`console.log(${item.data.value})`);
    script = new vm.Script(`console.log(${item.data.value})`);
      script.runInThisContext();
  } /* else { 
    console.log(item.data);
  } */
}