/*

L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

*/

const playBtn = document.querySelector('.play')
const grid = document.querySelector('.grid')
const message = document.querySelector('.message')

playBtn.addEventListener('click', () => {

    const userChoice = document.getElementById('choose').value;
    grid.innerHTML = '';

    let cells = 0;

    switch (userChoice) {
        case 'easy' :
            cells = 100;
            break;
        case 'medium' :
            cells = 81;
            break;
        case 'hard' :
            cells = 49;
    }

    const bombList = genBombs(16, cells);
    console.log(bombList);

    const attempts = [];
    let maxAttempts = cells - bombList.length;
    console.log('tentativi massimi:', maxAttempts);

    for (let i = 1; i <= cells; i++) {
        const square = genSquare();
        switch (cells) {
            case 100 :
                square.classList.add('easy');
                break;
            case 81 :
                square.classList.add('medium');
                break;
            case 49 :
                square.classList.add('hard');
        }

        let span = document.createElement('span');
        span.append(i);
        square.append(span);

        grid.append(square);
        

        

        

        square.addEventListener('click', function() {

            if (bombList.includes(i)) {
                square.classList.add('bomb')
                message.innerHTML = `Hai perso, hai fatto ${attempts.length} tentativi!`
            } else {
                square.classList.add('safe');
                if (!attempts.includes(i)) {
                    attempts.push(i);
                    maxAttempts -= 1;
                    message.innerHTML = `Hai ancora ${maxAttempts} tentativi a disposizione`
                }
            }
            console.log(maxAttempts);

            
            if (attempts.length === (cells - bombList.length)) {
                message.innerHTML = `Hai vinto!`
            }
        })
    }

})












/* FUNCTIONS */



function genSquare () {
    const node = document.createElement('div');
    node.classList.add('square');
    return node;
}

function genBombs (bombsNum, cellsNum) {
    const bombs = [];
    while (bombs.length < bombsNum) {
        const bomb = genRandomNumber(1, cellsNum);
        
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    return bombs;
}

function genRandomNumber (min, max) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand;
}