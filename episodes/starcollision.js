window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var star0 = {
        x: 200,
        y: 200,
        points: [
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
        ],
        offsets: [
            {x: 100, y: 0},
            {x: 40, y: 29},
            {x: 31, y: 95},
            {x: -15, y: 48},
            {x: -81, y: 59},
            {x: -50, y: 0},
            {x: -81, y: -59},
            {x: -15, y: -48},
            {x: 31, y: -95},
            {x: 40, y: -29},
        ],
    };
    var star1 = {
        x: 600,
        y: 200,
        points: [
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
        ],
        offsets: [
            {x: 100, y: 0},
            {x: 40, y: 29},
            {x: 31, y: 95},
            {x: -15, y: 48},
            {x: -81, y: 59},
            {x: -50, y: 0},
            {x: -81, y: -59},
            {x: -15, y: -48},
            {x: 31, y: -95},
            {x: 40, y: -29},
        ],
    };

    function draw(){
        context.clearRect(0, 0, width, height);
        updateStar(star0);
        updateStar(star1);

        if(checkStarCollision(star0, star1)) {
            color = "red";
        } else {
            color = "black";
        }
        drawStar(star0, color);
        drawStar(star1, color);
    }

    draw();


    document.body.addEventListener("mousemove", function(event){
        star0.x = event.clientX;
        star0.y = event.clientY;
        draw();
    });

    function checkStarCollision(starA, starB){
        for(var i=0; i< starA.points.length; i++) {
            var p0 = starA.points[i];
            var p1 = starA.points[(i+1) % starA.points.length];

            for(var j=0; j< starB.points.length; j++) {
                var p2 = starB.points[j];
                var p3 = starB.points[(j+1) % starB.points.length];

                if(lineIntersect(p0, p1, p2, p3, true)){
                    return true;
                }

            }
        }
        return false;
    }

    function updateStar(star) {
        for(var i=0; i< star.points.length; i++) {
            star.points[i].x = star.x + star.offsets[i].x;
            star.points[i].y = star.y + star.offsets[i].y;
        }
    }

    function drawStar(star, style) {
        style = style || "black";
        var points = [];
        for(var i=0; i< star.points.length; i++){
            points.push(star.points[i]);
        }
        points.push(points[0]);
        utils.multiline(context, points, {closed:true, filled:true, style: style});
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
