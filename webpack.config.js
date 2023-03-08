const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    target: "web",
    entry: ["@babel/polyfill", path.resolve(__dirname, "src", "index.html")],
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
        filename: "[name].[contenthash].js",
        // assetModuleFilename: "assets/[name][ext]",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", { targets: "defaults" }],
                        ],
                    },
                },
                type: "asset/resource",
            },

            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require("postcss-preset-env")],
                            },
                        },
                    },
                    "group-css-media-queries-loader",
                    {
                        loader: "resolve-url-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },

            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext]",
                },
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
        ],
    },
};
