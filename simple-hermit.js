function getSimpleHermitCoef(hermitData) {
    let matrix = [
        [Math.pow(hermitData.nodes[0], 6), Math.pow(hermitData.nodes[0], 5), Math.pow(hermitData.nodes[0], 4), Math.pow(hermitData.nodes[0], 3), Math.pow(hermitData.nodes[0], 2), hermitData.nodes[0], 1],
        [Math.pow(hermitData.nodes[1], 6), Math.pow(hermitData.nodes[1], 5), Math.pow(hermitData.nodes[1], 4), Math.pow(hermitData.nodes[1], 3), Math.pow(hermitData.nodes[1], 2), hermitData.nodes[1], 1],
        [Math.pow(hermitData.nodes[2], 6), Math.pow(hermitData.nodes[2], 5), Math.pow(hermitData.nodes[2], 4), Math.pow(hermitData.nodes[2], 3), Math.pow(hermitData.nodes[2], 2), hermitData.nodes[2], 1],
        [Math.pow(hermitData.nodes[3], 6), Math.pow(hermitData.nodes[3], 5), Math.pow(hermitData.nodes[3], 4), Math.pow(hermitData.nodes[3], 3), Math.pow(hermitData.nodes[3], 2), hermitData.nodes[3], 1],
        [6 * Math.pow(hermitData.nodes[0], 5), 5 * Math.pow(hermitData.nodes[0], 4), 4 * Math.pow(hermitData.nodes[0], 3), 3 * Math.pow(hermitData.nodes[0], 2), 2 * hermitData.nodes[0], 1, 0],
        [6 * Math.pow(hermitData.nodes[3], 5), 5 * Math.pow(hermitData.nodes[3], 4), 4 * Math.pow(hermitData.nodes[3], 3), 3 * Math.pow(hermitData.nodes[3], 2), 2 * hermitData.nodes[3], 1, 0],
        [6 * 5 * Math.pow(hermitData.nodes[3], 4), 5 * 4 * Math.pow(hermitData.nodes[3], 3), 4 * 3 * Math.pow(hermitData.nodes[3], 2), 3 * 2 * hermitData.nodes[3], 2, 0, 0],
    ];

    let vectorF = [...hermitData.fnodes, hermitData.dfnodes[0], hermitData.dfnodes[3], hermitData.d2fnodes[3]];

    let g = new Gauss(matrix, vectorF, 7);
    return g.solve();
}

function calcSimpleHermit(x, coef) {
    let result = coef[6];
    let powX = x;
    for (let i = 5; i >= 0; --i) {
        result += powX * coef[i];
        powX *= x;
    }
    return result;
}

function calcSimpleHermit_d1(x, coef) {
    let result = coef[5];
    let powX = x;
    for (let i = 4; i >= 0; --i) {
        result += (6 - i) * powX * coef[i];
        powX *= x;
    }
    return result;
}

function calcSimpleHermit_d2(x, coef) {
    let result = 2 * coef[4];
    let powX = x;
    for (let i = 3; i >= 0; --i) {
        result += (6 - i) * (5 - i) * powX * coef[i];
        powX *= x;
    }
    return result;
}