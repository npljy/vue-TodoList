
const path = require('path')
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === "development";
const config = {
    target:"web",
    mode:isDev?'development':'production',
    entry:path.resolve(__dirname,'../src/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.jsx$/, 
                loader:'babel-loader',
            },
            {
                test:/\.js$/,
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
                            name:'resources/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}



module.exports = config;