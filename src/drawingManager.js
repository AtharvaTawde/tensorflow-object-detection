export const drawRect = (detections, ctx) => {
  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];
    const confidenceRating = prediction["score"];

    const color = "green";
    ctx.strokeStyle = color;
    ctx.font = "18px Ubuntu";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillText(text, x, y);
    ctx.fillText(confidenceRating.toFixed(3), x + Math.min(100, width), y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
