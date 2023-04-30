let canvas;
let world;
let keyboard = new Keyboard();
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    console.log('My Enemie is', world.level.enemies[0]);
}



document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowUp":
        case "KeyW":
        case "Space":
            // console.log('W / Arrow UP / Space / Jump');
            keyboard.UP = true;
            break;
        case "KeyA":
        case "ArrowLeft":
            // console.log('A / Arrow Left');
            keyboard.LEFT = true;
            break;
        case "KeyS":
        case "ArrowDown":
            // console.log('S / Arrow Down');
            keyboard.DOWN = true;
            break;
        case "KeyD":
        case "ArrowRight":
            // console.log('D / Arrow Right');
            keyboard.RIGHT = true;
            break;
        case "KeyE":
            // console.log('Throw/Shoot');
            keyboard.CHARGE = true;
            break;
        default:
            break;
    }

});

document.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "ArrowUp":
        case "KeyW":
        case "Space":
            // console.log('W / Arrow UP / Space / Jump');
            keyboard.UP = false;
            break;
        case "KeyA":
        case "ArrowLeft":
            // console.log('A / Arrow Left');
            keyboard.LEFT = false;
            break;
        case "KeyS":
        case "ArrowDown":
            // console.log('S / Arrow Down');
            keyboard.DOWN = false;
            break;
        case "KeyD":
        case "ArrowRight":
            // console.log('D / Arrow Right');
            keyboard.RIGHT = false;
            break;
        case "KeyE":
            // console.log('Throw/Shoot');
            keyboard.CHARGE = false;
            break;
        default:
            break;
    }

});