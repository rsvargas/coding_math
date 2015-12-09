window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var branchAngleA = utils.randomRange(0, -Math.PI/2);

    function tree(x,y, size, angle, limit){
        // square formed by 4 points: p0(x,y), p1(x, y-size), p2(x+size, y-size), p3(x+size, y)
        // the pivot is at p0
        // p1 -- p2
        // |     |
        // p0 -- p3
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var sizecos = cos*size;
        var sizesin = sin*size;
        var p0 = {x: x, y: y};
        // rotation based on origin is:
        // x = x * cos(angle) - y * sin(angle)
        // y = y * cos(angle) + x * sin(angle)
        //we sum back the original do it can be drawed to the correct place
        var p1 = {
            x: x+ (sizesin),
            y: y- (sizecos)
        };
        var p2 = {
            x: x+ (size * (sin+cos)),
            y: y+ (size * (sin-cos))
        };
        var p3 = {
            x: x+ (sizecos),
            y: y+ (sizesin)
        };

        utils.multiline(context, [p0, p1, p2, p3, p0], {filled:true});

        if( limit >= 0) {
            var sizeA = Math.abs(Math.cos(branchAngleA) * size);
            var angleA = angle + branchAngleA;
            tree(p1.x, p1.y, sizeA, angleA, limit - 1);

            var xB = p1.x + Math.cos(angleA) * sizeA;
            var yB = p1.y + Math.sin(angleA) * sizeA;
            var sizeB = Math.abs(Math.sin(branchAngleA) * size);
            var angleB = angleA + Math.PI/2;
            tree(xB, yB, sizeB, angleB, limit - 1);
        }
    }

    tree(width/2-75, height, 150, 0, 6);


    branchAngleA = -Math.PI/1.5;

    var speed = 0.003;
    var val = 0;
    var up = true;
    var leap = 0;
    var debug = "roundtrip";

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        context.fillText("mode: " + debug, 10, 10);
        tree(width/2-75, height, 150, 0, 8);

        if( up ) {
            val += speed;
        } else {
            val -= speed;
        }

        if(val >= 1 || val <= 0) {
            if(leap !== 0){
                val += leap;
            }else {
                up = !up;
            }
        }
        branchAngleA = utils.lerp(val, -Math.PI/2, 0);

        requestAnimationFrame(update);
    }

    document.body.addEventListener("click", function(){
        if( leap !== 0) {
            debug = "roundtrip";
            leap = 0;
        } else {
            debug = "continous";
            leap = up? -1 : 1;
        }
    });
};
