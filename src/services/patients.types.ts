export class PatientClass {
  // private id: number | null;
  private name: string;
  private middleName: string;
  private lastName: string;
  private age: number;
  private phone: string;
  private mail: string;
  private address: string;

  constructor (data: PatientPrototype) {
    // this.id = data.id;
    this.name = data.name;
    this.middleName = data.middleName;
    this.lastName = data.lastName;
    this.age = data.age;
    this.phone = data.phone;
    this.mail = data.mail;
    this.address = data.address;
  }

  public static validateName(name: string): boolean {
    return /^[a-zá-ú][a-zá-ú ]+$/gi.test(name);
  }

  public static validateMiddleName(middleName: string): boolean {
    return /^[a-zá-ú ]*$/gi.test(middleName);
  }

  public static validateLastName(name: string): boolean {
    return /^[a-zá-ú][a-zá-ú ]+$/gi.test(name);
  }

  public static validateAge(age: string | number): boolean {
    if (typeof age === 'string') {
      age = Number(age);
    }
    return age >= 0 && age < 150;
  }

  public static validatePhone(phone: string): boolean {
    return /\+{0,1}[\d\-]+$/g.test(phone);
  }

  public static validateMail(mail: string): boolean {
    return mail.includes('@') && mail.includes('.');
  }

  public static validateAddress(address: string): boolean {
    return address !== '';
  }

  public isValid(): boolean {
    return (
      PatientClass.validateName(this.name) &&
      PatientClass.validateMiddleName(this.middleName) &&
      PatientClass.validateLastName(this.lastName) &&
      PatientClass.validateAge(this.age) &&
      PatientClass.validatePhone(this.phone) &&
      PatientClass.validateMail(this.mail) &&
      PatientClass.validateAddress(this.address)
    )
  }

  public fullName(): string {
    return [this.name, this.middleName, this.lastName]
      .filter(s => !!s)
      .join(' ');
  }

  public data(): PatientPrototype {
    return {
      // id: this.id,
      name: this.name,
      middleName: this.middleName,
      lastName: this.lastName,
      age: this.age,
      phone: this.phone,
      mail: this.mail,
      address: this.address,
    }
  }
}

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

export type PatientPrototypeKeys = keyof PatientPrototype;

export type PatientList = Patient[];
