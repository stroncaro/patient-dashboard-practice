import clsx from "clsx";
import { PatientPrototype, PatientPrototypeKeys } from "../../../services/patients.types";
import { validationFunctions } from "../../../services/patients";
import { useState } from "react";

interface PatientFormProps {
  defaultValues: PatientPrototype;
  submitButtonText?: string;
  onSubmit: (data: PatientPrototype) => void;
  onCancel: () => void;
  disabled?: boolean;
}

const getPatientFromFormValues: () => PatientPrototype = () => {
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const middleName = (document.getElementById('middleName') as HTMLInputElement).value;
  const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
  const age = Number((document.getElementById('age') as HTMLInputElement).value);
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const mail = (document.getElementById('mail') as HTMLInputElement).value;
  const address = (document.getElementById('address') as HTMLInputElement).value;

  return {
    name: name,
    middleName: middleName,
    lastName: lastName,
    age: age,
    phone: phone,
    mail: mail,
    address: address,
  }
}

type PatientFieldValidity = { [key in PatientPrototypeKeys]: boolean }

function camelCaseToWords(s: string) {
  const result = s.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

const PatientForm: React.FC<PatientFormProps> = ({ defaultValues, disabled, submitButtonText, onSubmit, onCancel }) => {
  const [isValid, setIsValid] = useState<PatientFieldValidity>({
    name:       validationFunctions.name(defaultValues.name),
    middleName: validationFunctions.middleName(defaultValues.middleName),
    lastName:   validationFunctions.lastName(defaultValues.lastName),
    age:        validationFunctions.age(defaultValues.age.toString()),
    phone:      validationFunctions.phone(defaultValues.phone),
    mail:       validationFunctions.mail(defaultValues.mail),
    address:    validationFunctions.address(defaultValues.address),
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    const field = ev.target.id as PatientPrototypeKeys;
    const validationFunction = validationFunctions[field];

    setIsValid((prev) => {
      return { ...prev, [field]: validationFunction(ev.target.value) }
    });
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
      onSubmit={(ev) => {
        ev.preventDefault();
        const isInputValid = Object.values(isValid).reduce((acc, cur) => acc && cur, true);
        if (isInputValid) {
          onSubmit(getPatientFromFormValues());
        }
      }}
    >
      {Object.keys(validationFunctions).map((key, i) => (
        <div
          key={i}
          className={clsx("px-4 py-[1px]",
            { "-ml-[2px] border-l-2 border-red text-red underline" : !isValid[key as PatientPrototypeKeys] }
          )}
        >
          <label
            htmlFor={key}
          >
            {camelCaseToWords(key)}
          </label>
          <input
            id={key}
            type="text"
            defaultValue={defaultValues[key as PatientPrototypeKeys]}
            disabled={!!disabled}
            onChange={onChange}
          />
        </div>
      ))}
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
