const grid = document.getElementById('grid');
let isMouseDown = false;
let isRandom = false;
let isErase = false;
let isGray = false;

buildGrid(16);

startDraw();

const drawBtn = document.getElementById('draw');
const randBtn = document.getElementById('random');
const grayBtn = document.getElementById('gray');
const eraseBtn = document.getElementById('erase');
const clearBtn = document.getElementById('clear');
const changeBtn = document.getElementById('change');


const buttons = document.querySelectorAll('.btn');
drawBtn.classList.add('clicked');

for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener('click', function() {
        buttons.forEach(function(item) {
            item.classList.remove('clicked');
        });
        button.classList.add('clicked');
    });
}

drawBtn.addEventListener('click', () => {
    isRandom = false;
    isErase = false;
    isGray = false;
})

randBtn.addEventListener('click', () => {
    isRandom = true;
    isErase = false;
    isGray = false;
});

eraseBtn.addEventListener('click', () => {
    isErase = true;
    isRandom = false;
    isGray = false;
});

grayBtn.addEventListener('click', () => {
    isGray = true;
    isRandom = false;
    isErase = false;
});

clearBtn.addEventListener('click', clearGrid);

changeBtn.addEventListener('click', function() {
    const newSize = (prompt("Enter new grid size (1-100):"));
    if (!newSize) return;
    else {
        const n = parseInt(newSize);
        //only characters allowed:0-9 & . & , & - (minus)
        if ( /^[0-9.,-]+$/.test(n)) {
            clearGrid();
            removeSquares(grid);
            switch(true) {
              case (n>100):
                alert('Maximum grid size: 100x100');
                buildGrid(100);
                break;
              case (n>0 && n<=100):
                buildGrid(n);
                break;
              default:
                alert('Minimum grid size: 1x1');
                buildGrid(1);
            }
            startDraw();
            
        } else {
            alert('Give integer input')
        }
    }
});


function removeSquares(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function buildGrid(n) {
    const m = parseInt(n);
    //add the given amount of rows and columns
    grid.style.gridTemplateColumns = `repeat(${m}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${m}, 1fr)`;
    for (let i = 0; i < (m) ** 2; i++) {
        const div = document.createElement('div');
        div.classList.add('square');
        grid.appendChild(div);
    }
}
function clearGrid() {
    isRandom = false;
    isErase = false;
    isGray = false;
    buttons.forEach(function(item) {
        item.classList.remove('clicked');
    });
    drawBtn.classList.add('clicked');
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {  
        square.classList.remove('filled', 'gray');
        square.removeAttribute('style');
    });   
}

function random() {
    const n = 256 * Math.random();
    return Math.floor(n);
}

function enableDraw(e) {
    isMouseDown = true;

    if (e.target !== grid) {
        draw(e);
    }
}

function disableDraw() {
    isMouseDown = false;
}

function draw(e) {
    if (isMouseDown === false) {
        return;
    } 

    if (isRandom === true) {
        e.target.classList.remove('filled', 'gray');
        e.target.style.backgroundColor = 
          `rgb(${random()},${random()},${random()})`;
        
    } else if (isErase === true){
        e.target.classList.remove('filled', 'gray');
        e.target.removeAttribute('style');

    } else if (isGray === true) {
        e.target.classList.remove('filled');
        e.target.removeAttribute('style');
        e.target.classList.add('gray');
    } else {
        e.target.removeAttribute('style');
        e.target.classList.remove('gray');
        e.target.classList.add('filled');
    }
}

function startDraw () {
    grid.onmousedown = enableDraw;
    const squares = grid.getElementsByClassName('square');
    for (let i = 0, il = squares.length; i< il ;i++) {
        squares[i].onmouseenter = draw;
        // gray square is visible if not already on filled square
        squares[i].onmouseleave = draw;
    }
    
    grid.onmouseup = disableDraw;
    grid.onmouseleave = disableDraw;
}