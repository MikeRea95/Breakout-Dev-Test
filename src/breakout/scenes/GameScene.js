import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import Vector2 from '../../core/math/Vector2.js';

export default class GameScene extends Scene{
    /**
     * 
     * @param {Engine} engine 
     */
    constructor(engine)
    {
        super(engine);
        this.engine = engine;
        
        const backgroundEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2);
        new Image(backgroundEntity, "gameSceneBackground");
    }

    update(delta){

    }
}