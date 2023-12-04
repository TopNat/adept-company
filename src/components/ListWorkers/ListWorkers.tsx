//import { addEditWorker } from "../../redux/slices/dataSlice";
import { delWorker } from "../../redux/slices/dataSlice";
import { RootState } from "../../redux/store";
import AddWorker from "../AddWorker/AddWorker";
import EditWorker from "../EditWorker/EditWorker";
import s from "./ListWorkers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Person } from "../../Interfaces/Interfaces";

function ListWorkers() {
  const dispatch = useDispatch();

  const [visibleFormAdd, setVisibleFormAdd] = useState(false);
  const [visibleFormEdit, setVisibleFormEdit] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null | undefined>(null);

  const toggleVisibleFormAdd = () => {
    setVisibleFormAdd(!visibleFormAdd);
    setVisibleFormEdit(false);
  };

  const workersList = useSelector(
    (state: RootState) => state.dataSlice.dataWorker
  );

  const companiesList = useSelector(
    (state: RootState) => state.dataSlice.listCompaniesView
  );

  const filterWorkers = () => {
    let newWorkers = workersList;
    newWorkers = newWorkers.filter((item) =>
      companiesList.includes(item.company)
    );

    return newWorkers;
  };

  const workers = filterWorkers();

  const edit = (id: number) => {
    setVisibleFormEdit(true);
    setVisibleFormAdd(false);
    const personEdit = workersList.find((item: Person) => item.id === id);
    setEditingPerson(personEdit);
  };

  const del = (id: number) => {
    dispatch(delWorker({ id: id }));
  };

  return (
    <div className={s.listWorkers}>
      <table className={s.listWorkers__table}>
        <tr>
          <td className={s.listWorkers__td}>
            <h3>Имя</h3>
          </td>
          <td className={s.listWorkers__td}>
            <h3>Фамилия</h3>
          </td>
          <td className={s.listWorkers__td}>
            <h3>Должность</h3>
          </td>
        </tr>
      </table>
      <div className={s.listWorkers__list}>
        <table className={s.listWorkers__table}>
          {workers.map((item, index) => (
            <tr>
              <td className={s.listWorkers__td}>{item.name}</td>{" "}
              <td className={s.listWorkers__td}>{item.surname}</td>{" "}
              <td className={`${s.listWorkers__td}`}>
                <div className={s.listWorkers__all}>
                  <span>{item.jobTitle} </span>
                  <div>
                    <button onClick={() => del(item.id)}>Del</button>
                    <button onClick={() => edit(item.id)}>Edit</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <button onClick={toggleVisibleFormAdd} className={s.addWorkerForm_close}>
        {visibleFormAdd ? "Скрыть форму" : "Добавить сотрудника"}
      </button>
      {visibleFormAdd && <AddWorker />}
      {visibleFormEdit && (
        <EditWorker
          person={editingPerson}
          setVisibleFormEdit={setVisibleFormEdit}
        />
      )}
    </div>
  );
}

export default ListWorkers;
