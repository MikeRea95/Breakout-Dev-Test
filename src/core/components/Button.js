import Component from "./Component.js";
import Entity from "../Entity.js";
import Vector2 from "../math/Vector2.js";
import { MouseEvent } from "../input/Mouse.js";

export default class Button extends Component
{
    /**
     * @constructs Button
     * @param {Entity} entity The entity the button component will be attached to.
     * @param {Number} width The width of the button.
     * @param {Number} height The height of the button.
     * @param {Function} onClickCallback The function the button will call when clicked.
     * @param {any} onClickCallbackContext The context that will be bound to the function when called. Usually set to 'this'.
     */
    constructor(entity, width, height, onClickCallback, onClickCallbackContext=null)
    {
        super(entity);
        /** 
         * The function the button will call when clicked.
         * @public
         * @type {Function} 
         * @member Button#onClickCallback
         */
        this.onClickCallback = onClickCallback;
        /** 
         * The context that will be bound to the function when called. Usually set to 'this'.
         * @public
         * @type {any} 
         * @member Button#onClickCallback
         */
        this.onClickCallbackContext = onClickCallbackContext;
        /** 
         * The width of the button.
         * @public
         * @type {Number} 
         * @member Button#width
         */
        this.width = width;
        /** 
         * The height of the button.
         * @public
         * @type {Number} 
         * @member Button#height
         */
        this.height = height;
        /** 
         * The origin point of the button. This defaults to center, (0.5, 0.5), which matches the default origin of Images. 
         * @public
         * @type {Number} 
         * @member Button#origin
         */
        this.origin = new Vector2(0.5, 0.5);

        this.entity.scene.input.mouse.events.addEventListener(MouseEvent.MOUSE_DOWN, this.onMouseDown, this);
    }

    /**
     * Detects if a mouse down event happens within the bounds of this button. If detected, it fires off the onClickCallback. Note that buttons currently do not respect the rotation of entities.
     * @instance
     * @memberof Button
     * @param {Vector2} event The world position of the mouse down event. This position is relative to the top left of the canvas.
     */
    onMouseDown(event)
    {
        const position = this.entity.getPosition();
        const scale = this.entity.getScale();
        const rotation = this.entity.getRotation();

        const x0 = position.x - this.width*scale.x*this.origin.x;
        const x1 = position.x + this.width*scale.x*(1.0-this.origin.x);
        const y0 = position.y - this.height*scale.y*this.origin.y;
        const y1 = position.y + this.height*scale.y*(1.0-this.origin.y);
        if(event.x>=x0 && event.x<=x1 && event.y>=y0 && event.y<=y1)
        {
            if(this.onClickCallback != null)
            {
                this.onClickCallback.bind(this.onClickCallbackContext)();
            }
        }
    }

    /**
     * Cleans up input listeners the button is subscribed to.
     * @instance
     * @memberof Button
     * @param {Vector2} event 
     */
    destroy()
    {
        this.entity.scene.input.mouse.events.removeEventListener(MouseEvent.MOUSE_DOWN, this.onMouseDown, this);
    }
}