import AssetLoader, { FileType } from '../../core/AssetLoader.js';
import Scene from '../../core/Scene.js';
import Image from '../../core/components/Image.js';
import Entity from '../../core/Entity.js';
import TextField, { TextFieldConfig, TextAlign } from '../../core/components/TextField.js';
import SplashScreen from './SplashScreen.js';
import Vector2 from '../../core/math/Vector2.js';

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
        this.loader.load("gameTitleImage", "./assets/images/breakout-game-title.png", FileType.TEXTURE);
        this.loader.load("gameTitleDashedLine", "./assets/images/breakout-splash-dashed-line.png", FileType.TEXTURE);
        this.loader.load("playButtonPurple", "./assets/images/breakout-btn-purple.png", FileType.TEXTURE);
        this.loader.load("playButtonHovered", "./assets/images/breakout-btn-purple-hover.png", FileType.TEXTURE);
        this.loader.load("playButtonImage", "./assets/images/breakout-play-icon.png", FileType.TEXTURE);
        this.loader.load("gameSceneBackground", "./assets/images/breakout-gameplay-background.png", FileType.TEXTURE);
        this.loader.load("pauseButton", "./assets/images/breakout-btn-pause.png", FileType.TEXTURE);
        this.loader.load("pauseButtonHovered", "./assets/images/breakout-btn-pause-hover.png", FileType.TEXTURE);
        this.loader.load("scoreDashedLine", "./assets/images/breakout-hud-score-dashed-line.png", FileType.TEXTURE);
        this.loader.load("lifeFull", "./assets/images/breakout-life-full.png", FileType.TEXTURE);
        this.loader.load("lifeEmpty", "./assets/images/breakout-life-empty.png", FileType.TEXTURE);
        this.loader.load("brick", "./assets/images/breakout-enemy-brick.png", FileType.TEXTURE);
        this.loader.load("paddle", "./assets/images/breakout-player-paddle.png", FileType.TEXTURE);
        this.loader.load("ball", "./assets/images/breakout-ball.png", FileType.TEXTURE);

        const backgroundEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2);
        new Image(backgroundEntity, "splashBackground");

        const textEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 - 55);
        new TextField(textEntity, "Loading...", new TextFieldConfig("Arial", "16px", "#FFFFFF", TextAlign.CENTER));

        const loadingBarBackgroundEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 - 30);
        new Image(loadingBarBackgroundEntity, "loadingBarBackground");

        const loadingBarFillEntity = new Entity(this, engine.getWidth() / 2, engine.getHeight() / 2 - 30);
        this.fill = new Image(loadingBarFillEntity, "loadingBarFill");
        this.fill.origin = new Vector2(0, 0.5); // Left-align.
        loadingBarFillEntity.localPosition.x -= this.fill.width/2;
        this.totalFillWidth = this.fill.width; // Ensure we always keep track of what the width should be.
    }

    update(delta)
    {
        super.update(delta);
        
        this.fill.width = this.totalFillWidth * this.loader.assetsLoaded / this.loader.totalAssets;
        if(this.loader.assetsLoaded == this.loader.totalAssets)
        {
            //Remove this scene
            this.engine.scenes.remove(this);
            //Add our new loading scene
            this.engine.scenes.add(new SplashScreen(this.engine));
        }
    }
}