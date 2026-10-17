export class Reel {
  constructor(private strip: number[]) {}

  spin(): number {
    return Math.floor(Math.random() * this.strip.length);
  }

  getSymbols(position: number, rows: number): number[] {
    const symbols: number[] = [];
    for (let i = 0; i < rows; i++) {
      symbols.push(this.strip[(position + i) % this.strip.length]);
    }
    return symbols;
  }
}
