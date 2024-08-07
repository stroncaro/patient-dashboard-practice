import Prescription, { PrescriptionList } from "../../models/prescription";
import delay from "../../utils/delay";
import { UserService, PatientService } from "../services";

export interface PrescriptionService {
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

const SERVER_DELAY = 1;

export class MockPrescriptionService implements PrescriptionService {
  private static _instance: PrescriptionService;
  static get instance() {
    MockPrescriptionService._instance ??= new MockPrescriptionService();
    return MockPrescriptionService._instance as PrescriptionService;
  }

  private _prescriptions: PrescriptionList;
  private _nextId: number;

  private constructor() {
    this._nextId = 0;
    // TODO: delete later. For testing only!
    this._prescriptions = [
      new Prescription(this._getNextId(), 0, 1, "test prescription"),
    ];
  }

  async createPrescription(
    user: number,
    patient: number,
    content: string
  ): Promise<number> {
    const results = await Promise.all([
      UserService.instance.getUserExists(user),
      PatientService.getInstance().getPatientExists(patient),
    ]);

    if (!results[0] || !results[1]) {
      throw new Error("Invalid user and/or patient id");
    }

    await delay(SERVER_DELAY);
    const id = this._getNextId();
    const prescription = new Prescription(id, user, patient, content);
    this._prescriptions.push(prescription);
    return id;
  }

  async getPrescriptions(
    user?: number,
    patient?: number
  ): Promise<PrescriptionList> {
    await delay(SERVER_DELAY);

    if (user !== undefined) {
      if (patient !== undefined) {
        return this._prescriptions.filter(
          (prescription) =>
            prescription.userId === user && prescription.patientId === patient
        );
      } else {
        return this._prescriptions.filter(
          (prescription) => prescription.userId === user
        );
      }
    } else {
      if (patient !== undefined) {
        return this._prescriptions.filter(
          (prescription) => prescription.patientId === patient
        );
      } else {
        return this._prescriptions;
      }
    }
  }

  async updatePrescription(id: number, content: string) {
    await delay(SERVER_DELAY);

    const prescription = this._prescriptions.find(
      (prescription) => prescription.id === id
    );
    if (!prescription) {
      throw new Error(`Invalid prescription id: ${id}`);
    }

    prescription.content = content;
  }

  async deletePrescription(id: number): Promise<void> {
    await delay(SERVER_DELAY);

    const index = this._prescriptions.findIndex(
      (prescription) => prescription.id === id
    );
    if (index === -1) {
      throw new Error(`Invalid prescription id: ${id}`);
    }

    this._prescriptions = [
      ...this._prescriptions.slice(0, index),
      ...this._prescriptions.slice(index + 1),
    ];
  }

  private _getNextId(): number {
    return this._nextId++;
  }
}
