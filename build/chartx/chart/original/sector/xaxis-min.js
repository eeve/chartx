define("chartx/chart/original/sector/xAxis",["chartx/components/xaxis/xAxis"],function(a){var b=function(a,c){b.superclass.constructor.apply(this,arguments)};return Chartx.extend(b,a,{updateLayout:function(a){var b=this,c=[];_.each(b.sprite.children,function(d,e){if(b.enabled){var f=a[e],g=f.x,h=d.children[0];h.context.x=g;var i=c[e-1];if(i&&i.context.x+i.getTextWidth()/2+5>=g-h.getTextWidth()/2&&(d.context.visible=!1),c.push(h),b.line.enabled){var j=d.children[1];j.context.x=f.x}}})},draw:function(a){this._initConfig(a),this.data=this._trimXAxis(this.dataSection,this.xGraphsWidth),this.layoutData=this.data,this.setX(this.pos.x),this.setY(this.pos.y),this.enabled&&(this._widget(),this.text.rotation||this._layout())}}),b});