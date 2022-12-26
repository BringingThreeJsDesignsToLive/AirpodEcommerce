import commonConfiguration from './webpack.common.js';
import { merge } from 'webpack-merge';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default merge(commonConfiguration, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]-[contenthash].js',
    },
    devtool: 'source-map',
})