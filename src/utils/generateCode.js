// const dados = require('./dados5');
// const ligacoes = require('./ligacoes5');
// const fs = require('fs');

var pp = 'start';
var ordem = '';
// ordem = `${ordem}\npublic class javaApplication {	\npublic static void main(String[] args) { \n`;
// ordem = `${ordem}\nScanner read = new Scanner(System.in)\n`;

const compilar = async (data, conn, p) => {
  ordem = `${ordem}import java.util.*; \n`;
  ordem = `${ordem}\npublic class javaApplication {	\npublic static void main(String[] args) { \n`;
  ordem = `${ordem}\nScanner read = new Scanner(System.in);\n`;
  pp = p;
  while (pp !== "end") {
    try {
      let item = conn.find((element) => element.source === pp);
      if (item.source === pp && item.sourceHandle === null) {
        pp = item.target;
        execute2(data.find(element => element.id === item.source), data, conn, 'start');
      } else if (item.source === pp && item.sourceHandle != null) {
        let ppif = pp;
        let ppif2 = `${ppif}endif`;
        pp = item.target;
        execute2(data.find(element => element.id === item.source), data, conn, 'start');
        let el = data.find(element => element.id === item.source);
        // console.log(pp);
        // pp = "end";
        if (el.type === 'condicao') {
          while (pp !== ppif2) {
            item = conn.find((element) => element.source === pp);
            pp = item.target;
            execute2(data.find(element => element.id === item.source), data, conn, 'start');
          }
          ordem = `${ordem}}\n`;
          pp = ppif;
          while (pp !== ppif2) {
            item = conn.find((element) => element.source === pp);
            pp = item.target;
            execute2(data.find(element => element.id === item.source), data, conn, 0);
          }
          ordem = `${ordem}}\n`;
          pp = ppif2;
        } else if (el.type === 'repiticao') {
          while (pp !== ppif) {
            item = conn.find((element) => element.source === pp);
            pp = item.target;
            execute2(data.find(element => element.id === item.source), data, conn, 'start');
          }
          ordem = `${ordem}}\n`;
          item = conn.find((element) => element.source === pp && element.sourceHandle === 'Nao');
          pp = item.target;
        }
      }
    } catch (e) {
      console.error(e);
      break;
    }
  }
  ordem = `${ordem}}\n}\n`;
  // fs.writeFile('test.txt', ordem, () => { console.log() });
}

const execute2 = async (item, dados, ligacoes, da) => {
  if (item !== undefined) {
    if (item.type === 'condicao') {
      if (da) {
        ordem = `${ordem}if (${item.data.value}) {\n`;
        let target = ligacoes.find(element => element.source === item.id && element.sourceHandle === 'Sim');
        pp = target.target;
      } else if (!da) {
        ordem = `${ordem}else {\n`;
        let target = ligacoes.find(element => element.source === item.id && element.sourceHandle === 'Nao');
        pp = target.target;
      }
    } else if (item.type === 'repiticao') {
      if (da) {
        ordem = `${ordem}while (${item.data.value}) {\n`;
        let target = ligacoes.find(element => element.source === item.id && element.sourceHandle === 'Sim');
        pp = target.target;
      } else if (!da) {
        let target = ligacoes.find(element => element.source === item.id && element.sourceHandle === 'Nao');
        pp = target.target;
      }
    } else if (item.type === 'entrada') {
      if (item.data.type === "string") {
        ordem = `${ordem}String ${item.data.value} = '';\n`;
      }else if (item.data.type === "int") {
        ordem = `${ordem}int ${item.data.value} = 0;\n`;
      }else if (item.data.type === "float") {
        ordem = `${ordem}float ${item.data.value} = 0;\n`;
      }else if (item.data.type === "boolean") {
        ordem = `${ordem}boolean ${item.data.value} = false;\n`;
      }
    } else if (item.type === 'processo') {
      if (item.data.checked) {
        if (item.data.type === "string") {
          ordem = `${ordem}${item.data.value} read.nextLine();\n`;
        }else if (item.data.type === "int") {
          ordem = `${ordem}${item.data.value} read.nextInt();\n`;
        }else if (item.data.type === "float") {
          ordem = `${ordem}${item.data.value} read.nextFloat();\n`;
        }else if (item.data.type === "boolean") {
          ordem = `${ordem}${item.data.value} read.nextBoolean();\n`;
        }
      } else {
        ordem = `${ordem}${item.data.value};\n`;
      }
    } else if (item.type === 'saida') {
      // ordem = `${ordem}console.log(${item.data.value});\n`;
      ordem = `${ordem}System.out.println(${item.data.value});\n`;
    } else if (item.type === 'ligacao') {
      // ordem = `${ordem}}\n`;
    }
  }
}


export const result = (data, conn, pp) => {
  // console.log('start');
  ordem = "";
  compilar(data, conn, pp);
  // console.log(ordem)
  return ordem;
};
// console.log('start''start');
// fs.appendFile('test.txt', ordem, () => {console.log()});