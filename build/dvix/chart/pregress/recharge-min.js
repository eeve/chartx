KISSY.add("dvix/chart/pregress/recharge",function(a,b){var c=b.Canvax,d=function(){return timer=requestAnimationFrame(d),c.Animation.update(),timer},e=function(a,b){var d=this;this.canvax=new c({el:a}),this.width=parseInt(a.width()),this.height=parseInt(a.height()),this.r=Math.min(this.width,this.height)/2,this._beginAngle=270,this.config=_.extend({ringWidth:50,ringColor:"#f59622",bColor:"#3c3c3c",btnColor:"white",crossLineColor:"#666666",rate:0},b),this.stage=new c.Display.Stage,this.stage.addChild(new c.Shapes.Sector({id:"bg",context:{x:this.width/2,y:this.height/2,r:this.r,r0:this.r-this.config.ringWidth,startAngle:0,endAngle:360,fillStyle:this.config.bColor,lineJoin:"round"}})),this.stage.addChild(new c.Shapes.Sector({id:"rate",context:{x:this.width/2,y:this.height/2,r:this.r,r0:this.r-this.config.ringWidth,startAngle:0,endAngle:0,fillStyle:this.config.ringColor,lineJoin:"round"}}));var e=new c.Shapes.Circle({id:"btn",context:{x:this.width/2,y:this.height/2,r:this.r-this.config.ringWidth,fillStyle:this.config.btnColor}}),f=3*e.context.r/4*2,g=3*e.context.r/4*2;window.addBtnSp=new c.Display.Sprite({id:"cross",context:{x:e.context.x-f/2,y:e.context.y-g/2,width:f,height:g,scaleOrigin:{x:f/2,y:g/2},rotateOrigin:{x:f/2,y:g/2}}}),addBtnSp.addChild(new c.Shapes.Line({context:{xStart:0,yStart:addBtnSp.context.height/2,xEnd:addBtnSp.context.width,yEnd:addBtnSp.context.height/2,lineWidth:1,strokeStyle:this.config.crossLineColor}})),addBtnSp.addChild(new c.Shapes.Line({context:{xStart:addBtnSp.context.width/2,yStart:0,xEnd:addBtnSp.context.width/2,yEnd:addBtnSp.context.height,lineWidth:1,strokeStyle:this.config.crossLineColor}}));var h=6,i=(addBtnSp.context.width-h)/2,j=(addBtnSp.context.height-h)/2;addBtnSp.addChild(new c.Shapes.Rect({context:{x:i,y:j,width:h,height:h,rotation:45,rotateOrigin:{x:h/2,y:h/2},fillStyle:this.config.crossLineColor}})),e.on("tap",function(){d.fire("recharge")}),this.stage.getChildById("rate").on("touch",function(a){d.holdHand(a)}).on("release",function(a){d.releaseHand(a)}),this.stage.getChildById("bg").on("touch",function(a){d.holdHand(a)}).on("release",function(a){d.releaseHand(a)}),this.stage.addChild(e),this.stage.addChild(addBtnSp),this.config.rate>0&&this.setRate(this.config.rate,!0),arguments.callee.superclass.constructor.apply(this,arguments)};return c.Base.creatClass(e,b,{draw:function(){this.canvax.addChild(this.stage)},setRate:function(a,b){var e=this.stage.getChildById("rate");this.config.rate=a>100?100:a;var f=this._beginAngle+(180-this.rateToAngle()),g=this._beginAngle-(180-this.rateToAngle());if(b)e.context.startAngle=f,e.context.endAngle=g;else{var h={s:e.context.startAngle,e:e.context.endAngle};new c.Animation.Tween(h).to({s:f,e:g},700).onUpdate(function(){e.context.startAngle=this.s,e.context.endAngle=this.e}).start(),d()}},rateToAngle:function(){return this.config.rate/100*180},holdHand:function(a){var b=this,e=100-this.config.rate,f=b.config.bColor;"rate"==a.target.id&&(e=this.config.rate,f=b.config.ringColor);var g=this.stage.getChildById("cross");g.context.visible=!1;var h=this.stage.getChildById("btn");new c.Animation.Tween({ringWidth:this.config.ringWidth}).to({ringWidth:3*this.config.ringWidth/4},300).onUpdate(function(){h.context.r=b.r-this.ringWidth}).start();var i=new c.Display.Sprite({id:"holdTextSp",context:{x:h.context.x-h.context.r,y:h.context.y-h.context.r,width:h.context.r,height:h.context.r}}),j=new c.Display.Text("0",{context:{x:h.context.r,y:h.context.r,fillStyle:f,fontSize:25,textAlign:"right",textBaseline:"middle"}}),k=new c.Display.Text(".00%",{context:{x:h.context.r,y:h.context.r+3,fillStyle:f,fontSize:15,textAlign:"left",textBaseline:"middle"}});i.addChild(j),i.addChild(k),this.stage.addChild(i),new c.Animation.Tween({num:0}).to({num:e},300).onUpdate(function(){j.resetText(parseInt(this.num).toString()),k.resetText("."+this.num.toFixed(2).toString().split(".")[1]+"%")}).start(),d()},releaseHand:function(a){c.Animation.removeAll(),this.stage.getChildById("holdTextSp").destroy();var b=this;"rate"==a.target.id;var d=this.stage.getChildById("btn"),e=this.stage.getChildById("cross");e.context.visible=!0,e.context.globalAlpha=0,new c.Animation.Tween({ringWidth:this.r-d.context.r,rotation:0,globalAlpha:0}).to({ringWidth:this.config.ringWidth,rotation:360,globalAlpha:1},500).onUpdate(function(){d.context.r=b.r-this.ringWidth,e.context.rotation=this.rotation,e.context.globalAlpha=this.globalAlpha}).start()}}),e},{requires:["dvix/chart/"]});