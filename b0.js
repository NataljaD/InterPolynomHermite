function B0(){
    return 1 / (
        (nodes[0]-nodes[1])*(nodes[0]-nodes[2]) *
        (nodes[0]-nodes[3])*(nodes[0]-nodes[3]) * (nodes[0]-nodes[3])
    );
}

function b0(x){
    return (x-nodes[1])*(x-nodes[2])*
    (x-nodes[3])*(x-nodes[3])*(x-nodes[3])*
    (x-nodes[0])*B0();
}