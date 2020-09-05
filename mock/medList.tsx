export type Med = {
  name: string;
  desc: string;
  number: number;
};

const medList: Med[] = [
  { name: 'Vitamin C', desc: 'Eat one after each meal', number: 3 },
  { name: 'Vitamin B12', desc: 'Eat two after each meal', number: 6 },
  { name: 'Vitamin B4', desc: 'Eat after each meal', number: 3 },
  { name: 'Vitamin E', desc: 'Eat after each meal', number: 3 },
  { name: 'Vitamin D', desc: 'Eat after each meal', number: 3 },
  { name: 'Calcium', desc: 'Eat after each meal', number: 3 },
];

export default medList;
