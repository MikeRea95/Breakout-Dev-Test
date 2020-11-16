import Component from "./Component.js";
import Entity from "../Entity.js";
import Image from "./Image.js";

export default class PlayButton extends Component
{
    /**
     * 
     * @param {Entity} entity 
     */
    constructor(entity, engine, scene){
        super(entity);

        this.entity = entity;
        this.engine = engine;
        this.scene = scene;
    }
    
    /**
     * @param {Image} image The image attached to the Play Button.
     */
    setImage(image){
        this.image = image;
    }

    /**
     * @param {Button} button The button attached to the Pause Button.
     */
    setButton(button){
        this.button = button;
    }

    /**
     * 
     * @param {bool} truthy Whether or not the button is being hovered over.
     */
    hoveredOver(truthy){
        if(truthy){
            this.image.destroy();
            this.image = new Image(this.entity, "playButtonHovered");
        }
        else{
            this.image.destroy();
            this.image = new Image(this.entity, "playButtonPurple");
        }
    }

    buttonClicked(){
        this.scene.loadGame.call(this.scene);
    }

    destroy(){
        super.destroy();
    }
}