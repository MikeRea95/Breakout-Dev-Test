
import AssetManager from "./AssetManager.js";
import CanvasRenderer from "./CanvasRenderer.js";
import SceneManager from "./SceneManager.js";
import TimeManager from "./TimeManager.js";
import InputManager from "./input/InputManager.js";

export default class Engine
{
    /**
     * @constructs Engine The core renderer that handles rendering all assets to the HTML5 canvas.
     * @param {Number} width The width of the game.
     * @param {Number} height The height of the game.
     * @param {Number} frameRate The frame rate the game runs at.
     */
    constructor(width, height, frameRate)
    {
        /** 
         * The Canvas renderer that handles all rendering within the engine.
         * @public
         * @type {CanvasRenderer} 
         * @member Engine#renderer
         */
        this.renderer = new CanvasRenderer(this, width, height);
        /** 
         * The Scene Manager which handles all active scenes. Only scenes added to this manager will be updated and rendered.
         * @public
         * @type {SceneManager} 
         * @member Engine#scenes
         */
        this.scenes = new SceneManager(this);
        /** 
         * The Time Manager which manages the speed of the engines loop.
         * @public
         * @type {TimeManager} 
         * @member Engine#time
         */
        this.time = new TimeManager(this, frameRate);
        /** 
         * The Asset Manager which stores all loaded assets.
         * @public
         * @type {AssetManager} 
         * @member Engine#assets
         */
        this.assets = new AssetManager(this);
        /** 
         * The Input Manager which handles all input detection and dispatching.
         * @public
         * @type {InputManager} 
         * @member Engine#input
         */
        this.input = new InputManager(this);
    }

    /**
     * Called by the Time Manager. This loop runs at the specified frame rate. Each loop is one update() call which updates all scenes, entities, and components, and one render call which then draws all scenes, entities, and components to the canvas.
     * @instance
     * @private
     * @memberof Engine
     */
    loop()
    {
        this.update(this.time.deltaTime);
        this.render();
    }

    /**
     * Updates all all scenes, entities, and components.
     * @instance
     * @private
     * @memberof Engine
     */
    update(delta)
    {
        this.scenes.update(delta);
    }

    /**
     * Renders all all scenes, entities, and components.
     * @instance
     * @private
     * @memberof Engine
     */
    render()
    {
        this.renderer.clear();
        this.scenes.render(this.renderer.context);
    }
}