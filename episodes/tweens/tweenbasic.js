window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ball = {
            x: 100,
            y: 100,
            alpha: 1
        };

    tween(ball, "alpha", 0, 1000, easeInOutQuad);

    function tween(obj, prop, target, duration, easingFunc) {
        var start = obj[prop];
        var change = target - start;
        var startTime = new Date();

        update();

        function update() {
            var time = new Date() - startTime;
            if(time < duration) {
                obj[prop] = easingFunc(time, start, change, duration);
                requestAnimationFrame(update);
            } else {
                time = duration;
                obj[prop] = easingFunc(time, start, change, duration);
            }
            render();
        }
    }

    function render() {
        context.clearRect(0, 0, width, height);

        utils.circle(context, ball, 20, null, ball.alpha);
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
