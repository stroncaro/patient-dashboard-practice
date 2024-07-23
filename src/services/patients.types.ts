export type PatientPrototype = {
  name: string;
  middleName: string;
  lastName: string;
  age: number;
  phone: string;
  mail: string;
  address: string;
}

export type Patient = PatientPrototype & {
  id: number;
};

export type PatientList = Patient[];
