# dc-integration-tester

This tool is useful for testing integrations with dc-demostore-integration and the credentials for them. Integrations are located at `./integrations.json` or `$HOME/.amplience/integrations.json` and should contain a JSON object with keys for each vendor configuration.

## Use
- `nvm use`
- `npm i`
- `npm run build`
- `npm link`
- `dc-integration-tester <arguments>`
  - Just run `dc-integration-tester` to get a list of commands. Use `--help` to get help with any command.

## Development

When using this tool to aid in the development of demostore integrations, do the following:

- `nvm use`
- `npm i`
- `npm i .../dc-demostore-integration`
  - ...or whatever the local path is to the dc-demostore-integration.
  - Whenever you make any changes to the demostore integrations, make sure you `npm run build` on that project.
- `npm run dev -- <arguments>`
  - Run a command without building and linking.