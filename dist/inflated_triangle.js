"use strict";(self.webpackChunksubpixel_rendering=self.webpackChunksubpixel_rendering||[]).push([[600],{69:(e,t,a)=>{const n=a(887),c=a(669),o=a(713),r=document.getElementById("inflateAmount"),s=document.getElementById("game"),l=s.getContext("2d"),i=n.vec2.fromValues(217.00664,255.7669),p=n.vec2.fromValues(416.7078,255.76),v=n.vec2.fromValues(416.7078,455.4263),u={p1:i,p2:p,p3:v,e1:(0,c.sub)(p,i),e2:(0,c.sub)(v,p),e3:(0,c.sub)(i,v),points:[i,p,v]};u.center=(0,c.avg)(...u.points);let m=20;r.value=m.toString(),r.oninput=()=>{m=parseFloat(r.value)},s.onmousemove=function(e){const t=s.getBoundingClientRect(),a=n.vec2.fromValues(e.pageX-t.left-document.documentElement.scrollLeft,s.height-(e.pageY-t.top-document.documentElement.scrollTop));n.vec2.copy(u.p2,a)};const h=()=>{n.vec2.rotate(u.p1,u.p1,u.center,.01),u.center=(0,c.avg)(...u.points),u.e1=(0,c.sub)(u.p2,u.p1),u.e2=(0,c.sub)(u.p3,u.p2),u.e3=(0,c.sub)(u.p1,u.p3);const e=[[u.p1,u.p2,u.p3],[u.p2,u.p3,u.p1],[u.p3,u.p1,u.p2]].map((([e,t,a])=>{const n=(0,c.normalize)((0,c.sub)(e,t)),o=(0,c.normalize)((0,c.sub)(a,t)),r=(0,c.scale)((0,c.normalize)((0,c.add)(n,o)),-1),s=Math.sqrt((1-(0,c.dot)(n,o))/2);return(0,c.add)(t,(0,c.scale)(r,m/s))}));l.clearRect(0,0,s.width,s.height),l.strokeStyle="red",l.beginPath(),(0,o.polygonPath)(l,u.points),l.stroke(),l.strokeStyle="green",l.beginPath(),(0,o.polygonPath)(l,e),l.stroke();const t=(0,c.min2)(...u.points),a=(0,c.max2)(...u.points);l.strokeStyle="blue",l.strokeRect(t[0]-m,l.canvas.height-a[1]-m,a[0]-t[0]+2*m,a[1]-t[1]+2*m),l.strokeStyle="orange",l.beginPath(),l.arc(u.p1[0],l.canvas.height-u.p1[1],m,0,2*Math.PI),l.stroke(),l.beginPath(),l.arc(u.p2[0],l.canvas.height-u.p2[1],m,0,2*Math.PI),l.stroke(),l.beginPath(),l.arc(u.p3[0],l.canvas.height-u.p3[1],m,0,2*Math.PI),l.stroke(),requestAnimationFrame(h)};requestAnimationFrame(h)},345:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.lerp=t.timeAtPos=t.clamp=t.fract=t.negFract=t.EPSILON=void 0,t.EPSILON=1e-6,t.negFract=e=>1-e+Math.floor(e),t.fract=e=>e-Math.floor(e),t.clamp=(e,t,a)=>Math.max(Math.min(e,a),t),t.timeAtPos=(e,a,n)=>a?(0,t.clamp)((n-e)/a,0,1):0,t.lerp=(e,t,a)=>e*(1-a)+t*a},669:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.inside=t.inRange=t.avg=t.max2=t.min2=t.toPrecision2=t.lerp2=t.normalize=t.length=t.dot=t.sign=t.abs=t.ceil=t.floor=t.sub=t.adds=t.add=t.divide=t.multiply=t.scale=t.equals=t.determinant2=t.clamp2=void 0;const n=a(887),c=a(345);t.clamp2=(e,t,a)=>{const c=n.vec2.clone(e);return n.vec2.min(c,c,a),n.vec2.max(c,c,t),c},t.determinant2=(e,t)=>e[0]*t[1]-e[1]*t[0],t.equals=n.vec2.equals,t.scale=(e,t)=>n.vec2.scale(n.vec2.create(),e,t),t.multiply=(e,t)=>n.vec2.multiply(n.vec2.create(),e,t),t.divide=(e,t)=>n.vec2.divide(n.vec2.create(),e,t),t.add=(e,t)=>n.vec2.add(n.vec2.create(),e,t),t.adds=(e,t)=>n.vec2.fromValues(e[0]+t,e[1]+t),t.sub=(e,t)=>n.vec2.sub(n.vec2.create(),e,t),t.floor=e=>n.vec2.floor(n.vec2.create(),e),t.ceil=e=>n.vec2.ceil(n.vec2.create(),e),t.abs=e=>n.vec2.fromValues(Math.abs(e[0]),Math.abs(e[1])),t.sign=e=>n.vec2.fromValues(Math.sign(e[0]),Math.sign(e[1])),t.dot=(e,t)=>n.vec2.dot(e,t),t.length=e=>n.vec2.length(e),t.normalize=e=>(0,t.scale)(e,1/(0,t.length)(e)),t.lerp2=(e,t,a)=>n.vec2.lerp(n.vec2.create(),e,t,a),t.toPrecision2=(e,t)=>(e[0]=parseFloat(e[0].toPrecision(t)),e[1]=parseFloat(e[1].toPrecision(t)),e),t.min2=(...e)=>{const[t,...a]=e,c=n.vec2.clone(t);return a.forEach((e=>{n.vec2.min(c,c,e)})),c},t.max2=(...e)=>{const[t,...a]=e,c=n.vec2.clone(t);return a.forEach((e=>{n.vec2.max(c,c,e)})),c},t.avg=(...e)=>{const t=n.vec2.create();return e.length&&(e.forEach((e=>{n.vec2.add(t,t,e)})),n.vec2.scale(t,t,1/e.length)),t},t.inRange=(e,t,a)=>!(e[0]>a[0]||e[0]<t[0]||e[1]>a[1]||e[1]<t[1]),t.inside=(e,t)=>{let a=0,n=e[e.length-1];return e.forEach((e=>{const o=n[1]<e[1]?n:e,r=n[1]<e[1]?e:n;o[1]<t[1]+c.EPSILON&&r[1]>t[1]+c.EPSILON&&(r[0]-o[0])*(t[1]-o[1])>(t[0]-o[0])*(r[1]-o[1])&&(a+=1),n=e})),a%2!=0}},713:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.polygonPath=void 0,t.polygonPath=(e,t)=>{if(!t||!t.length)return;const a=t[0];e.moveTo(a[0],e.canvas.height-a[1]);for(let a=1;a<t.length;a++){const n=t[a];e.lineTo(n[0],e.canvas.height-n[1])}e.closePath()}}},e=>{e(e.s=69)}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQU93RyxHQUNyQnBILEVBQUVxSCxPQUFPOUUsRUFBTSxHQUFJdkMsRUFBRThELE9BQU9qQyxPQUFTVSxFQUFNLElBRS9DdkMsRUFBRXNILGUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdWJwaXhlbC1yZW5kZXJpbmcvLi9zcmMvZGVtb3MvaW5mbGF0ZWRUcmlhbmdsZS50cyIsIndlYnBhY2s6Ly9zdWJwaXhlbC1yZW5kZXJpbmcvLi9zcmMvbWF0aHMvY29tbW9uLnRzIiwid2VicGFjazovL3N1YnBpeGVsLXJlbmRlcmluZy8uL3NyYy9tYXRocy9wb2ludC50cyIsIndlYnBhY2s6Ly9zdWJwaXhlbC1yZW5kZXJpbmcvLi9zcmMvcmVuZGVyL3BvbHlnb25QYXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGdsX21hdHJpeF8xID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcclxuY29uc3QgcG9pbnRfMSA9IHJlcXVpcmUoXCIuLi9tYXRocy9wb2ludFwiKTtcclxuY29uc3QgcG9seWdvblBhdGhfMSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvcG9seWdvblBhdGhcIik7XHJcbmNvbnN0IGluZmxhdGVBbW91bnREb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5mbGF0ZUFtb3VudCcpO1xyXG5jb25zdCBnYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKTtcclxuY29uc3QgZyA9IGdhbWUuZ2V0Q29udGV4dCgnMmQnKTtcclxuY29uc3QgcDEgPSBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMjE3LjAwNjY0LCAyNTUuNzY2OSk7XHJcbmNvbnN0IHAyID0gZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDQxNi43MDc4LCAyNTUuNzYpO1xyXG5jb25zdCBwMyA9IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcyg0MTYuNzA3OCwgNDU1LjQyNjMpO1xyXG5jb25zdCB0cmlhbmdsZSA9IHtcclxuICAgIHAxLFxyXG4gICAgcDIsXHJcbiAgICBwMyxcclxuICAgIGUxOiAoMCwgcG9pbnRfMS5zdWIpKHAyLCBwMSksXHJcbiAgICBlMjogKDAsIHBvaW50XzEuc3ViKShwMywgcDIpLFxyXG4gICAgZTM6ICgwLCBwb2ludF8xLnN1YikocDEsIHAzKSxcclxuICAgIHBvaW50czogW3AxLCBwMiwgcDNdXHJcbn07XHJcbnRyaWFuZ2xlLmNlbnRlciA9ICgwLCBwb2ludF8xLmF2ZykoLi4udHJpYW5nbGUucG9pbnRzKTtcclxubGV0IGluZmxhdGVBbW91bnQgPSAyMDtcclxuaW5mbGF0ZUFtb3VudERvbS52YWx1ZSA9IGluZmxhdGVBbW91bnQudG9TdHJpbmcoKTtcclxuaW5mbGF0ZUFtb3VudERvbS5vbmlucHV0ID0gKCkgPT4ge1xyXG4gICAgaW5mbGF0ZUFtb3VudCA9IHBhcnNlRmxvYXQoaW5mbGF0ZUFtb3VudERvbS52YWx1ZSk7XHJcbn07XHJcbmdhbWUub25tb3VzZW1vdmUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgY29uc3QgYm91bmRzID0gZ2FtZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IG1vdXNlUG9zID0gZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKGUucGFnZVggLSBib3VuZHMubGVmdCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LCBnYW1lLmhlaWdodCAtIChlLnBhZ2VZIC0gYm91bmRzLnRvcCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApKTtcclxuICAgIGdsX21hdHJpeF8xLnZlYzIuY29weSh0cmlhbmdsZS5wMiwgbW91c2VQb3MpO1xyXG59O1xyXG5jb25zdCByb3RhdGVBbW91bnQgPSAwLjAxO1xyXG5jb25zdCBkcmF3ID0gKCkgPT4ge1xyXG4gICAgZ2xfbWF0cml4XzEudmVjMi5yb3RhdGUodHJpYW5nbGUucDEsIHRyaWFuZ2xlLnAxLCB0cmlhbmdsZS5jZW50ZXIsIHJvdGF0ZUFtb3VudCk7XHJcbiAgICB0cmlhbmdsZS5jZW50ZXIgPSAoMCwgcG9pbnRfMS5hdmcpKC4uLnRyaWFuZ2xlLnBvaW50cyk7XHJcbiAgICB0cmlhbmdsZS5lMSA9ICgwLCBwb2ludF8xLnN1YikodHJpYW5nbGUucDIsIHRyaWFuZ2xlLnAxKTtcclxuICAgIHRyaWFuZ2xlLmUyID0gKDAsIHBvaW50XzEuc3ViKSh0cmlhbmdsZS5wMywgdHJpYW5nbGUucDIpO1xyXG4gICAgdHJpYW5nbGUuZTMgPSAoMCwgcG9pbnRfMS5zdWIpKHRyaWFuZ2xlLnAxLCB0cmlhbmdsZS5wMyk7XHJcbiAgICAvL2luZmxhdGUgZWFjaCB0cmlhbmdsZSB2ZXJ0ZXggYnkgYW4gYW1vdW50XHJcbiAgICBjb25zdCBpbmZsYXRlZFBvaW50cyA9IFtcclxuICAgICAgICBbdHJpYW5nbGUucDEsIHRyaWFuZ2xlLnAyLCB0cmlhbmdsZS5wM10sXHJcbiAgICAgICAgW3RyaWFuZ2xlLnAyLCB0cmlhbmdsZS5wMywgdHJpYW5nbGUucDFdLFxyXG4gICAgICAgIFt0cmlhbmdsZS5wMywgdHJpYW5nbGUucDEsIHRyaWFuZ2xlLnAyXVxyXG4gICAgXS5tYXAoKFtwcmV2UG9pbnQsIHBvaW50LCBuZXh0UG9pbnRdKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYSA9ICgwLCBwb2ludF8xLm5vcm1hbGl6ZSkoKDAsIHBvaW50XzEuc3ViKShwcmV2UG9pbnQsIHBvaW50KSk7XHJcbiAgICAgICAgY29uc3QgYiA9ICgwLCBwb2ludF8xLm5vcm1hbGl6ZSkoKDAsIHBvaW50XzEuc3ViKShuZXh0UG9pbnQsIHBvaW50KSk7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gKDAsIHBvaW50XzEuc2NhbGUpKCgwLCBwb2ludF8xLm5vcm1hbGl6ZSkoKDAsIHBvaW50XzEuYWRkKShhLCBiKSksIC0xKTtcclxuICAgICAgICBjb25zdCBhbmdsZSA9IE1hdGguc3FydCgoMS4wIC0gKDAsIHBvaW50XzEuZG90KShhLCBiKSkgLyAyLjApO1xyXG4gICAgICAgIHJldHVybiAoMCwgcG9pbnRfMS5hZGQpKHBvaW50LCAoMCwgcG9pbnRfMS5zY2FsZSkobm9ybWFsLCBpbmZsYXRlQW1vdW50IC8gYW5nbGUpKTtcclxuICAgIH0pO1xyXG4gICAgZy5jbGVhclJlY3QoMCwgMCwgZ2FtZS53aWR0aCwgZ2FtZS5oZWlnaHQpO1xyXG4gICAgLy9kcmF3IHRoZSBvcmlnaW5hbCB0cmlhbmdsZVxyXG4gICAgZy5zdHJva2VTdHlsZSA9ICdyZWQnO1xyXG4gICAgZy5iZWdpblBhdGgoKTtcclxuICAgICgwLCBwb2x5Z29uUGF0aF8xLnBvbHlnb25QYXRoKShnLCB0cmlhbmdsZS5wb2ludHMpO1xyXG4gICAgZy5zdHJva2UoKTtcclxuICAgIC8vZHJhdyBvdXIgaW5mbGF0ZWQgdHJpYW5nbGVcclxuICAgIGcuc3Ryb2tlU3R5bGUgPSAnZ3JlZW4nO1xyXG4gICAgZy5iZWdpblBhdGgoKTtcclxuICAgICgwLCBwb2x5Z29uUGF0aF8xLnBvbHlnb25QYXRoKShnLCBpbmZsYXRlZFBvaW50cyk7XHJcbiAgICBnLnN0cm9rZSgpO1xyXG4gICAgLy9kcmF3IGEgYm91bmRpbmcgYm94IHJvdW5kIHRoZSBuZXcgc2hhcGVcclxuICAgIGNvbnN0IG1pblBvcyA9ICgwLCBwb2ludF8xLm1pbjIpKC4uLnRyaWFuZ2xlLnBvaW50cyk7XHJcbiAgICBjb25zdCBtYXhQb3MgPSAoMCwgcG9pbnRfMS5tYXgyKSguLi50cmlhbmdsZS5wb2ludHMpO1xyXG4gICAgZy5zdHJva2VTdHlsZSA9ICdibHVlJztcclxuICAgIGcuc3Ryb2tlUmVjdChtaW5Qb3NbMF0gLSBpbmZsYXRlQW1vdW50LCBnLmNhbnZhcy5oZWlnaHQgLSBtYXhQb3NbMV0gLSBpbmZsYXRlQW1vdW50LCBtYXhQb3NbMF0gLSBtaW5Qb3NbMF0gKyBpbmZsYXRlQW1vdW50ICogMiwgbWF4UG9zWzFdIC0gbWluUG9zWzFdICsgaW5mbGF0ZUFtb3VudCAqIDIpO1xyXG4gICAgLy9kcmF3IHNvbWUgYmFsbHMgb24gdGhlIHZlcnRpY2VzIGZvciB2ZXJpZmljYXRpb25cclxuICAgIGcuc3Ryb2tlU3R5bGUgPSAnb3JhbmdlJztcclxuICAgIGcuYmVnaW5QYXRoKCk7XHJcbiAgICBnLmFyYyh0cmlhbmdsZS5wMVswXSwgZy5jYW52YXMuaGVpZ2h0IC0gdHJpYW5nbGUucDFbMV0sIGluZmxhdGVBbW91bnQsIDAsIE1hdGguUEkgKiAyKTtcclxuICAgIGcuc3Ryb2tlKCk7XHJcbiAgICBnLmJlZ2luUGF0aCgpO1xyXG4gICAgZy5hcmModHJpYW5nbGUucDJbMF0sIGcuY2FudmFzLmhlaWdodCAtIHRyaWFuZ2xlLnAyWzFdLCBpbmZsYXRlQW1vdW50LCAwLCBNYXRoLlBJICogMik7XHJcbiAgICBnLnN0cm9rZSgpO1xyXG4gICAgZy5iZWdpblBhdGgoKTtcclxuICAgIGcuYXJjKHRyaWFuZ2xlLnAzWzBdLCBnLmNhbnZhcy5oZWlnaHQgLSB0cmlhbmdsZS5wM1sxXSwgaW5mbGF0ZUFtb3VudCwgMCwgTWF0aC5QSSAqIDIpO1xyXG4gICAgZy5zdHJva2UoKTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxufTtcclxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmxlcnAgPSBleHBvcnRzLnRpbWVBdFBvcyA9IGV4cG9ydHMuY2xhbXAgPSBleHBvcnRzLmZyYWN0ID0gZXhwb3J0cy5uZWdGcmFjdCA9IGV4cG9ydHMuRVBTSUxPTiA9IHZvaWQgMDtcclxuZXhwb3J0cy5FUFNJTE9OID0gMC4wMDAwMDE7XHJcbmNvbnN0IG5lZ0ZyYWN0ID0gKHgpID0+IDEuMCAtIHggKyBNYXRoLmZsb29yKHgpO1xyXG5leHBvcnRzLm5lZ0ZyYWN0ID0gbmVnRnJhY3Q7XHJcbmNvbnN0IGZyYWN0ID0gKHgpID0+IHggLSBNYXRoLmZsb29yKHgpO1xyXG5leHBvcnRzLmZyYWN0ID0gZnJhY3Q7XHJcbmNvbnN0IGNsYW1wID0gKGEsIG1pbiwgbWF4KSA9PiBNYXRoLm1heChNYXRoLm1pbihhLCBtYXgpLCBtaW4pO1xyXG5leHBvcnRzLmNsYW1wID0gY2xhbXA7XHJcbmNvbnN0IHRpbWVBdFBvcyA9IChzdGFydFBvcywgZGlyLCBuZXdQb3MpID0+IGRpciA/ICgwLCBleHBvcnRzLmNsYW1wKSgobmV3UG9zIC0gc3RhcnRQb3MpIC8gZGlyLCAwLCAxKSA6IDA7XHJcbmV4cG9ydHMudGltZUF0UG9zID0gdGltZUF0UG9zO1xyXG5jb25zdCBsZXJwID0gKGEsIGIsIHQpID0+IGEgKiAoMSAtIHQpICsgYiAqIHQ7XHJcbmV4cG9ydHMubGVycCA9IGxlcnA7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuaW5zaWRlID0gZXhwb3J0cy5pblJhbmdlID0gZXhwb3J0cy5hdmcgPSBleHBvcnRzLm1heDIgPSBleHBvcnRzLm1pbjIgPSBleHBvcnRzLnRvUHJlY2lzaW9uMiA9IGV4cG9ydHMubGVycDIgPSBleHBvcnRzLm5vcm1hbGl6ZSA9IGV4cG9ydHMubGVuZ3RoID0gZXhwb3J0cy5kb3QgPSBleHBvcnRzLnNpZ24gPSBleHBvcnRzLmFicyA9IGV4cG9ydHMuY2VpbCA9IGV4cG9ydHMuZmxvb3IgPSBleHBvcnRzLnN1YiA9IGV4cG9ydHMuYWRkcyA9IGV4cG9ydHMuYWRkID0gZXhwb3J0cy5kaXZpZGUgPSBleHBvcnRzLm11bHRpcGx5ID0gZXhwb3J0cy5zY2FsZSA9IGV4cG9ydHMuZXF1YWxzID0gZXhwb3J0cy5kZXRlcm1pbmFudDIgPSBleHBvcnRzLmNsYW1wMiA9IHZvaWQgMDtcclxuY29uc3QgZ2xfbWF0cml4XzEgPSByZXF1aXJlKFwiZ2wtbWF0cml4XCIpO1xyXG5jb25zdCBjb21tb25fMSA9IHJlcXVpcmUoXCIuL2NvbW1vblwiKTtcclxuY29uc3QgY2xhbXAyID0gKGEsIG1pbiwgbWF4KSA9PiB7XHJcbiAgICBjb25zdCBvdXQgPSBnbF9tYXRyaXhfMS52ZWMyLmNsb25lKGEpO1xyXG4gICAgZ2xfbWF0cml4XzEudmVjMi5taW4ob3V0LCBvdXQsIG1heCk7XHJcbiAgICBnbF9tYXRyaXhfMS52ZWMyLm1heChvdXQsIG91dCwgbWluKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbmV4cG9ydHMuY2xhbXAyID0gY2xhbXAyO1xyXG5jb25zdCBkZXRlcm1pbmFudDIgPSAocDEsIHAyKSA9PiBwMVswXSAqIHAyWzFdIC0gcDFbMV0gKiBwMlswXTtcclxuZXhwb3J0cy5kZXRlcm1pbmFudDIgPSBkZXRlcm1pbmFudDI7XHJcbmV4cG9ydHMuZXF1YWxzID0gZ2xfbWF0cml4XzEudmVjMi5lcXVhbHM7XHJcbmNvbnN0IHNjYWxlID0gKHAxLCBhKSA9PiBnbF9tYXRyaXhfMS52ZWMyLnNjYWxlKGdsX21hdHJpeF8xLnZlYzIuY3JlYXRlKCksIHAxLCBhKTtcclxuZXhwb3J0cy5zY2FsZSA9IHNjYWxlO1xyXG5jb25zdCBtdWx0aXBseSA9IChwMSwgcDIpID0+IGdsX21hdHJpeF8xLnZlYzIubXVsdGlwbHkoZ2xfbWF0cml4XzEudmVjMi5jcmVhdGUoKSwgcDEsIHAyKTtcclxuZXhwb3J0cy5tdWx0aXBseSA9IG11bHRpcGx5O1xyXG5jb25zdCBkaXZpZGUgPSAocDEsIHAyKSA9PiBnbF9tYXRyaXhfMS52ZWMyLmRpdmlkZShnbF9tYXRyaXhfMS52ZWMyLmNyZWF0ZSgpLCBwMSwgcDIpO1xyXG5leHBvcnRzLmRpdmlkZSA9IGRpdmlkZTtcclxuY29uc3QgYWRkID0gKHAxLCBwMikgPT4gZ2xfbWF0cml4XzEudmVjMi5hZGQoZ2xfbWF0cml4XzEudmVjMi5jcmVhdGUoKSwgcDEsIHAyKTtcclxuZXhwb3J0cy5hZGQgPSBhZGQ7XHJcbmNvbnN0IGFkZHMgPSAocDEsIGEpID0+IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcyhwMVswXSArIGEsIHAxWzFdICsgYSk7XHJcbmV4cG9ydHMuYWRkcyA9IGFkZHM7XHJcbmNvbnN0IHN1YiA9IChwMSwgcDIpID0+IGdsX21hdHJpeF8xLnZlYzIuc3ViKGdsX21hdHJpeF8xLnZlYzIuY3JlYXRlKCksIHAxLCBwMik7XHJcbmV4cG9ydHMuc3ViID0gc3ViO1xyXG5jb25zdCBmbG9vciA9IChwMSkgPT4gZ2xfbWF0cml4XzEudmVjMi5mbG9vcihnbF9tYXRyaXhfMS52ZWMyLmNyZWF0ZSgpLCBwMSk7XHJcbmV4cG9ydHMuZmxvb3IgPSBmbG9vcjtcclxuY29uc3QgY2VpbCA9IChwMSkgPT4gZ2xfbWF0cml4XzEudmVjMi5jZWlsKGdsX21hdHJpeF8xLnZlYzIuY3JlYXRlKCksIHAxKTtcclxuZXhwb3J0cy5jZWlsID0gY2VpbDtcclxuY29uc3QgYWJzID0gKHAxKSA9PiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoTWF0aC5hYnMocDFbMF0pLCBNYXRoLmFicyhwMVsxXSkpO1xyXG5leHBvcnRzLmFicyA9IGFicztcclxuY29uc3Qgc2lnbiA9IChwMSkgPT4gZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKE1hdGguc2lnbihwMVswXSksIE1hdGguc2lnbihwMVsxXSkpO1xyXG5leHBvcnRzLnNpZ24gPSBzaWduO1xyXG5jb25zdCBkb3QgPSAocDEsIHAyKSA9PiBnbF9tYXRyaXhfMS52ZWMyLmRvdChwMSwgcDIpO1xyXG5leHBvcnRzLmRvdCA9IGRvdDtcclxuY29uc3QgbGVuZ3RoID0gKHAxKSA9PiBnbF9tYXRyaXhfMS52ZWMyLmxlbmd0aChwMSk7XHJcbmV4cG9ydHMubGVuZ3RoID0gbGVuZ3RoO1xyXG5jb25zdCBub3JtYWxpemUgPSAocDEpID0+ICgwLCBleHBvcnRzLnNjYWxlKShwMSwgMSAvICgwLCBleHBvcnRzLmxlbmd0aCkocDEpKTtcclxuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemU7XHJcbmNvbnN0IGxlcnAyID0gKGEsIGIsIHQpID0+IGdsX21hdHJpeF8xLnZlYzIubGVycChnbF9tYXRyaXhfMS52ZWMyLmNyZWF0ZSgpLCBhLCBiLCB0KTtcclxuZXhwb3J0cy5sZXJwMiA9IGxlcnAyO1xyXG4vL3dhcm5pbmc6IG11dGF0ZXMgYVxyXG5jb25zdCB0b1ByZWNpc2lvbjIgPSAoYSwgYW1vdW50KSA9PiB7XHJcbiAgICBhWzBdID0gcGFyc2VGbG9hdChhWzBdLnRvUHJlY2lzaW9uKGFtb3VudCkpO1xyXG4gICAgYVsxXSA9IHBhcnNlRmxvYXQoYVsxXS50b1ByZWNpc2lvbihhbW91bnQpKTtcclxuICAgIHJldHVybiBhO1xyXG59O1xyXG5leHBvcnRzLnRvUHJlY2lzaW9uMiA9IHRvUHJlY2lzaW9uMjtcclxuY29uc3QgbWluMiA9ICguLi5vYmpzKSA9PiB7XHJcbiAgICBjb25zdCBbZmlyc3QsIC4uLnJlc3RdID0gb2JqcztcclxuICAgIGNvbnN0IHJlc3VsdCA9IGdsX21hdHJpeF8xLnZlYzIuY2xvbmUoZmlyc3QpO1xyXG4gICAgcmVzdC5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICBnbF9tYXRyaXhfMS52ZWMyLm1pbihyZXN1bHQsIHJlc3VsdCwgb2JqKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5taW4yID0gbWluMjtcclxuY29uc3QgbWF4MiA9ICguLi5vYmpzKSA9PiB7XHJcbiAgICBjb25zdCBbZmlyc3QsIC4uLnJlc3RdID0gb2JqcztcclxuICAgIGNvbnN0IHJlc3VsdCA9IGdsX21hdHJpeF8xLnZlYzIuY2xvbmUoZmlyc3QpO1xyXG4gICAgcmVzdC5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICBnbF9tYXRyaXhfMS52ZWMyLm1heChyZXN1bHQsIHJlc3VsdCwgb2JqKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5tYXgyID0gbWF4MjtcclxuY29uc3QgYXZnID0gKC4uLm9ianMpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGdsX21hdHJpeF8xLnZlYzIuY3JlYXRlKCk7XHJcbiAgICBpZiAob2Jqcy5sZW5ndGgpIHtcclxuICAgICAgICBvYmpzLmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgICAgICAgICBnbF9tYXRyaXhfMS52ZWMyLmFkZChyZXN1bHQsIHJlc3VsdCwgb2JqKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBnbF9tYXRyaXhfMS52ZWMyLnNjYWxlKHJlc3VsdCwgcmVzdWx0LCAxIC8gb2Jqcy5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0cy5hdmcgPSBhdmc7XHJcbmNvbnN0IGluUmFuZ2UgPSAocDEsIG1pbiwgbWF4KSA9PiB7XHJcbiAgICByZXR1cm4gIShwMVswXSA+IG1heFswXSB8fCBwMVswXSA8IG1pblswXSB8fCBwMVsxXSA+IG1heFsxXSB8fCBwMVsxXSA8IG1pblsxXSk7XHJcbn07XHJcbmV4cG9ydHMuaW5SYW5nZSA9IGluUmFuZ2U7XHJcbmNvbnN0IGluc2lkZSA9IChwb2ludHMsIHApID0+IHtcclxuICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICBsZXQgY3VyID0gcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXTtcclxuICAgIHBvaW50cy5mb3JFYWNoKChuZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcDAgPSBjdXJbMV0gPCBuZXh0WzFdID8gY3VyIDogbmV4dDtcclxuICAgICAgICBjb25zdCBwMSA9IGN1clsxXSA8IG5leHRbMV0gPyBuZXh0IDogY3VyO1xyXG4gICAgICAgIGlmIChwMFsxXSA8IHBbMV0gKyBjb21tb25fMS5FUFNJTE9OICYmIHAxWzFdID4gcFsxXSArIGNvbW1vbl8xLkVQU0lMT04pIHtcclxuICAgICAgICAgICAgaWYgKChwMVswXSAtIHAwWzBdKSAqIChwWzFdIC0gcDBbMV0pID4gKHBbMF0gLSBwMFswXSkgKiAocDFbMV0gLSBwMFsxXSkpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY3VyID0gbmV4dDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvdW50ICUgMiAhPT0gMDtcclxufTtcclxuZXhwb3J0cy5pbnNpZGUgPSBpbnNpZGU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMucG9seWdvblBhdGggPSB2b2lkIDA7XHJcbmNvbnN0IHBvbHlnb25QYXRoID0gKGcsIHBvaW50cykgPT4ge1xyXG4gICAgaWYgKCFwb2ludHMgfHwgIXBvaW50cy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBmaXJzdFBvaW50ID0gcG9pbnRzWzBdO1xyXG4gICAgZy5tb3ZlVG8oZmlyc3RQb2ludFswXSwgZy5jYW52YXMuaGVpZ2h0IC0gZmlyc3RQb2ludFsxXSk7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHBvaW50ID0gcG9pbnRzW2ldO1xyXG4gICAgICAgIGcubGluZVRvKHBvaW50WzBdLCBnLmNhbnZhcy5oZWlnaHQgLSBwb2ludFsxXSk7XHJcbiAgICB9XHJcbiAgICBnLmNsb3NlUGF0aCgpO1xyXG59O1xyXG5leHBvcnRzLnBvbHlnb25QYXRoID0gcG9seWdvblBhdGg7XHJcbiJdLCJuYW1lcyI6WyJnbF9tYXRyaXhfMSIsInBvaW50XzEiLCJwb2x5Z29uUGF0aF8xIiwiaW5mbGF0ZUFtb3VudERvbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnYW1lIiwiZyIsImdldENvbnRleHQiLCJwMSIsInZlYzIiLCJmcm9tVmFsdWVzIiwicDIiLCJwMyIsInRyaWFuZ2xlIiwiZTEiLCJzdWIiLCJlMiIsImUzIiwicG9pbnRzIiwiY2VudGVyIiwiYXZnIiwiaW5mbGF0ZUFtb3VudCIsInZhbHVlIiwidG9TdHJpbmciLCJvbmlucHV0IiwicGFyc2VGbG9hdCIsIm9ubW91c2Vtb3ZlIiwiZSIsImJvdW5kcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIm1vdXNlUG9zIiwicGFnZVgiLCJsZWZ0IiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsTGVmdCIsImhlaWdodCIsInBhZ2VZIiwidG9wIiwic2Nyb2xsVG9wIiwiY29weSIsImRyYXciLCJyb3RhdGUiLCJpbmZsYXRlZFBvaW50cyIsIm1hcCIsInByZXZQb2ludCIsInBvaW50IiwibmV4dFBvaW50IiwiYSIsIm5vcm1hbGl6ZSIsImIiLCJub3JtYWwiLCJzY2FsZSIsImFkZCIsImFuZ2xlIiwiTWF0aCIsInNxcnQiLCJkb3QiLCJjbGVhclJlY3QiLCJ3aWR0aCIsInN0cm9rZVN0eWxlIiwiYmVnaW5QYXRoIiwicG9seWdvblBhdGgiLCJzdHJva2UiLCJtaW5Qb3MiLCJtaW4yIiwibWF4UG9zIiwibWF4MiIsInN0cm9rZVJlY3QiLCJjYW52YXMiLCJhcmMiLCJQSSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsImxlcnAiLCJ0aW1lQXRQb3MiLCJjbGFtcCIsImZyYWN0IiwibmVnRnJhY3QiLCJFUFNJTE9OIiwieCIsImZsb29yIiwibWluIiwibWF4Iiwic3RhcnRQb3MiLCJkaXIiLCJuZXdQb3MiLCJ0IiwiaW5zaWRlIiwiaW5SYW5nZSIsInRvUHJlY2lzaW9uMiIsImxlcnAyIiwibGVuZ3RoIiwic2lnbiIsImFicyIsImNlaWwiLCJhZGRzIiwiZGl2aWRlIiwibXVsdGlwbHkiLCJlcXVhbHMiLCJkZXRlcm1pbmFudDIiLCJjbGFtcDIiLCJjb21tb25fMSIsIm91dCIsImNsb25lIiwiY3JlYXRlIiwiYW1vdW50IiwidG9QcmVjaXNpb24iLCJvYmpzIiwiZmlyc3QiLCJyZXN0IiwicmVzdWx0IiwiZm9yRWFjaCIsIm9iaiIsInAiLCJjb3VudCIsImN1ciIsIm5leHQiLCJwMCIsImZpcnN0UG9pbnQiLCJtb3ZlVG8iLCJpIiwibGluZVRvIiwiY2xvc2VQYXRoIl0sInNvdXJjZVJvb3QiOiIifQ==