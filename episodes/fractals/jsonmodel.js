window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var points = [],
        sticks = [],
        bounce = 0.9,
        gravity = 0.5,
        friction = 0.999;

    $.getJSON("model.json", function(data){
        parseModel(data);
    });

    function parseModel(data) {
        var i;
        for(i=0; i< data.points.length; i++) {
            points[i] = data.points[i];
        }
        for(i=0; i< data.sticks.length; i++) {
            var s = data.sticks[i];
            s.p0 = points[s.p0];
            s.p1 = points[s.p1];
            s.length = utils.distance(s.p0, s.p1);
            sticks[i] = s;
        }
        update();
    }

    function update() {
        //updateEngine();
        updatePoints();
        for(var i=0; i< 5; i++){
            updateSticks();
            constrainPoints();
        }
        context.clearRect(0, 0, width, height);
        //renderPoints();
        renderSticks();
        //renderEngine();
        requestAnimationFrame(update);
    }

    function updateEngine() {
        engine.x = engine.baseX + Math.cos(engine.angle) * engine.range;
        engine.y = engine.baseY + Math.sin(engine.angle) * engine.range;
        engine.angle += engine.speed;
    }

    function updatePoints() {
        for(var i=0; i< points.length; i++) {
            var p = points[i];
            if(!p.pinned){
                var vx = (p.x - p.oldx) * friction,
                    vy = (p.y - p.oldy) * friction;

                p.oldx = p.x;
                p.oldy = p.y;
                p.x += vx;
                p.y += vy;
                p.y += gravity;
            }
        }
    }

    function constrainPoints() {
        for(var i=0; i< points.length; i++) {
            var p = points[i];
            if(!p.pinned) {
                var vx = (p.x - p.oldx) * friction,
                    vy = (p.y - p.oldy) * friction;

                if(p.x > width) {
                    p.x = width;
                    p.oldx = p.x + vx * bounce;
                } else if(p.x < 0) {
                    p.x = 0;
                    p.oldx = p.x + vx * bounce;
                }

                if(p.y > height) {
                    p.y = height;
                    p.oldy = p.y + vy * bounce;
                } else if(p.y < 0) {
                    p.y = 0;
                    p.oldy = p.y + vy * bounce;
                }
            }
        }
    }

    function updateSticks() {
        for(var i=0; i< sticks.length; i++) {
            var s = sticks[i],
                dx = s.p1.x - s.p0.x,
                dy = s.p1.y - s.p0.y,
                distance = Math.sqrt(dx*dx + dy*dy),
                diff = s.length - distance,
                percent = diff / distance / 2,
                offsetX = dx * percent,
                offsetY = dy * percent;

            if(!s.p0.pinned) {
                s.p0.x -= offsetX;
                s.p0.y -= offsetY;

            }
            if(!s.p1.pinned) {
                s.p1.x += offsetX;
                s.p1.y += offsetY;
            }

        }
    }

    function renderPoints() {
        var i=0;
        for(i=0; i< points.length; i++) {
            var p = points[i];
            utils.circle(context, p, 5);
        }
    }

    function renderSticks() {
        for(i=0; i< sticks.length; i++) {
            var s = sticks[i];
            if(!s.hidden) {
                utils.multiline(context, [s.p0, s.p1], {
                    style: s.color ? s.color: "black",
                    width: s.width? s.width : 1
                });
            }
        }
    }

    function renderEngine() {
        // context.beginPath();
        // context.rect(engine.baseX - engine.range, engine.baseY - 5, engine.range * 2, 10);
        // context.stroke();
        utils.circle(context, {x:engine.baseX, y:engine.baseY}, engine.range, {filled:false});
        utils.circle(context, engine, 5, {style: "red"});

    }

    // document.body.addEventListener("click", function(event) {
    //     points[4].pinned = !points[4].pinned;
    // });


};
