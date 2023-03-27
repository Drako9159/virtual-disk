import Directories from "../components/storage/Directories";
import Nav from "../components/storage/Nav";
import Modal from "../components/storage/Modal";
import Actions from "../components/storage/Actions";

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
