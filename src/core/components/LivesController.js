import Vector2 from "../math/Vector2.js";
import Component from "./Component.js";
import Entity from "./../Entity.js";
import Image from "./Image.js";

export default class LivesController extends Component
{
    /**
     * @constructs LivesController
     * @param {Entity} entity The entity this component is attached to.
     */
    constructor(entity, lifeOne, lifeTwo, lifeThree)
    {
        super(entity);
        this.entity = entity;

        this.livesLeft = 1;
        this.lifeEntities = [lifeOne, lifeTwo, lifeThree];
    }

    loseLife(){
        this.livesLeft--;
        for(i = 0; i < this.lifeEntities.length; i++){
            if(i < this.livesLeft){
                this.lifeEntities[i].components[0].destroy();
                this.lifeEntities[i].components.shift();
                new Image(this.lifeEntities[i], "lifeFull");
            }
            else{
                this.lifeEntities[i].components[0].destroy();
                this.lifeEntities[i].components.shift();
                new Image(this.lifeEntities[i], "lifeEmpty");
            }
        }

        if(this.livesLeft === 0){
            this.gameOver();
        }
    }

    gameOver(){
        this.entity.scene.gameOver.call(this.entity.scene);
    }
}