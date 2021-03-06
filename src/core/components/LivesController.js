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

        this.livesLeft = 3;
        this.lifeEntities = [lifeOne, lifeTwo, lifeThree];
    }

    loseLife(){
        this.livesLeft--;
        for(i = 0; i < this.lifeEntities.length; i++){
            this.lifeEntities[i].components[0].destroy();
            this.lifeEntities[i].components.shift();

            if(i < this.livesLeft){
                new Image(this.lifeEntities[i], "lifeFull");
            }
            else{
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