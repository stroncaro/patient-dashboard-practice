import { PrescriptionList } from "../../models/prescription";
import { PrescriptionService } from "../../services/services";

interface PrescriptionHook {
  createPrescription: (
    user: number,
    patient: number,
    content: string
  ) => Promise<number>;
  getPrescriptions: (
    user?: number,
    patient?: number
  ) => Promise<PrescriptionList>;
  updatePrescription: (id: number, content: string) => Promise<void>;
  deletePrescription: (id: number) => Promise<void>;
}

const usePrescriptions: () => PrescriptionHook = () => {
  const service = PrescriptionService.instance;

  return {
    createPrescription: service.createPrescription.bind(service),
    getPrescriptions: service.getPrescriptions.bind(service),
    updatePrescription: service.updatePrescription.bind(service),
    deletePrescription: service.deletePrescription.bind(service),
  };
};

export default usePrescriptions;
