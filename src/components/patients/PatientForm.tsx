import clsx from "clsx";
import Patient, { PatientRecord } from "../../models/patient";
import { useState } from "react";

interface PatientFormProps {
  defaultPatient: Patient;
  submitButtonText?: string;
  onSubmit: (patient: Patient) => void;
  onCancel: () => void;
  inputDisabled?: boolean;
  submitButtonDisabled: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ defaultPatient, inputDisabled: disabled, submitButtonText, submitButtonDisabled, onSubmit: _onSubmit, onCancel }) => {
  const [patient, setPatient] = useState<Patient>(defaultPatient);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    setPatient(getPatientFromFormValues());
  };
  
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    if (patient.isValid()) {
      _onSubmit(patient);
    }
  }

  const getPatientFromFormValues: () => Patient = () => {
    const record: PatientRecord = {
      id: defaultPatient.getId(),
      name: (document.getElementById('name') as HTMLInputElement).value,
      middleName: (document.getElementById('middleName') as HTMLInputElement).value,
      lastName: (document.getElementById('lastName') as HTMLInputElement).value,
      age: Number((document.getElementById('age') as HTMLInputElement).value),
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      address: (document.getElementById('address') as HTMLInputElement).value,
    }
  
    return Patient.fromRecord(record);
  };

  return (
    <form
      className={clsx(
        "w-96 [&>div]:flex [&>div]:justify-between [&>div:last-child]:justify-end [&>div]:items-baseline [&>div]:mb-1",
        "[&_input]:max-w-[50%] [&_input]:px-2 [&_input]:py-1 text-sm",
        {
          "[&_input]:bg-black [&_input]:bg-opacity-5 [&_input:focus]:bg-primary [&_input:focus]:bg-opacity-20 [&_input:focus-visible]:outline-primary": !disabled,
        },
      )}
      onSubmit={onSubmit}
    >
      {[
        { id: "name", label: "Name", defaultValue: defaultPatient.getName(), isValid: patient.validateName(), },
        { id: "middleName", label: "Middle Name", defaultValue: defaultPatient.getMiddleName(), isValid: patient.validateMiddleName(), },
        { id: "lastName", label: "Last Name", defaultValue: defaultPatient.getLastName(), isValid: patient.validateLastName(), },
        { id: "age", label: "Age", defaultValue: defaultPatient.getAge(), isValid: patient.validateAge(), },
        { id: "phone", label: "Phone", defaultValue: defaultPatient.getPhone(), isValid: patient.validatePhone(), },
        { id: "email", label: "Email", defaultValue: defaultPatient.getEmail(), isValid: patient.validateEmail(), },
        { id: "address", label: "Address", defaultValue: defaultPatient.getAddress(), isValid: patient.validateAddress(), }
      ].map((inputData, i) => (
        <div
          key={i}
          className={clsx("px-4 py-[1px]",
            { "-ml-[2px] border-l-2 border-red text-red underline" : !inputData.isValid }
          )}
        >
          <label
            htmlFor={inputData.id}
          >
            {inputData.label}
          </label>
          <input
            id={inputData.id}
            type="text"
            defaultValue={inputData.defaultValue}
            disabled={!!disabled}
            onChange={onChange}
          />
        </div>
      ))}
      <div className="gap-4 mt-5">
        <button 
          type={submitButtonDisabled ? 'button' : 'submit'}
          className={clsx("btn btn-md",
            {
              "border-secondary text-secondary hover:bg-secondary hover:text-white": !submitButtonDisabled,
              "border-[#444444] text-white bg-[#444444] cursor-pointer": submitButtonDisabled,
            }
          )}
        >
          {submitButtonText ? submitButtonText : 'Submit'}
        </button>
        <button
          type='button'
          onClick={onCancel}
          className="btn btn-md btn-white btn-hover-black"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
