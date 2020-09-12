import { sleep } from "https://x.nest.land/sleep@1.0.0/mod.ts";
import {TerminalSpinner, Spinners} from "https://x.nest.land/spinners@1.0.0/mod.ts";

const terminalSpinner = new TerminalSpinner({
	text: "I will be back in about 3 seconds", // telling the user what is going on
	color: "red", // '"black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | undefined'
	spinner: Spinners.arc, // check the file - see import
	indent: 0, // The level of indentation of the spinner in spaces
	cursor: false, // Whether or not to display a cursor when the spinner is active
	writer: Deno.stdout // This can be anything that uses the Writer interface including stdout, stderr, and files
});

terminalSpinner.start();
await sleep(3) // or any other async action that'll take some time
terminalSpinner.succeed("Action completed");