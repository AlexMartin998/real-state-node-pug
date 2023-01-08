import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
    mode: 'development',
    entry: {
        map: './src/public/js/js/map.js',
        addImage: './src/public/js/js/add-image.js',
        showMap: './src/public/js/js/show-map.js',
        homeMap: './src/public/js/js/map-home.js',
        searcher: './src/public/js/js/searcher.js',
        show: './src/public/js/js/show.js',
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
