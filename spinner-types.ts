export interface Spinner {
  interval: number;
  frames: string[];
}

export const SpinnerTypes = {
  windows: {
    interval: 80,
    frames: ["/", "-", "\\", "|"],
  },
  dots: {
    interval: 80,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  },
  arc: {
    interval: 100,
    frames: ["◜", "◠", "◝", "◞", "◡", "◟"],
  },
};
