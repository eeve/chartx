define("chartx/components/anchor/Anchor",["canvax/index","canvax/shape/Line"],function(a,b){var c=function(a){this.w=0,this.h=0,this.enabled=0,this.xAxis={lineWidth:1,fillStyle:"#ff0000"},this.yAxis={lineWidth:1,fillStyle:"#ff0000"},this.pos={x:0,y:0},this.sprite=null,this.init(a)};return c.prototype={init:function(b){b&&_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"AnchorSprite"})},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){this._initConfig(a),this.enabled&&(this._widget(),this._layout())},_initConfig:function(a){a&&_.deepExtend(this,a)},_widget:function(){var a=this,c=new b({id:"x",context:{xStart:0,yStart:0,xEnd:a.w,yEnd:0,lineWidth:a.xAxis.lineWidth,strokeStyle:a.xAxis.fillStyle}});this.sprite.addChild(c),c.context.y=a.pos.y;var d=new b({id:"y",context:{xStart:0,yStart:0,xEnd:0,yEnd:a.h,lineWidth:a.yAxis.lineWidth,strokeStyle:a.yAxis.fillStyle}});this.sprite.addChild(d),d.context.x=a.pos.x},_layout:function(){}},c});