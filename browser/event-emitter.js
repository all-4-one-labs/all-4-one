// Here is our constructor function, available globally (set to the window object!)
window.EventEmitter = function () {
    this.subscribers = {};
};

(function (EE) {

    // To be used like:
    // instanceOfEE.on('touchdown', cheerFn);
    EE.prototype.on = function (eventName, eventListener) {

        // If this instance's subscribers object does not yet
        // have the key matching the given event name, create the
        // key and assign the value of an empty array.
        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];
        }

        // Push the given listener function into the array
        // located on the instance's subscribers object.
        this.subscribers[eventName].push(eventListener);

    };

    // To be used like:
    // instanceOfEE.emit('codec', 'Hey Snake, Otacon is calling!');
    EE.prototype.emit = function (eventName) {

        // If there are no subscribers to this event name, why even?
        if (!this.subscribers[eventName]) {
            return;
        }

        // Grab the remaining arguments to our emit function.
        var remainingArgs = [].slice.call(arguments, 1);

        // For each subscriber, call it with our arguments.
        this.subscribers[eventName].forEach(function (listener) {
            listener.apply(null, remainingArgs);
        });

    };

})(window.EventEmitter);
