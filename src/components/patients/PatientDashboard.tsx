import { useState } from "react";
import clsx from "clsx";
import usePatients from "../../hooks/patients/usePatients";

import ModalBox from "../common/ModalBox";
import PatientForm from "./PatientForm";

/* TODO: Add a confirmation dialog before saving changes */
type PatientModalState = 'closed' | 'view' | 'edit';

export const PatientDashboard: React.FC = () => {
  const { patients, updatePatient } = usePatients();

  const [selectedPatientIndex, setSelectedPatientIndex] = useState<number | null>(null);
  const selectPatient: (patientIndex: number) => void = (patientIndex) => setSelectedPatientIndex(patientIndex);    
  const deselectPatient: () => void = () => setSelectedPatientIndex(null);
  
  const [modalState, setModalState] = useState<PatientModalState>('closed');
  const openViewDialog: () => void = () => setModalState('view');
  const openEditDialog: () => void = () => setModalState('edit');
  const closeModal: () => void = () => setModalState('closed');
  
  return (
    <div className="w-1/2">
      <div className="my-4">
        <h1 className="text-3xl font-bold">Patients</h1>
        <hr />
      </div>
      <ul>
        {patients.map((patient, patientIndex) => {
          const isSelected = patientIndex === selectedPatientIndex;
          return (
            <li 
              key={patient.getId()}
              className={clsx(
                "flex justify-between items-center px-4 my-1 border-l-2 hover:border-primary hover:cursor-pointer",
                {
                  "border-transparent" : !isSelected,
                  "border-black" : isSelected,
                }                
              )}
              onClick={() => isSelected ? deselectPatient() : selectPatient(patientIndex)}
            >
              {patient.getFullName()}
              {isSelected && (
                <div className="flex gap-4 text-sm">
                  <button className="btn btn-md btn-white btn-hover-primary"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      openViewDialog();
                    }}
                  >
                    View
                  </button>
                  <button className="btn btn-md btn-white btn-hover-primary"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      openEditDialog();
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </li>
          )}
        )}
      </ul>
      {modalState !== 'closed' && selectedPatientIndex !== null && (
        <ModalBox closeCallback={closeModal} title={modalState === 'view' ? 'View patient information' : 'Edit patient information'}>
          <PatientForm
            defaultPatient={patients[selectedPatientIndex]}
            disabled={modalState === 'view'}
            submitButtonText={modalState === 'view' ? 'Edit' : 'Save'}
            onSubmit={(returnedPatient) => {
              if (modalState === 'view') {
                setModalState('edit');
              }

              if (modalState === 'edit') {
                updatePatient(returnedPatient);
                setModalState('closed');
              }
            }}
            onCancel={closeModal}
          />
        </ModalBox>
      )}
    </div>
  );
}

export default PatientDashboard;
