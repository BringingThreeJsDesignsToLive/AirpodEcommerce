import path from 'path'
import fs from 'fs'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

// create a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const devMode = process.env.NODE_ENV !== "production";

// gets all the html names in pages folder
const htmlPagesNames = [];
const pages = fs.readdirSync('./src/pages');
pages.forEach(page => {
    if (page.endsWith('.html')) {
        htmlPagesNames.push(page.split('.html')[0])
    }
})



export default {
    entry: {
        main: path.resolve(__dirname, '../src/main.ts')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // Loaders
    module: {
        rules: [
            // typescript
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/i,
            },
            // css and scss
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            // images
            {
                test: /\.(png|jpg|svg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "assets/images/[name][hash][ext]"
                }
            },
            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/fonts/[hash][ext]'
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/pages/index.html'),
            chunks: ['main'],
            minify: devMode ? false : true
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static'), to: 'assets', noErrorOnMissing: true }
            ]
        }),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
}