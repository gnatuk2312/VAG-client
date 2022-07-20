/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	env: {
		TOMTOM_API_KEY: process.env.TOMTOM_API_KEY,
	},
};

module.exports = nextConfig;
