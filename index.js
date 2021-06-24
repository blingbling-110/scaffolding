const figlet = require('figlet');
const lolcatjs = require('lolcatjs');
const chalk = require('chalk');
const shell = require('shelljs');
const { Command } = require('commander');
const argv = require('yargs-parser')(process.argv.slice(2))
const convert = require("./quicktype.js");
const { detectClones } = require("jscpd");
const runAll = require("npm-run-all");

console.log('\n\nfiglet(简单文字生成工具)');
console.log(figlet.textSync('blingbling', {
    font: 'Doom',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 100,
    whitespaceBreak: true
}));

console.log('\n\nlolcat(彩色文字生成工具)');
lolcatjs.options.seed = Math.round(Math.random() * 1000);
lolcatjs.options.colors = true;
lolcatjs.fromString('https://github.com/blingbling-110/scaffolding');

console.log('\n\nchalk(带颜色输出的工具)');
// Nest styles of the same type even (color, underline, background)
console.log(chalk.green(
    'I am a green line ' +
    chalk.blue.underline.bold('with a blue substring') +
    ' that becomes green again!'
));
// ES2015 template literal
console.log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);
// Use RGB colors in terminal emulators that support it.
console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
console.log(chalk.hex('#DEADED').bold('Bold gray!'));

console.log('\n\nshelljs(js版shell工具)');
console.log(shell.ls());

console.log('\n\ncommander(接收用户输入的命令)');
//注意：commander有可能终止脚本的执行
const program = new Command();
program.version('0.0.1');//设置版本
//定义选项
program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');
program.parse(process.argv);//处理参数
const options = program.opts();//获取选项
if (options.debug) console.log(options);
console.log('pizza details:');
if (options.small) console.log('- small pizza size');
if (options.pizzaType) console.log(`- ${options.pizzaType}`);

console.log('\n\nyargs-parser(命令行参数解析工具)');
//调用方法：node index.js --foo=33 --bar hello
console.log(argv);

console.log('\n\nquicktype(可将JSON字符快速生成模型和序列化代码)');
//quicktype.js由以下命令生成：
//echo '{ "name": "David" }' | npx quicktype -l js -o quicktype.js
console.log(convert.toQuicktype('{ "name": "blingbling" }'));
console.log(convert.quicktypeToJson({ name: 'blingbling_110' }));

console.log('\n\njscpd(重复代码检查工具,小项目可以使用)');
//TODO 暂未使用成功
(async () => {
    const clones = await detectClones({
        path: [
            __dirname
        ],
        silent: true
    });
    console.log('重复：', clones);
})();
(async () => {
    const clones = await detectClones({
        path: [
            __dirname
        ],
        silent: true
    });
    console.log('重复：', clones);
})();

console.log('\n\nnpm-run-all(并行执行工具)');
//并行执行，耗时2s
runAll(["script1", "script2"], { parallel: true })
    .then(results => {
        console.log(`${results[0].name}: ${results[0].code}`);
        console.log(`${results[1].name}: ${results[1].code}`);
    })
    .catch(err => console.log('执行失败！', err));
//串行执行，耗时(2+2=)4s
runAll(["script3", "script4"], { parallel: false })
    .then(results => {
        console.log(`${results[0].name}: ${results[0].code}`);
        console.log(`${results[1].name}: ${results[1].code}`);
    })
    .catch(err => console.log('执行失败！', err));

console.log('\n\nscripty(映射目录执行shell脚本配置)');
shell.exec('npm run foo:bar');//通过shelljs执行npm脚本来演示
