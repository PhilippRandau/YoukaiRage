let canvas;
let world;
let keyboard = new Keyboard();
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
}

// document.onkeydown = checkKey;
window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 32:
        case 87:
        case 38:
            // console.log('W / Arrow UP / Space / Jump');
            keyboard.UP = true;
            break;
        case 65:
        case 37:
            // console.log('A / Arrow Left');
            keyboard.LEFT = true;
            break;
        case 83:
        case 40:
            // console.log('S / Arrow Down');
            keyboard.DOWN = true;
            break;
        case 68:
        case 39:
            // console.log('D / Arrow Right');
            keyboard.RIGHT = true;
            break;
        case 69:
            // console.log('Throw/Shoot');
            keyboard.THROW = true;
            break;
        default:
            break;
    }

});

// document.onkeyup = checkKey;
window.addEventListener("keyup", (e) => {
    // e = e || window.event;
    switch (e.keyCode) {
        case 32:
        case 87:
        case 38:
            // console.log('W / Arrow UP / Space / Jump');
            keyboard.UP = false;
            break;
        case 65:
        case 37:
            // console.log('A / Arrow Left');
            keyboard.LEFT = false;
            break;
        case 83:
        case 40:
            // console.log('S / Arrow Down');
            keyboard.DOWN = false;
            break;
        case 68:
        case 39:
            // console.log('D / Arrow Right');
            keyboard.RIGHT = false;
            break;
        case 69:
            // console.log('Throw/Shoot');
            keyboard.THROW = false;
            break;
        default:
            break;
    }

});