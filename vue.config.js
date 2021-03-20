const path = require('path');

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'@root': path.resolve(__dirname, './src'),
			},
		}
	},
	pages: {
		index: {
			entry: 'src/index.ts',
		},
	},
};