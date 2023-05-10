let canvas;
let world;
let keyboard = new Keyboard();
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
    mobileInteractions();
}

function toggleSound() {
    world.audio = !world.audio;
    if (world.audio) {
        document.getElementById('toggleSoundImg').src = 'img/09_GUI/volume-up-4-32.png';
    } else {
        document.getElementById('toggleSoundImg').src = 'img/09_GUI/mute-3-32.png';
    }
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

function mobileInteractions(){

    document.getElementById('moveLeft').addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.LEFT = true;

    });

    document.getElementById('moveLeft').addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.LEFT = false;

    });

    document.getElementById('moveRight').addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;

    });

    document.getElementById('moveRight').addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;

    });

    document.getElementById('moveJump').addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.UP = true;

    });

    document.getElementById('moveJump').addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.UP = false;

    });

    document.getElementById('shoot').addEventListener("touchstart", (event) => {
        event.preventDefault();
        keyboard.CHARGE = true;

    });

    document.getElementById('shoot').addEventListener("touchend", (event) => {
        event.preventDefault();
        keyboard.CHARGE = false;

    });
}