import { useState } from "react";
import Patient, { PatientList } from "../../models/patient";
import clsx from "clsx";

type RecipeForm = {
  onSubmit: (patientId: number, content: string) => Promise<void>;
  disableSubmit?: boolean;
  disableInput?: boolean;
} & (
  | { patient: Patient; patients?: never }
  | { patient?: never; patients: PatientList }
);

const RecipeForm: React.FC<RecipeForm> = (props) => {
  const {
    patient,
    patients,
    onSubmit,
    disableSubmit = false,
    disableInput = false,
  } = props;

  const [content, setContent] = useState<string>("");
  const [patientId, setPatientId] = useState<string>(
    patient ? `${patient.id}` : ""
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!disableSubmit && patientId) {
      onSubmit(Number(patientId), content).catch((error) =>
        console.error(error)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        Patient:
        <select
          name="patient"
          className="grow p-1 border rounded italic border-primary bg-white"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        >
          {patient && (
            <option value={`${patient.id}`} disabled>
              {patient.getFullName()}
            </option>
          )}
          {patients && (
            <>
              <option value={""} defaultChecked disabled>
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
          disabled={disableInput}
        />
      </label>
      <div className="self-end">
        <button
          type="submit"
          className={clsx("btn btn-md border border-black font-bold text-xl", {
            "bg-secondary text-white": !disableSubmit,
            "bg-black text-[#AAA]": disableSubmit,
          })}
        >
          {disableSubmit ? "..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
