import { navigateToUrl } from "single-spa";
import "./index.css";

export default function Root() {
  return (
    <div className="navbar">
      <h1 className="logo" onClick={() => navigateToUrl("/")}>
        React Micro-frontend
      </h1>
      <div className="nav-items">
        <p className="nav-item" onClick={() => navigateToUrl("/rnm")}>
          Rick And Morty
        </p>
        <p className="nav-item" onClick={() => navigateToUrl("/got")}>
          Game of Thrones
        </p>
      </div>
    </div>
  );
}
