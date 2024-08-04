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
    <form onSubmit={onSubmit}>
      <label>
        Patient
        <select name="patient">
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
      <label>
        Content
        <textarea
          name="content"
          rows={6}
          // cols={50}
          placeholder="Write your recipe..."
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
        />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default RecipeForm;
