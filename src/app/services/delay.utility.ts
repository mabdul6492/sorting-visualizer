
export function delay(ms: number): Promise<void> {
    ms = 1000 - ms;
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
