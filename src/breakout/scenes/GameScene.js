import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import Vector2 from '../../core/math/Vector2.js';
import Button from '../../core/components/Button.js';
import PauseButton from '../../core/components/PauseButton.js';
import Engine from '../../core/Engine.js';
import PauseScene from './PauseScene.js';
import Ball from '../../core/components/Ball.js';
import Mouse from '../../core/input/Mouse.js';
import InputManager from '../../core/input/InputManager.js';
import { MouseEvent } from "../../core/input/Mouse.js";
import LivesController from '../../core/components/LivesController.js';
import GameOverScene from './GameOverScene.js';

export default class GameScene extends Scene{
    /**
     * 
     * @param {Engine} engine 
     */
    constructor(engine, loaded = false)
    {
        super(engine);
        this.paused = true;
        this.engine = engine;
        this.score = 0;

        const backgroundEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2);
        new Image(backgroundEntity, "gameSceneBackground");

        const pauseButtonEntity = new Entity(this, 40, 40);
        this.pauseButton = new PauseButton(pauseButtonEntity, this.engine, this);
        this.pauseButtonImage = new Image(pauseButtonEntity, "pauseButton");
        this.pauseButtonButton = new Button(pauseButtonEntity, this.pauseButtonImage.width, this.pauseButtonImage.height, this.pauseButton.hoveredOver, this.pauseButton.buttonClicked, this.pauseButton);
        this.pauseButton.setButton.call(this.pauseButton, this.pauseButtonButton);
        this.pauseButton.setImage.call(this.pauseButton, this.pauseButtonImage);

        const scoreEntity = new Entity(this, engine.getWidth() / 2, 50);
        this.currentScoreText = new TextField(scoreEntity, "Score: " + this.score, new TextFieldConfig("Arial", "42px", "#FFFFFF", TextAlign.CENTER));
        
        const scoreLineEntity = new Entity(this, engine.getWidth() / 2, 60);
        new Image(scoreLineEntity, "scoreDashedLine");

        const highScoreEntity = new Entity(this, engine.getWidth() / 2, 80);
        this.highScoreText = new TextField(highScoreEntity, "High Score: " + engine.getHighScore(), new TextFieldConfig("Arial", "16px", "#FFFFFF", TextAlign.CENTER));

        const livesEntity = new Entity(this, engine.getWidth() - 35, 40);
        new TextField(livesEntity, "Lives:", new TextFieldConfig("Arial", "16px", "#FFFFFF", TextAlign.CENTER));
        const lifeOne = new Entity(this, engine.getWidth() - 50, 50);
        new Image(lifeOne, "lifeFull");
        const lifeTwo = new Entity(this, engine.getWidth() - 35, 50);
        new Image(lifeTwo, "lifeFull");
        const lifeThree = new Entity(this, engine.getWidth() - 20, 50);
        new Image(lifeThree, "lifeFull");
        this.livesController = new LivesController(livesEntity, lifeOne, lifeTwo, lifeThree);

        this.bricks = [];

        // Add in all the bricks, utilize a ternary to offset the last row.
        for(i = 0; i < 4; i++){
            for(k = 0; k < (i == 3 ? 5 : 6); k++){
                let newBrick = new Entity(this, 150 * (k + 1) + (i == 3 ? 75 : 0), 125 + 50 * i);
                new Image(newBrick, "brick");

                this.bricks.push(newBrick);
            }
        }
        
        this.paddleEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() - 25);
        new Image(this.paddleEntity, "paddle");

        this.ballEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() - 50);
        new Image(this.ballEntity, "ball");
        new Ball(this.ballEntity);

        this.loaded = loaded;
        this.input.mouse.events.addEventListener(MouseEvent.MOUSE_DOWN, this.onMouseDown, this);

        this.counter = 0;
        this.paused = false;
    }

    onMouseDown(){
        if(!this.paused && this.loaded){
            this.ballEntity.components[1].launched = true;
        }
        // For reasons unknown to me, this function gets called as soon as the scene is loaded,
        // so I ignore the very first call.
        // Javascript works in mysterious ways.
        this.loaded = true;
    }

    pause(){
        this.paused = true;
        this.pauseScene = new PauseScene(this.engine, this);
        this.engine.scenes.add(this.pauseScene);
    }

    resume(){
        this.paused = false;
        this.engine.scenes.remove(this.pauseScene);
    }

    update(delta){
        if(!this.paused){
            this.counter++;

            this.moveMouse();
            if(this.ballEntity.components[1].launched){
                this.ballEntity.components[1].move.call(this.ballEntity.components[1], delta);
                this.detectCollisions();
                if(this.ballEntity.localPosition.y > this.engine.getHeight()){
                    this.livesController.loseLife.call(this.livesController);
                    this.ballEntity.components[1].reset.call(this.ballEntity.components[1]);
                }
            }
            else{
                this.movePaddleWithMouse();
            }
        }
    }

    gameOver(){
        this.paused = true;
        this.gameOverScene = new GameOverScene(this.engine, this);
        this.engine.scenes.add(this.gameOverScene);
    }

    moveMouse(){
        min = this.paddleEntity.components[0].width/2;
        max = this.engine.getWidth() - this.paddleEntity.components[0].width/2;
        // Clamp the paddle's position to within the window
        x = Math.min(Math.max(this.engine.input.mouse.position.x, min), max);
        this.paddleEntity.localPosition = new Vector2(x, this.paddleEntity.localPosition.y);
    }

    movePaddleWithMouse(){
        this.ballEntity.localPosition = new Vector2(this.paddleEntity.localPosition.x, this.paddleEntity.localPosition.y - 25);
    }

    detectCollisions(){
        for(i = 0; i < this.bricks.length; i++){
            circleX = this.ballEntity.localPosition.x;
            circleY = this.ballEntity.localPosition.y;

            brick = this.bricks[i];
            if(brick.destroyed){
                continue;
            }
            brickX = brick.localPosition.x;
            brickY = brick.localPosition.y;

            brickWidth = brick.components[0].width / 2;
            brickHeight = brick.components[0].height / 2;

            testX = circleX;
            testY = circleY;

            closestEdge = "";

            /* Test which edge is closest, preference on top/left. */
            // If we're to the left of the brick's center
            if(circleX < brickX - brickWidth){
                testX = brickX;
                closestEdge = "Left";
            } // Or all the way to the right
            else if(circleX > brickX + brickWidth){
                testX = brickX + brickWidth;
                closestEdge = "Right";
            }

            // If we're above the brick's center
            if (circleY < brickY - brickHeight){
                testY = brickY;
                closestEdge = "Top";
            } // Or all the way below it
            else if (circleY > brickY + brickHeight){
                testY = brickY + brickHeight;
                closestEdge = "Bottom";
            }

            distX = circleX - testX;
            distY = circleY - testY;
            distance = Math.sqrt((distX * distX) + (distY * distY));

            if(distance <= this.ballEntity.components[1].radius){
                if(closestEdge === "Bottom" || closestEdge === "Top"){
                    this.ballEntity.components[1].flipVertical.call(this.ballEntity.components[1]);
                }
                else{
                    this.ballEntity.components[1].flipHorizontal.call(this.ballEntity.components[1]);
                }
                
                this.bricks.splice(this.bricks.indexOf(brick), 1);
                brick.destroy();
                this.score++;
                this.currentScoreText.text = "Score: " + this.score;
                this.engine.highScore = Math.max(this.score, this.engine.highScore);
                this.highScoreText.text = "High Score: " + this.engine.highScore;
                break;
            }
        }

        if(this.ballEntity.components[1].direction.y < 0){
            if(this.ballEntity.localPosition.x > this.paddleEntity.localPosition.x - this.paddleEntity.components[0].width / 2 &&
                this.ballEntity.localPosition.x < this.paddleEntity.localPosition.x + this.paddleEntity.components[0].width / 2 &&
                this.ballEntity.localPosition.y > this.paddleEntity.localPosition.y - this.ballEntity.components[0].height / 2){
                    this.ballEntity.components[1].flipVertical.call(this.ballEntity.components[1]);
                }
        }
    }

    destroy(){
        super.destroy();
        this.engine.input.mouse.events.removeEventListener(MouseEvent.MOUSE_DOWN, this.onMouseDown, this);
    }
}