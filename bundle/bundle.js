const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

const entry = filename => {
  const content = fs.readFileSync(filename, "utf-8");
  const Ast = parser.parse(content, {
    sourceType: "module"
  });
  console.log(Ast.program.body);
  
  const yilai = {};
  traverse(Ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename);
      const newfile = "./" + path.join(dirname, node.source.value);
      yilai[node.source.value] = newfile;
    }
  });

  const { code } = babel.transformFromAst(Ast, null, {
    presets: ["@babel/preset-env"]
  });

  return {
    filename,
    yilai,
    code
  };
};

const deepModule = filename => {
  const entryInfo = entry(filename);
  const deepModuleArry = [entryInfo];
  for (let i = 0; i < deepModuleArry.length; i++) {
    const item = deepModuleArry[i];
    const { yilai } = item;
    if (yilai) {
      for (let j in yilai) {
        deepModuleArry.push(entry(yilai[j]));
      }
    }
  }
  const graph = {};
  deepModuleArry.forEach(item => {
    graph[item.filename] = {
      yilai: item.yilai,
      code: item.code
    };
  });
  return graph;
};

const code = filename => {
  const yilaiAll = JSON.stringify(deepModule(filename));
  return `
    (function(yilaiAll){
        function require(module){
            function localRequire(relativePath){
                return require(yilaiAll[module].yilai[relativePath])
            }
            var exports = {};
            (function(require,exports,code){
                eval(code)
            })(localRequire,exports,yilaiAll[module].code)
            return exports;
        }
        require('${filename}')
    })(${yilaiAll})
  `;
};
const info = code("./src/index.js");

console.log(info);
