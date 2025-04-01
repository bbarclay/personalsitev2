export const MAX_STEPS = 1000;
export const DEFAULT_STARTING_NUMBER = 27;
export const VISUALIZATION_INTERVAL = 2000; // 2 seconds default
export const ANIMATION_DURATION = 1000;
export const MAX_CIRCLES = 10;

export const SPEED_OPTIONS = [
  { label: '0.25x', value: 4000 },
  { label: '0.5x', value: 2000 },
  { label: '1x', value: 1000 },
  { label: '2x', value: 500 },
  { label: '4x', value: 250 },
] as const;

export function randomTauSet() {
  const arr = [];
  for (let i = 0; i < MAX_CIRCLES; i++) {
    const rand = Math.random();
    if (rand < 0.5) arr.push(1);
    else if (rand < 0.75) arr.push(2);
    else if (rand < 0.87) arr.push(3);
    else if (rand < 0.94) arr.push(4);
    else if (rand < 0.98) arr.push(5);
    else arr.push(6);
  }
  return arr;
}
