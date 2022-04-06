// reset-btn branch
// Build 16x16 grid by default, then when reset button is pressed
// have the user choose new grid size and then build it.
const grid = document.getElementById('grid');
const clearBtn = document.getElementById('clear');
const changeBtn = document.getElementById('change');

document.addEventListener('DOMContentLoaded', function () {
    buildGrid(16);
}); 

clearBtn.addEventListener('click', clearGrid);

changeBtn.addEventListener('click', function() {
    const newSize = (prompt("Enter new grid size (1-100):"));
    if (!newSize) alert('Canceled resizing');
    else {
        const n = parseInt(newSize);
        //only characters allowed:0-9 & . & , & - (minus)
        if ( /^[0-9.,-]+$/.test(n)) {
            clearGrid();
            removeSquares(grid);
            switch(true) {
              case (n>=100):
                alert('Maximum grid size: 100x100');
                buildGrid(100);
                break;
              case (n>0 && n<100):
                buildGrid(n);
                break;
              default:
                alert('Minimum grid size: 1x1');
                buildGrid(1);
            }
            
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
        div.classList.add(`square-${i+1}`);
        grid.appendChild(div);
    }
}
function clearGrid() {
    const squares = document.querySelectorAll('#grid > div');
        squares.forEach(square => {  
            square.classList.remove('filled');   
        });   
}

function draw() {
    
    const eventList = ['mouseenter', 'mouseleave'];
    
    for (entry of eventList) {
        const squares = document.querySelectorAll('#grid > div');
        squares.forEach(square => {
            square.addEventListener(entry, function() { 
                square.classList.add('filled');
            });  
        });   
    }
    
}
function stopDraw() {
    
    const eventList = ['mouseenter', 'mouseleave'];
    
    for (entry of eventList) {
        const squares = document.querySelectorAll('#grid > div');
        squares.forEach(square => {
            square.removeEventListener(entry, function() {
                square.classList.add('filled');
            });  
        });   
    }
    
}


grid.addEventListener('mousedown', draw);
grid.addEventListener('mouseup', stopDraw);
grid.addEventListener('mouseout', stopDraw);