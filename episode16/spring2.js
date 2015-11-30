window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particleA = particle.create(utils.randomRange(0, width),
                                    utils.randomRange(0, height),
                                    utils.randomRange(0, 50),
                                    utils.randomRange(0, Math.PI * 2), 0.5),
        particleB = particle.create(utils.randomRange(0, width),
                                    utils.randomRange(0, height),
                                    utils.randomRange(0, 50),
                                    utils.randomRange(0, Math.PI * 2), 0.5),
        particleC = particle.create(utils.randomRange(0, width),
                                    utils.randomRange(0, height),
                                    utils.randomRange(0, 50),
                                    utils.randomRange(0, Math.PI * 2), 0.5),
        k = 0.01,
        separation = 100;

    particleA.friction = 0.9;
    particleA.radius = 20;

    particleB.friction = 0.9;
    particleB.radius = 20;

    particleC.friction = 0.9;
    particleC.radius = 20;
    update();

    function update() {
        context.clearRect(0, 0, width, height);

        spring(particleA, particleB, separation);
        spring(particleB, particleC, separation);
        spring(particleC, particleA, separation);

        particleA.update();
        particleB.update();
        particleC.update();

        if(particleA.position.y + particleA.radius > height )
        {
            particleA.position.y = height - particleA.radius;
        }
        if(particleB.position.y + particleB.radius > height )
        {
            particleB.position.y = height - particleB.radius;
        }
        if(particleC.position.y + particleC.radius > height )
        {
            particleC.position.y = height - particleC.radius;
        }


        particleA.draw(context, "#f00");
        particleB.draw(context, "#0f0");
        particleC.draw(context, "#00f");

        context.beginPath();
        context.moveTo(particleA.position.x, particleA.position.y);
        context.lineTo(particleB.position.x, particleB.position.y);
        context.lineTo(particleC.position.x, particleC.position.y);
        context.lineTo(particleA.position.x, particleA.position.y);
        context.stroke();

        requestAnimationFrame(update);
    }

    function spring(p0, p1, separation) {
        var distance = p0.position.subtract( p1.position);
        distance.setLength(distance.getLength() - separation);

        var springForce = distance.multiply(k);

        p1.velocity.addTo(springForce);
        p0.velocity.subtractFrom(springForce);
    }
}
