var particle = {
    position: null,
    velocity: null,
    gravity: null,
    mass: 1,


    create: function(x, y, speed, direction, grav) {
        var obj = Object.create(this);
        obj.position = vector.create(x, y);
        obj.velocity = vector.create(0, 0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.gravity = vector.create(0, grav || 0);
        return obj;
    },

    accelerate: function(accel) {
        this.velocity.addTo(accel);
    },

    update: function() {
        this.velocity.addTo(this.gravity);
        this.position.addTo(this.velocity);
    },

    angleTo: function(p2) {
        return Math.atan2(p2.position.y - this.position.y, p2.position.x - this.position.x);
    },

    distanceTo: function(p2) {
        var dx = p2.position.x - this.position.x;
        var dy = p2.position.y - this.position.y;

        return Math.sqrt(dx * dx + dy * dy);
    },

    gravitateTo: function(p2) {
        var grav = vector.create(0, 0);
        var dist = this.distanceTo(p2);

        grav.setLength(p2.mass / (dist * dist));
        grav.setAngle(this.angleTo(p2));

        this.velocity.addTo(grav);
    }
}
