import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from "@/firebase/fireabase.config";


const HandleFileUpload = () => {
    const storage = getStorage(app);

  //uploading image to firebase
  const uploadFile = async (img: any, name: string, folderName: string ) => {
    let imgUrl;
    const imageRef = ref(storage, `${folderName}/${name}`);
    try {
      const snapshot = await uploadBytes(imageRef, img);
      const url = await getDownloadURL(snapshot.ref);
      imgUrl = url;
    } catch (error) {
      // console.log(error);
    }
    return imgUrl;
  };




return { uploadFile };


}

export default HandleFileUpload