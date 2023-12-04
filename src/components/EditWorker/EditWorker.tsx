import s from "./EditWorker.module.css";
import { editingWorker } from "../../redux/slices/dataSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { EditWorkerProps } from "../../Interfaces/Interfaces";

function EditWorker({ person, setVisibleFormEdit }: EditWorkerProps) {
  const dispatch = useDispatch();
  const [nameWorker, setNameWorker] = useState(person?.name);
  const [surnameWorker, setSurnameWorker] = useState(person?.surname);
  const [jobTitle, setJobTitle] = useState(person?.jobTitle);
  const [companyId, setCompanyId] = useState(person?.company);

  useEffect(() => {
    setNameWorker(person?.name);
    setSurnameWorker(person?.surname);
    setJobTitle(person?.jobTitle);
    setCompanyId(person?.company);
  }, [person]);

  const onChangeInputs = (
    event: React.ChangeEvent<HTMLInputElement>,
    functionState: (e: string) => void
  ) => {
    functionState(event.target.value);
  };

  const editWork = () => {
    dispatch(
      editingWorker({
        id: person?.id,
        name: nameWorker,
        surname: surnameWorker,
        jobTitle: jobTitle,
        company: companyId,
      })
    );
    setVisibleFormEdit(false);
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
        <button onClick={editWork}>Изменить</button>
      </div>
    </div>
  );
}

export default EditWorker;
