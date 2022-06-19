import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";

import { firebaseImageFolder } from './utils/target_classes'

function App() {
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const getSampleImage = async () => {
      const imageRefs = await firebase
        .storage()
        .ref()
        .child(firebaseImageFolder)
        .listAll();
      const urls = await Promise.all(
        imageRefs.items.map((ref) => ref.getDownloadURL())
      );
      setAllImages(urls);
    };
    getSampleImage();
  }, []);

  return (
    <div className="App">
      {
        allImages.map((image) => <h6>{image}</h6>)
      }
    </div>
  );
}

export default App;
