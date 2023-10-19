import { faker } from '@faker-js/faker';

export type DataKelas = {
  nim: string;
  nama: string;
  status: number;
  konfirmasi: boolean;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newKelas = (): DataKelas => {
  return {
    nim: '3202116023',
    nama: faker.person.fullName(),
    status: faker.number.int({ min: 1, max: 4 }),
    konfirmasi: faker.datatype.boolean({ probability: 0.25 }),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): DataKelas[] => {
    const len = lens[depth]!;
    return range(len).map((d): DataKelas => {
      return {
        ...newKelas(),
      };
    });
  };

  return makeDataLevel();
}
