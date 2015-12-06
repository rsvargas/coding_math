window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        start = {
            x:  100,
            y: 100
        },
        target = {},
        change = {},
        startTime,
        duration = 3000;

    utils.circle(context, start, 20);

    document.body.addEventListener("click", function(event) {
        target.x = event.clientX;
        target.y = event.clientY;
        change.x = target.x - start.x;
        change.y = target.y - start.y;
        startTime = new Date();
        update();
    });

    function update() {
        context.clearRect(0, 0, width, height);

        var time = new Date() - startTime;
        context.font = "40px serif";
        context.fillText("Time: " + time, 10, 50);
        if(time < duration ) {
            var pos = {
                x: easeInOutQuad(time, start.x, change.x, duration),
                y: linearTween(time, start.y, change.y, duration)
            };

            utils.circle(context, pos, 20);
            requestAnimationFrame(update);
        } else {
            utils.circle(context, target, 20);
            start.x = target.x;
            start.y = target.y;
        }
    }

    //t: current time, b: beginning value, c: cange in value, d: duratino
    function linearTween(t, b, c, d) {
        return c * t / d + b;
    }

    //quadratic easing

    //t: current time, b: beginning value, c:  change in value, d: duration
    //t and d can be in frames or seconds/milliseconds
    function easeInQuad(t, b, c, d) {
        return c *(t/=d)*t + b;
    }

    function easeOutQuad(t, b, c, d) {
        return -c * (t/=d)*(t-2) + b;
    }

    function easeInOutQuad(t, b, c, d) {
        if((t/=d/2)<1) return c/2*t*t + b;
        return -c/2 *((--t)*(t-2) -1) + b;
    }

};
