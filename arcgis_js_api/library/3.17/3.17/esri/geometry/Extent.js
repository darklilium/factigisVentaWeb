// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.
//>>built
define("esri/geometry/Extent","dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/has ../kernel ../lang ../SpatialReference ./Geometry ./Point ./webMercatorUtils ./mathUtils ../srUtils".split(" "),function(y,w,t,z,x,A,s,B,m,u,C,D){var v={type:"extent",xmin:0,ymin:0,xmax:0,ymax:0},g=y(B,{declaredClass:"esri.geometry.Extent",constructor:function(a,c,b,d,e){t.mixin(this,v);t.isObject(a)?(t.mixin(this,a),this.spatialReference&&(this.spatialReference=D.createSpatialReference(this.spatialReference))):
this.update(a,c,b,d,e);this.verifySR()},getWidth:function(){return Math.abs(this.xmax-this.xmin)},getHeight:function(){return Math.abs(this.ymax-this.ymin)},getCenter:function(){return new m((this.xmin+this.xmax)/2,(this.ymin+this.ymax)/2,this.spatialReference)},centerAt:function(a){var c=this.getCenter(),b=a.x-c.x;a=a.y-c.y;return new g(this.xmin+b,this.ymin+a,this.xmax+b,this.ymax+a,this.spatialReference)},update:function(a,c,b,d,e){this.xmin=a;this.ymin=c;this.xmax=b;this.ymax=d;this.spatialReference=
e;this.clearCache();return this},offset:function(a,c){return new g(this.xmin+a,this.ymin+c,this.xmax+a,this.ymax+c,this.spatialReference)},expand:function(a){var c=(1-a)/2;a=this.getWidth()*c;c*=this.getHeight();return new g(this.xmin+a,this.ymin+c,this.xmax-a,this.ymax-c,this.spatialReference)},intersects:function(a){if(!a)return!1;var c=a.type,b=this.spatialReference,d=a.spatialReference;b&&(d&&!b.equals(d)&&b._canProject(d))&&(a=b.isWebMercator()?u.geographicToWebMercator(a):u.webMercatorToGeographic(a,
!0));switch(c){case "point":return this.contains(a);case "multipoint":return this._intersectsMultipoint(a);case "extent":return this._intersectsExtent(a);case "polygon":return this._intersectsPolygon(a);case "polyline":return this._intersectsPolyline(a)}},normalize:function(){var a=this._normalize(!1,!0);t.isArray(a)||(a=[a]);return a},shiftCentralMeridian:function(){return this._normalize(!0)},bisect:function(){var a=this.spatialReference,c=a&&a._getInfo(),b=[],d=0;if(c&&this._isOutOfBounds(c)){var e=
this,d=e.xmin,f=e.ymin,h=e.ymax,E=c.valid[0],k=c.valid[1];e.getWidth()>2*k&&(e=e.getCenter(),e=new g(e.x-k,f,e.x+k,h,new s(a.toJson())));var d=e.xmin-d,l=this._normalizeX(e.xmin,c),c=this._normalizeX(e.xmax,c);l.frameId===c.frameId?b.push(new g(l.x,f,c.x,h,new s(a.toJson()))):b.push(new g(l.x,f,k,h,new s(a.toJson())),new g(E,f,c.x,h,new s(a.toJson())))}else b.push(this.getExtent());return{extents:b,marginLeft:d}},_intersectsMultipoint:function(a){var c=a.points.length,b;for(b=0;b<c;b++)if(this.contains(a.getPoint(b)))return!0;
return!1},_intersectsExtent:function(a){var c,b,d,e,f=!1;this.xmin<=a.xmin?(c=a.xmin,this.xmax<c?f=!0:d=Math.min(this.xmax,a.xmax)-c):(c=this.xmin,a.xmax<c?f=!0:d=Math.min(this.xmax,a.xmax)-c);this.ymin<=a.ymin?(b=a.ymin,this.ymax<b?f=!0:e=Math.min(this.ymax,a.ymax)-b):(b=this.ymin,a.ymax<b?f=!0:e=Math.min(this.ymax,a.ymax)-b);return f?null:new g(c,b,c+d,b+e,this.spatialReference)},_intersectsPolygon:function(a){var c=[this.xmin,this.ymax],b=[this.xmax,this.ymax],d=[this.xmin,this.ymin],e=[this.xmax,
this.ymin],f=[c,b,d,e],c=[[d,c],[c,b],[b,e],[e,d]],d=a.rings,e=d.length,h,g=new m(0,0,this.spatialReference);h=f.length;for(b=0;b<h;b++)if(g.update(f[b][0],f[b][1]),a.contains(g))return!0;g.setSpatialReference(a.spatialReference);for(var k,l,b=0;b<e;b++)if(f=d[b],h=f.length){k=f[0];g.update(k[0],k[1]);if(this.contains(g))return!0;for(a=1;a<h;a++){l=f[a];g.update(l[0],l[1]);if(this.contains(g)||this._intersectsLine([k,l],c))return!0;k=l}}return!1},_intersectsPolyline:function(a){var c=[[[this.xmin,
this.ymin],[this.xmin,this.ymax]],[[this.xmin,this.ymax],[this.xmax,this.ymax]],[[this.xmax,this.ymax],[this.xmax,this.ymin]],[[this.xmax,this.ymin],[this.xmin,this.ymin]]],b,d=a.paths,e=d.length,f,h,g,k,l=new m(0,0,a.spatialReference);for(a=0;a<e;a++)if(f=d[a],h=f.length){g=f[0];l.update(g[0],g[1]);if(this.contains(l))return!0;for(b=1;b<h;b++){k=f[b];l.update(k[0],k[1]);if(this.contains(l)||this._intersectsLine([g,k],c))return!0;g=k}}return!1},_intersectsLine:function(a,c){var b=C._getLineIntersection2,
d,e=c.length;for(d=0;d<e;d++)if(b(a,c[d]))return!0;return!1},contains:function(a){if(!a)return!1;var c=a.type;if("point"===c){var b=this.spatialReference,d=a.spatialReference,c=a.x;a=a.y;b&&(d&&!b.equals(d)&&b._canProject(d))&&(a=b.isWebMercator()?m.lngLatToXY(c,a):m.xyToLngLat(c,a,!0),c=a[0],a=a[1]);return c>=this.xmin&&c<=this.xmax&&a>=this.ymin&&a<=this.ymax}return"extent"===c?this._containsExtent(a):!1},_containsExtent:function(a){var c=a.xmin,b=a.ymin,d=a.xmax,e=a.ymax,f=a.spatialReference;a=
new m(c,b,f);c=new m(c,e,f);e=new m(d,e,f);b=new m(d,b,f);return this.contains(a)&&this.contains(c)&&this.contains(e)&&this.contains(b)?!0:!1},union:function(a){return new g(Math.min(this.xmin,a.xmin),Math.min(this.ymin,a.ymin),Math.max(this.xmax,a.xmax),Math.max(this.ymax,a.ymax),this.spatialReference)},getExtent:function(){var a=this.spatialReference;return new g(this.xmin,this.ymin,this.xmax,this.ymax,a&&new s(a.toJson()))},_shiftCM:function(a){var c=this.getCacheValue("_shifted");if(!c){var c=
new g(this.toJson()),b=c.spatialReference;if(a=a||b._getInfo()){var d=this._getCM(a);if(d){var e=b._isWebMercator()?u.webMercatorToGeographic(d):d;c.xmin-=d.x;c.xmax-=d.x;b._isWebMercator()||(e.x=this._normalizeX(e.x,a).x);c.setSpatialReference(new s(A.substitute({Central_Meridian:e.x},4326===b.wkid?a.altTemplate:a.wkTemplate)))}}this.setCacheValue("_shifted",c)}return c},_getCM:function(a){var c;this._isOutOfBounds(a)&&(c=this.getCenter());return c},_isOutOfBounds:function(a){var c=a.valid[0];a=
a.valid[1];var b=this.xmin,d=this.xmax;return!(b>=c&&b<=a&&d>=c&&d<=a)},_normalize:function(a,c,b){var d=new g(this.toJson()),e=d.spatialReference;if(e&&(b=b||e._getInfo())){var f=w.map(this._getParts(b),function(a){return a.extent});return 2<f.length?a?this._shiftCM(b):d.update(b.valid[0],d.ymin,b.valid[1],d.ymax,e):2===f.length?a?this._shiftCM(b):c?f:{rings:w.map(f,function(a){return[[a.xmin,a.ymin],[a.xmin,a.ymax],[a.xmax,a.ymax],[a.xmax,a.ymin],[a.xmin,a.ymin]]}),spatialReference:e}:f[0]||d}return d},
_getParts:function(a){var c=this.getCacheValue("_parts");if(!c){var c=[],b=this.xmin,d=this.xmax,e=this.ymin,f=this.ymax,h=this.spatialReference,m=this.getWidth(),k=b,l=d,r=0,n=0,p,q;a=a||h._getInfo();p=a.valid[0];q=a.valid[1];n=this._normalizeX(b,a);b=n.x;r=n.frameId;n=this._normalizeX(d,a);d=n.x;n=n.frameId;a=b===d&&0<m;if(m>2*q){m=new g(k<l?b:d,e,q,f,h);b=new g(p,e,k<l?d:b,f,h);q=new g(0,e,q,f,h);e=new g(p,e,0,f,h);h=[];p=[];m.contains(q)&&h.push(r);m.contains(e)&&p.push(r);b.contains(q)&&h.push(n);
b.contains(e)&&p.push(n);for(f=r+1;f<n;f++)h.push(f),p.push(f);c.push({extent:m,frameIds:[r]},{extent:b,frameIds:[n]},{extent:q,frameIds:h},{extent:e,frameIds:p})}else b>d||a?c.push({extent:new g(b,e,q,f,h),frameIds:[r]},{extent:new g(p,e,d,f,h),frameIds:[n]}):c.push({extent:new g(b,e,d,f,h),frameIds:[r]});this.setCacheValue("_parts",c)}return c},_normalizeX:function(a,c){var b=0,d=c.valid[0],e=c.valid[1],f=2*e;a>e?(b=Math.ceil(Math.abs(a-e)/f),a-=b*f):a<d&&(b=Math.ceil(Math.abs(a-d)/f),a+=b*f,b=
-b);return{x:a,frameId:b}},toJson:function(){var a={xmin:this.xmin,ymin:this.ymin,xmax:this.xmax,ymax:this.ymax},c=this.spatialReference;c&&(a.spatialReference=c.toJson());return a}});g.defaultProps=v;z("extend-esri")&&(t.setObject("geometry.Extent",g,x),x.geometry.defaultExtent=v);return g});