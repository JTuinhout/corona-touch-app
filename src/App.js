import React from "react";
// import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App bx--body p20" id="bodyUnit">
      <div className="mb10">
        <button
          id="trackbutton"
          className="bx--btn bx--btn--secondary"
          type="button"
          disabled
        >
          Start Video
        </button>
        <div id="updatenote" className="updatenote mt10">
          loading model ..
        </div>
      </div>
      <canvas id="canvas" className="border canvasbox"></canvas>
      <video
        className="videobox canvasbox2"
        autoPlay="autoplay"
        id="myvideo"
        size="10"
      ></video>

      <img
        src="images/1.jpg"
        className="canvasbox  hidden"
        id="handimage"
        alt=""
      />

      <span id="updatenote2"> Hand status</span>
    </div>
  );
}

export default App;
