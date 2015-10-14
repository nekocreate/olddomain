/*
 * FixedMidashi JavaScript Library, version 1.7 (2015/01/31)
 * http://hp.vector.co.jp/authors/VA056612/fixed_midashi/
 * Copyright (C) 2012-2015 K.Koiso
 */

/* Exsample */
/*******************************************************************
<script type="text/javascript" src="hoge/fixed_midashi.js"></script>

<!-- body mode -->
<body onLoad="FixedMidashi.create();">
  <table _fixedhead="rows:1; cols:1">
    ...

<!-- div mode -->
<style type="text/css" media="screen">
  div.scroll_div { overflow: auto; }
</style>
<body onLoad="FixedMidashi.create();">
  <div class="scroll_div">
    <table _fixedhead="rows:1; cols:1">
      ...
*******************************************************************/

var FixedMidashi = new function()
{

var DISABLED = false;

var ROWS = 1;
var COLS = 0;
var DIV_FULL_MODE = false;
var COPY_ID = true;
var BORDER_COLOR = null;
var BORDER_STYLE = null;
var BORDER_WIDTH = null;

var DIV_MIN_WIDTH = 150;
var DIV_MIN_HEIGHT = 700;

var RADIO_PREFIX = "_FIXED_HEADER_";

var POS_FIXED    = 1;
var POS_ABSOLUTE = 2;
var POS_MIX      = 3;
var _positionMode = -1;

var l="textarea",i="password",h="checkbox",f="select-multiple",e="select-one",g="change",k="radio",j="INPUT",Tb="sync",Sb="fixed",Rb="transparent",Qb="TD",Pb="0px",Ob="absolute",Nb="none",Mb="hidden",Lb="auto",Kb="",Jb="THEAD",Ib="scroll",n="resize",Hb=-1,Gb=null,Fb=true,Eb=false,Db=this;
var TIMER_WATCH_TABLESIZE=3e3,TID_HEADER="H",TID_NUMBER="N",TID_CORNER="C",PX="px",HEIGHT_MARGIN=10,MIN_SIZE=1,_isIE=Eb,_IEver=0,_isIE11=Eb,_isFirefox=Eb,_isOpera=Eb,_isSafari=Eb,_isChrome=Eb,_isMobile=Eb,_isBackCompat=Eb,_fixedHeaders=Gb,_fixedList=Gb,_body=Gb,_resizeTimerId=Gb,_execFlag=Eb,_IE_retryCount=0;
Db.create=function(){var f="_fixedhead";if(DISABLED)return Hb;if(!document.body.getBoundingClientRect)return -2;if(!window.addEventListener&&!window.attachEvent)return -3;var l=(new Date).getTime(),h=_fixedHeaders==Gb;if(!h)for(var b=0;b<_fixedHeaders.length;b++)_fixedHeaders[b].removeAllTables(Eb);for(var i=document.body.getElementsByTagName("TABLE"),e=[],b=0;b<i.length;b++){var c=i[b],d=c.getAttribute(f);if(d==Gb)d=c._fixedhead;if(d==undefined)continue;if(c.rows.length==0)continue;e.push(c)}if(e.length==0)return -4;var g=Gb;if(h){var a=navigator.userAgent.toLowerCase();_isIE=a.indexOf("msie")>=0;if(_isIE){var j=a.indexOf("msie"),m=a.indexOf(";",j);_IEver=Number(a.substring(j+5,m))}if(!_isIE)_isIE11=a.indexOf("trident")>=0;_isFirefox=a.indexOf("firefox")>=0;_isOpera=a.indexOf("opera")>=0;_isSafari=a.indexOf("safari")>=0&&a.indexOf("chrome")<0;_isChrome=a.indexOf("chrome")>=0;_isMobile=a.indexOf("mobile")>=0;if(_isIE&&_rect(i[0]).right>=1e4&&_IE_retryCount<10){setTimeout(FixedMidashi.create,10);_IE_retryCount++;return -5}_isBackCompat=document.compatMode=="BackCompat";_body=_isBackCompat?document.body:document.documentElement;if(_isIE&&(_IEver<=7||_IEver<=9&&_isBackCompat))_positionMode=POS_ABSOLUTE;else if(_positionMode==Hb){_positionMode=POS_MIX;if(_isMobile)_positionMode=POS_FIXED}if(_isIE&&_IEver==8&&!_isBackCompat)_fixedList=new _FixedElementList;if(_isFirefox)g=_createObjectForFirefox();_isChrome&&_createObjectForChrome();_addEventListener(window,n,_onBodyResize);_isMobile&&_addEventListener(window,"orientationchange",_onBodyResize);(_isFirefox||_isSafari)&&!_isMobile&&TIMER_WATCH_TABLESIZE>=0&&setInterval(_checkZoom,TIMER_WATCH_TABLESIZE);_addEventListener(window,Ib,_onBodyScroll)}_fixedHeaders=[];for(var b=0;b<e.length;b++){var c=e[b],d=c.getAttribute(f);if(d==Gb)d=c._fixedhead;var k=_createFixedHeader(c,d,e.length);_fixedHeaders.push(k)}_execute("init");h&&_createCSS("print",".fixed_header_display_none_at_print { display: none; visibility: hidden; }");g!=Gb&&g.parentNode.removeChild(g);return (new Date).getTime()-l};
function _checkZoom(){if(_fixedHeaders==Gb)return;for(var a=0;a<_fixedHeaders.length;a++)if(_fixedHeaders[a].checkZoom()){_execute(n);break}}
Db.remove=function(){if(_fixedHeaders==Gb)return;for(var a=0;a<_fixedHeaders.length;a++)_fixedHeaders[a].removeAllTables(Fb);_fixedHeaders=[]};
Db.syncValue=function(a){if(_fixedHeaders==Gb)return;if(!a)return;_copyValues(a)};
Db.syncStyle=function(a,d){if(_fixedHeaders==Gb)return;if(!a)return;if(_fixedList!=Gb){var e=_fixedList.getAll(a);if(e==Gb)return;for(var b=0;b<e.length;b++)_copyStyle(a,e[b],d);return}var c=a.$FXH_FIXED_ELEMENT;if(c==undefined)return;if(!c.$IS_ARRAY)_copyStyle(a,c,d);else for(var b=0;b<c.length;b++)_copyStyle(a,c[b],d)};
Db.getFixedElement=function(b){if(_fixedHeaders==Gb)return Gb;if(!b)return Gb;if(_fixedList!=Gb)return _fixedList.get(b);var a=b.$FXH_FIXED_ELEMENT;if(!a)return Gb;if(!a.$IS_ARRAY)return a;if(a.length==0)return Gb;return a[a.length-1]};
Db.getFixedElements=function(b){if(_fixedHeaders==Gb)return Gb;if(!b)return Gb;if(_fixedList!=Gb)return _fixedList.getAll(b);var a=b.$FXH_FIXED_ELEMENT;if(!a)return Gb;if(a.$IS_ARRAY&&a.length==0)return Gb;var c=[];if(!a.$IS_ARRAY)c.push(a);else for(var d=0;d<a.length;d++)c.push(a[d]);return c};
Db.getSourceElement=function(a){if(_fixedHeaders==Gb)return Gb;if(!a)return Gb;var b=a.$SOURCE_ELEMENT;return !b?Gb:b};
Db.isFixedElement=function(a){if(_fixedHeaders==Gb)return Eb;if(!a)return Eb;return a.$SOURCE_ELEMENT!=undefined};
function _createFixedHeader(j,C,A){for(var x=j.rows,w=_cells(x[0]),p=0,e=0;e<w.length;e++)p+=w[e].colSpan;var d=ROWS,i=COLS,c=Hb,b=Hb,v=COPY_ID,f=BORDER_COLOR,g=BORDER_STYLE,h=BORDER_WIDTH,k=Gb,l=1,q=DIV_FULL_MODE,o=Gb,y=_getElementByTagName(j,Jb);if(y!=Gb)d=y.rows.length;for(var z=C.split(";"),e=0;e<z.length;e++){var r=z[e].split(":");if(r.length!=2)continue;var B=_trim(r[0]).toLowerCase(),a=_trim(r[1]);switch(B){case "rows":d=Number(a);break;case "cols":i=Number(a);break;case "div-max-width":c=_percent(a);break;case "div-max-height":b=_percent(a);break;case "div-full-mode":q=a.toLowerCase()=="yes";break;case "copyid":v=a.toLowerCase()=="yes";break;case "border-color":f=a;break;case "border-style":g=a;break;case "border-width":h=a;break;case "bgcolor":k=a;break;case "opacity":l=Number(a);break;case "body-header-id":o=a}}if(d<0||d>=Math.min(x.length,11))d=0;if(i<0||i>=Math.min(p,11))i=0;if(!c||c<1||c>100)c=Hb;if(!b||b<1||b>100)b=Hb;if(A>1)q=Eb;if(l<0||l>1)l=1;var m=document.createElement("DIV");if(f!=Gb&&!_setStyle(m,"borderColor",f))f=Gb;if(g!=Gb&&!_setStyle(m,"borderStyle",g))g=Gb;if(h!=Gb&&!_setStyle(m,"borderWidth",h))h=Gb;if(k!=Gb&&!_setStyle(m,"backgroundColor",k))k=Gb;var t=Gb;if(o!=Gb&&!(_isIE&&(_IEver<=7||_IEver<=9&&_isBackCompat)))t=document.getElementById(o);var u=Gb;if(j.parentNode.tagName=="DIV"){var s=j.parentNode,n=s.currentStyle||document.defaultView.getComputedStyle(s,Kb);if(n.overflowX==Lb||n.overflowX==Ib||(n.overflowY==Lb||n.overflowY==Ib))u=s}return new _FixedHeader(u,j,p,d,i,c,b,q,v,f,g,h,k,l,t)}
function _onBodyScroll(){for(var a=0;a<_fixedHeaders.length;a++)_fixedHeaders[a].onBodyScroll()}
function _onBodyResize(){if(_execFlag)return;_resizeTimerId!=Gb&&clearTimeout(_resizeTimerId);var a=function(){_execute(n)};
_resizeTimerId=setTimeout(a,200)}
function _execute(b){_execFlag=Fb;_resizeTimerId=Gb;for(var a=0;a<_fixedHeaders.length;a++)if(b==n)_fixedHeaders[a].initOnResize();else _fixedHeaders[a].init();_resizeSourceDiv();for(var a=0;a<_fixedHeaders.length;a++)_fixedHeaders[a].main();_execFlag=Eb}
function _resizeSourceDiv(){for(var b=Eb,a=0;a<_fixedHeaders.length;a++)if(_fixedHeaders[a].hideAllDivs(Fb))b=Fb;if(!b)return;for(var a=0;a<_fixedHeaders.length;a++)_fixedHeaders[a].resizeSourceDiv1();var d=document.body.style.overflowX,c=document.body.currentStyle||document.defaultView.getComputedStyle(document.body,Kb);if(_body.scrollWidth<=_body.clientWidth&&c.overflowX!=Ib)document.body.style.overflowX=Mb;for(var a=0;a<_fixedHeaders.length;a++)_fixedHeaders[a].resizeDivHeight();for(var a=0;a<_fixedHeaders.length;a++)_fixedHeaders[a].resizeDivWidth();document.body.style.overflowX=d;for(var a=0;a<_fixedHeaders.length;a++)_fixedHeaders[a].resizeSourceDiv2();for(var a=0;a<_fixedHeaders.length;a++)_fixedHeaders[a].hideAllDivs(Eb)}
function _FixedHeader(a,d,C,n,x,u,A,mb,D,H,I,J,K,V,U){var m="CLIENT",s="visible",h="TBODY",g="1px",p=this,f=a!=Gb,b=Gb,c=Gb,e=Gb,hb=0,gb=0,bb=Kb,ab=Kb,M=Gb,O=Gb,t=[],nb=[],S=0,Z=0,sb=d.style.zIndex?d.style.zIndex:0,q=Eb,w=Eb,i=0,k=0,qb=0,rb=0,Y=0,X=0,R=0,zb=d.style.display,cb=Hb,eb=Hb,j=Gb,y=Hb,z=Hb,l=0,N=Gb,L=Gb;
p.init=function(){if(K==Gb){var e=f?a:d,b=_getBackgroundColor(e);if(b==Gb){var c=e.parentNode;while(c){b=_getBackgroundColor(c);if(b!=Gb)break;if(c.tagName=="HTML")break;c=c.parentNode}if(b==Gb)b="white"}K=b}if(f){_addEventListener(a,Ib,T);tb();R=_offsetWidth(d)}if(U)l=Math.max(_rect(U).bottom,0);lb()};
p.initOnResize=function(){z=Hb;y=Hb;eb=Hb;cb=Hb;if(U)l=Math.max(_rect(U).bottom,0);if(f){if(q||u>0)a.style.width=Kb;if(w||A>0)a.style.height=Kb;R=_offsetWidth(d)}lb()};
p.removeAllTables=function(d){b&&v(b);c&&v(c);e&&v(e);b=Gb;c=Gb;e=Gb;if(f){_removeEventListener(a,Ib,T);if(d){if(q||u>0)a.style.width=Kb;if(w||A>0)a.style.height=Kb}}};
p.hideAllDivs=function(h){if(!f)return Eb;var d=b==Gb?Gb:b.parentNode,g=c==Gb?Gb:c.parentNode,j=e==Gb?Gb:e.parentNode;if(h){d&&G(d,DIV_MIN_WIDTH);g&&F(g,DIV_MIN_HEIGHT)}var i=h?Nb:Kb;if(d)d.style.display=i;if(g)g.style.display=i;if(j)j.style.display=i;(q||w||u>0||A>0)&&wb(h);if(h){q&&r(a,DIV_MIN_WIDTH);w&&B(a,DIV_MIN_HEIGHT)}return Fb};
p.resizeSourceDiv1=function(){if(!f)return;var e=j!=Gb?j:d;if(u>0){i=_body.clientWidth/100*u;i=Math.max(i,DIV_MIN_WIDTH);var c=_offsetWidth(e)+Y;c=Math.min(c,i);r(a,c)}if(A>0){k=_body.clientHeight/100*A;k=Math.max(k,DIV_MIN_HEIGHT);var b=_offsetHeight(e)+X;b=Math.min(b,k);B(a,b)}};
p.resizeDivHeight=function(){if(!f)return;if(!w)return;if(_body.scrollHeight>_body.clientHeight){var e=Math.max(_body.scrollHeight-_body.clientHeight,0);a.style.height=Math.max(_body.clientHeight-30,MIN_SIZE)+PX;var g=Math.max(_body.scrollHeight-_body.clientHeight,0);k=_offsetHeight(a)-(g-e)}else{a.style.height=_body.clientHeight+PX;var h=Math.max(_body.scrollHeight-_body.clientHeight,0);k=_offsetHeight(a)-h}k--;k=Math.max(k,DIV_MIN_HEIGHT);var c=j!=Gb?j:d,b=_offsetHeight(c)+X;b=Math.min(b,k);if(mb)b=k;B(a,b)};
p.resizeDivWidth=function(){if(!f)return;if(!q)return;if(_body.scrollWidth>_body.clientWidth){var e=Math.max(_body.scrollWidth-_body.clientWidth,0);a.style.width=Math.max(_body.clientWidth-16,MIN_SIZE)+PX;var g=Math.max(_body.scrollWidth-_body.clientWidth,0);i=_offsetWidth(a)-(g-e)}else{a.style.width=_body.clientWidth+PX;var h=Math.max(_body.scrollWidth-_body.clientWidth,0);i=_offsetWidth(a)-h}i--;i=Math.max(i,DIV_MIN_WIDTH);var c=j!=Gb?j:d,b=_offsetWidth(c)+Y;b=Math.min(b,i);if(mb)b=i;if(_isIE)b--;r(a,b)};
p.resizeSourceDiv2=function(){if(!f)return;var b=j!=Gb?j:d;if((q||u>0)&&a.scrollWidth>a.clientWidth&&_offsetWidth(a)<i){var e=a.scrollWidth-a.clientWidth,c=Math.min(_offsetWidth(a)+e,i),l=a.style.overflowY;if(_isIE)a.style.overflowY=Mb;r(a,c);if(_isIE)a.style.overflowY=l}if((w||A>0)&&a.scrollHeight>a.clientHeight&&_offsetHeight(a)<k){var e=a.scrollHeight-a.clientHeight,g=Math.min(_offsetHeight(a)+e,k);B(a,g)}if((q||u>0)&&R>_offsetWidth(b)&&_offsetWidth(a)<i){var h=R-_offsetWidth(b),c=Math.min(_offsetWidth(a)+h,i);r(a,c)}};
p.checkZoom=function(){if(Math.abs(_offsetWidth(d)-hb)>=1||Math.abs(_offsetHeight(d)-gb)>=1||_colsWidthList(_cells(d.rows[0]))!=bb||_rowsHeightList(d.rows)!=ab)return Fb};
p.main=function(){var h=_offsetWidth(d),g=_offsetHeight(d),b=hb!=h,a=gb!=g;hb=h;gb=g;var c=_colsWidthList(_cells(d.rows[0]));if(bb!=c){bb=c;b=Fb}var e=_rowsHeightList(d.rows);if(ab!=e){ab=e;a=Fb}var i=xb(b||a);(i||b||a)&&yb();f&&Bb();if(f)T();else db(Fb)};
function xb(l){if(l){b!=Gb&&v(b);c!=Gb&&v(c);e!=Gb&&v(e);b=Gb;c=Gb;e=Gb}var i=Eb,j=d.rows,k=f?d.parentNode:_body,h=Eb,g=Eb;if(f){h=a.clientHeight<a.scrollHeight&&a.clientHeight!=0;g=a.clientWidth<a.scrollWidth&&a.clientWidth!=0}else{h=_body.clientHeight<_body.scrollHeight;g=_body.clientWidth<_body.scrollWidth;if(!h&&!g&&_body==document.documentElement){h=document.body.clientHeight<document.body.scrollHeight;g=document.body.clientWidth<document.body.scrollWidth}}if(n>0&&h)if(_rowsHeight(j,n)+30>=k.clientHeight)h=Eb;if(x>0&&g){var m=_cells(j[0]);if(_colsWidth(m,x)+30>=k.clientWidth)g=Eb}if(x>0&&g){if(c==Gb){c=fb(TID_NUMBER,j.length,x);if(c!=Gb)i=Fb}}else if(c!=Gb){v(c);c=Gb}if(n>0&&h){if(b==Gb){b=fb(TID_HEADER,n,C);if(b!=Gb)i=Fb}}else if(b!=Gb){v(b);b=Gb}if(b!=Gb&&c!=Gb){if(e==Gb){e=fb(TID_CORNER,n,x);i=Fb}}else if(e!=Gb){v(e);e=Gb}return i}
function yb(){if(b!=Gb){r(b,_offsetWidth(d));W(b)}if(c!=Gb){var g=_colsWidth(_cells(d.rows[0]),x),f=_colsWidth(_cells(c.rows[0]),x),a=f-g;a!=0&&r(c,_offsetWidth(c)-a);W(c);B(c,_offsetHeight(d))}if(e!=Gb){r(e,_offsetWidth(c));W(e);B(e,_offsetHeight(b))}}
function Bb(){var j=1,d=b==Gb?Gb:b.parentNode,f=c==Gb?Gb:c.parentNode,g=e==Gb?Gb:e.parentNode;d!=Gb&&E(d);f!=Gb&&E(f);g!=Gb&&E(g);if(d!=Gb){G(d,a.clientWidth);F(d,_offsetHeight(b));var i=_rect(b).bottom-_rect(d).bottom;i>0&&F(d,_offsetHeight(b)+i);d.clientHeight>=a.clientHeight&&F(d,a.clientHeight-j)}if(f!=Gb){F(f,a.clientHeight);G(f,_offsetWidth(c));var h=_rect(c).right-_rect(f).right;h>0&&G(f,_offsetWidth(c)+h);f.clientWidth>=a.clientWidth&&G(f,a.clientWidth-j)}if(g!=Gb){F(g,d.clientHeight);G(g,f.clientWidth)}}
function tb(){var b=a.cloneNode(Eb),c=d.cloneNode(Eb);b.style.position=Ob;b.style.left=Pb;b.style.top=Pb;b.style.minWidth=g;b.style.minHeight=g;a.parentNode.appendChild(b);var f=_rect(a),e=_rect(b);rb=f.top-e.top;qb=f.left-e.left;c.style.width="50px";c.style.height="50px";var i=document.createElement(h),k=document.createElement("TR"),j=document.createElement(Qb);j.appendChild(document.createTextNode("x"));k.appendChild(j);i.appendChild(k);c.appendChild(i);var m=b.offsetWidth,l=b.offsetHeight;b.appendChild(c);q=b.offsetWidth!=m;w=b.offsetHeight!=l;if(!q)u=Hb;if(!w)A=Hb;if(u>0)q=Eb;if(A>0)w=Eb;Y=_offsetWidth(b)-_offsetWidth(c);X=_offsetHeight(b)-_offsetHeight(c);b.parentNode.removeChild(b)}
function lb(){if(n==0&&x==0)return;var a=d.cloneNode(Eb);a.style.position=Ob;a.style.left=Pb;a.style.top=Pb;a.style.width=Lb;a.style.height=Lb;a.width=Kb;a.height=Kb;var j,m=_getElementByTagName(d,Jb);if(m==Gb)m=_getElementByTagName(d,h);if(m!=Gb)j=m.cloneNode(Eb);else j=document.createElement(h);a.appendChild(j);d.parentNode.appendChild(a);for(var y=Ab(),v=n>0?n:1,u=d.rows,q=0,c=0;c<v;c++){var p=u[c],o=p.cloneNode(Eb);o.style.height=_trHeight(p)+PX;for(var l=_cells(p),f=0;f<l.length;f++){var e=l[f],b=e.cloneNode(Eb);b.width=Kb;if(e.colSpan==1)b.style.width=q+PX;else{for(var s=Fb,r=1;r<e.colSpan;r++)if(!y[e.$FXH_COLINDEX+r]){s=Eb;break}if(s)b.style.width=Lb;else b.style.width=q+PX}b.appendChild(document.createTextNode(" "));o.appendChild(b)}j.appendChild(o);if(_isIE&&_IEver<=7&&!_isBackCompat){S=_trHeight(o)-_trHeight(p);S+=2}}for(var c=0;c<v;c++)for(var l=_cells(u[c]),w=_cells(j.rows[c]),f=0;f<l.length;f++){var e=l[f],b=w[f];if(b.style.width==Lb)continue;var i=c+"."+e.cellIndex;nb[i]=_offsetWidth(b)-b.clientWidth;t[i]=b.clientWidth-q;var g=e.currentStyle||document.defaultView.getComputedStyle(e,Kb),k=Hb;if(g.paddingLeft.match(/px$/)!=Gb&&g.paddingRight.match(/px$/)!=Gb)k=_pixel(g.paddingLeft)+_pixel(g.paddingRight);else if(g.padding.match(/px$/)!=Gb)k=_pixel(g.padding)*2;if(k>0)t[i]=Math.min(t[i],k);Z=Math.max(t[i],Z)}a.parentNode.removeChild(a)}
function Ab(){for(var g=n>0?n:1,l=d.rows,f=new Array(g),b=0;b<g;b++){f[b]=new Array(C);for(var a=0;a<C;a++)f[b][a]=Fb}for(var b=0;b<g;b++)for(var m=l[b],k=_cells(m),h=0,a=0;a<C;){if(!f[b][a]){a++;continue}var c=k[h];if(c.rowSpan>=2&&c.colSpan>=2)for(var e=0;e<c.rowSpan;e++)for(var i=0;i<c.colSpan;i++){if(e==0&&i==0)continue;f[b+e][a+i]=Eb}else{if(c.rowSpan>=2)for(var e=1;e<c.rowSpan;e++)f[b+e][a]=Eb;if(c.colSpan>=2)for(var e=1;e<c.colSpan;e++)f[b][a+e]=Eb}h++;a+=c.colSpan}for(var j=new Array(C),a=0;a<C;a++)j[a]=Eb;for(var b=0;b<g;b++)for(var m=l[b],k=_cells(m),h=0,a=0;a<C;a++){if(!f[b][a])continue;var c=k[h];c.$FXH_COLINDEX=a;if(c.colSpan==1)j[a]=Fb;h++}return j}
function fb(e,s,t){var j=" fixed_header_display_none_at_print",c=d.cloneNode(Eb),n=_getElementByTagName(d,"CAPTION"),p=_getElementByTagName(d,Jb),r=_getElementByTagName(d,h),i=Gb,m=Gb,k=Gb;if(n!=Gb){i=n.cloneNode(Fb);i.style.backgroundColor=K;i.style.overflow=Mb;if(e!=TID_HEADER){i.innerHTML="&nbsp;";i.style.height=_offsetHeight(n)+PX;i.style.backgroundColor=Rb}c.appendChild(i)}var q=0;if(p!=Gb){m=p.cloneNode(Eb);c.appendChild(m);q=p.rows.length}if(r!=Gb&&q<s){k=r.cloneNode(Eb);c.appendChild(k)}if(Cb(k,m,e,s,t,q)==Eb)return Gb;_linkElement(c,d,e,D,Eb);i!=Gb&&_linkElement(i,n,e,D,Fb);m!=Gb&&_linkElement(m,p,e,D,Eb);k!=Gb&&_linkElement(k,r,e,D,Eb);if(e!=TID_HEADER){c.style.marginRight=Pb;c.style.borderRightWidth=Pb;c.style.paddingRight=Pb}if(e!=TID_NUMBER){c.style.marginBottom=Pb;c.style.borderBottomWidth=Pb;c.style.paddingBottom=Pb}c.style.minWidth=g;c.style.minHeight=g;if(f){var b=a.cloneNode(Eb);b.$FXH_PADDING_WIDTH=undefined;b.$FXH_PADDING_HEIGHT=undefined;_linkElement(b,a,e,D,Eb);b.className+=j;b.style.overflowX=Mb;b.style.overflowY=Mb;_removeEventListener(b,Ib,T);e!=TID_CORNER&&_addEventListener(b,Ib,function(){vb(b,e)});if(e==TID_HEADER)b.style.borderRightWidth=Pb;else{b.style.marginRight=Pb;b.style.borderRightWidth=Pb;b.style.paddingRight=Pb}if(e==TID_NUMBER)b.style.borderBottomWidth=Pb;else{b.style.marginBottom=Pb;b.style.borderBottomWidth=Pb;b.style.paddingBottom=Pb}b.style.width="30px";b.style.height="30px";b.style.minWidth=g;b.style.minHeight=g;b.style.position=Ob;b.style.top=rb+PX;b.style.left=qb+PX;b.style.backgroundColor=K;b.appendChild(c);a.parentNode.appendChild(b)}else{c.className+=j;switch(_positionMode){case POS_FIXED:c.style.position=Sb;break;case POS_ABSOLUTE:c.style.position=Ob;break;default:c.style.position=Sb}c.style.marginTop=Pb;c.style.marginLeft=Pb;c.style.top=l+PX;c.style.left=Pb;c.style.backgroundColor=K;d.parentNode.appendChild(c)}_isOpera&&o(f?b:c,Eb);return c}
function Cb(q,r,g,y,s,z){for(var f=new Array(s),h=0;h<f.length;h++)f[h]=0;for(var v=d.rows,c=0;c<y;c++){var k=v[c],b=k.cloneNode(Eb);_linkElement(b,k,g,D,Eb);b.style.height=_trHeight(k)-S+PX;if(c==n-1&&g!=TID_NUMBER){if(H!=Gb)b.style.borderBottomColor=H;if(I!=Gb)b.style.borderBottomStyle=I;if(J!=Gb)b.style.borderBottomWidth=J}if(g!=TID_HEADER)b.style.borderRightWidth=Pb;if(c<z)r.appendChild(b);else q.appendChild(b);for(var w=_cells(k),l=0,e=0;e<s;){if(c<f[e]){e++;continue}if(l>=w.length)break;var a=w[l];l++;if(c+a.rowSpan>y)return Eb;f[e]=c+a.rowSpan;if(a.colSpan>=2){for(var h=1;h<a.colSpan;h++)f[e+h]=f[e];if(e+a.colSpan>s)return Eb}_radioCtl(a,"backup");var j=a.cloneNode(Fb);_radioCtl(a,"restore");_linkElement(j,a,g,D,Fb);b.appendChild(j);try{var p=c+"."+a.cellIndex;if(t[p]!=undefined){var C=t[p]+nb[p];j.style.width=_offsetWidth(a)-C+PX}else if(_isIE&&_IEver<=8&&a.colSpan>=2)j.style.width=a.clientWidth-Z+PX}catch(E){}var i=j.style;if(c+a.rowSpan==n&&g!=TID_NUMBER){if(H!=Gb)i.borderBottomColor=H;if(I!=Gb)i.borderBottomStyle=I;if(J!=Gb)i.borderBottomWidth=J}if(e+a.colSpan==x&&g!=TID_HEADER){if(H!=Gb)i.borderRightColor=H;if(I!=Gb)i.borderRightStyle=I;if(J!=Gb)i.borderRightWidth=J}e+=a.colSpan}if(_isIE&&_IEver<=9&&l==0){b.style.height=Pb;var A=_rect(k).bottom,m=b.parentNode;if(m.tagName!="TABLE")m=m.parentNode;var u=m.rows,o=c-1;while(u[o].style.height==Pb)o--;var B=A-_rect(v[o]).top;u[o].style.height=B-S+PX}}r!=Gb&&_radioCtl(r,Tb);q!=Gb&&_radioCtl(q,Tb);return Fb}
function E(b){var f=_rect(a),e=_rect(b),d=e.top-f.top,c=e.left-f.left;if(_isIE){if(d==Hb&&b.$TOP_DIFF==1)d=0;else b.$TOP_DIFF=d;if(c==Hb&&b.$LEFT_DIFF==1)c=0;else b.$LEFT_DIFF=c}if(d!=0)b.style.top=_pixel(b.style.top)-d+PX;if(c!=0)b.style.left=_pixel(b.style.left)-c+PX}
function v(a){if(f)a=a.parentNode;_unlinkElement(a);a.parentNode&&a.parentNode.removeChild(a)}
p.onBodyScroll=function(){if(f)return;if(_positionMode==POS_ABSOLUTE){if(!_isMobile){if(_getBodyScrollTop()!=z){o(b,Eb);o(e,Eb)}if(_getBodyScrollLeft()!=y){o(c,Eb);o(e,Eb)}}N!=Gb&&clearTimeout(N);N=setTimeout(db,200)}else db()};
function db(i){N=Gb;var h=_getBodyScrollTop()!=z,g=_getBodyScrollLeft()!=y;z=_getBodyScrollTop();y=_getBodyScrollLeft();if(h&&g)i=Fb;var f=_rect(d),m=b!=Gb&&f.top<l&&f.bottom>=b.offsetHeight+l,n=c!=Gb&&f.left<0&&f.right>=c.offsetWidth;b!=Gb&&o(b,m);c!=Gb&&o(c,n);e!=Gb&&o(e,m&&n);if(_positionMode==POS_MIX&&b!=Gb){var a=b.style;if(i||h&&a.position==Ob){a.position=Sb;a.left=f.left+PX;a.top=l+PX;if(e!=Gb)e.style.top=a.top;P(Eb)}else if(!h&&g&&a.position==Sb){a.position=Ob;a.left=y+f.left+PX;a.top=l+z+PX;kb()}}if(_positionMode==POS_MIX&&c!=Gb){var a=c.style;if(i||g&&a.position==Ob){a.position=Sb;a.left=Pb;a.top=f.top+PX;Q(Eb)}else if(!g&&h&&a.position==Sb){a.position=Ob;a.top=z+f.top+PX;a.left=y+PX;jb()}}if(_positionMode==POS_FIXED){if(b!=Gb&&g)b.style.left=f.left+PX;if(c!=Gb&&h)c.style.top=f.top+PX;if(b!=Gb&&b.style.top!=l+PX){b.style.top=l+PX;if(e!=Gb)e.style.top=b.style.top}}if(_positionMode==POS_ABSOLUTE&&i){if(b!=Gb)b.style.left=y+f.left+PX;if(c!=Gb)c.style.top=z+f.top+PX}if(_positionMode==POS_ABSOLUTE&&(h||g)){var k,j,p=_isMobile?1:4;if(b!=Gb&&h){b.style.top=l+z-_offsetHeight(b)+PX;if(e!=Gb)e.style.top=b.style.top;k=_offsetHeight(b)/p}if(c!=Gb&&g){c.style.left=y-_offsetWidth(c)+PX;if(e!=Gb)e.style.left=c.style.left;j=_offsetWidth(c)/p}L!=Gb&&clearTimeout(L);ib(h,g,k,j)}b!=Gb&&g&&P(Eb);c!=Gb&&h&&Q(Eb)}
function ib(k,i,j,h){L=Gb;var g=_getBodyScrollTop()+l,f=_getBodyScrollLeft(),d=g,a=f;if(b!=Gb&&k){d=_pixel(b.style.top)+j;if(j>0)d=Math.min(d,g);else d=Math.max(d,g);b.style.top=d+PX;if(e!=Gb)e.style.top=b.style.top}if(c!=Gb&&i){a=_pixel(c.style.left)+h;if(h>0)a=Math.min(a,f);else a=Math.max(a,f);c.style.left=a+PX;if(e!=Gb)e.style.left=c.style.left}if(g==d&&f==a){if(b!=Gb&&k){kb();if(e!=Gb)e.style.top=b.style.top}if(c!=Gb&&i){jb();if(e!=Gb)e.style.left=c.style.left}return}var m=function(){ib(k,i,j,h)};
L=setTimeout(m,20)}
function T(){var d=b==Gb?Gb:b.parentNode,f=c==Gb?Gb:c.parentNode,g=e==Gb?Gb:e.parentNode;o(d,a.scrollTop>0);o(f,a.scrollLeft>0);o(g,a.scrollTop>0&&a.scrollLeft>0);d!=Gb&&E(d);f!=Gb&&E(f);g!=Gb&&E(g);var h=a.scrollLeft!=cb,i=a.scrollTop!=eb;cb=a.scrollLeft;eb=a.scrollTop;if(d!=Gb&&h){d.$FXH_SCROLL_LEFT=a.scrollLeft;d.scrollLeft=a.scrollLeft;d.scrollLeft>0&&P(Eb)}if(f!=Gb&&i){f.$FXH_SCROLL_TOP=a.scrollTop;f.scrollTop=a.scrollTop;f.scrollTop>0&&Q(Eb)}}
function vb(b,c){if(c==TID_HEADER){if(Math.abs(b.scrollLeft-b.$FXH_SCROLL_LEFT)<5)return}else if(Math.abs(b.scrollTop-b.$FXH_SCROLL_TOP)<5)return;if(c==TID_HEADER)a.scrollLeft=b.scrollLeft;else a.scrollTop=b.scrollTop}
function kb(){if(b==Gb)return;var a=_rect(b);if(a.top<=l)return;b.style.top=l+_pixel(b.style.top)-a.top+PX}
function jb(){if(c==Gb)return;var a=_rect(c);if(a.left<=0)return;c.style.left=_pixel(c.style.left)-a.left+PX}
function P(p){if(b==Gb)return;if(!p){M!=Gb&&clearTimeout(M);M=setTimeout(function(){P(Fb)},200);return}M=Gb;var g,j;if(f){g=_rect(a).left;j=g+a.clientWidth}else{g=0;j=_body.clientWidth}if(c!=Gb&&c.style.visibility==s)g+=_offsetWidth(c);for(var m=_cells(d.rows[0]),n=_cells(b.rows[0]),e=0,l=0,h=0;h<m.length;h++){var k=_rect(m[h]).left;if(k<g)continue;if(k>j)break;var o=_rect(n[h]).left;e+=o-k;l++}if(l==0)return;if(e==0)return;e=e/l;e=Math.round(e);if(e==0)return;if(f){var i=b.parentNode;i.$FXH_SCROLL_LEFT=i.scrollLeft+e;i.scrollLeft+=e}else{var q=_pixel(b.style.left)-e;b.style.left=q+PX}}
function Q(o){if(c==Gb)return;if(_isOpera)return;if(!o){O!=Gb&&clearTimeout(O);O=setTimeout(function(){Q(Fb)},200);return}O=Gb;var g,j;if(f){g=_rect(a).top;j=g+a.clientHeight}else{g=0;j=_body.clientHeight}if(b!=Gb&&b.style.visibility==s)g+=_offsetHeight(b);for(var n=d.rows,m=c.rows,e=0,l=0,h=0;h<n.length;h++){var k=_rect(n[h]).top;if(k<g)continue;if(k>j)break;if(_cells(m[h]).length==0)continue;var p=_rect(m[h]).top;e+=p-k;l++}if(l==0)return;if(e==0)return;e=e/l;e=Math.round(e);if(e==0)return;if(f){var i=c.parentNode;i.$FXH_SCROLL_TOP=i.scrollTop+e;i.scrollTop+=e}else{var q=_pixel(c.style.top)-e;c.style.top=q+PX}}
function o(a,b){if(a==Gb)return;var c=b?s:Mb;if(a.style.visibility==c)return;a.style.visibility=c;if(_isIE)a.style.zIndex=b?sb:sb-1;if(_isOpera)a.style.opacity=b?V:0;if(b&&V<1){a.style.opacity=V;a.style.filter="alpha(opacity="+V*100+")"}}
function wb(b){if(!_isIE&&!_isIE11&&!_isFirefox&&!_isOpera)return;if(b){j=ub();a.appendChild(j);r(j,_offsetWidth(d));B(j,_offsetHeight(d));d.style.display=Nb}else{d.style.display=zb;a.removeChild(j);j=Gb}}
function ub(){var a=d.cloneNode(Eb),b=document.createElement(h),e=document.createElement("TR"),c=document.createElement(Qb);c.appendChild(document.createTextNode("dummy"));e.appendChild(c);b.appendChild(e);a.appendChild(b);return a}
function G(a,b){pb(a,m,b)}
function r(a,b){pb(a,"OFFSET",b)}
function F(a,b){ob(a,m,b)}
function B(a,b){ob(a,"OFFSET",b)}
function pb(a,g,f){var b=f;if(a.$FXH_PADDING_WIDTH!=undefined)b-=a.$FXH_PADDING_WIDTH;for(var d,c,e=0;e<2;e++){if(b<MIN_SIZE)b=MIN_SIZE;a.style.width=b+PX;d=g==m?a.clientWidth:_offsetWidth(a);c=d-f;if(a.$FXH_PADDING_WIDTH==undefined)a.$FXH_PADDING_WIDTH=c;if(c==0||b==MIN_SIZE)break;b-=c}}
function ob(a,g,e){var b=e;if(a.$FXH_PADDING_HEIGHT!=undefined)b-=a.$FXH_PADDING_HEIGHT;for(var d,c,f=0;f<2;f++){if(b<MIN_SIZE)b=MIN_SIZE;a.style.height=b+PX;d=g==m?a.clientHeight:_offsetHeight(a);c=d-e;if(a.$FXH_PADDING_HEIGHT==undefined)a.$FXH_PADDING_HEIGHT=c;if(c==0||b==MIN_SIZE)break;b-=c}}
function W(p){var g=d.rows,c=p.rows,e=c.length,k=_rowsHeight(g,e)+HEIGHT_MARGIN;if(_rowsHeight(c,e)<k)return;for(var a=0;a<e;a++){var q=_trHeight(c[a])-_trHeight(g[a]);if(q<HEIGHT_MARGIN)continue;for(var o=_cells(g[a]),j=_cells(c[a]),f=0;f<j.length;f++){var l=o[f],i=j[f],b=0,h=a+"."+l.cellIndex;if(t[h]!=undefined){if(t[h]<=0)continue;b=t[h]-2;if(b<0)b=0}var n=Math.ceil(b/2),m=Math.floor(b/2);i.style.paddingLeft=n+PX;i.style.paddingRight=m+PX;i.style.width=l.clientWidth-b+PX;if(_rowsHeight(c,e)<k)return}}}}
function _FixedElementList(){var b=this,a=[];
b.add=function(b){a.push(b)};
b.remove=function(c){for(var b=0;b<a.length;b++)if(a[b]==c){a.splice(b,1);return}};
b.get=function(d){for(var b=0;b<a.length;b++){var c=a[b];if(c.$SOURCE_ELEMENT==d)return c}return Gb};
b.getAll=function(e){for(var b=Gb,c=0;c<a.length;c++){var d=a[c];if(d.$SOURCE_ELEMENT==e){if(b==Gb)b=[];b.push(d)}}return b}}
function _linkElement(b,a,i,g,f){a.id&&!g&&b.removeAttribute("id");if(a.name)if(a.tagName==j&&a.type==k)b.name=RADIO_PREFIX+i+"_"+a.name;else b.removeAttribute("name");b.$SOURCE_ELEMENT=a;if(_fixedList!=Gb)_fixedList.add(b);else if(!a.$FXH_FIXED_ELEMENT)a.$FXH_FIXED_ELEMENT=b;else{var h=a.$FXH_FIXED_ELEMENT;if(!h.$IS_ARRAY){var d=[];d.$IS_ARRAY=Fb;a.$FXH_FIXED_ELEMENT=d;d.push(h)}a.$FXH_FIXED_ELEMENT.push(b)}_setEventHandler(b,a);if(f)for(var c=0;c<b.childNodes.length;c++){var e=b.childNodes[c];if(!e)continue;if(!e.tagName)continue;_linkElement(e,a.childNodes[c],i,g,f)}}
function _unlinkElement(c){if(_fixedList!=Gb){_fixedList.remove(c);var a=c.$SOURCE_ELEMENT;if(a&&a.$FXH_ON_CHANGE_FUNC&&_fixedList.get(a)==Gb){_removeEventListener(a,g,a.$FXH_ON_CHANGE_FUNC);a.$FXH_ON_CHANGE_FUNC=undefined}}else{var a=c.$SOURCE_ELEMENT;if(a&&a.$FXH_FIXED_ELEMENT){var d=a.$FXH_FIXED_ELEMENT;if(!d.$IS_ARRAY||d.length==1){a.$FXH_FIXED_ELEMENT=undefined;if(a.$FXH_ON_CHANGE_FUNC){_removeEventListener(a,g,a.$FXH_ON_CHANGE_FUNC);a.$FXH_ON_CHANGE_FUNC=undefined}}else{for(var f=[],b=0;b<d.length;b++)d[b]!=c&&f.push(d[b]);a.$FXH_FIXED_ELEMENT=f}}}for(var b=0;b<c.childNodes.length;b++){var e=c.childNodes[b];if(!e)continue;if(!e.tagName)continue;_unlinkElement(e)}}
function _setEventHandler(b,a){if(a.onclick)b.onclick=function(){return a.onclick()};
if(a.ondblclick)b.ondblclick=function(){return a.ondblclick()};
if(a.onkeydown)b.onkeydown=function(){return a.onkeydown()};
if(a.onkeypress)b.onkeypress=function(){return a.onkeypress()};
if(a.onkeyup)b.onkeyup=function(){return a.onkeyup()};
if(a.onmousedown)b.onmousedown=function(){return a.onmousedown()};
if(a.onmouseup)b.onmouseup=function(){return a.onmouseup()};
if(a.onmouseover)b.onmouseover=function(){return a.onmouseover()};
if(a.onmouseout)b.onmouseout=function(){return a.onmouseout()};
if(a.onmousemove)b.onmousemove=function(){return a.onmousemove()};
if(a.tagName==j||a.tagName=="SELECT"||a.tagName=="TEXTAREA"){switch(a.type){case e:case f:case h:_copyValue(a,b)}switch(a.type){case h:case k:case e:case f:case "text":case i:case l:b.onclick=function(){_copyValue(b,a);_copyValues(a,b);if(a.onclick)return a.onclick();return Fb};
b.onchange=function(){_copyValue(b,a);_copyValues(a,b);if(a.onchange)return a.onchange();return Fb};
if(a.$FXH_ON_CHANGE_FUNC==undefined){a.$FXH_ON_CHANGE_FUNC=function(){_copyValues(a)};
_addEventListener(a,g,a.$FXH_ON_CHANGE_FUNC)}}}else if(a.tagName=="FORM")b.onsubmit=function(){return Eb}}
function _copyValues(d,c){if(c==undefined)c=Gb;var a;if(_fixedList!=Gb){a=_fixedList.getAll(d);if(!a)return;for(var b=0;b<a.length;b++){if(a[b]==c)continue;_copyValue(d,a[b])}return}a=d.$FXH_FIXED_ELEMENT;if(!a)return;if(!a.$IS_ARRAY)a!=c&&_copyValue(d,a);else for(var b=0;b<a.length;b++){if(a[b]==c)continue;_copyValue(d,a[b])}}
function _copyValue(a,b){switch(a.type){case h:case k:b.checked=a.checked;break;case e:case f:for(var c=0;c<a.length;c++)b.options[c].selected=a.options[c].selected;b.selectedIndex=a.selectedIndex;break;case "text":case i:case l:b.value=a.value;break;default:try{b.value=a.value}catch(d){}}}
function _copyStyle(src,dst,styleName){for(var buf=styleName.split(","),i=0;i<buf.length;i++){var name=_trim(buf[i]);try{eval("dst.style."+name+" = src.style."+name)}catch(e){}}}
function _setStyle(element,styleName,value){try{eval("element.style."+styleName+" = value");return Fb}catch(e){return Eb}}
function _radioCtl(d,e){for(var c=d.getElementsByTagName(j),b=0;b<c.length;b++){var a=c[b];if(a.type!=k)continue;switch(e){case "backup":a.$FXH_CHECKED=a.checked;break;case "restore":a.checked=a.$FXH_CHECKED;break;case Tb:a.checked=a.$SOURCE_ELEMENT.checked}}}
function _createCSS(c,b){var a=document.createElement("STYLE");a.setAttribute("type","text/css");a.setAttribute("media",c);if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(document.createTextNode(b));document.body.appendChild(a)}
function _getBackgroundColor(d){var e=d.currentStyle||document.defaultView.getComputedStyle(d,Kb),a=e.backgroundColor;if(a==Rb)return Gb;if(a.match(/^rgba\(/)==Gb)return a;var g=a.replace(/^rgba\(/,Kb).replace(/\)/,Kb),c=g.split(","),b=Number(c[3]);if(b==1)return a;var f="rgb("+_color(Number(c[0]),b)+", "+_color(Number(c[1]),b)+", "+_color(Number(c[2]),b)+")";return f}
function _color(a,b){var c=Math.round(a+(255-a)*(1-b));return Math.min(c,255)}
function _addEventListener(a,b,c){if(a.addEventListener)a.addEventListener(b,c,Eb);else a.attachEvent&&a.attachEvent("on"+b,c)}
function _removeEventListener(a,b,c){if(a.removeEventListener)a.removeEventListener(b,c,Eb);else a.detachEvent&&a.detachEvent("on"+b,c)}
function _getBodyScrollTop(){if(_isBackCompat)return document.body.scrollTop;if(_isChrome||_isSafari)return document.body.scrollTop;return document.documentElement.scrollTop}
function _getBodyScrollLeft(){if(_isBackCompat)return document.body.scrollLeft;if(_isChrome||_isSafari)return document.body.scrollLeft;return document.documentElement.scrollLeft}
function _offsetWidth(b){var a=_rect(b);return a.right-a.left}
function _offsetHeight(b){var a=_rect(b);return a.bottom-a.top}
function _rowsHeight(a,b){return _rect(a[b-1]).bottom-_rect(a[0]).top}
function _colsWidth(a,c){for(var d=0,b=0;b<a.length;b++){d+=a[b].colSpan;if(d==c){c=b+1;break}}return _rect(a[c-1]).right-_rect(a[0]).left}
function _colsWidthList(c){for(var b=Kb,a=0;a<c.length;a++){if(a>0)b+=",";b+=c[a].offsetWidth}return b}
function _rowsHeightList(c){for(var b=Kb,a=0;a<c.length;a++){if(a>0)b+=",";b+=c[a].offsetHeight}return b}
function _trHeight(a){if(_isIE&&_IEver==8&&!_isBackCompat)return a.clientHeight;else return _offsetHeight(a)}
function _cells(g){var a=g.getElementsByTagName(Qb),b=g.getElementsByTagName("TH");if(a.length==0&&b.length==0)return a;if(a.length>0&&b.length==0)return a;if(a.length==0&&b.length>0)return b;for(var e=a[0].parentNode.childNodes,f=[],d=0;d<e.length;d++){var c=e[d];(c.tagName==Qb||c.tagName=="TH")&&f.push(c)}return f}
function _pixel(a){if(a.match(/px$/)!=Gb)a=a.substring(0,a.length-2);return Number(a)}
function _percent(a){if(a.match(/%$/)!=Gb)a=a.substring(0,a.length-1);return Number(a)}
function _trim(a){return a.replace(/^[ \u7e32\u0080]+/,Kb).replace(/[ \u7e32\u0080]+$/,Kb)}
function _rect(a){return a.getBoundingClientRect()}
function _getElementByTagName(b,c){var a=b.getElementsByTagName(c);if(a.length==0)return Gb;return a[0]}
function _createObjectForFirefox(){var a=document.createElement("SPAN");a.style.display=Nb;a.style.position=Ob;a.style.top=Pb;a.style.left=Pb;document.body.appendChild(a);return a}
function _createObjectForChrome(){var a=document.createElement("SPAN");a.style.position=Sb;a.style.top="0";a.style.left="0";a.style.height="0";a.style.width="0";document.body.appendChild(a)}
}
