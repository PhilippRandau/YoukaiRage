let canvas;
let world;
let keyboard = new Keyboard();
let audio = false;
let button_Sound = new Audio('audio/light-switch-turn-on-sound-47350.mp3');
let fullscreen;
let fullscreenIsOn = false;


/**
 * Initializes the game.
 */
function init() {
    mobileInteractions();

    canvas = document.getElementById('canvas');
    fullscreen = document.getElementById('fullscreen');

    
}


/**
 * Starts playing the game.
 */
function play() {
    generateNewWorld();
    buttonSoundPlay();
}


/**
 * Generates a new world, hides the intro screen and menu, and shows the fullscreen element.
 */
function generateNewWorld() {
    world = new World(canvas, keyboard);
    document.getElementById('introScreen').classList.add('d-none');
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('fullscreen').classList.remove('d-none');
}


/**
 * Reloads the game world.
 */
function reloadWorld() {
    world.gameStarted = false;
    world.reset();
    document.getElementById('introScreen').classList.remove('d-none');
    document.getElementById('outroScreen').classList.add('d-none');
    document.getElementById('menu').classList.remove('d-none');
}


/**
 * Toggles the game sound.
 */
function toggleSound() {
    audio = !audio;
    if (audio) {
        document.getElementById('toggleSoundImg').src = 'img/09_GUI/volume-up-4-32.png';
        buttonSoundPlay();
    } else {
        document.getElementById('toggleSoundImg').src = 'img/09_GUI/mute-3-32.png';
    }
}


/**
 * Toggles fullscreen mode.
 */
function toggleFullscreen() {
    fullscreenIsOn = !fullscreenIsOn;
    if (fullscreenIsOn) {
        requestFullscreen(fullscreen);
        fullscreen.classList.add('fullscreen');
    } else {
        exitFullscreen();
        fullscreen.classList.remove('fullscreen');
    }
}


/**
 * Handles the orientation change event.
 */
function handleOrientationChange() {
    let orientation = window.orientation;

    if (screenSizeIsMobile()) {
        if (orientation === 0) {
            document.getElementById('rotateMobile').classList.remove('d-none');
        } else {
            document.getElementById('rotateMobile').classList.add('d-none');
        }
    }
}


/**
 * Checks if the screen size is considered as mobile.
 * @returns {boolean} True if the screen size is mobile, false otherwise.
 */
function screenSizeIsMobile() {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    return screenWidth < 720 || screenHeight < 480;
}


/**
 * Plays the sound for button click.
 */
function buttonSoundPlay() {
    if (audio) {
        button_Sound.currentTime = 0;
        button_Sound.play();
    }
}


/**
 * Hides the controls information.
 */
function hideControlsInfo() {
    document.getElementById('infoControls').classList.add('d-none');
    buttonSoundPlay();

}


/**
 * Requests fullscreen mode for the specified element.
 * @param {HTMLElement} element - The element to request fullscreen for.
 */
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}



/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
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



/**
 * Sets up mobile interactions.
 */
function mobileInteractions() {

    handleOrientationChange();

    window.addEventListener("orientationchange", handleOrientationChange);

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