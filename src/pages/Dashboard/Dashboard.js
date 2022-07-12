import React, { useState, useEffect } from "react";
import app from "../../firebase/index";
import * as cvstfjs from "@microsoft/customvision-tfjs";
import Thumb from "../../images/thumb.svg";
import ripeImg from "../../images/ripe1.png";
import unripeImg from "../../images/unripe1.png";
import { imgArr } from "../../images/train";
// import testObj from "../../images/train/t7.jpg";
import "../../App.css";

import Navbar from "../../components/Navbar/Navbar";
import RipeCard from "../../components/RipeCard/RipeCard";
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
} from "../../styles";

function Dashboard() {
  const firebaseImageFolder = "tomatoimages";
  const [ripe, setRipe] = useState(0);
  const [unripe, setUnripe] = useState(0);
  const [percentageRipe, setPercentageRipe] = useState(0);
  const [allTom, setAllTom] = useState([]);
  const [contaminated, setContaminated] = useState(0);
  const [percentageContaminated, setPercentageContaminated] = useState(0);
  const [urlTot, setUrlTot] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statsTime, setStatsTime] = useState("");
  // 1 uncontaminated and 0 contaminated
  const handleLogout = () => {
    app.auth().signOut();
  };

  useEffect(() => {
    setAllTom(imgArr);
  }, []);

  const HandleLaterStats = () => {
    const date = new Date();
    console.log('now', date.toUTCString());
  }

  const trainHandler = async () => {
    // uncomment the line below to get the stored images in firebase
    // const imageRefs = await app
    //   .storage()
    //   .ref()
    //   .child(firebaseImageFolder)
    //   .listAll();
    // const urls = await Promise.all(
    //   imageRefs.items.map((ref) => ref.getDownloadURL())
    // );
    setUrlTot(allTom.length);
    allTom.forEach((image) => {
      const FirstImage = document.createElement("img");
      FirstImage.crossOrigin = "anonymous";
      FirstImage.src = image;
      FirstImage.hidden = true;
      FirstImage.onload = async () => {
        //object detection
        const detectionModel = new cvstfjs.ObjectDetectionModel();
        await detectionModel.loadModelAsync(
          "http://localhost/detection/model.json"
        );
        const detectionResult = await detectionModel.executeAsync(FirstImage);
        const [detected_boxes, detected_scores, detected_classes] =
          detectionResult;
        //classification
        const classificationModel = new cvstfjs.ClassificationModel();
        await classificationModel.loadModelAsync(
          "http://localhost/classification/model.json"
        );
        const classificationResult = await classificationModel.executeAsync(
          FirstImage
        );
        console.log("classifivation", classificationResult);
        let count = 0;
        for (let i = 0; i < detected_boxes.length; i++) {
          if (detected_classes[i] === 0 && detected_scores[i] >= 0.22) {
            setRipe((prev) => prev + 1);
          }
          if (detected_classes[i] === 1 && detected_scores[i] >= 0.23) {
            setUnripe((prev) => prev + 1);
          }
          if (classificationResult[0][0] > classificationResult[0][1]) {
            count++;
            console.log("counting", count);
            setContaminated(count);
            console.log("contaminated T", contaminated);
          }
          if (classificationResult[0][0] < classificationResult[0][1]) {
            setPercentageContaminated(0);
          }
          count = 0;
        }
      };
      document.body.appendChild(FirstImage);
    });
  };

  useEffect(() => {
    const ripePerc = ((ripe / (ripe + unripe)) * 100).toFixed(2);
    setPercentageRipe(ripePerc);
    //Assuming there are 2 contaminated tomatoes per image,
    if (contaminated != 0) {
      const conPerc = ((contaminated / urlTot) * 100 * 2).toFixed(2);
      const concPercTot = (conPerc / (contaminated * 2)).toFixed(2);
      setPercentageContaminated(concPercTot);
    } else {
      setPercentageContaminated(0);
    }
  }, [trainHandler]);

  return (
    <>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Percentage>
              <div>
                <img
                  src={Thumb}
                  style={{ width: "100%", height: "30px" }}
                  alt="okay"
                />
              </div>
              <div>
                <H11>{percentageRipe}%</H11>
              </div>
            </Percentage>
            {loading ? (
              <div className="model-loader">
                <div className="model-spinner"></div>
              </div>
            ) : null}
          </div>
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
            <H1>≈ {percentageContaminated}%</H1>
          </ConCard>
          <ConCard1>
            <H12>More Statistics ...</H12>
          </ConCard1>
        </ConStatistics>
      </Main>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#13033b",
          height: "18vh",
          position: "fixed",
        }}
      >
        {loading ? (
          <GetStatistics
            onClick={() => {
              setLoading(false);
            }}
          >
            Cancel
          </GetStatistics>
        ) : (
          <GetStatistics
            onClick={() => {
              setLoading(true);
              trainHandler();
            }}
          >
            Get Statistics
          </GetStatistics>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#13033b",
            height: "18vh",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{ color: "white", textAlign: "center", lineHeight: "16px" }}
          >
            set Period in HOURS
          </span>
          <div>
            <input
              style={{
                border: "none",
                width: "50%",
                height: "40px",
                borderRadius: "5px",
                marginLeft: "10px",
                fontSize: "30px",
                textAlign: "center",
                padding: "10px 0px",
                outline: 'none'
              }}
              type="number"
              value={statsTime}
              onChange={(e) => setStatsTime(e.target.value)}
            />
          </div>
          <button onClick={HandleLaterStats}>Get Stats Later</button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
