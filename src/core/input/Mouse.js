import Vector2 from "../math/Vector2.js";
import EventDispatcher from "../events/EventDispatcher.js";
import InputManager from "./InputManager.js";

/**
 * The MouseEvent class contains string references for the different Javascript mouse events https://www.w3schools.com/jsref/obj_mouseevent.asp
 * 
 * @class MouseEvent
 */
export class MouseEvent
{
    /**
     * Returns "mouseDown"
     * 
     * @return {String}
     */
    static get MOUSE_DOWN(){ return "mouseDown"; }
    /**
     * Returns "mouseMove"
     * 
     * @return {String}
     */
    static get MOUSE_MOVE(){ return "mouseMove"; }
    /**
     * Returns "mouseUp"
     * 
     * @return {String}
     */
    static get MOUSE_UP() { return "mouseUp"; }
}

export default class Mouse
{
    /**
     * Handles listening and dispatching of mouse events.
     * @constructs Mouse
     * @param {InputManager} manager
     */
    constructor(manager)
    {
        /** 
         * The Input Manager this class is attached to.
         * @public
         * @type {InputManager} 
         * @member Mouse#manager
         */
        this.manager = manager;
        /** 
         * Is a mouse button down?
         * @public
         * @type {Boolean} 
         * @member Mouse#isDown
         */
        this.isDown = false;
        /** 
         * The current world position of the mouse, relative to the top left of the canvas
         * @public
         * @type {Vector2} 
         * @member Mouse#position
         */
        this.position = new Vector2(0, 0);
        /** 
         * The event dispatcher that will dispatch mouse events. Other classes that need to detect mouse events should subscribe to this dispatcher. Dispatches: MouseEvent.MOUSE_DOWN, MouseEvent.MOUSE_MOVE, MouseEvent.MOUSE_UP.
         * @public
         * @type {EventDispatcher} 
         * @member Mouse#events
         */
        this.events = new EventDispatcher();

        this.manager.engine.renderer.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.manager.engine.renderer.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.manager.engine.renderer.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.manager.engine.renderer.container.addEventListener("mouseup", this.onMouseUp.bind(this));
    }

    /**
     * Dispatches a MouseEvent.MOUSE_DOWN event
     * @instance
     * @memberof Mouse
     * @param {MouseEvent} event The Javascript mouse event
     */
    onMouseDown(event)
    {
        this.isDown = true;
        this.position.x = event.offsetX;
        this.position.y = event.offsetY;
        this.events.dispatchEvent(MouseEvent.MOUSE_DOWN, this.position.clone());
    }

    /**
     * Dispatches a MouseEvent.MOUSE_MOVE event
     * @instance
     * @memberof Mouse
     * @param {MouseEvent} event The Javascript mouse event
     */
    onMouseMove(event)
    {
        this.position.x = event.offsetX;
        this.position.y = event.offsetY;
        this.events.dispatchEvent(MouseEvent.MOUSE_MOVE, this.position.clone());
    }

    /**
     * Dispatches a MouseEvent.MOUSE_UP event
     * @instance
     * @memberof Mouse
     * @param {MouseEvent} event The Javascript mouse event
     */
    onMouseUp(event)
    {
        this.isDown = false;
        this.events.dispatchEvent(MouseEvent.MOUSE_UP, this.position.clone());
    }
}