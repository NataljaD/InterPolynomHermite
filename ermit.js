class InterpolationPoly {
    constructor({nodes, fnodes, dfnodes, d2fnodes}) {
        this.nodes_ = nodes;
        this.fnodes_ = fnodes;
        this.dfnodes_ = dfnodes;
        this.d2fnodes_ = d2fnodes;
    }
    
    //--------c0----//
    l0(x){
        return (x-this.nodes_[1]) * (x-this.nodes_[2])*
        (x-this.nodes_[3])*(x-this.nodes_[3])*(x-this.nodes_[3]);
    }
    
    dl0(){
        return 3*(this.nodes_[0]-this.nodes_[1])*(this.nodes_[0]-this.nodes_[2])*(this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3])
                +(this.nodes_[0]-this.nodes_[2])*(this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3])
                +(this.nodes_[0]-this.nodes_[1])*(this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3]);
    }
    
    alpha(){
        return -this.dl0()/(this.l0(this.nodes_[0])*this.l0(this.nodes_[0]));
    }
    
     beta(){
        return ( 1 / this.l0(this.nodes_[0])- this.alpha()*this.nodes_[0] );
    }
    
    c0(x){
        return this.l0(x)*(this.alpha()*x+this.beta());
    }
    //--------------//



    //--------c1----//
    c1(x){
        return (x-this.nodes_[0])*(x-this.nodes_[0])*
        (x-this.nodes_[2])*(x-this.nodes_[3])*(x-this.nodes_[3])*(x-this.nodes_[3])*this.c1K();
    }
    
    c1K(){
        return 1/(
            (this.nodes_[1]-this.nodes_[0])*(this.nodes_[1]-this.nodes_[0])*(this.nodes_[1]-this.nodes_[2])*
            (this.nodes_[1]-this.nodes_[3])*(this.nodes_[1]-this.nodes_[3])*(this.nodes_[1]-this.nodes_[3]));
    }
    //--------------//
    



    //--------c2----//
    c2K(){
        return 1/(
             (this.nodes_[2]-this.nodes_[0])*(this.nodes_[2]-this.nodes_[0])
            *(this.nodes_[2]-this.nodes_[1])
            *(this.nodes_[2]-this.nodes_[3])*(this.nodes_[2]-this.nodes_[3])*(this.nodes_[2]-this.nodes_[3])
        );
    }
    
    c2(x){
        return (x-this.nodes_[0])*(x-this.nodes_[0])
            *(x-this.nodes_[1])
            *(x-this.nodes_[3])*(x-this.nodes_[3])*(x-this.nodes_[3])*this.c2K();
    }
    //--------------//



    //--------c3----//
    c3(x){
        return this.l3(x)*(this.a()*x*x+this.b()*x+this.c());
    }
    
    l3(x){
        return (x-this.nodes_[0])*(x-this.nodes_[0])*(x-this.nodes_[1])*(x-this.nodes_[2]);
    }
        
    dl3(){
        return 2*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[1])*(this.nodes_[3]-this.nodes_[2])+
                 (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[2])+
                 (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[1]);
    }
        
    d2l3(){
        return 2*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[2])+
        2*(this.nodes_[3]-this.nodes_[1])*(this.nodes_[3]-this.nodes_[2])+
        2*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[1])+
    
        (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[2])+
        (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[2])+
        (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[0])+
    
        (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[1])+
        (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[1])+
        (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[0]);
    }
    //--------------//




    //--------b0----//
    a(){
        return (2* this.dl3() * this.dl3() -this.l3(this.nodes_[3])*this.d2l3() ) /
        (2*this.l3(this.nodes_[3])*this.l3(this.nodes_[3])*this.l3(this.nodes_[3]));
    }
        
    b(){
        return -this.dl3()/( this.l3(this.nodes_[3]) * this.l3(this.nodes_[3]) ) - 2*this.a()*this.nodes_[3];
    }
    
    c(){
        return 1/this.l3(this.nodes_[3])-this.a()*this.nodes_[3]*this.nodes_[3]-this.b()*this.nodes_[3];
    }

    B0(){
        return 1 / (
            (this.nodes_[0]-this.nodes_[1])*(this.nodes_[0]-this.nodes_[2]) *
            (this.nodes_[0]-this.nodes_[3])*(this.nodes_[0]-this.nodes_[3]) * (this.nodes_[0]-this.nodes_[3])
        );
    }
    
    b0(x){
        return (x-this.nodes_[1])*(x-this.nodes_[2])*
        (x-this.nodes_[3])*(x-this.nodes_[3])*(x-this.nodes_[3])*
        (x-this.nodes_[0])*this.B0();
    }
    //--------------//




    //--------b3----//
    m3(x){
        return (x-this.nodes_[0])*(x-this.nodes_[0])*(x-this.nodes_[1])*(x-this.nodes_[2]);
    }
        
    dm3(){
        return 2*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[1])*(this.nodes_[3]-this.nodes_[2])+
        (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[2])+
        (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[1]);
    }
    
    alphaPol(){
        return -this.dm3() / (this.m3(this.nodes_[3]) * this.m3(this.nodes_[3]));
    }
        
    betaPol(){
        return 1 / this.m3(this.nodes_[3]) - this.nodes_[3] * this.alphaPol();
    }
    
    b3(x){
        return this.m3(x)*(x-this.nodes_[3])*(this.alphaPol()*x + this.betaPol());
    }
    //--------------//

    //--------a3----//
    a3(x){
        return (x-this.nodes_[0]) * (x-this.nodes_[0]) *
               (x-this.nodes_[1]) * (x-this.nodes_[2]) *
               (x-this.nodes_[3]) * (x-this.nodes_[3]) * this.A3();
    }
    
    A3(){
        return 1/(2*
            (this.nodes_[3]-this.nodes_[0])*(this.nodes_[3]-this.nodes_[0])*
            (this.nodes_[3]-this.nodes_[1])*(this.nodes_[3]-this.nodes_[2]));
    }
    //--------------//



    hermite(x) {
        return this.c0(x) * this.fnodes_[0] 
       + this.c1(x) * this.fnodes_[1] 
       + this.c2(x) * this.fnodes_[2]
       + this.c3(x) * this.fnodes_[3]
       
       + this.b0(x) * this.dfnodes_[0]
       + this.b3(x) * this.dfnodes_[3] 
       
       + this.a3(x) * this.d2fnodes_[3];
    }
}