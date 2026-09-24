export type Plan = {
  id: string;
  name: string;
  speed: number;
  twelveMonths: number;
  eighteenMonths: number;
  twentyFourMonths: number;
  description: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: 'unlimited-50',
    name: '50 Mbps Unlimited',
    speed: 50,
    twelveMonths: 5500,
    eighteenMonths: 7500,
    twentyFourMonths: 10000,
    description: 'Reliable unlimited internet for browsing, learning, streaming and everyday home use.',
    features: ['Unlimited data', 'Fiber connection', '24/7 support']
  },
  {
    id: 'unlimited-75',
    name: '75 Mbps Unlimited',
    speed: 75,
    twelveMonths: 6250,
    eighteenMonths: 8250,
    twentyFourMonths: 10850,
    description: 'Extra speed for connected families, HD streaming, video calls and multiple devices.',
    features: ['Unlimited data', 'Fiber connection', '24/7 support']
  },
  {
    id: 'unlimited-100',
    name: '100 Mbps Unlimited',
    speed: 100,
    twelveMonths: 7500,
    eighteenMonths: 9500,
    twentyFourMonths: 13500,
    description: 'High-performance unlimited connectivity for demanding work, gaming and entertainment.',
    features: ['Unlimited data', 'Fiber connection', '24/7 support']
  }
];
