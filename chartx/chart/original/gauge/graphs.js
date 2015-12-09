define(
    "chartx/chart/original/gauge/graphs",
    [
        "canvax/index",
        "canvax/shape/Sector",
        "canvax/animation/Tween",
        "chartx/utils/tools",
        "canvax/shape/Circle",
        "canvax/shape/BrokenLine",
        "canvax/display/Text",
        "canvax/animation/AnimationFrame"
    ],
    function(Canvax, Sector, Tween , Tools, Circle, BrokenLine, Text, AnimationFrame){
 
        var Graphs = function(opt,domRoot){

            this.domRoot = domRoot;
            this.w    = 0;
            this.h    = 0;

            this.maxR = 0;
            // this.autoCenter = true

            this.dis  = {
                outAndIn  : 10,                  //外圈与内圈距离
                textAndIn : 15                   //内圈与文字距离
            }

            this.outSideRange = {
                thickness  : 3,
                startAngle : 165,
                endAngle   : 375,
                fillStyle  : '#ffffff',
                duration   : 1200
            }
            this.outSide = {
                thickness  : 3,
                startAngle : 165,
                endAngle   : 375,
                fillStyle  : '#1ba9e3',
                duration   : 600
            }
            this.inSide = {
                totalAngle : 0,
                thickness  : 10,
                startAngle : 165,
                endAngle   : 375,
                fillStyle  : '#ffffff',
                globalAlpha:0.2,
                duration   : 600
            }

            this.describe = {                    //描述
                count : 8
            }

            this.center   = {                    //中心区域
                title : {
                    content : 0,
                    context : {
                        x       : 0,
                        y       : -20,
                        fillStyle : '#ffffff',
                        fontSize : 30,
                        fontWeight : 'normal',
                        fontFamily : 'Tahoma'
                    }
                },
                subtitle : {
                    content : '',
                    context : {
                        x       : 0,
                        y       : 20,
                        fillStyle : '#ffffff',
                        fontSize : 13,
                        fontWeight : 'normal'
                    }
                }

            }

            this.sprite = null ;
    
            _.deepExtend(this , opt);

            this.init();
        };
    
        Graphs.prototype = {
            init : function(opt){
                _.deepExtend(this , opt);
                this.sprite = new Canvax.Display.Sprite({ id : "graphsEl" });
            },
            setX:function($n){
                this.sprite.context.x = $n
            },
            setY:function($n){
                this.sprite.context.y = $n
            },
            draw : function(opt){
                var me    = this;
                _.deepExtend(me , opt);

                me._drawRing({
                    onInSideComplete : function(){

                        me._drawDescribe()
                    }
                })
                
                // me._drawDescribe()

                // me._drawTitle()

                me.sprite.context.x = me.pos.x, me.sprite.context.y = me.pos.y

                //自动居中
                // if(me.autoCenter){
                    // me.sprite.context.y = (me.h - (me.maxR + 30) ) / 2 + me.maxR
                // }
                // me.sprite.addChild(me._test({}))
            },

            updateTitle:function($o){
                var me = this
                var center = me.sprite.getChildById('center')
                var title  = center.getChildAt(0)
                var content = $o.title || 0

                AnimationFrame.registTween({
                    from : {num:title.text},
                    to   : {num:content},
                    onUpdate : function(){
                        title.resetText(Tools.numAddSymbol(parseInt(this.num)))
                    },
                    // duration:3000
                })
            },

            updateRange:function($o){
                var me = this
                var center = me.sprite.getChildById('center')
                var subtitle= center.getChildAt(1) 
                var content = $o.subtitle || ''
                subtitle.resetText(content)
            },

            _drawRing:function($o){
                var me = this
                me.maxR = Math.min(me.pos.y, parseInt(me.w / 2)) 

                var rings = new Canvax.Display.Sprite({ id : 'rings'});
               
                //内圈
                var item = new Canvax.Display.Sprite({ id : 'inSide'});
                rings.addChild(item)
                me.inSide.r = me.maxR - me.dis.outAndIn, me.inSide.r0 = me.maxR - me.dis.outAndIn - me.inSide.thickness
                var inSideSector = me._add({
                    config : {
                        r  : me.inSide.r,
                        r0 : me.inSide.r0,
                        startAngle : me.inSide.startAngle,
                        endAngle   : me.inSide.startAngle,
                        fillStyle  : me.inSide.fillStyle,
                        globalAlpha: me.inSide.globalAlpha
                    },
                    sprite : item
                })
                AnimationFrame.registTween({
                    from : {num:me.inSide.startAngle},
                    to   : {num:me.inSide.endAngle},
                    onUpdate : function(){
                        inSideSector.context.endAngle = this.num 
                    },
                    onComplete : function(){
                        // console.log('onComplete')
                       _.isFunction($o.onInSideComplete) && $o.onInSideComplete()
                    },
                    duration:me.inSide.duration
                })

                //外圈
                var item = new Canvax.Display.Sprite({ id : 'outSide'});
                rings.addChild(item)
                var outSideSector = me._add({
                    config : {
                        r  : me.maxR,
                        r0 : me.maxR - me.outSide.thickness,
                        startAngle : me.outSide.startAngle,
                        endAngle   : me.outSide.startAngle,
                        fillStyle  : me.outSide.fillStyle
                    },
                    sprite : item
                })  
                AnimationFrame.registTween({
                    from : {num:me.outSide.startAngle},
                    to   : {num:me.outSide.endAngle},
                    onUpdate : function(){
                        outSideSector.context.endAngle = this.num 
                    },
                    duration:me.outSide.duration
                })

                //外圈比例
                var item = new Canvax.Display.Sprite({ id : 'outSideRange'});
                rings.addChild(item)
                var outSideRangeSector = me._add({
                    config : {
                        r  : me.maxR,
                        r0 : me.maxR - me.outSideRange.thickness,
                        startAngle : me.outSideRange.startAngle,
                        endAngle   : me.outSideRange.startAngle,
                        fillStyle  : me.outSideRange.fillStyle
                    },
                    sprite : item
                })  
                AnimationFrame.registTween({
                    from : {num:me.outSideRange.startAngle},
                    to   : {num:me.outSideRange.endAngle},
                    onUpdate : function(){
                        outSideRangeSector.context.endAngle = this.num             
                    },
                    duration:me.outSideRange.duration
                })               

                me.sprite.addChild(rings)
            },

            _drawDescribe:function(){
                var me = this
                var describe = new Canvax.Display.Sprite({ id : 'describe'});
                var lines = new Canvax.Display.Sprite({ id : 'lines'});
                var txts  = new Canvax.Display.Sprite({ id : 'txts'});
                var startAngle = me.inSide.startAngle
                var endAngle = me.inSide.endAngle > 360 ? me.inSide.endAngle - 360 : me.inSide.endAngle
                var totalAngle = (360 - startAngle) + endAngle

                for(var a = 0,al = me.describe.count; a < al; a++){
                    var o = _.isFunction(me.describe.format) ? me.describe.format(a) : null
                    if(o){
                        var scale = _.isNumber(o.scale) ? o.scale : (a / describe_data.length)
                        var angle = scale * totalAngle + startAngle
                        // angle = angle >= 360 ? angle - 360 : angle
                        if(o.line && o.line.enabled){
                            var p1 = me._getRPoint(0,0,me.inSide.r,me.inSide.r,angle)
                            var p2 = me._getRPoint(0,0,me.inSide.r0,me.inSide.r0,angle)
                            // me.sprite.addChild(me._test(p1))
                            // me.sprite.addChild(me._test(p2))
                            //线条
                            var bline = new BrokenLine({ 
                                id: "brokenline",
                                context: {
                                    pointList: [[p1.x, p1.y], [p2.x, p2.y]],
                                    strokeStyle : o.line.strokeStyle || '#ffffff',
                                    lineWidth : o.line.lineWidth || 2,
                                    globalAlpha : 0
                                }
                            });
                            lines.addChild(bline)
                            bline.animate({
                                globalAlpha : 1
                            })
                        }

                        var r = me.inSide.r0 - me.dis.textAndIn
                        var p = me._getRPoint(0,0,r,r,angle)

                        //文字
                        var txt = new Text(o.content , {
                            context: {
                                x: p.x,
                                y: p.y,
                                fillStyle: o.context.fillStyle || '#ff0000',
                                fontSize: o.context.fontSize || 10,
                                rotation: angle + 90,
                                textAlign: 'center',
                                textBaseline: 'middle',
                                globalAlpha : 0
                            }
                        });
                        // me.sprite.addChild(me._test({x:p.x, y:p.y, fillStyle:'#00ffff'}))
                        txts.addChild(txt)
                        txt.animate({
                            globalAlpha : 1
                        })
                    }
                }

                describe.addChild(lines)
                describe.addChild(txts)
                me.sprite.addChild(describe)
            },

            _drawTitle:function(){
                var me = this
                var center = new Canvax.Display.Sprite({ id : 'center'});
                //中心区域信息
                var o = me.center.title
                var title = new Text(o.content, {
                    context: {
                        x: o.context.x || 0,
                        y: o.context.y || 0,
                        fillStyle: o.context.fillStyle || '#ff0000',
                        fontSize: o.context.fontSize || 12,
                        fontWeight : o.context.fontWeight || 'normal',
                        fontFamily : o.context.fontFamily || 'Tahoma',
                        textAlign: 'center',
                        textBaseline: 'middle'
                    }
                });
                center.addChild(title)

                var o = me.center.subtitle
                var subtitle = new Text(o.content, {
                    context: {
                        x: o.context.x || 0,
                        y: o.context.y || 0,
                        fillStyle: o.context.fillStyle || '#ff0000',
                        fontSize: o.context.fontSize || 12,
                        fontWeight : o.context.fontWeight || 'normal',
                        fontFamily : o.context.fontFamily || '微软雅黑',
                        textAlign: 'center',
                        textBaseline: 'middle'
                    }
                });
                center.addChild(subtitle)

                me.sprite.addChild(center)
            },

            _getRPoint:function(x0, y0, xr, yr, r){
                r = r * Math.PI / 180
                return {x:Math.cos(r) * xr + x0, y:Math.sin(r) * yr + y0}
            },
            _test:function(o){
                var circle = new Circle({                  //圆
                    id : "circle",
                    context : {
                        x           : o.x || 0,
                        y           : o.y || 0,
                        r           : 2,
                        fillStyle   : o.fillStyle || '#ff0000',
                    }
                });
                return circle
            },
            _grow : function(){
            },
            _add : function($o){                           //单个扇形区
                var me      = this
                var sprite  = $o.sprite 
                var o       = $o.config
                var sector = new Sector({
                    context : {
                        x : o.x || 0,
                        y : o.y || 0,
                        r : o.r  || 100,
                        r0: _.isNumber(o.r0) ? o.r0 : 100, 
                        startAngle : _.isNumber(o.startAngle) ? o.startAngle : 180,
                        endAngle   : _.isNumber(o.endAngle)   ? o.endAngle   : 360,

                        fillStyle  : o.fillStyle  || '#ff0000',
                        strokeStyle: o.strokeStyle|| '#000000',
                        lineWidth  : o.lineWidth  || 0,
                        globalAlpha: o.globalAlpha|| 1,
                    }
                })
                sprite.addChild(sector)
                return sector
            }
        }; 
    
        return Graphs;
    } 
)
