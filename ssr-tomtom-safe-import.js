let ssrSafeTomtom;

if (process.browser) {
	ssrSafeTomtom = require("@tomtom-international/web-sdk-maps");
}

export { ssrSafeTomtom };
