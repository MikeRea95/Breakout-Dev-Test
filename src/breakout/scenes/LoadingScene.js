import AssetLoader, { FileType } from '../../core/AssetLoader.js';
import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';

export default class LoadingScene extends Scene
{
    /**
     * 
     * @param {Engine} engine 
     */
    constructor(engine)
    {
        super(engine);

        this.loader = new AssetLoader(this);
        /*Load assets here*/

        const backgroundEntity = new Entity(this, 0, 0);
        new Image(backgroundEntity, "splashBackground")

        const textEntity = new Entity(this, 25, 25);
        new TextField(textEntity, "Loading...", new TextFieldConfig("Arial", "12px", "#FFFFFF", TextAlign.LEFT));
       
    }

    update(delta)
    {
        super.update(delta);
    }
}