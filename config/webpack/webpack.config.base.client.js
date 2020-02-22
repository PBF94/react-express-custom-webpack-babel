const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
    const { PLATFORM, VERSION } = env;
    return merge([
        {
            entry: path.resolve(
                __dirname,
                "../../",
                "client",
                "src",
                "index.js"
            ),
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader"
                        }
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            PLATFORM === "production"
                                ? MiniCssExtractPlugin.loader
                                : "style-loader",
                            "css-loader",
                            "sass-loader"
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            PLATFORM === "production"
                                ? MiniCssExtractPlugin.loader
                                : "style-loader",
                            "css-loader"
                        ]
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: path.resolve(
                        __dirname,
                        "../../",
                        "client",
                        "src",
                        "index.html"
                    ),
                    filename: "./index.html"
                }),
                new webpack.DefinePlugin({
                    "process.env.VERSION": JSON.stringify(env.VERSION),
                    "process.env.PLATFORM": JSON.stringify(env.PLATFORM)
                })
            ]
        }
    ]);
};
