import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import Vector2 from '../../core/math/Vector2.js';
import Button from '../../core/components/Button.js';
import PauseButton from '../../core/components/PauseButton.js';
import Engine from '../../core/Engine.js';
import ReplayButton from '../../core/components/ReplayButton.js';
import QuitButton from '../../core/components/QuitButton.js';
import SplashScreen from './SplashScreen.js';
import GameScene from './GameScene.js';

export default class GameOverScene extends Scene{
    /*  
     * 
     * @param {Engine} engine 
     */
    constructor(engine, scene)
    {
        super(engine);
        this.engine = engine;
        this.scene = scene;

        const overlayEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2);
        new Image(overlayEntity, "overlay");
        
        const backgroundEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2);
        new Image(backgroundEntity, "gameOverBackground");

        const pauseTextEntity = new Entity(this, engine.getWidth() / 2, 150);
        new TextField(pauseTextEntity, "GAME OVER", new TextFieldConfig("Arial", "60px", "#FFFFFF", TextAlign.CENTER));

        const pauseLine = new Entity(this, engine.getWidth() / 2, 165);
        new Image(pauseLine, "gameOverLine");

        const replayEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 + 75);
        this.replayButton = new ReplayButton(replayEntity, this.engine, this);
        this.replayButtonImage = new Image(replayEntity, "pinkButton");
        this.replayButtonButton = new Button(replayEntity, this.replayButtonImage.width, this.replayButtonImage.height, this.replayButton.hoveredOver, this.replayButton.buttonClicked, this.replayButton);
        this.replayButton.setButton.call(this.replayButton, this.replayButtonButton);
        this.replayButton.setImage.call(this.replayButton, this.replayButtonImage);

        const scoreEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 - 50);
        new TextField(scoreEntity, "Score: " + this.scene.score, new TextFieldConfig("Arial", "62px", "#FFFFFF", TextAlign.CENTER));

        const highScoreEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2);
        new TextField(highScoreEntity, "High Score: " + this.engine.getHighScore(), new TextFieldConfig("Arial", "45px", "#FFFFFF", TextAlign.CENTER));
        
        // There's no built-in way to adjust a text's position within the Entity, so this is the Occam's Razor. 
        const replayTextEntity = new Entity(this, replayEntity.localPosition.x, replayEntity.localPosition.y + 10);
        new TextField(replayTextEntity, "Replay", new TextFieldConfig("Arial", "36px", "#FFFFFF", TextAlign.CENTER));

        const quitEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 + 155);
        this.quitButton = new QuitButton(quitEntity, this.engine, this);
        this.quitButtonImage = new Image(quitEntity, "pinkButton");
        this.quitButtonButton = new Button(quitEntity, this.quitButtonImage.width, this.quitButtonImage.height, this.quitButton.hoveredOver, this.quitButton.buttonClicked, this.quitButton);
        this.quitButton.setButton.call(this.quitButton, this.quitButtonButton);
        this.quitButton.setImage.call(this.quitButton, this.quitButtonImage);

        const quitTextEntity = new Entity(this, quitEntity.localPosition.x, quitEntity.localPosition.y + 10);
        new TextField(quitTextEntity, "Quit", new TextFieldConfig("Arial", "36px", "#FFFFFF", TextAlign.CENTER));
    }

    replay(){
        this.engine.scenes.add(new GameScene(this.engine, true));
        this.engine.scenes.remove(this.scene);
        this.engine.scenes.remove(this);
    }

    quit(){
        this.engine.scenes.add(new SplashScreen(this.engine));
        this.engine.scenes.remove(this.scene);
        this.engine.scenes.remove(this);
    }
}