function main() {
  // var arg = [];
  // var farg = [];

  // var result = '';
  // var h = Math.PI / 12;
  // for(var i = 0; i <= 12; ++i) {
    
  //   arg.push(h*i);
    
  //   farg.push(Hermit(h*i));

  //   result = result + `${h*i},${Hermit(h*i)}\n`;
  // }

}

function collectData() {
  var nodes = [];
  var fnodes = [];
  var dfnodes = [];
  var d2fnodes = [];
  for(var i=0; i<4; i++){
    nodes[i]=parseFloat(document.getElementById(`nodes${i}`).value);
    fnodes[i]=parseFloat(document.getElementById(`fnodes${i}`).value);
    //console.log(nodes[i]+"\n");
    //console.log(fnodes[i]+"\n");
  }

  for(var i=0; i<4; i=i+3){
    dfnodes[i]=parseFloat(document.getElementById(`dfnodes${i}`).value);
    //console.log(dfnodes[i]+"\n");
  }

  d2fnodes[3]=parseFloat(document.getElementById(`d2fnodes3`).value);
  //console.log(d2fnodes[3]+"\n");

  return {
    nodes: nodes,
    fnodes: fnodes,
    dfnodes: dfnodes,
    d2fnodes: d2fnodes
  }
}

function onClick() {
  //var data = collectData();
  var data = {};
  data.nodes = [0, Math.PI/4, Math.PI*3/4, Math.PI];
  data.fnodes = data.nodes.map(Math.sin);
  data.dfnodes = [Math.cos(data.nodes[0]), undefined, undefined, Math.cos(data.nodes[3])];
  data.d2fnodes = [undefined, undefined, undefined, -Math.sin(data.nodes[3])];
  var ermit = new InterpolationPoly(data);

  //console.log(ermit.hermite(1));

  var h=(data.nodes[3]-data.nodes[0])/12;
  var tabHermite=[];
  var tabHermiteF=[];

  for (var i=0; i<=12 ; i++)
  {
    var arg = data.nodes[0] + i*h;
    tabHermite[i]=arg;
    tabHermiteF[i]=ermit.hermite(arg);
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