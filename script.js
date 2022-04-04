const grid = document.getElementById('grid');
let mouseDownId = -1;
document.addEventListener('DOMContentLoaded', function() {
    
    for (let i = 0; i < (50) ** 2; i++) {
        const div = document.createElement('div');
        div.classList.add(`square-${i+1}`);
        grid.appendChild(div);
        
    }
}); 


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
