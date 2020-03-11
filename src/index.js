import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as handTrack from "handtrackjs";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");
let updateNote2 = document.getElementById("updatenote2");
let bodyUnit = document.getElementById("bodyUnit");

let isVideo = false;
let model = null;

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.9 // confidence threshold for predictions.
};

const startVideo = () => {
  handTrack.startVideo(video).then(function(status) {
    console.log("video started", status);
    if (status) {
      updateNote.innerText = "Video started. Now tracking";
      isVideo = true;
      runDetection();
    } else {
      updateNote.innerText = "Please enable video";
    }
  });
};

const toggleVideo = () => {
  if (!isVideo) {
    updateNote.innerText = "Starting video";
    startVideo();
  } else {
    updateNote.innerText = "Stopping video";
    handTrack.stopVideo(video);
    isVideo = false;
    updateNote.innerText = "Video stopped";
  }
};

trackButton.addEventListener("click", function() {
  toggleVideo();
});

const runDetection = () => {
  model.detect(video).then(predictions => {
    // console.log(Object.keys(predictions).length);
    if (Object.keys(predictions).length > 0) {
      console.log("Predictions: ", predictions[0].bbox);
      if (predictions[0].bbox[1] < 360) {
        console.log("Lower your hands!!");
        updateNote2.innerText = "Lower your hands!!";
        updateNote2.style.color = "red";
      } else {
        updateNote2.innerText = "Great job :) !";
        updateNote2.style.color = "green";
      }
    } else {
      updateNote2.innerText = "Great job :) ";
      updateNote2.style.color = "green";
    }

    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
};

// Load the model.
handTrack.load(modelParams).then(lmodel => {
  model = lmodel;
  updateNote.innerText = "Loaded Model!";
  trackButton.disabled = false;
});
