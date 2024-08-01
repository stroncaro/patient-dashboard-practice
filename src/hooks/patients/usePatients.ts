import { useState } from "react"
import Patient, { PatientList } from "../../models/patient"
import { MockPatientService as PatientServiceImplementation, PatientService } from "../../services/patients/patients";

type PatientsHookFunctions = "fetch" | "add" | "update" | "delete";
type LoadingStates = Record<PatientsHookFunctions, boolean>;

interface PatientsReactHook {
  patients: PatientList;
  loadingStates: LoadingStates;
  fetchPatientPageAsync: () => void;
  addPatientAsync: (patient: Patient) => void;
  updatePatientAsync: (patient: Patient) => Promise<boolean>;
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
  
  /* TODO: handle pagination */
  const fetchPatientPageAsync = async () => {
    if (!loadingStates.fetch) {
      setLoadingStates(prev => ({ ...prev, fetch: true }));
    }

    const fetchedPatients = await Service.getPatients();
    setPatients(fetchedPatients);
    setLoadingStates(prev => ({ ...prev, fetch: false }));
  }

  const addPatientAsync = async (_patient: Patient) => {
    throw Error("Not implemented");
  }

  const updatePatientAsync = async (patient: Patient) => {
    if (!loadingStates.update) {
      setLoadingStates(prev => ({ ...prev, update: true }));
    }

    try {
      await Service.updatePatient(patient);
    } catch (error) {
      return false;
    }
    
    setLoadingStates(prev => ({ ...prev, update: false }));
    fetchPatientPageAsync();
    return true;
  }

  const deletePatientAsync = async (_id: number) => {
    throw Error("Not implemented");
  }

  return {
    patients: patients,
    loadingStates: loadingStates,
    fetchPatientPageAsync: fetchPatientPageAsync,
    addPatientAsync: addPatientAsync,
    updatePatientAsync: updatePatientAsync,
    deletePatientAsync: deletePatientAsync,
  }
};  

export default usePatients;
