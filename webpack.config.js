
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === "development";
const config = {
    target:"web",
    mode:isDev?'development':'production',
    entry:path.resolve(__dirname,'client/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
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
    config.module.rules.push(
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
        } 
    )
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
else{
    config.entry = {
        app:path.resolve(__dirname,'client/index.js'),
        vender:['vue']
    }
    config.output.filename = '[name].[chunkhash].js'
    config.module.rules.push(
        {
            test:/\.styl/,
            use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use:[
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            })
        }
    )
    config.plugins.push(
        new ExtractTextPlugin('styles.[chunkhash:8].css'),
    )
    config.optimization={
        splitChunks:{
            name:'vender'
        }
    }
}

module.exports = config;