window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        sun1 = particle.create(300, 200, 0, 0),
        sun2 = particle.create(800, 600, 0, 0),
        emitter = {
            x: 100,
            y: 0
        },
        particles = [],
        numParticles = 100;


    sun1.mass = 10000;
    sun1.radius = 10;
    sun2.mass = 20000;
    sun2.radius = 20;

    for(var i=0; i< numParticles; i++) {
        var p = particle.create(emitter.x, emitter.y,
                    utils.randomRange(7, 8),
                    Math.PI/2 + utils.randomRange(-0.1, 0.1));
        p.addGravitation(sun1);
        p.addGravitation(sun2);
        p.radius=3;
        p.color = "#" + Math.floor(utils.randomRange(0, 0xFFFFFF)).toString(16);
        particles.push(p);
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        sun1.draw(context, "yellow");
        sun2.draw(context, "red");

        for(var i=0; i< particles.length; i++) {
            var p = particles[i];
            p.update();
            p.draw(context, p.color);

            if( p.x > width + 300 ||  p.x < -300 ||
                p.y > height + 300 || p.y < -300 )
            {
                p.x = emitter.x;
                p.y = emitter.y;
                p.setSpeedHeading(utils.randomRange(1, 8),
                    Math.PI/2 + utils.randomRange(-0.3, 0.3));

            }

        }


        requestAnimationFrame(update);
    }
};
