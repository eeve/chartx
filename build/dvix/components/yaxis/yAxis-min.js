KISSY.add("dvix/components/yaxis/yAxis",function(a,b,c,d){var e=b.Canvax,f=function(a){this.w=0,this.mode=1,this.dis=6,this.line={enabled:1,width:6,height:3,strokeStyle:"#BEBEBE"},this.text={fillStyle:"blank",fontSize:12},this.data=[],this.sprite=null,this.txtSp=null,this.lineSp=null,this.init(a)};return f.prototype={init:function(a){var b=this;b._initConfig(a),b.sprite=new e.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){var b=this;b._configData(a),b._widget()},_initConfig:function(a){var b=this;if(a){b.dis=a.dis||0==a.dis?a.dis:b.dis,b.mode=a.mode||b.mode;var c=a.line;c&&(b.line.enabled=0==c.enabled?0:b.line.enabled,b.line.strokeStyle=c.strokeStyle||b.line.strokeStyle);var d=a.text;d&&(b.text.fillStyle=d.fillStyle||b.text.fillStyle,b.text.fontSize=d.fontSize||b.text.fontSize)}},_configData:function(a){var b=this,a=a||{};b.data=a.data||[]},_widget:function(){var a=this,b=this.data;if(2==a.mode){var f=[];b.length>2&&(f.push(b[0]),f.push(b[b.length-1]),b=f)}a.txtSp=new e.Display.Sprite,a.sprite.addChild(a.txtSp),a.lineSp=new e.Display.Sprite,a.sprite.addChild(a.lineSp);for(var g=0,h=0,i=b.length;i>h;h++){var j=b[h],k=0,l=j.y,m=d.numAddSymbol(j.content),n=new e.Display.Text(m,{context:{x:k,y:l,fillStyle:a.text.fillStyle,fontSize:a.text.fontSize,textAlign:2==a.mode?"left":"right",textBaseline:"middle"}});if(2==a.mode&&2==b.length){var o=n.getTextHeight();0==h?n.context.y=l-parseInt(o/2)-2:1==h&&(n.context.y=l+parseInt(o/2)+2)}a.txtSp.addChild(n),g=Math.max(g,n.getTextWidth());var p=new c({id:h,context:{x:0,y:l,xEnd:a.line.width,yEnd:0,lineWidth:a.line.height,strokeStyle:a.line.strokeStyle}});a.lineSp.addChild(p)}a.txtSp.context.x=2==a.mode?0:g,a.lineSp.context.x=g+a.dis,a.line.enabled?a.w=g+a.dis+a.line.width:(a.lineSp.context.visible=!1,a.w=g)}},f},{requires:["dvix/","canvax/shape/Line","dvix/utils/tools"]});