const path = require('path');

const buildPath = path.resolve(__dirname, './dist');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  entry: {
    'conservative_rasterisation': './src/demos/conservativeRasterisation.ts',
    'cubic_bezier_simplification': './src/demos/cubicBezierSimplification.ts',
    'custom_font_webgl': './src/demos/customFontWebgl.ts',
    'custom_font': './src/demos/customFont.ts',
    'path_to_polygon': './src/demos/pathToPolygon.ts',
    'quadratic_bezier_simplification': './src/demos/quadraticBezierSimplification.ts',
    'rasterised': './src/demos/rasterised.ts',
    'single_cell': './src/demos/singleCell.ts'
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
    contentBase: buildPath
  }
};
