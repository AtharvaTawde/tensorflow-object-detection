import React, { useRef, useEffect } from "react";
import "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";

import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./drawingManager";

function App() {
  const webcam = useRef(null);
  const canvas = useRef(null);

  const detect = async (net) => {
    if (
      typeof webcam.current !== "undefined" &&
      webcam.current !== null &&
      webcam.current.video.readyState === 4
    ) {
      const video = webcam.current.video;
      const videoWidth = webcam.current.video.videoWidth;
      const videoHeight = webcam.current.video.videoHeight;

      webcam.current.video.width = videoWidth;
      webcam.current.video.height = videoHeight;

      canvas.current.width = videoWidth;
      canvas.current.height = videoHeight;

      const obj = await net.detect(video);
      console.log(obj);

      const ctx = canvas.current.getContext("2d");

      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    const run = async () => {
      const net = await cocossd.load();

      setInterval(() => {
        detect(net);
      }, 10);
    };
    run();
  }, []);

  const w = 640 * 1.25;
  const h = 480 * 1.25;

  return (
    <div className="App">
      <h1>Tensorflow Object Detection</h1>
      <h3>
        The word is the name of the object that is being detected. The number is
        the model's confidence level on how certain the model is that what it is
        saying is right.
      </h3>
      <header className="App-header">
        <Webcam
          ref={webcam}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: w,
            height: h,
          }}
        />

        <canvas
          ref={canvas}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: w,
            height: h,
          }}
        />
      </header>
      <h3>
        Uses the CocoSSD object detection model provided by Tensorflow.js.
      </h3>
    </div>
  );
}

export default App;
