import Scene from "../../core/Scene.js";
import AssetLoader, { FileType } from "../../core/AssetLoader.js";
import LoadingScene from "./LoadingScene.js";

export default class BootScene extends Scene
{
    constructor(engine)
    {
        super(engine);

        //Create an asset loader and load all textures we will need for the loading scene
        this.loader = new AssetLoader(this);
        this.loader.load("splashBackground", "./assets/images/breakout-splash-background.png", FileType.TEXTURE);
        this.loader.load("loadingBarBackground", "./assets/images/breakout-loading-bar-background.png", FileType.TEXTURE);
        this.loader.load("loadingBarFill", "./assets/images/breakout-loading-bar-fill.png", FileType.TEXTURE);
    }

    update(delta)
    {
        super.update(delta);
        
        //Once all assets are loaded
        if(this.loader.assetsLoaded == this.loader.totalAssets)
        {
            //Remove this scene
            this.engine.scenes.remove(this);
            //Add our new loading scene
            this.engine.scenes.add(new LoadingScene(this.engine));
        }
    }
}