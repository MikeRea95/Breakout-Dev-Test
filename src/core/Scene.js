import Engine from "./Engine.js";
import InputManager from "./input/InputManager.js";

export default class Scene
{
    /**
     * A scene contains and manages a collection of entities. Each entity added to a scene is updated and rendered every frame.
     * @constructs Scene
     * @param {Engine} engine The engine the scene is apart of.
     */
    constructor(engine)
    {
        /** 
         * The engine the scene is apart of.
         * @public
         * @type {Engine} 
         * @member Scene#engine
         */
        this.engine = engine;
        /** 
         * The list of entities currently in the scene
         * @private
         * @type {Array} 
         * @member Scene#entities
         */
        this.entities = [];
        /** 
         * Destroyed is set to true when destroy() is called. This boolean is used to properly remove the scene from the associated scene manager's scene list
         * @public
         * @type {Boolean} 
         * @member Scene#destroyed
         */
        this.destroyed = false;
    }

    /** 
     * Shortcut for accessing the engines InputManager
     * @public
     * @return {InputManager} 
     * @member Scene#input
     */
    get input()
    {
        return this.engine.input;
    }

    /**
     * Every frame, each entitiy attached to this scene has their update() function called via this method.
     * @instance
     * @memberof Scene
     * @param {Number} delta 
     */
    update(delta)
    {
        for(let i=0; i<this.entities.length; i++)
        {
            const entity = this.entities[i];
            if(!entity.destroyed) entity.update(delta);
            if(entity.destroyed)
            {
                this.entities.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * Every frame, each entity attached to this scene has their render() function called via this method.
     * @instance
     * @memberof Scene
     * @param {CanvasRenderingContext2D} context 
     */
    render(context)
    {
        this.entities.forEach(entity => {
            if(!entity.destroyed) entity.render(context); 
        });
    }
    
    /**
     * This loops through each entity within the scene, destroying each one.
     * @instance
     * @memberof Scene
     */
    destroy()
    {
        this.destroyed = true;
        while(this.entities.length>0){
            const entity = this.entities.pop();
            entity.destroy();
        }
        this.entities = [];
    }
}