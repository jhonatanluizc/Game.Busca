/// :: Base.
class No {
    constructor(pai, x, y, nivel, custo, anterior, proximo) {
        this.pai = pai;
        this.x = x;
        this.y = y;
        this.nivel = nivel;
        this.custo = custo;
        this.anterior = anterior;
        this.proximo = proximo;
    }
}

/// :: Base.
class lista {

    constructor(head, tail) {
        this.head = null;
        this.tail = null;
    }

    /// :: INSERE NO INÍCIO DA LISTA
    inserePrimeiro(x, y, nivel, custo, p) {

        var novo_no = new No(p, x, y, nivel, custo, null, null)

        if (this.head === null) {
            this.tail = novo_no;
            this.head = novo_no;
        } else {
            novo_no.proximo = this.head;
            this.head.anterior = novo_no;
            this.head = novo_no;
        }
    }

    /// :: INSERE NO FIM DA LISTA
    insereUltimo(x, y, nivel, custo, p) {

        var novo_no = new No(p, x, y, nivel, custo, null, null);

        if (this.head === null) {
            this.head = novo_no;
        } else {
            this.tail.proximo = novo_no;
            novo_no.anterior = this.tail;
        }
        this.tail = novo_no;
    }

    /// :: INSERE NA POSICAO X, 40
    inserePos_X(x, y, nivel, custo, p) {

        if (this.head === null) {
            this.inserePrimeiro(x, y, nivel, custo, p);
        } else {
            var atual = this.head;

            while (atual.custo < custo) {
                atual = atual.proximo;
                if (atual === null) {
                    break;
                }
            }

            if (atual === this.head) {
                this.inserePrimeiro(x, y, nivel, custo, p);
            } else {

                if (atual === null) {
                    this.insereUltimo(x, y, nivel, custo, p);
                } else {
                    var novo_no = new No(p, x, y, nivel, custo, null, null);
                    var aux = atual.anterior;
                    aux.proximo = novo_no;
                    novo_no.anterior = aux;
                    atual.anterior = novo_no;
                    novo_no.proximo = atual;
                }
            }
        }
    }

    /// :: REMOVE NO INÍCIO DA LISTA
    deletaPrimeiro() {
        if (this.head === null) {
            return null;
        } else {
            var no = this.head;
            this.head = this.head.proximo;

            if (this.head !== null)
                this.head.anterior = null;
            else
                this.tail = null;

            return no;
        }
    }

    /// :: REMOVE NO FIM DA LISTA
    deletaUltimo() {
        if (this.tail === null) {
            return null;
        } else {
            var no = this.tail;
            this.tail = this.tail.anterior;
            if (this.tail !== null)
                this.tail.proximo = null;
            else
                this.head = null;

            return no;
        }
    }

    vazio() {
        if (this.head === null)
            return true;
        else
            return false;
    }

    /// :: 89
    exibeLista() {
        var aux = this.head;
        var str = [];
        while (aux !== null) {
            var linha = [];
            linha.push(aux.x);
            linha.push(aux.y);
            str.push(linha);
            aux = aux.proximo;
        }
        return str;
    }

    /// :: 108
    exibeCaminho() {

        var atual = this.tail;
        var caminho = [];
        var linha = [];

        while (atual.pai !== null) {
            linha = [];
            linha.push(atual.x);
            linha.push(atual.y);
            caminho.push(linha);
            atual = atual.pai;
        }

        linha = [];
        linha.push(atual.x);
        linha.push(atual.y);
        caminho.push(linha);
        caminho = caminho.reverse();

        return caminho;
    }

    /// :: 127
    exibeCaminho1(no) {

        var atual = this.head;
        var coordenadas = [];
        coordenadas.push(atual.x);
        coordenadas.push(atual.y);

        while (coordenadas.toString() !== no.toString()) {
            atual = atual.proximo;
            coordenadas = [];
            coordenadas.push(atual.x);
            coordenadas.push(atual.y);
        }

        var caminho = [];
        atual = atual.pai;

        while (atual.pai !== null) {
            var linha = [];
            linha.push(atual.x);
            linha.push(atual.y);
            caminho.push(linha);
            atual = atual.pai;
        }

        linha = [];
        linha.push(atual.x);
        linha.push(atual.y);
        caminho.push(linha);
        return caminho;
    }

    /// :: 155
    exibeCaminho2(coordenadas, custo) {

        var atual = this.tail;

        var linha = [];
        linha.push(atual.x);
        linha.push(atual.y);

        while ((linha.toString() !== coordenadas.toString()) || (atual.custo !== custo)) {
            atual = atual.anterior;
            linha = [];
            linha.push(atual.x);
            linha.push(atual.y);
        }

        var caminho = [];

        while (atual.pai !== null) {
            linha = [];
            linha.push(atual.x);
            linha.push(atual.y);
            caminho.push(linha);
            atual = atual.pai;
        }

        linha = [];
        linha.push(atual.x);
        linha.push(atual.y);
        caminho.push(linha);

        return caminho;
    }

    /// :: RETORNA O PRIMEIRO
    primeiro() {
        return this.head;
    }

    /// :: RETORNA O ULTIMO
    ultimo() {
        return this.tail;
    }

}

/// :: Base.
class busca {

    sucessor(x, y) {

        var max_x = mapa.length;
        var max_y = mapa[0].length;

        var pos = new No(null, x, y, 0, null, null);
        var acao = [];

        /// :: Ir para direita, 10
        if (pos.x + 1 < max_x) {

            var xx = pos.x + 1;
            var yy = pos.y;

            if (mapa[xx][yy] !== 1) {

                var posicao = [];
                posicao.push(xx);
                posicao.push(yy);
                var custo = [];
                custo.push(posicao);
                custo.push(3);
                acao.push(custo);

            }

        }

        /// :: Ir para esquerda
        if (pos.x - 1 >= 0) {

            var xx = pos.x - 1;
            var yy = pos.y;

            if (mapa[xx][yy] !== 1) {

                var posicao = [];
                posicao.push(xx);
                posicao.push(yy);
                var custo = [];
                custo.push(posicao);
                custo.push(2);
                acao.push(custo);
            }
        }

        /// :: Ir para cima, 11
        if (pos.y + 1 < max_y) {

            var xx = pos.x;
            var yy = pos.y + 1;

            if (mapa[xx][yy] !== 1) {

                var posicao = [];
                posicao.push(xx);
                posicao.push(yy);
                var custo = [];
                custo.push(posicao);
                custo.push(1);
                acao.push(custo);

            }

        }

        /// :: Ir para baixo
        if (pos.y - 1 >= 0) {

            var xx = pos.x;
            var yy = pos.y - 1;

            if (mapa[xx][yy] !== 1) {

                var posicao = [];
                posicao.push(xx);
                posicao.push(yy);
                var custo = [];
                custo.push(posicao);
                custo.push(2);
                acao.push(custo);

            }

        }

        return acao;
    }

    heuristica(p1, p2) {
        return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
    }

    amplitude(inicio, fim) {

        /// :: Manipular a FILA para a busca
        var l1 = new lista();
        /// :: Cópia para apresentar o caminho (somente inserção)
        var l2 = new lista();

        l1.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        l2.insereUltimo(inicio[0], inicio[1], 0, 0, null);

        var linha = [];
        var visitado = [];

        linha.push(inicio);
        linha.push(0);
        visitado.push(linha);

        /// :: ite = 0
        while (l1.vazio() !== null) {

            /// :: remove o primeiro da fila
            var atual = l1.deletaPrimeiro();

            if (atual === null) {
                break;
            }

            /// :: varre todos as conexões dentro do grafo a partir de atual
            var acao = this.sucessor(atual.x, atual.y);

            for (var i = 0; i < acao.length; i++) {

                var novo = acao[i][0];
                /// :: pressuponho que não foi visitado
                var flag = true;

                /// :: para cada conexão verifica se já foi visitado
                for (var j = 0; j < visitado.length; j++) {

                    if (visitado[j][0].toString() === novo.toString()) {

                        if (visitado[j][1] <= (atual.nivel + 1)) {
                            flag = false;
                        } else {
                            visitado[j][1] = atual.nivel + 1;
                        }
                        break;

                    }
                }

                /// :: se não foi visitado inclui na fila
                if (flag) {
                    l1.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual)
                    l2.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual)

                    /// :: marca como visitado
                    var linha = [];
                    linha.push(novo);
                    linha.push(atual.nivel + 1);
                    visitado.push(linha);

                    /// :: verifica se é o objetivo
                    if (novo.toString() === fim.toString()) {
                        var caminho = l2.exibeCaminho();
                        return caminho;
                    }

                }

            }

        }

        return "caminho não encontrado";
    }

    profundidade(inicio, fim) {

        /// :: manipular a FILA para a busca
        var l1 = new lista();

        /// :: cópia para apresentar o caminho (somente inserção)
        var l2 = new lista();

        /// :: controle de nós visitados
        var visitado = [];

        l1.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        l2.insereUltimo(inicio[0], inicio[1], 0, 0, null);

        var linha = [];
        linha.push(inicio);
        linha.push(0);
        visitado.push(linha);

        /// :: ite = 0
        while (l1.vazio() !== null) {

            /// :: remove o primeiro da fila
            var atual = l1.deletaUltimo();

            if (atual === null) {
                break;
            }

            /// :: varre todos as conexões dentro do grafo a partir de atual
            var acao = this.sucessor(atual.x, atual.y);

            for (var i = acao.length - 1; i > -1; i--) {

                var novo = acao[i][0];

                /// :: pressuponho que não foi visitado
                var flag = true;

                /// :: para cada conexão verifica se já foi visitado
                for (var j = 0; j < visitado.length; j++) {

                    if (visitado[j][0].toString() === novo.toString()) {

                        if (visitado[j][1] <= (atual.nivel + 1)) {
                            flag = false;
                        } else {
                            visitado[j][1] = atual.nivel + 1;
                        }
                        break;

                    }
                }

                /// :: se não foi visitado inclui na fila
                if (flag) {
                    l1.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual)
                    l2.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual)

                    /// :: marca como visitado
                    var linha = [];
                    linha.push(novo);
                    linha.push(atual.nivel + 1);
                    visitado.push(linha);

                    /// :: verifica se é o objetivo
                    if (novo.toString() === fim.toString()) {
                        var caminho = l2.exibeCaminho();
                        return caminho;
                    }

                }

            }

        }

        return "caminho não encontrado";
    }

    profundidade_limitada(inicio, fim, limite) {

        /// :: manipular a FILA para a busca
        var l1 = new lista();

        /// :: cópia para apresentar o caminho (somente inserção)
        var l2 = new lista();

        /// :: controle de nós visitados
        var visitado = [];

        l1.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        l2.insereUltimo(inicio[0], inicio[1], 0, 0, null);

        var linha = [];
        linha.push(inicio);
        linha.push(0);
        visitado.push(linha);

        /// :: ite = 0
        while (l1.vazio() !== null) {

            /// :: remove o primeiro da fila
            var atual = l1.deletaUltimo();

            if (atual === null) {
                break;
            }

            if (atual.nivel < limite) {

                /// :: varre todos as conexões dentro do grafo a partir de atual
                var acao = this.sucessor(atual.x, atual.y);

                for (var i = acao.length - 1; i > -1; i--) {

                    var novo = acao[i][0];

                    /// :: pressuponho que não foi visitado
                    var flag = true;

                    /// :: para cada conexão verifica se já foi visitado
                    for (var j = 0; j < visitado.length; j++) {

                        if (visitado[j][0].toString() === novo.toString()) {

                            if (visitado[j][1] <= (atual.nivel + 1)) {
                                flag = false;
                            } else {
                                visitado[j][1] = atual.nivel + 1;
                            }
                            break;

                        }
                    }

                    /// :: se não foi visitado inclui na fila
                    if (flag) {
                        l1.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual)
                        l2.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual)

                        /// :: marca como visitado
                        var linha = [];
                        linha.push(novo);
                        linha.push(atual.nivel + 1);
                        visitado.push(linha);

                        /// :: verifica se é o objetivo
                        if (novo.toString() === fim.toString()) {
                            var caminho = l2.exibeCaminho();
                            return caminho;
                        }

                    }

                }

            }

        }

        return "caminho não encontrado";
    }

    aprofundamento_iterativo(inicio, fim) {

        for (var limite = 0; limite < (mapa.length * mapa[0].length); limite++) {

            var caminho = [];

            /// :: manipular a FILA para a busca
            var l1 = new lista();

            /// :: cópia para apresentar o caminho (somente inserção)
            var l2 = new lista();

            /// :: insere ponto inicial como nó raiz da árvore
            l1.insereUltimo(inicio[0], inicio[1], 0, 0, null)
            l2.insereUltimo(inicio[0], inicio[1], 0, 0, null)

            /// :: controle de nós visitados
            var visitado = [];
            var linha = [];
            linha.push(inicio);
            linha.push(0);
            visitado.push(linha);

            while (l1.vazio() !== null) {

                var atual = l1.deletaUltimo();

                if (atual === null) {
                    break;
                }

                if (atual.nivel < limite) {

                    var acao = this.sucessor(atual.x, atual.y);

                    for (var i = 0; i < acao.length; i++) {

                        var novo = acao[i][0];

                        /// :: pressuponho que não foi visitado
                        var flag = true;

                        /// :: para cada conexão verifica se já foi visitado
                        for (var j = 0; j < visitado.length; j++) {

                            if (visitado[j][0].toString() === novo.toString()) {

                                if (visitado[j][1] <= (atual.nivel + 1)) {
                                    flag = false;
                                } else {
                                    visitado[j][1] = atual.nivel + 1;
                                }
                                break;

                            }
                        }

                        /// :: se não foi visitado inclui na fila
                        if (flag) {
                            l1.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual)
                            l2.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual)

                            /// :: marca como visitado
                            var linha = [];
                            linha.push(novo);
                            linha.push(atual.nivel + 1);
                            visitado.push(linha);

                            /// :: verifica se é o objetivo
                            if (novo.toString() === fim.toString()) {
                                var caminho = l2.exibeCaminho();
                                return caminho;
                            }

                        }

                    }

                }

            }

        }

        return "caminho não encontrado";
    }

    bidirecional(inicio, fim) {

        /// :: listas para a busca a partir da origem - busca 1
        /// :: busca na FILA
        var l1 = new lista();
        /// :: cópia da árvore completa
        var l2 = new lista();

        /// :: listas para a busca a partir da origem - busca 2
        /// :: busca na FILA
        var l3 = new lista();
        /// :: cópia da árvore completa
        var l4 = new lista();

        /// :: cria estrutura para controle de nós visitados
        var visitado = [];
        var linha = [];

        l1.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        l2.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        linha = [];
        linha.push(inicio);
        linha.push(1);
        visitado.push(linha);

        l3.insereUltimo(fim[0], fim[1], 0, 0, null);
        l4.insereUltimo(fim[0], fim[1], 0, 0, null);
        linha = [];
        linha.push(fim);
        linha.push(2);
        visitado.push(linha);

        while (true) {

            /// :: EXECUÇÃO DO PRIMEIRO AMPLITUDE - BUSCA 1
            var flag1 = true;

            while (flag1) {

                var atual = l1.deletaPrimeiro();
                var acao = this.sucessor(atual.x, atual.y);

                for (var i = 0; i < acao.length; i++) {

                    var novo = acao[i][0];
                    var flag2 = true;
                    var flag3 = false;

                    for (var j = 0; j < visitado.length; j++) {

                        if (visitado[j][0].toString() === novo.toString()) {

                            /// :: visitado na mesma árvore
                            if (visitado[j][1] === 1) {
                                flag2 = false;
                            } else {
                                /// :: visitado na outra árvore
                                flag3 = true;
                            }
                            break;

                        }
                    }

                    if (flag2) {

                        l1.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual);
                        l2.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual);

                        if (flag3) {

                            var caminho = l2.exibeCaminho();
                            caminho = caminho.concat(l4.exibeCaminho1(novo));
                            return caminho;
                        } else {
                            linha = [];
                            linha.push(novo);
                            linha.push(1);
                            visitado.push(linha);
                        }

                    }

                }

                if (l1.vazio() !== true) {

                    var aux = l1.primeiro();

                    if (aux.nivel === atual.nivel) {
                        flag1 = true;
                    } else {
                        flag1 = false;
                    }

                }

            }

            /// :: EXECUÇÃO DO SEGUNDO AMPLITUDE - BUSCA 2
            var flag1 = true;

            while (flag1) {

                var atual = l3.deletaPrimeiro();

                if (atual === null) {
                    break;
                }

                var acao = this.sucessor(atual.x, atual.y);

                for (var i = 0; i < acao.length; i++) {

                    var novo = acao[i][0];
                    var flag2 = true;
                    var flag3 = false;

                    for (var j = 0; j < visitado.length; j++) {

                        if (visitado[j][0].toString() === novo.toString()) {

                            /// :: visitado na mesma árvore
                            if (visitado[j][1] === 2) {
                                flag2 = false;
                            } else {
                                /// :: visitado na outra árvore
                                flag3 = true;
                            }
                            break;

                        }
                    }

                    if (flag2) {

                        l3.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual);
                        l4.insereUltimo(novo[0], novo[1], atual.nivel + 1, 0, atual);

                        if (flag3) {

                            var caminho = l4.exibeCaminho();
                            caminho = caminho.concat(l2.exibeCaminho1(novo));
                            caminho = caminho.reverse();
                            return caminho;
                        } else {
                            linha = [];
                            linha.push(novo);
                            linha.push(2);
                            visitado.push(linha);
                        }

                    }

                }

                if (l3.vazio() !== true) {

                    var aux = l3.primeiro();

                    if (atual.nivel === aux.nivel) {
                        flag1 = true;
                    } else {
                        flag1 = false;
                    }

                }

            }

        }

    }

    custo_uniforme(inicio, fim) {

        var l1 = new lista();
        var l2 = new lista();
        var visitado = [];

        l1.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        l2.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        var linha = [];
        linha.push(inicio);
        linha.push(0);
        visitado.push(linha);

        while (l1.vazio() === false) {

            var atual = l1.deletaPrimeiro();
            var coordenadas = [];
            coordenadas.push(atual.x);
            coordenadas.push(atual.y);

            if (coordenadas.toString() === fim.toString()) {
                var caminho = l2.exibeCaminho2(coordenadas, atual.custo);
                return [caminho.reverse(), atual.custo];
            }

            var acao = this.sucessor(atual.x, atual.y);

            for (var i = 0; i < acao.length; i++) {

                var novo = acao[i][0];

                /// :: CÁLCULO DO CUSTO DA ORIGEM ATÉ O NÓ ATUAL
                var v2 = atual.custo + acao[i][1];
                var v1 = v2;

                var flag1 = true;
                var flag2 = true;

                /// :: para cada conexão verifica se já foi visitado
                for (var j = 0; j < visitado.length; j++) {

                    if (visitado[j][0].toString() === novo.toString()) {

                        if (visitado[j][1] <= v1) {
                            flag1 = false;
                        } else {
                            visitado[j][1] = v1;
                            flag2 = false;
                        }
                        break;
                    }
                }

                if (flag1) {

                    /// :: pai, x, y, nivel, custo, anterior, proximo 

                    l1.inserePos_X(novo[0], novo[1], v1, v1, atual);
                    l2.inserePos_X(novo[0], novo[1], v1, v1, atual);

                    if (flag2) {
                        var linha = [];
                        linha.push(novo);
                        linha.push(v1);
                        visitado.push(linha);
                    }

                }

            }

        }

        return "Caminho não encontrado";

    }

    greedy(inicio, fim) {

        var l1 = new lista();
        var l2 = new lista();
        var visitado = [];

        l1.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        l2.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        var linha = [];
        linha.push(inicio);
        linha.push(0);
        visitado.push(linha);

        while (l1.vazio() !== null) {

            var atual = l1.deletaPrimeiro();

            var coordenadas = [];
            coordenadas.push(atual.x);
            coordenadas.push(atual.y);

            if (coordenadas.toString() === fim.toString()) {
                var caminho = l2.exibeCaminho2(coordenadas, atual.custo);
                return [caminho.reverse(), atual.custo];
            }

            var acao = this.sucessor(atual.x, atual.y);

            for (var i = 0; i < acao.length; i++) {

                var novo = acao[i][0];

                /// :: CÁLCULO DO CUSTO DA ORIGEM ATÉ O NÓ ATUAL
                var v2 = atual.custo + acao[i][1];
                var v1 = this.heuristica(novo, fim);

                var flag1 = true;
                var flag2 = true;

                /// :: para cada conexão verifica se já foi visitado
                for (var j = 0; j < visitado.length; j++) {

                    if (visitado[j][0].toString() === novo.toString()) {

                        if (visitado[j][1] <= v1) {
                            flag1 = false;
                        } else {
                            visitado[j][1] = v1;
                            flag2 = false;
                        }
                        break;
                    }
                }

                if (flag1) {

                    /// :: pai, x, y, nivel, custo, anterior, proximo 

                    l1.inserePos_X(novo[0], novo[1], 0, v2, atual);
                    l2.inserePos_X(novo[0], novo[1], 0, v2, atual);

                    if (flag2) {
                        var linha = [];
                        linha.push(novo);
                        linha.push(v1);
                        visitado.push(linha);
                    }

                }

            }

        }

        return "Caminho não encontrado";

    }

    a_estrela(inicio, fim) {

        var l1 = new lista();
        var l2 = new lista();
        var visitado = [];

        l1.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        l2.insereUltimo(inicio[0], inicio[1], 0, 0, null);
        var linha = [];
        linha.push(inicio);
        linha.push(0);
        visitado.push(linha);

        while (l1.vazio() !== null) {
            var atual = l1.deletaPrimeiro();

            var coordenadas = [];
            coordenadas.push(atual.x);
            coordenadas.push(atual.y);

            if (coordenadas.toString() === fim.toString()) {
                var caminho = l2.exibeCaminho2(coordenadas, atual.custo);
                return [caminho.reverse(), atual.custo];
            }

            var acao = this.sucessor(atual.x, atual.y);

            for (var i = 0; i < acao.length; i++) {

                var novo = acao[i][0];

                var v2 = atual.nivel + acao[i][1];
                var v1 = v2 + this.heuristica(novo, fim);

                var flag1 = true;
                var flag2 = true;

                /// :: para cada conexão verifica se já foi visitado
                for (var j = 0; j < visitado.length; j++) {

                    if (visitado[j][0].toString() === novo.toString()) {

                        if (visitado[j][1] <= v1) {
                            flag1 = false;
                        } else {
                            visitado[j][1] = v1;
                            flag2 = false;
                        }
                        break;
                    }
                }

                if (flag1) {

                    /// :: pai, x, y, nivel, custo, anterior, proximo 

                    l1.inserePos_X(novo[0], novo[1], v2, v1, atual);
                    l2.inserePos_X(novo[0], novo[1], v2, v1, atual);

                    if (flag2) {
                        var linha = [];
                        linha.push(novo);
                        linha.push(v1);
                        visitado.push(linha);
                    }

                }

            }

        }

        return "Caminho não encontrado";

    }

}

mapa = [
    [1, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 0, 0, 0]
];

function calcular(_origem, _destino) {

    var solucao = new busca();

    var a_estrela = solucao.a_estrela(_origem, _destino);
    console.log("A Estrela.......: ", a_estrela);

    var greedy = solucao.greedy(_origem, _destino);
    console.log("Greedy.......: ", greedy);

    var custo_uniforme = solucao.custo_uniforme(_origem, _destino);
    console.log("Custo Uniforme.......: ", custo_uniforme);

    var bidirecional = solucao.bidirecional(_origem, _destino);
    console.log("Bidirecional.......: ", bidirecional);

    var aprofundamento_iterativo = solucao.aprofundamento_iterativo(_origem, _destino);
    console.log("Aprofundamento Iterativo.......: ", aprofundamento_iterativo);

    var profundidade_limitada = solucao.profundidade_limitada(_origem, _destino, 14);
    console.log("Profundidade Limitada.......: ", profundidade_limitada);

    var profundidade = solucao.profundidade(_origem, _destino);
    console.log("Profundidade.......: ", profundidade);

    var amplitude = solucao.amplitude(_origem, _destino);
    console.log("Amplitude.......: ", amplitude);

}



