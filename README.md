# dc-integration-tester

This tool is useful for testing integrations with dc-demostore-integration and the credentials for them. Integrations are located at `./integrations.json` or `$HOME/.amplience/integrations.json` and should contain a JSON object with keys for each vendor configuration.

```json
{
    "commercetools": {
        "vendor": "commercetools",
        "project": "-",
        "client_id": "-",
        "client_secret": "-",
        "auth_url": "https://auth.europe-west1.gcp.commercetools.com/oauth/token",
        "api_url": "https://api.europe-west1.gcp.commercetools.com",
        "scope": "-"
    },

    "sfcc": {
        "vendor": "sfcc",
        "api_url": "-",
        "auth_url": "https://account.demandware.com/dwsso/oauth2/access_token",
        "client_id": "-",
        "client_secret": "-",
        "site_id": "-"
    }
}
```

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