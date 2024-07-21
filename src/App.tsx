import { useState } from 'react'

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

type PatientList = Patient[];

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
  
  return (
    <main>
      <h1>Patients</h1>
      <ul>
        {patients.map((patient, i) => 
          <li key={i}>{patient.lastName}, {patient.name} {patient.middleName}</li>
        )}
      </ul>
    </main>
  )
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
