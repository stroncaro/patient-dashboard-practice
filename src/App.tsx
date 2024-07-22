import { createContext, MouseEventHandler, PropsWithChildren, useContext, useEffect, useState } from 'react'
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
  const { isLoggedIn, logIn, logOut } = useContext(AuthContext);

  return (
    <header>
      <div className='company-name'>
        <div className='logo'>S</div>
        SuperSoft
      </div>
      <ul>
        {!isLoggedIn ? (
          <>
            <li><button onClick={logIn}>Log In</button></li>
            <li><button onClick={logIn}>Sign up</button></li>
          </>
        ) : (
          <li><button onClick={logOut}>Log out</button></li>
        )}
      </ul>
    </header>
  )
}

/* TODO: Add a confirmation dialog before saving changes */
type PatientModalState = 'closed' | 'view' | 'edit';

const PatientDashboard: React.FC = () => {
  /* TODO: Make patients service to get and set patients */
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

interface PatientFormProps {
  defaultValues: Patient;
  submitButtonText?: string;
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  disabled?: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ defaultValues, disabled, submitButtonText, onSubmit, onCancel }) => {
  return (
    <form className='patient-info' onSubmit={onSubmit}>
      <div>
        <label htmlFor='name'>Name:</label>
        <input id='name' type='text' defaultValue={defaultValues.name} disabled={!!disabled} />  
      </div>
      <div>
        <label htmlFor='middleName'>Middle Name:</label>
        <input id='middleName' type='text' defaultValue={defaultValues.middleName} disabled={!!disabled} />
      </div>
      <div>
        <label htmlFor='lastName'>Last Name:</label>
        <input id='lastName' type='text' defaultValue={defaultValues.lastName} disabled={!!disabled} />
      </div>
      <div>
        <label htmlFor='age'>Age:</label>
        <input id='age' type='text' defaultValue={defaultValues.age} disabled={!!disabled} />
      </div>
      <div>
        <label htmlFor='phone'>Phone:</label>
        <input id='phone' type='text' defaultValue={defaultValues.phone} disabled={!!disabled} />
      </div>
      <div>
        <label htmlFor='mail'>Mail:</label>
        <input id='mail' type='email' defaultValue={defaultValues.mail} disabled={!!disabled} />
      </div>
      <div>
        <label htmlFor='address'>Address:</label>
        <input id='address' type='text' defaultValue={defaultValues.address} disabled={!!disabled} />
      </div>
      <div className='patient-button-container'>
        <button type='submit'>{submitButtonText ? submitButtonText : 'Submit'}</button>
        <button type='button' onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
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

const AuthContext = createContext({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
})

/* TODO: Refactor to a service */

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  /* TODO: Create actual log in functionality */
  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}


const AppContent: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    isLoggedIn
    ? <PatientDashboard />
    : <p>Please log in</p>
  )
}

function App() {
  return (
    <AuthProvider>
      <Header />
      <AppContent />
    </AuthProvider>
  )
}

export default App
