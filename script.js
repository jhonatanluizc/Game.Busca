/// :: O objeto do jogo.
Game = {

    /// :: Informações sobre o turno.
    RollRemainP1: 0,
    RollRemainCPU: 0,
    EnemyRout: [],
    CurrentTurn: 'player-roll',

    /// :: Mapa do jogo.
    /// :: P = player
    /// :: E = inimigo
    /// :: G = chegada.
    Mapa: [
        ['P', 1, 0, 0, 1, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
        ['E', 1, 0, 0, 0, 0, 0, 0, 0, 'G']
    ],

    /// :: Mapa padrão, para o reset.
    MapaDefault: [],

    /// :: Rola o dado.
    Roll: function () {
        return roll();
    },

    /// :: Eventos do jogo.
    Init: function () {

        /// :: Cria um mapa padrão para o reset do jogo.
        Game.MapaDefault = JSON.parse(JSON.stringify(Game.Mapa));

        /// :: Renderiza o mapa.
        Game.Render();

        /// :: Atualiza o mapa da biblioteca.
        Game.Algoritmos.UpdateMap();

        /// :: Quando o mapa é clicado.
        $("#mapa").click(function (e) {

            /// :: Pega a linha e acoluna baseado no evento.
            var id_coluna = e.target.id;
            var id_linha = e.target.parentElement.id;

            /// :: Converte para x e y.
            x = id_coluna.replace("coluna-", "");
            y = id_linha.replace("linha-", "");

            /// :: Verifica o turno.
            if (Game.CurrentTurn === 'player') {

                /// :: Pega somente os cliques validos.
                if (x !== "mapa" && y !== "mapa" && x !== "player" && e.target.className !== "div-casa active") {

                    /// :: verifica o x.
                    if (x === 'gold') {

                        /// :: Pega a linha e acoluna baseado no evento.
                        var id_coluna = e.target.parentElement.id;
                        var id_linha = e.target.parentElement.parentElement.id;

                        /// :: Converte para x e y.
                        x = id_coluna.replace("coluna-", "");
                        y = id_linha.replace("linha-", "");
                    }

                    /// :: Posição do player.
                    var player_x = 0;
                    var player_y = 0;

                    /// :: Pega a posição do player.
                    /// :: Percorre todas as linhas.
                    Game.Mapa.forEach((linhas, yy) => {

                        /// :: Percorre todas as colunas.
                        linhas.forEach((value, xx) => {

                            /// :: Se encontrou o player.
                            if (value === 'P') {
                                player_x = xx;
                                player_y = yy;
                            }

                        })
                    })

                    /// Total de movimento.
                    var totalMovimento = 0;

                    /// :: Pega a quantidade de movimento, baseado no deslocamento do x.
                    if (x > player_x) {
                        totalMovimento = totalMovimento + x - player_x;
                    }
                    else {
                        totalMovimento = totalMovimento + player_x - x;
                    }

                    /// :: Pega a quantidade de movimento, baseado no deslocamento do y.
                    if (y > player_y) {
                        totalMovimento = totalMovimento + y - player_y;
                    }
                    else {
                        totalMovimento = totalMovimento + player_y - y;
                    }

                    /// :: Verifica se o movimento não é maior que 1.
                    if (totalMovimento === 1) {

                        /// :: Verifica a quantidade de turnos que o jogador tem.
                        if (Game.RollRemainP1 > 1) {

                            /// :: Move o personagem.
                            Game.Move('P', x, y);
                            Game.RollRemainP1--;

                            /// :: Verifica se o jogador ganhou.
                            if (!Game.FindPlayer('G')) {
                                Game.CurrentTurn = 'win';
                                setTimeout(function () {
                                    alert('Você Ganhou!');
                                }, 400);
                            }

                        }
                        else if (Game.RollRemainP1 === 1) {

                            /// :: Move o personagem.
                            Game.Move('P', x, y);

                            /// :: Desconta um turno.
                            Game.RollRemainP1--;

                            /// :: Atualiza o turno.
                            Game.CurrentTurn = 'enemy-roll';

                            /// :: Verifica se o jogador ganhou.
                            if (!Game.FindPlayer('G')) {
                                Game.CurrentTurn = 'win';
                                setTimeout(function () {
                                    alert('Você Ganhou!');
                                }, 400);
                            }
                            else {

                                /// :: Termina o turno.
                                setTimeout(function () {
                                    alert("Acabou o Seu Turno");
                                    $("#mapa").click();
                                }, 400);

                            }

                        } else {
                            alert("Espere Sua Vez");
                        }
                    }

                }

            }
            else if (Game.CurrentTurn === 'player-roll') {

                /// :: Verifica se o jogador rolou o dado.
                if (Game.RollRemainP1 === 0) {
                    alert('Role o Dado!')
                }

            }
            else if (Game.CurrentTurn === 'enemy-roll') {

                /// :: Cpu rola o dado.
                Game.RollRemainCPU = Game.Roll() + 1;

                /// :: Atualiza o turno.
                Game.CurrentTurn = 'enemy';

                /// :: Pega a rota até o jogador, caça o jogador!
                Game.EnemyRout = Game.Hunt();

                /// :: Clica no mapa, para dar continuidade ao jogo.
                $("#mapa").click();

            }
            else if (Game.CurrentTurn === 'enemy') {

                /// :: Espera um tempo para executar a jogada.
                setTimeout(function () {

                    /// :: Verifica a quantidade de turnos que o jogador tem.
                    if (Game.RollRemainCPU > 1) {

                        /// :: Pega o próximo movimento.
                        var currentRout = Game.EnemyRout[0];

                        /// :: Move o jogador.
                        Game.Move('E', currentRout[1], currentRout[0]);

                        /// :: Desconta um turno.
                        Game.RollRemainCPU--;

                        /// :: Verifica se o player está vivo.
                        if (Game.FindPlayer('P')) {

                            /// :: Remove a primeira posição da rota.
                            Game.EnemyRout.shift();

                            /// :: Clica no mapa, para dar continuidade ao jogo.
                            $("#mapa").click();

                        } else {
                            setTimeout(function () {
                                Game.CurrentTurn = 'lose';
                                alert("Você Perdeu!");
                            }, 400);
                        }

                    } else if (Game.RollRemainCPU === 1) {

                        /// :: Pega o próximo movimento.
                        var currentRout = Game.EnemyRout[0];

                        /// :: Move o inimigo.
                        Game.Move('E', currentRout[1], currentRout[0]);

                        /// :: Desconta um turno.
                        Game.RollRemainCPU--;

                        /// :: Verifica se o player está vivo.
                        if (Game.FindPlayer('P')) {

                            /// :: Remove a primeira posição da rota.
                            Game.EnemyRout.shift();

                            /// :: Clica no mapa, para dar continuidade ao jogo.
                            $("#mapa").click();

                            /// :: Atualiza o turno.
                            Game.CurrentTurn = 'player-roll';

                            /// :: Termina o turno.
                            setTimeout(function () {
                                alert('Turno do Jogador');
                            }, 500);

                        } else {
                            setTimeout(function () {
                                Game.CurrentTurn = 'lose';
                                alert("Você Perdeu!");
                            }, 400);
                        }

                    }

                }, 800);

            }
            else if (Game.CurrentTurn === 'win') {
                alert('Você Ganhou!');

            }
            else if (Game.CurrentTurn === 'lose') {
                alert("Você Perdeu!");
            }
            else {
                alert('Erro Inesperado!');
            }

        });

        /// :: Quando dar uma rolada.
        $("#scene").click(function () {

            /// :: Verifica se é a vez do player rolar o dado.
            if (Game.CurrentTurn === 'player-roll') {

                /// :: Rola o dado.
                Game.RollRemainP1 = Game.Roll();

                /// :: Atualiza o turno.
                Game.CurrentTurn = 'player';
            }

        });

        /// :: Reseta o jogo.
        $("#game-reset").click(function () {
            Game.Reset();
        });

    },

    /// :: Renderiza a matriz.
    Render: function () {

        /// :: Limpa o mapa.
        $("#mapa").empty();

        /// :: Percorre todas as linhas.
        Game.Mapa.forEach((linhas, y) => {

            /// :: Cria uma div.
            $("#mapa").append("<div id=linha-" + y + ">");

            /// :: Percorre todas as colunas.
            linhas.forEach((value, x) => {

                /// :: Pega o id da linha e da coluna.
                var id_linha = "linha-" + y;
                var id_coluna = "coluna-" + x;

                /// :: Verifica o que deve ser renderizado.
                if (value === "P") {

                    /// :: Adiciona a casa.
                    $("#" + id_linha).append("<div id=" + id_coluna + " class='div-casa' ></div>");

                    /// :: Adiciona o player na casa.
                    $("#" + id_linha).find("#" + id_coluna).append("<img class='player' id='player' src='p1.gif' />");

                } else if (value === "E") {

                    /// :: Adiciona a casa.
                    $("#" + id_linha).append("<div id=" + id_coluna + " class='div-casa' ></div>");

                    /// :: Adiciona o inimigo na casa.
                    $("#" + id_linha).find("#" + id_coluna).append("<img class='player' id='player' src='enemy.gif' />");

                } else if (value === "G") {

                    /// :: Adiciona a casa.
                    $("#" + id_linha).append("<div id=" + id_coluna + " class='div-casa' ></div>");

                    /// :: Adiciona a chegada na casa.
                    $("#" + id_linha).find("#" + id_coluna).append("<img class='player' id='gold' src='goal.gif' />");

                } else if (value === 1) {

                    /// :: Adiciona bloco invalido.
                    $("#" + id_linha).append("<div id=" + id_coluna + " class='div-casa active'></div>");

                } else {

                    /// :: Adiciona bloco valido.
                    $("#" + id_linha).append("<div id=" + id_coluna + " class='div-casa'></div>");
                }

            });

        });

    },

    /// :: Com base no x e y vai movimentar o personagem.
    Move: function (personagem, x, y) {

        /// :: Percorre todas as linhas.
        Game.Mapa.forEach((linhas, yy) => {

            /// :: Percorre todas as colunas.
            linhas.forEach((value, xx) => {

                /// :: Se encontrou o player.
                if (value === personagem)
                    Game.Mapa[yy][xx] = 0;

            })
        })

        /// :: Coloca o pernonagem na posição no mapa.
        Game.Mapa[y][x] = personagem;

        /// :: Renderiza o mapa.
        Game.Render();
    },

    /// :: Procura o personagem.
    FindPlayer: function (player) {

        /// :: Flag de verificação.
        var flag = false;

        /// :: Percorre todas as linhas.
        Game.Mapa.forEach((linhas) => {

            /// :: Percorre todas as colunas.
            linhas.forEach((value) => {

                /// :: Se encontrou o player.
                if (value === player)
                    flag = true;

            })
        })

        return flag;
    },

    /// :: Procura o caminho até o jogador e vai em direção a ele.
    Hunt: function () {

        /// :: Base.
        var pos_jogador = [0, 0];
        var pos_inimigo = [0, 0];

        /// :: Percorre todas as linhas.
        Game.Mapa.forEach((linhas, yy) => {

            /// :: Percorre todas as colunas.
            linhas.forEach((value, xx) => {

                /// :: Se encontrou o player.
                if (value === 'P')
                    pos_jogador = [yy, xx];

                /// :: Se encontrou o inimigo.
                if (value === 'E')
                    pos_inimigo = [yy, xx];

            })
        })


        /// :: Pega algoritmo atual.
        var _algoritmo = $('#select').find(":selected").text();
        _algoritmo = _algoritmo.toLowerCase().replace(' ', '');

        /// :: Exibe o caminho a percorrer.
        console.log(pos_inimigo, pos_jogador);

        /// :: Executa os algoritmos.
        if (_algoritmo === 'amplitude') {
            var amplitude = Game.Algoritmos.Amplitude(pos_inimigo, pos_jogador);
            console.log("Amplitude...............: ", amplitude);
            return amplitude;
        }
        else if (_algoritmo === 'profundidade') {
            var profundidade = Game.Algoritmos.Profundidade(pos_inimigo, pos_jogador);
            console.log("Profundidade............: ", profundidade);
            return profundidade;
        }
        else if (_algoritmo === 'profundidadelimitada') {
            var profundidadelimitada = Game.Algoritmos.ProfundidadeLimitada(pos_inimigo, pos_jogador);
            console.log("Profundidade Limitada...: ", profundidadelimitada);
            return profundidadelimitada;
        }
        else if (_algoritmo === 'aprofundamentoiterativo') {
            var aprofundamentoiterativo = Game.Algoritmos.AprofundamentoIterativo(pos_inimigo, pos_jogador);
            console.log("Aprofundamento Iterativo: ", aprofundamentoiterativo);
            return aprofundamentoiterativo;
        }
        else if (_algoritmo === 'bidirecional') {
            var bidirecional = Game.Algoritmos.Bidirecional(pos_inimigo, pos_jogador);
            console.log("Bidirecional............: ", bidirecional);
            return bidirecional;
        }
        else if (_algoritmo === 'custouniforme') {
            var custouniforme = Game.Algoritmos.CustoUniforme(pos_inimigo, pos_jogador)[0];
            console.log("Custo Uniforme..........: ", custouniforme);
            return custouniforme;
        }
        else if (_algoritmo === 'greedy') {
            var greedy = Game.Algoritmos.Greedy(pos_inimigo, pos_jogador)[0];
            console.log("Greedy..................: ", greedy);
            return greedy;
        }
        else if (_algoritmo === 'estrela') {
            var estrela = Game.Algoritmos.Estrela(pos_inimigo, pos_jogador)[0];
            console.log("Estrela.................: ", estrela);
            return estrela;
        }
        else {
            var amplitude = Game.Algoritmos.Amplitude(pos_inimigo, pos_jogador);
            console.log("Amplitude...............: ", amplitude);
            return amplitude;
        }

    },

    /// :: Reinicia o jogo.
    Reset: function () {

        /// :: Pega BKP do mapa.
        Game.Mapa = JSON.parse(JSON.stringify(Game.MapaDefault));

        /// :: Reseta as informações do turno.
        Game.RollRemainP1 = 0;
        Game.RollRemainCPU = 0;
        Game.EnemyRout = [];
        Game.CurrentTurn = 'player-roll';

        /// :: Renderiza o mapa.
        Game.Render();

        setTimeout(function () {
            alert("Jogo Reiniciado");
        }, 500);

    },

    /// :: Funções para chamar os algoritmos da biblioteca.
    Algoritmos: {

        /// :: Cria uma solução.
        Solucao: new busca(),

        /// :: Atualiza o mapa.
        UpdateMap: function () {
            mapa = Game.Mapa;
        },

        /// :: Amplitude.
        Amplitude: function (origem, destino) {

            ///:: Atualiza o mapa.
            Game.Algoritmos.UpdateMap();
            return Game.Algoritmos.Solucao.amplitude(origem, destino);
        },

        /// :: Profundidade.
        Profundidade: function (origem, destino) {

            ///:: Atualiza o mapa.
            Game.Algoritmos.UpdateMap();
            return Game.Algoritmos.Solucao.profundidade(origem, destino);
        },

        /// :: Profundidade Limitada.
        ProfundidadeLimitada: function (origem, destino) {

            ///:: Atualiza o mapa.
            Game.Algoritmos.UpdateMap();
            return Game.Algoritmos.Solucao.profundidade_limitada(origem, destino, 15);
        },

        /// :: Aprofundamento Iterativo.
        AprofundamentoIterativo: function (origem, destino) {

            ///:: Atualiza o mapa.
            Game.Algoritmos.UpdateMap();
            return Game.Algoritmos.Solucao.aprofundamento_iterativo(origem, destino);
        },

        /// :: Bidirecional.
        Bidirecional: function (origem, destino) {

            ///:: Atualiza o mapa.
            Game.Algoritmos.UpdateMap();
            return Game.Algoritmos.Solucao.bidirecional(origem, destino);
        },

        /// :: Custo Uniforme.
        CustoUniforme: function (origem, destino) {

            ///:: Atualiza o mapa.
            Game.Algoritmos.UpdateMap();
            return Game.Algoritmos.Solucao.custo_uniforme(origem, destino);
        },

        /// :: Greedy.
        Greedy: function (origem, destino) {

            ///:: Atualiza o mapa.
            Game.Algoritmos.UpdateMap();
            return Game.Algoritmos.Solucao.greedy(origem, destino);
        },

        /// :: Estrela.
        Estrela: function (origem, destino) {

            ///:: Atualiza o mapa.
            Game.Algoritmos.UpdateMap();
            return Game.Algoritmos.Solucao.a_estrela(origem, destino);
        },
    }
}

/// :: Inicia o jogo.
Game.Init();