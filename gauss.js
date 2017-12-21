class Gauss {
    constructor(matrixA, vectorF, n) {
        this.matrixA_ = matrixA;
        this.vectorF_ = vectorF;
        this.n_ = n;
    }

    swap(i, j) {
        let tmpA = this.matrixA_[i];
        let tmpf = this.vectorF_[i];

        this.matrixA_[i] = this.matrixA_[j];
        this.vectorF_[i] = this.vectorF_[j];

        this.matrixA_[j] = tmpA;
        this.vectorF_[j] = tmpf;
    }

    solve() {
        let result = [];
        let matrix = this.matrixA_;
        let vectorF = this.vectorF_;
        let N = this.n_;
        let tmp;

        /*Метод Гаусса*/
        /*прямой ход*/
        for (let i = 0; i < N; i++) {
            tmp = matrix[i][i];

            if (tmp == 0) {
                let notNullIndex = -1;
                for (let j = N - 1; j >= i; --j) {
                    if (matrix[j][i] != 0) {
                        notNullIndex = j;
                        break;
                    }
                }

                this.swap(i, notNullIndex);
            }

            tmp = matrix[i][i];

            for (let j = N; j >= i; j--) {
                matrix[i][j] /= tmp;

            }
            vectorF[i] /= tmp;

            for (let j = i + 1; j < N; j++) {
                tmp = matrix[j][i];
                for (let k = N; k >= i; k--) {
                    matrix[j][k] -= tmp * matrix[i][k];
                }
                vectorF[j] -= tmp * vectorF[i];
            }
        }
        /*обратный ход*/
        result[N - 1] = vectorF[N - 1];
        for (let i = N - 2; i >= 0; i--) {
            result[i] = vectorF[i];
            for (let j = i + 1; j < N; j++)
                result[i] -= matrix[i][j] * result[j];
        }

        return result;
    }
}

let matrix = [
    [0, 3, 1],
    [1, -2, 1],
    [3, -1, 3]
];

let vectorF = [-4, 3, 4];
let N = 3;
let g = new Gauss(matrix, vectorF, N);
console.log(g.solve()); // [2, -1, -1]