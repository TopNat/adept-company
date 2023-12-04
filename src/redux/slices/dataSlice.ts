import { createSlice } from "@reduxjs/toolkit";
import { getUniqId } from "../../utils/helpers";
import { Company, Person } from "../../Interfaces/Interfaces";

const dataSlice = createSlice({
  name: "dataSlice",
  initialState: {
    dataCompanies: [
      { id: 1, name: "Компания 1", counterWorkers: 0, adress: "adress" },
      { id: 2, name: "Компания 2", counterWorkers: 4, adress: "adress" },
      { id: 3, name: "Компания 3", counterWorkers: 0, adress: "adress" },
      { id: 4, name: "Компания 4", counterWorkers: 1, adress: "adress" },
      { id: 5, name: "Компания 5", counterWorkers: 1, adress: "adress" },
    ] as Company[],
    dataWorker: [
      {
        id: 1,
        name: "Имя1",
        surname: "Фамилия1",
        jobTitle: "должность1",
        company: 2,
      },
      {
        id: 2,
        name: "Имя2",
        surname: "Фамилия2",
        jobTitle: "должность2",
        company: 2,
      },
      {
        id: 3,
        name: "Имя3",
        surname: "Фамилия3",
        jobTitle: "должность3",
        company: 2,
      },
      {
        id: 4,
        name: "Имя4",
        surname: "Фамилия4",
        jobTitle: "должность4",
        company: 4,
      },
      {
        id: 5,
        name: "Имя5",
        surname: "Фамилия5",
        jobTitle: "должность5",
        company: 2,
      },
      {
        id: 6,
        name: "Имя6",
        surname: "Фамилия6",
        jobTitle: "должность6",
        company: 5,
      },
    ] as Person[],
    listCompaniesView: [0] as number[],
  },
  reducers: {
    addCompany: (state, actions) => {
      state.dataCompanies.push({
        id: getUniqId(state.dataCompanies),
        name: actions.payload.name,
        counterWorkers: 0,
        adress: actions.payload.adress,
      });
    },
    editingCompany: (state, actions) => {
      state.dataCompanies = state.dataCompanies.map((item) => {
        return item.id === actions.payload.id
          ? {
              ...item,
              name: actions.payload.name,
              adress: actions.payload.adress,
            }
          : item;
      });
    },
    delCompany: (state, actions) => {
      const dataWorkersNew = state.dataWorker.filter(
        (item) => item.company !== actions.payload.id
      );
      state.dataWorker = dataWorkersNew;
      const delIndex = state.dataCompanies.findIndex(
        (item: Company) => item.id === actions.payload.id
      );
      state.dataCompanies.splice(delIndex, 1);
    },
    addWorker: (state, actions) => {
      state.dataWorker.push({
        id: getUniqId(state.dataWorker),
        name: actions.payload.name,
        surname: actions.payload.surname,
        jobTitle: actions.payload.jobTitle,
        company: Number(actions.payload.company),
      });
      state.dataCompanies = state.dataCompanies.map((item) => {
        let counterW = item.counterWorkers + 1;
        return item.id === Number(actions.payload.company)
          ? { ...item, counterWorkers: counterW }
          : item;
      });
    },
    addListCompaniesView: (state, actions) => {
      state.listCompaniesView = actions.payload.list;
    },
    editingWorker: (state, actions) => {
      state.dataWorker = state.dataWorker.map((item) => {
        return item.id === actions.payload.id
          ? {
              ...item,
              name: actions.payload.name,
              surname: actions.payload.surname,
              jobTitle: actions.payload.jobTitle,
              company: actions.payload.company,
            }
          : item;
      });
    },
    delWorker: (state, actions) => {
      const delIndex = state.dataWorker.findIndex(
        (item: Person) => item.id === actions.payload.id
      );
      const company = state.dataWorker[delIndex].company;
      const companyIndex = state.dataCompanies.findIndex(
        (item: Company) => item.id === company
      );
      state.dataCompanies[companyIndex].counterWorkers =
        state.dataCompanies[companyIndex].counterWorkers - 1;
      state.dataWorker.splice(delIndex, 1);
    },
  },
});

export const {
  addCompany,
  addWorker,
  addListCompaniesView,
  editingWorker,
  delWorker,
  delCompany,
  editingCompany,
} = dataSlice.actions;
export default dataSlice.reducer;
