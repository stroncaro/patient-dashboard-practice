import { MouseEventHandler, PropsWithChildren, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';

type Patient = {
  id: number;
  name: string;
  middleName: string;
  lastName: string;
  age: number;
  phone: string;
  mail: string;
  address: string;
}

type PatientList = Patient[];

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
]


const Header: React.FC = () => {
  return (
    <header>
      <div className='company-name'>
        <div className='logo'>S</div>
        SuperSoft
      </div>
      <ul>
        <li><a>Log In</a></li>
        <li><a>Sign up</a></li>
        <li><a>Log out</a></li>
      </ul>
    </header>
  )
}

type PatientModalState = 'closed' | 'view' | 'edit';

const Content: React.FC = () => {
  const [patients, setPatients] = useState<PatientList>(INITIAL_PATIENT_LIST);
  const [selectedPatientIndex, setSelectedPatientIndex] = useState<number | null>(null);
  const [modalState, setModalState] = useState<PatientModalState>('closed');
  
  const selectPatient: (patientIndex: number) => void = (patientIndex) => {
    setSelectedPatientIndex(patientIndex);    
  }

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
        {patients.map((patient, patientIndex) => 
          <li key={patient.id} className={patientIndex === selectedPatientIndex ? 'patient-list-selected' : ''} onClick={() => selectPatient(patientIndex)}>
            {patient.lastName}, {patient.name} {patient.middleName}
            {patientIndex === selectedPatientIndex && (
              <div className='patient-list-selected-buttons'>
                <button onClick={() => viewPatient(patientIndex)}>View</button>
                <button onClick={() => editPatient(patientIndex)}>Edit</button>
              </div>
            )}
          </li>
        )}
      </ul>
      {modalState !== 'closed' && selectedPatientIndex !== null && (
        <ModalBox closeCallback={closeModal} title={modalState === 'view' ? 'View patient information' : 'Edit patient information'}>
          <div className='patient-info'>
            <div>
              <p>Name:</p>
              <p>Middle Name:</p>
              <p>Last Name:</p>
              <p>Age:</p>
              <p>Phone:</p>
              <p>Mail:</p>
              <p>Address:</p>
            </div>
            <div>
              <p>{patients[selectedPatientIndex].name}</p>
              <p>{patients[selectedPatientIndex].middleName}</p>
              <p>{patients[selectedPatientIndex].lastName}</p>
              <p>{patients[selectedPatientIndex].age}</p>
              <p>{patients[selectedPatientIndex].phone}</p>
              <p>{patients[selectedPatientIndex].mail}</p>
              <p>{patients[selectedPatientIndex].address}</p>
            </div>
          </div>
          <div className='patient-button-container'>
            {modalState === 'view' 
              ? <button onClick={() => editPatient(selectedPatientIndex)}>Edit</button>
              : <button>Save</button>
            }
            <button onClick={closeModal}>Cancel</button>
          </div>
        </ModalBox>
      )}
    </main>
  )
}

interface ModalBoxProps {
  title?: string;
  closeCallback: () => void;
}

const ModalBox: React.FC<PropsWithChildren<ModalBoxProps>> = ({ children, title, closeCallback }) => {

  useEffect(() => {
    function handleEscapeKeyDown(ev: KeyboardEvent) {
      if (ev.key === 'Escape') closeCallback();
    }
    
    window.addEventListener('keydown', handleEscapeKeyDown);
    return () => { window.removeEventListener('keydown', handleEscapeKeyDown) }
  }, []);
  
  const handleContentClick: MouseEventHandler<HTMLDivElement> = (ev) => ev.stopPropagation();

  return ReactDOM.createPortal(
    <div className='modal-box-container' onClick={closeCallback}>
      <div className='modal-box' onClick={handleContentClick}>
        <div className='modal-box-header'>
          {title && <h1>{title}</h1>}
          <button onClick={closeCallback}>X</button>
        </div>
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}


function App() {
  return (
    <>
      <Header />
      <Content />
    </>
  )
}

export default App
