import styles from "./Directories.module.css";
import { useEffect } from "react";
import { getDirectories, entryFolder } from "../../api/storage";
import { useDirectoriesStore } from "../../store/storage";

export default function Directories() {
  const directories = useDirectoriesStore((state) => state.directories);
  const setDirectories = useDirectoriesStore((state) => state.setDirectories);
  const setNavs = useDirectoriesStore((state) => state.setNavs);
  const setFileInfo = useDirectoriesStore((state) => state.setFileInfo);
  const setTypeModal = useDirectoriesStore((state) => state.setTypeModal);

  useEffect(() => {
    async function api() {
      try {
        await getDirectories().then((response) =>
          setDirectories({ directories: response.data.data })
        );
      } catch (error) {
        console.log(error);
      }
    }
    api();
  }, []);

  async function handleClick(path, directory) {
    if (directory.type !== "folder") {
      setFileInfo({
        fileInfo: {
          file: directory.name,
          size: directory.size,
          type: directory.type,
        },
      });
      setTypeModal({
        typeModal: {
          type: "fileInfo",
          show: true,
        },
      });
      const element = document.querySelector("#modal");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    setNavs({ navs: path });
    try {
      await entryFolder(path).then((response) =>
        setDirectories({ directories: response.data.data })
      );
    } catch (error) {
      console.log(error);
    }

    setTypeModal({
      typeModal: {
        type: "",
        show: false,
      },
    });
  }
  if (directories.length === 0)
    return <div className={styles.containerEmpty}>empty</div>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapperIn}>
        {directories.map((directory) => (
          <div
            key={directory.id}
            className={styles.directory}
            onClick={() => handleClick(directory.path, directory)}
          >
            <div className={styles.directoryImg}>
              <img
                src={`http://192.168.1.207:5000/api/storage/icons?format=${directory.icon_path}`}
                alt={directory.name}
              ></img>
            </div>
            <div className={styles.directoryName}>{directory.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
