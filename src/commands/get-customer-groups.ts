import { getCommerceAPI, CommonArgs, GetCommerceObjectArgs } from '@amplience/dc-integration-middleware';
import { Argv, Arguments } from 'yargs';
import asyncMethodTester from '../common/async-method-tester';
import getConfig, { ConfigArgs } from '../common/config';
import { commonCommandOptions } from '../common/command-options';

export const command = 'get-customer-groups <vendor>';

export const desc = 'Gets customer groups from the given vendor';

/**
 * Arguments for get-customer-groups command.
 */
type GetCustomerGroupsArgs = CommonArgs & ConfigArgs

/**
 * Command builder for get-customer-groups.
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
 * Get Customer Groups from the specified vendor.
 * @param argv Command arguments
 * @returns Void when completed
 */
export const handler = async (argv: Arguments<GetCustomerGroupsArgs>): Promise<void> => {
    const config = await getConfig(argv.vendor);

    if (config === undefined) {
        return;
    }

    const api = await getCommerceAPI(config);

    await asyncMethodTester(api.getCustomerGroups.bind(api), `getCustomerGroups (${argv.vendor})`, argv);
};
