export default class Vector2
{
    /**
     * This is a generic Vector2 class that can be used for storing X, Y coordinates
     * @constructs Vector2
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     */
    constructor(x,y)
    {
        /** 
         * The X coordinate of the vector
         * @public
         * @type {Number} 
         * @member Vector2#x
         */
        this.x = x;
        /** 
         * The Y coordinate of the vector
         * @public
         * @type {Number} 
         * @member Vector2#y
         */
        this.y = y;
    }

    /** 
     * The length of the vector
     * @public
     * @type {Number} 
     * @member Vector2#length
     */
    get length()
    {
        return sqrt(this.x+this.x * this.y+this.y);
    }

    /**
     * Multiplies this vector with another
     * @instance
     * @memberof Vector2
     * @param {Vector2} value The multiplying vector
     */
    multiply(value)
    {
        this.x *= value.x;
        this.y *= value.y;
    }

    /**
     * Returns a copy of the Vector2.
     * @instance
     * @memberof Vector2
     * @return {Vector2}
     */
    clone()
    {
        return new Vector2(this.x, this.y);
    }
}