import { TerminalSpinner } from "https://deno.land/spinners@1.3.0/mod.ts";
import { sleep } from "https://x.nest.land/sleep@1.0.0/mod.ts";

const terminalSpinner = new TerminalSpinner("I will be back in about 3 seconds");

terminalSpinner.start();
await sleep(3) // or any other async action that'll take some time
terminalSpinner.succeed("Action completed");