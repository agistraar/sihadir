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

export type DataMingguan = {
  nama: string;
  nim: string;
  hadir: number;
  alpa: number;
  izin: number;
  sakit: number;
  total: number;
};

export type DataPresensiMingguan = {
  hari: string;
  hadir: number;
  alpa: number;
  izin: number;
  sakit: number;
  total: number;
  status: number;
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

const newMingguan = (): DataMingguan => {
  return {
    nama: faker.person.fullName(),
    nim: '3202116030',
    hadir: faker.number.int({ min: 1, max: 20 }),
    alpa: faker.number.int({ min: 1, max: 20 }),
    izin: faker.number.int({ min: 1, max: 20 }),
    sakit: faker.number.int({ min: 1, max: 20 }),
    total: faker.number.int({ min: 10, max: 60 }),
  };
};

const newPresensiMingguan = (): DataPresensiMingguan => {
  return {
    hari: faker.date.weekday(),
    hadir: faker.number.int({ min: 1, max: 20 }),
    alpa: faker.number.int({ min: 1, max: 20 }),
    izin: faker.number.int({ min: 1, max: 20 }),
    sakit: faker.number.int({ min: 1, max: 20 }),
    total: 8,
    status: faker.number.int({ min: 0, max: 4 }),
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

export function makeMingguan(...lens: number[]) {
  const makeDataLevel = (depth = 0): DataMingguan[] => {
    const len = lens[depth]!;
    return range(len).map((d): DataMingguan => {
      return {
        ...newMingguan(),
      };
    });
  };
  return makeDataLevel();
}

export function makePresensiMingguan(...lens: number[]) {
  const makeDataLevel = (depth = 0): DataPresensiMingguan[] => {
    const len = lens[depth]!;
    return range(len).map((d): DataPresensiMingguan => {
      return {
        ...newPresensiMingguan(),
      };
    });
  };
  return makeDataLevel();
}
