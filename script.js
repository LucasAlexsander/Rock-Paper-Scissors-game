const btnRule = document.querySelector('.rules');
const body = document.querySelector('body');
const main = document.querySelector('main')
const guide = document.querySelector('.guide')
const btnCloseGuide = document.querySelector('.close');
const score = document.querySelector('#scoreValue');

// Abrir a regra
btnRule.onclick = function () {
    guide.classList.remove('disable')
    btnCloseGuide.onclick = function () {
        guide.classList.add('disable')
    }
}

// Funcionalidade do game
// Selecionando o seu elemento
const buttonsType = {
    rock: ['rock', 'images/icon-rock.svg'],
    paper: ['paper', 'images/icon-paper.svg'],
    scissors: ['scissors', 'images/icon-scissors.svg'],
}
const buttons = document.querySelectorAll('.btnGame');
const divGame = document.querySelector('.game');

const pickedFunction = (picked) => {

    // Inserindo dps da divGame
    divGame.insertAdjacentHTML("afterend",
        `
        <div class="picked">
            <div class="you-picked">
                <div id="btnYour" class="btnGame ${picked}">
                <img src="images/icon-${picked}.svg" alt="">
                </div>
                <h3>You Picked</h3>
            </div>

            <div class="result">
                <h3 id="result">You Win</h3>
                <button id="playAgain">Play Again</button>
            </div>

            <div class="pc-picked">
                <div id="btnPc" class="btnGame none">
                <img src="" alt="">
                </div>
                <h3>The Mouse Picked</h3>
            </div>
        </div>
        `)
}


const whoWin = (your, pc) => {
    // selecionar o elemento score pra manipular
    const result = document.querySelector('#result')

    // Empate
    if (your == pc) { return result.innerHTML = 'Draw'; }
    
    let win = false;
    // Regras
    const objWin = {
        'paper': { 'rock': 'win', 'scissors': 'lose' },
        'scissors': { 'rock': 'lose', 'paper': 'win' },
        'rock': { 'paper': 'lose', 'scissors': 'win' },
    }

    // Acessar as regras e alterar no score
    // Pegar o valor atual
    let intScore = parseInt(score.innerHTML)
    if (objWin[your][pc] == 'win') {
        intScore++;
        win = true;
    } else {
        intScore--;
    }
    // Jogar no HTML
    score.innerHTML = intScore;
    return result.innerHTML = objWin[your][pc];
}

buttons.forEach(btn => {
    btn.onclick = function () {
        let picked;
        picked = this.getAttribute('id');
        let pcPicked;
        divGame.classList.add('disable')
        // Chamar a função para mostrar qual vc selecionou
        pickedFunction(picked)
        // Pegando o botão do pc
        const btnPc = document.querySelector('#btnPc');

        // Chamar uma função para fazer o pc jogar
        let randomNumb = Math.floor(Math.random() * 3);
        Object.keys(buttonsType).forEach((item, index) => {
            if (index == randomNumb) {
                // Inserir no html
                // Removendo e adicionando classes
                btnPc.classList.remove('none')
                btnPc.classList.add(buttonsType[item][0])
                btnPc.setAttribute('data-type', buttonsType[item][0])
                btnPc.children[0].setAttribute('src', buttonsType[item][1])
                pcPicked = buttonsType[item][0]
            }
        });
        // Logica de quem ganhou
        // Pegar o que vc selecionou
        const btnYour = document.querySelector("#btnYour");

        let result = whoWin(picked, pcPicked);

        if (result == 'win') {
            btnYour.classList.add('win')
        } else if (result == 'lose') {
            btnPc.classList.add('win')
        }

        // Jogar novamente
        const divPicked = document.querySelector('.picked');
        const playAgain = document.querySelector('#playAgain');
        playAgain.onclick = function () {
            divGame.classList.remove('disable');
            // removendo divPicked
            main.removeChild(divPicked)

        }
    }
});

