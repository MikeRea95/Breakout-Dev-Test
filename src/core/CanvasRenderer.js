import Engine from "./Engine.js";

export default class CanvasRenderer
{
    /**
     * @constructs CanvasRenderer The core renderer that handles rendering all assets to the HTML5 canvas.
     * @param {Engine} engine The engine this renderer is associated with.
     * @param {Number} width The width of the canvas.
     * @param {Number} height The height of the canvas.
     */
    constructor(engine, width, height)
    {
        /** 
         * The engine this renderer is associated with.
         * @private
         * @type {Engine} 
         * @member CanvasRenderer#engine
         */
        this.engine = engine;
        /** 
         * The width of the canvas.
         * @public
         * @type {Number} 
         * @member CanvasRenderer#width
         */
        this.width = width;
        /** 
         * The height of the canvas.
         * @public
         * @type {Number} 
         * @member CanvasRenderer#height
         */
        this.height = height;

        /** 
         * The containing div element that the canvas sits in. This container is used to center the canvas within the browser window.
         * @public
         * @type {HTMLDivElement} 
         * @member CanvasRenderer#container
         */
        this.container = window.document.createElement("div");
        this.container.id = "game-container";
        this.container.style.display = "flex";
        this.container.style.justifyItems = "center";
        this.container.style.alignItems = "center";
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        window.document.body.appendChild(this.container);

        /** 
         * The HTML canvas element that is drawn to.
         * @public
         * @type {HTMLCanvasElement} 
         * @member CanvasRenderer#canvas
         */
        this.canvas = window.document.createElement("canvas");
        this.canvas.style.backgroundColor = 'white';
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.display = "block";
        this.canvas.style.margin = "auto";
        /** 
         * The rendering context of the HTML canvas.
         * @public
         * @type {CanvasRenderingContext2D} 
         * @member CanvasRenderer#context
         */
        this.context = this.canvas.getContext("2d");
        this.container.appendChild(this.canvas);
    }

    /**
     * Clears the canvas. This is called at the very start of every render loop.
     * @instance
     * @memberof CanvasRenderer
     */
    clear()
    {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}