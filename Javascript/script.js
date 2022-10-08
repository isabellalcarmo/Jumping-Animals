/* Obtemos a classe CSS do bichinho */
const emailField = document.getElementById("email");
const validationButton = document.getElementById("validate");
const selecaoBichinho = document.getElementById("selecionarBichinho");
const selecaoDificuldade = document.getElementById("selecionarDificuldade");

const velocidadesLista = ["1.8s", "1.4s", "1.0s"];
var valueDificuldade = "";

/*
console.log(myArray);
console.log(myArray[1].value);
console.log(selecaoDificuldade);
var velocidadeArbusto = 0;
*/

const bichinhoEscolha = this.document.querySelector('.bichinhoEscolha');
const arbusto = this.document.querySelector('.arbusto');
const boardJogo = this.document.querySelector('.board-jogo');

const iniciarJogo = this.document.getElementById('iniciarJogo');
const reiniciarJogo = this.document.getElementById('reiniciarJogo');
const sairJogo = this.document.getElementById('sairJogo');

const pontuacao = document.getElementById("pontuacao");
const pontuacaoGeral = document.getElementById("pontuacaoGeral");

var pontosPartida = 0;

/* Salvamos a imagem do bichinho, sendo ela inicialmente vazia até que o jogo comece. Isso é feito para obtermos a mesma imagem na hora de reiniciarmos o jogo caso não façamos mudanças */
var imagemBichinho = "";

boardJogo.style.visibility = 'hidden';
arbusto.style.visibility = 'hidden';
arbusto.style.animationPlayState = "paused";

selecaoBichinho.style.display = "none";
selecaoDificuldade.style.display = "none";

iniciarJogo.style.display = "none";
reiniciarJogo.style.display = "none";
sairJogo.style.display = "none";

pontuacaoGeral.style.display = "none";

validationButton.onclick = validateEmail;
iniciarJogo.onclick = startGame;
reiniciarJogo.onclick = restartGame;
sairJogo.onclick = exitGame;

function validateEmail() {
    const mensagemInvalido = document.getElementById("emailInvalido");
    const mensagemVazio = document.getElementById("emailVazio");
    const regex = /^\\[bcdfghjklmnpqrstvwxysz]+[\[]([bcdfghjklmnpqrstvwxysz]+[\|][bcdfghjklmnpqrstvwxysz]+)(([|][bcdfghjklmnpqrstvwxysz]+)*)\]$/g;

    if (emailField.value == "") {
        mensagemVazio.style.display = "block";
        mensagemInvalido.style.display = "none";
    }
    else {
        mensagemVazio.style.display = "none";
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

function startGame() {
    imagemBichinho = selecaoBichinho.value;

    boardJogo.style.visibility = 'visible';
    arbusto.style.visibility = 'visible';
    arbusto.style.animationPlayState = "running";
    pontuacaoGeral.style.display = "block";

    valueDificuldade = selecaoDificuldade.value;
    console.log(arbusto.style.animationDuration);

    if (valueDificuldade == "1") {
        arbusto.style.animationDuration = velocidadesLista[0];
    } else if (valueDificuldade == "2") {
        arbusto.style.animationDuration = velocidadesLista[1];
    } else {
        arbusto.style.animationDuration = velocidadesLista[2];
    }

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
            arbusto.style.animation = 'none';
            arbusto.style.left = `${posArbusto}px`;

            bichinhoEscolha.style.animation = 'none';
            bichinhoEscolha.style.bottom = `${posBichinhoBottom}px`;
            bichinhoEscolha.src = "Imagens/fire-84.webp";

            iniciarJogo.style.display = "none";
            reiniciarJogo.style.display = "inline-flex";
            sairJogo.style.display = "inline-flex";

            clearInterval(loop);
        } else {
            if (posBichinhoLeft >= posArbusto + lenArbusto && posBichinhoBottom >= 100) {
                pontosPartida += 1;
                pontuacao.innerText = pontosPartida;
            }
        }
    }, 10);

    document.addEventListener("keypress", pular);
}

function restartGame() {
    pontosPartida = 0;
    pontuacao.innerText = pontosPartida;

    iniciarJogo.style.display = "none";
    emailField.style.display = "none";
    validationButton.style.display = "none";

    imagemNovo = document.getElementById("selecionarBichinho").value;
    if (imagemNovo != imagemBichinho) {
        imagemBichinho = imagemNovo;
    }

    arbusto.attributeStyleMap.clear();
    bichinhoEscolha.attributeStyleMap.clear();
    bichinhoEscolha.src = imagemBichinho;

    startGame();
}

function exitGame() {
    location.reload();
}