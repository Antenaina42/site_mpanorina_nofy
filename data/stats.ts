export interface Stat {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
}

export const stats: Stat[] = [
  {
    value: 50,
    suffix: '',
    prefix: '+',
    label: 'PROJETS RÉALISÉS',
  },
  {
    value: 10,
    suffix: '',
    prefix: '+',
    label: "ANNÉES D'EXPÉRIENCE",
  },
  {
    value: 100,
    suffix: '%',
    prefix: '',
    label: 'ENGAGEMENT QUALITÉ',
  },
  {
    value: 45,
    suffix: '',
    prefix: '+',
    label: 'CLIENTS SATISFAITS',
  },
];
