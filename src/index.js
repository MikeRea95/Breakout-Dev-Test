import Breakout from './breakout/Breakout.js';

window.addEventListener('DOMContentLoaded', (event) => {
    const gameWidth = 1024;
    const gameHeight = 576;
    const frameRate = 60;
    window.engine = new Breakout(gameWidth, gameHeight, frameRate);
});

