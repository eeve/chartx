KISSY.add('dvix/chart/progress/index-min', function (a, b, c) {
    b.Canvax;
    return b.extend({
        config: {
            secW: 10,
            bColor: '#E6E6E6',
            pColor: '#8d76c4'
        },
        init: function (a, b) {
            this._initConfig(b), this.r = Math.min(this.width, this.height) / 2;
        },
        _initConfig: function (a) {
            _.extend(this.config, a);
        },
        draw: function (a) {
            this._initConfig(a), this.stage.addChild(new c({
                context: {
                    x: this.height / 2,
                    y: this.width / 2,
                    r: this.r,
                    r0: this.r - this.config.secW,
                    startAngle: 0,
                    endAngle: 359.999,
                    fillStyle: this.config.bColor,
                    lineJoin: 'round'
                }
            })), this.stage.addChild(new c({
                id: 'speed',
                context: {
                    x: this.height / 2,
                    y: this.width / 2,
                    r: this.r,
                    r0: this.r - this.config.secW,
                    startAngle: 0,
                    endAngle: 1,
                    fillStyle: this.config.pColor,
                    lineJoin: 'round'
                }
            }));
        },
        setSpeed: function (a) {
            this.stage.getChildById('speed').context.endAngle = a;
        }
    });
}, {
    requires: [
        'dvix/chart/',
        'canvax/shape/Sector'
    ]
});