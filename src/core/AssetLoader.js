import Scene from "./../core/Scene.js";

/**
 * The different file types that the AssetLoader and AssetManager can handle. Currently only textures are supported.
 * 
 * @class FileType
 */
export class FileType {
    /**
     * Returns "texture".
     * 
     * @return {String}
     */
    static get TEXTURE(){ return "texture"; };
}

export default class AssetLoader
{
    /**
     * Handles loading of assets for use within the game. When an asset is loaded it is mapped to a key within the AssetManager for later use.
     * @constructs AssetLoader
     * @param {Scene} scene The scene this loader is associated with
     */
    constructor(scene)
    {
        /** 
         * The scene this loader is associated with
         * @public
         * @type {Scene} 
         * @member AssetLoader#scene
         */
        this.scene = scene;
        
        /** 
         * The number of assets the loader has currently loaded.
         * @public
         * @type {Number} 
         * @member AssetLoader#assetsLoaded
         */
        this.assetsLoaded = 0;
        /** 
         * The total number of assets the loader has been requested to load.
         * @public
         * @type {Number} 
         * @member AssetLoader#totalAssets
         */
        this.totalAssets = 0;
        /** 
         * The maximum number of files the loader can concurrently load at one time. Most modern browsers can handle 10+ concurrent loads. For our purpose, we're defaulting to 1.
         * @public
         * @type {Number} 
         * @member AssetLoader#maxConcurrentRequests
         */
        this.maxConcurrentRequests = 1;
        /** 
         * The number of loads currently in progress.
         * @private
         * @type {Number} 
         * @member AssetLoader#currentLoads
         */
        this.currentLoads = 0;
        /** 
         * An array of load functions currently waiting to be called. This queue fills up when the loader tries to load more files at once than it can concurrently handle. As loads are completed, the queue is emptied.
         * @private
         * @type {Array} 
         * @member AssetLoader#loadQueue
         */
        this.loadQueue = [];
    }

    /**
     * Requests an asset to be loaded and stored within the AssetManager.
     * @instance
     * @memberof AssetLoader
     * @param {String} key The key the file will be stored under once loaded. This key can then be used to retrieve the file for use within the game.
     * @param {String} filepath The file location of the asset we want to load. Needs to include the files extension.
     * @param {FileType} type The type of file. Currently only FileType.TEXTURE is supported.
     */
    load(key, filepath, type)
    {
        this.totalAssets++;
        
        let loadFn = null;
        switch(type)
        {
            case FileType.TEXTURE:
                loadFn = this.loadTexture.bind(this, key, filepath);
                break;
            default:
                console.error("Unknown file type");
        }

        if(this.currentLoads<this.maxConcurrentRequests)
        {
            this.currentLoads++;
            loadFn();
        }
        else
        {
            this.loadQueue.push(loadFn);
        }
    }

    /**
     * Requests a texture to be loaded and stored within the AssetManager.
     * @instance
     * @private
     * @memberof AssetLoader
     * @param {String} key The key the file will be stored under once loaded. This key can then be used to retrieve the file for use within the game.
     * @param {String} filepath The file location of the asset we want to load. Needs to include the files extension.
     */
    loadTexture(key, filepath)
    {
        var image = new Image();
        image.crossOrigin = "anonymous";

        var request = new XMLHttpRequest();
        request.open('GET', filepath);
        request.responseType = 'blob';
        
        request.onload = function () {
            if (request.status === 200) {
                const url = window.URL.createObjectURL(request.response);
                image.src = url;
                this.scene.engine.assets.textures[key] = image;
                this.onAssetLoaded();
            } else {
                this.onAssetFailed('Image didn\'t load successfully; error code:' + request.statusText);
            }
        }.bind(this);
    
        request.onerror = function () {
            this.onAssetFailed('There was a network error.');
        }.bind(this);

        // Send the request
        request.send();
    }

    /**
     * Called when an asset fails to load. It will log the error to the console and proceed with loading additional assets.
     * @instance
     * @private
     * @memberof AssetLoader
     * @param {String} error The error that prevented the asset from loading
     */
    onAssetFailed(error)
    {
        console.error(error);
        this.onAssetLoaded();
    }

    /**
     * Called when an asset finishes loading. A 75ms delay has been added to each load completion for demo purposes.
     * @instance
     * @private
     * @memberof AssetLoader
     */
    onAssetLoaded()
    {
        //Add false delay for test
        setTimeout(function()
        {
            this.currentLoads--;
            this.assetsLoaded++;
            if(this.currentLoads<this.maxConcurrentRequests)
            {
                if(this.loadQueue.length>0)
                {
                    const loadFn = this.loadQueue.splice(0,1)[0];
                    loadFn();
                }     
            }
        }.bind(this), 75);
    }
}