import s from "./AddWorker.module.css";
import { addWorker } from "../../redux/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../redux/store";
import { Company } from "../../Interfaces/Interfaces";

function AddWorker() {
  const dispatch = useDispatch();
  const [nameWorker, setNameWorker] = useState("");
  const [surnameWorker, setSurnameWorker] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyId, setCompanyId] = useState("0");

  const companies = useSelector(
    (state: RootState) => state.dataSlice.dataCompanies
  );

  const onChangeInputs = (
    event: React.ChangeEvent<HTMLInputElement>,
    functionState: (e: string) => void
  ) => {
    functionState(event.target.value);
  };

  const onChangeSelects = (
    event: React.ChangeEvent<HTMLSelectElement>,
    functionState: (e: string) => void
  ) => {
    functionState(event.target.value);
  };

  const addWork = () => {
    dispatch(
      addWorker({
        name: nameWorker,
        surname: surnameWorker,
        jobTitle: jobTitle,
        company: companyId,
      })
    );
    setNameWorker("");
    setSurnameWorker("");
    setJobTitle("");
    setCompanyId("0");
  };


  return (
    <div>
      <div className={s.addWorkerForm}>
        <input
          type="text"
          placeholder="Имя"
          value={nameWorker}
          onChange={(e) => onChangeInputs(e, setNameWorker)}
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={surnameWorker}
          onChange={(e) => onChangeInputs(e, setSurnameWorker)}
        />
        <input
          type="text"
          placeholder="Должность"
          value={jobTitle}
          onChange={(e) => onChangeInputs(e, setJobTitle)}
        />
        <select
          onChange={(e) => onChangeSelects(e, setCompanyId)}
          value={companyId}
        >
          <option value={0}>Выберите компанию...</option>
          {companies.map((item: Company) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        <button onClick={addWork}>Добавить</button>
      </div>
    </div>
  );
}

export default AddWorker;
