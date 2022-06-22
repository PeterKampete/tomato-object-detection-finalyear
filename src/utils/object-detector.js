// import React, { useState, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import {loadGraphModel} from '@tensorflow/tfjs-converter';


// const loadImage = (onProgress) => {
    
// }
// const showProgress = (percentage) => {

// }
// const _logistic = () => {

// }
// const ANCHORS = [0.573, 0.677, 1.87, 2.06, 3.34, 5.47, 7.88, 3.53, 9.77, 9.17];
// const NEW_OD_OUTPUT_TENSORS = [
//   "detected_boxes",
//   "detected_scores",
//   "detected_classes",
// ];
// const predictImage = async () => {
//     console.log("Running predictions...");
//     await $(".progress-bar").html("Running predictions").promise();
//     const outputs = await model.executeAsync(
//       inputs,
//       is_new_od_model ? NEW_OD_OUTPUT_TENSORS : null
//     );
//     const arrays = !Array.isArray(outputs)
//       ? outputs.array()
//       : Promise.all(outputs.map((t) => t.array()));
//     let predictions = await arrays;
  
//     // Post processing for old models.
//     if (predictions.length != 3) {
//       console.log("Post processing...");
//       await $(".progress-bar").html("Post-processing V1 model").promise();
//       const num_anchor = ANCHORS.length / 2;
//       const channels = predictions[0][0][0].length;
//       const height = predictions[0].length;
//       const width = predictions[0][0].length;
  
//       const num_class = channels / num_anchor - 5;
  
//       let boxes = [];
//       let scores = [];
//       let classes = [];
  
//       for (var grid_y = 0; grid_y < height; grid_y++) {
//         for (var grid_x = 0; grid_x < width; grid_x++) {
//           let offset = 0;
  
//           for (var i = 0; i < num_anchor; i++) {
//             let x =
//               (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_x) /
//               width;
//             let y =
//               (_logistic(predictions[0][grid_y][grid_x][offset++]) + grid_y) /
//               height;
//             let w =
//               (Math.exp(predictions[0][grid_y][grid_x][offset++]) *
//                 ANCHORS[i * 2]) /
//               width;
//             let h =
//               (Math.exp(predictions[0][grid_y][grid_x][offset++]) *
//                 ANCHORS[i * 2 + 1]) /
//               height;
  
//             let objectness = tf.scalar(
//               _logistic(predictions[0][grid_y][grid_x][offset++])
//             );
//             let class_probabilities = tf
//               .tensor1d(
//                 predictions[0][grid_y][grid_x].slice(offset, offset + num_class)
//               )
//               .softmax();
//             offset += num_class;
  
//             class_probabilities = class_probabilities.mul(objectness);
//             let max_index = class_probabilities.argMax();
//             boxes.push([x - w / 2, y - h / 2, x + w / 2, y + h / 2]);
//             scores.push(class_probabilities.max().dataSync()[0]);
//             classes.push(max_index.dataSync()[0]);
//           }
//         }
//       }
  
//       boxes = tf.tensor2d(boxes);
//       scores = tf.tensor1d(scores);
//       classes = tf.tensor1d(classes);
  
//       const selected_indices = await tf.image.nonMaxSuppressionAsync(
//         boxes,
//         scores,
//         10
//       );
//       predictions = [
//         await boxes.gather(selected_indices).array(),
//         await scores.gather(selected_indices).array(),
//         await classes.gather(selected_indices).array(),
//       ];
//     }
//     console.log('predictions oohhh2', predictions);
  
//     return predictions;
// }

// const children = [];
// const removeHighlights = () => {
//     for (let i = 0; i < children.length; i++) {
//         imageOverlay.removeChild(children[i]);
//       }
//       children = [];
// }
// const highlightResults = (predictions) => {

// }