import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import * as cvstfjs from "@microsoft/customvision-tfjs";
import image from "../images/0025.jpg";
import "../App.css";

import { firebaseImageFolder } from "../utils/target_classes";
import Navbar from "../components/navbar";
import { Button, Main } from "../styles";
import { base64 } from '../utils/base64'

function Home() {
  const [allImages, setAllImages] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [model, setModel] = useState(null);
  console.log(image);

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

  useEffect(() => {
    const loadModel = async () => {
      setModelLoaded(false);
      const model = new cvstfjs.ObjectDetectionModel();
      const res = await model.loadModelAsync(
        "https://tomato-final.s3.eu-west-3.amazonaws.com/tensorflowObjectDetectionModel/model.json"
      );
      console.log("res", res);
      // const image = document.getElementById('image');
      const result = await model.executeAsync(base64);
      console.log("result", result);
      // const [detected_boxes, detected_scores, detected_classes] = result
      // console.log('result', detected_boxes, detected_scores, detected_classes);
      // setModel(newModel);
      // setModelLoaded(true);
    };
    loadModel();
  }, [allImages]);
  return (
    <div className="Home">
      <Navbar />
      {modelLoaded ? <div>Loading Model</div> : <div>loading model...</div>}

      <Main>
        <div>
          {/* {allImages.map((image) => (
            <h6 key={Math.random()}>{image}</h6>
          ))} */}
        </div>
        <Button>Get Statistics</Button>
      </Main>
    </div>
  );
}

export default Home;
