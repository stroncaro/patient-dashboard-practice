import { Patient, PatientRecord, PatientList } from "./PatientModel";

const INITIAL_PATIENT_DATA: PatientRecord[] = [
  {
    id: 1,
    name: "Marta",
    middleName: "",
    lastName: "Fiorito",
    age: 53,
    phone: "9999-9999",
    mail: "marta@fiorito.com",
    address: "Some Street 1234",
  },
  {
    id: 2,
    name: "Juan",
    middleName: "Alberto",
    lastName: "Perez",
    age: 15,
    phone: "9876-5432",
    mail: "capo_el10@yahoo.com",
    address: "Some Other Street 5678",
  },
  {
    id: 3,
    name: "Ana",
    middleName: "Maria",
    lastName: "Lopez",
    age: 42,
    phone: "1234-5678",
    mail: "ana.lopez@example.com",
    address: "Avenue 42",
  },
  {
    id: 4,
    name: "Carlos",
    middleName: "",
    lastName: "Gomez",
    age: 29,
    phone: "2345-6789",
    mail: "carlos.gomez@example.com",
    address: "Baker Street 221B",
  },
  {
    id: 5,
    name: "Lucia",
    middleName: "Marina",
    lastName: "Martinez",
    age: 36,
    phone: "3456-7890",
    mail: "lucia.martinez@example.com",
    address: "Elm Street 10",
  },
  {
    id: 6,
    name: "Fernando",
    middleName: "José",
    lastName: "Cruz",
    age: 61,
    phone: "4567-8901",
    mail: "fernando.cruz@example.com",
    address: "Highway 56",
  },
  {
    id: 7,
    name: "Isabella",
    middleName: "Cristina",
    lastName: "Reyes",
    age: 23,
    phone: "5678-9012",
    mail: "isabella.reyes@example.com",
    address: "Main Street 100",
  },
  {
    id: 8,
    name: "Sergio",
    middleName: "Antonio",
    lastName: "Torres",
    age: 50,
    phone: "6789-0123",
    mail: "sergio.torres@example.com",
    address: "Green Street 45",
  },
  {
    id: 9,
    name: "Valeria",
    middleName: "Elena",
    lastName: "Fernandez",
    age: 31,
    phone: "7890-1234",
    mail: "valeria.fernandez@example.com",
    address: "River Road 21",
  },
  {
    id: 10,
    name: "Javier",
    middleName: "",
    lastName: "Alonso",
    age: 28,
    phone: "8901-2345",
    mail: "javier.alonso@example.com",
    address: "Oak Street 7",
  },
  {
    id: 11,
    name: "Carmen",
    middleName: "Elena",
    lastName: "Gutierrez",
    age: 45,
    phone: "9012-3456",
    mail: "carmen.gutierrez@example.com",
    address: "Sunset Boulevard 5",
  },
];

interface PatientService {
  getPatients: (limit: number, skip: number) => Promise<PatientList>;
  addPatient: (data: PatientRecord) => Promise<number>;
  deletePatient: (id: number) => Promise<boolean>;
  updatePatient: (id: number, data: PatientRecord) => Promise<boolean>;
}

class MockPatientService implements PatientService {
  private static instance?: MockPatientService;
  private serverPatients: PatientRecord[];
  
  private constructor () {
    this.serverPatients = INITIAL_PATIENT_DATA;
  }
  
  static getInstance(): PatientService {
    MockPatientService.instance ??= new MockPatientService();
    return MockPatientService.instance;
  }
  
  getPatients(limit: number = 10, skip: number = 0): Promise<PatientList> {
    throw new Error("Not Implemented");
  }

  addPatient(data: PatientRecord): Promise<number> {
    throw new Error("Not Implemented");
  }
  deletePatient(id: number): Promise<boolean> {
    throw new Error("Not Implemented");
  }

  updatePatient(id: number, data: PatientRecord): Promise<boolean> {
    throw new Error("Not Implemented");
  }
}
