import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import fs from "fs";
import resolve from "rollup-plugin-node-resolve";

const plugins = {
  babel: babel({
    exclude: "node_modules/**",
    runtimeHelpers: true
  }),
  commonjs: commonjs(),
  resolve: resolve()
};

const dirs = {
  input: "src",
  output: "dist"
};

dirs.outputCjs = `${dirs.output}/cjs`;
dirs.outputEs = `${dirs.output}/es`;
dirs.outputUmd = `${dirs.output}/umd`;

const getCjsAndEsConfig = fileName => ({
  input: `${dirs.input}/${fileName}`,
  output: [
    {file: `${dirs.outputCjs}/${fileName}`, format: "cjs"},
    {file: `${dirs.outputEs}/${fileName}`, format: "es"}
  ],
  plugins: [plugins.babel]
});

const sources = fs.readdirSync("src");

export default [
  {
    input: "src/index.js",
    output: {
      file: `${dirs.outputUmd}/index.js`,
      format: "umd"
    },
    name: "UtilsArray",
    plugins: [plugins.babel, plugins.resolve, plugins.commonjs]
  },
  ...sources.map(getCjsAndEsConfig)
];
