module.exports = function override(config, env) {
	if (!config.module.rules) {
		config.module.rules = [];
	}

	config.module.rules.push({
		test: /\.scss$/,
		use: [
			'sass-loader',
			{
				loader: 'sass-resources-loader',
				options: {
					resources: ['./src/assets/sass/app.scss']
				}
			}
		]
	});

	return config;
};
