window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;


    function randomParticle() {
        var p = particle.create(
            utils.randomRange(0, width),
            utils.randomRange(0, height),
            0, 0 );
        p.radius = 3;
        return p;
    }

    var p0 = randomParticle(),
        p1 = randomParticle(),
        p2 = randomParticle(),
        p3 = randomParticle();

    p0.draw(context, "green");
    p1.draw(context, "blue");
    p2.draw(context, "blue");
    p3.draw(context, "green");

    context.beginPath();
    context.strokeStyle = "black";
    context.moveTo(p0.x, p0.y);
    context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    context.stroke();

    context.beginPath();
    context.strokeStyle = "red";
    utils.multicurve([p0, p1, p2, p3], context);
    context.stroke();

};
