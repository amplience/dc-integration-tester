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

-   `nvm use`
-   `npm i`
-   `npm run build`
-   `npm link`
-   `dc-integration-tester <arguments>`
    -   Just run `dc-integration-tester` to get a list of commands. Use `--help` to get help with any command.

## Development

When using this tool to aid in the development of demostore integrations, do the following:

-   `nvm use`
-   `npm i`
-   `npm i .../dc-demostore-integration`
    -   ...or whatever the local path is to the dc-demostore-integration.
    -   Whenever you make any changes to the demostore integrations, make sure you `npm run build` on that project.
-   `npm run dev -- <arguments>`
    -   Run a command without building and linking.

## License

This software is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),

Copyright 2023 Amplience

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
