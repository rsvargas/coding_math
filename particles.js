window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var part = particle.create(width/2, height/2, 0, 0);
    part.accelerate(Math.random() * 10 -5, Math.random() * 10 -5);
    part.radius = 4;

    var lines = [];
    for(var i=0; i< 10; i++)
    {
        lines[i] = {
            p0: {
                x: Math.random() * width,
                y: Math.random() * height,
            },
            p1: {
                x: Math.random() * width,
                y: Math.random() * height,
            },
        };
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        drawLines();

        var p0 = { x: part.x, y: part.y};
        part.update();
        part.draw(context);
        var p1 = { x: part.x, y: part.y};

        for(var i=0; i< lines.length; i++) {
            var p2 = lines[i].p0;
            var p3 = lines[i].p1;

            var intersect = utils.lineIntersect(p0, p1, p2, p3, true);
            if(intersect)
            {
                utils.circle(context, intersect, 5, "red");
                return;
            }
        }


        requestAnimationFrame(update);
    }

    function drawLines() {
        for(var i=0; i< lines.length; i++) {
            utils.multiline(context, [lines[i].p0, lines[i].p1] );
        }
    }
};
