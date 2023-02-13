import { getCommerceAPI, CommonArgs, GetProductsArgs } from '@amplience/dc-demostore-integration';
import { Argv, Arguments, Options } from 'yargs';
import asyncMethodTester from '../common/async-method-tester';
import getConfig, { ConfigArgs } from '../common/config';
import { commonCommandOptions } from '../common/command-options';
import chalk from 'chalk'

export const command = 'get-products <vendor>';

export const desc = 'Gets a products from the given vendor';

type GetProductsCommandArgs = CommonArgs & GetProductsArgs & ConfigArgs

export const getProductsCommandOptions = {
    ...commonCommandOptions,
    productIds: { type: 'string', description: 'Comma separated IDs for products to fetch.' } as Options,
    keyword: { type: 'string', description: 'Keyword to search for products.' } as Options
}

export const builder = (yargs: Argv): void => {
  yargs
    .options(getProductsCommandOptions)
    .positional('vendor', {
        type: 'string',
        description: 'Vendor to use. Credentials must be available in the configuration file.'
    })
};

export const handler = async (argv: Arguments<GetProductsCommandArgs>): Promise<void> => {
    if (argv.keyword == null && argv.productIds == null) {
        console.log(chalk.red('Either keyword or productIds must be provided.'))
        return;
    }

    const config = await getConfig(argv.vendor);

    if (config === undefined) {
        return;
    }

    const api = await getCommerceAPI(config);

    await asyncMethodTester(api.getProducts.bind(api), `getProducts (${argv.vendor})`, argv);
};
