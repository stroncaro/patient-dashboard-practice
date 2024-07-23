import clsx from "clsx";
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
      <div className="gap-4 mt-5">
        <button 
          type='submit'
          className="btn btn-md border-secondary text-secondary hover:bg-secondary hover:text-white"
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
