import Yargs from 'yargs';
import { Arguments, Argv } from 'yargs';

// TODO
const YargsCommandBuilderOptions: Yargs.RequireDirectoryOptions = { extensions: ['ts', 'js'], exclude: /\.spec\.ts$/ };

/**
 * TODO
 * @param yargInstance 
 * @returns 
 */
const configureYargs = (yargInstance: Argv): Promise<Arguments> => {
    return new Promise(
        async (resolve): Promise<void> => {
            let failInvoked = false;
            const isYError = (err?: Error | string): boolean => err instanceof Error && err.name === 'YError';
            const failFn = (msg: string, err?: Error | string): void => {
                // fail should only be invoked once
                if (failInvoked) {
                    return;
                }
                failInvoked = true;
                if ((msg && !err) || isYError(err)) {
                    yargInstance.showHelp('error');
                }
                console.log(err || msg);
            };
            const argv = await yargInstance
                .scriptName('dc-integration-tester')
                .commandDir('./commands', YargsCommandBuilderOptions)
                .strict()
                .demandCommand(1, 'Please specify at least one command')
                .exitProcess(false)
                .showHelpOnFail(false)
                .fail(failFn).argv;
            resolve(argv);
        }
    );
};

/**
 * TODO
 */
export default async (yargInstance = Yargs(process.argv.slice(2))): Promise<Arguments | void> => {
    return await configureYargs(yargInstance);
};