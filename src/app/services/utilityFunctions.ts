import { ArrayWithColor } from '../interface';

export function delay(ms: number): Promise<void> {
  ms = 1000 - ms;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomArray(size: number): ArrayWithColor[] {
  let randomArray: ArrayWithColor[] = [];
  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * 400) + 15;
    randomArray.push({ value: randomNumber, color: 'blue' });
  }
  return randomArray;
}

export function generateUserArray(userArray: string): ArrayWithColor[] {
  let numbers = userArray
    .split(/[,\s]+/)
    .map((value) => value.trim())
    .filter((value) => /^[0-9]+$/.test(value));

  if (numbers.length == 0) numbers = ['10', '20', '30', '40', '50'];
  const tempArray: ArrayWithColor[] = [];
  for (const number of numbers)
    tempArray.push({ value: parseInt(number), color: 'blue' });

  return tempArray;
}
