
import { getStorage, ref, deleteObject, } from "firebase/storage";
import { app } from "@/firebase/fireabase.config";
import { toast } from "react-hot-toast";


// Initialize Firebase Storage


// Function to delete an image using its download URL
async function deleteImage(downloadURL: string) {
    const storage = getStorage(app);

    // const pathArray = downloadURL.split('/');
    // const filePath = 'homeImages/heroImage-cf13f2a8-0005-4128-aff3-d5e71261ce1f'; 
    // const desertRef = ref(storage, filePath);
    const fileRef = ref(storage, downloadURL);

  // Delete the file
deleteObject(fileRef).then(() => {

  }).catch((error) => {


  });
}

export default deleteImage;