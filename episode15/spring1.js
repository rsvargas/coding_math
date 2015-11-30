window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        springPoint = particle.create(width / 2, height / 2, 0, 0),
        weight = particle.create(Math.random() * width, Math.random() * height,
                                50, Math.random() * Math.PI * 2),
        k = 0.01 + Math.random() * 0.5;

    weight.radius = 20;
    weight.friction = 0.5 + Math.random() * 0.5;

    springPoint.radius = 4;


    document.body.addEventListener("mousemove", function(event){
        springPoint.position.x = event.clientX;
        springPoint.position.y = event.clientY;
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        var distance = springPoint.position.subtract(weight.position),
            springForce = distance.multiply(k);

        weight.velocity.addTo(springForce);
        weight.update();

        weight.draw(context);
        springPoint.draw(context);

        context.beginPath();
        context.moveTo(weight.position.x, weight.position.y);
        context.lineTo(springPoint.position.x, springPoint.position.y)
        context.stroke();


        requestAnimationFrame(update);
    }
}
