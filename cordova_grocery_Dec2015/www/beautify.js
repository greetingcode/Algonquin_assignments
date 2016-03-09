// This code is written by "". I forked it from Codepen.io. This is its url. This is not my own creation but I wanted to use it to polish my application.

window.addEventListener('load', function () {
    var velocity = 5;

    function Drop (x, speed, acc) {
        this.x = x;
        this.y = 0;
        this.speed = speed;
        this.acc = acc;
    }

    Drop.prototype.tick = function() {
        this.speed += this.acc;
        this.y += this.speed;
    }

    function updateArray (array, length, generator) {
        var diff = length - array.length;

        if (diff < 0) {
            array.splice(length);
        } else {
            while (diff--) {
                array.push(generator(array.length));
            }
        }
    }

    function random (from, to) {
        return Math.random() * (to - from) + from;
    }


    function resize () {
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;
        ctx.fillStyle = colors.prev;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.fillStyle = colors.current;

        updateArray(drops, cvs.width, function (x) {
            var prevDrop = drops[x - 1];
            var prevSpeed = prevDrop && prevDrop.speed || velocity;
            var speed = Math.max(velocity * 0.75, Math.min(velocity * 1.25, random(prevSpeed - 0.1, prevSpeed + 0.1)));

            return new Drop(x, speed,  random(0, Math.abs(prevSpeed - speed)/10));
        });
    }

    function render () {
        var i;
        var length = drops.length;
        var drop;

        var finished = 0;

        ctx.beginPath();

        for (i = 0; i < length; i++) {
            drop = drops[i];

            if (drop.y <= cvs.height) {
                drop.tick();
            } else {
                finished += 1;
            }

            ctx.fillRect(drop.x, 0, 1, Math.floor(drop.y));
        }
    }

    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    var drops = [];

    var colors = (function () {
        var colors = ['grey', '#7ab55c', 'BurlyWood', 'DarkSeaGreen'];
        var currentIndex = 1;

        return {
            prev: colors[0],
            current: colors[1],
            next: function () {
                this.prev = colors[currentIndex];
                currentIndex = (currentIndex + 1) % colors.length;
                this.current = colors[currentIndex];
            }
        };
    })();

    document.getElementById('addItem').addEventListener('click', function(key) {
            drops = [];
            colors.next();
            resize();
    });

    document.body.appendChild(cvs);
    window.addEventListener('resize', resize);

    requestAnimationFrame(function anim () {
        render();
        requestAnimationFrame(anim);
    });

    resize();
});