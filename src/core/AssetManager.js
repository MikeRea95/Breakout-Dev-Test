import Engine from "./Engine.js";

export default class AssetManager
{
    /**
     * Stores maps of all assets that have been loaded into the game.
     * @constructs AssetManager
     * @param {Engine} engine The engine this Asset Manager is associated with.
     */
    constructor(engine)
    {
        /** 
         * The engine this Asset Manager is associated with.
         * @private
         * @type {Engine} 
         * @member AssetManager#engine
         */
        this.engine = engine;
        /** 
         * A map of all textures loaded in the game. A texture can be retrieved via it's key. Ex. this.textures['myTextureKey'].
         * @public
         * @type {Map} 
         * @member AssetManager#textures
         */
        this.textures = new Map();
    }
}