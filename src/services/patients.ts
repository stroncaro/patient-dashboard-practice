import { useState } from "react"
import { Patient, PatientList } from "./patients.types"

/* TODO: Build an actual API */
const INITIAL_PATIENT_LIST: PatientList = [
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
];

type AddPatientFunction = (patient: Patient) => void;
type UpdatePatientFunction = (id: number, patient: Patient) => void;
type DeletePatientFunction = (id: number) => void;

interface PatientService {
  patients: PatientList;
  addPatient: AddPatientFunction;
  updatePatient: UpdatePatientFunction;
  deletePatient: DeletePatientFunction;
}

const usePatients: () => PatientService = () => {
  const [patients, setPatients] = useState<PatientList>(INITIAL_PATIENT_LIST);

  const addPatient: AddPatientFunction = (patient) => {
    throw "Not Implemented";
  };

  const updatePatient: UpdatePatientFunction = (id, patient) => {
    throw "Not Implemented";
  };

  const deletePatient: DeletePatientFunction = (id) => {
    throw "Not Implemented";   
  };

  return {
    patients: patients,
    addPatient: addPatient,
    updatePatient: updatePatient,
    deletePatient: deletePatient,
  };
};

export default usePatients;
