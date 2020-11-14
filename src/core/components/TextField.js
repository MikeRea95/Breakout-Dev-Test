import Component from "./Component.js";
import Entity from "./../Entity.js";

/**
 * The TextAlign class contains string references for the different canvas textAlign properties https://www.w3schools.com/tags/canvas_textalign.asp
 * 
 * @class TextAlign
 */
export class TextAlign
{
    /**
     * Returns "left"
     * 
     * @return {String}
     */
    static get LEFT(){ return "left"; };
    /**
     * Returns "right"
     * 
     * @return {String}
     */
    static get RIGHT() { return "right"};
    /**
     * Returns "center"
     * 
     * @return {String}
     */
    static get CENTER() { return "center"};
    /**
     * Returns "start"
     * 
     * @return {String}
     */
    static get START() { return "start" };
    /**
     * Returns "end"
     * 
     * @return {String}
     */
    static get END(){ return "end"};
}

export class TextFieldConfig
{
    /**
     * @constructs TextFieldConfig
     * @param {String} font The string name of the font the text field will use.
     * @param {String} size The size of the font such as "24px" or "13pt".
     * @param {String} color The hexcolor of the text field. Ex. "#FF0000".
     * @param {TextAlign} align The alignment of the text within the text field.
     * @param {Number} maxWidth The maximum width in pixels of the text field before it wraps. If null, the text field will not wrap.
     */
    constructor(font="Arial", size="12px", color="#000000", align=TextAlign.LEFT, maxWidth=null)
    {
        /** 
         * The string name of the font the text field will use.
         * @public
         * @type {String} 
         * @member TextFieldConfig#font
         */
        this.font = font;
        /** 
         * The size of the font such as "24px" or "13pt".
         * @public
         * @type {String} 
         * @member TextFieldConfig#size
         */
        this.size = size;
        /** 
         * The hexcolor of the text field. Ex. "#FF0000".
         * @public
         * @type {String} 
         * @member TextFieldConfig#color
         */
        this.color = color;
        /** 
         * The alignment of the text within the text field.
         * @public
         * @type {TextAlign} 
         * @member TextFieldConfig#align
         */
        this.align = align;
        /** 
         * The maximum width in pixels of the text field before it wraps. If null, the text field will not wrap.
         * @public
         * @type {Number} 
         * @member TextFieldConfig#maxWidth
         */
        this.maxWidth = maxWidth;
    }
}

export default class TextField extends Component
{
    /**
     * The TextField component allows you to configure and render dynamic text within the game engine.
     * @constructs TextField
     * @param {Entity} entity The entity this component is attached to.
     * @param {String} text The text string that is rendered via this component.
     * @param {TextFieldConfig} config The configuration that controls the display of the text.
     */
    constructor(entity, text, config=null)
    {
        super(entity);
        /** 
         * The text string that is rendered via this component.
         * @public
         * @type {String} 
         * @member TextField#text
         */
        this.text = text;
        /** 
         * The configuration that controls the display of the text.
         * @public
         * @type {TextFieldConfig} 
         * @member TextField#config
         */
        this.config = null;
        if(config == null) this.config = new TextFieldConfig();
        else this.config = config;
    }

    /**
     * This render function takes the world position and rotation of the entity the Text component is attached to, and uses that along with the TextFieldConfig properties to render the text to the canvas. Note that scale and rotation are currently NOT supported.
     * @memberof TextField
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

        context.setTransform(1, 0, 0, 1, x, y);
        context.rotate(rotation*Math.PI/180.0);
        context.font = this.config.size + " " + this.config.font;
        context.textAlign = this.config.align;
        context.fillStyle = this.config.color;

        if(this.config.maxWidth != null)
        {
            context.fillText(this.text, 0, 0, this.config.maxWidth);
        }
        else
        {
            context.fillText(this.text, 0, 0);
        }

        context.restore();
    }
}