const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin");

const baseConfig = require("./webpack.config.base.client");

const prodConfig = env => {
    return merge([
        {
            optimization: {
                minimizer: [new UglifyJsPlugin()]
            },
            plugins: [
                new MiniCssExtractPlugin(),
                new OptimizeCssAssetsPlugin(),
                new Visualizer({ filename: "./statistics.html" })
            ]
        }
    ]);
};

module.exports = env => {
    return merge(baseConfig(env), prodConfig(env));
};
