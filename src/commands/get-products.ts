import { getCommerceAPI, CommonArgs, GetProductsArgs, Category } from '@amplience/dc-integration-middleware';
import { Argv, Arguments, Options } from 'yargs';
import asyncMethodTester from '../common/async-method-tester';
import getConfig, { ConfigArgs } from '../common/config';
import { commonCommandOptions, paginationCommandOptions } from '../common/command-options';
import chalk from 'chalk'

export const command = 'get-products <vendor>';

export const desc = 'Gets a products from the given vendor';

/**
 * Arguments for get-products command.
 */
type GetProductsCommandArgs = CommonArgs & GetProductsArgs & ConfigArgs & { categoryId?: string }

export const getProductsCommandOptions = {
    ...commonCommandOptions,
    productIds: { type: 'string', description: 'Comma separated IDs for products to fetch.' } as Options,
    keyword: { type: 'string', description: 'Keyword to search for products.' } as Options,
    categoryId: { type: 'string', description: 'Category ID to find products by.' } as Options,
    ...paginationCommandOptions
}

/**
 * Command builder for get-products.
 * @param yargs Arguments
 */
export const builder = (yargs: Argv): void => {
  yargs
    .options(getProductsCommandOptions)
    .positional('vendor', {
        type: 'string',
        description: 'Vendor to use. Credentials must be available in the configuration file.'
    })
};

/**
 * Get Products from the specified vendor.
 * @param argv Command arguments
 * @returns Void when completed
 */
export const handler = async (argv: Arguments<GetProductsCommandArgs>): Promise<void> => {
    if (argv.keyword == null && argv.productIds == null && argv.categoryId == null) {
        console.log(chalk.red('Either keyword or productIds must be provided.'))
        return;
    }

    if (argv.categoryId != null) {
        argv.category = { id: argv.categoryId } as Category
    }

    const config = await getConfig(argv.vendor);

    if (config === undefined) {
        return;
    }

    const api = await getCommerceAPI(config);

    await asyncMethodTester(api.getProducts.bind(api), `getProducts (${argv.vendor})`, argv);
};
