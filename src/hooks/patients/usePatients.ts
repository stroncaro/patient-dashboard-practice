import { useEffect, useState } from "react"
import Patient, { PatientList, PatientRecord } from "../../services/patients/PatientModel"

/* TODO: Build an actual API */
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


type AddPatientFunction = (patient: Patient) => void;
type UpdatePatientFunction = (patient: Patient) => void;
type DeletePatientFunction = (id: number) => void;

interface PatientService {
  patients: PatientList;
  addPatient: AddPatientFunction;
  updatePatient: UpdatePatientFunction;
  deletePatient: DeletePatientFunction;
}

const usePatients: () => PatientService = () => {
  const [patients, setPatients] = useState<PatientList>([]);

  /* TODO: Build an actual API to load values from */
  useEffect(() => {
    /* Simulate loading data from an API */
    const timerId = setTimeout(() => {
      setPatients(INITIAL_PATIENT_DATA.map((data) => Patient.fromRecord(data)));
    }, 1000);  

    return () => clearTimeout(timerId);
  }, []);  

  /* TODO: Provide feedback to the caller to indicate success or failure */
  const addPatient: AddPatientFunction = (patient) => {
    if (patient.getId() === null && patient.isValid()) {
      setPatients((prev) => {
        const newId: number = prev.reduce(
          (maxId, patient) => Math.max(patient.getId() ?? -1, maxId),
          -1
        ) +1;  

        const record = patient.getRecord();
        record.id = newId;

        const newPatient = Patient.fromRecord(record);

        return [
          ...prev,
          newPatient
        ];  
      });  
    }  
  };  

  /* TODO: Provide feedback to the caller to indicate success or failure */
  const updatePatient: UpdatePatientFunction = (patient) => {
    if (!!patient.getId() && patient.isValid()) {
      setPatients((prev) => {
        const id = patient.getId();
        const index = prev.findIndex((p) => p.getId() === id);

        if (index === -1) return prev;

        return [
          ...prev.slice(0, index),
          patient,
          ...prev.slice(index+1),
        ];  
      });  
    }  
  };  

  /* TODO: Provide feedback to the caller to indicate success or failure */
  const deletePatient: DeletePatientFunction = (id) => {
    setPatients((prev) => prev.filter((p) => p.getId() !== id));
  };  

  return {
    patients: patients,
    addPatient: addPatient,
    updatePatient: updatePatient,
    deletePatient: deletePatient,
  };  
};  

export default usePatients;
