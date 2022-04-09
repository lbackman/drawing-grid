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

// All buttons except clear grid and change grid
const buttons = document.querySelectorAll('.btn');
drawBtn.classList.add('clicked');

// Marks currently selected button if it has class 'btn'
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
    isGray = false;
    isErase = false;
})

randBtn.addEventListener('click', () => {
    isRandom = true;
    isGray = false;
    isErase = false;
});

grayBtn.addEventListener('click', () => {
    isRandom = false;
    isGray = true;
    isErase = false;
});

eraseBtn.addEventListener('click', () => {
    isRandom = false;
    isGray = false;
    isErase = true;
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

function toRGBArray(rgbStr) {
    return rgbStr.match(/\d+/g).map(Number);
}

function RGBToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
}

function enableDraw(e) {
    isMouseDown = true;

    if (e.target !== grid) {
        // I.e., if the target is a square
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
    switch(true) {

        case(isRandom):
        e.target.classList.remove('filled', 'gray');
        e.target.style.backgroundColor = 
          `rgb(${random()},${random()},${random()})`;
        break;

        case(isGray):
        e.target.classList.remove('filled');
        if (!e.target.classList.contains('gray')) {
            e.target.removeAttribute('style');
            e.target.classList.add('gray');
        } else {
            if ( !e.target.hasAttribute('style') ||
                  !e.target.style.backgroundColor ) {
                // Set background so its lightness can be decreased
                e.target.style.backgroundColor = 'hsl(0, 0%, 80%)';
            } else {
                // Decrease lightness 10 %-age points each pass
                const el = e.target.style;
                const arr = toRGBArray(el.backgroundColor);
                const hslArr = RGBToHSL(arr[0], arr[1], arr[2]);
                const lightness = hslArr[2]
                if (lightness >= 10) {
                    const newLigtness = lightness - 10;
                    el.backgroundColor = `hsl(0, 0%, ${newLigtness}%)`
                } else {
                    return;
                }
            }
        }
        break;

        case(isErase):
        e.target.classList.remove('filled', 'gray');
        e.target.removeAttribute('style');
        break;

        default: 
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