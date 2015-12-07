window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var points = [],
        sticks = [],
        forms = [],
        images = [],
        bounce = 0.9,
        gravity = 0.5;
        friction = 0.999;

    points.push({ x: 100, y: 100, oldx: 100 + Math.random()*60 - 30, oldy: 100 + Math.random()*60 - 30 });
    points.push({ x: 420, y: 100, oldx: 420, oldy: 100 });
    points.push({ x: 420, y: 340, oldx: 420, oldy: 340 });
    points.push({ x: 100, y: 340, oldx: 100, oldy: 340 });


    sticks.push({
        p0: points[0], p1: points[1],
        length: utils.distance(points[0], points[1]),
        color: "red",
        width: 5
    });
    sticks.push({
        p0: points[1], p1: points[2],
        length: utils.distance(points[1], points[2])
    });
    sticks.push({
        p0: points[2], p1: points[3],
        length: utils.distance(points[2], points[3])
    });
    sticks.push({
        p0: points[3], p1: points[0],
        length: utils.distance(points[3], points[0])
    });
    sticks.push({
        p0: points[0], p1: points[2],
        length: utils.distance(points[0], points[2]),
        hidden : true,
    });

    forms.push({
        path: [
            points[0],
            points[1],
            points[2],
            points[3],
        ],
        color: "green"
    });

    images.push({
        path: [
            points[0],
            points[1],
            points[2],
            points[3],
        ],
        img: loadImage("cat.jpg")
    });

    function loadImage(url) {
        var img = document.createElement("img");
        img.src = url;
        return img;
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        updatePoints();
        for(var i=0; i< 5; i++){
            updateSticks();
            constrainPoints();
        }
        //renderPoints();
        //renderSticks();
        renderForms();
        renderImages();

        requestAnimationFrame(update);
    }

    function updatePoints() {
        for(var i=0; i< points.length; i++) {
            var p = points[i],
                vx = (p.x - p.oldx) * friction,
                vy = (p.y - p.oldy) * friction;

            p.oldx = p.x;
            p.oldy = p.y;
            p.x += vx;
            p.y += vy;
            p.y += gravity;

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

    function constrainPoints() {
        for(var i=0; i< points.length; i++) {
            var p = points[i],
                vx = (p.x - p.oldx) * friction,
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

            s.p0.x -= offsetX;
            s.p0.y -= offsetY;
            s.p1.x += offsetX;
            s.p1.y += offsetY;

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

    function renderForms() {
        for(i=0; i< forms.length; i++) {
            var f = forms[i];
            utils.multiline(context, f.path, {
                filled: true,
                style: f.color
            });
        }
    }

    function renderImages() {
        for(i=0; i< images.length; i++) {
            var img = images[i];
            if(img.img) {
                context.save();
                context.translate(img.path[0].x, img.path[0].y);

                var w = utils.distance(img.path[1], img.path[0]),
                    h = utils.distance(img.path[3], img.path[0]),
                    dx = img.path[1].x - img.path[0].x,
                    dy = img.path[1].y - img.path[0].y,
                    angle = Math.atan2(dy, dx);

                context.rotate(angle);
                context.drawImage(img.img, 0, 0, w, h);
                context.restore();
            }
        }
    }



};
