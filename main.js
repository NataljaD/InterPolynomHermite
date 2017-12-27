function toInterpolate() {
    var data = new HermitData();
    data.nodes = [0, Math.PI / 4, Math.PI * 3 / 4, Math.PI];
    //data.nodes = [1, 2, 3, 4];
    data.fnodes = data.nodes.map(Math.cos);
    data.dfnodes = [-Math.sin(data.nodes[0]), undefined, undefined, -Math.sin(data.nodes[3])];
    data.d2fnodes = [undefined, undefined, undefined, -Math.cos(data.nodes[3])];
    return data;
}

function showHermitLatex(hermit, coefs) {
    var builder = new LatexBuilder(hermit, 6);
    var hermitLatex =builder.getHermitLatex();
    document.getElementById('hermit-latex').innerHTML = hermitLatex;

    var simpleHermitLatex = builder.getSimpleHermitLatex(coefs);
    document.getElementById('simple-hermit-latex').innerHTML = simpleHermitLatex;

    MathJax.Hub.Typeset();
}

function showPlot(x, y, nodes, fnodes, selector) {
    var trace1 = {
        x: nodes,
        y: fnodes,
        type: 'scatter',
        name: 'Input data',
        mode: 'markers'
    };

    var trace2 = {
        x: x,
        y: y,
        type: 'scatter',
        name: 'Hermit',
        line: {
            color: 'rgb(128, 0, 128)',
            width: 1
        }
    };

    var plotData = [trace2, trace1];
    Plotly.newPlot(selector, plotData);
}

function collectData() {
    var result = new HermitData();

    for (var i = 0; i < 4; i++) {
        result.nodes[i] = parseFloat(document.getElementById(`nodes${i}`).value);
        result.fnodes[i] = parseFloat(document.getElementById(`fnodes${i}`).value);
    }

    result.dfnodes[0] = parseFloat(document.getElementById(`dfnodes0`).value);
    result.dfnodes[3] = parseFloat(document.getElementById(`dfnodes3`).value);

    result.d2fnodes[3] = parseFloat(document.getElementById(`d2fnodes3`).value);

    return result;
}

function onCalculate(collect) {
    //Для табуляції. Кількість точок.
    let N = 21;

    // Звідки беремо дані?
    var data;
    if (collect) {
        data = collectData();
    } else {
        data = toInterpolate();
    }

    //Для табуляції і обрахунків будемо юзати ерміта, який
    //ми найшли з системи (невизначені коефіцієнти).
    //Нехай існує многочлен вигляду:
    // H(x) = a_6 * x^6 + a_5 * x^5 + ... + a_0
    // Тоді він має задовільняти умови:
    // H(x0) = f0,  H(x1) = f(1) .... H''(x3) = f''3
    // Ми там отримаємо систему, де коефіцієнти невідомі
    // Теорема якась доводить що ця система завжди розв"язна
    var simpleHermitCoef = getSimpleHermitCoef(data);

    //Цього ерміта будемо юзати тільки для відображення
    //коефіцієнтів. Щоб було як в курсовій
    var ermit = new Hermit(data);
    showHermitLatex(ermit, simpleHermitCoef);

    var h = (data.nodes[3] - data.nodes[0]) / N;
    var tabHermite = [];
    var tabHermiteF = [];

    //Табулюємо функцію і показуємо зразу
    for (var i = 0; i <= N; i++) {
        var arg = data.nodes[0] + i * h;
        tabHermite[i] = arg;
        tabHermiteF[i] = calcSimpleHermit(arg, simpleHermitCoef);
    }

    showPlot(tabHermite, tabHermiteF, data.nodes, data.fnodes, 'f-plot');

    //Табулюємо похідну і зразу малюємо
    for (var i = 0; i <= N; i++) {
        var arg = data.nodes[0] + i * h;
        tabHermite[i] = arg;
        tabHermiteF[i] = calcSimpleHermit_d1(arg, simpleHermitCoef);
    }

    showPlot(tabHermite, tabHermiteF, data.nodes, data.dfnodes, 'df-plot');

    //Табулюємо другу похідну і зразу малюємо
    for (var i = 0; i <= N; i++) {
        var arg = data.nodes[0] + i * h;
        tabHermite[i] = arg;
        tabHermiteF[i] = calcSimpleHermit_d2(arg, simpleHermitCoef);
    }

    showPlot(tabHermite, tabHermiteF, data.nodes, data.d2fnodes, 'd2f-plot');

}

function withInputChange(wantInput) {
    if (wantInput) {
        document.getElementById('without-input').classList.add('hidden');
        document.getElementById('input-data').classList.remove('hidden');
    } else {
        document.getElementById('without-input').classList.remove('hidden');
        document.getElementById('input-data').classList.add('hidden');
    }
}

