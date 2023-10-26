import { faker } from '@faker-js/faker';

export type DataKelas = {
  nim: string;
  nama: string;
  status: number;
  konfirmasi: boolean;
};

export type DataKompen = {
  nama: string;
  nim: string;
  alpa: number;
  izin: number;
  sakit: number;
  jumlah: number;
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

const newKompen = (): DataKompen => {
  return {
    nama: faker.person.fullName(),
    nim: '3202116025',
    alpa: faker.number.int({ min: 1, max: 20 }),
    izin: faker.number.int({ min: 1, max: 20 }),
    sakit: faker.number.int({ min: 1, max: 20 }),
    jumlah: faker.number.int({ min: 10, max: 60 }),
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

export function makeKompen(...lens: number[]) {
  const makeDataLevel = (depth = 0): DataKompen[] => {
    const len = lens[depth]!;
    return range(len).map((d): DataKompen => {
      return {
        ...newKompen(),
      };
    });
  };
  return makeDataLevel();
}
