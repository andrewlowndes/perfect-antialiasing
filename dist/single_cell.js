(self.webpackChunksubpixel_rendering=self.webpackChunksubpixel_rendering||[]).push([[320],{479:(e,t,a)=>{"use strict";const n=a(395),o=a(923),s=a(345),c=a(669),i=a(713),r=a(887),l=r.vec2.fromValues(117.00665,155.76694999999998),m=r.vec2.fromValues(216.7078,155.76),p=r.vec2.fromValues(216.7078,255.42639999999997),u={p1:l,p2:m,p3:p,e1:c.sub(m,l),e2:c.sub(p,m),e3:c.sub(l,p)};u.points=[u.p1,u.p2,u.p3],u.center=c.avg(...u.points);const d=r.vec2.fromValues(100,50),v=r.vec2.fromValues(250,250),h={min:d,size:v,max:c.add(d,v)},g=document.getElementById("game"),f=g.getContext("2d");if(!f)throw new Error("No canvas :(");let P,b,x;g.onwheel=function(e){e.deltaY>0?r.vec2.scale(h.size,h.size,.9):e.deltaY<0&&r.vec2.scale(h.size,h.size,1.1);const t=c.scale(c.sub(h.size,c.sub(h.max,h.min)),.5);return r.vec2.subtract(h.min,h.min,t),r.vec2.add(h.max,h.max,t),!1},g.onmousemove=function(e){const t=g.getBoundingClientRect(),a=r.vec2.fromValues(e.pageX-t.left-document.documentElement.scrollLeft,g.height-(e.pageY-t.top-document.documentElement.scrollTop)),n=c.scale(h.size,.5);r.vec2.copy(h.min,c.sub(a,n)),r.vec2.copy(h.max,c.add(a,n))};const M=()=>{u.points.forEach((e=>{r.vec2.rotate(e,e,u.center,.01)})),u.e1=c.sub(u.p2,u.p1),u.e2=c.sub(u.p3,u.p2),u.e3=c.sub(u.p1,u.p3),P=n.intersectCellTriangle(u,h),b=s.clamp(o.polygonArea(P)/(e=>e.size[0]*e.size[1])(h),0,1),x=Math.floor(255*(1-b)),f.clearRect(0,0,g.width,g.height),f.fillStyle="rgb("+x+","+x+","+x+")",f.fillRect(h.min[0],g.height-h.min[1]-h.size[1],h.size[0],h.size[1]),f.strokeStyle="green",f.strokeRect(h.min[0],g.height-h.min[1]-h.size[1],h.size[0],h.size[1]),f.strokeStyle="red",f.beginPath(),i.polygonPath(f,[u.p1,u.p2,u.p3]),f.stroke(),f.strokeStyle="blue",f.beginPath(),i.polygonPath(f,P),f.stroke(),requestAnimationFrame(M)};requestAnimationFrame(M)},395:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.intersectCellTriangle=void 0;const n=a(669),o=a(345),s=a(857);t.intersectCellTriangle=(e,t)=>{const a=[],c=o.timeAtPos(e.p1[0],e.e1[0],t.min[0]),i=o.timeAtPos(e.p1[0],e.e1[0],t.max[0]),r=o.timeAtPos(e.p1[1],e.e1[1],t.min[1]),l=o.timeAtPos(e.p1[1],e.e1[1],t.max[1]);a.push(...s.sort(c,i,r,l).map((a=>n.clamp2(n.add(e.p1,n.scale(e.e1,a)),t.min,t.max))));const m=o.timeAtPos(e.p2[0],e.e2[0],t.min[0]),p=o.timeAtPos(e.p2[0],e.e2[0],t.max[0]),u=o.timeAtPos(e.p2[1],e.e2[1],t.min[1]),d=o.timeAtPos(e.p2[1],e.e2[1],t.max[1]);a.push(...s.sort(m,p,u,d).map((a=>n.clamp2(n.add(e.p2,n.scale(e.e2,a)),t.min,t.max))));const v=o.timeAtPos(e.p3[0],e.e3[0],t.min[0]),h=o.timeAtPos(e.p3[0],e.e3[0],t.max[0]),g=o.timeAtPos(e.p3[1],e.e3[1],t.min[1]),f=o.timeAtPos(e.p3[1],e.e3[1],t.max[1]);return a.push(...s.sort(v,h,g,f).map((a=>n.clamp2(n.add(e.p3,n.scale(e.e3,a)),t.min,t.max)))),a}},923:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.polygonArea=t.polygonAreaSigned=void 0;const n=a(669);t.polygonAreaSigned=e=>{if(!e.length)return 0;const t=e.length-1;let a=0;for(let o=0;o<t;o++)a+=n.determinant2(e[o],e[o+1]);return a+=n.determinant2(e[t],e[0]),a/2},t.polygonArea=e=>Math.abs(t.polygonAreaSigned(e))},345:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.lerp=t.timeAtPos=t.clamp=t.fract=t.negFract=t.EPSILON=void 0,t.EPSILON=1e-6,t.negFract=e=>1-e+Math.floor(e),t.fract=e=>e-Math.floor(e),t.clamp=(e,t,a)=>Math.max(Math.min(e,a),t),t.timeAtPos=(e,a,n)=>a?t.clamp((n-e)/a,0,1):0,t.lerp=(e,t,a)=>e*(1-a)+t*a},669:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.inRange=t.avg=t.max2=t.min2=t.toPrecision2=t.lerp2=t.normalize=t.length=t.dot=t.sign=t.abs=t.ceil=t.floor=t.sub=t.adds=t.add=t.divide=t.multiply=t.scale=t.equals=t.determinant2=t.clamp2=void 0;const n=a(887);t.clamp2=(e,t,a)=>{const o=n.vec2.clone(e);return n.vec2.min(o,o,a),n.vec2.max(o,o,t),o},t.determinant2=(e,t)=>e[0]*t[1]-e[1]*t[0],t.equals=n.vec2.equals,t.scale=(e,t)=>n.vec2.scale(n.vec2.create(),e,t),t.multiply=(e,t)=>n.vec2.multiply(n.vec2.create(),e,t),t.divide=(e,t)=>n.vec2.divide(n.vec2.create(),e,t),t.add=(e,t)=>n.vec2.add(n.vec2.create(),e,t),t.adds=(e,t)=>n.vec2.fromValues(e[0]+t,e[1]+t),t.sub=(e,t)=>n.vec2.sub(n.vec2.create(),e,t),t.floor=e=>n.vec2.floor(n.vec2.create(),e),t.ceil=e=>n.vec2.ceil(n.vec2.create(),e),t.abs=e=>n.vec2.fromValues(Math.abs(e[0]),Math.abs(e[1])),t.sign=e=>n.vec2.fromValues(Math.sign(e[0]),Math.sign(e[1])),t.dot=(e,t)=>n.vec2.dot(e,t),t.length=e=>n.vec2.length(e),t.normalize=e=>t.scale(e,1/t.length(e)),t.lerp2=(e,t,a)=>n.vec2.lerp(n.vec2.create(),e,t,a),t.toPrecision2=(e,t)=>(e[0]=parseFloat(e[0].toPrecision(t)),e[1]=parseFloat(e[1].toPrecision(t)),e),t.min2=(...e)=>{const[t,...a]=e,o=n.vec2.clone(t);return a.forEach((e=>{n.vec2.min(o,o,e)})),o},t.max2=(...e)=>{const[t,...a]=e,o=n.vec2.clone(t);return a.forEach((e=>{n.vec2.max(o,o,e)})),o},t.avg=(...e)=>{const t=n.vec2.create();return e.length&&(e.forEach((e=>{n.vec2.add(t,t,e)})),n.vec2.scale(t,t,1/e.length)),t},t.inRange=(e,t,a)=>!(e[0]>a[0]||e[0]<t[0]||e[1]>a[1]||e[1]<t[1])},857:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sort=void 0,t.sort=(e,t,a,n)=>{const o=Math.min(e,t),s=Math.max(e,t),c=Math.min(a,n),i=Math.max(a,n),r=Math.min(s,c),l=Math.max(s,c),m=Math.max(o,r),p=Math.min(l,i);return[Math.min(o,r),Math.min(m,p),Math.max(m,p),Math.max(l,i)]}},713:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.polygonPath=void 0,t.polygonPath=(e,t)=>{if(!t||!t.length)return;const a=t[0];e.moveTo(a[0],e.canvas.height-a[1]);for(let a=1;a<t.length;a++){const n=t[a];e.lineTo(n[0],e.canvas.height-n[1])}e.closePath()}}},e=>{"use strict";e(e.s=479)}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdWJwaXhlbC1yZW5kZXJpbmcvLi9zcmMvZGVtb3Mvc2luZ2xlQ2VsbC50cyIsIndlYnBhY2s6Ly9zdWJwaXhlbC1yZW5kZXJpbmcvLi9zcmMvZ2VvbWV0cnkvaW50ZXJzZWN0Q2VsbFRyaWFuZ2xlLnRzIiwid2VicGFjazovL3N1YnBpeGVsLXJlbmRlcmluZy8uL3NyYy9nZW9tZXRyeS9wb2x5Z29uQXJlYS50cyIsIndlYnBhY2s6Ly9zdWJwaXhlbC1yZW5kZXJpbmcvLi9zcmMvbWF0aHMvY29tbW9uLnRzIiwid2VicGFjazovL3N1YnBpeGVsLXJlbmRlcmluZy8uL3NyYy9tYXRocy9wb2ludC50cyIsIndlYnBhY2s6Ly9zdWJwaXhlbC1yZW5kZXJpbmcvLi9zcmMvbWF0aHMvc29ydC50cyIsIndlYnBhY2s6Ly9zdWJwaXhlbC1yZW5kZXJpbmcvLi9zcmMvcmVuZGVyL3BvbHlnb25QYXRoLnRzIl0sIm5hbWVzIjpbImludGVyc2VjdENlbGxUcmlhbmdsZV8xIiwicG9seWdvbkFyZWFfMSIsImNvbW1vbl8xIiwicG9pbnRfMSIsInBvbHlnb25QYXRoXzEiLCJnbF9tYXRyaXhfMSIsInAxIiwidmVjMiIsImZyb21WYWx1ZXMiLCJwMiIsInAzIiwidHJpYW5nbGUiLCJlMSIsInN1YiIsImUyIiwiZTMiLCJwb2ludHMiLCJjZW50ZXIiLCJhdmciLCJjZWxsTWluIiwiY2VsbFNpemUiLCJjZWxsIiwibWluIiwic2l6ZSIsIm1heCIsImFkZCIsImdhbWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZyIsImdldENvbnRleHQiLCJFcnJvciIsImNlbGxGaWxsUG9seWdvbiIsImFyZWFDb3ZlcmFnZSIsImNlbGxDb2xvdXIiLCJvbndoZWVsIiwiZSIsImRlbHRhWSIsInNjYWxlIiwiZGVsdGEiLCJzdWJ0cmFjdCIsIm9ubW91c2Vtb3ZlIiwiYm91bmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibW91c2VQb3MiLCJwYWdlWCIsImxlZnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxMZWZ0IiwiaGVpZ2h0IiwicGFnZVkiLCJ0b3AiLCJzY3JvbGxUb3AiLCJoYWxmU2l6ZSIsImNvcHkiLCJkcmF3IiwiZm9yRWFjaCIsInBvaW50Iiwicm90YXRlIiwiaW50ZXJzZWN0Q2VsbFRyaWFuZ2xlIiwiY2xhbXAiLCJwb2x5Z29uQXJlYSIsImNlbGxBcmVhIiwiTWF0aCIsImZsb29yIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsInN0cm9rZVN0eWxlIiwic3Ryb2tlUmVjdCIsImJlZ2luUGF0aCIsInBvbHlnb25QYXRoIiwic3Ryb2tlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJzb3J0XzEiLCJ0MSIsInRpbWVBdFBvcyIsInQyIiwidDMiLCJ0NCIsInB1c2giLCJzb3J0IiwibWFwIiwidCIsImNsYW1wMiIsInQ1IiwidDYiLCJ0NyIsInQ4IiwidDkiLCJ0MTAiLCJ0MTEiLCJ0MTIiLCJwb2x5Z29uQXJlYVNpZ25lZCIsImxlbmd0aCIsImxhc3RJbmRleCIsImFyZWEiLCJpIiwiZGV0ZXJtaW5hbnQyIiwiYWJzIiwibGVycCIsImZyYWN0IiwibmVnRnJhY3QiLCJFUFNJTE9OIiwieCIsImEiLCJzdGFydFBvcyIsImRpciIsIm5ld1BvcyIsImIiLCJpblJhbmdlIiwibWF4MiIsIm1pbjIiLCJ0b1ByZWNpc2lvbjIiLCJsZXJwMiIsIm5vcm1hbGl6ZSIsImRvdCIsInNpZ24iLCJjZWlsIiwiYWRkcyIsImRpdmlkZSIsIm11bHRpcGx5IiwiZXF1YWxzIiwib3V0IiwiY2xvbmUiLCJjcmVhdGUiLCJhbW91bnQiLCJwYXJzZUZsb2F0IiwidG9QcmVjaXNpb24iLCJvYmpzIiwiZmlyc3QiLCJyZXN0IiwicmVzdWx0Iiwib2JqIiwiYyIsImQiLCJmIiwiaCIsImZpcnN0UG9pbnQiLCJtb3ZlVG8iLCJjYW52YXMiLCJsaW5lVG8iLCJj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QyxFQUFhL0gsRUFBTyxHQUMxQmEsRUFBRW1ILE9BQU9ELEVBQVcsR0FBSWxILEVBQUVvSCxPQUFPaEcsT0FBUzhGLEVBQVcsSUFDckQsSUFBSyxJQUFJekMsRUFBSSxFQUFHQSxFQUFJdEYsRUFBT21GLE9BQVFHLElBQUssQ0FDcEMsTUFBTTdDLEVBQVF6QyxFQUFPc0YsR0FDckJ6RSxFQUFFcUgsT0FBT3pGLEVBQU0sR0FBSTVCLEVBQUVvSCxPQUFPaEcsT0FBU1EsRUFBTSxJQUUvQzVCLEVBQUVzSCxlIiwiZmlsZSI6InNpbmdsZV9jZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgaW50ZXJzZWN0Q2VsbFRyaWFuZ2xlXzEgPSByZXF1aXJlKFwiLi4vZ2VvbWV0cnkvaW50ZXJzZWN0Q2VsbFRyaWFuZ2xlXCIpO1xyXG5jb25zdCBwb2x5Z29uQXJlYV8xID0gcmVxdWlyZShcIi4uL2dlb21ldHJ5L3BvbHlnb25BcmVhXCIpO1xyXG5jb25zdCBjb21tb25fMSA9IHJlcXVpcmUoXCIuLi9tYXRocy9jb21tb25cIik7XHJcbmNvbnN0IHBvaW50XzEgPSByZXF1aXJlKFwiLi4vbWF0aHMvcG9pbnRcIik7XHJcbmNvbnN0IHBvbHlnb25QYXRoXzEgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3BvbHlnb25QYXRoXCIpO1xyXG5jb25zdCBnbF9tYXRyaXhfMSA9IHJlcXVpcmUoXCJnbC1tYXRyaXhcIik7XHJcbmNvbnN0IHAxID0gZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDExNy4wMDY2NDk5OTk5OTk5OTcsIDE1NS43NjY5NDk5OTk5OTk5OCk7XHJcbmNvbnN0IHAyID0gZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDIxNi43MDc4LCAxNTUuNzYpO1xyXG5jb25zdCBwMyA9IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcygyMTYuNzA3OCwgMjU1LjQyNjM5OTk5OTk5OTk3KTtcclxuY29uc3QgdHJpYW5nbGUgPSB7XHJcbiAgICBwMSxcclxuICAgIHAyLFxyXG4gICAgcDMsXHJcbiAgICBlMTogcG9pbnRfMS5zdWIocDIsIHAxKSxcclxuICAgIGUyOiBwb2ludF8xLnN1YihwMywgcDIpLFxyXG4gICAgZTM6IHBvaW50XzEuc3ViKHAxLCBwMylcclxufTtcclxudHJpYW5nbGUucG9pbnRzID0gW3RyaWFuZ2xlLnAxLCB0cmlhbmdsZS5wMiwgdHJpYW5nbGUucDNdO1xyXG50cmlhbmdsZS5jZW50ZXIgPSBwb2ludF8xLmF2ZyguLi50cmlhbmdsZS5wb2ludHMpO1xyXG5jb25zdCBjZWxsTWluID0gZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDEwMCwgNTApO1xyXG5jb25zdCBjZWxsU2l6ZSA9IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcygyNTAsIDI1MCk7XHJcbmNvbnN0IGNlbGwgPSB7XHJcbiAgICBtaW46IGNlbGxNaW4sXHJcbiAgICBzaXplOiBjZWxsU2l6ZSxcclxuICAgIG1heDogcG9pbnRfMS5hZGQoY2VsbE1pbiwgY2VsbFNpemUpXHJcbn07XHJcbmNvbnN0IGdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVcIik7XHJcbmNvbnN0IGcgPSBnYW1lLmdldENvbnRleHQoXCIyZFwiKTtcclxuaWYgKCFnKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNhbnZhcyA6KCcpO1xyXG59XHJcbmNvbnN0IHNjYWxlQW1vdW50ID0gMC4xO1xyXG4vL2ludGVyc2VjdCB0aGUgdHJpYW5nbGUgd2l0aCB0aGUgY2VsbCBhbmQgcHJvZHVjZSBhIHBvbHlnb25cclxubGV0IGNlbGxGaWxsUG9seWdvbiwgYXJlYUNvdmVyYWdlLCBjZWxsQ29sb3VyO1xyXG5nYW1lLm9ud2hlZWwgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKGUuZGVsdGFZID4gMCkge1xyXG4gICAgICAgIGdsX21hdHJpeF8xLnZlYzIuc2NhbGUoY2VsbC5zaXplLCBjZWxsLnNpemUsICgxLjAgLSBzY2FsZUFtb3VudCkpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZS5kZWx0YVkgPCAwKSB7XHJcbiAgICAgICAgZ2xfbWF0cml4XzEudmVjMi5zY2FsZShjZWxsLnNpemUsIGNlbGwuc2l6ZSwgKDEuMCArIHNjYWxlQW1vdW50KSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBkZWx0YSA9IHBvaW50XzEuc2NhbGUocG9pbnRfMS5zdWIoY2VsbC5zaXplLCBwb2ludF8xLnN1YihjZWxsLm1heCwgY2VsbC5taW4pKSwgMC41KTtcclxuICAgIGdsX21hdHJpeF8xLnZlYzIuc3VidHJhY3QoY2VsbC5taW4sIGNlbGwubWluLCBkZWx0YSk7XHJcbiAgICBnbF9tYXRyaXhfMS52ZWMyLmFkZChjZWxsLm1heCwgY2VsbC5tYXgsIGRlbHRhKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuZ2FtZS5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBjb25zdCBib3VuZHMgPSBnYW1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgbW91c2VQb3MgPSBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoZS5wYWdlWCAtIGJvdW5kcy5sZWZ0IC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsIGdhbWUuaGVpZ2h0IC0gKGUucGFnZVkgLSBib3VuZHMudG9wIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCkpO1xyXG4gICAgY29uc3QgaGFsZlNpemUgPSBwb2ludF8xLnNjYWxlKGNlbGwuc2l6ZSwgMC41KTtcclxuICAgIGdsX21hdHJpeF8xLnZlYzIuY29weShjZWxsLm1pbiwgcG9pbnRfMS5zdWIobW91c2VQb3MsIGhhbGZTaXplKSk7XHJcbiAgICBnbF9tYXRyaXhfMS52ZWMyLmNvcHkoY2VsbC5tYXgsIHBvaW50XzEuYWRkKG1vdXNlUG9zLCBoYWxmU2l6ZSkpO1xyXG59O1xyXG5jb25zdCByb3RhdGVBbW91bnQgPSAwLjAxO1xyXG5jb25zdCBjZWxsQXJlYSA9IChjZWxsKSA9PiBjZWxsLnNpemVbMF0gKiBjZWxsLnNpemVbMV07XHJcbmNvbnN0IGRyYXcgPSAoKSA9PiB7XHJcbiAgICB0cmlhbmdsZS5wb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgICBnbF9tYXRyaXhfMS52ZWMyLnJvdGF0ZShwb2ludCwgcG9pbnQsIHRyaWFuZ2xlLmNlbnRlciwgcm90YXRlQW1vdW50KTtcclxuICAgIH0pO1xyXG4gICAgdHJpYW5nbGUuZTEgPSBwb2ludF8xLnN1Yih0cmlhbmdsZS5wMiwgdHJpYW5nbGUucDEpO1xyXG4gICAgdHJpYW5nbGUuZTIgPSBwb2ludF8xLnN1Yih0cmlhbmdsZS5wMywgdHJpYW5nbGUucDIpO1xyXG4gICAgdHJpYW5nbGUuZTMgPSBwb2ludF8xLnN1Yih0cmlhbmdsZS5wMSwgdHJpYW5nbGUucDMpO1xyXG4gICAgY2VsbEZpbGxQb2x5Z29uID0gaW50ZXJzZWN0Q2VsbFRyaWFuZ2xlXzEuaW50ZXJzZWN0Q2VsbFRyaWFuZ2xlKHRyaWFuZ2xlLCBjZWxsKTtcclxuICAgIGFyZWFDb3ZlcmFnZSA9IGNvbW1vbl8xLmNsYW1wKHBvbHlnb25BcmVhXzEucG9seWdvbkFyZWEoY2VsbEZpbGxQb2x5Z29uKSAvIGNlbGxBcmVhKGNlbGwpLCAwLCAxKTsgLy9jbGFtcCBkdWUgdG8gcm91bmRpbmcgZXJyb3JzXHJcbiAgICBjZWxsQ29sb3VyID0gTWF0aC5mbG9vcigoMS4wIC0gYXJlYUNvdmVyYWdlKSAqIDI1NSk7XHJcbiAgICAvL2NvbXBhcmUgb3VyIGJyYW5jaC1sZXNzIHRyaWFuZ2xlIHNxdWFyZSBjbGlwcGluZ1xyXG4gICAgLypcclxuICAgIGNvbnN0IGNvcnJlY3RQb2x5Z29uID0gcG9seWdvbmNsaXAodHJpYW5nbGUucG9pbnRzISwgY2VsbCk7XHJcbiAgICBjb25zdCBjb3JyZWN0QXJlYUNvdmVyYWdlID0gY2xhbXAocG9seWdvbkFyZWEoY29ycmVjdFBvbHlnb24pIC8gY2VsbEFyZWEoY2VsbCksIDAsIDEpOyAvL2NsYW1wIGR1ZSB0byByb3VuZGluZyBlcnJvcnNcclxuICBcclxuICAgIGlmIChjb3JyZWN0QXJlYUNvdmVyYWdlLnRvRml4ZWQoNSkgIT09IGFyZWFDb3ZlcmFnZS50b0ZpeGVkKDUpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0luY29ycmVjdCBhcmVhLCBleHBlY3RlZCAnICsgY29ycmVjdEFyZWFDb3ZlcmFnZSArICcgYnV0IGdvdCAnICsgYXJlYUNvdmVyYWdlKTtcclxuICAgIH1cclxuICAgICovXHJcbiAgICBnLmNsZWFyUmVjdCgwLCAwLCBnYW1lLndpZHRoLCBnYW1lLmhlaWdodCk7XHJcbiAgICAvL2ZpbGwgaW4gdGhlIGNlbGwgdXNpbmcgYSBncmV5c2NhbGUgYmFzZWQgb24gdGhlIGFyZWEgY292ZXJhZ2VcclxuICAgIGcuZmlsbFN0eWxlID0gXCJyZ2IoXCIgKyBjZWxsQ29sb3VyICsgXCIsXCIgKyBjZWxsQ29sb3VyICsgXCIsXCIgKyBjZWxsQ29sb3VyICsgXCIpXCI7XHJcbiAgICBnLmZpbGxSZWN0KGNlbGwubWluWzBdLCBnYW1lLmhlaWdodCAtIGNlbGwubWluWzFdIC0gY2VsbC5zaXplWzFdLCBjZWxsLnNpemVbMF0sIGNlbGwuc2l6ZVsxXSk7XHJcbiAgICAvL2RyYXcgb3VyIGNlbGxcclxuICAgIGcuc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XHJcbiAgICBnLnN0cm9rZVJlY3QoY2VsbC5taW5bMF0sIGdhbWUuaGVpZ2h0IC0gY2VsbC5taW5bMV0gLSBjZWxsLnNpemVbMV0sIGNlbGwuc2l6ZVswXSwgY2VsbC5zaXplWzFdKTtcclxuICAgIC8vZHJhdyBvdXIgdHJpYW5nbGVcclxuICAgIGcuc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgZy5iZWdpblBhdGgoKTtcclxuICAgIHBvbHlnb25QYXRoXzEucG9seWdvblBhdGgoZywgW3RyaWFuZ2xlLnAxLCB0cmlhbmdsZS5wMiwgdHJpYW5nbGUucDNdKTtcclxuICAgIGcuc3Ryb2tlKCk7XHJcbiAgICAvL2RyYXcgb3VyIHBvbHlnb25cclxuICAgIGcuc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcclxuICAgIGcuYmVnaW5QYXRoKCk7XHJcbiAgICBwb2x5Z29uUGF0aF8xLnBvbHlnb25QYXRoKGcsIGNlbGxGaWxsUG9seWdvbik7XHJcbiAgICBnLnN0cm9rZSgpO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG59O1xyXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuaW50ZXJzZWN0Q2VsbFRyaWFuZ2xlID0gdm9pZCAwO1xyXG5jb25zdCBwb2ludF8xID0gcmVxdWlyZShcIi4uL21hdGhzL3BvaW50XCIpO1xyXG5jb25zdCBjb21tb25fMSA9IHJlcXVpcmUoXCIuLi9tYXRocy9jb21tb25cIik7XHJcbmNvbnN0IHNvcnRfMSA9IHJlcXVpcmUoXCIuLi9tYXRocy9zb3J0XCIpO1xyXG5jb25zdCBpbnRlcnNlY3RDZWxsVHJpYW5nbGUgPSAodHJpYW5nbGUsIGNlbGwpID0+IHtcclxuICAgIC8vcmV0dXJuIHBvbHlnb25jbGlwKHRyaWFuZ2xlLnBvaW50cywgY2VsbCk7XHJcbiAgICAvL2JyYW5jaC1sZXNzIGNyZWF0aW9uIG9mIHRoZSBpbnRlcnNlY3RlZCBwb2ludHMgb2YgdGhlIHRyaWFuZ2xlIHdpdGhpbiB0aGUgcGl4ZWxcclxuICAgIGNvbnN0IHBvaW50cyA9IFtdO1xyXG4gICAgY29uc3QgdDEgPSBjb21tb25fMS50aW1lQXRQb3ModHJpYW5nbGUucDFbMF0sIHRyaWFuZ2xlLmUxWzBdLCBjZWxsLm1pblswXSk7XHJcbiAgICBjb25zdCB0MiA9IGNvbW1vbl8xLnRpbWVBdFBvcyh0cmlhbmdsZS5wMVswXSwgdHJpYW5nbGUuZTFbMF0sIGNlbGwubWF4WzBdKTtcclxuICAgIGNvbnN0IHQzID0gY29tbW9uXzEudGltZUF0UG9zKHRyaWFuZ2xlLnAxWzFdLCB0cmlhbmdsZS5lMVsxXSwgY2VsbC5taW5bMV0pO1xyXG4gICAgY29uc3QgdDQgPSBjb21tb25fMS50aW1lQXRQb3ModHJpYW5nbGUucDFbMV0sIHRyaWFuZ2xlLmUxWzFdLCBjZWxsLm1heFsxXSk7XHJcbiAgICBwb2ludHMucHVzaCguLi5zb3J0XzEuc29ydCh0MSwgdDIsIHQzLCB0NCkubWFwKHQgPT4gcG9pbnRfMS5jbGFtcDIocG9pbnRfMS5hZGQodHJpYW5nbGUucDEsIHBvaW50XzEuc2NhbGUodHJpYW5nbGUuZTEsIHQpKSwgY2VsbC5taW4sIGNlbGwubWF4KSkpO1xyXG4gICAgY29uc3QgdDUgPSBjb21tb25fMS50aW1lQXRQb3ModHJpYW5nbGUucDJbMF0sIHRyaWFuZ2xlLmUyWzBdLCBjZWxsLm1pblswXSk7XHJcbiAgICBjb25zdCB0NiA9IGNvbW1vbl8xLnRpbWVBdFBvcyh0cmlhbmdsZS5wMlswXSwgdHJpYW5nbGUuZTJbMF0sIGNlbGwubWF4WzBdKTtcclxuICAgIGNvbnN0IHQ3ID0gY29tbW9uXzEudGltZUF0UG9zKHRyaWFuZ2xlLnAyWzFdLCB0cmlhbmdsZS5lMlsxXSwgY2VsbC5taW5bMV0pO1xyXG4gICAgY29uc3QgdDggPSBjb21tb25fMS50aW1lQXRQb3ModHJpYW5nbGUucDJbMV0sIHRyaWFuZ2xlLmUyWzFdLCBjZWxsLm1heFsxXSk7XHJcbiAgICBwb2ludHMucHVzaCguLi5zb3J0XzEuc29ydCh0NSwgdDYsIHQ3LCB0OCkubWFwKHQgPT4gcG9pbnRfMS5jbGFtcDIocG9pbnRfMS5hZGQodHJpYW5nbGUucDIsIHBvaW50XzEuc2NhbGUodHJpYW5nbGUuZTIsIHQpKSwgY2VsbC5taW4sIGNlbGwubWF4KSkpO1xyXG4gICAgY29uc3QgdDkgPSBjb21tb25fMS50aW1lQXRQb3ModHJpYW5nbGUucDNbMF0sIHRyaWFuZ2xlLmUzWzBdLCBjZWxsLm1pblswXSk7XHJcbiAgICBjb25zdCB0MTAgPSBjb21tb25fMS50aW1lQXRQb3ModHJpYW5nbGUucDNbMF0sIHRyaWFuZ2xlLmUzWzBdLCBjZWxsLm1heFswXSk7XHJcbiAgICBjb25zdCB0MTEgPSBjb21tb25fMS50aW1lQXRQb3ModHJpYW5nbGUucDNbMV0sIHRyaWFuZ2xlLmUzWzFdLCBjZWxsLm1pblsxXSk7XHJcbiAgICBjb25zdCB0MTIgPSBjb21tb25fMS50aW1lQXRQb3ModHJpYW5nbGUucDNbMV0sIHRyaWFuZ2xlLmUzWzFdLCBjZWxsLm1heFsxXSk7XHJcbiAgICBwb2ludHMucHVzaCguLi5zb3J0XzEuc29ydCh0OSwgdDEwLCB0MTEsIHQxMikubWFwKHQgPT4gcG9pbnRfMS5jbGFtcDIocG9pbnRfMS5hZGQodHJpYW5nbGUucDMsIHBvaW50XzEuc2NhbGUodHJpYW5nbGUuZTMsIHQpKSwgY2VsbC5taW4sIGNlbGwubWF4KSkpO1xyXG4gICAgcmV0dXJuIHBvaW50cztcclxufTtcclxuZXhwb3J0cy5pbnRlcnNlY3RDZWxsVHJpYW5nbGUgPSBpbnRlcnNlY3RDZWxsVHJpYW5nbGU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMucG9seWdvbkFyZWEgPSBleHBvcnRzLnBvbHlnb25BcmVhU2lnbmVkID0gdm9pZCAwO1xyXG5jb25zdCBwb2ludF8xID0gcmVxdWlyZShcIi4uL21hdGhzL3BvaW50XCIpO1xyXG5jb25zdCBwb2x5Z29uQXJlYVNpZ25lZCA9IChwb2ludHMpID0+IHtcclxuICAgIGlmICghcG9pbnRzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGFzdEluZGV4ID0gcG9pbnRzLmxlbmd0aCAtIDE7XHJcbiAgICBsZXQgYXJlYSA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RJbmRleDsgaSsrKSB7XHJcbiAgICAgICAgYXJlYSArPSBwb2ludF8xLmRldGVybWluYW50Mihwb2ludHNbaV0sIHBvaW50c1tpICsgMV0pO1xyXG4gICAgfVxyXG4gICAgYXJlYSArPSBwb2ludF8xLmRldGVybWluYW50Mihwb2ludHNbbGFzdEluZGV4XSwgcG9pbnRzWzBdKTtcclxuICAgIHJldHVybiBhcmVhIC8gMjtcclxufTtcclxuZXhwb3J0cy5wb2x5Z29uQXJlYVNpZ25lZCA9IHBvbHlnb25BcmVhU2lnbmVkO1xyXG5jb25zdCBwb2x5Z29uQXJlYSA9IChwb2ludHMpID0+IHtcclxuICAgIHJldHVybiBNYXRoLmFicyhleHBvcnRzLnBvbHlnb25BcmVhU2lnbmVkKHBvaW50cykpO1xyXG59O1xyXG5leHBvcnRzLnBvbHlnb25BcmVhID0gcG9seWdvbkFyZWE7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMubGVycCA9IGV4cG9ydHMudGltZUF0UG9zID0gZXhwb3J0cy5jbGFtcCA9IGV4cG9ydHMuZnJhY3QgPSBleHBvcnRzLm5lZ0ZyYWN0ID0gZXhwb3J0cy5FUFNJTE9OID0gdm9pZCAwO1xyXG5leHBvcnRzLkVQU0lMT04gPSAwLjAwMDAwMTtcclxuY29uc3QgbmVnRnJhY3QgPSAoeCkgPT4gMS4wIC0geCArIE1hdGguZmxvb3IoeCk7XHJcbmV4cG9ydHMubmVnRnJhY3QgPSBuZWdGcmFjdDtcclxuY29uc3QgZnJhY3QgPSAoeCkgPT4geCAtIE1hdGguZmxvb3IoeCk7XHJcbmV4cG9ydHMuZnJhY3QgPSBmcmFjdDtcclxuY29uc3QgY2xhbXAgPSAoYSwgbWluLCBtYXgpID0+IE1hdGgubWF4KE1hdGgubWluKGEsIG1heCksIG1pbik7XHJcbmV4cG9ydHMuY2xhbXAgPSBjbGFtcDtcclxuY29uc3QgdGltZUF0UG9zID0gKHN0YXJ0UG9zLCBkaXIsIG5ld1BvcykgPT4gZGlyID8gZXhwb3J0cy5jbGFtcCgobmV3UG9zIC0gc3RhcnRQb3MpIC8gZGlyLCAwLCAxKSA6IDA7XHJcbmV4cG9ydHMudGltZUF0UG9zID0gdGltZUF0UG9zO1xyXG5jb25zdCBsZXJwID0gKGEsIGIsIHQpID0+IGEgKiAoMSAtIHQpICsgYiAqIHQ7XHJcbmV4cG9ydHMubGVycCA9IGxlcnA7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuaW5SYW5nZSA9IGV4cG9ydHMuYXZnID0gZXhwb3J0cy5tYXgyID0gZXhwb3J0cy5taW4yID0gZXhwb3J0cy50b1ByZWNpc2lvbjIgPSBleHBvcnRzLmxlcnAyID0gZXhwb3J0cy5ub3JtYWxpemUgPSBleHBvcnRzLmxlbmd0aCA9IGV4cG9ydHMuZG90ID0gZXhwb3J0cy5zaWduID0gZXhwb3J0cy5hYnMgPSBleHBvcnRzLmNlaWwgPSBleHBvcnRzLmZsb29yID0gZXhwb3J0cy5zdWIgPSBleHBvcnRzLmFkZHMgPSBleHBvcnRzLmFkZCA9IGV4cG9ydHMuZGl2aWRlID0gZXhwb3J0cy5tdWx0aXBseSA9IGV4cG9ydHMuc2NhbGUgPSBleHBvcnRzLmVxdWFscyA9IGV4cG9ydHMuZGV0ZXJtaW5hbnQyID0gZXhwb3J0cy5jbGFtcDIgPSB2b2lkIDA7XHJcbmNvbnN0IGdsX21hdHJpeF8xID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcclxuY29uc3QgY2xhbXAyID0gKGEsIG1pbiwgbWF4KSA9PiB7XHJcbiAgICBjb25zdCBvdXQgPSBnbF9tYXRyaXhfMS52ZWMyLmNsb25lKGEpO1xyXG4gICAgZ2xfbWF0cml4XzEudmVjMi5taW4ob3V0LCBvdXQsIG1heCk7XHJcbiAgICBnbF9tYXRyaXhfMS52ZWMyLm1heChvdXQsIG91dCwgbWluKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbmV4cG9ydHMuY2xhbXAyID0gY2xhbXAyO1xyXG5jb25zdCBkZXRlcm1pbmFudDIgPSAocDEsIHAyKSA9PiAocDFbMF0gKiBwMlsxXSkgLSAocDFbMV0gKiBwMlswXSk7XHJcbmV4cG9ydHMuZGV0ZXJtaW5hbnQyID0gZGV0ZXJtaW5hbnQyO1xyXG5leHBvcnRzLmVxdWFscyA9IGdsX21hdHJpeF8xLnZlYzIuZXF1YWxzO1xyXG5jb25zdCBzY2FsZSA9IChwMSwgYSkgPT4gZ2xfbWF0cml4XzEudmVjMi5zY2FsZShnbF9tYXRyaXhfMS52ZWMyLmNyZWF0ZSgpLCBwMSwgYSk7XHJcbmV4cG9ydHMuc2NhbGUgPSBzY2FsZTtcclxuY29uc3QgbXVsdGlwbHkgPSAocDEsIHAyKSA9PiBnbF9tYXRyaXhfMS52ZWMyLm11bHRpcGx5KGdsX21hdHJpeF8xLnZlYzIuY3JlYXRlKCksIHAxLCBwMik7XHJcbmV4cG9ydHMubXVsdGlwbHkgPSBtdWx0aXBseTtcclxuY29uc3QgZGl2aWRlID0gKHAxLCBwMikgPT4gZ2xfbWF0cml4XzEudmVjMi5kaXZpZGUoZ2xfbWF0cml4XzEudmVjMi5jcmVhdGUoKSwgcDEsIHAyKTtcclxuZXhwb3J0cy5kaXZpZGUgPSBkaXZpZGU7XHJcbmNvbnN0IGFkZCA9IChwMSwgcDIpID0+IGdsX21hdHJpeF8xLnZlYzIuYWRkKGdsX21hdHJpeF8xLnZlYzIuY3JlYXRlKCksIHAxLCBwMik7XHJcbmV4cG9ydHMuYWRkID0gYWRkO1xyXG5jb25zdCBhZGRzID0gKHAxLCBhKSA9PiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMocDFbMF0gKyBhLCBwMVsxXSArIGEpO1xyXG5leHBvcnRzLmFkZHMgPSBhZGRzO1xyXG5jb25zdCBzdWIgPSAocDEsIHAyKSA9PiBnbF9tYXRyaXhfMS52ZWMyLnN1YihnbF9tYXRyaXhfMS52ZWMyLmNyZWF0ZSgpLCBwMSwgcDIpO1xyXG5leHBvcnRzLnN1YiA9IHN1YjtcclxuY29uc3QgZmxvb3IgPSAocDEpID0+IGdsX21hdHJpeF8xLnZlYzIuZmxvb3IoZ2xfbWF0cml4XzEudmVjMi5jcmVhdGUoKSwgcDEpO1xyXG5leHBvcnRzLmZsb29yID0gZmxvb3I7XHJcbmNvbnN0IGNlaWwgPSAocDEpID0+IGdsX21hdHJpeF8xLnZlYzIuY2VpbChnbF9tYXRyaXhfMS52ZWMyLmNyZWF0ZSgpLCBwMSk7XHJcbmV4cG9ydHMuY2VpbCA9IGNlaWw7XHJcbmNvbnN0IGFicyA9IChwMSkgPT4gZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKE1hdGguYWJzKHAxWzBdKSwgTWF0aC5hYnMocDFbMV0pKTtcclxuZXhwb3J0cy5hYnMgPSBhYnM7XHJcbmNvbnN0IHNpZ24gPSAocDEpID0+IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcyhNYXRoLnNpZ24ocDFbMF0pLCBNYXRoLnNpZ24ocDFbMV0pKTtcclxuZXhwb3J0cy5zaWduID0gc2lnbjtcclxuY29uc3QgZG90ID0gKHAxLCBwMikgPT4gZ2xfbWF0cml4XzEudmVjMi5kb3QocDEsIHAyKTtcclxuZXhwb3J0cy5kb3QgPSBkb3Q7XHJcbmNvbnN0IGxlbmd0aCA9IChwMSkgPT4gZ2xfbWF0cml4XzEudmVjMi5sZW5ndGgocDEpO1xyXG5leHBvcnRzLmxlbmd0aCA9IGxlbmd0aDtcclxuY29uc3Qgbm9ybWFsaXplID0gKHAxKSA9PiBleHBvcnRzLnNjYWxlKHAxLCAxIC8gZXhwb3J0cy5sZW5ndGgocDEpKTtcclxuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemU7XHJcbmNvbnN0IGxlcnAyID0gKGEsIGIsIHQpID0+IGdsX21hdHJpeF8xLnZlYzIubGVycChnbF9tYXRyaXhfMS52ZWMyLmNyZWF0ZSgpLCBhLCBiLCB0KTtcclxuZXhwb3J0cy5sZXJwMiA9IGxlcnAyO1xyXG4vL3dhcm5pbmc6IG11dGF0ZXMgYVxyXG5jb25zdCB0b1ByZWNpc2lvbjIgPSAoYSwgYW1vdW50KSA9PiB7XHJcbiAgICBhWzBdID0gcGFyc2VGbG9hdChhWzBdLnRvUHJlY2lzaW9uKGFtb3VudCkpO1xyXG4gICAgYVsxXSA9IHBhcnNlRmxvYXQoYVsxXS50b1ByZWNpc2lvbihhbW91bnQpKTtcclxuICAgIHJldHVybiBhO1xyXG59O1xyXG5leHBvcnRzLnRvUHJlY2lzaW9uMiA9IHRvUHJlY2lzaW9uMjtcclxuY29uc3QgbWluMiA9ICguLi5vYmpzKSA9PiB7XHJcbiAgICBjb25zdCBbZmlyc3QsIC4uLnJlc3RdID0gb2JqcztcclxuICAgIGNvbnN0IHJlc3VsdCA9IGdsX21hdHJpeF8xLnZlYzIuY2xvbmUoZmlyc3QpO1xyXG4gICAgcmVzdC5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICBnbF9tYXRyaXhfMS52ZWMyLm1pbihyZXN1bHQsIHJlc3VsdCwgb2JqKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5taW4yID0gbWluMjtcclxuY29uc3QgbWF4MiA9ICguLi5vYmpzKSA9PiB7XHJcbiAgICBjb25zdCBbZmlyc3QsIC4uLnJlc3RdID0gb2JqcztcclxuICAgIGNvbnN0IHJlc3VsdCA9IGdsX21hdHJpeF8xLnZlYzIuY2xvbmUoZmlyc3QpO1xyXG4gICAgcmVzdC5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICBnbF9tYXRyaXhfMS52ZWMyLm1heChyZXN1bHQsIHJlc3VsdCwgb2JqKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5tYXgyID0gbWF4MjtcclxuY29uc3QgYXZnID0gKC4uLm9ianMpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGdsX21hdHJpeF8xLnZlYzIuY3JlYXRlKCk7XHJcbiAgICBpZiAob2Jqcy5sZW5ndGgpIHtcclxuICAgICAgICBvYmpzLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICAgICAgICBnbF9tYXRyaXhfMS52ZWMyLmFkZChyZXN1bHQsIHJlc3VsdCwgb2JqKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBnbF9tYXRyaXhfMS52ZWMyLnNjYWxlKHJlc3VsdCwgcmVzdWx0LCAxIC8gb2Jqcy5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5hdmcgPSBhdmc7XHJcbmNvbnN0IGluUmFuZ2UgPSAocDEsIG1pbiwgbWF4KSA9PiB7XHJcbiAgICByZXR1cm4gIShwMVswXSA+IG1heFswXSB8fCBwMVswXSA8IG1pblswXSB8fCBwMVsxXSA+IG1heFsxXSB8fCBwMVsxXSA8IG1pblsxXSk7XHJcbn07XHJcbmV4cG9ydHMuaW5SYW5nZSA9IGluUmFuZ2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuc29ydCA9IHZvaWQgMDtcclxuLy9jcHUgdGVzdCBvZiBzb3J0aW5nIGZvdXIgZmxvYXRzIHdpdGhvdXQgYnJhbmNoIGNvbmRpdGlvbnNcclxuY29uc3Qgc29ydCA9ICh0MSwgdDIsIHQzLCB0NCkgPT4ge1xyXG4gICAgY29uc3QgYSA9IE1hdGgubWluKHQxLCB0Mik7XHJcbiAgICBjb25zdCBiID0gTWF0aC5tYXgodDEsIHQyKTtcclxuICAgIGNvbnN0IGMgPSBNYXRoLm1pbih0MywgdDQpO1xyXG4gICAgY29uc3QgZCA9IE1hdGgubWF4KHQzLCB0NCk7XHJcbiAgICBjb25zdCBlID0gTWF0aC5taW4oYiwgYyk7XHJcbiAgICBjb25zdCBmID0gTWF0aC5tYXgoYiwgYyk7XHJcbiAgICBjb25zdCBoID0gTWF0aC5tYXgoYSwgZSk7XHJcbiAgICBjb25zdCBpID0gTWF0aC5taW4oZiwgZCk7XHJcbiAgICByZXR1cm4gW01hdGgubWluKGEsIGUpLCBNYXRoLm1pbihoLCBpKSwgTWF0aC5tYXgoaCwgaSksIE1hdGgubWF4KGYsIGQpXTtcclxufTtcclxuZXhwb3J0cy5zb3J0ID0gc29ydDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5wb2x5Z29uUGF0aCA9IHZvaWQgMDtcclxuY29uc3QgcG9seWdvblBhdGggPSAoZywgcG9pbnRzKSA9PiB7XHJcbiAgICBpZiAoIXBvaW50cyB8fCAhcG9pbnRzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGZpcnN0UG9pbnQgPSBwb2ludHNbMF07XHJcbiAgICBnLm1vdmVUbyhmaXJzdFBvaW50WzBdLCBnLmNhbnZhcy5oZWlnaHQgLSBmaXJzdFBvaW50WzFdKTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcG9pbnQgPSBwb2ludHNbaV07XHJcbiAgICAgICAgZy5saW5lVG8ocG9pbnRbMF0sIGcuY2FudmFzLmhlaWdodCAtIHBvaW50WzFdKTtcclxuICAgIH1cclxuICAgIGcuY2xvc2VQYXRoKCk7XHJcbn07XHJcbmV4cG9ydHMucG9seWdvblBhdGggPSBwb2x5Z29uUGF0aDtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==