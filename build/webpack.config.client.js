
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const isDev = process.env.NODE_ENV === "development";
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV:isDev?'"development"':'"production"'
        }
    }),
    new VueLoaderPlugin() ,
    new HtmlPlugin()  
]
let config ;
let devServer = {
    port:8000,
    host:'0.0.0.0',
    overlay:{
        error:true
    },
    hot :true

};
if(isDev){
    config = merge(baseConfig,{
        devtool:"#cheap-module-eval-source-map",
        module:{
            rules:[
                {
                    // 不能写$结束，因为两件有两种后缀 .styl 和 .stylus
                    test:/\.styl/,
                    use:[
                        'vue-style-loader',
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
            ]
        },
        devServer,
        plugins:defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })

}
else{
    config = merge(baseConfig,{
        entry :{
            app:path.resolve(__dirname,'../client/index.js'),
            vender:['vue']
        },
        output:{
            filename:'[name].[chunkhash].js'
        },
        module:{
            rules:[
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
            ]
        },
        plugins:defaultPlugins.concat([
            new ExtractTextPlugin('styles.[chunkhash:8].css'),
        ]),
        optimization:{
            splitChunks:{
                name:'vender'
            }
        }
    })
}

module.exports = config;