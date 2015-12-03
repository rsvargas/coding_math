function norm(val, min, max) {
    return (val - min) / (max - min);
}

function lerp(norm, min, max) {
    return (max - min) * norm + min;
}

function map(val, sourceMin, sourceMax, destMin, destMax) {
    var n = norm(value, sourceMin, sourceMax);
    return lerp(n, destMin, destMax);
}

function clamp(val, min, max) {
    return Math.min(Math.max(value, min), max);
}

function distance(p0, p1) {
    var dx = p1.x - p0.x,
        dy = p1.y - p0.y;
    return Math.sqrt(dx*dx + dy*dy);
}
