window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ship = particle.create(width / 2, height / 2, 0, 0),
        thrust = vector.create(0, 0),
        angle = 0,
        turningLeft = false,
        turningRight = false,
        thrusting = false;

    update();

    document.body.addEventListener("keydown", function(event) {
        //console.log('keydown', event.keyCode);
        switch(event.keyCode) {
            case 38:  //up
                thrusting = true;
                break;

            // case 40: //down
            //     thrust.y = 0.1;
            //     break;
            //
            case 37:  //left
                turningLeft = true;
                break;

            case 39: //right
                turningRight = true;
                break;

            default:
                break;
        }
    });

    document.body.addEventListener("keyup", function(event) {
        //console.log('keyup', event.keyCode);
        switch(event.keyCode) {
            case 38:  //up
                thrusting = false;
                break;

            // case 40: //down
            //     thrust.y = 0;
            //     break;
            //
            case 37:  //left
                turningLeft = false;
                break;

            case 39: //right
                turningRight = false;
                break;

            default:
                break;
        }
    });

    function update() {
        context.clearRect(0, 0, width, height);

        if(turningLeft) {
            angle -= 0.05;
        }
        if(turningRight) {
            angle += 0.05;
        }

        thrust.setAngle(angle);
        if(thrusting) {
            thrust.setLength(0.1);
        } else {
            thrust.setLength(0);
        }


        ship.accelerate(thrust);
        ship.update();

        context.save();
        context.translate(ship.position.x, ship.position.y);
        context.rotate(angle);

        context.beginPath();
        context.moveTo(10,0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        if(thrusting) {
            context.moveTo(-10, 0);
            context.lineTo(-18, 0);
        }
        context.stroke();

        context.restore();

        // context.beginPath();
        // context.arc(100,100, 10, 0, Math.PI * 2, false);
        // context.fill();

        if(ship.position.x > width) {
            ship.position.x = 0;
        }
        if(ship.position.x < 0) {
            ship.position.x = width;
        }
        if(ship.position.y > height) {
            ship.position.y = 0;
        }
        if(ship.position.y < 0) {
            ship.position.y = height;
        }

        requestAnimationFrame(update);
    }
}
