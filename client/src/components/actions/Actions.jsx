import styles from "./Actions.module.css";
import iconMenu from "../../assets/icons/menu.svg";
import { useState } from "react";
import { useDirectoriesStore } from "../../store/storage";
import Feedback from "../feedback/Feedback";
export default function Actions() {
  const [showOptions, setShowOptions] = useState(false);
  const feedback = useDirectoriesStore((state) => state.feedback);
  function handleClick() {
    setShowOptions(!showOptions);
  }
  function handleOption(e) {
    const element = document.querySelector("#modal");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    useDirectoriesStore.setState({
      typeModal: { type: e.target.name, show: true },
    });
    setShowOptions(!showOptions);
  }
  function handleOffFeedback() {
    useDirectoriesStore.setState({ feedback: { info: "", show: false } });
  }
  feedback.show ? setTimeout(handleOffFeedback, 3000) : "";
  return (
    <>
      { feedback.show ? <Feedback /> : ""}
      <div className={styles.container}>
        <button className={styles.buttonAction} onClick={() => handleClick()}>
          <img className={styles.iconMenu} src={iconMenu}></img>
        </button>
        {showOptions ? (
          <div className={styles.options}>
            <button onClick={(e) => handleOption(e)} name="createFolder">
              Create Folder
            </button>
            <button onClick={(e) => handleOption(e)} name="uploadFile">
              Upload File
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
