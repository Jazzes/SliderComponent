const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CssNano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.module\.s[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: "[hash:base64:5]",
                        },
                        esModule: false,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                autoprefixer(),
                                CssNano()
                            ]
                        },
                    },
                },
                'sass-loader',
            ],
        }, {
            test: /\.s[ac]ss$/,
            exclude: /\.module\.s[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                autoprefixer(),
                                CssNano()
                            ]
                        },
                    },
                },
                'sass-loader',
            ],
        }, {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                autoprefixer(),
                                CssNano(),
                            ],
                        },
                    },
                },
            ],
        },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimize: true
    },
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    mode: 'production',
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true,
        hot: true,
    },
};