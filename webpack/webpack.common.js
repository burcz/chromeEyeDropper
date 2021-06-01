const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin')
const SizePlugin = require('size-plugin')
const srcDir = '../src/'

module.exports = {
    entry: {
        popup: path.join(__dirname, srcDir + 'popup'),
        options: path.join(__dirname, srcDir + 'options'),
        plus: path.join(__dirname, srcDir + 'plus'),
        background: path.join(__dirname, srcDir + 'background'),
        edropper2: path.join(__dirname, srcDir + 'edropper2'),
        debug_tab: path.join(__dirname, srcDir + 'debug_tab'),
		ColorTranslator: path.join(__dirname, srcDir + 'ColorTranslator')
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js',
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new SizePlugin(),
        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyPlugin({
			patterns: [{ from: '.', to: '../', context: 'public/' },{ from: './src/colorSchemes/autumn.json', to: '../js/colorSchemes/autumn.json' }],
        }),

        new ReplaceInFileWebpackPlugin([
            {
                dir: 'dist',
                files: ['manifest.json', 'button-about.html'],
                rules: [
                    {
                        search: '@versionname',
                        replace: process.env.npm_package_version.replace(/-/, ' '),
                    },
                    {
                        search: '@version',
                        replace: process.env.npm_package_version.replace(/-.*/, ''),
                    },
                ],
            },
        ]),
    ],
}
