import Patient, { PatientRecord, PatientList } from "./PatientModel";

const INITIAL_PATIENT_DATA: PatientRecord[] = [
  {
    id: 1,
    name: "Marta",
    middleName: "",
    lastName: "Fiorito",
    age: 53,
    phone: "9999-9999",
    email: "marta@fiorito.com",
    address: "Some Street 1234",
  },
  {
    id: 2,
    name: "Juan",
    middleName: "Alberto",
    lastName: "Perez",
    age: 15,
    phone: "9876-5432",
    email: "capo_el10@yahoo.com",
    address: "Some Other Street 5678",
  },
  {
    id: 3,
    name: "Ana",
    middleName: "Maria",
    lastName: "Lopez",
    age: 42,
    phone: "1234-5678",
    email: "ana.lopez@example.com",
    address: "Avenue 42",
  },
  {
    id: 4,
    name: "Carlos",
    middleName: "",
    lastName: "Gomez",
    age: 29,
    phone: "2345-6789",
    email: "carlos.gomez@example.com",
    address: "Baker Street 221B",
  },
  {
    id: 5,
    name: "Lucia",
    middleName: "Marina",
    lastName: "Martinez",
    age: 36,
    phone: "3456-7890",
    email: "lucia.martinez@example.com",
    address: "Elm Street 10",
  },
  {
    id: 6,
    name: "Fernando",
    middleName: "José",
    lastName: "Cruz",
    age: 61,
    phone: "4567-8901",
    email: "fernando.cruz@example.com",
    address: "Highway 56",
  },
  {
    id: 7,
    name: "Isabella",
    middleName: "Cristina",
    lastName: "Reyes",
    age: 23,
    phone: "5678-9012",
    email: "isabella.reyes@example.com",
    address: "Main Street 100",
  },
  {
    id: 8,
    name: "Sergio",
    middleName: "Antonio",
    lastName: "Torres",
    age: 50,
    phone: "6789-0123",
    email: "sergio.torres@example.com",
    address: "Green Street 45",
  },
  {
    id: 9,
    name: "Valeria",
    middleName: "Elena",
    lastName: "Fernandez",
    age: 31,
    phone: "7890-1234",
    email: "valeria.fernandez@example.com",
    address: "River Road 21",
  },
  {
    id: 10,
    name: "Javier",
    middleName: "",
    lastName: "Alonso",
    age: 28,
    phone: "8901-2345",
    email: "javier.alonso@example.com",
    address: "Oak Street 7",
  },
  {
    id: 11,
    name: "Carmen",
    middleName: "Elena",
    lastName: "Gutierrez",
    age: 45,
    phone: "9012-3456",
    email: "carmen.gutierrez@example.com",
    address: "Sunset Boulevard 5",
  },
];

export interface PatientService {
  getPatients: (limit?: number, skip?: number) => Promise<PatientList>;
  addPatient: (data: PatientRecord) => Promise<number>;
  deletePatient: (id: number) => Promise<boolean>;
  updatePatient: (patient: Patient) => Promise<boolean>;
}

export class MockPatientService implements PatientService {
  private static instance?: MockPatientService;

  private readonly SIMULATED_SERVER_DELAY_MS = 1000;
  private patients: PatientRecord[];
  
  private constructor () {
    this.patients = INITIAL_PATIENT_DATA;
  }
  
  static getInstance(): PatientService {
    MockPatientService.instance ??= new MockPatientService();
    return MockPatientService.instance;
  }
  
  async getPatients(limit: number = 10, skip: number = 0): Promise<PatientList> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const records = this.patients.slice(skip, skip + limit);
        const patients: PatientList = records.map((record) => Patient.fromRecord(record));
        res(patients);
      }, this.SIMULATED_SERVER_DELAY_MS);
    });
  }

  addPatient(data: PatientRecord): Promise<number> {
    throw new Error("Not Implemented");
  }
  deletePatient(id: number): Promise<boolean> {
    throw new Error("Not Implemented");
  }

  async updatePatient(patient: Patient): Promise<boolean> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (!patient.isValid()) {
          rej(new Error("Invalid patient"));
        }

        const id = patient.getId();
        const index = this.patients.findIndex(record => id === record.id);
        if (index === -1) {
          rej(new Error("Patient not found"));
        }

        this.patients[index] = patient.getRecord();
        res(true);

      }, this.SIMULATED_SERVER_DELAY_MS);
    })
  }
}
