const grid = document.getElementById('grid');
let isMouseDown = false;

for (let i = 0; i < (100) ** 2; i++) {
    const div = document.createElement('div');
    div.classList.add('square');
    grid.appendChild(div);
    
}

const squares = grid.getElementsByClassName('square');

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

    for (let i = 0, il = squares.length; i< il ;i++) {
        squares[i].onmouseenter = draw;
        
    }
    
    grid.onmouseup = disableDraw;
    grid.onmouseleave = disableDraw;
}
startDraw();