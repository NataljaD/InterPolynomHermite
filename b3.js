function b3(x){
    return m3(x)*(x-nodes[3])*(alphaPol()*x + betaPol());
    }
    
function m3(x){
    return (x-nodes[0])*(x-nodes[0])*(x-nodes[1])*(x-nodes[2]);
}
    
function dm3(){
    return 2*(nodes[3]-nodes[0])*(nodes[3]-nodes[1])*(nodes[3]-nodes[2])+
    (nodes[3]-nodes[0])*(nodes[3]-nodes[0])*(nodes[3]-nodes[2])+
    (nodes[3]-nodes[0])*(nodes[3]-nodes[0])*(nodes[3]-nodes[1]);
}

function alphaPol(){
    return -(dm3()/m3(nodes[3]));
}
    
function betaPol(){
    return (1/m3(nodes[3])+nodes[3]*alpha());
}