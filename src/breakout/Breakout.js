import Engine from "./../core/Engine.js"
import BootScene from "./scenes/BootScene.js";

export default class Breakout extends Engine
{
    constructor(width, height, frameRate)
    {
        super(width, height, frameRate);
        this.scenes.add(new BootScene(this));
    }
}