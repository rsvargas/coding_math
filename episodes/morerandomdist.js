window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        centerX = width / 2,
        centerY = height /2,
        maxXRadius = 300,
        maxYRadius  = 100;

    for( var i = 0; i < 1000; i++) {
        var xradius = utils.randomRange(0, maxXRadius);
        var yradius = utils.randomRange(0, maxYRadius);
        var angle = utils.randomRange(0, Math.PI * 2);
        var x = centerX + Math.cos(angle)*xradius;
        var y = centerY + Math.sin(angle)*yradius;

        context.beginPath();
        context.arc(x, y, 1, 0, Math.PI * 2, false);
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
