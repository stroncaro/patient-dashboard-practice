import { useState } from "react";
import Patient, { PatientList } from "../../models/patient";

type RecipeForm = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
} & (
  | { patient: Patient; patients?: never }
  | { patient?: never; patients: PatientList }
);

const RecipeForm: React.FC<RecipeForm> = (props) => {
  const { patient, patients, onSubmit } = props;
  const [content, setContent] = useState<string>("");

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        Patient:
        <select
          name="patient"
          className="grow p-1 border rounded italic border-primary bg-white"
        >
          {patient && (
            <option value={`${patient.id}`} disabled selected>
              {patient.getFullName()}
            </option>
          )}
          {patients && (
            <>
              <option value={""} defaultChecked disabled selected>
                --- select ---
              </option>
              {patients.map((patient, i) => (
                <option key={i} value={`${patient.id}`}>
                  {patient.getFullName()}
                </option>
              ))}
            </>
          )}
        </select>
      </label>
      <label className="flex flex-col">
        <span className="sr-only">Content</span>
        <textarea
          name="content"
          rows={6}
          placeholder="Write your recipe..."
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
          className="p-2 rounded"
        />
      </label>
      <div className="self-end">
        <button
          type="submit"
          className="btn btn-md bg-secondary text-white border border-black font-bold text-xl"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
