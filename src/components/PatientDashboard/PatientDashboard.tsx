import { useState } from "react";
import { PatientList } from "./patient.types";
import ModalBox from "../common/ModalBox";
import PatientForm from "./PatientForm/PatientForm";


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


/* TODO: Add a confirmation dialog before saving changes */
type PatientModalState = 'closed' | 'view' | 'edit';

export const PatientDashboard: React.FC = () => {
  /* TODO: Make patients service to get and set patients */
  const [patients, setPatients] = useState<PatientList>(INITIAL_PATIENT_LIST);
  const [selectedPatientIndex, setSelectedPatientIndex] = useState<number | null>(null);
  const [modalState, setModalState] = useState<PatientModalState>('closed');
  
  const selectPatient: (patientIndex: number) => void = (patientIndex) => {
    setSelectedPatientIndex(patientIndex);    
  }

  const deselectPatient: () => void = () => setSelectedPatientIndex(null);

  const viewPatient: (patientIndex: number) => void = (patientIndex) => {
    setSelectedPatientIndex(patientIndex);
    setModalState('view');
  }

  const editPatient: (patientIndex: number) => void = (patientIndex) => {
    setSelectedPatientIndex(patientIndex);
    setModalState('edit');
  }

  const closeModal: () => void = () => setModalState('closed');
  
  return (
    <main>
      <h1>Patients</h1>
      <ul>
        {patients.map((patient, patientIndex) => {
          const isSelected = patientIndex === selectedPatientIndex;
          return (
            <li 
              key={patient.id}
              className={isSelected ? 'patient-list-selected' : ''}
              onClick={() => isSelected ? deselectPatient() : selectPatient(patientIndex)}
            >
              {patient.lastName}, {patient.name} {patient.middleName}
              {isSelected && (
                <div className='patient-list-selected-buttons'>
                  <button 
                    onClick={(ev) => {
                      ev.stopPropagation();
                      viewPatient(patientIndex);
                    }}
                  >
                    View
                  </button>
                  <button 
                    onClick={(ev) => {
                      ev.stopPropagation();
                      editPatient(patientIndex);
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
            defaultValues={patients[selectedPatientIndex]}
            disabled={modalState === 'view'}
            submitButtonText={modalState === 'view' ? 'Edit' : 'Save'}
            onSubmit={(ev) => {
              ev.preventDefault();
              if (modalState === 'view') {
                setModalState('edit');
              }

              if (modalState === 'edit') {
                console.warn('Saving patient data not implemented yet');
                setModalState('closed');
              }
            }}
            onCancel={closeModal}
          />
        </ModalBox>
      )}
    </main>
  );
}

export default PatientDashboard;
