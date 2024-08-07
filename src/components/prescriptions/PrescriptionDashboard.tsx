import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Prescription, { PrescriptionList } from "../../models/prescription";
import usePrescriptions from "../../hooks/prescriptions/usePrescriptions";
import PrescriptionForm from "./PrescriptionForm";
import User from "../../models/user";
import ModalBox from "../common/ModalBox";
import usePatients from "../../hooks/patients/usePatients";
import Patient, { PatientList } from "../../models/patient";

import { IoTrashBin as IconBin } from "react-icons/io5";
import { FaPen as IconPen } from "react-icons/fa6";

type PrescriptionListMap = { [key: string]: PrescriptionList };

function _createPatientNameToPrescriptionMap(
  prescriptions: PrescriptionList,
  patients: PatientList
): PrescriptionListMap {
  const patientId_prescriptions_map: PrescriptionListMap = prescriptions.reduce(
    (prev: PrescriptionListMap, prescription) => {
      if (prev[prescription.patientId]) {
        prev[prescription.patientId].push(prescription);
      } else {
        prev[prescription.patientId] = [prescription];
      }
      return prev;
    },
    {}
  );

  const patientName_prescriptions_map: PrescriptionListMap = Object.keys(
    patientId_prescriptions_map
  ).reduce((prev, id) => {
    const patient = patients.find((patient) => patient.id === Number(id));
    if (patient) {
      return {
        ...prev,
        [patient.getFullName()]: patientId_prescriptions_map[id],
      };
    } else {
      return prev;
    }
  }, {});

  return patientName_prescriptions_map;
}

type PrescriptionDashboardFormState = "none" | "add" | "edit";

const PrescriptionDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  const {
    getPrescriptions,
    createPrescription,
    deletePrescription,
    updatePrescription,
  } = usePrescriptions();
  const { patients, fetchPatientPageAsync } = usePatients();
  const [prescriptions, setPrescriptions] = useState<PrescriptionList>([]);
  const [working, setWorking] = useState<boolean>(false);
  const [form, setForm] = useState<PrescriptionDashboardFormState>("none");
  const [formInitialPatient, setFormInitialPatient] = useState<Patient | null>(
    null
  );
  const [formInitialPrescription, setFormInitialPrescription] =
    useState<Prescription | null>(null);
  const [disableFormInteraction, setDisableFormInteraction] =
    useState<boolean>(false);

  const [selectedPrescription, setSelectedPrescription] = useState<{
    patientIndex: number;
    prescriptionIndex: number;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setWorking(true);
      Promise.all([
        getPrescriptions(user.id as number),
        fetchPatientPageAsync(),
      ])
        .then(([prescriptions, _]) => setPrescriptions(prescriptions))
        .catch((error) => console.error(error))
        .finally(() => setWorking(false));
    }
  }, []);

  const patientPrescriptionMap = _createPatientNameToPrescriptionMap(
    prescriptions,
    patients
  );

  const handleFormSubmit: (
    patientId: number,
    content: string,
    prescriptionId?: number
  ) => Promise<void> = async (patientId, content, prescriptionId) => {
    setDisableFormInteraction(true);

    try {
      switch (form) {
        case "add":
          await createPrescription(
            (user as User).id as number,
            patientId,
            content
          );
          break;
        case "edit":
          if (!prescriptionId) {
            throw new Error(
              "Invalid state: trying to edit a prescription without providing prescription id"
            );
          }
          await updatePrescription(prescriptionId, content);
      }
    } catch (error) {
      throw error;
    } finally {
      setDisableFormInteraction(false);
    }

    setForm("none");
    setWorking(true);
    const prescriptions = await getPrescriptions((user as User).id as number);
    setPrescriptions(prescriptions);
    setWorking(false);
  };

  const handlePrescriptionClick = (
    patientIndex: number,
    prescriptionIndex: number
  ) => {
    if (
      selectedPrescription &&
      selectedPrescription.patientIndex === patientIndex &&
      selectedPrescription.prescriptionIndex === prescriptionIndex
    ) {
      setSelectedPrescription(null);
    } else {
      setSelectedPrescription({
        patientIndex: patientIndex,
        prescriptionIndex: prescriptionIndex,
      });
    }
  };

  // const handlePrescriptionViewClick;
  const handlePrescriptionEditClick = (prescription: Prescription) => {
    const patient = patients.find((p) => p.id === prescription.patientId);
    if (!patient) return;

    setFormInitialPatient(patient);
    setFormInitialPrescription(prescription);
    setForm("edit");
  };

  const handlePrescriptionDeleteClick = (prescription: Prescription) => {
    setWorking(true);
    deletePrescription(prescription.id)
      .then(() => getPrescriptions((user as User).id as number))
      .then((prescriptions) => setPrescriptions(prescriptions))
      .catch((error) => console.error(error))
      .finally(() => setWorking(false));
  };

  return (
    <div className="w-1/2">
      {/* Ask for login */}
      {!user && (
        <>
          <div className="my-4">
            <h1 className="text-3xl font-bold">Content not accessible</h1>
            <hr />
          </div>
          <p>Must be logged in</p>
        </>
      )}

      {/* Content */}
      {user && (
        <>
          {/* Title */}
          <div className="my-4">
            <h1 className="text-3xl font-bold">Your prescriptions</h1>
            <hr />
          </div>

          {/* List */}
          <div>
            {working && <p>Loading...</p>}
            {!working && prescriptions.length === 0 && (
              <p>You have no prescriptions</p>
            )}
            {!working && prescriptions.length > 0 && (
              <ul>
                {Object.entries(patientPrescriptionMap).map(
                  ([patientName, patientPrescriptions], patientIndex) => (
                    <ul key={patientIndex} className="list-disc list-inside">
                      <div className="hover:bg-primary px-2 italic">
                        {patientName} ({patientPrescriptions.length})
                      </div>
                      {patientPrescriptions.map(
                        (prescription, prescriptionIndex) => (
                          <li
                            key={`${patientIndex},${prescriptionIndex}`}
                            className="w-full px-2 hover:bg-primary flex items-center before:content-['●'] before:mr-4"
                            onClick={() =>
                              handlePrescriptionClick(
                                patientIndex,
                                prescriptionIndex
                              )
                            }
                          >
                            {prescription.content}
                            {selectedPrescription &&
                              selectedPrescription.patientIndex ===
                                patientIndex &&
                              selectedPrescription.prescriptionIndex ===
                                prescriptionIndex && (
                                <div className="flex gap-1 text-xs ml-auto [&>button]:w-5 [&>button]:h-5 [&>button]:bg-black [&>button]:text-white [&>button]:rounded [&>button]:border [&>button]:border-black [&>button:hover]:bg-white [&>button:hover]:text-black [&>button]:flex [&>button]:justify-center [&>button]:items-center">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handlePrescriptionEditClick(prescription)
                                    }
                                  >
                                    <IconPen />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handlePrescriptionDeleteClick(
                                        prescription
                                      )
                                    }
                                  >
                                    <IconBin />
                                  </button>
                                </div>
                              )}
                          </li>
                        )
                      )}
                    </ul>
                  )
                )}
              </ul>
            )}
          </div>

          {/* Button area */}
          {!working && (
            <div className="m-4 flex justify-end">
              <button
                className="btn btn-md bg-secondary border border-black text-white font-bold"
                // TODO: set actual onClick function, this is for testing
                onClick={() => setForm("add")}
              >
                +
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal Form */}
      {form !== "none" && (
        <ModalBox
          title={form === "add" ? "Add Prescription" : "Edit Prescription"}
          onClose={() => setForm("none")}
        >
          <PrescriptionForm
            {...(formInitialPatient
              ? { patient: formInitialPatient }
              : { patients: patients })}
            prescription={formInitialPrescription ?? undefined}
            onSubmit={handleFormSubmit}
            disableSubmit={disableFormInteraction}
            disableInput={disableFormInteraction}
          />
        </ModalBox>
      )}
    </div>
  );
};

export default PrescriptionDashboard;
