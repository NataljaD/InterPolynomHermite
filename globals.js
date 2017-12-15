function func(x) {
  return Math.sin(x);
}

function dfunc(x) {
  return Math.cos(x);
}

function d2func(x) {
  return -Math.sin(x);
}

var nodes = [Math.PI / 4, Math.PI / 2 , Math.PI *3 / 4, Math.PI];
var fnodes = nodes.map(x => func(x));
var dfnodes = [
  dfunc(nodes[0]),
  undefined,
  undefined,
  dfunc(nodes[3])
];
var d2fnodes = [
  undefined,
  undefined,
  undefined,
  d2func(nodes[3])
];