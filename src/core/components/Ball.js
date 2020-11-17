import Vector2 from "../math/Vector2.js";
import Component from "./Component.js";
import Entity from "./../Entity.js";

export default class Ball extends Component
{
    /**
     * @constructs Ball
     * @param {Entity} entity The entity this component is attached to.
     */
    constructor(entity)
    {
        super(entity);
        this.entity = entity;

        this.launched = false;
        this.direction = new Vector2(0, 1);
        this.speed = 100;

        this.radius = 15;
    }

    move(delta){
        if(this.launched){
            // Positive x, as x goes left-to-right
            // Negative y, as y goes top-to-bottom
            this.entity.localPosition = new Vector2(this.entity.localPosition.x + this.direction.x * delta * this.speed, this.entity.localPosition.y - this.direction.y * delta * this.speed);
        }
    }

    flipVertical(){
        this.direction.multiply(new Vector2(1, -1));
    }

    flipHorizontal(){
        this.direction.multiply(new Vector2(-1, 1));
    }
}