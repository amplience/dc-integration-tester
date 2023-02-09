import { getCommerceAPI, CommonArgs, GetCommerceObjectArgs } from '@amplience/dc-demostore-integration';
import { Argv, Arguments } from 'yargs';
import asyncMethodTester from '../common/async-method-tester';
import getConfig, { ConfigArgs } from '../common/config';
import { commonCommandOptions } from '../common/command-options';

export const command = 'get-mega-menu <vendor>';

export const desc = 'Gets the mega menu from the given vendor';

type GetMegaMenuArgs = CommonArgs & ConfigArgs

export const builder = (yargs: Argv): void => {
  yargs
    .options(commonCommandOptions)
    .positional('vendor', {
        type: 'string',
        description: 'Vendor to use. Credentials must be available in the configuration file.'
    })
};

export const handler = async (argv: Arguments<GetMegaMenuArgs>): Promise<void> => {
    const config = await getConfig(argv.vendor);

    if (config === undefined) {
        return;
    }

    const api = await getCommerceAPI(config);

    await asyncMethodTester(api.getMegaMenu.bind(api), `getMegaMenu (${argv.vendor})`, argv);
};
