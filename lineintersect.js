window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var p0 = {x: 100, y: 100, radius: 5};
    var p1 = {x: 600, y: 600, radius: 5};
    var p2 = {x: 600, y: 50, radius: 5};
    var p3 = {x: 80, y: 600, radius: 5};
    var points = [p0, p1, p2, p3];

    var pointDragging;
    var offset = {};

    draw();

    document.body.addEventListener("mousedown", function(event){
        for(var i=0; i< points.length; i++) {
            if( utils.circlePointCollision(event.clientX, event.clientY, points[i]) ) {
                pointDragging = points[i];
                offset.x = points[i].x - event.clientX;
                offset.y = points[i].y - event.clientY;
                document.body.addEventListener("mousemove", onMouseMove);
                document.body.addEventListener("mouseup", onMouseUp);
                break;
            }
        }
    });

    function onMouseMove(event) {
        pointDragging.x = event.clientX + offset.x;
        pointDragging.y = event.clientY + offset.y;
        draw();
    }

    function onMouseUp(event){
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
    }

    function draw() {
        context.clearRect(0, 0, width, height);

        utils.circle(context, p0, 5, "blue");
        utils.circle(context, p1, 5, "blue");
        utils.circle(context, p2, 5, "blue");
        utils.circle(context, p3, 5, "blue");

        utils.multiline(context, [p0, p1]);
        utils.multiline(context, [p2, p3]);

        var intersect = lineIntersect(p0, p1, p2, p3, true);
        if(intersect){
            utils.circle(context, intersect, 10);
        }
    }

    function lineIntersect(p0, p1, p2, p3, segment) {
        var A1 = p1.y - p0.y;
        var B1 = p0.x - p1.x;
        var C1 = A1 * p0.x + B1* p0.y;
        var A2 = p3.y - p2.y;
        var B2 = p2.x - p3.x;
        var C2 = A2 * p2.x + B2* p2.y;
        var denominator = A1* B2 - A2 * B1;
        if(denominator === 0) {
            return null;
        }
        var intersectX = (B2*C1 - B1*C2) / denominator;
        var intersectY = (A1*C2 - A2*C1) / denominator;
        if(segment){
            var rx0 = (intersectX - p0.x) / (p1.x - p0.x);
            var ry0 = (intersectY - p0.y) / (p1.y - p0.y);
            var rx1 = (intersectX - p2.x) / (p3.x - p2.x);
            var ry1 = (intersectY - p2.y) / (p3.y - p2.y);
            if( (rx0 < 0 || rx0 > 1 ) && (ry0 < 0 || ry0 > 1) ||
                (rx1 < 0 || rx1 > 1 ) && (ry1 < 0 || ry1 > 1)) {
                return null;
            }
        }

        return {x: intersectX, y: intersectY};

    }

};
