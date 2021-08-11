const path = require('path');

const buildPath = path.resolve(__dirname, './dist');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    'conservative_rasterisation': {
      import: './src/demos/conservativeRasterisation.ts',
      dependOn: 'shared'
    },
    'cubic_bezier_simplification': {
      import: './src/demos/cubicBezierSimplification.ts',
      dependOn: 'shared'
    },
    'custom_font_webgl': {
      import: './src/demos/customFontWebgl.ts',
      dependOn: 'shared'
    },
    'custom_font': {
      import: './src/demos/customFont.ts',
      dependOn: 'shared'
    },
    'path_to_polygon': {
      import: './src/demos/pathToPolygon.ts',
      dependOn: 'shared'
    },
    'quadratic_bezier_simplification': {
      import: './src/demos/quadraticBezierSimplification.ts',
      dependOn: 'shared'
    },
    'rasterised': {
      import: './src/demos/rasterised.ts',
      dependOn: 'shared'
    },
    'single_cell': {
      import: './src/demos/singleCell.ts',
      dependOn: 'shared'
    },
    'triangle_webgl': {
      import: './src/demos/triangleWebgl.ts',
      dependOn: 'shared'
    },
    shared: ['earcut', 'opentype.js', 'gl-matrix'],
  },
  output: {
    filename: '[name].js',
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.(frag|vert)/,
        type: 'asset/source'
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.html' ]
  },
  devServer: {
    contentBase: buildPath,
    injectClient: false,
    injectHot: false
  }
};
