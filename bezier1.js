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
        p.radius = 6;
        return p;
    }


    var p0 = randomParticle(),
        p1 = randomParticle(),
        p2 = randomParticle(),
        p3 = randomParticle();

    var pFinal = particle.create(0, 0, 0, 0);
    pFinal.radius = 3;

    update();

    var t=2;

    function update() {
        if(  t > 1 ) {
            context.clearRect(0, 0, width, height);

            p0 = randomParticle();
            p1 = randomParticle();
            p2 = randomParticle();
            p3 = randomParticle();

            p0.draw(context, "blue");
            p1.draw(context, "red");
            p2.draw(context, "red");
            p3.draw(context, "blue");

            context.beginPath();
            context.moveTo(p0.x, p0.y);
            context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
            context.stroke();

            t = 0;
        }

        utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
        pFinal.draw(context, "gray");

        t += 0.01;
        requestAnimationFrame(update);
    }

};
