import Directories from "../components/storage/Directories";
import Nav from "../components/nav/Nav";
import Modal from "../components/modal/Modal";
import Actions from "../components/actions/Actions";

export default function Storage() {
  return (
    <>
      <Nav />
      <Modal />
      <Directories />
      <Actions />
    </>
  );
}
