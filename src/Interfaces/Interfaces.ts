export interface Company {
  id: number;
  name: string;
  counterWorkers: number;
  adress: string;
}
export interface Person {
  id: number;
  name: string;
  surname: string;
  jobTitle: string;
  company: number;
}
export interface EditWorkerProps {
  person: Person | null | undefined;
  setVisibleFormEdit: (visible: boolean) => void;
}
export interface EditCompanyProps {
  companyE: Company | null | undefined;
  setVisibleFormEdit: (visible: boolean) => void;
}
