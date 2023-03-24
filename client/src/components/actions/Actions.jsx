import styles from "./Actions.module.css";
import iconMenu from "../../assets/icons/menu.svg";
import { useState } from "react";
import { useDirectoriesStore } from "../../store/storage";

export default function Actions() {
  const [showOptions, setShowOptions] = useState(false);
  const feedback = useDirectoriesStore((state) => state.feedback);
  function handleClick() {
    setShowOptions(!showOptions);
  }
  function handleOption(e) {
    useDirectoriesStore.setState({
      typeModal: { type: e.target.name, show: true },
    });
  }
  function handleOffFeedback() {
    useDirectoriesStore.setState({ feedback: { info: "", show: false } });
  }
  feedback.show ? setTimeout(handleOffFeedback, 3000) : "";
  return (
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
      <div className={styles.toast}>
        <p>{feedback.info}</p>
      </div>
    </div>
  );
}
