import { Options } from 'yargs';

// Options shared between all commands.
export const commonCommandOptions = {
    locale: { type: 'string' } as Options,
    language: { type: 'string' } as Options,
    country: { type: 'string' } as Options,
    currency: { type: 'string' } as Options,
    segment: { type: 'string' } as Options,

    out: { type: 'string', description: 'Optional file path to write the API response to.' } as Options
};

// Options shared between pagination capable commands.
export const paginationCommandOptions = {
    pageNum: { type: 'number', description: '(Pagination) Page number' } as Options,
    pageSize: { type: 'number', description: '(Pagination) Page size in items' } as Options,
    pageCount: { type: 'number', description: '(Pagination) Number of pages to fetch. By default, fetches as many as possible' } as Options,
    cursor: { type: 'string', description: '(Pagination) Optional cursor from a previous request' } as Options,
    cursorPage: { type: 'number', description: '(Pagination) Page number associated with the cursor' } as Options,
}