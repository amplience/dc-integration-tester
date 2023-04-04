import { getCommerceAPI, CommonArgs, GetCommerceObjectArgs } from '@amplience/dc-integration-middleware';
import { Argv, Arguments } from 'yargs';
import asyncMethodTester from '../common/async-method-tester';
import getConfig, { ConfigArgs } from '../common/config';
import { commonCommandOptions } from '../common/command-options';

export const command = 'get-category <vendor> <slug>';

export const desc = 'Gets a category from the given vendor';

/**
 * Arguments for get-category command.
 */
type GetCategoryArgs = CommonArgs & GetCommerceObjectArgs & ConfigArgs

/**
 * Command builder for get-category.
 * @param yargs Arguments
 */
export const builder = (yargs: Argv): void => {
  yargs
    .options(commonCommandOptions)
    .positional('vendor', {
        type: 'string',
        description: 'Vendor to use. Credentials must be available in the configuration file.'
    })
    .positional('slug', {
        type: 'string',
        description: 'Slug for the category to be fetched'
    })
};

/**
 * Get a category from the specified vendor.
 * @param argv Command arguments
 * @returns Void when completed
 */
export const handler = async (argv: Arguments<GetCategoryArgs>): Promise<void> => {
    const config = await getConfig(argv.vendor);

    if (config === undefined) {
        return;
    }

    const api = await getCommerceAPI(config);

    await asyncMethodTester(api.getCategory.bind(api), `getCategory (${argv.vendor})`, argv);
};
