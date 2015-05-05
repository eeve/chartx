define("chartx/chart/bar/graphs",["canvax/index","canvax/shape/Rect","canvax/animation/Tween","chartx/components/tips/tip","chartx/utils/tools"],function(a,b,c,d,e){var f=function(a,b,c,e){this.dataFrame=e,this.w=0,this.h=0,this.pos={x:0,y:0},this._colors=["#42a8d7","#666666","#6f8cb2","#c77029","#f15f60","#ecb44f","#ae833a","#896149"],this.bar={width:12,radius:2},this.text={enabled:0,fillStyle:"#999999",fontSize:12,textAlign:"left",format:null},this.eventEnabled=!0,this.sprite=null,this.txtsSp=null,this.yDataSectionLen=0,_.deepExtend(this,a),this._tip=new d(b,c),this.init()};return f.prototype={init:function(){this.sprite=new a.Display.Sprite({id:"graphsEl"}),this.txtsSp=new a.Display.Sprite({id:"txtsSp",context:{visible:!1}})},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},_getColor:function(a,b,c,d){var e=null;return _.isString(a)&&(e=a),_.isArray(a)&&(e=a[c]),_.isFunction(a)&&(e=a({iGroup:c,iNode:b,value:d})),e&&""!=e||(e=this._colors[c]),e},checkBarW:function(a){this.bar.width>=a&&(this.bar.width=a-1>1?a-1:1)},draw:function(c,d){if(_.deepExtend(this,d),0!=c.length){this.data=c;for(var f=c[0].length,g=0;f>g;g++){for(var h=new a.Display.Sprite({id:"barGroup"+g}),i=new a.Display.Sprite({id:"barGroupHover"+g}),j=0,k=c.length;k>j;j++){var l=c[j][g],m=this._getColor(this.bar.fillStyle,g,j,l.value),n=parseInt(Math.abs(l.y)),o={x:Math.round(l.x-this.bar.width/2),y:parseInt(l.y),width:parseInt(this.bar.width),height:n,fillStyle:m};if(this.bar.radius){var p=Math.min(this.bar.width/2,n);p=Math.min(p,this.bar.radius),o.radius=[p,p,0,0]}var q=new b({id:"bar_"+j+"_"+g,context:o}),r=this.h/(this.yDataSectionLen-1),s=Math.ceil(n/r)*r,t=new b({id:"bar_"+j+"_"+g+"hover",context:{x:Math.round(l.x-this.bar.width/2),y:-s,width:parseInt(this.bar.width),height:s,fillStyle:"black",globalAlpha:0,cursor:"pointer"}});if(t.target=q,t.row=g,t.column=j,this.eventEnabled){var u=this;t.on("mouseover",function(a){var b=this.target.context;b.x--,b.width+=2,u.sprite.addChild(u._tip.sprite),u._tip.show(u._setTipsInfoHandler(a,this.row,this.column))}),t.on("mousemove",function(a){u._tip.move(u._setTipsInfoHandler(a,this.row,this.column))}),t.on("mouseout",function(a){var b=this.target.context;b.x++,b.width-=2,u._tip.hide(a),u.sprite.removeChild(u._tip.sprite)})}var v=l.value;v=_.isFunction(this.text.format)?this.text.format(v):e.numAddSymbol(v);var w=new a.Display.Text(v,{context:{x:l.x,y:o.y,fillStyle:this.text.fillStyle,fontSize:this.text.fontSize,textAlign:this.text.textAlign}});w.context.x=l.x-w.getTextWidth()/2,w.context.y=o.y-w.getTextHeight(),this.txtsSp.addChild(w),h.addChild(q),i.addChild(t)}this.sprite.addChild(h),this.sprite.addChild(i)}this.sprite.addChild(this.txtsSp),this.sprite.context.x=this.pos.x,this.sprite.context.y=this.pos.y}},grow:function(){function a(){d=requestAnimationFrame(a),c.update()}var b=this,d=null,e=function(){new c.Tween({h:0}).to({h:b.h},500).onUpdate(function(){b.sprite.context.scaleY=this.h/b.h}).onComplete(function(){b._growEnd(),cancelAnimationFrame(d)}).start();a()};e()},_growEnd:function(){this.text.enabled&&(this.txtsSp.context.visible=!0)},_setXaxisYaxisToTipsInfo:function(a){a.tipsInfo.xAxis={field:this.dataFrame.xAxis.field,value:this.dataFrame.xAxis.org[0][a.tipsInfo.iNode]};var b=this;_.each(a.tipsInfo.nodesInfoList,function(a,c){a.field=b.dataFrame.yAxis.field[c]})},_setTipsInfoHandler:function(a,b,c){return a.tipsInfo={iGroup:c,iNode:b,nodesInfoList:this._getNodeInfo(b)},this._setXaxisYaxisToTipsInfo(a),a},_getNodeInfo:function(a){var b=[],c=this;return _.each(this.data,function(d,e){var f=_.clone(d[a]);f.fillStyle=c._getColor(c.bar.fillStyle,a,e,f.value),b.push(f)}),b}},f});