

function c2K(){
    return 1/(
         (nodes[2]-nodes[0])*(nodes[2]-nodes[0])
        *(nodes[2]-nodes[1])
        *(nodes[2]-nodes[3])*(nodes[2]-nodes[3])*(nodes[2]-nodes[3])
    );
}

function c2(x){
    return (x-nodes[0])*(x-nodes[0])
        *(x-nodes[1])
        *(x-nodes[3])*(x-nodes[3])*(x-nodes[3])*c2K();
}