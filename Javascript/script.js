/* Botões em HTML */
const iniciarJogo = this.document.getElementById('iniciarJogo');
const reiniciarJogo = this.document.getElementById('reiniciarJogo');
const sairJogo = this.document.getElementById('sairJogo');

/* Informações em HTML */
const pontuacao = this.document.getElementById("pontuacao");
const emailField = this.document.getElementById("email");
const validationButton = this.document.getElementById("validacaoEmail");
const selecaoBichinho = this.document.getElementById("selecionarBichinho");
const selecaoDificuldade = this.document.getElementById("selecionarDificuldade");

/* Classes em CSS */
const pontuacaoGeral = this.document.getElementById("pontuacaoGeral");
const boardJogo = this.document.querySelector('.board-jogo');
const arbusto = this.document.querySelector('.arbusto');
const bichinhoEscolha = this.document.querySelector('.bichinhoEscolha');

/* Velocidades do arbusto conforme o nível */
const velocidadesLista = ["1.8s", "1.4s", "1.0s"];
var valorDificuldade = "";

/* Pontos obtidos na partida */
var pontosPartida = 0;

/* Salvamos a imagem do bichinho, sendo ela inicialmente vazia até que o jogo comece */
/* Isso é feito para obtermos a mesma imagem na hora de reiniciarmos o jogo caso não façamos mudanças */
var imagemBichinho = "";

/* Escondemos todos os objetos do jogo até que o e-mail seja validado */
boardJogo.style.visibility = 'hidden';
arbusto.style.visibility = 'hidden';
arbusto.style.animationPlayState = "paused";

selecaoBichinho.style.display = "none";
selecaoDificuldade.style.display = "none";
iniciarJogo.style.display = "none";
reiniciarJogo.style.display = "none";
sairJogo.style.display = "none";
pontuacaoGeral.style.display = "none";

/* Funções relacionadas aos botões em HTML */
validationButton.onclick = validarEmail;
iniciarJogo.onclick = iniciarJogoFunc;
reiniciarJogo.onclick = reiniciarJogoFunc;
sairJogo.onclick = sairJogoFunc;

/* Função de validação do e-mail */
function validarEmail() {
    /* Informações em HTML sobre o e-mail */
    var mensagemInvalido = document.getElementById("emailInvalido");
    var mensagemVazio = document.getElementById("emailVazio");

    /* Código RegEx para o e-mail */
    var regex = /^\\[bcdfghjklmnpqrstvwxysz]+[\[]([bcdfghjklmnpqrstvwxysz]+[\|][bcdfghjklmnpqrstvwxysz]+)(([|][bcdfghjklmnpqrstvwxysz]+)*)\]$/g;

    /* Caso o valor inserido do e-mail for vazio o jogador será bloqueado de seguir em frente */
    if (emailField.value == "") {
        mensagemVazio.style.display = "block";
        mensagemInvalido.style.display = "none";
    }
    else {
        mensagemVazio.style.display = "none";

        /* Caso contrário, conferimos se o e-mail é válido ou não */
        if (regex.test(emailField.value)) {
            mensagemInvalido.style.display = "none";
            selecaoBichinho.style.display = "";
            selecaoDificuldade.style.display = "inline-block";
            iniciarJogo.style.display = "";
        } else {
            mensagemInvalido.style.display = "block";
            selecaoBichinho.style.display = "none";
            iniciarJogo.style.display = "none";
            selecaoDificuldade.style.display = "none";
        }
    }
}

/* Função de iniciar o jogo */
function iniciarJogoFunc() {
    /* Disponibilizando os objetos do jogo na página */
    boardJogo.style.visibility = 'visible';
    arbusto.style.visibility = 'visible';
    arbusto.style.animationPlayState = "running";
    pontuacaoGeral.style.display = "block";

    /* Obtendo os valores da imagem do bichinho e dificuldade */
    imagemBichinho = selecaoBichinho.value;
    valorDificuldade = selecaoDificuldade.value;

    /* Obtendo o nível da dificuldade */
    if (valorDificuldade == "1") {
        arbusto.style.animationDuration = velocidadesLista[0];
    } else if (valorDificuldade == "2") {
        arbusto.style.animationDuration = velocidadesLista[1];
    } else {
        arbusto.style.animationDuration = velocidadesLista[2];
    }

    /* Descrição da função do pulo do bichinho */
    const pular = () => {
        bichinhoEscolha.classList.add('pular');

        /* Para que seja possível com que a imagem pule novamente, é necessário realizar a execução de "pular" e removê-la para que seja possível adicioná-la novamente à cada "clique" no teclado */
        setTimeout(() => {
            bichinhoEscolha.classList.remove("pular");
        }, 500);
    }

    /* Para que seja possível verificarmos durante toda a partida se houve colisão do arbusto com o bichinho, precisamos de um loop que fique rodando durante o jogo */
    const loop = setInterval(() => {
        /* Para que seja possível obtermos a posição à esquerda da área do jogo onde o arbusto está localizado, utilizamos o "offsetLeft" */

        /* O loop só deve continuar caso o bichinho tenha pulado e não tenha tido colisão com o arbusto, logo, obteremos a posição do bichinho também */
        const posArbusto = arbusto.offsetLeft;
        const posBichinhoBottom = +window.getComputedStyle(bichinhoEscolha).bottom.replace('px', '');
        const posBichinhoLeft = +window.getComputedStyle(bichinhoEscolha).left.replace('px', '');
        const lenArbusto = +arbusto.style.width.replace('px', '');

        if ((posArbusto <= 90) && (posArbusto > 0) && (posBichinhoBottom < 100)) {
            /* Quando o arbusto alcançar a posição definida do bichinho, iremos parar o jogo, primeiramente parando a animação do arbusto */
            /* Em seguida, reiniciamos as informações das classes de CSS ou as pausamos */
            arbusto.style.animation = 'none';
            arbusto.style.left = `${posArbusto}px`;

            bichinhoEscolha.style.animation = 'none';
            bichinhoEscolha.style.bottom = `${posBichinhoBottom}px`;
            bichinhoEscolha.src = "Imagens/fire-84.webp";

            /* Retirando o botão de iniciar jogo e exibindo os de reiniciar e sair do jogo */
            iniciarJogo.style.display = "none";
            reiniciarJogo.style.display = "inline-flex";
            sairJogo.style.display = "inline-flex";

            /* Acabando com o loop */
            clearInterval(loop);
        } else {
            /* Caso não ocorra colisão, somente os pontos são atualizados */
            if (posBichinhoLeft >= posArbusto + lenArbusto && posBichinhoBottom >= 100) {
                pontosPartida += 1;
                pontuacao.innerText = pontosPartida;
            }
        }
    }, 10);

    /* Identificação da ação do pulo do bichinho */
    document.addEventListener("keypress", pular);
}

/* Função de reiniciar o jogo */
function reiniciarJogoFunc() {
    /* Reiniciando os pontos da partida */
    pontosPartida = 0;
    pontuacao.innerText = pontosPartida;

    /* Escondendo os botões do HTML */
    iniciarJogo.style.display = "none";
    emailField.style.display = "none";
    validationButton.style.display = "none";

    /* Caso o jogador decida mudar o bichinho, o caminho da sua imagem irá mudar */
    imagemNovo = document.getElementById("selecionarBichinho").value;
    if (imagemNovo != imagemBichinho) {
        imagemBichinho = imagemNovo;
    }
    bichinhoEscolha.src = imagemBichinho;

    /* Limpando os atributos do arbusto e do bichinho */
    arbusto.attributeStyleMap.clear();
    bichinhoEscolha.attributeStyleMap.clear();

    /* Iniciando novamente o jogo */
    iniciarJogoFunc();
}

/* Função de sair do jogo */
function sairJogoFunc() {
    /* Recarrega a URL atual, assim como o F5 */
    location.reload();
}