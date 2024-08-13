const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PORT = 3001

module.exports = (options) => {
    const { WEBPACK_SERVE } = options

    const babelEsRule = {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-typescript',
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
            ],
            plugins: [
                // ['@babel/plugin-transform-react-jsx', { pragma: 'React' }],
                // '@babel/plugin-transform-runtime',
                // '@babel/plugin-transform-regenerator',
                // '@babel/plugin-transform-modules-commonjs',
            ],
        }
    }

    const esbuildRule = {
        loader: 'esbuild-loader',
    }

    // const esRule = WEBPACK_SERVE ? esbuildRule : babelEsRule
    const esRule = esbuildRule

    return {
        mode: WEBPACK_SERVE ? 'development' : 'production',
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, '../../docs'),
            // library: {
            //     type: 'window',
            //     name: '$fpc',
            // }
        },
        target: ['web', 'es5'],
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                '~': path.resolve(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.s[ca]ss$/,
                    use: [
                        // MiniCssExtractPlugin.loader,
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.[jt]sx?$/,
                    use: esRule
                }
            ]
        },
        plugins: [
            // new MiniCssExtractPlugin({
            //     filename: '[name].css',
            //     chunkFilename: '[id].css',
            // }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: '',
                filename: 'index.html',
                template: path.resolve('template.html'),
                inject: 'body',
                hash: true,
            }),
        ],
        optimization: {
            // minimize: false,
            // splitChunks: {
            //     chunks: 'all'
            // },
            splitChunks: {
                chunks: 'all', // 对所有类型的代码进行分割
                minSize: 20000, // 生成 chunk 的最小体积
                maxSize: 500000, // 生成 chunk 的最大体积
                minChunks: 1, // 共享模块的最小 chunks 数
                maxAsyncRequests: 30, // 按需加载时的最大并行请求数
                maxInitialRequests: 30, // 入口点的最大并行请求数
                automaticNameDelimiter: '~', // 文件名的连接符
                cacheGroups: {
                    // 定义缓存组
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10, // 优先级
                        reuseExistingChunk: true, // 复用已经存在的 chunk
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    reactVendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        name: 'react-vendor',
                        chunks: 'all',
                        priority: 20,
                    },
                    // uiLibs: {
                    //     test: /[\\/]node_modules[\\/](@mui|antd)[\\/]/,
                    //     name: 'ui-libs',
                    //     chunks: 'all',
                    //     priority: 10,
                    // },
                }
            },
            runtimeChunk: 'single', // 创建一个单独的运行时文件
        },
        devServer: {
            port: PORT,
            hot: true,
            open: true,
            allowedHosts: [
                'devpre.cnsuning.com'
            ],
            open: true,
            liveReload: true,
        }
    }
}