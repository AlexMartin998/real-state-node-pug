import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
    mode: 'development',
    entry: {
        map: './src/public/js/map.js',
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve('./src/public/js'),
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./src/public/js/map.*.js'],
        }),
    ],
};
