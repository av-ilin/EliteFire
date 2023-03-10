class Range {
    ID = {
        wrapper: "range",
        track1: "track1",
        track2: "track2",
        text: "length",
    };
    PRICES = [1.12e5, 1.72e6, 99e3];

    constructor(minLen, maxLen, step) {
        this.wrapper = document.getElementById(this.ID.wrapper);
        this.track1 = document.getElementById(this.ID.track1);
        this.track2 = document.getElementById(this.ID.track2);
        this.text = document.getElementById(this.ID.text);

        this.checkpoints = [];
        let count = (maxLen - minLen) / step;
        for (let i = 0; i <= count; i++)
            this.checkpoints.push({
                length: i * step + minLen,
                percent: (100 / count) * i,
            });

        this.mouse = { X: null, Y: null };
        this.rect = this.getCoords();
        this.tid = 0;

        ["ontouchstart", "onmousedown"].forEach((e) => {
            this.wrapper[e] = function () {
                if (!this.tid)
                    this.tid = setInterval(() => this.thumbs.call(this), 100);
                return false;
            }.bind(this);
        });

        ["mouseup", "touchend"].forEach((e) => {
            window.addEventListener(
                e,
                function () {
                    if (this.tid) {
                        clearInterval(this.tid);
                        this.tid = 0;
                    }
                }.bind(this)
            );
        });

        window.addEventListener(
            "mousemove",
            function (e) {
                this.mouse.X = e.pageX;
                this.mouse.Y = e.pageY;
            }.bind(this)
        );

        window.addEventListener(
            "touchmove",
            function (e) {
                this.mouse.X = e.touches[0].pageX;
                this.mouse.Y = e.touches[0].pageY;
            }.bind(this)
        );

        window.addEventListener(
            "resize",
            function () {
                this.rect = this.getCoords();
            }.bind(this)
        );
    }

    thumbs() {
        let widthRange = this.rect.right - this.rect.left;
        let mouseX = Math.min(
            widthRange,
            Math.max(0, this.mouse.X - this.rect.left)
        );
        let percent = (mouseX / widthRange) * 100;
        let point = this.nearCheckPoint(percent);
        this.track1.style.width = `calc(${point.percent}% - 15px)`;
        this.track2.style.width = `calc(${100 - point.percent}% - 15px)`;
        this.text.textContent = `${point.length.toFixed(1)} ??`;
        priceItem.price = this.PRICES[Math.round(point.length) % 3];
    }

    nearCheckPoint(percent) {
        let checkpoint = {
            diff: Math.abs(this.checkpoints[0].percent - percent),
            length: this.checkpoints[0].length,
            percent: this.checkpoints[0].percent,
        };

        for (let point of this.checkpoints) {
            let diff = Math.abs(point.percent - percent);
            if (diff < checkpoint.diff) {
                checkpoint.diff = diff;
                checkpoint.length = point.length;
                checkpoint.percent = point.percent;
            }
        }
        return checkpoint;
    }

    getCoords() {
        let elem = this.wrapper;
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + window.pageYOffset,
            right: box.right + window.pageXOffset,
            bottom: box.bottom + window.pageYOffset,
            left: box.left + window.pageXOffset,
        };
    }
}
