var utils =  {
    norm: function(val, min, max) {
        return (val - min) / (max - min);
    },

    lerp: function(norm, min, max) {
        return (max - min) * norm + min;
    },

    map: function(val, sourceMin, sourceMax, destMin, destMax) {
        var n = utils.norm(val, sourceMin, sourceMax);
        return utils.lerp(n, destMin, destMax);
    },

    clamp: function(val, min, max) {
        return Math.min(Math.max(val, Math.min(min, max)), Math.max(min, max));
    },

    distance: function(p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx*dx + dy*dy);
    },

    distanceXY: function(x0, y0, x1, y1) {
        var dx = x1 - x0,
            dy = y1 - y0;
        return Math.sqrt(dx*dx + dy*dy);
    },

    circleCollision: function(c0, c1) {
        return utils.distance(c0, c1) <= c0.radius + c1.radius;
    },

    circlePointCollision: function(x, y, circle) {
        return utils.distanceXY(x, y, circle.x, circle.y ) < circle.radius;
    },

    pointInRect: function(x, y, rect) {
        return utils.inRange(x, rect.x, rect.x + rect.width ) &&
               utils.inRange(y, rect.y, rect.y + rect.height );
    },

    inRange: function(value, min, max) {
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    },

    rangeIntersect: function(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) &&
               Math.min(min0, max0) <= Math.max(min1, max1);
    },

    rectIntersect: function(r0, r1) {
        return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
               utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
    },

    randomRange: function(min, max) {
        return min + Math.random() * (max - min);
    },

    randomInt: function(min, max) {
        return Math.floor(utils.randomRange(min, max));
    },

    degreesToRads: function(degrees) {
        return degrees / 180 * Math.PI;
    },

    radsToDegrees: function(radians) {
        return radians * 180 / Math.PI;
    },

    roundToPlaces: function(value, places) {
        var mult = Math.pow(10, places);
        return Math.round(value * mult) / mult;
    },

    roundNearest: function(value, nearest) {
        return Math.round(value / nearest ) * nearest;
    },

    randomDist: function(min, max, iterations) {
        var total = 0;

        for(var it=0; it< iterations; it++) {
            total += utils.randomRange(min, max);
        }
        return total / iterations;
    },

    quadraticBezier: function(p0, p1, p2, t, pFinal) {
        // gets the 't' point between p0 and p1, then
        // the 't' point between p1 and p2, and then
        // the 't' point, between those two points.
        // with:  0 <= t <= 1
        // The formula is: (1-t)^2 *p0.x  + (1-t)*2*p1.x +  t^2 * p2.x  (and the same for y)
        pFinal = pFinal || {};

        var a = 1 - t,
            b = a * a,
            c = a*2*t,
            d = t*t;

        pFinal.x = b*p0.x + c*p1.x + d*p2.x;
        pFinal.y = b*p0.y + c*p1.y + d*p2.y;
        return pFinal;
    },

    cubicBezier: function(p0, p1, p2, p3, t, pFinal) {
        //the same as the quadratic, but with an extra interpolation step.
        // The formula is:
        // (1-t)^3 * p0.x +  (1-t)^2 * 3*t*p1.x +  (1-t) *3*t^2 * p2.x + t^3 * p3.x
        pFinal = pFinal || {};
        var a = 1 - t,
            b = a * a,
            c = b * a,
            d = b * 3 * t,
            e = t * t,
            f = a * 3 * e,
            g = e * t;
        pFinal.x = c*p0.x + d*p1.x + f*p2.x + g*p3.x;
        pFinal.y = c*p0.y + d*p1.y + f*p2.y + g*p3.y;
        return pFinal;
    },

    multicurve: function(points, context) {
        var p0, p1, midx, midy;

        context.moveTo(points[0].x, points[0].y);
        for(var i = 1; i< points.length - 2; i+=1) {
            p0 = points[i];
            p1 = points[i+1];
            midx = (p0.x + p1.x) / 2;
            midy = (p0.y + p1.y) / 2;
            context.quadraticCurveTo(p0.x, p0.y, midx, midy );
        }
        p0 = points[points.length -2];
        p1 = points[points.length -1];
        context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
    },

    circle: function(ctx, point, radius, style, alpha) {
        ctx.beginPath();
        ctx.globalAlpha = (alpha === null) ? 1 : alpha;
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = style || "black";
        ctx.fill();
    },
};
