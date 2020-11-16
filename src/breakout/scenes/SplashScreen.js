import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import Button from '../../core/components/Button.js';
import PlayButton from '../../core/components/PlayButton.js';
import GameScene from '../../breakout/scenes/GameScene.js';

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
        
        const backgroundEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2);
        new Image(backgroundEntity, "splashBackground");
        
        const gameTitle = new Entity(this, engine.getWidth() / 2, 150);
        new Image(gameTitle, "gameTitleImage");
        
        const dashedLine = new Entity(this, engine.getWidth() / 2, 200);
        new Image(dashedLine, "gameTitleDashedLine");
        
        const textEntity = new Entity(this, engine.getWidth() / 2, 225);
        new TextField(textEntity, "High Score: " + engine.getHighScore(), new TextFieldConfig("Arial", "16px", "#FFFFFF", TextAlign.CENTER));
        
        const playButtonEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() - 60);
        this.playButton = new PlayButton(playButtonEntity, this.engine, this);
        this.playButtonImage = new Image(playButtonEntity, "playButtonPurple");
        this.playButtonButton = new Button(playButtonEntity, this.playButtonImage.width, this.playButtonImage.height, this.playButton.hoveredOver, this.playButton.buttonClicked, this.playButton);
        this.playButton.setImage.call(this.playButton, this.playButtonImage);
        this.playButton.setButton.call(this.playButton, this.playButtonButton);

        const playButtonText = new Entity(this, playButtonEntity.localPosition.x, playButtonEntity.localPosition.y + 10);
        new TextField(playButtonText, "Play", new TextFieldConfig("Arial", "34px", "#FFFFFF", TextAlign.CENTER));

        const playButtonImage = new Entity(this, playButtonEntity.localPosition.x - playButtonEntity.components[1].width/2 + 30, playButtonEntity.localPosition.y);
        new Image(playButtonImage, "playButtonImage");
    }

    loadGame(){
        this.engine.scenes.remove(this);
        this.engine.scenes.add(new GameScene(this.engine));
    }

    update(delta)
    {
        super.update(delta);
    }
}