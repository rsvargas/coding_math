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
    pFinal.radius = 10;

    update();

    var t=0;
    var going = true;
    function update() {
        context.clearRect(0, 0, width, height);

        p0.draw(context, "cyan");
        p1.draw(context, "yellow");
        p2.draw(context, "red");
        p3.draw(context, "blue");

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        context.stroke();

        utils.cubicBezier(p0, p1, p2, p3, t, pFinal);
        pFinal.draw(context, "green");

        if(going){
            t += 0.01;
        } else {
            t -= 0.01;
        }
        if(  t < 0 || t > 1 ) {
            going = !going;
        }

        requestAnimationFrame(update);
    }

};
