# Slot game

Back-end logic for a simple slot game, written in TypeScript with an object-oriented structure.

The game has 5 reels with 3 visible rows (a 3x5 screen) and 5 paylines. One spin picks a random stop position on every reel, builds the screen, finds the winning lines and calculates the payout.

## How to run

Install [Bun](https://bun.com), then:

```bash
bun i
```

Run one spin and a simulation:

```bash
bun start -- <spins> <bet per line>
```

Both arguments are optional (default: `1` spin, bet `1`):

```bash
bun start --                # 1 spin, bet 1 per line
bun start -- 1000000        # 1,000,000 spins, bet 1 per line
bun strat -- 1000000 2      # 1,000,000 spins, bet 2 per line
```

Run the tests:

```bash
bun test
```

## What the program prints

1. **One spin**: bet per line and total bet, reel positions, the screen, the winning lines and the total win.
2. **Simulation**: the given number of spins with total bet, total win, RTP, execution time and speed (spins per second).

Example output of a spin:

```
Bet per line: 1 | Total bet: 5
Reel positions: 138, 58, 57, 138, 51
Screen:
  1 | 5 | 1 | 6 | 6
  1 | 5 | 1 | 6 | 2
  8 | 1 | 2 | 2 | 2
Lines payout:
Line 5: 3 * symbol 1 = 10
Total win: 10
```

## Project structure

```
index.ts                     entry point: one spin + simulation
src/
  config/configuration.ts    reels, paytable and paylines
  models/
    Slot.ts                  Slot class with the spin(bet) method
    Reel.ts                  one reel: random stop and visible symbols
    WinChecker.ts            finds the winning lines and their payout
  types/index.ts             shared interfaces (GameConfig, SpinResult, LineWin)
utils/
  printResult.ts             prints one spin result to the console
  simulate.ts                runs many spins and prints the totals
tests/                       unit and integration tests (bun test)
```

## Game rules

- **Reel**: a long strip of symbols (1-9). A spin stops at a random position and shows that symbol and the next ones. The strip wraps around at the end.
- **Paylines**: each line says which row to use on every reel (0 = top, 1 = middle, 2 = bottom), e.g. `[0, 1, 0, 1, 0]` is a zigzag.
- **Win**: the same symbol repeated on a line, starting from the first reel. At least 3 in a row are needed.
- **Payout**: `paytable[symbol][count - 1] * bet per line`. For example symbol 3 pays 30 for three in a row, so with a bet of 2 the line pays 60.
- **Total bet**: bet per line x number of lines (5).
- **RTP** (return to player): total win / total bet, shown in the simulation.


