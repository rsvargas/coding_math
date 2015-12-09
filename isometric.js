window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        tileWidth = 60,
        tileHeight = 30;

    context.translate(width/2, 50);

    var img = document.createElement("img");
    img.addEventListener("load", function(){
        draw();
    });
    img.src = "tileset.png";

    function draw() {
        for(var x=0; x<25; x++) {
            for(var y = 0; y< 25; y++) {
                drawImageTile(x, y, Math.floor(Math.random()*16));
                //drawBlock(x, y, Math.random()*4);
            }
        }
    }
    // drawBlock(0, 0, 2);
    // drawBlock(1, 0, 0);
    // drawBlock(2, 0, 2);

    function drawImageTile(x, y, index) {
        var halfWidth = tileWidth/2;
        var halfHeight = tileHeight/2;
        //var zshift = z * tileHeight;

        var sx = (x - y) * halfWidth;
        var sy = (x + y) * halfHeight;// + (index<4 ? 2: 0);
        context.drawImage(img, index*tileWidth, 0, tileWidth, img.height,
            sx-halfWidth, sy, tileWidth, img.height);
    }


    function drawBlock(x, y, z) {
        var top =   "#eeeeee";
        var left =  "#999999";
        var right = "#dddddd";

        var halfWidth = tileWidth/2;
        var halfHeight = tileHeight/2;
        var zshift = z * tileHeight;
        var sx = (x - y) * halfWidth;
        var sy = (x + y) * halfHeight;

        //top face
        context.beginPath();
        context.moveTo(sx, sy - zshift);
        context.lineTo(sx+halfWidth, sy+halfHeight- zshift);
        context.lineTo(sx, sy+tileHeight-zshift);
        context.lineTo(sx-halfWidth, sy+halfHeight- zshift);
        context.closePath();
        context.fillStyle = top;
        context.fill();

        //left face
        context.beginPath();
        //sy = sy + tileHeight;
        context.moveTo(sx-halfWidth, sy+halfHeight - zshift);
        context.lineTo(sx, sy+tileHeight-zshift);
        context.lineTo(sx, sy+tileHeight);
        context.lineTo(sx-halfWidth, sy+halfHeight);
        context.closePath();
        context.fillStyle = left;
        context.fill();

        //right face
        context.beginPath();
        context.moveTo(sx+halfWidth, sy+halfHeight - zshift);
        context.lineTo(sx, sy+tileHeight-zshift);
        context.lineTo(sx, sy+tileHeight);
        context.lineTo(sx+halfWidth, sy+halfHeight);
        context.closePath();
        context.fillStyle = right;
        context.fill();
    }

    function drawTile(x, y, color) {
        var halfWidth = tileWidth/2;
        var halfHeight = tileHeight/2;
        var sy = (x + y) * halfHeight;
        var sx = (x - y) * halfWidth;
        context.beginPath();
        context.moveTo(sx, sy);
        context.lineTo(sx+halfWidth, sy+halfHeight);
        context.lineTo(sx, sy+tileHeight);
        context.lineTo(sx-halfWidth, sy+halfHeight);
        context.closePath();
        context.fillStyle = color;
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
