KISSY.add("dvix/components/xaxis/xAxis",function(a,b,c,d){var e=b.Canvax,f=function(a){this.w=0,this.h=24,this.disY=6,this.dis=6,this.line={enabled:1,width:1,height:4,strokeStyle:"#cccccc"},this.max={left:0,right:0,txtH:14},this.text={mode:1,fillStyle:"#999999",fontSize:13},this.data=[],this.layoutData=[],this.sprite=null,this.txtSp=null,this.lineSp=null,this.init(a)};return f.prototype={init:function(a){var b=this;b._initConfig(a),b.sprite=new e.Display.Sprite,b._check()},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){var b=this;b._configData(a),b._trimLayoutData(),b._widget(),b._layout(),b.h=b.disY+b.line.height+b.dis+b.max.txtH},getLayoutData:function(){var a=this;return a.layoutData},_initConfig:function(a){var b=this;if(a){b.disY=a.disY||0==a.disY?a.disY:b.disY,b.dis=a.dis||0==a.dis?a.dis:b.dis;var c=a.line;c&&(b.line.enabled=0==c.enabled?0:b.line.enabled,b.line.height=c.height||b.line.height,b.line.strokeStyle=c.strokeStyle||b.line.strokeStyle);var d=a.text;d&&(b.text.mode=d.mode||b.text.mode,b.text.fillStyle=d.fillStyle||b.text.fillStyle,b.text.fontSize=d.fontSize||b.text.fontSize)}},_configData:function(a){var b=this,a=a||{};b.w=a.w||0,b.h=a.h||0,b.max.right=b.w,b.data=a.data||[],a.max&&(b.max.left=a.max.left||b.max.left,b.max.right=a.max.right||b.max.right)},_check:function(){var a=this,b=new e.Display.Text("test",{context:{fontSize:a.text.fontSize}});a.max.txtH=b.getTextHeight(),a.h=a.disY+a.line.height+a.dis+a.max.txtH,delete b},_widget:function(){var a=this,b=a.layoutData;a.txtSp=new e.Display.Sprite,a.sprite.addChild(a.txtSp),a.lineSp=new e.Display.Sprite,a.sprite.addChild(a.lineSp);for(var f=0,g=b.length;g>f;f++){var h=b[f],i=h.x,j=a.disY+a.line.height+a.dis,k=d.numAddSymbol(h.content),l=new e.Display.Text(k,{context:{x:i,y:j,fillStyle:a.text.fillStyle,fontSize:a.text.fontSize}});a.txtSp.addChild(l)}for(var b=1==a.text.mode?a.layoutData:a.data,f=0,g=b.length;g>f;f++){var h=b[f],i=h.x,m=new c({id:f,context:{x:i,y:0,xEnd:0,yEnd:a.line.height,lineWidth:a.line.width,strokeStyle:a.line.strokeStyle}});m.context.y=a.disY,a.lineSp.addChild(m)}for(var f=0,g=a.txtSp.getNumChildren();g>f;f++){var l=a.txtSp.getChildAt(f),i=parseInt(l.context.x-l.getTextWidth()/2);l.context.x=i}},_layout:function(){var a=this,b=a.txtSp.getChildAt(0),c=a.txtSp.getChildAt(a.txtSp.getNumChildren()-1);b&&b.context.x<a.max.left&&(b.context.x=parseInt(a.max.left)),c&&Number(c.context.x+Number(c.getTextWidth()))>a.max.right&&(c.context.x=parseInt(a.max.right-c.getTextWidth()))},_trimLayoutData:function(){for(var a=this,b=[],c=a.data,f=0,g=0,h=c.length;h>g;g++){var i=c[g],j=d.numAddSymbol(i.content),k=new e.Display.Text(j,{context:{fillStyle:a.text.fillStyle,fontSize:a.text.fontSize}});f=Math.max(f,k.getTextWidth())}var l=a.max.right,m=Math.floor(l/(f+10));m=m>c.length?c.length:m;var n=Math.floor(c.length/(m-1));n=2==c.length&&2==m?1:n,n=1==c.length&&1==m?0:n;for(var g=0,h=c.length;h>g;g++){var i=c[n*g];i&&b.push(c[n*g])}if(b.length>m)for(n=Math.ceil(c.length/(m-1)),n=2==c.length&&2==m?1:n,n=1==c.length&&1==m?0:n,b=[],g=0,h=c.length;h>g;g++)i=c[n*g],i&&b.push(c[n*g]);1==m&&0==b.length&&(b[0]=c[0]),2==m&&1==b.length&&c.length>=2&&(b[1]=c[c.length-1]),a.layoutData=b}},f},{requires:["dvix/","canvax/shape/Line","dvix/utils/tools"]});