import { TerminalSpinner } from "https://deno.land/spinners@1.3.0/mod.ts";
import { assertThrows } from "https://deno.land/std@0.51.0/testing/asserts.ts";
import { expect } from "https://deno.land/x/expect/mod.ts";
import { sleep } from "https://x.nest.land/sleep@1.0.0/mod.ts";

class TestWriter implements Deno.WriterSync {
	buffer: string[] = [];
	writeSync(p: Uint8Array): number {
		this.buffer.push(new TextDecoder().decode(p));
		return p.length;
	}
}

Deno.test("spinner isSpinning when running", () => {
	const terminalSpinner = new TerminalSpinner();
	terminalSpinner.start();
	expect(terminalSpinner.isSpinning()).toEqual(true);
	terminalSpinner.stop();
});

Deno.test("spinner !isSpinning when not running", () => {
	const terminalSpinner = new TerminalSpinner().start();
	terminalSpinner.stop();
	expect(terminalSpinner.isSpinning()).toEqual(false);
});

Deno.test("stopAndPersist stops the spinner output", async () => {
	const testWriter = new TestWriter();
	const terminalSpinner = new TerminalSpinner({ text: "", writer: testWriter }).start();
	terminalSpinner?.stopAndPersist();

	// Wait and check that there are no extra prints
	const sizeAfterStop = testWriter.buffer.length;
	await sleep(1000);
	expect(terminalSpinner?.isSpinning()).toEqual(false);
	expect(sizeAfterStop).toEqual(testWriter.buffer.length);
});

Deno.test("renderNextFrame() advances the spinner", () => {
	const testWriter = new TestWriter();
	const terminalSpinner = new TerminalSpinner({
		text: "",
		writer: testWriter,
	}).start();
	terminalSpinner.stopAndPersist();

	const sizeAfterStop = testWriter.buffer.length;
	terminalSpinner.renderNextFrame();

	// Check that the frame is advancing
	const sizeAfterNextStop = testWriter.buffer.length;
	expect(sizeAfterStop).toBeLessThan(sizeAfterNextStop);

	// Check that each frame is only advancing once
	terminalSpinner.renderNextFrame();
	expect(sizeAfterNextStop - sizeAfterStop).toEqual(
		testWriter.buffer.length - sizeAfterNextStop
	);
});

Deno.test("check renderNextFrame can't be called if spinner is running", () => {
	const terminalSpinner = new TerminalSpinner().start();
	assertThrows(() => {
		terminalSpinner.renderNextFrame();
	}, Error);
	terminalSpinner.stop();
});

Deno.test("set() changes the terminalSpinner options", () => {
	const testWriter = new TestWriter();
	const SEARCH_KEY = "XXX";

	const terminalSpinner = new TerminalSpinner({
		text: "sample",
		writer: testWriter,
	}).start();

	// Change the text to the search key and then check if it has actually changed
	terminalSpinner.stopAndPersist();
	terminalSpinner.set({ text: SEARCH_KEY });
	terminalSpinner.renderNextFrame();

	let inArray = false;
	testWriter.buffer.forEach((item) => {
		if (item.includes(SEARCH_KEY)) {
			inArray = true;
		}
	});

	expect(inArray).toBe(true);
});
