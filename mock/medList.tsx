export type Med = {
  name: string;
  desc: string;
  number: number; //number of pills to take
  id: number;
};

const medList: Med[] = [
  { name: 'Vitamin C', desc: 'Eat one after each meal', number: 3, id: 0 },
  { name: 'Vitamin B12', desc: 'Eat two after each meal', number: 6, id: 1 },
  { name: 'Vitamin B4', desc: 'Eat after each meal', number: 3, id: 2 },
  { name: 'Vitamin E', desc: 'Eat after each meal', number: 3, id: 3 },
  { name: 'Vitamin C', desc: 'Eat one after each meal', number: 3, id: 4 },
  { name: 'Vitamin B12', desc: 'Eat two after each meal', number: 6, id: 5 },
  { name: 'Vitamin B4', desc: 'Eat after each meal', number: 3, id: 6 },
  { name: 'Vitamin E', desc: 'Eat after each meal', number: 3, id: 7 },
  { name: 'Vitamin C', desc: 'Eat one after each meal', number: 3, id: 8 },
  { name: 'Vitamin B12', desc: 'Eat two after each meal', number: 6, id: 9 },
  { name: 'Vitamin B4', desc: 'Eat after each meal', number: 3, id: 10 },
  { name: 'Vitamin E', desc: 'Eat after each meal', number: 3, id: 11 },
];

export default medList;
