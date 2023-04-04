import { getCommerceAPI, CommonArgs } from '@amplience/dc-integration-middleware';
import { Argv, Arguments } from 'yargs';
import asyncMethodTester from '../common/async-method-tester';
import getConfig, { ConfigArgs } from '../common/config';
import { commonCommandOptions } from '../common/command-options';

export const command = 'get-category-tree <vendor>';

export const desc = 'Gets the category tree from the given vendor';

/**
 * Arguments for get-category-tree command.
 */
type GetCategoryTreeArgs = CommonArgs & ConfigArgs

/**
 * Command builder for get-category-tree.
 * @param yargs Arguments
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
 * Get Category Tree from the specified vendor.
 * @param argv Command arguments
 * @returns Void when completed
 */
export const handler = async (argv: Arguments<GetCategoryTreeArgs>): Promise<void> => {
    const config = await getConfig(argv.vendor);

    if (config === undefined) {
        return;
    }

    const api = await getCommerceAPI(config);

    await asyncMethodTester(api.getCategoryTree.bind(api), `getCategoryTree (${argv.vendor})`, argv);
};
