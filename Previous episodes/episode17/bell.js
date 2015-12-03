window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context  = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        results = [];

    for(var i=0; i< width; i +=1) {
        results[i] = 0;
    }

    update();

    function update() {
        addResult();
        draw();
        requestAnimationFrame(update);
    }

    function addResult() {
        var repetitions = 50;
        for(var rep=0; rep < repetitions; rep++ )
        {
            var iterations = 5,
                total = 0;

            for(var it=0; it< iterations; it++) {
                total += utils.randomRange(0,width);
            }
            var m = Math.floor(total/iterations);
            results[m] += 1;
        }
    }

    function draw() {
        var w = 1;
        for(var i=0; i<results.length; i +=1) {
            var h = results[i] * -1;
            context.fillRect(w*i, height, w, h);
        }
    }
}
