window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var p0 = { x: width/2, y: height -50 },
        p1 = { x: width/2, y: 50 },
        branchAngleA = utils.randomRange(-Math.PI/2, Math.PI/2),
        branchAngleB = utils.randomRange(-Math.PI/2, Math.PI/2),
        trunkRatio = utils.randomRange(0.25, 0.6);

    var limit = -1;
    // document.body.addEventListener("click", function(event) {
    //     treeUp();
    // });


    function treeUp()
    {
        limit++;

        // //koch snowflake
        // context.clearRect(-width/2, -height/2, width, height);
        context.clearRect(0, 0, width, height);
        context.fillText("Limit = " + limit, -width/2+10, -height/2+10);
        drawGrid(100);
        tree(p0, p1, trunkRatio, branchAngleA, branchAngleB, limit);
        // koch(p1, p2, limit); //cock snowflake only
        // koch(p2, p0, limit);

        if(limit > 6) {

            limit = 0;
            branchAngleA = utils.randomRange(-Math.PI/2, Math.PI/2);
            branchAngleB = utils.randomRange(-Math.PI/2, Math.PI/2);
            trunkRatio = utils.randomRange(0.25, 0.6);
            setTimeout(treeUp, 5000);
        }
        else {
            setTimeout(treeUp, 500);
        }
    }

    treeUp();

    function drawGrid(size) {
        var i;
        size = size || 100;

        //collumns
        for(i=size; i<width; i+= size) {
            utils.multiline(context, [{x:i, y:0}, {x:i, y:width}], {style: "lightgray"});
        }
        //lines
        for(i=size; i<height; i+= size) {

            utils.multiline(context, [{x:0, y:i}, {x:width, y:i}], {style: "lightgray"});
        }
    }

    function tree(p0, p1, ratio, angleA, angleB, limit) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            unit = dist * (1 - ratio),
            angle = Math.atan2(dy, dx),
            pA = { //pA and pC are colinear with p0 and p1
                x: p0.x + dx * ratio,
                y: p0.y + dy * ratio
            },
            pB = {
                x: pA.x + Math.cos(angle + angleA) * unit,
                y: pA.y + Math.sin(angle + angleA) * unit
            },
            pC = {
                x: pA.x + Math.cos(angle + angleB) * unit,
                y: pA.y + Math.sin(angle + angleB) * unit
            };
        // utils.circle(context, p0, 5);
        // utils.circle(context, p1, 5);
        // utils.circle(context, pA, 5);
        // utils.circle(context, pB, 5, { style: "red"});
        // utils.circle(context, pC, 5, { style: "red"});
        //
        // console.log(limit, "0("+p0.x+","+p0.y+") - A("+pA.x+","+pA.y+") - B("+pB.x+","+pB.y+") - C("+pC.x+","+pC.y+")");
        utils.multiline(context, [p0, pA]);
        if(limit > 0)
        {
            ratio += utils.randomRange(-0.05, 0.05);
            angleA += utils.randomRange(-0.05, 0.05);
            angleB += utils.randomRange(-0.05, 0.05);

            tree(pA, pB, ratio, angleA, angleB, limit -1 );
            tree(pA, pC, ratio, angleA, angleB, limit -1 );
        }
        else {
            utils.multiline( context, [pA, pB] );
            utils.multiline( context, [pA, pC] );
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
