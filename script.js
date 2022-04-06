const grid = document.getElementById('grid');
let isMouseDown = false;

buildGrid(16);

startDraw();

const clearBtn = document.getElementById('clear');
const changeBtn = document.getElementById('change');

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
    
    grid.style.gridTemplateColumns = `repeat(${m}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${m}, 1fr)`;
    for (let i = 0; i < (m) ** 2; i++) {
        const div = document.createElement('div');
        div.classList.add('square');
        grid.appendChild(div);
    }
}
function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {  
        square.classList.remove('filled');   
    });   
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

    e.target.classList.add('filled');
}

function startDraw () {
    grid.onmousedown = enableDraw;
    const squares = grid.getElementsByClassName('square');
    for (let i = 0, il = squares.length; i< il ;i++) {
        squares[i].onmouseenter = draw;
    }
    
    grid.onmouseup = disableDraw;
    grid.onmouseleave = disableDraw;
}