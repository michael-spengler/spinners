# Terminal Spinners

## Usage Examples

### Basic
```ts

import { TerminalSpinner } from "https://deno.land/x/spinners/mod.ts";
import { sleep } from "https://x.nest.land/sleep@1.0.0/mod.ts";

const terminalSpinner = new TerminalSpinner("I will be back in about 3 seconds");

terminalSpinner.start();
await sleep(3) // or any other async action that'll take some time
terminalSpinner.succeed("Action completed");

```

### Advanced
```ts

import { TerminalSpinner, SpinnerTypes } from "https://deno.land/x/spinners/mod.ts";
import { sleep } from "https://x.nest.land/sleep@1.0.0/mod.ts";

const terminalSpinner = new TerminalSpinner({
	text: "I will be back in about 3 seconds", // telling the user what is going on
	color: "red", // see colors in util.ts
	spinner: SpinnerTypes.arc, // check the SpinnerTypes - see import
	indent: 0, // The level of indentation of the spinner in spaces
	cursor: false, // Whether or not to display a cursor when the spinner is active
	writer: Deno.stdout // anything using the Writer interface incl. stdout, stderr, and files
});

terminalSpinner.start();
await sleep(3) // or any other async action that'll take some time
terminalSpinner.succeed("Action completed");

```

## Further Options

You can also update the parameters while spinning etc. :) 
Check the code for details - it should be self explaining.


## Trigger Usage Examples

```sh
deno run https://deno.land/x/spinners/usage-example-basic.ts
```

```sh
deno run https://deno.land/x/spinners/usage-example-advanced.ts
```

## Trigger Test Execution

```sh

deno test https://deno.land/x/spinners/test.ts
  
```


## Credits 
Credits to https://deno.land/x/kia as a lot of its MIT code is just used in this module.

