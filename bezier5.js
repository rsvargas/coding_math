window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        points = [],
        numPoints = utils.randomRange(5,10);

    function randomParticle() {
        var p = particle.create(
            utils.randomRange(0, width),
            utils.randomRange(0, height),
            0, 0 );
        p.radius = 3;
        return p;
    }

    for(var i=0; i< numPoints; i++) {
        var p = randomParticle();
        points.push(p);
        p.draw(context);
    }

    context.strokeStyle = "lightgray";
    context.moveTo(points[0].x, points[0].y);
    for(var i=1; i< numPoints; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();

    context.beginPath();
    context.strokeStyle = "black";
    utils.multicurve(points, context);
    context.stroke();

};
