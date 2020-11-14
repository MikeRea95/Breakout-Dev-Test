import Breakout from './breakout/Breakout.js';

window.addEventListener('DOMContentLoaded', (event) => {
    const gameWidth = 1024;
    const gameHeight = 768;
    const frameRate = 30;
    window.engine = new Breakout(gameWidth, gameHeight, frameRate);
});

