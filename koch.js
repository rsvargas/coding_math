window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    // //koch snowflake
    // context.translate( width/2, height / 2);

    //original values
    var p0 = { x: 100, y: height * 0.75 },
        p1 = { x: width -100, y: height * 0.75 };

    // //koch snowflake
    // var p0 = {x:   0, y:-321},
    //     p1 = {x: 278, y: 160},
    //     p2 = {x:-278, y: 160};


    var limit = -1;
    document.body.addEventListener("click", function(event) {
        kochItUp();
    });

    function kochItUp()
    {
        limit++;
        if(limit > 7) {
            limit = 0;
        }

        // //koch snowflake
        // context.clearRect(-width/2, -height/2, width, height);
        context.clearRect(0, 0, width, height);
        context.fillText("Limit = " + limit, -width/2+10, -height/2+10);
        koch(p0, p1, limit);
        // koch(p1, p2, limit); //cock snowflake only
        // koch(p2, p0, limit);
    }

    kochItUp();

    function koch(p0, p1, limit) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            unit = dist / 3,
            angle = Math.atan2(dy, dx),
            pA = { //pA and pC are colinear with p0 and p1
                x: p0.x + dx/3,
                y: p0.y + dy/3
            },
            pC = {
                x: p1.x - dx/3,
                y: p1.y - dy/3
            },
            pB = {
                x: pA.x + Math.cos(angle - Math.PI/3) * unit,
                y: pA.y + Math.sin(angle - Math.PI/3) * unit
            };
        if(limit > 0)
        {
            koch(p0, pA, limit -1);
            koch(pA, pB, limit -1);
            koch(pC, p1, limit -1);
            koch(pB, pC, limit -1);
        }
        else {
            utils.multiline( context, [p0, pA, pB, pC, p1] );
        }

    }

    // update();
    //
    // function update() {
    //     context.clearRect(0, 0, width, height);
    //
    //     requestAnimationFrame(update);
    // }
};
