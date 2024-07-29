import { useState } from "react"
import Patient, { PatientList } from "../../services/patients/PatientModel"
import { MockPatientService as PatientServiceImplementation, PatientService } from "../../services/patients/patients";

interface PatientsReactHook {
  patients: PatientList;
  loadPatientPageAsync: (page: number) => void;
  loadPatientPageWorking: boolean;
  addPatientAsync: (patient: Patient) => void;
  updatePatientAsync: (patient: Patient) => void;
  deletePatientAsync: (id: number) => void;
}

const usePatients: () => PatientsReactHook = () => {
  const Service = PatientServiceImplementation.getInstance() as PatientService;
  const [patients, setPatients] = useState<PatientList>([]);
  const [loadPatientPageWorking, setLoadPatientPageWorking] = useState<boolean>(false);
  const [loadPatientPageProcessId, setLoadPatientProcessId] = useState<number>(0);
  
  const loadPatientPageAsync = async (page: number) => {
    const id = Date.now();
    setLoadPatientProcessId(id);

    if (!loadPatientPageWorking) {
      setLoadPatientPageWorking(true);
    }

    const fetchedPatients = await Service.getPatients();

    if (loadPatientPageProcessId === id) {
      setPatients(fetchedPatients);
      setLoadPatientPageWorking(false);
    }
  }

  const addPatientAsync = async (patient: Patient) => {
    throw Error("Not implemented");
  }

  const updatePatientAsync = async (patient: Patient) => {
    throw Error("Not implemented");
  }

  const deletePatientAsync = async (id: number) => {
    throw Error("Not implemented");
  }

  return {
    patients: patients,
    loadPatientPageAsync: loadPatientPageAsync,
    loadPatientPageWorking: loadPatientPageWorking,
    addPatientAsync: addPatientAsync,
    updatePatientAsync: updatePatientAsync,
    deletePatientAsync: deletePatientAsync,
  }
};  

export default usePatients;
