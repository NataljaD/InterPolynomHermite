function Hermit(x) {
  return c0(x) * fnodes[0] 
       + c1(x) * fnodes[1] 
       + c2(x) * fnodes[2]
       + c3(x) * fnodes[3]
       
       + b0(x) * dfnodes[0]
       + b3(x) * dfnodes[3] 
       
       + a3(x) * d2fnodes[3];
}

function main() {
  var arg = [];
  var farg = [];

  var result = '';
  var h = Math.PI / 12;
  for(var i = 0; i <= 12; ++i) {
    
    arg.push(h*i);
    
    farg.push(Hermit(h*i));
    
    

    result = result + `${h*i},${Hermit(h*i)}\n`;
  }

  var trace2 = {
    x: arg, 
    y: farg, 
    type: 'scatter'
  };
  
  var data = [trace2];
  Plotly.newPlot('hermit-plot', data);

  console.log(result);
}

