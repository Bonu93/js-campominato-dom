/*

L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range (vedi immagine allegata):
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

*/

const playBtn = document.querySelector('.play')
const grid = document.querySelector('.grid')

playBtn.addEventListener('click', () => {

    const userChoice = document.getElementById('choose').value;
    grid.innerHTML = '';
    console.log(grid);
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

        square.addEventListener('click', () => square.classList.add('active'))
    }

})












/* FUNCTIONS */

function genSquare () {
    const node = document.createElement('div');
    node.classList.add('square');
    return node;
}