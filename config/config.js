const fs = require("fs");
const path = require("path");
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json")));

const banner = `/**
 * regexp-events v${pkg.version}
 * built ${new Date()}
 */`;

const minBanner = `/* regexp-events v${pkg.version} */`;

function keepBanner(node, comment) {
	let text = comment.value;
	let type = comment.type;
	if (type === "comment2") {
		// multiline comment
		return /regexp-events/i.test(text);
	}
}

module.exports = {
	entry: "src/index.js",
	amd: { id: "regexp-events" },
	moduleName: "RegExpEvents",
	banner,
	minBanner,
	keepBanner,
};
