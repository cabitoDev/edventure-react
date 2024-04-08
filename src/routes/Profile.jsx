import { useState } from "react";

export const Profile = () => {
  const [file, setFile] = useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  return <>
  <Avatar src={file} className="w-20 h-20 text-large" />
          <h2>Add Image:</h2>
          <input type="file" onChange={handleChange} /></>
}
