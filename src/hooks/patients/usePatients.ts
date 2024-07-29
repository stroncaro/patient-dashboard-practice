import { useRef, useState } from "react"
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
  const loadPatientPageProcessId = useRef<number>(0);
  
  const loadPatientPageAsync = async (page: number) => {
    /* TODO: handle pagination */
    const id = Date.now();
    console.log(`loadPatientPageAsync called. Id: ${id}`);

    loadPatientPageProcessId.current = id;
    if (!loadPatientPageWorking) {
      console.log(`${id}: set loading to true`);
      setLoadPatientPageWorking(true);
    }

    const fetchedPatients = await Service.getPatients();
    console.log(`${id}: finished fetching. current id is ${loadPatientPageProcessId.current}`);

    if (loadPatientPageProcessId.current === id) {
      console.log(`${id}: setting patients and loading to false`);
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
