import Engine from "./Engine.js";

export default class TimeManager
{
    /**
     * Handles management of frame rate and calling of core game engine loop.
     * @constructs TimeManager
     * @param {Engine} engine The engine the manager is associated with.
     * @param {Number} targetFps The desired FPS the game should run at.
     */
    constructor(engine, targetFps)
    {
        /** 
         * The engine the manager is associated with.
         * @private
         * @type {Engine} 
         * @member TimeManager#engine
         */
        this.engine = engine;
        /** 
         * The timestamp of our last step()
         * @private
         * @type {Number} 
         * @member TimeManager#lastStep
         */
        this.lastStep = null;
        /** 
         * The target frames per second we are running the engine loop() at.
         * @public
         * @type {Number} 
         * @member TimeManager#targetFps
         */
        this.targetFps = targetFps;
        /** 
         * The current delta time. Delta time is the time in milliseconds between last frame and the current frame.
         * @public
         * @type {Number} 
         * @member TimeManager#deltaTime
         */
        this.deltaTime = 1/this.targetFps;
        window.requestAnimationFrame((timestamp)=>this.step(timestamp));
    }

    /**
     * Step is callback for requestAnimationFrame. If enought time has elapsed, it will call the engine's loop function. 
     * @private
     * @memberof TimeManager
     * @param {number} timestamp 
     */
    step(timestamp)
    {
        if(this.lastStep!=null)
        {
            const elapsed = timestamp - this.lastStep;
            const secondsElapsed = elapsed/1000;
            if(secondsElapsed > 1/this.targetFps)
            {
                this.deltaTime = secondsElapsed;
                this.engine.loop();
                this.lastStep = timestamp;
            }
        }
        else
        {
            this.lastStep = timestamp;
        }
        window.requestAnimationFrame((timestamp)=>this.step(timestamp));
    }
}