window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    function randomParticle() {
        var p = particle.create(
            utils.randomRange(0, width),
            utils.randomRange(0, height),
            0, 0 );
        p.radius = 10;
        return p;
    }

    var p0 = randomParticle(),
        p1 = randomParticle(),
        p2 = randomParticle(),
        p3 = randomParticle();

    var handles = [ p0, p1, p2, p3 ];
    var offset = {};
    var isDragging = false;
    var dragHandle;


    draw();

    function draw() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        context.stroke();

        for(var i=0; i< handles.length; i++){
            if(isDragging && dragHandle == i) {
                context.shadowColor = "black";
                context.shadowOffsetX = 4;
                context.shadowOffsetY = 4;
                context.shadowBlur = 8;
            }
            handles[i].draw(context, "gray");
            context.shadowColor = null;
            context.shadowOffsetX = null;
            context.shadowOffsetY = null;
            context.shadowBlur = null;
        }

    }


    document.body.addEventListener("mousedown", function(event) {
        for( var i=0; i< handles.length; i++) {
            if(utils.circlePointCollision(event.clientX, event.clientY, handles[i]))
            {
                console.log('hit', i);
                document.body.addEventListener("mousemove", onMouseMove);
                document.body.addEventListener("mouseup", onMouseUp);
                offset.x = event.clientX - handles[i].x;
                offset.y = event.clientY - handles[i].y;
                dragHandle = i;
                isDragging = true;
                break;
            }
        }
    });

    function onMouseMove(event){
        handles[dragHandle].x = event.clientX - offset.x;
        handles[dragHandle].y = event.clientY - offset.y;
        draw();
    }

    function onMouseUp(event) {
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
        isDragging = false;
        draw();
    }

};
