"use strict";(self.webpackChunksubpixel_rendering=self.webpackChunksubpixel_rendering||[]).push([[42],{747:(e,c,a)=>{const o=a(887),r=a(354),l=a(717),s=document.getElementById("game"),t=s.getContext("2d");if(!t)throw new Error("Could not get canvas graphics :(");const n=[{p1:o.vec2.fromValues(10,10),p2:o.vec2.fromValues(10,100),p3:o.vec2.fromValues(100,10)},{p1:o.vec2.fromValues(110,10),p2:o.vec2.fromValues(200,100),p3:o.vec2.fromValues(200,10)},{p1:o.vec2.fromValues(210,10),p2:o.vec2.fromValues(260,100),p3:o.vec2.fromValues(300,10)},{p1:o.vec2.fromValues(310,10),p2:o.vec2.fromValues(360,50),p3:o.vec2.fromValues(400,10)},{p1:o.vec2.fromValues(450,10),p2:o.vec2.fromValues(410,100),p3:o.vec2.fromValues(460,10)},{p1:o.vec2.fromValues(550,10),p2:o.vec2.fromValues(600,100),p3:o.vec2.fromValues(560,10)},{p1:o.vec2.fromValues(610,10),p2:o.vec2.fromValues(650,10),p3:o.vec2.fromValues(700,10)},{p1:o.vec2.fromValues(10,200),p2:o.vec2.fromValues(10,110),p3:o.vec2.fromValues(100,200)},{p1:o.vec2.fromValues(110,200),p2:o.vec2.fromValues(200,110),p3:o.vec2.fromValues(200,200)},{p1:o.vec2.fromValues(210,200),p2:o.vec2.fromValues(260,110),p3:o.vec2.fromValues(300,200)},{p1:o.vec2.fromValues(310,200),p2:o.vec2.fromValues(360,150),p3:o.vec2.fromValues(400,200)},{p1:o.vec2.fromValues(450,200),p2:o.vec2.fromValues(410,110),p3:o.vec2.fromValues(460,200)},{p1:o.vec2.fromValues(550,200),p2:o.vec2.fromValues(600,110),p3:o.vec2.fromValues(560,200)},{p1:o.vec2.fromValues(610,110),p2:o.vec2.fromValues(650,110),p3:o.vec2.fromValues(700,110)}];requestAnimationFrame((()=>{t.clearRect(0,0,s.width,s.height);for(const e of n){t.setLineDash([1,2]),t.strokeStyle="blue",t.beginPath(),l.plotLines(t,[e.p1,e.p2,e.p3]),t.stroke();const c=r.quadraticBezierToPoints(e,-.99);t.setLineDash([]),t.strokeStyle="green",t.beginPath(),l.plotLines(t,c),t.stroke()}}))},354:(e,c,a)=>{Object.defineProperty(c,"__esModule",{value:!0}),c.quadraticBezierToPoints=void 0;const o=a(887),r=a(345),l=a(669);c.quadraticBezierToPoints=(e,c)=>{const a=[o.vec2.clone(e.p1),o.vec2.clone(e.p3)],s=(e,o,t,n)=>{const v=r.lerp(o,t,.5),p=l.lerp2(l.lerp2(e.p1,e.p2,v),l.lerp2(e.p2,e.p3,v),v),i=a[n-1],u=a[n];a.splice(n,0,p),l.dot(l.normalize(l.sub(i,p)),l.normalize(l.sub(u,p)))>c&&(s(e,v,t,n+1),s(e,o,v,n))};return s(e,0,1,1),a}},345:(e,c)=>{Object.defineProperty(c,"__esModule",{value:!0}),c.lerp=c.timeAtPos=c.clamp=c.fract=c.negFract=c.EPSILON=void 0,c.EPSILON=1e-6,c.negFract=e=>1-e+Math.floor(e),c.fract=e=>e-Math.floor(e),c.clamp=(e,c,a)=>Math.max(Math.min(e,a),c),c.timeAtPos=(e,a,o)=>a?c.clamp((o-e)/a,0,1):0,c.lerp=(e,c,a)=>e*(1-a)+c*a},669:(e,c,a)=>{Object.defineProperty(c,"__esModule",{value:!0}),c.inside=c.inRange=c.avg=c.max2=c.min2=c.toPrecision2=c.lerp2=c.normalize=c.length=c.dot=c.sign=c.abs=c.ceil=c.floor=c.sub=c.adds=c.add=c.divide=c.multiply=c.scale=c.equals=c.determinant2=c.clamp2=void 0;const o=a(887),r=a(345);c.clamp2=(e,c,a)=>{const r=o.vec2.clone(e);return o.vec2.min(r,r,a),o.vec2.max(r,r,c),r},c.determinant2=(e,c)=>e[0]*c[1]-e[1]*c[0],c.equals=o.vec2.equals,c.scale=(e,c)=>o.vec2.scale(o.vec2.create(),e,c),c.multiply=(e,c)=>o.vec2.multiply(o.vec2.create(),e,c),c.divide=(e,c)=>o.vec2.divide(o.vec2.create(),e,c),c.add=(e,c)=>o.vec2.add(o.vec2.create(),e,c),c.adds=(e,c)=>o.vec2.fromValues(e[0]+c,e[1]+c),c.sub=(e,c)=>o.vec2.sub(o.vec2.create(),e,c),c.floor=e=>o.vec2.floor(o.vec2.create(),e),c.ceil=e=>o.vec2.ceil(o.vec2.create(),e),c.abs=e=>o.vec2.fromValues(Math.abs(e[0]),Math.abs(e[1])),c.sign=e=>o.vec2.fromValues(Math.sign(e[0]),Math.sign(e[1])),c.dot=(e,c)=>o.vec2.dot(e,c),c.length=e=>o.vec2.length(e),c.normalize=e=>c.scale(e,1/c.length(e)),c.lerp2=(e,c,a)=>o.vec2.lerp(o.vec2.create(),e,c,a),c.toPrecision2=(e,c)=>(e[0]=parseFloat(e[0].toPrecision(c)),e[1]=parseFloat(e[1].toPrecision(c)),e),c.min2=(...e)=>{const[c,...a]=e,r=o.vec2.clone(c);return a.forEach((e=>{o.vec2.min(r,r,e)})),r},c.max2=(...e)=>{const[c,...a]=e,r=o.vec2.clone(c);return a.forEach((e=>{o.vec2.max(r,r,e)})),r},c.avg=(...e)=>{const c=o.vec2.create();return e.length&&(e.forEach((e=>{o.vec2.add(c,c,e)})),o.vec2.scale(c,c,1/e.length)),c},c.inRange=(e,c,a)=>!(e[0]>a[0]||e[0]<c[0]||e[1]>a[1]||e[1]<c[1]),c.inside=(e,c)=>{let a=0,o=e[e.length-1];return e.forEach((e=>{const l=o[1]<e[1]?o:e,s=o[1]<e[1]?e:o;l[1]<c[1]+r.EPSILON&&s[1]>c[1]+r.EPSILON&&(s[0]-l[0])*(c[1]-l[1])>(c[0]-l[0])*(s[1]-l[1])&&(a+=1),o=e})),a%2!=0}},717:(e,c)=>{Object.defineProperty(c,"__esModule",{value:!0}),c.plotLines=void 0,c.plotLines=(e,c)=>{const a=c[0];e.moveTo(a[0],e.canvas.height-a[1]);for(let a=0;a<c.length;a++){const o=c[a];e.lineTo(o[0],e.canvas.height-o[1])}}}},e=>{e(e.s=747)}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLEksWUMvRnpCbkUsT0FBT0MsZUFBZUMsRUFBUyxhQUFjLENBQUVDLE9BQU8sSUFDdERELEVBQVFOLGVBQVksRUFTcEJNLEVBQVFOLFVBUlUsQ0FBQ2pCLEVBQUc0QixLQUNsQixNQUFNZ0UsRUFBYWhFLEVBQU8sR0FDMUI1QixFQUFFNkYsT0FBT0QsRUFBVyxHQUFJNUYsRUFBRThGLE9BQU9sRixPQUFTZ0YsRUFBVyxJQUNyRCxJQUFLLElBQUlHLEVBQUksRUFBR0EsRUFBSW5FLEVBQU9vQyxPQUFRK0IsSUFBSyxDQUNwQyxNQUFNQyxFQUFRcEUsRUFBT21FLEdBQ3JCL0YsRUFBRWlHLE9BQU9ELEVBQU0sR0FBSWhHLEVBQUU4RixPQUFPbEYsT0FBU29GLEVBQU0sUSIsInNvdXJjZXMiOlsid2VicGFjazovL3N1YnBpeGVsLXJlbmRlcmluZy8uL3NyYy9kZW1vcy9xdWFkcmF0aWNCZXppZXJTaW1wbGlmaWNhdGlvbi50cyIsIndlYnBhY2s6Ly9zdWJwaXhlbC1yZW5kZXJpbmcvLi9zcmMvZ2VvbWV0cnkvcXVhZHJhdGljQmV6aWVyVG9Qb2ludHMudHMiLCJ3ZWJwYWNrOi8vc3VicGl4ZWwtcmVuZGVyaW5nLy4vc3JjL21hdGhzL2NvbW1vbi50cyIsIndlYnBhY2s6Ly9zdWJwaXhlbC1yZW5kZXJpbmcvLi9zcmMvbWF0aHMvcG9pbnQudHMiLCJ3ZWJwYWNrOi8vc3VicGl4ZWwtcmVuZGVyaW5nLy4vc3JjL3JlbmRlci9wbG90TGluZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgZ2xfbWF0cml4XzEgPSByZXF1aXJlKFwiZ2wtbWF0cml4XCIpO1xyXG5jb25zdCBxdWFkcmF0aWNCZXppZXJUb1BvaW50c18xID0gcmVxdWlyZShcIi4uL2dlb21ldHJ5L3F1YWRyYXRpY0JlemllclRvUG9pbnRzXCIpO1xyXG5jb25zdCBwbG90TGluZXNfMSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvcGxvdExpbmVzXCIpO1xyXG5jb25zdCBnYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKTtcclxuY29uc3QgZyA9IGdhbWUuZ2V0Q29udGV4dCgnMmQnKTtcclxuaWYgKCFnKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBnZXQgY2FudmFzIGdyYXBoaWNzIDooJyk7XHJcbn1cclxuY29uc3QgYmV6aWVycyA9IFtcclxuICAgIHtcclxuICAgICAgICBwMTogZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDEwLCAxMCksXHJcbiAgICAgICAgcDI6IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcygxMCwgMTAwKSxcclxuICAgICAgICBwMzogZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDEwMCwgMTApXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHAxOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMTEwLCAxMCksXHJcbiAgICAgICAgcDI6IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcygyMDAsIDEwMCksXHJcbiAgICAgICAgcDM6IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcygyMDAsIDEwKVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwMTogZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDIxMCwgMTApLFxyXG4gICAgICAgIHAyOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMjYwLCAxMDApLFxyXG4gICAgICAgIHAzOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMzAwLCAxMClcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcDE6IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcygzMTAsIDEwKSxcclxuICAgICAgICBwMjogZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDM2MCwgNTApLFxyXG4gICAgICAgIHAzOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNDAwLCAxMClcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcDE6IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcyg0NTAsIDEwKSxcclxuICAgICAgICBwMjogZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDQxMCwgMTAwKSxcclxuICAgICAgICBwMzogZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDQ2MCwgMTApXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHAxOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNTUwLCAxMCksXHJcbiAgICAgICAgcDI6IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcyg2MDAsIDEwMCksXHJcbiAgICAgICAgcDM6IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcyg1NjAsIDEwKVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwMTogZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDYxMCwgMTApLFxyXG4gICAgICAgIHAyOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNjUwLCAxMCksXHJcbiAgICAgICAgcDM6IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcyg3MDAsIDEwKVxyXG4gICAgfSxcclxuICAgIC8vXHJcbiAgICB7XHJcbiAgICAgICAgcDE6IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcygxMCwgMjAwKSxcclxuICAgICAgICBwMjogZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKDEwLCAxMTApLFxyXG4gICAgICAgIHAzOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMTAwLCAyMDApXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHAxOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMTEwLCAyMDApLFxyXG4gICAgICAgIHAyOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMjAwLCAxMTApLFxyXG4gICAgICAgIHAzOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMjAwLCAyMDApXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHAxOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMjEwLCAyMDApLFxyXG4gICAgICAgIHAyOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMjYwLCAxMTApLFxyXG4gICAgICAgIHAzOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMzAwLCAyMDApXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHAxOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMzEwLCAyMDApLFxyXG4gICAgICAgIHAyOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoMzYwLCAxNTApLFxyXG4gICAgICAgIHAzOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNDAwLCAyMDApXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHAxOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNDUwLCAyMDApLFxyXG4gICAgICAgIHAyOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNDEwLCAxMTApLFxyXG4gICAgICAgIHAzOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNDYwLCAyMDApXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHAxOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNTUwLCAyMDApLFxyXG4gICAgICAgIHAyOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNjAwLCAxMTApLFxyXG4gICAgICAgIHAzOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNTYwLCAyMDApXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHAxOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNjEwLCAxMTApLFxyXG4gICAgICAgIHAyOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNjUwLCAxMTApLFxyXG4gICAgICAgIHAzOiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoNzAwLCAxMTApXHJcbiAgICB9XHJcbl07XHJcbmNvbnN0IHNwbGl0Qm91bmRhcnkgPSAtMC45OTtcclxuY29uc3QgZHJhdyA9ICgpID0+IHtcclxuICAgIGcuY2xlYXJSZWN0KDAsIDAsIGdhbWUud2lkdGgsIGdhbWUuaGVpZ2h0KTtcclxuICAgIGZvciAoY29uc3QgYmV6aWVyIG9mIGJlemllcnMpIHtcclxuICAgICAgICAvL2RyYXcgdGhlIGN1cnZlIHRyaWFuZ2xlXHJcbiAgICAgICAgZy5zZXRMaW5lRGFzaChbMSwgMl0pO1xyXG4gICAgICAgIGcuc3Ryb2tlU3R5bGUgPSAnYmx1ZSc7XHJcbiAgICAgICAgZy5iZWdpblBhdGgoKTtcclxuICAgICAgICBwbG90TGluZXNfMS5wbG90TGluZXMoZywgW2Jlemllci5wMSwgYmV6aWVyLnAyLCBiZXppZXIucDNdKTtcclxuICAgICAgICBnLnN0cm9rZSgpO1xyXG4gICAgICAgIC8vZHJhdyBvdXIgcmVhbCBiZXppZXIgY3VydmVcclxuICAgICAgICAvKlxyXG4gICAgZy5zdHJva2VTdHlsZSA9IFwicmVkXCI7XHJcbiAgICBnLmJlZ2luUGF0aCgpO1xyXG4gICAgZy5tb3ZlVG8oYmV6aWVyLnAxWzBdLCBnYW1lLmhlaWdodCAtIGJlemllci5wMVsxXSk7XHJcbiAgICBnLnF1YWRyYXRpY0N1cnZlVG8oYmV6aWVyLnAyWzBdLCBnYW1lLmhlaWdodCAtIGJlemllci5wMlsxXSwgYmV6aWVyLnAzWzBdLCBnYW1lLmhlaWdodCAtIGJlemllci5wM1sxXSk7XHJcbiAgICBnLnN0cm9rZSgpO1xyXG4gICAgKi9cclxuICAgICAgICAvL2NyZWF0ZSBhbmQgZHJhdyB0aGUgbmV3ICdjdXJ2ZScgdGhhdCBjb25zaXN0cyBvZiBsaW5lc1xyXG4gICAgICAgIGNvbnN0IGJlemllckxpbmVzID0gcXVhZHJhdGljQmV6aWVyVG9Qb2ludHNfMS5xdWFkcmF0aWNCZXppZXJUb1BvaW50cyhiZXppZXIsIHNwbGl0Qm91bmRhcnkpO1xyXG4gICAgICAgIGcuc2V0TGluZURhc2goW10pO1xyXG4gICAgICAgIGcuc3Ryb2tlU3R5bGUgPSAnZ3JlZW4nO1xyXG4gICAgICAgIGcuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgcGxvdExpbmVzXzEucGxvdExpbmVzKGcsIGJlemllckxpbmVzKTtcclxuICAgICAgICBnLnN0cm9rZSgpO1xyXG4gICAgfVxyXG59O1xyXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMucXVhZHJhdGljQmV6aWVyVG9Qb2ludHMgPSB2b2lkIDA7XHJcbmNvbnN0IGdsX21hdHJpeF8xID0gcmVxdWlyZShcImdsLW1hdHJpeFwiKTtcclxuY29uc3QgY29tbW9uXzEgPSByZXF1aXJlKFwiLi4vbWF0aHMvY29tbW9uXCIpO1xyXG5jb25zdCBwb2ludF8xID0gcmVxdWlyZShcIi4uL21hdGhzL3BvaW50XCIpO1xyXG5jb25zdCBxdWFkcmF0aWNCZXppZXJUb1BvaW50cyA9IChiZXppZXIsIHNwbGl0Qm91bmRhcnkpID0+IHtcclxuICAgIGNvbnN0IHBvaW50cyA9IFtnbF9tYXRyaXhfMS52ZWMyLmNsb25lKGJlemllci5wMSksIGdsX21hdHJpeF8xLnZlYzIuY2xvbmUoYmV6aWVyLnAzKV07XHJcbiAgICBjb25zdCBxdWFkcmF0aWNCZXppZXJTcGxpdCA9IChiZXppZXIsIG1pbiwgbWF4LCBpbnNlcnRJbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSBjb21tb25fMS5sZXJwKG1pbiwgbWF4LCAwLjUpO1xyXG4gICAgICAgIGNvbnN0IHBvaW50T25DdXJ2ZSA9IHBvaW50XzEubGVycDIocG9pbnRfMS5sZXJwMihiZXppZXIucDEsIGJlemllci5wMiwgdGltZSksIHBvaW50XzEubGVycDIoYmV6aWVyLnAyLCBiZXppZXIucDMsIHRpbWUpLCB0aW1lKTtcclxuICAgICAgICBjb25zdCBwcmV2UG9pbnQgPSBwb2ludHNbaW5zZXJ0SW5kZXggLSAxXTtcclxuICAgICAgICBjb25zdCBuZXh0UG9pbnQgPSBwb2ludHNbaW5zZXJ0SW5kZXhdO1xyXG4gICAgICAgIHBvaW50cy5zcGxpY2UoaW5zZXJ0SW5kZXgsIDAsIHBvaW50T25DdXJ2ZSk7XHJcbiAgICAgICAgaWYgKHBvaW50XzEuZG90KHBvaW50XzEubm9ybWFsaXplKHBvaW50XzEuc3ViKHByZXZQb2ludCwgcG9pbnRPbkN1cnZlKSksIHBvaW50XzEubm9ybWFsaXplKHBvaW50XzEuc3ViKG5leHRQb2ludCwgcG9pbnRPbkN1cnZlKSkpID4gc3BsaXRCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICBxdWFkcmF0aWNCZXppZXJTcGxpdChiZXppZXIsIHRpbWUsIG1heCwgaW5zZXJ0SW5kZXggKyAxKTtcclxuICAgICAgICAgICAgcXVhZHJhdGljQmV6aWVyU3BsaXQoYmV6aWVyLCBtaW4sIHRpbWUsIGluc2VydEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcXVhZHJhdGljQmV6aWVyU3BsaXQoYmV6aWVyLCAwLCAxLCAxKTtcclxuICAgIHJldHVybiBwb2ludHM7XHJcbn07XHJcbmV4cG9ydHMucXVhZHJhdGljQmV6aWVyVG9Qb2ludHMgPSBxdWFkcmF0aWNCZXppZXJUb1BvaW50cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5sZXJwID0gZXhwb3J0cy50aW1lQXRQb3MgPSBleHBvcnRzLmNsYW1wID0gZXhwb3J0cy5mcmFjdCA9IGV4cG9ydHMubmVnRnJhY3QgPSBleHBvcnRzLkVQU0lMT04gPSB2b2lkIDA7XHJcbmV4cG9ydHMuRVBTSUxPTiA9IDAuMDAwMDAxO1xyXG5jb25zdCBuZWdGcmFjdCA9ICh4KSA9PiAxLjAgLSB4ICsgTWF0aC5mbG9vcih4KTtcclxuZXhwb3J0cy5uZWdGcmFjdCA9IG5lZ0ZyYWN0O1xyXG5jb25zdCBmcmFjdCA9ICh4KSA9PiB4IC0gTWF0aC5mbG9vcih4KTtcclxuZXhwb3J0cy5mcmFjdCA9IGZyYWN0O1xyXG5jb25zdCBjbGFtcCA9IChhLCBtaW4sIG1heCkgPT4gTWF0aC5tYXgoTWF0aC5taW4oYSwgbWF4KSwgbWluKTtcclxuZXhwb3J0cy5jbGFtcCA9IGNsYW1wO1xyXG5jb25zdCB0aW1lQXRQb3MgPSAoc3RhcnRQb3MsIGRpciwgbmV3UG9zKSA9PiBkaXIgPyBleHBvcnRzLmNsYW1wKChuZXdQb3MgLSBzdGFydFBvcykgLyBkaXIsIDAsIDEpIDogMDtcclxuZXhwb3J0cy50aW1lQXRQb3MgPSB0aW1lQXRQb3M7XHJcbmNvbnN0IGxlcnAgPSAoYSwgYiwgdCkgPT4gYSAqICgxIC0gdCkgKyBiICogdDtcclxuZXhwb3J0cy5sZXJwID0gbGVycDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5pbnNpZGUgPSBleHBvcnRzLmluUmFuZ2UgPSBleHBvcnRzLmF2ZyA9IGV4cG9ydHMubWF4MiA9IGV4cG9ydHMubWluMiA9IGV4cG9ydHMudG9QcmVjaXNpb24yID0gZXhwb3J0cy5sZXJwMiA9IGV4cG9ydHMubm9ybWFsaXplID0gZXhwb3J0cy5sZW5ndGggPSBleHBvcnRzLmRvdCA9IGV4cG9ydHMuc2lnbiA9IGV4cG9ydHMuYWJzID0gZXhwb3J0cy5jZWlsID0gZXhwb3J0cy5mbG9vciA9IGV4cG9ydHMuc3ViID0gZXhwb3J0cy5hZGRzID0gZXhwb3J0cy5hZGQgPSBleHBvcnRzLmRpdmlkZSA9IGV4cG9ydHMubXVsdGlwbHkgPSBleHBvcnRzLnNjYWxlID0gZXhwb3J0cy5lcXVhbHMgPSBleHBvcnRzLmRldGVybWluYW50MiA9IGV4cG9ydHMuY2xhbXAyID0gdm9pZCAwO1xyXG5jb25zdCBnbF9tYXRyaXhfMSA9IHJlcXVpcmUoXCJnbC1tYXRyaXhcIik7XHJcbmNvbnN0IGNvbW1vbl8xID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xyXG5jb25zdCBjbGFtcDIgPSAoYSwgbWluLCBtYXgpID0+IHtcclxuICAgIGNvbnN0IG91dCA9IGdsX21hdHJpeF8xLnZlYzIuY2xvbmUoYSk7XHJcbiAgICBnbF9tYXRyaXhfMS52ZWMyLm1pbihvdXQsIG91dCwgbWF4KTtcclxuICAgIGdsX21hdHJpeF8xLnZlYzIubWF4KG91dCwgb3V0LCBtaW4pO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuZXhwb3J0cy5jbGFtcDIgPSBjbGFtcDI7XHJcbmNvbnN0IGRldGVybWluYW50MiA9IChwMSwgcDIpID0+IHAxWzBdICogcDJbMV0gLSBwMVsxXSAqIHAyWzBdO1xyXG5leHBvcnRzLmRldGVybWluYW50MiA9IGRldGVybWluYW50MjtcclxuZXhwb3J0cy5lcXVhbHMgPSBnbF9tYXRyaXhfMS52ZWMyLmVxdWFscztcclxuY29uc3Qgc2NhbGUgPSAocDEsIGEpID0+IGdsX21hdHJpeF8xLnZlYzIuc2NhbGUoZ2xfbWF0cml4XzEudmVjMi5jcmVhdGUoKSwgcDEsIGEpO1xyXG5leHBvcnRzLnNjYWxlID0gc2NhbGU7XHJcbmNvbnN0IG11bHRpcGx5ID0gKHAxLCBwMikgPT4gZ2xfbWF0cml4XzEudmVjMi5tdWx0aXBseShnbF9tYXRyaXhfMS52ZWMyLmNyZWF0ZSgpLCBwMSwgcDIpO1xyXG5leHBvcnRzLm11bHRpcGx5ID0gbXVsdGlwbHk7XHJcbmNvbnN0IGRpdmlkZSA9IChwMSwgcDIpID0+IGdsX21hdHJpeF8xLnZlYzIuZGl2aWRlKGdsX21hdHJpeF8xLnZlYzIuY3JlYXRlKCksIHAxLCBwMik7XHJcbmV4cG9ydHMuZGl2aWRlID0gZGl2aWRlO1xyXG5jb25zdCBhZGQgPSAocDEsIHAyKSA9PiBnbF9tYXRyaXhfMS52ZWMyLmFkZChnbF9tYXRyaXhfMS52ZWMyLmNyZWF0ZSgpLCBwMSwgcDIpO1xyXG5leHBvcnRzLmFkZCA9IGFkZDtcclxuY29uc3QgYWRkcyA9IChwMSwgYSkgPT4gZ2xfbWF0cml4XzEudmVjMi5mcm9tVmFsdWVzKHAxWzBdICsgYSwgcDFbMV0gKyBhKTtcclxuZXhwb3J0cy5hZGRzID0gYWRkcztcclxuY29uc3Qgc3ViID0gKHAxLCBwMikgPT4gZ2xfbWF0cml4XzEudmVjMi5zdWIoZ2xfbWF0cml4XzEudmVjMi5jcmVhdGUoKSwgcDEsIHAyKTtcclxuZXhwb3J0cy5zdWIgPSBzdWI7XHJcbmNvbnN0IGZsb29yID0gKHAxKSA9PiBnbF9tYXRyaXhfMS52ZWMyLmZsb29yKGdsX21hdHJpeF8xLnZlYzIuY3JlYXRlKCksIHAxKTtcclxuZXhwb3J0cy5mbG9vciA9IGZsb29yO1xyXG5jb25zdCBjZWlsID0gKHAxKSA9PiBnbF9tYXRyaXhfMS52ZWMyLmNlaWwoZ2xfbWF0cml4XzEudmVjMi5jcmVhdGUoKSwgcDEpO1xyXG5leHBvcnRzLmNlaWwgPSBjZWlsO1xyXG5jb25zdCBhYnMgPSAocDEpID0+IGdsX21hdHJpeF8xLnZlYzIuZnJvbVZhbHVlcyhNYXRoLmFicyhwMVswXSksIE1hdGguYWJzKHAxWzFdKSk7XHJcbmV4cG9ydHMuYWJzID0gYWJzO1xyXG5jb25zdCBzaWduID0gKHAxKSA9PiBnbF9tYXRyaXhfMS52ZWMyLmZyb21WYWx1ZXMoTWF0aC5zaWduKHAxWzBdKSwgTWF0aC5zaWduKHAxWzFdKSk7XHJcbmV4cG9ydHMuc2lnbiA9IHNpZ247XHJcbmNvbnN0IGRvdCA9IChwMSwgcDIpID0+IGdsX21hdHJpeF8xLnZlYzIuZG90KHAxLCBwMik7XHJcbmV4cG9ydHMuZG90ID0gZG90O1xyXG5jb25zdCBsZW5ndGggPSAocDEpID0+IGdsX21hdHJpeF8xLnZlYzIubGVuZ3RoKHAxKTtcclxuZXhwb3J0cy5sZW5ndGggPSBsZW5ndGg7XHJcbmNvbnN0IG5vcm1hbGl6ZSA9IChwMSkgPT4gZXhwb3J0cy5zY2FsZShwMSwgMSAvIGV4cG9ydHMubGVuZ3RoKHAxKSk7XHJcbmV4cG9ydHMubm9ybWFsaXplID0gbm9ybWFsaXplO1xyXG5jb25zdCBsZXJwMiA9IChhLCBiLCB0KSA9PiBnbF9tYXRyaXhfMS52ZWMyLmxlcnAoZ2xfbWF0cml4XzEudmVjMi5jcmVhdGUoKSwgYSwgYiwgdCk7XHJcbmV4cG9ydHMubGVycDIgPSBsZXJwMjtcclxuLy93YXJuaW5nOiBtdXRhdGVzIGFcclxuY29uc3QgdG9QcmVjaXNpb24yID0gKGEsIGFtb3VudCkgPT4ge1xyXG4gICAgYVswXSA9IHBhcnNlRmxvYXQoYVswXS50b1ByZWNpc2lvbihhbW91bnQpKTtcclxuICAgIGFbMV0gPSBwYXJzZUZsb2F0KGFbMV0udG9QcmVjaXNpb24oYW1vdW50KSk7XHJcbiAgICByZXR1cm4gYTtcclxufTtcclxuZXhwb3J0cy50b1ByZWNpc2lvbjIgPSB0b1ByZWNpc2lvbjI7XHJcbmNvbnN0IG1pbjIgPSAoLi4ub2JqcykgPT4ge1xyXG4gICAgY29uc3QgW2ZpcnN0LCAuLi5yZXN0XSA9IG9ianM7XHJcbiAgICBjb25zdCByZXN1bHQgPSBnbF9tYXRyaXhfMS52ZWMyLmNsb25lKGZpcnN0KTtcclxuICAgIHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgZ2xfbWF0cml4XzEudmVjMi5taW4ocmVzdWx0LCByZXN1bHQsIG9iaik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmV4cG9ydHMubWluMiA9IG1pbjI7XHJcbmNvbnN0IG1heDIgPSAoLi4ub2JqcykgPT4ge1xyXG4gICAgY29uc3QgW2ZpcnN0LCAuLi5yZXN0XSA9IG9ianM7XHJcbiAgICBjb25zdCByZXN1bHQgPSBnbF9tYXRyaXhfMS52ZWMyLmNsb25lKGZpcnN0KTtcclxuICAgIHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgZ2xfbWF0cml4XzEudmVjMi5tYXgocmVzdWx0LCByZXN1bHQsIG9iaik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmV4cG9ydHMubWF4MiA9IG1heDI7XHJcbmNvbnN0IGF2ZyA9ICguLi5vYmpzKSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBnbF9tYXRyaXhfMS52ZWMyLmNyZWF0ZSgpO1xyXG4gICAgaWYgKG9ianMubGVuZ3RoKSB7XHJcbiAgICAgICAgb2Jqcy5mb3JFYWNoKChvYmopID0+IHtcclxuICAgICAgICAgICAgZ2xfbWF0cml4XzEudmVjMi5hZGQocmVzdWx0LCByZXN1bHQsIG9iaik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZ2xfbWF0cml4XzEudmVjMi5zY2FsZShyZXN1bHQsIHJlc3VsdCwgMSAvIG9ianMubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmV4cG9ydHMuYXZnID0gYXZnO1xyXG5jb25zdCBpblJhbmdlID0gKHAxLCBtaW4sIG1heCkgPT4ge1xyXG4gICAgcmV0dXJuICEocDFbMF0gPiBtYXhbMF0gfHwgcDFbMF0gPCBtaW5bMF0gfHwgcDFbMV0gPiBtYXhbMV0gfHwgcDFbMV0gPCBtaW5bMV0pO1xyXG59O1xyXG5leHBvcnRzLmluUmFuZ2UgPSBpblJhbmdlO1xyXG5jb25zdCBpbnNpZGUgPSAocG9pbnRzLCBwKSA9PiB7XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgbGV0IGN1ciA9IHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV07XHJcbiAgICBwb2ludHMuZm9yRWFjaCgobmV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHAwID0gY3VyWzFdIDwgbmV4dFsxXSA/IGN1ciA6IG5leHQ7XHJcbiAgICAgICAgY29uc3QgcDEgPSBjdXJbMV0gPCBuZXh0WzFdID8gbmV4dCA6IGN1cjtcclxuICAgICAgICBpZiAocDBbMV0gPCBwWzFdICsgY29tbW9uXzEuRVBTSUxPTiAmJiBwMVsxXSA+IHBbMV0gKyBjb21tb25fMS5FUFNJTE9OKSB7XHJcbiAgICAgICAgICAgIGlmICgocDFbMF0gLSBwMFswXSkgKiAocFsxXSAtIHAwWzFdKSA+IChwWzBdIC0gcDBbMF0pICogKHAxWzFdIC0gcDBbMV0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1ciA9IG5leHQ7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb3VudCAlIDIgIT09IDA7XHJcbn07XHJcbmV4cG9ydHMuaW5zaWRlID0gaW5zaWRlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnBsb3RMaW5lcyA9IHZvaWQgMDtcclxuY29uc3QgcGxvdExpbmVzID0gKGcsIHBvaW50cykgPT4ge1xyXG4gICAgY29uc3QgZmlyc3RQb2ludCA9IHBvaW50c1swXTtcclxuICAgIGcubW92ZVRvKGZpcnN0UG9pbnRbMF0sIGcuY2FudmFzLmhlaWdodCAtIGZpcnN0UG9pbnRbMV0pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpXTtcclxuICAgICAgICBnLmxpbmVUbyhwb2ludFswXSwgZy5jYW52YXMuaGVpZ2h0IC0gcG9pbnRbMV0pO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnBsb3RMaW5lcyA9IHBsb3RMaW5lcztcclxuIl0sIm5hbWVzIjpbImdsX21hdHJpeF8xIiwicXVhZHJhdGljQmV6aWVyVG9Qb2ludHNfMSIsInBsb3RMaW5lc18xIiwiZ2FtZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnIiwiZ2V0Q29udGV4dCIsIkVycm9yIiwiYmV6aWVycyIsInAxIiwidmVjMiIsImZyb21WYWx1ZXMiLCJwMiIsInAzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJiZXppZXIiLCJzZXRMaW5lRGFzaCIsInN0cm9rZVN0eWxlIiwiYmVnaW5QYXRoIiwicGxvdExpbmVzIiwic3Ryb2tlIiwiYmV6aWVyTGluZXMiLCJxdWFkcmF0aWNCZXppZXJUb1BvaW50cyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiY29tbW9uXzEiLCJwb2ludF8xIiwic3BsaXRCb3VuZGFyeSIsInBvaW50cyIsImNsb25lIiwicXVhZHJhdGljQmV6aWVyU3BsaXQiLCJtaW4iLCJtYXgiLCJpbnNlcnRJbmRleCIsInRpbWUiLCJsZXJwIiwicG9pbnRPbkN1cnZlIiwibGVycDIiLCJwcmV2UG9pbnQiLCJuZXh0UG9pbnQiLCJzcGxpY2UiLCJkb3QiLCJub3JtYWxpemUiLCJzdWIiLCJ0aW1lQXRQb3MiLCJjbGFtcCIsImZyYWN0IiwibmVnRnJhY3QiLCJFUFNJTE9OIiwieCIsIk1hdGgiLCJmbG9vciIsImEiLCJzdGFydFBvcyIsImRpciIsIm5ld1BvcyIsImIiLCJ0IiwiaW5zaWRlIiwiaW5SYW5nZSIsImF2ZyIsIm1heDIiLCJtaW4yIiwidG9QcmVjaXNpb24yIiwibGVuZ3RoIiwic2lnbiIsImFicyIsImNlaWwiLCJhZGRzIiwiYWRkIiwiZGl2aWRlIiwibXVsdGlwbHkiLCJzY2FsZSIsImVxdWFscyIsImRldGVybWluYW50MiIsImNsYW1wMiIsIm91dCIsImNyZWF0ZSIsImFtb3VudCIsInBhcnNlRmxvYXQiLCJ0b1ByZWNpc2lvbiIsIm9ianMiLCJmaXJzdCIsInJlc3QiLCJyZXN1bHQiLCJmb3JFYWNoIiwib2JqIiwicCIsImNvdW50IiwiY3VyIiwibmV4dCIsInAwIiwiZmlyc3RQb2ludCIsIm1vdmVUbyIsImNhbnZhcyIsImkiLCJwb2ludCIsImxpbmVUbyJdLCJzb3VyY2VSb290IjoiIn0=