const {defineConfig} = require('@vue/cli-service');
const path = require('path');
require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        storybook: {
            allowedPlugins: ['define']
        }
    },
    css: {
        extract: false
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    include: [path.resolve(__dirname, 'src')]
                },
                {
                    test: /\.(png|jpe?g)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    type: 'asset',
                    loader: 'svgo-loader'
                }
            ]
        }
    }
});
