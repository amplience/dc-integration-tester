import { getCommerceAPI, CommonArgs, GetCommerceObjectArgs } from '@amplience/dc-demostore-integration';
import { Argv, Arguments } from 'yargs';
import asyncMethodTester from '../common/async-method-tester';
import getConfig, { ConfigArgs } from '../common/config';
import { commonCommandOptions } from '../common/command-options';

export const command = 'get-product <vendor> <id>';

export const desc = 'Gets a product from the given vendor';

/**
 * TODO
 */
type GetProductArgs = CommonArgs & GetCommerceObjectArgs & ConfigArgs

/**
 * TODO
 * @param yargs 
 */
export const builder = (yargs: Argv): void => {
  yargs
    .options(commonCommandOptions)
    .positional('vendor', {
        type: 'string',
        description: 'Vendor to use. Credentials must be available in the configuration file.'
    })
    .positional('id', {
        type: 'string',
        description: 'ID for the product to be fetched'
    })
};

/**
 * TODO
 * @param argv 
 * @returns 
 */
export const handler = async (argv: Arguments<GetProductArgs>): Promise<void> => {
    const config = await getConfig(argv.vendor);

    if (config === undefined) {
        return;
    }

    const api = await getCommerceAPI(config);

    await asyncMethodTester(api.getProduct.bind(api), `getProduct (${argv.vendor})`, argv);
};
