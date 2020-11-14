import AssetLoader, { FileType } from '../../core/AssetLoader.js';
import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';

export default class SplashScreen extends Scene
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

        const textEntity = new Entity(this, engine.getWidth() / 2, 200);
        new TextField(textEntity, "High Score: " + 0, new TextFieldConfig("Arial", "16px", "#FFFFFF", TextAlign.CENTER));

        const gameTitle = new Entity(this, engine.getWidth() / 2, 150);
        new Image(gameTitle, "gameTitleImage");

        //const loadingBarFillEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 - 30);
        //new Image(loadingBarFillEntity, "loadingBarFill");
    }

    update(delta)
    {
        super.update(delta);
    }
}