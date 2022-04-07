const grid = document.getElementById('grid');
let isMouseDown = false;
let isRandom = false;

buildGrid(16);

startDraw();

const clearBtn = document.getElementById('clear');
const changeBtn = document.getElementById('change');
const randBtn = document.getElementById('random');

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

randBtn.addEventListener('click', () => {
    if (randBtn.textContent === 'Random color') {
        isRandom = true;
        randBtn.textContent = 'Black';
    } else {
        isRandom = false;
        randBtn.textContent = 'Random color';
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
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {  
        square.classList.remove('filled', 'random');
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
        e.target.classList.remove('filled');
        e.target.style.backgroundColor = 
          `rgb(${random()},${random()},${random()})`;
        
    } else {
        e.target.removeAttribute('style');
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