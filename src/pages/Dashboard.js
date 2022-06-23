import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import * as cvstfjs from "@microsoft/customvision-tfjs";
import image from "../images/0025.jpg";
import ripe from "../images/ripe.jpg";
import unripe from "../images/unripe.jpg";
import "../App.css";

import { firebaseImageFolder } from "../utils/target_classes";
import Navbar from "../components/navbar";
import RipeCard from "../components/RipeCard/RipeCard";
import { Button, Main, Statistics } from "../styles";
import { base64 } from "../utils/base64";

function Dashboard() {
  const [allImages, setAllImages] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [model, setModel] = useState(null);
  console.log('image', allImages);

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
      // setAllImages(urls);
      const [first] = urls;
      console.log('first',first);
      const model = new cvstfjs.ObjectDetectionModel();
      await model.loadModelAsync(
        "https://tomato-final.s3.eu-west-3.amazonaws.com/tensorflowObjectDetectionModel/model.json"
      );
      const FirstImage = document.createElement('img');
      FirstImage.src = first;
      FirstImage.hidden = true;
      // FirstImage.crossOrigin = 'anonymous';
      FirstImage.onload = async () => {
        /*const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = FirstImage.width;
        canvas.height = FirstImage.height;
        context.drawImage(FirstImage, 0, 0, FirstImage.width, FirstImage.height);*/
        console.log('image is loaded');
        const result = await model.executeAsync(FirstImage);
        console.log("result", result);
      }
      document.body.appendChild(FirstImage);
      // console.log("res", res);
    };
    getSampleImage();
  }, []);



  // useEffect(() => {
  //   const loadModel = async () => {
  //     setModelLoaded(false);
     
  //     const [ first ] = allImages;
  //     console.log('first1', first);
  //     // const image = document.getElementById('image');
  //     const result = await model.executeAsync(base64);
  //     console.log("result", result);
  //     // const [detected_boxes, detected_scores, detected_classes] = result
  //     // console.log('result', detected_boxes, detected_scores, detected_classes);
  //     // setModel(newModel);
  //     // setModelLoaded(true);
  //   };
  //   loadModel();
  // }, [allImages]);
  return (
    <div className="Dashboard">
      <Navbar />
      {modelLoaded ? <div>Loading Model</div> : <div>loading model...</div>}

      <Main>
        <Statistics>
          <RipeCard
            src={ripe}
            heading="Ripe"
            value="20, 000"
            color="rgb(137, 18, 18)"
            bgColor="rgb(137, 18, 18)"
            bShadow="-6px -6px 12px 3px rgba(137, 18, 18, 0.6)"
          />
          <RipeCard
            src={unripe}
            heading="Unripe"
            value="80, 000"
            color="green"
            bgColor="green"
            bShadow="6px -6px 12px 3px rgba(0, 255, 0, 0.6)"
          />
        </Statistics>
        <Button>Get Statistics</Button>
      </Main>
    </div>
  );
}

export default Dashboard;
