const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [
        './src/components/index.tsx'
    ],
    devtool: 'inline-source-map',
    target: "web",
    mode: "development",
    output: {
        path: __dirname + '/dist',
        filename: "app.bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.css$/,
                loader: "css-loader",
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "components", "index.html"),
        }),
        // new MiniCssExtractPlugin({
        //     filename: "./src/yourfile.css",
        // }),
    ]
};
