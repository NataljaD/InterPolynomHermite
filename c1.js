function c1(x){
    return (x-nodes[0])*(x-nodes[0])*(x-nodes[2])*(x-nodes[3])*(x-nodes[3])*(x-nodes[3])*c1K();
}

function c1K(){
    return 1/(
        (nodes[1]-nodes[0])*(nodes[1]-nodes[0])*(nodes[1]-nodes[2])*
        (nodes[1]-nodes[3])*(nodes[1]-nodes[3])*(nodes[1]-nodes[3]));
}