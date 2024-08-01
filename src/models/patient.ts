export type PatientRecord = {
  id: number | null;
  name: string;
  middleName: string;
  lastName: string;
  age: number;
  phone: string;
  email: string;
  address: string;
}

export type PatientList = Patient[];

interface PatientInterface {
  getId: () => number | null;
  getName: () => string;
  getMiddleName: () => string;
  getLastName: () => string;
  getAge: () => number;
  getPhone: () => string;
  getEmail: () => string;
  getAddress: () => string;

  setName: (name: string) => Patient;
  setMiddleName: (middleName: string) => Patient;
  setLastName: (lastName: string) => Patient;
  setAge: (age: number) => Patient;
  setPhone: (phone: string) => Patient;
  setEmail: (email: string) => Patient;
  setAddress: (address: string) => Patient;

  validateId: () => boolean;
  validateName: () => boolean;
  validateMiddleName: () => boolean;
  validateLastName: () => boolean;
  validateAge: () => boolean;
  validatePhone: () => boolean;
  validateEmail: () => boolean;
  validateAddress: () => boolean;
  isValid: () => boolean;

  getFullName: () => string;
  getRecord: () => PatientRecord;
}

export default class Patient implements PatientInterface {
  private readonly id: number | null;
  private readonly name: string;
  private readonly middleName: string;
  private readonly lastName: string;
  private readonly age: number;
  private readonly phone: string;
  private readonly email: string;
  private readonly address: string;

  private constructor (id: number | null, name: string, middleName: string, lastName: string, age: number, phone: string, email: string, address: string) {
    this.id = id;
    this.name = name;
    this.middleName = middleName;
    this.lastName = lastName;
    this.age = age;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }

  getId() { return this.id };
  getName() { return this.name }
  getMiddleName() { return this.middleName }
  getLastName() { return this.lastName }
  getAge() { return this.age }
  getPhone() { return this.phone }
  getEmail() { return this.email }
  getAddress() { return this.address }

  setName(name: string) {
    const record = this.getRecord();
    record.name = name;
    return Patient.fromRecord(record);
  };
  setMiddleName(middleName: string) {
    const record = this.getRecord();
    record.middleName = middleName;
    return Patient.fromRecord(record);
  }
  setLastName(lastName: string) {
    const record = this.getRecord();
    record.lastName = lastName;
    return Patient.fromRecord(record);
  }
  setAge(age: number) {
    const record = this.getRecord();
    record.age = age;
    return Patient.fromRecord(record);
  }
  setPhone(phone: string) {
    const record = this.getRecord();
    record.phone = phone;
    return Patient.fromRecord(record);
  }
  setEmail(email: string) {
    const record = this.getRecord();
    record.email = email;
    return Patient.fromRecord(record);
  }
  setAddress(address: string) {
    const record = this.getRecord();
    record.address = address;
    return Patient.fromRecord(record);
  }
  
  validateId() {
    return this.id === null || this.id >= 0;
  }
  validateName() {
    return /^[a-zá-ú][a-zá-ú ]+$/gi.test(this.name);
  }
  validateMiddleName() {
    return /^[a-zá-ú ]*$/gi.test(this.middleName);
  }
  validateLastName() {
    return /^[a-zá-ú][a-zá-ú ]+$/gi.test(this.lastName);
  }
  validateAge() {
    return !Number.isNaN(this.age) && Number.isInteger(this.age) && this.age >= 0 && this.age < 150;
  }
  validatePhone() {
    return /\+{0,1}[\d\-]+$/g.test(this.phone);
  }
  validateEmail() {
    return this.email.includes('@') && this.email.includes('.');
  }
  validateAddress() {
    return this.address !== '';
  }
  isValid() {
    return (
      this.validateId()
      && this.validateName()
      && this.validateMiddleName()
      && this.validateLastName()
      && this.validateAge()
      && this.validateEmail()
      && this.validateAddress()
    )
  }
  
  getFullName() {
    return `${this.lastName}, ${this.name} ${this.middleName}`;
  }

  getRecord() {
    return {
      id: this.id,
      name: this.name,
      middleName: this.middleName,
      lastName: this.lastName,
      age: this.age,
      phone: this.phone,
      email: this.email,
      address: this.address,
    }
  }

  public static fromRecord(data: PatientRecord): Patient {
    return new Patient(data.id, data.name, data.middleName, data.lastName, data.age, data.phone, data.email, data.address);
  }
}
