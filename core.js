/*
$$
  H(x) = (x - x_1)(x-x_2)(x-x_3)^3 (\alpha x + \beta) f(x_0) + \\
         + K(x - x_0)^2(x - x_2)(x - x_3)^3  f(x_1)+ \\
         + K(x - x_0)^2(x - x_1)(x - x_3)^3 f(x_2) + \\
         + (x - x_0)^2(x - x_1)(x - x_2)(\alpha x^2 + \beta x + \gamma) f(x_3) + \\
         + K(x - x_0)(x - x_1)(x - x_2)(x - x_3)^3 f'(x_0)+ \\
         + (x - x_0)^2(x - x_1)(x - x_2)(x - x_3)(\alpha x + \beta)f'(x_3) + \\
         + K(x - x_0)^2(x - x_1)(x - x_2)(x - x_3)^2 f''(x_3)
  $$
*/

class HermitData {
  constructor(n = 4) {
    this.nodes_ = [];
    this.fnodes_ = [];
    this.dfnodes_ = [];
    this.d2fnodes_ = [];

    for(var i = 0 ; i < n; ++i) {
      this.nodes_[i] = undefined;
      this.fnodes_[i] = undefined;
      this.dfnodes_[i] = undefined;
      this.d2fnodes_[i] = undefined;
    }
  }

  get nodes() { return this.nodes_; }
  set nodes(n) { this.nodes_ = n; }

  get fnodes() { return this.fnodes_; }
  set fnodes(fn) { this.fnodes_ = fn; }

  get dfnodes() { return this.dfnodes_; }
  set dfnodes(dfn) { this.dfnodes_ = dfn; }

  get d2fnodes() { return this.d2fnodes_; }
  set d2fnodes(d2fn) { this.d2fnodes_ = d2fn; }
}

class PolyC0 {
  constructor(nodes) {
    this.nodes_ = nodes;
  }

  l0(x){
    return (x-this.nodes_[1]) * (x-this.nodes_[2]) *
           (x-this.nodes_[3]) * (x-this.nodes_[3]) * (x-this.nodes_[3]);
  }

  dl0(){
    return 3*(this.nodes_[0]-this.nodes_[1])*(this.nodes_[0]-this.nodes_[2])*(this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3])
            +(this.nodes_[0]-this.nodes_[2])*(this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3])
            +(this.nodes_[0]-this.nodes_[1])*(this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3]);
  }

  alpha(){
    return - this.dl0() / (this.l0(this.nodes_[0])*this.l0(this.nodes_[0]));
  }

  beta(){
    return ( 1 / this.l0(this.nodes_[0])- this.alpha()*this.nodes_[0] );
  }

  calc(x) {
    return this.l0(x)*(this.alpha()*x+this.beta());
  }
}

class PolyC1 {
  constructor(nodes) {
    this.nodes_ = nodes;
  }

  K(){
    return 1/((this.nodes_[1]-this.nodes_[0]) * (this.nodes_[1]-this.nodes_[0]) *
              (this.nodes_[1]-this.nodes_[2]) * (this.nodes_[1]-this.nodes_[3]) *
              (this.nodes_[1]-this.nodes_[3]) * (this.nodes_[1]-this.nodes_[3])
            );
  }

  calc(x) {
    return (x - this.nodes_[0]) * (x-this.nodes_[0]) * (x-this.nodes_[2]) *
           (x - this.nodes_[3]) * (x-this.nodes_[3]) * (x-this.nodes_[3]) * this.K();
  }
}

class PolyC2 {
  constructor(nodes) {
    this.nodes_ = nodes;
  }

  K(){
    return 1/((this.nodes_[2]-this.nodes_[0]) * (this.nodes_[2]-this.nodes_[0]) * 
              (this.nodes_[2]-this.nodes_[1]) * (this.nodes_[2]-this.nodes_[3]) *
              (this.nodes_[2]-this.nodes_[3]) * (this.nodes_[2]-this.nodes_[3])
            );
  }

  calc(x) {
    return (x-this.nodes_[0]) * (x-this.nodes_[0]) * (x-this.nodes_[1]) *
           (x-this.nodes_[3]) * (x-this.nodes_[3]) * (x-this.nodes_[3]) * this.K();
  }
}

class PolyC3 {
  constructor(nodes) {
    this.nodes_ = nodes;
  }

  l3(x){
    return (x-this.nodes_[0]) * (x-this.nodes_[0]) * (x-this.nodes_[1]) *
           (x-this.nodes_[2]);
  }
    
  dl3(){
    return 2*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[1])*(this.nodes_[3]-this.nodes_[2])+
             (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[2])+
             (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[1]);
  }
    
  d2l3(){
    return 2 * (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[2]) +
           2 * (this.nodes_[3]-this.nodes_[1])*(this.nodes_[3]-this.nodes_[2]) +
           2 * (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[1]) +
 
           (this.nodes_[3]-this.nodes_[0]) * (this.nodes_[3]-this.nodes_[2]) +
           (this.nodes_[3]-this.nodes_[0]) * (this.nodes_[3]-this.nodes_[2]) +
           (this.nodes_[3]-this.nodes_[0]) * (this.nodes_[3]-this.nodes_[0]) +
 
           (this.nodes_[3]-this.nodes_[0]) * (this.nodes_[3]-this.nodes_[1]) +
           (this.nodes_[3]-this.nodes_[0]) * (this.nodes_[3]-this.nodes_[1]) +
           (this.nodes_[3]-this.nodes_[0]) * (this.nodes_[3]-this.nodes_[0]);
  }

  a() {
    return (2 * this.dl3() * this.dl3() - this.l3(this.nodes_[3]) * this.d2l3()) /
           (2 * this.l3(this.nodes_[3]) * this.l3(this.nodes_[3]) * this.l3(this.nodes_[3]));
  }
    
  b() {
    return -this.dl3() / 
           (this.l3(this.nodes_[3]) * this.l3(this.nodes_[3])) - 2*this.a() * this.nodes_[3];
  }

  c() {
    return 1/this.l3(this.nodes_[3]) - 
           this.a() * this.nodes_[3]*this.nodes_[3] -
           this.b() * this.nodes_[3];
  }

  calc(x) {
    return this.l3(x) * (this.a() * x * x + this.b() * x + this.c());
  }
}

class PolyB0 {
  constructor(nodes) {
    this.nodes_ = nodes;
  }

  K() {
    return 1 / (
        (this.nodes_[0]-this.nodes_[1]) * (this.nodes_[0]-this.nodes_[2]) *
        (this.nodes_[0]-this.nodes_[3]) * (this.nodes_[0]-this.nodes_[3]) * 
        (this.nodes_[0]-this.nodes_[3])
      );
  }

  calc(x) {
    return (x - this.nodes_[1]) * (x - this.nodes_[2]) * (x - this.nodes_[3]) *
           (x - this.nodes_[3]) * (x - this.nodes_[3]) * (x - this.nodes_[0]) * this.K();
  }
}

class PolyB3 {
  constructor(nodes) {
    this.nodes_ = nodes;
  }

  m3(x){
    return (x - this.nodes_[0]) * (x - this.nodes_[0]) * (x - this.nodes_[1]) * 
           (x - this.nodes_[2]);
  }
    
  dm3(){
    return 2*(this.nodes_[3] - this.nodes_[0]) * (this.nodes_[3] - this.nodes_[1]) * (this.nodes_[3] - this.nodes_[2]) +
           (this.nodes_[3] - this.nodes_[0]) * (this.nodes_[3] - this.nodes_[0]) * (this.nodes_[3] - this.nodes_[2]) +
           (this.nodes_[3] - this.nodes_[0]) * (this.nodes_[3] - this.nodes_[0]) * (this.nodes_[3] - this.nodes_[1]);
  }

  alpha(){
      return -this.dm3() / (this.m3(this.nodes_[3]) * this.m3(this.nodes_[3]));
  }
    
  beta(){
    return 1 / this.m3(this.nodes_[3]) - this.nodes_[3] * this.alpha();
  }

  calc(x){
    return this.m3(x) * (x - this.nodes_[3]) * (this.alpha() * x + this.beta());
  }
}

class PolyA3 {
  constructor(nodes) {
    this.nodes_ = nodes;
  }

  K(){
    return 1/(2*
        (this.nodes_[3] - this.nodes_[0]) * (this.nodes_[3] - this.nodes_[0]) *
        (this.nodes_[3] - this.nodes_[1]) * (this.nodes_[3] - this.nodes_[2]));
  }

  calc(x){
    return (x - this.nodes_[0]) * (x - this.nodes_[0]) *
           (x - this.nodes_[1]) * (x - this.nodes_[2]) *
           (x - this.nodes_[3]) * (x - this.nodes_[3]) * this.K();
  }
}

class Hermit {
  constructor(hermitData) {
    this.hermitData_ = hermitData;
    this.c0_ = new PolyC0(hermitData.nodes);
    this.c1_ = new PolyC1(hermitData.nodes);
    this.c2_ = new PolyC2(hermitData.nodes);
    this.c3_ = new PolyC3(hermitData.nodes);
    this.b0_ = new PolyB0(hermitData.nodes);
    this.b3_ = new PolyB3(hermitData.nodes);
    this.a3_ = new PolyA3(hermitData.nodes);
  }

  get c0() { return this.c0_; }
  get c1() { return this.c1_; }
  get c2() { return this.c2_; }
  get c3() { return this.c3_; }

  get b0() { return this.b0_; }
  get b3() { return this.b3_; }

  get a3() { return this.a3_; }

  get data() { return this.hermitData_; }

  calculate(x) {
    return this.c0_.calc(x) * this.hermitData_.fnodes[0] +
           this.c1_.calc(x) * this.hermitData_.fnodes[1] +
           this.c2_.calc(x) * this.hermitData_.fnodes[2] +
           this.c3_.calc(x) * this.hermitData_.fnodes[3] +
           
           this.b0_.calc(x) * this.hermitData_.dfnodes[0] + 
           this.b3_.calc(x) * this.hermitData_.dfnodes[3] + 
           
           this.a3_.calc(x) * this.hermitData_.d2fnodes[3];
  }
}