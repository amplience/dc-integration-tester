import { Options } from 'yargs';

export const commonCommandOptions = {
    locale: { type: 'string' } as Options,
    language: { type: 'string' } as Options,
    country: { type: 'string' } as Options,
    currency: { type: 'string' } as Options,
    segment: { type: 'string' } as Options,

    out: { type: 'string', description: 'Optional file path to write the API response to.' } as Options
};