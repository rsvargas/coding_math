window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    function randomParticle() {
        var p = particle.create(
            utils.randomRange(200, width-200),
            utils.randomRange(200, height-200),
            0, 0 );
        p.radius = 3;
        return p;
    }


    var p0 = randomParticle(),
        p1 = randomParticle(),
        p2 = randomParticle(),
        cp = particle.create(
            p1.x*2 - (p0.x + p2.x)/2,
            p1.y*2 - (p0.y + p2.y)/2,
            0, 0);
        cp.radius = 3;

    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
    context.stroke();

    p0.drawLineTo(context, cp, "lightgray");
    p2.drawLineTo(context, cp, "lightgray");

    p0.draw(context);
    p1.draw(context, "green");
    p2.draw(context);
    cp.draw(context, "red");

};
