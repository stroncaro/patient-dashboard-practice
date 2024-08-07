export type PrescriptionList = Prescription[];

interface IPrescription {
  userId: number;
  patientId: number;
  content: string;
}

class Prescription implements IPrescription {
  id: number;
  userId: number;
  patientId: number;
  content: string;

  constructor(id: number, user: number, patient: number, content: string) {
    if (!Number.isInteger(id) || id < 0) {
      throw new Error(`Invalid id: ${id}`);
    }

    if (!Number.isInteger(user) || user < 0) {
      throw new Error(`Invalid user id: ${user}`);
    }

    if (!Number.isInteger(patient) || patient < 0) {
      throw new Error(`Invalid patient id: ${patient}`);
    }

    this.id = id;
    this.userId = user;
    this.patientId = patient;
    this.content = content;
  }
}

export default Prescription;
