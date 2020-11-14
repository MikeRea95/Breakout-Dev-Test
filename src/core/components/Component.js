import Entity from "./../Entity.js";
import EventDispatcher from "../events/EventDispatcher.js";

export default class Component
{
    /**
     * Components are extensible classes that are meant to be highly configurable and re-usable within the engines entity component system. Components are added to entities and have an update() and render() function called every frame. Components should be used for managing logic and functionality throughout the game.
     * @constructs Component
     * @param {Entity} entity - The entity the component is attached to. This entity's transform such as position, rotation, and scale are used in common components such as Images.
     */
    constructor(entity)
    {
        this.entity = entity;
        this.entity.components.push(this);
        /** 
         * This is a basic event dispatcher. Event dispatchers can dispatch events that others can listen to. When an event is dispatched, each listener subscribed to the event have their associated callback invoked.
         * @public
         * @type {EventDispatcher} 
         * @member Component#events
         */
        this.events = new EventDispatcher();
        /** 
         * Destroyed is set to true when destroy() is called. This boolean is used to properly remove the component from the associated entity's component list
         * @public
         * @type {Boolean} 
         * @member Component#destroyed
         */
        this.destroyed = false;
    }

    /**
     * Every frame, each component has it's update function called by the entity it's attached to.
     * @instance
     * @memberof Component
     * @param {Number} delta 
     */
    update(delta)
    {
        
    }

    /**
     * Every frame, each component has it's render function called by the entity it's attached to.
     * @instance
     * @memberof Component
     * @param {CanvasRenderingContext2D} context 
     */
    render(context)
    {

    }

    /**
     * Marks the component as destroyed and performs any necessary cleanup.
     * @instance
     * @memberof Component
     */
    destroy()
    {
        this.destroyed = true;
        this.entity = null;
    }
}