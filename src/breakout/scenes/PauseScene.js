import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import Vector2 from '../../core/math/Vector2.js';
import Button from '../../core/components/Button.js';
import PauseButton from '../../core/components/PauseButton.js';
import Engine from '../../core/Engine.js';
import ResumeButton from '../../core/components/ResumeButton.js';
import QuitButton from '../../core/components/QuitButton.js';
import SplashScreen from './SplashScreen.js';

export default class PauseScene extends Scene{
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
        new Image(backgroundEntity, "pauseBackground");

        const pauseTextEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 - 60);
        new TextField(pauseTextEntity, "PAUSE", new TextFieldConfig("Arial", "60px", "#FFFFFF", TextAlign.CENTER));

        const pauseLine = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 - 50);
        new Image(pauseLine, "pauseLine");

        const resumeEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2);
        this.resumeButton = new ResumeButton(resumeEntity, this.engine, this);
        this.resumeButtonImage = new Image(resumeEntity, "pinkButton");
        this.resumeButtonButton = new Button(resumeEntity, this.resumeButtonImage.width, this.resumeButtonImage.height, this.resumeButton.hoveredOver, this.resumeButton.buttonClicked, this.resumeButton);
        this.resumeButton.setButton.call(this.resumeButton, this.resumeButtonButton);
        this.resumeButton.setImage.call(this.resumeButton, this.resumeButtonImage);
        
        // There's no built-in way to adjust a text's position within the Entity, so this is the Occam's Razor. 
        const resumeTextEntity = new Entity(this, resumeEntity.localPosition.x, resumeEntity.localPosition.y + 10);
        new TextField(resumeTextEntity, "Resume", new TextFieldConfig("Arial", "36px", "#FFFFFF", TextAlign.CENTER));

        const quitEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 + 70);
        this.quitButton = new QuitButton(quitEntity, this.engine, this);
        this.quitButtonImage = new Image(quitEntity, "pinkButton");
        this.quitButtonButton = new Button(quitEntity, this.quitButtonImage.width, this.quitButtonImage.height, this.quitButton.hoveredOver, this.quitButton.buttonClicked, this.quitButton);
        this.quitButton.setButton.call(this.quitButton, this.quitButtonButton);
        this.quitButton.setImage.call(this.quitButton, this.quitButtonImage);

        const quitTextEntity = new Entity(this, quitEntity.localPosition.x, quitEntity.localPosition.y + 10);
        new TextField(quitTextEntity, "Quit", new TextFieldConfig("Arial", "36px", "#FFFFFF", TextAlign.CENTER));
    }

    resume(){
        this.scene.resume.call(this.scene);
    }

    quit(){
        this.engine.scenes.add(new SplashScreen(this.engine));
        this.engine.scenes.remove(this.scene);
        this.engine.scenes.remove(this);
    }
}