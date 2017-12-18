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

function onCalculate() {
  // var data = collectData();
  var data = new HermitData();
  data.nodes = [0, Math.PI/4, Math.PI*3/4, Math.PI];
  data.fnodes = data.nodes.map(Math.sin);
  data.dfnodes = [Math.cos(data.nodes[0]), undefined, undefined, Math.cos(data.nodes[3])];
  data.d2fnodes = [undefined, undefined, undefined, -Math.sin(data.nodes[3])];
  var ermit = new Hermit(data);

  showHermitLatex(ermit);

  var h=(data.nodes[3]-data.nodes[0])/12;
  var tabHermite=[];
  var tabHermiteF=[];

  for (var i=0; i<=12 ; i++)
  {
    var arg = data.nodes[0] + i*h;
    tabHermite[i]=arg;
    tabHermiteF[i]=ermit.calculate(arg);
  }

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

  var plotData = [trace1, trace2];
  Plotly.newPlot('input-plot', plotData);  
}

function withInputChange(target) {
  if(target.checked) {
    document.getElementById('without-input').classList.add('hidden');
    document.getElementById('input-data').classList.remove('hidden');
  }

  if(!target.checked) {
    document.getElementById('without-input').classList.remove('hidden');
    document.getElementById('input-data').classList.add('hidden');
  }
}

function withoutInputChange(target) {
  if(!target.checked) {
    document.getElementById('without-input').classList.add('hidden');
    document.getElementById('input-data').classList.remove('hidden');
  }

  if(target.checked) {
    document.getElementById('without-input').classList.remove('hidden');
    document.getElementById('input-data').classList.add('hidden');
  }
}