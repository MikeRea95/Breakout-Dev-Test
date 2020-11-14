import AssetLoader, { FileType } from '../../core/AssetLoader.js';
import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import Button from '../../core/components/Button.js';
import GameScene from './GameScene.js';

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
        
        const gameTitle = new Entity(this, engine.getWidth() / 2, 150);
        new Image(gameTitle, "gameTitleImage");
        
        const dashedLine = new Entity(this, engine.getWidth() / 2, 200);
        new Image(dashedLine, "gameTitleDashedLine");
        
        const textEntity = new Entity(this, engine.getWidth() / 2, 225);
        new TextField(textEntity, "High Score: " + 0, new TextFieldConfig("Arial", "16px", "#FFFFFF", TextAlign.CENTER));
        
        this.playButton = new Entity(this, engine.getWidth() / 2, engine.getHeight() - 60);
        this.playButtonBackground = new Image(this.playButton, "playButtonPurple");
        new Button(this.playButton, this.playButton.components[0].width, this.playButton.components[0].height, this.playHoveredOver, this.playButtonClicked, this);

        const playButtonText = new Entity(this, this.playButton.localPosition.x, this.playButton.localPosition.y + 10);
        new TextField(playButtonText, "Play", new TextFieldConfig("Arial", "34px", "#FFFFFF", TextAlign.CENTER));

        const playButtonImage = new Entity(this, this.playButton.localPosition.x - this.playButton.components[0].width/2 + 30, this.playButton.localPosition.y);
        new Image(playButtonImage, "playButtonImage");
    }
    
    playHoveredOver(truthy){
        if(truthy){
            this.playButtonBackground = new Image(this.playButton, "playButtonHovered");
        }
        else{
            this.playButtonBackground = new Image(this.playButton, "playButtonPurple");
        }
    }

    playButtonClicked(){
        //Remove this scene
        this.engine.scenes.remove(this);
        //Add our new loading scene
        this.engine.scenes.add(new GameScene(this.engine));
    }

    update(delta)
    {
        super.update(delta);
    }
}