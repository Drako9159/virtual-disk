import styles from "./Modal.module.css";
import { useDirectoriesStore } from "../../store/storage";
import { useState } from "react";
import ChargeAnimation from "../../pages/ChargeAnimation";
import {
  createFolder,
  getDirectories,
  entryFolder,
  uploadFile,
} from "../../api/storage";

export default function Modal() {
  const fileInfo = useDirectoriesStore((state) => state.fileInfo);
  const typeModal = useDirectoriesStore((state) => state.typeModal);
  const setFeedback = useDirectoriesStore((state) => state.setFeedback);
  const navs = useDirectoriesStore((state) => state.navs);
  const setChargeAnimationActive = useDirectoriesStore(
    (state) => state.setChargeAnimationActive
  );
  const chargeAnimationActive = useDirectoriesStore(
    (state) => state.chargeAnimationActive
  );
  const [folderName, setFolderName] = useState();
  const [file, setFile] = useState();
  function handleKeyDown(e) {
    if (e.key === "Enter" && folderName) {
      handleCreateFolder();
    }
  }
  async function refresh() {
    if (navs === "") {
      await getDirectories().then((response) =>
        useDirectoriesStore.setState({ directories: response.data.data })
      );
    } else {
      await entryFolder(navs).then((response) =>
        useDirectoriesStore.setState({ directories: response.data.data })
      );
    }
  }
  async function handleCreateFolder() {
    //console.log(navs)
    await createFolder(navs + folderName)
      .then((res) => {
        refresh();
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setFeedback({
          feedback: { info: err.response.data.error, show: true },
        });
      });
  }
  function handleClose() {
    useDirectoriesStore.setState({ typeModal: { type: "", show: false } });
  }
  function handleChangeUploadFile(e) {
    const file = e.target.files[0];
    setFile(file);
  }
  async function handleUploadFile() {
    setChargeAnimationActive({ chargeAnimationActive: true });
    await uploadFile(navs, file).then((res) => {
      refresh();
      setChargeAnimationActive({ chargeAnimationActive: false });
    });
  }

  return (
    <div className={styles.container}>
      {typeModal.show && typeModal.type === "fileInfo" ? (
        <div>
          <div className={styles.modalInfo}>
            <div className={styles.left}>
              <div>
                <p> file: {fileInfo.file}</p>
              </div>
              <p> size: {fileInfo.size}</p>
              <p> type: {fileInfo.type}</p>
            </div>
            <div className={styles.right}>
              <a
                target="_blank"
                href={`http://192.168.1.207:5000/api/storage/download?file=${
                  navs + fileInfo.file
                }`}
                className={styles.buttonDownload}
              >
                download
              </a>
            </div>
          </div>
          <div>
            <button
              onClick={() => handleClose()}
              className={styles.buttonClose}
            >
              X
            </button>
          </div>
        </div>
      ) : typeModal.type === "createFolder" ? (
        <div>
          <div className={styles.modalCreateFolder}>
            <input
              type="text"
              placeholder="folder name"
              ref={(input) => input && input.focus()}
              onKeyDown={handleKeyDown}
              onChange={(e) => setFolderName(e.target.value)}
            ></input>
            <button onClick={handleCreateFolder}>create</button>
          </div>
          <div>
            <button
              onClick={() => handleClose()}
              className={styles.buttonClose}
            >
              X
            </button>
          </div>
        </div>
      ) : typeModal.type === "uploadFile" ? (
        <div>
          <div className={styles.modalUploadFile}>
            <label htmlFor="files">Select file</label>
            <input
              onChange={handleChangeUploadFile}
              type="file"
              name="files"
              id="files"
            ></input>
            <button onClick={handleUploadFile}>Upload</button>
          </div>
          <div>
            <button
              onClick={() => handleClose()}
              className={styles.buttonClose}
            >
              X
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {chargeAnimationActive ? <ChargeAnimation /> : ""}
    </div>
  );
}
