const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    plugins:[
        require('autoprefixer'),
        new ExtractTextWebpackPlugin('css/index.css')
    ],
    module:{
        rules:[{
            test:/\.css$/,
            use:ExtractTextWebpackPlugin.extract({
                fallback:"style-loader",
                use:[{
                    loader:"css-loader",
                    options:{importLoaders:1}
                    },'postcss-loader'
                ]
            })
        }]
    }
};