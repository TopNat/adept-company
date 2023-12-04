import s from "./EditCompany.module.css";
import { editingCompany } from "../../redux/slices/dataSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { EditCompanyProps } from "../../Interfaces/Interfaces";

function EditCompany({ companyE, setVisibleFormEdit }: EditCompanyProps) {
  const dispatch = useDispatch();
  const [nameCompany, setNameCompany] = useState(companyE?.name);
  const [adressCompany, setAdressCompany] = useState(companyE?.adress);

  useEffect(() => {
    setNameCompany(companyE?.name);
    setAdressCompany(companyE?.adress);
  }, [companyE]);

  const onChangeInputs = (
    event: React.ChangeEvent<HTMLInputElement>,
    functionState: (e: string) => void
  ) => {
    functionState(event.target.value);
  };

  const editComp = () => {
    dispatch(
      editingCompany({
        id: companyE?.id,
        name: nameCompany,
        adress: adressCompany,
        counterWorkers: companyE?.counterWorkers,
      })
    );
    setVisibleFormEdit(false);
  };

  return (
    <div  className={s.addCompanyForm}>
      <input
        type="text"
        value={nameCompany}
        placeholder="Название"
        onChange={(e) => onChangeInputs(e, setNameCompany)}
      />
      <input
        type="text"
        placeholder="Адрес"
        value={adressCompany}
        onChange={(e) => onChangeInputs(e, setAdressCompany)}
      />
      <button onClick={editComp}>Изменить</button>
    </div>
  );
}

export default EditCompany;
