/* Obtemos a classe CSS do bichinho */
const bichinhoEscolha = this.document.querySelector('.bichinhoEscolha');
const arbusto = this.document.querySelector('.arbusto');
const boardJogo = this.document.querySelector('.board-jogo');

const iniciarJogo = this.document.getElementById('iniciarJogo');

boardJogo.style.visibility = 'hidden';
arbusto.style.visibility = 'hidden';
arbusto.style.animationPlayState = "paused";

iniciarJogo.onclick = function() {
    boardJogo.style.visibility = 'visible';
    arbusto.style.visibility = 'visible';
    arbusto.style.animationPlayState = "running";
    
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
        const posBichinho = +window.getComputedStyle(bichinhoEscolha).bottom.replace('px','');

        if ((posArbusto <= 90) && (posArbusto > 0) && (posBichinho < 100)){
            /* Quando o arbusto alcançar a posição definida do bichinho, iremos parar o jogo, primeiramente parando a animação do arbusto */
            arbusto.style.animation = 'none';
            arbusto.style.left = `${posArbusto}px`;

            bichinhoEscolha.style.animation = 'none';
            bichinhoEscolha.style.bottom = `${posBichinho}px`;

            clearInterval(loop);
        }
    }, 10);

    document.addEventListener("keypress", pular);
}

