// reset-btn branch
// Build 16x16 grid by default, then when reset button is pressed
// have the user choose new grid size and then build it.
const grid = document.getElementById('grid');
const clearBtn = document.getElementById('clear');

document.addEventListener('DOMContentLoaded', function () {
    buildGrid(70);
}); 

clearBtn.addEventListener('click', clearGrid);

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