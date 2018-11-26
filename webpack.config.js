
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === "development";
const config = {
    target:"web",
    mode:'development',
    entry:path.resolve(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                //template中的css样式报错
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
            },
            {
                // 不能写$结束，因为两件有两种后缀 .styl 和 .stylus
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test:/\.(jpg|gif|jpeg|png|svg)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new VueLoaderPlugin() ,
        new HtmlPlugin()  
    ]
}

if(isDev){
    config.devtool="#cheap-module-eval-source-map";
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay:{
            error:true
        },
        hot :true

    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
}

module.exports = config;