import React, { useState, useEffect, useCallback } from "react";
import fire from "../firebase/index";
import * as cvstfjs from "@microsoft/customvision-tfjs";
import { imgArr } from "../images/train/index";
import Thumb from "../images/thumb.svg";
import ripeImg from "../images/ripe1.png";
import unripeImg from "../images/unripe1.png";
import "../App.css";

import { firebaseImageFolder, TARGET_CLASSES } from "../utils/target_classes";
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
  const [ripe, setRipe] = useState(0);
  const [unripe, setUnripe] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [tr1, tr2, tr3, tr4, tr5] = imgArr;
  // const imageRefs = await fire
  //   .storage()
  //   .ref()
  //   .child(firebaseImageFolder)
  //   .listAll();
  // const urls = await Promise.all(
  //   imageRefs.items.map((ref) => ref.getDownloadURL())
  // );
  // const [first] = urls;
  useEffect(() => {
    const getSampleImage = async () => {
      const FirstImage = document.createElement("img");
      FirstImage.crossOrigin = "anonymous";
      FirstImage.src = tr2;
      FirstImage.hidden = true;
      FirstImage.onload = async () => {
        const model = new cvstfjs.ObjectDetectionModel();
        await model.loadModelAsync("http://localhost/model.json");
        const result = await model.executeAsync(FirstImage);
        const [detected_boxes, detected_scores, detected_classes] = result;
        console.log("Results", result);
        var count = 0;
        for (let i = 0; i < detected_boxes.length; i++) {
          if (detected_classes[i] === 1 && detected_scores[i] >= 0.23) {
            count++;
            setUnripe(count);
          }
          if (detected_classes[i] === 0 && detected_scores[i] >= 0.22) {
            count++;
            setRipe(count);
          }
        }
      };
      document.body.appendChild(FirstImage);
    };
    getSampleImage();
  }, []);

  useEffect(() => {
    const totPerc = ((ripe / (ripe + unripe)) * 100).toFixed(2);
    setPercentage(totPerc);
  }, [ripe, unripe]);

  return (
    <div className="Dashboard">
      <Navbar handleLogout={handleLogout} />
      <Main>
        <RipeStatistics>
          <RipeCard
            src={ripeImg}
            heading="Ripe"
            value={ripe}
            color="rgb(137, 18, 18)"
            bShadow="0px 0px 3px 2px rgba(137, 18, 18, 0.2)"
          />
          <Percentage>
            <div>
              <img src={Thumb} style={{ width: "100%", height: "30px" }} />
            </div>
            <div>
              <H11>{percentage}%</H11>
            </div>
          </Percentage>
          <RipeCard
            src={unripeImg}
            heading="Unripe"
            value={unripe}
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
          backgroundColor: "#13033b",
          height: "100%",
        }}
      >
        <GetStatistics>Get Statistics</GetStatistics>
      </div>
    </div>
  );
}

export default Dashboard;
