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
  readonly id: number | null;
  name: string;
  middleName: string;
  lastName: string;
  age: number;
  phone: string;
  email: string;
  address: string;

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
  getCopy: () => Patient;
}

export default class Patient implements PatientInterface {
  readonly id: number | null;
  public name: string;
  public middleName: string;
  public lastName: string;
  public age: number;
  public phone: string;
  public email: string;
  public address: string;

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

  getCopy() {
    return new Patient(this.id, this.name, this.middleName, this.lastName, this.age, this.phone, this.email, this.address);
  }
}
