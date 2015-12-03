window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        sun = particle.create(width/2, height/2, 0, 0),
        planet = particle.create(width/2 + 200, height/2, 10, -Math.PI / 2);

    sun.mass = 20000;
    sun.radius = 20;
    planet.radius = 4;

    update();

    function update() {
        //context.clearRect(0, 0, width, height);

        planet.gravitateTo(sun);
        planet.update();

        sun.draw(context, "#ffff00");
        planet.draw(context, "#0000ff");

        requestAnimationFrame(update);
    }
}
