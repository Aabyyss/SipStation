import { products } from './products';

const descriptions = {
  'Soft Drinks': 'Classics with a cold, crisp pop.',
  'Energy Drinks': 'Focused energy for the late-night shift.',
  'Coffee & Canned Coffee': 'Barista-inspired, ready when you are.',
  Juices: 'Bright fruit flavour in every bottle.',
  Water: 'Still, sparkling and simply refreshing.',
  'Sports Drinks': 'Hydration built for your pace.',
  'Iced Tea': 'Cool tea, long conversations.',
  'Flavored & Dairy Drinks': 'Comfort in every chilled sip.'
};

export const categories = Object.keys(descriptions).map((name) => ({
  name,
  description: descriptions[name],
  image: products.find((product) => product.category === name)?.image
}));
