var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = '192.168.26.69';
const PORT = process.env.PORT || 5050;

const METADATA = Object.assign({}, {
    host: HOST,
    port: PORT
});

module.exports = {
    entry: [
        'babel-polyfill',
        path.join(parentDir, 'index.js')
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },{
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },{
                test: /\.css$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" }
                ]
            },{
                test: /\.woff/, 
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            },{
                test: /\.woff2/, 
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            },{
                test: /\.eot/, 
                loader: 'file-loader'
            },{
                test: /\.ttf/, 
                loader: 'file-loader'
            },{
                test: /\.svg/, 
                loader: 'file-loader'
            },{
                test: /\.png/, 
                loader: 'file-loader'
            },{
                test: /\.gif$/, 
                loader: "url-loader?mimetype=image/png"
            },{
                test: /\\.(jpe?g|png|gif|ttf|eot|svg|woff2?)$/,
                use: 'url-loader?name=[name].[ext]',
            },{
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000' 
            }
        ]
    },
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        inline: false,
        contentBase: parentDir,
	compress: true,
	allowedHosts: [
	    '.inno.co.th'	
    ],
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        historyApiFallback: true,
        port: METADATA.port,
        host: METADATA.host
    },
  
}
