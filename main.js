function dividedDiffs(hermitData) {
  var z = [
    hermitData.nodes[0],
    hermitData.nodes[0],
    hermitData.nodes[1],
    hermitData.nodes[2],
    hermitData.nodes[3],
    hermitData.nodes[3],
    hermitData.nodes[3]
  ];

  var fz = [
    hermitData.fnodes[0],
    hermitData.fnodes[0],
    hermitData.fnodes[1],
    hermitData.fnodes[2],
    hermitData.fnodes[3],
    hermitData.fnodes[3],
    hermitData.fnodes[3]
  ];

  var n = z.length;
  var diffs = [fz];

  for(var i = 0; i < n; ++i) {
    for(var j = 0; j < n - i - 1; ++j) {

    } 
  }
}

function toInterpolate() {
  var data = new HermitData();
  //data.nodes = [0, Math.PI/4, Math.PI*3/4, Math.PI];
  data.nodes=[1, 2, 3, 4];
  data.fnodes = data.nodes.map(Math.exp);
  data.dfnodes = [Math.exp(data.nodes[0]), undefined, undefined, Math.exp(data.nodes[3])];
  data.d2fnodes = [undefined, undefined, undefined, Math.exp(data.nodes[3])];
  return data;
}

function showHermitLatex(hermit) {
  var hermitLatex = new LatexBuilder(hermit).getHermitLatex();
  document.getElementById('hermit-latex').innerHTML = hermitLatex;
  MathJax.Hub.Typeset();
}

function collectData() {
  var result = new HermitData();

  for(var i=0; i<4; i++){
    result.nodes[i]  = parseFloat(document.getElementById(`nodes${i}`).value);
    result.fnodes[i] = parseFloat(document.getElementById(`fnodes${i}`).value);
  }

  result.dfnodes[0] = parseFloat(document.getElementById(`dfnodes0`).value);
  result.dfnodes[3] = parseFloat(document.getElementById(`dfnodes3`).value);

  result.d2fnodes[3] = parseFloat(document.getElementById(`d2fnodes3`).value);

  return result;
}

function onCalculate(collect) {
  var data;
  if(collect) {
    data = collectData();
  } else {
    data = toInterpolate();
  }

  var ermit = new Hermit(data);



  showHermitLatex(ermit);

  var h=(data.nodes[3]-data.nodes[0])/21;
  var tabHermite=[];
  var tabHermiteF=[];

  for (var i=0; i<=21 ; i++)
  {
    var arg = data.nodes[0] + i*h;
    tabHermite[i]=arg;
    tabHermiteF[i]=ermit.calculate(arg);
  }

  console.log(ermit.calculate(Math.PI/4));
  var trace1 = {
    x: data.nodes, 
    y: data.fnodes, 
    type: 'scatter',
    name: 'Input data',
    mode: 'markers'
  };

  var trace2 = {
    x: tabHermite, 
    y: tabHermiteF, 
    type: 'scatter',
    name: 'Hermit',
    line: {
      color: 'rgb(128, 0, 128)',
      width: 1
    }
  };

  var plotData = [trace2, trace1];
  Plotly.newPlot('input-plot', plotData);  
}

function withInputChange(wantInput) {
  if(wantInput) {
    document.getElementById('without-input').classList.add('hidden');
    document.getElementById('input-data').classList.remove('hidden');
  } else {
    document.getElementById('without-input').classList.remove('hidden');
    document.getElementById('input-data').classList.add('hidden');
  }
}

