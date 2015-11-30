window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(width / 2, height / 2, 3, Math.random() * Math.PI * 2);

    p.radius = 50;

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        p.update();

        context.beginPath();
        context.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false);
        context.fill();

        if(p.position.x - p.radius > width) {
            p.position.x = 0 - p.radius;
        }
        if(p.position.x + p.radius< 0) {
            p.position.x = width + p.radius;
        }
        if(p.position.y - p.radius > height) {
            p.position.y = 0 - p.radius;
        }
        if(p.position.y + p.radius < 0) {
            p.position.y = height + p.radius;
        }

        requestAnimationFrame(update);
    }
}
