import { useRef, useState } from "react"
import Patient, { PatientList } from "../../services/patients/PatientModel"
import { MockPatientService as PatientServiceImplementation, PatientService } from "../../services/patients/patients";

type PatientsHookFunctions = "fetch" | "add" | "update" | "delete";
type LoadingStates = Record<PatientsHookFunctions, boolean>;
type ProcessIds = Record<PatientsHookFunctions, number>;

interface PatientsReactHook {
  patients: PatientList;
  loadingStates: LoadingStates;
  fetchPatientPageAsync: (page: number) => void;
  addPatientAsync: (patient: Patient) => void;
  updatePatientAsync: (patient: Patient) => void;
  deletePatientAsync: (id: number) => void;
}

const usePatients: () => PatientsReactHook = () => {
  const Service = PatientServiceImplementation.getInstance() as PatientService;
  const [patients, setPatients] = useState<PatientList>([]);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    fetch: false,
    add: false,
    update: false,
    delete: false,
  });
  const processIds = useRef<ProcessIds>({
    fetch: 0,
    add: 0,
    update: 0,
    delete: 0,
  });
  
  const loadPatientPageAsync = async (page: number) => {
    /* TODO: handle pagination */
    const id = Date.now();

    processIds.current.fetch = id;
    if (!loadingStates.fetch) {
      setLoadingStates(prev => ({ ...prev, fetch: true }));
    }

    const fetchedPatients = await Service.getPatients();

    if (processIds.current.fetch === id) {
      setPatients(fetchedPatients);
      setLoadingStates(prev => ({ ...prev, fetch: false }));
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
    loadingStates: loadingStates,
    fetchPatientPageAsync: loadPatientPageAsync,
    addPatientAsync: addPatientAsync,
    updatePatientAsync: updatePatientAsync,
    deletePatientAsync: deletePatientAsync,
  }
};  

export default usePatients;
