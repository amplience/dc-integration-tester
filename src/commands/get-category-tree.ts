import { getCommerceAPI, CommonArgs } from '@amplience/dc-demostore-integration';
import { Argv, Arguments } from 'yargs';
import asyncMethodTester from '../common/async-method-tester';
import getConfig, { ConfigArgs } from '../common/config';
import { commonCommandOptions } from '../common/command-options';

export const command = 'get-category-tree <vendor>';

export const desc = 'Gets the category tree from the given vendor';

/**
 * TODO
 */
type GetCategoryTreeArgs = CommonArgs & ConfigArgs

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
};

/**
 * TODO
 * @param argv 
 * @returns 
 */
export const handler = async (argv: Arguments<GetCategoryTreeArgs>): Promise<void> => {
    const config = await getConfig(argv.vendor);

    if (config === undefined) {
        return;
    }

    const api = await getCommerceAPI(config);

    await asyncMethodTester(api.getCategoryTree.bind(api), `getCategoryTree (${argv.vendor})`, argv);
};