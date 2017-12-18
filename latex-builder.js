class LatexBuilder {
  constructor(hermit, round = 4) {
    this.hermit_ = hermit;
    this.round_ = round;
  }

  round(x) {
    var pow10 = Math.pow(10, this.round_);
    return Math.round(x * pow10) / pow10;
  }

  str(value, zerosgn) {
    if(zerosgn && value == 0) {
      return zerosgn + '0';
    }
    return value <= 0 ? value : '+' + value;
  }

  getHermitLatex() {
    var data = this.hermit_.data;
    var h = this.hermit_;

    var template = this.render([
      h.c0.alpha(), h.c0.beta(), data.fnodes[0],
      h.c1.K(), data.fnodes[1],
      h.c2.K(), data.fnodes[2],
      h.c3.a(), h.c3.b(), h.c3.c(), data.fnodes[3],
      h.b0.K(), data.dfnodes[0],
      h.b3.alpha(), h.b3.beta(), data.dfnodes[3],
      h.a3.K(), data.d2fnodes[3]
    ], data.nodes);

    return template;
  }

  render(numbers, nds) {
    var num = numbers.map(x => this.round(x));
    var nodes = nds.map(x => this.str(this.round(-x), '-'));
    var template = `
      $$
      H(x) =  (x  ${nodes[1]})(x  ${nodes[2]})(x  ${nodes[3]})^3 (${num[0]} * x ${this.str(num[1])}) * (${num[2]}) + \\\\
            + (${num[3]})*(x  ${nodes[0]})^2(x  ${nodes[2]})(x  ${nodes[3]})^3 * (${num[4]})+ \\\\
            + (${num[5]})*(x  ${nodes[0]})^2(x  ${nodes[1]})(x  ${nodes[3]})^3 * (${num[6]})+ \\\\
            + (x  ${nodes[0]})^2(x  ${nodes[1]})(x  ${nodes[2]})(${num[7]} * x^2 ${this.str(num[8])} * x ${this.str(num[9])}) * (${num[10]}) + \\\\
            + (${num[11]})*(x  ${nodes[0]})(x  ${nodes[1]})(x  ${nodes[2]})(x  ${nodes[3]})^3 * (${num[12]})+ \\\\
            + (x  ${this.str(nodes[0])})^2(x  ${nodes[1]})(x  ${nodes[2]})(x  ${nodes[3]})(${num[13]} * x ${this.str(num[14])}) * (${num[15]}) + \\\\
            + (${num[16]})*(x  ${nodes[0]})^2(x  ${nodes[1]})(x  ${nodes[2]})(x  ${nodes[3]})^2 (${num[17]})
      $$
    `;

    return template;
  }
}