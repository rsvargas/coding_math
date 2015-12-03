window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,

        centerX = width / 2,
        centerY = height /2,
        radius = 200,
        angle = 0,
        numObjects = 30,
        slice = Math.PI * 2 / numObjects,
        x,y;


    for(var i=0; i< numObjects; i += 1)
    {
        angle = i * slice;
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2 , false);
        context.fill();
    }


}





/* animating
window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,

        centerX = width / 2,
        centerY = height /2,
        xRadius = 200,
        yRadius = 400,
        xAngle = 0,
        yAngle = 0,
        xSpeed = .1,
        ySpeed = .131,
        x,y;


    render();

    function render() {
        context.clearRect(0,0, width, height);
        x = centerX + Math.cos(xAngle) * xRadius;
        y = centerY + Math.sin(yAngle) * yRadius;
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2 , false);
        context.fill();

        xAngle += xSpeed;
        yAngle += ySpeed;
        requestAnimationFrame(render);
    }



}
*/
