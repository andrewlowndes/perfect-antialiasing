# Antialiasing via conservative rasterisation and analytical area computation
A new technique for rendering 3D triangles with 'perfect' anti-aliasing. Fonts and vectors are broken into triangles and rasterised conservatively then a fragment shader determines the triangle area coverage to compute the alpha for each fragment.

## Process
GPU Rendering of vector graphics at a sub-pixel accuracy:
1. Triangulate curves into triangles
2. Render each triangle using conservative rasterisation
3. For each fragment:
   1. Perform a triangle/box intersection, creating a polygon
   2. Sum the areas of the triangles in the polygon
   3. Divide the sum by the fragment area to give a percentage coverage
   4. Continue for all triangles, additively blending

## Preview
![Preview](/images/preview.png)

## Demos
Visit https://andrewlowndes.github.io/perfect-antialiasing/dist/ to see a set of demos showing the various techniques used in this repo.

## Run
1. Ensure NodeJS installed
2. Run `npm i` to install dependencies
3. Run `npm start` to open the demos in a web app

## Roadmap
- [x] CPU Demo (Canvas)
    - [x] Cubic/quadratic bezier tesselation
    - [x] Triangulate path to polygons
    - [x] Conservative rasterisation
    - [x] SVG test
    - [x] Cell logic
    - [x] Custom font rendering
- [ ] WebGL
    - [x] Conservative rasterisation (vertex-shader based shifting)
    - [x] Custom font rendering
    - [x] 3D Triangle
    - [ ] 3D scene
    - [ ] Screen-space tesselation
    - [ ] Instancing
    - [ ] Performance test
- [ ] Vulkan
    - [ ] Screen-space tesselation via geometry shader
    - [ ] Conservative rasterisation using gpu extensions
    - [ ] Instancing
    - [ ] Performance test
- [ ] Further experiments
    - [ ] Exact curve coverage analytics
        - [ ] Quadratic Bezier
        - [ ] Cubic Bezier (prob too complicated)

## Usages
- Anti-aliasing in games (need to assess overhead of conservative rasterisation and the alpha computation in the fragment shader)
- Font rendering (still relies on triangulation - use screen-space in tesselation shader for resolution independent rendering)

## Development
Install VS Code and the following extensions:
- EditorConfig for VS Code
- ESLint
- Prettier

## References

Vertex-based conservative rasterisation based off algorithm 2 from GPU Gems 2 Chapter 43 (https://developer.nvidia.com/gpugems/gpugems2/part-v-image-oriented-computing/chapter-42-conservative-rasterization)


