window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        springPoint = particle.create(width / 2, height / 2, 0, 0),
        weight = particle.create(Math.random() * width, Math.random() * height,
                                50, Math.random() * Math.PI * 2, 0.5),
        k = 0.1,
        springLength = 100;

    weight.radius = 20;
    weight.friction = 0.5 + Math.random() * 0.5;

    springPoint.radius = 4;

    document.body.addEventListener("mousemove", function(event){
        springPoint.x = event.clientX;
        springPoint.y = event.clientY;
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        var dx = springPoint.x - weight.x,
            dy = springPoint.y - weight.y,
            distance = Math.sqrt(dx*dx + dy*dy),
            springForce = (distance - springLength) * k,
            ax = dx / distance * springForce,
            ay = dy / distance * springForce;

        weight.vx += ax;
        weight.vy += ay;

        weight.update();

        weight.draw(context);
        springPoint.draw(context);

        context.beginPath();
        context.moveTo(weight.x, weight.y);
        context.lineTo(springPoint.x, springPoint.y)
        context.stroke();

        requestAnimationFrame(update);
    }
}
