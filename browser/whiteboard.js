// this is global now
window.whiteboard = new window.EventEmitter();

(function () {

    // Ultimately, the color of our stroke;
    var color;

    // The color selection elements on the DOM.
    var colorElements = [].slice.call(document.querySelectorAll('.marker'));

    colorElements.forEach(function (el) {

        // Set the background color of this element
        // to its id (purple, red, blue, etc).
        el.style.backgroundColor = el.id;

        // Attach a click handler that will set our color variable to
        // the elements id, remove the selected class from all colors,
        // and then add the selected class to the clicked color.
        el.addEventListener('click', function () {
            color = this.id;
            document.querySelector('.selected').classList.remove('selected');
            this.classList.add('selected');
        });

    });

    var canvas = document.querySelector('#paint');
    var sketch = document.querySelector('#sketch');
    var sketchStyle = getComputedStyle(sketch);

    canvas.width = parseInt(sketchStyle.getPropertyValue('width'));
    canvas.height = parseInt(sketchStyle.getPropertyValue('height'));

    var ctx = canvas.getContext('2d');

    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    var currentMousePosition = {
        x: 0,
        y: 0
    };

    var lastMousePosition = {
        x: 0,
        y: 0
    };

    var drawing = false;

    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        currentMousePosition.x = e.pageX - this.offsetLeft;
        currentMousePosition.y = e.pageY - this.offsetTop;
    });

    canvas.addEventListener('mouseup', function () {
        drawing = false;
    });

    canvas.addEventListener('mousemove', function (e) {

        if (!drawing) return;

        lastMousePosition.x = currentMousePosition.x;
        lastMousePosition.y = currentMousePosition.y;

        currentMousePosition.x = e.pageX - this.offsetLeft;
        currentMousePosition.y = e.pageY - this.offsetTop;

        whiteboard.draw(lastMousePosition, currentMousePosition, color, true);

    });

    whiteboard.draw = function (start, end, strokeColor, shouldBroadcast) {

        // Draw the line between the start and end positions
        // that is colored with the given color.
        ctx.beginPath();
        ctx.strokeStyle = strokeColor || 'black';
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.closePath();
        ctx.stroke();

        // If shouldBroadcast is truthy, we will emit a draw event to listeners
        // with the start, end and color data.
        if (shouldBroadcast) {
            // this event we emit is caught by the whiteboard object in app.js
            whiteboard.emit('draw', start, end, strokeColor);
        }

    };

})();
