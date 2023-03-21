
import { stat, readFile } from 'fs/promises';
import { join } from 'path'
import chalk from 'chalk'

const configName = 'integrations.json';

/**
 * TODO
 */
export type ConfigArgs = {
    vendor: string;
    out?: string;
};

/**
 * TODO
 * @param vendor 
 * @param config 
 * @returns 
 */
function getVendorConfig(vendor: string, config: any): any {
    const vendorConfig = config[vendor];

    if (vendorConfig === undefined) {
        console.log(chalk.red(`Configuration object missing for the vendor ${vendor}. Make sure it appears in ${configName}.`));
    }

    return vendorConfig;
}

/**
 * TODO
 */
export default async function getConfig(vendor: string): Promise<object | undefined> {
    // Try find a config file in a relative path, otherwise try in the .amplience folder.

    let exists = false;
    try {
        exists = (await stat(configName)).isFile();
    } catch {}

    if (exists) {
        return getVendorConfig(vendor, JSON.parse(await readFile(configName, {encoding: 'utf8'})));
    }

    const globalName = join(process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'] || __dirname, '.amplience', configName);

    let globalExists = false;
    try {
        globalExists = (await stat(globalName)).isFile();
    } catch {}

    if (globalExists) {
        return getVendorConfig(vendor, JSON.parse(await readFile(globalName, {encoding: 'utf8'})));
    }

    console.log(chalk.red(`${configName} is missing. Either create it in the current directory, or in ${globalName}`));
    return undefined;
}
