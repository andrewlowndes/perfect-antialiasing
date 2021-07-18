const path = require('path');

const buildPath = path.resolve(__dirname, './dist');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  entry: {
    'conservative_rasterisation': {
      import: './src/demos/conservativeRasterisation.ts'
    },
    'cubic_bezier_simplification': {
      import: './src/demos/cubicBezierSimplification.ts'
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
      import: './src/demos/quadraticBezierSimplification.ts'
    },
    'rasterised': {
      import: './src/demos/rasterised.ts'
    },
    'single_cell': {
      import: './src/demos/singleCell.ts'
    },
    shared: ['earcut', 'opentype.js'],
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
