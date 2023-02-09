import chalk from 'chalk';
import colorize from 'json-colorizer';
import cliSpinners from 'cli-spinners';
import ora from 'ora';
import { ConfigArgs } from './config';
import { writeFile } from 'fs/promises';

const ignoreList = ['config', 'vendor', '_', 'out'];
const keyRename = {
    $0: 'vendor',
    $1: 'argument',
} as any;

function resultSummary(result: any): string {
    if (Array.isArray(result)) {
        return result.length.toString() + ' items';
    } else {
        return Object.keys(result).length + ' properties';
    }
}

export default async function asyncMethodTester<T extends ConfigArgs>(method: (args: T) => Promise<any>, name: string, argv: T) {
    console.log('');
    console.log(chalk.inverse(` ${name} `));
    console.log('');

    console.log('Making request with:');
    for (const key of Object.keys(argv)) {
        if (ignoreList.indexOf(key) === -1) {
            const name = keyRename[key] ?? key;
            console.log(` - ${chalk.cyan(name)}: ${(argv as any)[key]}`);
        }
    }
    console.log('');

    const spinner = ora('Please wait...');
    spinner.spinner = cliSpinners.clock;
    spinner.start();

    try {
        const result = await method(argv);

        spinner.stop();
    
        console.log(chalk.green('Finished! 🎉'));
        console.log('');
    
        console.log(`Results (${resultSummary(result)}):`);
        const resultJson = JSON.stringify(result, null, 2);
        console.log(colorize(JSON.stringify(result, null, 2), {
            colors: {
                STRING_KEY: '#A6E22E',
                STRING_LITERAL: '#E6DB74',
                NUMBER_LITERAL: '#AE81FF'
            }
        }));

        console.log();
        console.log(`Printed ${resultSummary(result)}.`);

        if (argv.out) {
            await writeFile(argv.out, resultJson, { encoding: 'utf8' });

            console.log('');
            console.log(chalk.green(`Output written to ${argv.out}.`));
        }
    } catch (err) {
        spinner.stop();

        console.log(chalk.red('An error occurred:'));
        console.log('');

        console.error(err);
    }
}