module.exports = {
	module: {
		rules: [
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: [{ loader: "@svgr/webpack", dimensions: false }],
			},
		],
	},
};
