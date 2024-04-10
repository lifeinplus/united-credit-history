const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV ?? "development",
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /.tsx$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "uch.bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
};
