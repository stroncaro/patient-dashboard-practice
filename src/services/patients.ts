import { useEffect, useState } from "react"
import { PatientPrototype, PatientList } from "./patients.types"

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

type AddPatientFunction = (patient: PatientPrototype) => void;
type UpdatePatientFunction = (id: number, patient: PatientPrototype) => void;
type DeletePatientFunction = (id: number) => void;
type ValidatePatientProtoFunction = (patient: PatientPrototype) => boolean;

interface PatientService {
  patients: PatientList;
  addPatient: AddPatientFunction;
  updatePatient: UpdatePatientFunction;
  deletePatient: DeletePatientFunction;
}

const validatePatientPrototype: ValidatePatientProtoFunction = (patient) => {
  return (
    /^[a-zá-ú][a-zá-ú ]+$/gi.test(patient.name) &&
    /^[a-zá-ú ]*$/gi.test(patient.middleName) &&
    /^[a-zá-ú][a-zá-ú ]+$/gi.test(patient.lastName) &&
    patient.age >= 0 && patient.age < 150 &&
    /\+{0,1}[\d\-]+$/g.test(patient.phone) &&
    patient.mail.includes('@') && patient.mail.includes('.') &&
    patient.address !== ''
  );
}

const usePatients: () => PatientService = () => {
  const [patients, setPatients] = useState<PatientList>([]);

  /* TODO: Build an actual API to load values from */
  useEffect(() => {
    /* Simulate loading data from an API */
    const timerId = setTimeout(() => {
      setPatients(INITIAL_PATIENT_LIST);
    }, 1000);

    return () => clearTimeout(timerId);
  }, []);

  /* TODO: Provide feedback to the caller to indicate success or failure */
  const addPatient: AddPatientFunction = (patient) => {
    if (validatePatientPrototype(patient)) {
      setPatients((prev) => {
        const newId: number = prev.reduce(
          (maxId, patient) => Math.max(patient.id, maxId),
          -1
        ) + 1;

        return [
          ...prev,
          { id: newId, ...patient }
        ];
      });
    }
  };

  /* TODO: Provide feedback to the caller to indicate success or failure */
  const updatePatient: UpdatePatientFunction = (id, patient) => {
    if (validatePatientPrototype(patient)) {
      setPatients((prev) => {
        const index = prev.findIndex((p) => p.id === id);

        if (index === -1) return prev;

        return [
          ...prev.slice(0, index),
          { id: id, ...patient },
          ...prev.slice(index+1),
        ];
      });
    }
  };

  /* TODO: Provide feedback to the caller to indicate success or failure */
  const deletePatient: DeletePatientFunction = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    patients: patients,
    addPatient: addPatient,
    updatePatient: updatePatient,
    deletePatient: deletePatient,
  };
};

export default usePatients;
