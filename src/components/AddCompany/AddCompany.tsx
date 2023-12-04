import s from "./AddCompany.module.css";
import { addCompany } from "../../redux/slices/dataSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function AddCompany() {
  const dispatch = useDispatch();
  const [nameCompany, setNameCompany] = useState("");
  const [adressCompany, setAdressCompany] = useState("");
  

  const onChangeInputs = (
    event: React.ChangeEvent<HTMLInputElement>,
    functionState: (e: string) => void
  ) => {
    functionState(event.target.value);
  };

  const addComp = () => {
    dispatch(
      addCompany({
        name: nameCompany,
        counterWorkers: 0,
        adress: adressCompany,
      })
    );
    setNameCompany("");
    setAdressCompany("");
  };

  return (
    <div>     
        <div className={s.addCompanyForm}>          
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
          <button onClick={addComp}>Добавить</button>
        </div> 
    </div>
  );
}

export default AddCompany;
