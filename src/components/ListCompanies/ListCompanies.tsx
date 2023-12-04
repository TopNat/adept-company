import { RootState } from "../../redux/store";
import s from "./ListCompanies.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addListCompaniesView, delCompany } from "../../redux/slices/dataSlice";
import { useState } from "react";
import AddCompany from "../../components/AddCompany/AddCompany";
import EditCompany from "../EditCompany/EditCompany";
import { Company } from "../../Interfaces/Interfaces";

function ListCompanies() {
  const dispatch = useDispatch();
  const [checkedValue, setCheckedValue] = useState(false);
  const [visibleFormAdd, setVisibleFormAdd] = useState(false);
  const [visibleFormEdit, setVisibleFormEdit] = useState(false);
  const [editingCompany, setEditingCompany] = useState<
    Company | null | undefined
  >(null);

  const companies = useSelector(
    (state: RootState) => state.dataSlice.dataCompanies
  );

  const companiesList = useSelector(
    (state: RootState) => state.dataSlice.listCompaniesView
  );
  const toggleVisibleFormAdd = () => {
    setVisibleFormAdd(!visibleFormAdd);
  };
  const setCompany = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const companyId: number = Number(target.value);

    if (companiesList?.length) {
      if (companiesList.includes(companyId)) {
        let companiesNew: Array<number> = companiesList.filter(
          (item) => item !== companyId
        );
        dispatch(addListCompaniesView({ list: companiesNew }));
      } else {
        let companiesNew: Array<number> = companiesList;
        companiesNew = [...companiesNew, companyId];
        dispatch(addListCompaniesView({ list: companiesNew }));
      }
    } else {
      dispatch(addListCompaniesView({ list: [companyId] }));
    }
  };
  const getAllCompany = () => {
    if (checkedValue) {
      setCheckedValue(false);
      dispatch(addListCompaniesView({ list: [0] }));
    } else {
      setCheckedValue(true);
      let companiesNew: Array<number> = companiesList;
      companies.map((item) => (companiesNew = [...companiesNew, item.id]));
      dispatch(addListCompaniesView({ list: companiesNew }));
    }
  };
  const edit = (id: number) => {
    setVisibleFormEdit(true);
    setVisibleFormAdd(false);
    const companyEdit = companies.find((item: Company) => item.id === id);
    setEditingCompany(companyEdit);
  };

  const del = (id: number) => {
    dispatch(delCompany({ id: id }));
  };
  return (
    <div className={s.listCompanies}>
      <input type="checkbox" onChange={getAllCompany} checked={checkedValue} />
      <span>Выделить все</span>
      <div className={s.listCompanies__item}>
        <div className={s.listCompanies__item_width}>
          <h3>Наименование</h3>
        </div>
        <div>
          <h3>Кол-во сотрудников</h3>
        </div>
        <div> </div>
      </div>
      <div className={s.listCompanies__list}>
        {companies.map((item, index) => (
          <div
            key={index}
            className={`${
              companiesList?.includes(item.id)
                ? s.listCompanies__item_select
                : s.listCompanies__item
            }`}
          >
            <div className={s.listCompanies__item_width}>
              <input
                type="checkbox"
                onChange={(e) => setCompany(e)}
                value={item.id}
                checked={companiesList?.includes(item.id) ? true : false}
              />
              {item.name}
            </div>
            <div>{item.counterWorkers}</div>
            <div>
              <button onClick={() => del(item.id)}>Del</button>
              <button onClick={() => edit(item.id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={toggleVisibleFormAdd} className={s.addCompanyForm_open}>
        {visibleFormAdd ? "Скрыть форму" : "Добавить компанию"}
      </button>
      {visibleFormAdd && <AddCompany />}
      {visibleFormEdit && (
        <EditCompany
          companyE={editingCompany}
          setVisibleFormEdit={setVisibleFormEdit}
        />
      )}
    </div>
  );
}

export default ListCompanies;
