define("chartx/chart/progress/index",["canvax/index","chartx/chart/index","canvax/shape/Sector","canvax/shape/Circle","canvax/animation/Tween","chartx/utils/simple-data-format","chartx/components/legend/index","chartx/components/tips/tip"],function(a,b,c,d,e,f,g,h){return b.extend({init:function(a,b,c){this._opts=c,this.barWidth=12,this.axisWidth=null,this.normalColor="#E6E6E6",this.progColor=["#58c4bc","#3399d5","#716fb4","#f4c646","#4fd2c4","#999","#7270b1"],this.startAngle=-90,this.angleCount=360,this.currRatio=0,this.barDis=4,this.field=null,this.dataType="account",this.dataCount=100,this.text={enabled:1,fillStyle:"#666",format:null,fontSize:30},_.deepExtend(this,c),!this.axisWidth&&(this.axisWidth=this.barWidth),!this.r&&(this.r=Math.min(this.width,this.height)/2),this.tweens=[],this._initFieldAndData(b);var d=this;if(this.field&&this.field.length>=1){if("absolute"==d.dataType){this.dataCount=0;for(var e in d.dataFrame.data)this.dataCount+=d.dataFrame.data[e][0]}var f=_.deepExtend({label:function(a){return a.field+"："+parseInt(a.value/d.dataCount*100)+"%"}},this._opts.legend);this._legend=new g(this._getLegendData(),f),this.stage.addChild(this._legend.sprite),this._legend.pos({x:this.width-this._legend.w,y:this.height/2-this._legend.h/2}),this.width-=this._legend.w}this._tip=new h(this.tips,this.canvax.getDomContainer()),this._tip._getDefaultContent=this._getTipsDefaultContent,this.stage.addChild(this._tip.sprite)},_destroy:function(){_.each(this.tweens,function(a){a.stop(),e.remove(a)})},_initFieldAndData:function(a){if(this.field){this.currRatio={},_.isString(this.field)&&(this.field=[this.field]),this.field.length>1&&(this.text.enabled=0),this.dataFrame=this._initData(a);var b=this;_.each(this.field,function(a){b.currRatio[a]=0})}},_initData:f,draw:function(){var a=this;this.field?_.each(this.field,function(b,c){a.drawGroup(c);var d=a.dataFrame.data[b][0];"absolute"==a.dataType&&(d=d/a.dataCount*1e3/10),a.setRatio(d,b,c)}):this.drawGroup(0)},getColor:function(a,b){return _.isString(a)?a:_.isArray(a)?a[b]:void 0},drawGroup:function(b){var d=new a.Display.Sprite({id:"group_"+b});this.stage.addChild(d);var e=this.r-(Math.max(this.barWidth,this.axisWidth)+this.barDis)*b,f=e-(this.barWidth-this.axisWidth)/2,g=e-this.axisWidth-(this.barWidth-this.axisWidth)/2;d.addChild(this._getCircle(this.startAngle,e-this.barWidth/2,this.axisWidth/2,this.normalColor)),d.addChild(this._getCircle(this.startAngle+this.angleCount,e-this.barWidth/2,this.axisWidth/2,this.normalColor)),d.addChild(new c({context:{x:this.width/2,y:this.height/2,r:f,r0:g,startAngle:this.startAngle,endAngle:this.startAngle+this.angleCount,fillStyle:this.normalColor,lineJoin:"round"}}));var h=this.getColor(this.progColor,b);this._circle=this._getCircle(this.startAngle,e-this.barWidth/2,this.barWidth/2,h),this._circle.id="circle_"+b,d.addChild(this._circle),d.addChild(this._circle.clone());var i=new c({id:"speed_"+b,context:{x:this.width/2,y:this.height/2,r:e,r0:e-this.barWidth,startAngle:this.startAngle,endAngle:this.startAngle,fillStyle:h,lineJoin:"round",cursor:"pointer"}});i.ind=b,d.addChild(i);var j=this;i.on("panstart mouseover",function(a){a.tipsInfo=j._setTipsInfo(this,a),j._tip.show(a)}),i.on("panstart mousemove",function(a){a.tipsInfo=j._setTipsInfo(this,a),j._tip.move(a)}),i.on("panstart mouseout",function(a){j._tip.hide(a)}),this.text.enabled&&this.stage.addChild(new a.Display.Text("0%",{id:"centerRatioText",context:{x:this.width/2,y:this.height/2,fillStyle:this.text.fillStyle,fontSize:this.text.fontSize,textAlign:"center",textBaseline:"middle"}}))},_setTipsInfo:function(a,b){var c=a.ind,d={dataCount:this.dataCount};return this.field?(d.field=this.field[c],d.value=this.dataFrame.data[this.field[c]][0]):d.value,d},_getTipsDefaultContent:function(a){return a.field+"："+parseInt(a.value/a.dataCount*100)+"%"},_getCircle:function(a,b,c,e){var f=Math.PI/180*a,g=new d({xyToInt:!1,context:{x:Math.cos(f)*b+this.width/2,y:Math.sin(f)*b+this.height/2,r:c,fillStyle:e}});return g},_resetCirclePos:function(a,b){var c=Math.PI/180*a,d=this.r-(Math.max(this.barWidth,this.axisWidth)+this.barDis)*b-this.barWidth/2,e=Math.cos(c)*d+this.width/2,f=Math.sin(c)*d+this.height/2,g=this.stage.getChildById("group_"+b).getChildById("circle_"+b);g.context.x=e,g.context.y=f},_setRatio:function(a,b){var c=a/100*this.angleCount+this.startAngle;this.stage.getChildById("group_"+b).getChildById("speed_"+b).context.endAngle=c,this._resetCirclePos(c,b)},_animate:function(a,b,c){function d(){g=requestAnimationFrame(d),e.update()}var f=this,g=null,h=f._getCurrRatio(b),i=1e3*Math.abs(a-h)/100;i=a/100*1e3;var j=function(){var j=new e.Tween({r:h}).to({r:a},i).easing(e.Easing.Quadratic.Out).onUpdate(function(){f._setRatio(this.r,c),f._setCurrRatio(b,this.r),f.fire("ratioChange",{currRatio:this.r});var a=parseInt(this.r)+"%";_.isFunction(f.text.format)&&(a=f.text.format(this.r)),f.text.enabled&&f.stage.getChildById("centerRatioText").resetText(a)}).onComplete(function(){cancelAnimationFrame(g)}).start();f.tweens.push(j),d()};j()},_getCurrRatio:function(a){return this.field?this.currRatio[a]:this.currRatio},_setCurrRatio:function(a,b){this.field&&(this.currRatio[a]=b),this.currRatio=b},setRatio:function(a,b){var c=this;_.each(c.field,function(d,e){b?b==d&&setTimeout(function(){c._animate(a,b,e)},200*e):c._animate(d,e)})},_getLegendData:function(){var a=this,b=[];return _.each(this.field,function(c,d){b.push({field:c,value:a.dataFrame.data[c][0],fillStyle:a.getColor(a.progColor,d)})}),b}})});