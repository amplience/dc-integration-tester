import { getCommerceAPI, CommonArgs, GetVariantsArgs } from '@amplience/dc-demostore-integration';
import { Argv, Arguments } from 'yargs';
import asyncMethodTester from '../common/async-method-tester';
import getConfig, { ConfigArgs } from '../common/config';
import { commonCommandOptions } from '../common/command-options';

export const command = 'get-variants <vendor> <productId>';

export const desc = 'Gets a product\'s variants from the given vendor';

type GetVariantsCommandArgs = CommonArgs & GetVariantsArgs & ConfigArgs

export const builder = (yargs: Argv): void => {
  yargs
    .options(commonCommandOptions)
    .positional('vendor', {
        type: 'string',
        description: 'Vendor to use. Credentials must be available in the configuration file.'
    })
    .positional('productId', {
        type: 'string',
        description: 'Product ID to fetch variants for.'
    })
};

export const handler = async (argv: Arguments<GetVariantsCommandArgs>): Promise<void> => {
    const config = await getConfig(argv.vendor);

    if (config === undefined) {
        return;
    }

    const api = await getCommerceAPI(config);

    await asyncMethodTester(api.getVariants.bind(api), `getVariants (${argv.vendor})`, argv);
};
