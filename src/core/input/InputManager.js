import Engine from "../Engine.js";
import Mouse from "./Mouse.js";

export default class InputManager
{
    /**
     * The InputManager handles listening and dispatching of events related to input. Currently only mouse input is supported.
     * @constructs InputManager
     */
    constructor(engine)
    {
        /** 
         * The engine this Input Manager is associated with.
         * @public
         * @type {Engine} 
         * @member InputManager#engine
         */
        this.engine = engine;
        /** 
         * Instance of a Mouse class which handles listening and dispatching of mouse events.
         * @public
         * @type {Mouse} 
         * @member InputManager#mouse
         */
        this.mouse = new Mouse(this);
    }
}