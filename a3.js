function a3(x){
    return (x-nodes[0]) * (x-nodes[0]) *
           (x-nodes[1]) * (x-nodes[2]) *
           (x-nodes[3]) * (x-nodes[3]) * A3();
}

function A3(){
    return 1/(2*
        (nodes[3]-nodes[0])*(nodes[3]-nodes[0])*
        (nodes[3]-nodes[1])*(nodes[3]-nodes[2]));
}