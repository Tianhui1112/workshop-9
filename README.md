# workshop_9:

You can view the generated effect by visiting the following link:

[View Workshop 9 Effect](  https://tianhui1112.github.io/workshop-9/)


## My Idea


My idea is to use the p5.js  to capture the video stream and process each pixel in every video frame to create a silhouette effect. Specifically, by checking the pixel brightness, we turn the darker areas into black (the silhouette) and the brighter areas into white (the background), thereby simulating the style of a Charlie Chaplin comedy.


## Project workflow


1.1: Create a canvas and start video capture.

```javascript
function setup() {
  createCanvas(640, 480); // Create a 640x480 canvas
  video = createCapture(VIDEO); // Start video capture
  video.size(width, height); // Set the video size to match the canvas
  video.hide(); // Hide the default video element (p5.js creates an HTML video element, which is hidden using `hide()`)
}
```
- `createCanvas(640, 480)`: Creates a canvas of size 640x480 pixels, used to display the captured video stream.
- `createCapture(VIDEO)`: Starts the video capture functionality, which by default grabs the video stream from the webcam.
- `video.size(width, height)`: Sets the video size to match the canvas size.
- `video.hide()`: Hides the HTML `<video>` element created by `createCapture`, so only the video displayed on the canvas is visible, without extra elements on the page.





1.2: Pixel processing for each video frame

1.2.1:  Display the captured video stream

```javascript
function draw() {
  image(video, 0, 0, width, height); // Display the captured video stream

  loadPixels(); // Load the current pixel data from the canvas

  // Process each pixel
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i]; // Get the value of the red channel
    let g = pixels[i + 1]; // Get the value of the green channel
    let b = pixels[i + 2]; // Get the value of the blue channel

    // Calculate the brightness (grayscale value) of the pixel
    let brightness = (r + g + b) / 3;

    // Apply silhouette effect based on the brightness
    if (brightness < 100) { // If brightness is low, display black (silhouette)
      pixels[i] = pixels[i + 1] = pixels[i + 2] = 0; // Set the red, green, and blue channels to 0 for black
    } else { // Otherwise, display white (background)
      pixels[i] = pixels[i + 1] = pixels[i + 2] = 255; // Set the red, green, and blue channels to 255 for white
    }
  }

  updatePixels(); // Update the pixel data on the canvas
}

```

```javascript 
image(video, 0, 0, width, height);
```

Function: Displays the video stream captured by createCapture(VIDEO) on the canvas.

Effect: The canvas shows a real-time video feed from the camera.

1.2.2: 
```javascript 
for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i]; // Get the value of the red channel
    let g = pixels[i + 1]; // Get the value of the green channel
    let b = pixels[i + 2]; // Get the value of the blue channel

    // Calculate the brightness (grayscale value) of the pixel
    let brightness = (r + g + b) / 3;

    // Apply silhouette effect based on the brightness
    if (brightness < 100) { // If brightness is low, display black (silhouette)
      pixels[i] = pixels[i + 1] = pixels[i + 2] = 0; // Set the red, green, and blue channels to 0 for black
    } else { // Otherwise, display white (background)
      pixels[i] = pixels[i + 1] = pixels[i + 2] = 255; // Set the red, green, and blue channels to 255 for white
    }
```

We first iterate through all the pixels:
```javascript
let r = pixels[i];
let g = pixels[i + 1];
let b = pixels[i + 2];
```
Then calculate the brightness based on the r, g, and b values:
```javascript
let brightness = (r + g + b) / 3;

```
Check if the brightness is below 100 (an empirically chosen threshold) and apply color replacement:
	•	If the brightness is low, set the pixel to black (R=0, G=0, B=0).
	•	If the brightness is high, set the pixel to white (R=255, G=255, B=255).
```javascript
if (brightness < 100) {
  pixels[i] = pixels[i + 1] = pixels[i + 2] = 0; // Black
} else {
  pixels[i] = pixels[i + 1] = pixels[i + 2] = 255; // White
}

```
