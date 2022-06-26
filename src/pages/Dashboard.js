import React, { useState, useEffect } from "react";
import fire from "../firebase/index";
import * as cvstfjs from "@microsoft/customvision-tfjs";
import Thumb from "../images/thumb.svg";
import ripe from "../images/ripe1.png";
import unripe from "../images/unripe1.png";
import "../App.css";

import { firebaseImageFolder } from "../utils/target_classes";
import Navbar from "../components/Navbar/Navbar";
import RipeCard from "../components/RipeCard/RipeCard";
import {
  GetStatistics,
  Main,
  ConStatistics,
  Percentage,
  H12,
  RipeStatistics,
  ConCard,
  ConCard1,
  H11,
  H1,
} from "../styles";

function Dashboard({ handleLogout }) {
  const [allImages, setAllImages] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const getSampleImage = async () => {
      const imageRefs = await fire
        .storage()
        .ref()
        .child(firebaseImageFolder)
        .listAll();
      const urls = await Promise.all(
        imageRefs.items.map((ref) => ref.getDownloadURL())
      );
      // setAllImages(urls);
      const [first] = urls;

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
        console.log("first image is loaded", FirstImage);
        const model = new cvstfjs.ObjectDetectionModel();
        await model.loadModelAsync(
          "https://tomato-final.s3.eu-west-3.amazonaws.com/tensorflowObjectDetectionModel/model.json"
        );
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
      <Navbar handleLogout={handleLogout} />
      <Main>
        <RipeStatistics>
          <RipeCard
            src={ripe}
            heading="Ripe"
            value="20, 000"
            color="rgb(137, 18, 18)"
            bShadow="0px 0px 3px 2px rgba(137, 18, 18, 0.2)"
          />
          <Percentage>
            <div>
              <img src={Thumb} style={{ width: "100%", height: "30px" }} />
            </div>
            <div>
              <H11>80%</H11>
            </div>
          </Percentage>
          <RipeCard
            src={unripe}
            heading="Unripe"
            value="80, 000"
            color="green"
            bShadow="0px 0px 3px 2px rgba(0, 255, 0, 0.2)"
          />
        </RipeStatistics>
        <ConStatistics>
          <ConCard>
            <H11>Contamination percentage</H11>
            <H1>60%</H1>
          </ConCard>
          <ConCard1>
            <H12>other statistics</H12>
          </ConCard1>
        </ConStatistics>
      </Main>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#13033b',
          height: '100%',
        }}
      >
        <GetStatistics>Get Statistics</GetStatistics>
      </div>
    </div>
  );
}

export default Dashboard;
