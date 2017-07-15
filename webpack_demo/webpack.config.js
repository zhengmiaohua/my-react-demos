const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanPlugin=require('clean-webpack-plugin');
module.exports={
	devtool: "cheap-eval-source-map",
	entry:{
		index:'./src/index.jsx'/*,
		vendors:['react','react-dom']*/
	},
	output:{
		path:path.resolve(__dirname, 'build'),
		filename:'bundle.js?[hash]',
	},
	module:{
		rules:[{
			test: /\.(jsx|js)$/,
            exclude: /(node_modules|bower_components)/,
            include:/src/,
	        use: {
		        loader: 'babel-loader',
		        options: {
	          		presets: ['env','react']
		        }
	        }
		}]
		/*loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test: /\.js$/, loader: "babel-loader", query: {presets: ['es2015','react']}}
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        ]*/
	},
	resolve: {
        extensions:['.js','.json']
    },
    devServer: {
        historyApiFallback: true,
        inline: true
    },
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html'
		}),
		new CleanPlugin('build'),
		/*new webpack.optimize.UglifyJsPlugin({
			output:{
				comments:false
			},
			compress:{
				warnings:false
			},
			except:['$super','$','exports','require']
		}),
		new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}
        }),*/
        /*new webpack.optimize.CommonsChunkPlugin({
        	name:'vendors'
        }),*/
        new webpack.ProvidePlugin({
	      	$: "jquery",
	      	jQuery: "jquery",
	      	"window.jQuery": "jquery"
	    }),
	    new webpack.HotModuleReplacementPlugin()
	]
}