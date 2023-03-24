import styles from "./Nav.module.css";

import { useDirectoriesStore } from "../../store/storage";
import { getDirectories, entryFolder } from "../../api/storage";

export default function Nav() {
  const navs = useDirectoriesStore((state) => state.navs);
  const setNavs = useDirectoriesStore((state) => state.setNavs);
  const setDirectories = useDirectoriesStore((state) => state.setDirectories);
  const setTypeModal = useDirectoriesStore((state) => state.setTypeModal);
  //let renderNavs = navs.map((nav) => nav + " / ");

  function handleClick() {
    let newNav = navs.split("/");
    newNav = newNav.filter((nav) => nav !== "");
    newNav.pop();
    let removerLast = "";
    newNav.forEach((nav) => {
      nav = nav + "/";
      removerLast += nav;
    });
    entryFolder(removerLast).then((response) =>
      setDirectories({ directories: response.data.data })
    );
    setNavs({ navs: removerLast });
    setTypeModal({
      typeModal: {
        type: "",
        show: false,
      },
    });
  }

  function handleRefresh() {
    getDirectories().then((response) => {
      setDirectories({ directories: response.data.data });
      setNavs({ navs: "" });
    });
    setTypeModal({
      typeModal: {
        type: "",
        show: false,
      },
    });
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.storageIcon}
        src="http://192.168.1.207:5000/api/storage/icons?format=storage.svg"
        alt="storage"
        onClick={() => handleRefresh()}
      />
      <p className={styles.firstNav} onClick={() => handleClick()}>
        storage / {navs}
      </p>
    </div>
  );
}
