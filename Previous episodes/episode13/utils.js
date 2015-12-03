var utils =  {
    norm: function(val, min, max) {
        return (val - min) / (max - min);
    },

    lerp: function(norm, min, max) {
        return (max - min) * norm + min;
    },

    map: function(val, sourceMin, sourceMax, destMin, destMax) {
        var n = norm(value, sourceMin, sourceMax);
        return lerp(n, destMin, destMax);
    },

    clamp: function(val, min, max) {
        return Math.min(Math.max(val, min), max);
    },
}
