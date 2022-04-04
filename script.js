// What the code should do

/*

addEventListener that fires when page is fully loaded and then execute:
    create div with class "square"
    append it 256 (16*16) times to the #container div.

addEventListener when mouseover grid-squares:
    change color to black

*/
const grid = document.querySelector('#grid');

addEventListener('DOMContentLoaded', function() {
    
    for (let i = 0; i < (16) ** 2; i++) {
        const div = document.createElement('div');
        div.classList.add(`square-${i+1}`);
        grid.appendChild(div);
    }

});

