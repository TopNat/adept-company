import ListCompanies from "../../components/ListCompanies/ListCompanies";
import ListWorkers from "../../components/ListWorkers/ListWorkers";

import "./Main.modules.css";

function Main() {
  return (
    <div className="main__section">
      <header className="header">
        <h1>Список компаний</h1>
      </header>
      <div className="main__main">
        <div className="main__column">
          <h2>Компании</h2>
          <ListCompanies />
        </div>
        <div className="main__column">
          <h2>Сотрудники</h2>
          <ListWorkers />
        </div>
      </div>
    </div>
  );
}

export default Main;
