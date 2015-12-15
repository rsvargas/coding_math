window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        characterCanvas = document.getElementById("characterCanvas"),
        characterContext  = characterCanvas.getContext("2d"),
        width = canvas.width = characterCanvas.width = window.innerWidth,
        height = canvas.height = characterCanvas.height = window.innerHeight,
        tileWidth = 60,
        tileHeight = 30,
        charX = 0.5,
        charY = 9.5;

    context.translate(width/2, 50);
    characterContext.translate(width/2, 50);

    var grid = [
		[15, 15, 15, 14, 13, 10, 3, 2, 1, 0],
		[15, 15, 14, 13, 10, 10, 3, 2, 1, 0],
		[15, 14, 13, 10, 10, 3, 3, 2, 1, 0],
		[14, 13, 10, 9, 3, 3, 2, 1, 0, 0],
		[13, 10, 9, 7, 3, 2, 1, 0, 0, 0],
		[10, 9, 7, 6, 3, 2, 1, 0, 0, 0],
		[9, 7, 6, 5, 3, 2, 1, 1, 1, 1],
		[7, 6, 5, 3, 3, 2, 2, 2, 2, 2],
		[6, 5, 5, 3, 3, 3, 3, 3, 3, 3],
		[5, 5, 5, 5, 5, 5, 5, 5, 5, 3]
	];


    var img = document.createElement("img");
    img.addEventListener("load", function(){
        draw();
    });
    img.src = "tileset.png";

    var character = document.createElement("img");
    character.addEventListener("load", function(){
        drawCharacter(character, charX, charY);
        document.body.addEventListener("keydown", moveCharacter);
    });
    character.src = "ball.png";

    function drawCharacter(image, x, y) {
        var halfWidth = tileWidth/2;
        var halfHeight = tileHeight/2;
        //var zshift = z * tileHeight;

        var cx = (x - y) * halfWidth;
        var cy = (x + y) * halfHeight;
        characterContext.clearRect(-width/2, -50, width, height);

        characterContext.drawImage(image, cx -image.width/2, cy - image.height);
    }

    function moveCharacter(event) {
        switch(event.keyCode) {
            case 37: //left
                if(canMove(charX - 1, charY))
                {
                    charX--;
                    drawCharacter(character, charX, charY);
                }
                break;
            case 38: //up
                if(canMove(charX, charY - 1))
                {
                    charY--;
                    drawCharacter(character, charX, charY);
                }
                break;
            case 39: //right
                if(canMove(charX + 1, charY))
                {
                    charX++;
                    drawCharacter(character, charX, charY);
                }
                break;
            case 40: //down
                if(canMove(charX, charY + 1))
                {
                    charY++;
                    drawCharacter(character, charX, charY);
                }
                break;
        }
    }

    function canMove(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if( y < 0 || y>=grid.length) {
            return false;
        }
        if( x < 0 || x>=grid[y].length) {
            return false;
        }
        var tile = grid[y][x];
        if( tile < 4 || tile > 14) {
            return false;
        }
        return true;
    }

    function draw() {
        for(var y=0; y<grid.length; y++) {
            var row = grid[y];
            for(var x = 0; x< row.length; x++) {
                drawImageTile(x, y, row[x]);
                //drawBlock(x, y, row[x]);
                //drawTile(x, y, row[x]);
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
        var sy = (x + y) * halfHeight - 11;// + (index<4 ? 5: 0);
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
