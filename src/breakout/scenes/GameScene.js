import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import Vector2 from '../../core/math/Vector2.js';
import Button from '../../core/components/Button.js';
import PauseButton from '../../core/components/PauseButton.js';
import Engine from '../../core/Engine.js';

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

        const pauseButtonEntity = new Entity(this, 40, 40);
        this.pauseButton = new PauseButton(pauseButtonEntity, this.engine, this);
        this.pauseButtonImage = new Image(pauseButtonEntity, "pauseButton");
        this.pauseButtonButton = new Button(pauseButtonEntity, this.pauseButtonImage.width, this.pauseButtonImage.height, this.pauseButton.hoveredOver, this.pauseButton.buttonClicked, this.pauseButton);
        this.pauseButton.setButton.call(this.pauseButton, this.pauseButtonButton);
        this.pauseButton.setImage.call(this.pauseButton, this.pauseButtonImage);

        const scoreEntity = new Entity(this, engine.getWidth() / 2, 50);
        this.currentScoreText = new TextField(scoreEntity, "Score: " + 0, new TextFieldConfig("Arial", "42px", "#FFFFFF", TextAlign.CENTER));
        
        const scoreLineEntity = new Entity(this, engine.getWidth() / 2, 60);
        new Image(scoreLineEntity, "scoreDashedLine");

        const highScoreEntity = new Entity(this, engine.getWidth() / 2, 80);
        this.highScoreText = new TextField(highScoreEntity, "High Score: " + engine.getHighScore(), new TextFieldConfig("Arial", "16px", "#FFFFFF", TextAlign.CENTER));

        const livesTextEntity = new Entity(this, engine.getWidth() - 35, 40);
        new TextField(livesTextEntity, "Lives:", new TextFieldConfig("Arial", "16px", "#FFFFFF", TextAlign.CENTER));
        const lifeOne = new Entity(this, engine.getWidth() - 50, 50);
        new Image(lifeOne, "lifeFull");
        const lifeTwo = new Entity(this, engine.getWidth() - 35, 50);
        new Image(lifeTwo, "lifeFull");
        const lifeThree = new Entity(this, engine.getWidth() - 20, 50);
        new Image(lifeThree, "lifeFull");

        // Add in all the bricks, utilize a ternary to offset the last row.
        for(i = 0; i < 4; i++){
            for(k = 0; k < (i == 3 ? 5 : 6); k++){
                newBrick = new Entity(this, 150 * (k + 1) + (i == 3 ? 75 : 0), 125 + 50 * i);
                new Image(newBrick, "brick");
            }
        }

        const paddleEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() - 25);
        new Image(paddleEntity, "paddle");

        const ballEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() - 50);
        new Image(ballEntity, "ball");
    }

    update(delta){
        
    }
}