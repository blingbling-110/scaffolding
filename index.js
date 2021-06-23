const figlet = require('figlet');
const lolcatjs = require('lolcatjs');
const chalk = require('chalk');
const shell = require('shelljs');
const { Command } = require('commander');
const argv = require('yargs-parser')(process.argv.slice(2))

console.log('\n\nfiglet(简单文字生成工具)');
console.log(figlet.textSync('Boo!', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}));

console.log('\n\nlolcat(彩色文字生成工具)');
lolcatjs.options.seed = Math.round(Math.random() * 1000);
lolcatjs.options.colors = true;
lolcatjs.fromString('I can has Cheezburger?');

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
shell.echo('hello world');

console.log('\n\ncommander(接收用户输入的命令)');
//调用方法：node index.js -V
const program = new Command();
// program.version('0.0.1').parse(process.argv);

console.log('\n\nyargs- parser(命令行参数解析工具)');
//调用方法：node index.js --foo=33 --bar hello
console.log(argv);
