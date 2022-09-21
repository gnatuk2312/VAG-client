/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	env: {
		TOMTOM_API_KEY: process.env.TOMTOM_API_KEY,
		SERVER_URL: process.env.SERVER_URL,
	},
};

module.exports = nextConfig;
