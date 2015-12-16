window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        drawCanvas = document.getElementById("drawCanvas"),
        drawContext = drawCanvas.getContext("2d"),
        width = canvas.width = drawCanvas.width = window.innerWidth,
        height = canvas.height = drawCanvas.height = window.innerHeight;

    /* globals Arm */
    var arm = Arm.create(width/2, height/2, 100, 0.1),
        angle = 0,
        arm2 = Arm.create(arm.getEndX(), arm.getEndY(), 100, 1.3),
        arm3 = Arm.create(arm2.getEndX(), arm2.getEndY(), 100, 1.3);

    arm2.parent = arm;
    arm3.parent = arm;

    drawContext.moveTo(arm3.getEndX(), arm3.getEndY());
    update();

    function update() {
        context.clearRect(0, 0, width, height);
        arm.angle = Math.sin(angle) * 1.2;

        arm2.angle = Math.cos(angle * 0.501) * 0.92;
        arm2.x = arm.getEndX();
        arm2.y = arm.getEndY();

        arm3.angle = Math.cos(angle * 1.5) * 1.34;
        arm3.x = arm2.getEndX();
        arm3.y = arm2.getEndY();


        angle += 0.05;
        arm.render(context);
        arm2.render(context);
        arm3.render(context);
        drawContext.lineTo(arm3.getEndX(), arm3.getEndY());
        drawContext.stroke();
        requestAnimationFrame(update);

    }

};
