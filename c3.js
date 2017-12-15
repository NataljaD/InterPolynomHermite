function c3(x){
    return l3(x)*(a()*x*x+b()*x+c());
}

function l3(x){
    return (x-nodes[0])*(x-nodes[0])*(x-nodes[1])*(x-nodes[2]);
}
    
function dl3(){
    return 2*(nodes[3]-nodes[0])*(nodes[3]-nodes[1])*(nodes[3]-nodes[2])+
             (nodes[3]-nodes[0])*(nodes[3]-nodes[0])*(nodes[3]-nodes[2])+
             (nodes[3]-nodes[0])*(nodes[3]-nodes[0])*(nodes[3]-nodes[1]);
}
    
function d2l3(){
    return 2*(nodes[3]-nodes[0])*(nodes[3]-nodes[2])+
    2*(nodes[3]-nodes[1])*(nodes[3]-nodes[2])+
    2*(nodes[3]-nodes[0])*(nodes[3]-nodes[1])+

    (nodes[3]-nodes[0])*(nodes[3]-nodes[2])+
    (nodes[3]-nodes[0])*(nodes[3]-nodes[2])+
    (nodes[3]-nodes[0])*(nodes[3]-nodes[0])+

    (nodes[3]-nodes[0])*(nodes[3]-nodes[1])+
    (nodes[3]-nodes[0])*(nodes[3]-nodes[1])+
    (nodes[3]-nodes[0])*(nodes[3]-nodes[0]);
}

function a(){
    return (2* dl3() * dl3() -l3(nodes[3])*d2l3() ) /
    (2*l3(nodes[3])*l3(nodes[3])*l3(nodes[3]));
}
    
function b(){
    return -dl3()/( l3(nodes[3]) * l3(nodes[3]) ) - 2*a()*nodes[3];
}

function c(){
    return 1/l3(nodes[3])-a()*nodes[3]*nodes[3]-b()*nodes[3];
}