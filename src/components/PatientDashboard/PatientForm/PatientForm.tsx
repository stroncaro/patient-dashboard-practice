import { Patient } from "../patient.types";

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
};

export default PatientForm;
