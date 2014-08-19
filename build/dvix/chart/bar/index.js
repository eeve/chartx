KISSY.add('dvix/chart/bar/index', function (S, Chart, Tools, DataSection, EventType, xAxis, yAxis, Back, Graphs, Tips) {
    /*
     *@node chart在dom里的目标容器节点。
    */
    var Canvax = Chart.Canvax;
    return Chart.extend({
        init: function () {
            this.dataFrame = null;    //数据集合，由_initData 初始化
            //数据集合，由_initData 初始化
            this._xAxis = null;
            this._yAxis = null;
            this._back = null;
            this._graphs = null;
            this._tips = null;
            this.stageTip = new Canvax.Display.Sprite({ id: 'tip' });
            this.core = new Canvax.Display.Sprite({ id: 'core' });
            this.stageBg = new Canvax.Display.Sprite({ id: 'bg' });
            this.stage.addChild(this.stageBg);
            this.stage.addChild(this.core);
            this.stage.addChild(this.stageTip);
        },
        draw: function (data, opt) {
            if (opt.rotate) {
                this.rotate(opt.rotate);
            }
            this.dataFrame = this._initData(data, opt);    //初始化数据
            //初始化数据
            this._initModule(opt, this.dataFrame);    //初始化模块  
            //初始化模块  
            this._startDraw();    //开始绘图
            //开始绘图
            this._drawEnd();    //绘制结束，添加到舞台
            //绘制结束，添加到舞台
            this._arguments = arguments;    //下面这个是全局调用测试的时候用的
                                            //window.hoho = this;
        },
        //下面这个是全局调用测试的时候用的
        //window.hoho = this;
        clear: function () {
            this.stageBg.removeAllChildren();
            this.core.removeAllChildren();
            this.stageTip.removeAllChildren();
        },
        reset: function (data, opt) {
            this.clear();
            this.width = parseInt(this.element.width());
            this.height = parseInt(this.element.height());
            this.draw(data, opt);
        },
        _initModule: function (opt, data) {
            this._xAxis = new xAxis(opt.xAxis, data.xAxis);
            this._yAxis = new yAxis(opt.yAxis, data.yAxis);
            this._back = new Back(opt.back);
            this._graphs = new Graphs(opt.graphs);
            this._tips = new Tips(opt.tips);
        },
        _startDraw: function () {
            var self = this;    //首先
            //首先
            var x = 0;
            var y = parseInt(this.height - this._xAxis.h)    //绘制yAxis
;
            //绘制yAxis
            self._yAxis.draw({
                pos: {
                    x: 0,
                    y: y
                },
                yMaxHeight: y
            });
            x = self._yAxis.w    //绘制x轴
;
            //绘制x轴
            self._xAxis.draw({
                w: self.width - x,
                max: { left: -x },
                pos: {
                    x: x,
                    y: y
                }
            });    //绘制背景网格
            //绘制背景网格
            self._back.draw({
                w: self.width - x,
                h: y,
                xAxis: { data: self._yAxis.data },
                pos: {
                    x: x + this._xAxis.disOriginX,
                    y: y
                }
            });    //绘制主图形区域
            //绘制主图形区域
            this._graphs.draw(this._trimGraphs(), {
                w: this._xAxis.xGraphsWidth,
                h: this._yAxis.yGraphsHeight,
                pos: {
                    x: x + this._xAxis.disOriginX,
                    y: y
                }
            });    //执行生长动画
            //执行生长动画
            self._graphs.grow();
            var self = this;
            this._graphs.sprite.on('mouseover', function (e) {
                self._onInduceHandler(e);
            });
            this._graphs.sprite.on('mouseout', function (e) {
                self._offInduceHandler(e);
            });
        },
        _trimGraphs: function () {
            var xArr = this._xAxis.data;
            var yArr = this._yAxis.dataOrg;
            var fields = yArr.length;
            var xDis1 = this._xAxis.xDis1;    //x方向的二维长度，就是一个bar分组里面可能有n个子bar柱子，那么要二次均分
            //x方向的二维长度，就是一个bar分组里面可能有n个子bar柱子，那么要二次均分
            var xDis2 = xDis1 / (fields + 1);    //知道了xDis2 后 检测下 barW是否需要调整
            //知道了xDis2 后 检测下 barW是否需要调整
            this._graphs.checkBarW(xDis2);
            var maxYAxis = this._yAxis.dataSection[this._yAxis.dataSection.length - 1];
            var tmpData = [];
            for (var a = 0, al = xArr.length; a < al; a++) {
                for (var b = 0; b < fields; b++) {
                    !tmpData[b] && (tmpData[b] = []);
                    var y = -(yArr[b][a] - this._yAxis._baseNumber) / (maxYAxis - this._yAxis._baseNumber) * this._yAxis.yGraphsHeight;
                    var x = xArr[a].x - xDis1 / 2 + xDis2 * (b + 1);
                    tmpData[b][a] = {
                        value: yArr[b][a],
                        x: x,
                        y: y
                    };
                }
            }
            ;
            return tmpData;
        },
        _drawEnd: function () {
            this.stageBg.addChild(this._back.sprite);
            this.core.addChild(this._xAxis.sprite);
            this.core.addChild(this._graphs.sprite);
            this.core.addChild(this._yAxis.sprite);
            this.stageTip.addChild(this._tips.sprite);
        },
        _onInduceHandler: function ($evt) {
            var targetBar = $evt.bar;
            var barFillStyle = targetBar.context.fillStyle;
            var row = targetBar.row;
            var column = targetBar.column;
            var barsData = this._graphs.data;
            var data = [];
            data.length = barsData.length;
            for (var i = 0; i < barsData.length; i++) {
                !data[i] && (data[i] = []);    /**
                 * TODO:
                 * tips的title，先特殊处理下,这里本来不应该写具体的业务逻辑的
                 */
                /**
                 * TODO:
                 * tips的title，先特殊处理下,这里本来不应该写具体的业务逻辑的
                 */
                var objTitle = { content: this._tips.opt.titles[column][row] + '\uFF1A' };
                data[i].push(objTitle);
                var obj = { content: barsData[i][row].value };
                data[i].push(obj);
            }
            var tipsPoint = $evt.target.localToGlobal(undefined, this.core);
            var tips = {
                    w: this.width,
                    h: this.height
                }    //data = [[{content:'11'},{content:'12'}],[{content:'21'}]]
;
            //data = [[{content:'11'},{content:'12'}],[{content:'21'}]]
            tips.tip = {
                x: tipsPoint.x,
                y: tipsPoint.y,
                data: data
            };
            this._tips.remove();
            this._tips.draw(tips);
        },
        _offInduceHandler: function ($evt) {
            if (this._tips) {
                this._tips.remove();
            }
        }
    });
}, {
    requires: [
        'dvix/chart/',
        'dvix/utils/tools',
        'dvix/utils/datasection',
        'dvix/event/eventtype',
        './xaxis',
        'dvix/components/yaxis/yAxis',
        'dvix/components/back/Back',
        './graphs',
        'dvix/components/tips/Tips'
    ]
});