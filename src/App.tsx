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


const Content: React.FC = () => {
  const [patients, setPatients] = useState<PatientList>(INITIAL_PATIENT_LIST);
  const [selectedPatientIndex, setSelectedPatientIndex] = useState<number | null>(null);
  
  const closeModal: () => void = () => {
    setSelectedPatientIndex(null);
  }

  return (
    <main>
      <h1>Patients</h1>
      <ul>
        {patients.map((patient, i) => 
          <li key={patient.id} onClick={() => setSelectedPatientIndex(i)}>
            {patient.lastName}, {patient.name} {patient.middleName}
          </li>
        )}
      </ul>
      {selectedPatientIndex !== null && (
        <PatientModal patient={patients[selectedPatientIndex]} close={closeModal}/>
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


interface PatientModalProps {
  patient: Patient;
  close: () => void;
  state?: PatientModalState;
}

type PatientModalState = 'show' | 'edit';

const PatientModal: React.FC<PatientModalProps> = ({ patient, state, close }) => {
  const [modalState, setModalState] = useState<PatientModalState>(state || 'show');

  return (
    <div className='modal-container'>
      <div className='patient-modal-box'>
        <div className='modal-header'>
          <button onClick={close}>X</button>
        </div>
        <div className='modal-body'>
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
            <p>{patient.name}</p>
            <p>{patient.middleName}</p>
            <p>{patient.lastName}</p>
            <p>{patient.age}</p>
            <p>{patient.phone}</p>
            <p>{patient.mail}</p>
            <p>{patient.address}</p>
          </div>
        </div>
        <div className='modal-button-container'>
          {modalState === 'show' 
            ? <button onClick={() => setModalState('edit')}>Edit</button>
            : <button>Save</button>
          }
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <Header />
      <Content />
      <ModalBox closeCallback={() => console.log('TODO: close modal')} />
    </>
  )
}

export default App
