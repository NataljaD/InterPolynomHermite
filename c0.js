

function l0(x){
    return (x-nodes[1])*(x-nodes[2])*(x-nodes[3])*(x-nodes[3])*(x-nodes[3]);
}

function dl0(){
    return 3*(nodes[0]-nodes[1])*(nodes[0]-nodes[2])*(nodes[0]-nodes[3])*(nodes[0]-nodes[3])
            +(nodes[0]-nodes[2])*(nodes[0]-nodes[3])*(nodes[0]-nodes[3])*(nodes[0]-nodes[3])
            +(nodes[0]-nodes[1])*(nodes[0]-nodes[3])*(nodes[0]-nodes[3])*(nodes[0]-nodes[3]);
}

function alpha(){
    return -dl0()/(l0(nodes[0])*l0(nodes[0]));
}

function beta(){
    return ( 1 / l0(nodes[0])- alpha()*nodes[0] );
}

function c0(x){
    return l0(x)*(alpha()*x+beta());
}