window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        springPoint = particle.create(width / 2, height / 2, 0, 0),
        springPoint2 = particle.create(utils.randomRange(0, width),
                                       utils.randomRange(0, height)),
        weight = particle.create(Math.random() * width, Math.random() * height,
                                50, Math.random() * Math.PI * 2, 0.5),
        k = 0.1,
        springLength = 100;

    weight.radius = 20;
    weight.friction = 0.7 + Math.random() * 0.3;
    weight.addSpring(springPoint, k, springLength);
    weight.addSpring(springPoint2, k, springLength);

    springPoint.radius = 4;

    document.body.addEventListener("mousemove", function(event){
        springPoint.x = event.clientX;
        springPoint.y = event.clientY;
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        weight.update();

        weight.draw(context);
        springPoint.draw(context);

        context.beginPath();
        context.moveTo(springPoint.x, springPoint.y);
        context.lineTo(weight.x, weight.y);
        context.lineTo(springPoint2.x, springPoint2.y);
        context.stroke();

        requestAnimationFrame(update);
    }
};
