module.exports = (isDev)=>{
    return {
        preserveWhitespace:true,
        extractCSS:!isDev,
        cssModules:{},
        // postcss
        // hotReload:false
    }
}