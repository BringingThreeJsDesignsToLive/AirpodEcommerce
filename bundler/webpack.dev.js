import commonConfiguration from './webpack.common.js';
import { merge } from 'webpack-merge';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const infoColor = _message => `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`


export default merge(commonConfiguration, {
    mode: 'development',
    output: {
        path: resolve(__dirname, '../dist'),
        filename: '[name].js',
    },
    devtool: 'inline-source-map',
    devServer: {
        host: 'local-ip',
        port: 3000,
        open: true,
        https: false,
        allowedHosts: 'all',
        hot: true,
        watchFiles: ['src/**', 'static/**'],
        static:
        {
            watch: true,
            directory: resolve(__dirname, '../static')
        },
        client:
        {
            logging: 'none',
            overlay: true,
            progress: false
        },
        setupMiddlewares: function (middlewares, devServer) {
            console.log('------------------------------------------------------------')
            console.log(devServer.options.host)
            const port = devServer.options.port
            const https = devServer.options.https ? 's' : ''
            const domain1 = `http${https}://${devServer.options.host}:${port}`
            const domain2 = `http${https}://localhost:${port}`

            console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`)

            return middlewares
        }
    }
})