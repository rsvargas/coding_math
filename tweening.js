window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,

        target = {
            x: width,
            y: Math.random() * height
        },

        points = [],
        numPoints = 100,
        ease = 0.5,
        easing = true;

    for(var i = 0; i< numPoints; i++) {
        points.push({
            x: 0, y: 0
        });
    }

    update();

    document.body.addEventListener("mousemove", function(event) {
        target.x = event.clientX;
        target.y = event.clientY;
        if(!easing) {
            easing = true;
            update();
        }
    });

    function update() {
        context.clearRect(0, 0, width, height);

        var leader = ( {
            x: target.x,
            y: target.y
        });

        for(var i = 0; i< points.length; i++) {
            var point = points[i];
            easeTo(point, leader, ease);
            utils.circle(context, point, 10);
            leader = point;
        }


        requestAnimationFrame(update);
    }

    function easeTo(position, target, ease) {
        var dx = (target.x - position.x);
        var dy = (target.y - position.y);
        position.x += dx * ease;
        position.y += dy * ease;
        if(Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
            position.x = target.x;
            position.y = target.y;
            return false;
        }
        return true;
    }
};
