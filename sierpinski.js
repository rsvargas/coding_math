window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    context.translate(width/2, height/2);
    var p0 = {x:   0, y:-321},
        p1 = {x: 278, y: 160},
        p2 = {x:-278, y: 160};

    sierpinski(p0, p1, p2, 7);

    function midPoint(p0, p1){
        return {
            x: (p0.x + p1.x)/2,
            y: (p0.y + p1.y)/2,
        };
    }

    function sierpinski(p0, p1, p2, limit) {
        if( limit > 0 ) {
            var pA = midPoint(p0, p1),
                pB = midPoint(p1, p2),
                pC = midPoint(p2, p0);

            sierpinski(p0, pA, pC, limit -1 );
            sierpinski(pA, p1, pB, limit - 1);
            sierpinski(pC, pB, p2, limit -1);
        }
        else {
            drawTriangle(p0, p1, p2);
        }
    }

    function drawTriangle(p0, p1, p2) {
        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.fill();

    }

    // update();
    //
    // function update() {
    //     context.clearRect(0, 0, width, height);
    //
    //     requestAnimationFrame(update);
    // }
};
