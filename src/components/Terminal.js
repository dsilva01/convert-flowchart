import React, { useEffect } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "../style/xterm.css";
import "../style/xt.css";
// import { Resizable } from "re-resizable";
// import ResizeObserver from "react-resize-observer";
// import c from "ansi-colors";

const vm = require('vm');
const delay = require('delay');

var script = new vm.Script(`var condicao; var saida;`);
script.runInThisContext();

var pp = "start";

let term;
const fitAddon = new FitAddon();


export const Termina = (props) => {
  let ac = new AbortController();

  const compilar = async (data, conn, p) => {
    let loopCounter = 1;
    let maxLoopIterations = 10000;
    pp = p;
    while (pp !== "end") {
      // await setTimeout(() => {console.log(123)}, 5000);
      try {
        let item = conn.find((element) => element.source === pp);
        if (item.source === pp && item.sourceHandle === null) {
          pp = item.target;
          let data_t = data.find(element => element.id === item.source);
          execute(data.find(element => element.id === item.source), data, conn);
          if(data_t.type === 'processo' ) {
            if(data_t.data.checked) {
              try {
                ac = new AbortController();
                await delay(1000000, {signal: ac.signal});
              } catch (error) {
                // 500 milliseconds later
                // console.log(error.name)
                //=> 'AbortError'
              }
            }
          }
        } else if (item.source === pp && item.sourceHandle != null) {
          pp = item.target;
          execute(data.find(element => element.id === item.source), data, conn);
        }
        if (loopCounter >= maxLoopIterations) {
          // console.log('Loop counter exceeded max iterations');
          prompt();
          term.write('Numeros de iterações excedidas');
          pp = "end";
          break;
        }
        loopCounter++;
      } catch (e) {
        break;
      }
    }
    prompt();
    prompt();
    term.write('Fim da execucao');
  }

  const execute = async (item, dados, ligacoes) => {
    if (item.type === 'condicao' || item.type === 'repiticao') {
      script = new vm.Script(`condicao = ${item.data.value}`);
      script.runInThisContext();
      if (global["condicao"]) {
        let target = ligacoes.find(element => element.source === item.id && element.sourceHandle === 'Sim');
        pp = target.target;
      } else if (!global["condicao"]) {
        let target = ligacoes.find(element => element.source === item.id && element.sourceHandle === 'Nao');
        pp = target.target;
      }

    } else if (item.type === 'entrada') {
      script = new vm.Script(`var ${item.data.value}`);
      script.runInThisContext();
      if (item.data.type === "string") {
        script = new vm.Script(`${item.data.value} = ""`);
        script.runInThisContext();
      } else if (item.data.type === "int" || item.data.type === "float") {
        script = new vm.Script(`${item.data.value} = 0`);
        script.runInThisContext();
      } else if (item.data.type === "boolean") {
        script = new vm.Script(`${item.data.value} = true`);
        script.runInThisContext();
      }
    } else if (item.type === 'processo') {
      if (item.data.checked === true) {
        let dd = "";
        // console.log(document.getElementById('xterm'));

          let disposable = term.onKey(async(key) => {
              const char = key.domEvent.key;
              if (char === "Enter") {
                try {
                  script = new vm.Script(`${item.data.value} ${dd}`);
                  script.runInThisContext();
                } catch(error) {
                  // console.log(error);
                  script = new vm.Script(`${item.data.value} "${dd}"`);
                  script.runInThisContext();
                }
                dd = "";
                prompt();
                // clearTimeout(delay);
                ac.abort();
                // console.log(delay2);
                // delay;
                // delay3("delay2");
                disposable.dispose();
              } else if (char === "Backspace") {
                term.write("\b \b");
                dd = dd.slice(0, -1);
          } else if ((key.domEvent.keyCode >= 65 && key.domEvent.keyCode <= 90) || 
          (key.domEvent.keyCode >= 48 && key.domEvent.keyCode <= 57) || key.domEvent.keyCode === 32) {
            dd=(`${dd}${char}`);
            term.write(char);
          }
          });
      } else {
        script = new vm.Script(`${item.data.value}`);
        script.runInThisContext();
      }
    } else if (item.type === 'saida') {
      script = new vm.Script(`saida = ${item.data.value}`);
      script.runInThisContext();
      // script = new vm.Script(`console.log(${item.data.value})`);
      term.write(`\r\n${global["saida"]}`);
    }
  }

  window.addEventListener("resize", function () {
    resizeTermin();
  }, false);

  const resizeTermin = () => {
    let ter = [];
    ter = document.getElementsByClassName("xterm-viewport");
    ter = Array.from(ter);
    ter[0].style = "width: 100%; height:100%";
  }


  function dfdf(p) {
    document.getElementById("xterm").innerHTML = "";
    term = new Terminal({
      convertEol: true,
      fontFamily: `'Fira Mono', monospace`,
      fontSize: 15,
      fontWeight: 900,
      // rendererType: "dom" // default is canvas
    });

    //Styling
    term.setOption("theme", {
      background: "black",
      foreground: "white"
    });

    // term.resize(100,5)

    // Load Fit Addon
    term.loadAddon(fitAddon);

    // Open the terminal in #terminal-container
    term.open(document.getElementById("xterm"));

    //Write text inside the terminal
    // term.write(c.magenta("I am ") + c.blue("Blue") + c.red(" and i like it"));

    fitAddon.fit();
    try {
      compilar(props.nodes, props.edges, p);
    } catch (error) {
      
    }
    // console.log(props.elements, props.edges, p);
 
    // var dd = "";
    //   const disposable = term.onKey((key) => {
    //       const char = key.domEvent.key;
    //       console.log(key.domEvent);
    //       if (char === "Enter") {
    //         dd = "";
    //         prompt();
    //         disposable.dispose();
    //   } else if (char === "Backspace") {
    //     term.write("\b \b");
    //   } else if ((key.domEvent.keyCode >= 65 && key.domEvent.keyCode <= 90) || 
    //   (key.domEvent.keyCode >= 48 && key.domEvent.keyCode <= 57) || key.domEvent.keyCode == 32) {
    //     dd=(`${dd}${char}`);
    //     term.write(char);
    //   }
    // });

    prompt();
  }
  // componentDidMount();
  const prompt = () => {
    var shellprompt = "";
    term.write("\r\n" + shellprompt);
  };

  // useEffect(() => {dfdf(); resizeTermin();});
  // useEffect(() => resizeTermin());
  useEffect(
    () => {
      dfdf('start');
    },
    [props.clique],
  );
  useEffect(
    () => {
      // if(props.cancelar) {
        // ac.abort();
      // pp = "3";
      // compilar(props.elements, props.edges, '3');
      dfdf('end');
      // disposable.dispose();
      // }
    },
    [props.cancelar],
  );
  // dfdf();

  // render() {
  return (
    <div style={{ width: "100vw", height: "100%" }}>
      {/* <Resizable
          width={350}
          height={350}
          style={{
            background: "firebrick",
            padding: "0.4em",
            margin: "1em"
          }}
          enable = {{ top:true, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
          // onResize = { () => fitAddon.fit() }
        > */}
      <div id="xterm" style={{ height: "100%", width: "100%" }} />
      {/* <ResizeObserver
            onResize={(rect) => {
              fitAddon.fit();
              // console.log("Resized. New bounds:", rect.width, "x", rect.height);
            }}
            onPosition={(rect) => {
              // console.log("Moved. New position:", rect.left, "x", rect.top);
            }}
          /> */}
      {/* </Resizable> */}
    </div>
  );
  // }
}