export let count = 0;

export function increment() {
  count++;
  return count;
}

export function reset() {
  count = 0;
  return count;
}

export function getCount() {
  return count; 
}