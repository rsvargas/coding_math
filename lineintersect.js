window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var p0 = {x: 100, y: 100};
    var p1 = {x: 500, y: 500};
    var p2 = {x: 600, y: 50};
    var p3 = {x: 80, y: 600};


    utils.multiline(context, [p0, p1]);
    utils.multiline(context, [p2, p3]);

    var intersect = lineIntersect(p0, p1, p2, p3);

    utils.circle(context, intersect, 10);

    function lineIntersect(p0, p1, p2, p3) {
        var A1 = p1.y - p0.y;
        var B1 = p0.x - p1.x;
        var C1 = A1 * p0.x + B1* p0.y;
        var A2 = p3.y - p2.y;
        var B2 = p2.x - p3.x;
        var C2 = A2 * p2.x + B2* p2.y;
        var denominator = A1* B2 - A2 * B1;
        return {
            x: (B2*C1 - B1*C2) / denominator,
            y: (A1*C2 - A2*C1) / denominator,
        };
    }

    function update() {
        context.clearRect(0, 0, width, height);

        requestAnimationFrame(update);
    }
};
