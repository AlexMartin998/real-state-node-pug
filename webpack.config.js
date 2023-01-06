import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
    mode: 'development',
    entry: {
        map: './src/public/js/js/map.js',
        addImage: './src/public/js/js/add-image.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./src/public/js'),
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./src/public/js/map.*.js'],
        }),
    ],
};
