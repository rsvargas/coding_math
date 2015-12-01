var particle = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    gravity: null,
    mass: 1,
    radius: 0,
    bounce: -1,
    friction: 1,
    springs: null,
    gravitations: null,

    create: function(x, y, speed, direction, grav) {
        var obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        obj.vx = Math.cos(direction) * speed;
        obj.vy = Math.sin(direction) * speed;
        obj.gravity = grav || 0;
        obj.springs = [];
        obj.gravitations = [];
        return obj;
    },

    addGravitation: function(p) {
        this.removeGravitation(p);
        this.gravitations.push(p);
    },

    removeGravitation: function(p) {
        for(var i=0; i< this.gravitations.length; i++) {
            if( p === this.gravitations[i]) {
                this.gravitations.splice(i, 1);
                return;
            }
        }
    },

    addSpring: function(point, k, length) {
        this.removeSpring(point);
        this.springs.push({
            point: point,
            k: k,
            length: length || 0
        });
    },

    removeSpring: function(point) {
        for(var i=0; i< this.springs.length; i++) {
            if(point === this.springs[i].point) {
                this.springs.splice(i,1);
                return;
            }
        }
    },

    getSpeed: function() {
        return Math.sqrt(this.vx * this.vx + this.vy + this.vy);
    },

    setSpeed: function(speed) {
        var heading = this.getHeading();
        this.setSpeedHeading(speed, heading);
    },

    getHeading: function() {
        return Math.atan2(this.vy, this.vx);
    },

    setHeading: function(heading) {
        var speed = this.getSpeed();
        this.setSpeedHeading(speed, heading);
    },

    setSpeedHeading: function(speed, heading) {
        this.vx = Math.cos(heading) * speed;
        this.vy = Math.sin(heading) * speed;
    },

    accelerate: function(ax, ay) {
        this.vx += ax;
        this.vy += ay;
    },

    update: function() {
        this.handleSprings();
        this.handleGravitations();
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
    },

    handleSprings: function() {
        for(var i=0; i< this.springs.length; i++) {
            var spring = this.springs[i];
            this.springTo( spring.point, spring.k, spring.length);
        }
    },

    handleGravitations: function() {
        for(var i=0; i< this.gravitations.length; i++) {
            this.gravitateTo( this.gravitations[i]);
        }
    },

    angleTo: function(p2) {
        return Math.atan2(p2.y - this.y, p2.x - this.x);
    },

    distanceTo: function(p2) {
        var dx = p2.x - this.x;
        var dy = p2.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    },

    gravitateTo: function(p2) {
        var dx = p2.x - this.x,
            dy = p2.y - this.y,
            distSQ = dx * dx + dy * dy,
            dist = Math.sqrt(distSQ),
            force = p2.mass / distSQ;
        this.vx += dx / dist * force;
        this.vy += dy / dist * force;

    },

    springTo: function(point, k, length) {
        var dx = point.x - this.x,
            dy = point.y - this.y,
            distance = Math.sqrt(dx*dx + dy*dy),
            springForce = (distance - (length || 0)) * k;
        this.vx += dx / distance * springForce;
        this.vy += dy / distance * springForce;
    },

    draw: function(ctx, color) {
        ctx.beginPath();
        ctx.fillStyle = color || "#000";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    },

    drawLineTo: function(ctx, p1, color) {
        ctx.beginPath();
        ctx.strokeStyle = color || "#000";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
    },

};
