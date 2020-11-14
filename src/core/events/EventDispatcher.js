export default class EventDispatcher
{
    /**
     * EventDispatchers are an easy way to send data from one to many by allowing other classes to subscribe to specific events. When an event is dispatched, all listeners subscribed to that event have their associated callback invoked.
     * @constructs EventDispatcher
     */
    constructor()
    {
        /** 
         * An array of listeners that are currently subscribed to events of this dispatcher.
         * @public
         * @type {Array} 
         * @member EventDispatcher#listeners
         */
        this.listeners = [];
    }

    /**
     * Adds an event listener to this dispatcher.
     * @instance
     * @memberof EventDispatcher
     * @param {String} event The name of the event to listen to.
     * @param {Function} callback The callback to be invoked when the event is dispatched.
     * @param {any} callbackContext The context to be associated with the callback when the event is dispatched. The context is usually set to 'this'.
     */
    addEventListener(event, callback, callbackContext=null)
    {
        this.listeners.push(new EventListener(event, callback, callbackContext));
    }

    /**
     * Removes an event listener from this dispatcher.
     * @instance
     * @memberof EventDispatcher
     * @param {String} event The name of the event the listener is associated with.
     * @param {Function} callback The callback the listener is associated with.
     * @param {any} callbackContext The callback context the listener is associated with.
     */
    removeEventListener(event, callback, callbackContext=null)
    {
        for(let i=0; i<this.listeners.length; i++)
        {
            const listener = this.listeners[i];
            if(listener.event==event && listener.callback == callback && listener.callbackContext==callbackContext)
            {
                this.listeners.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * Removes all event listeners associated with this dispatcher.
     * @instance
     * @memberof EventDispatcher
     */
    removeAllEventListeners()
    {
        this.listeners = [];
    }

    /**
     * Dispatches an event. This will invoke the callback of any listener that is currently subscribed to the dispatched event.
     * @instance
     * @memberof EventDispatcher
     * @param {String} event The name of the event the listener is associated with.
     * @param {any} args Any data associated with the dispatched event. This will be passed as an argument to the listeners callbacks.
     */
    dispatchEvent(event, args)
    {
        for(let i=0; i<this.listeners.length; i++)
        {
            const listener = this.listeners[i];
            if(listener.event==event)
            {
                listener.callback.bind(listener.callbackContext)(args);
            }
        }
    }
}

class EventListener
{
    constructor(event, callback, callbackContext)
    {
        this.event = event;
        this.callback = callback;
        this.callbackContext = callbackContext;
    }
}