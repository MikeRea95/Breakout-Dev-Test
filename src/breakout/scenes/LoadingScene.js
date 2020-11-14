import AssetLoader, { FileType } from '../../core/AssetLoader.js';
import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import SplashScreen from './SplashScreen.js';

export default class LoadingScene extends Scene
{
    /**
     * 
     * @param {Engine} engine 
     */
    constructor(engine)
    {
        super(engine);
        this.engine = engine;

        this.loader = new AssetLoader(this);
        /*Load assets here*/

        const backgroundEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2);
        new Image(backgroundEntity, "splashBackground");

        const textEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 - 55);
        new TextField(textEntity, "Loading...", new TextFieldConfig("Arial", "16px", "#FFFFFF", TextAlign.CENTER));

        const loadingBarBackgroundEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 - 30);
        new Image(loadingBarBackgroundEntity, "loadingBarBackground");

        const loadingBarFillEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 - 30);
        new Image(loadingBarFillEntity, "loadingBarFill");
    }

    update(delta)
    {
        if(this.counter == null){
            this.counter = 0;
        }
        super.update(delta);

        this.counter++;
        console.log(this.counter);
        if(this.counter == 60){
            //Remove this scene
            this.engine.scenes.remove(this);
            //Add our new loading scene
            this.engine.scenes.add(new SplashScreen(this.engine));
        }
    }
}