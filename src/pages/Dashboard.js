import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import * as cvstfjs from "@microsoft/customvision-tfjs";
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Thumb from "../images/thumb.svg";
import ripe from "../images/ripe1.png";
import unripe from "../images/unripe1.png";
import "../App.css";

import { firebaseImageFolder } from "../utils/target_classes";
import Navbar from "../components/Navbar";
import RipeCard from "../components/RipeCard/RipeCard";
import { GetStatistics, Main, Statistics, Percentage, H12 } from "../styles";

function Dashboard() {
  const [allImages, setAllImages] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [model, setModel] = useState(null);

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
      const model = new cvstfjs.ObjectDetectionModel();
      await model.loadModelAsync(
        "https://tomato-final.s3.eu-west-3.amazonaws.com/tensorflowObjectDetectionModel/model.json"
      );
      const FirstImage = document.createElement("img");
      FirstImage.crossOrigin = "anonymous";
      FirstImage.src = first;
      FirstImage.hidden = true;
      FirstImage.onload = async () => {
        /*const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = FirstImage.width;
        canvas.height = FirstImage.height;
        context.drawImage(FirstImage, 0, 0, FirstImage.width, FirstImage.height);*/
        console.log("image is loaded");
        const result = await model.executeAsync(FirstImage);
        console.log("result", result);
      };
      document.body.appendChild(FirstImage);
      // console.log("res", res);
    };
    getSampleImage();
  }, []);

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
          <Percentage>
            <div>
              <img src={Thumb} style={{ width: "100%", height: "60px" }} />
            </div>
            <div>
              <H12>80%</H12>
            </div>
          </Percentage>
          <RipeCard
            src={unripe}
            heading="Unripe"
            value="80, 000"
            color="green"
            bgColor="green"
            bShadow="6px -6px 12px 3px rgba(0, 255, 0, 0.6)"
          />
        </Statistics>
        <GetStatistics>Get Statistics</GetStatistics>
      </Main>
    </div>
  );
}

export default Dashboard;
