let video;

function setup() {
  createCanvas(640, 480); // Create a canvas with a size of 640x480
  video = createCapture(VIDEO); // Start video capture
  video.size(width, height); // Adjust the video size to match the canvas
  video.hide(); // Hide the default video element
}

function draw() {
  image(video, 0, 0, width, height); // Display the video

  loadPixels(); // Load pixel data

  // Operate on each pixel
  for (let i = 0; i < pixels.length; i += 4) {
    // Get the red, green, and blue values of the pixel
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];
    
    // Calculate the brightness (grayscale) of the pixel
    let brightness = (r + g + b) / 3;
    
    // Set silhouette effect based on the brightness value
    if (brightness < 100) { // If the brightness is low, show black (silhouette)
      pixels[i] = pixels[i + 1] = pixels[i + 2] = 0; // Black
    } else { // Otherwise, show white (background)
      pixels[i] = pixels[i + 1] = pixels[i + 2] = 255; // White
    }
  }

  updatePixels(); // Update the pixel data
}