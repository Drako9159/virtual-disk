import { useEffect } from "react";
import { getDirectories } from "../api/storages";
import { useDirectoriesStore } from "../store/storage";

export default function Storage() {
  const directories = useDirectoriesStore((state) => state.directories);
  const setDirectories = useDirectoriesStore((state) => state.setDirectories);
  const aver = ["llol", "lolo"]
  
  


  return <div>storage</div>;
}
