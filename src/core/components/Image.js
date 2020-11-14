import Vector2 from "../math/Vector2.js";
import Component from "./Component.js";
import Entity from "./../Entity.js";

export default class Image extends Component
{
    /**
     * @constructs Image
     * @param {Entity} entity The entity this component is attached to.
     * @param {String} key The key of the image. This is mapped to a texture in AssetManager. Keys are defined when the texture is loaded via an AssetLoader
     */
    constructor(entity, key)
    {
        super(entity);
        /** 
         * The texture key of the Image. This is what was defined in the AssetLoader and is used to retrieve the texture from the map within the AssetManager
         * @public
         * @type {String} 
         * @member Image#key
         */
        this.key = key;
        /** 
         * The origin point of the Image. This defaults to center, (0.5, 0.5)
         * @public
         * @type {Number} 
         * @member Image#origin
         */
        this.origin = new Vector2(0.5, 0.5);
        const image = this.entity.scene.engine.assets.textures[this.key];
        /** 
         * The width of the Image
         * @public
         * @type {Number} 
         * @member Image#width
         */
        this.width = image.width;
        /** 
         * The height of the Image
         * @public
         * @type {Number} 
         * @member Image#height
         */
        this.height = image.height;
    }

    /**
     * This render function takes the world position, rotation and scale of the entity the Image component is attached to and draws the defined texture with those transformed values.
     * @memberof Image
     * @override
     * @public
     * @instance
     * @param {CanvasRenderingContext2D} context 
     */
    render(context)
    {
        context.save();

        const pos = this.entity.getPosition();
        const scale = this.entity.getScale();
        const x = pos.x;
        const y = pos.y;
        const scaleX = scale.x;
        const scaleY = scale.y;
        const rotation = this.entity.getRotation();

        context.setTransform(1, 0, 0, 1, x, y); // sets scale and origin
        context.rotate(rotation*Math.PI/180.0);
        const image = this.entity.scene.engine.assets.textures[this.key];
        context.drawImage(image, -this.width*scaleX*this.origin.x, -this.height*scaleY*this.origin.y, this.width*scaleX, this.height*scaleY);

        context.restore();
    }
}