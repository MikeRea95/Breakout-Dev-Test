import Engine from "./Engine.js";

export default class SceneManager
{
    /**
     * The Scene Manager handles all active scenes. Only scenes added to this manager will be updated and rendered.
     * @constructs SceneManager
     * @param {Engine} engine The engine the Scene Manager is apart of.
     */
    constructor(engine)
    {
        /** 
         * The engine the scene is apart of.
         * @private
         * @type {Engine} 
         * @member SceneManager#engine
         */
        this.engine = engine;
        /** 
         * An array of scenes that are currently added to the manager.
         * @private
         * @type {Array} 
         * @member SceneManager#scenes
         */
        this.scenes = [];
    }

    /**
     * Adds a scene to the manager. Once added, this scene will be updated and rendered every frame.
     * @instance
     * @memberof SceneManager
     * @param {Scene} scene 
     */
    add(scene)
    {
        if(this.scenes.indexOf(scene)==-1)
        {
            this.scenes.push(scene);
        }
    }

    /**
     * Destroys the scene passed in. The scene will then be removed from the manager within one frame of this being called.
     * @instance
     * @memberof SceneManager
     * @param {Scene} scene 
     */
    remove(scene)
    {
        scene.destroy();
    }

    /**
     * Updates all Scenes currently within the scene array of this manager.
     * @instance
     * @memberof SceneManager
     * @param {Number} delta 
     */
    update(delta)
    {
        for(let i=0; i<this.scenes.length; i++)
        {
            const scene = this.scenes[i];
            if(!scene.destroyed) scene.update(delta);
            if(scene.destroyed)
            {
                this.scenes.splice(i,1);
                i--;
            }
        }
    }

    /**
     * Renders all Scenes currently within the scene array of this manager.
     * @instance
     * @memberof SceneManager
     * @param {CanvasRenderingContext2D} context 
     */
    render(context)
    {
        this.scenes.forEach(scene => {
            if(!scene.destroyed) scene.render(context);
        });
    }
}