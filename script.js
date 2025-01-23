// Get the canvas and its context
const canvas = document.getElementById('dvdCanvas');
const ctx = canvas.getContext('2d');

// Get control elements
const widthInput = document.getElementById('logoWidth');
const heightInput = document.getElementById('logoHeight');
const restartBtn = document.getElementById('restartBtn');
const probabilityDisplay = document.getElementById('probabilityDisplay');

// Define the DVD logo properties
let dvdLogo = {
    width: parseInt(widthInput.value), // Dynamic width from input
    height: parseInt(heightInput.value), // Dynamic height from input
    x: Math.random() * (canvas.width - parseInt(widthInput.value)), // Random starting x position
    y: Math.random() * (canvas.height - parseInt(heightInput.value)), // Random starting y position
    dx: 3, // Horizontal velocity
    dy: 3, // Vertical velocity
    color: getRandomColor(), // Initial color
    text: 'DVD',
    font: '20px Arial'
};

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to draw the DVD logo
function drawLogo() {
    ctx.fillStyle = dvdLogo.color;
    ctx.fillRect(dvdLogo.x, dvdLogo.y, dvdLogo.width, dvdLogo.height);

    // Draw the text in the center of the logo
    ctx.fillStyle = '#FFFFFF'; // White text
    ctx.font = dvdLogo.font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dvdLogo.text, dvdLogo.x + dvdLogo.width / 2, dvdLogo.y + dvdLogo.height / 2);
}

// Function to update the logo's position
function updatePosition() {
    // Check for collision with the canvas boundaries
    if (dvdLogo.x + dvdLogo.dx > canvas.width - dvdLogo.width || dvdLogo.x + dvdLogo.dx < 0) {
        dvdLogo.dx = -dvdLogo.dx; // Reverse horizontal direction
        dvdLogo.color = getRandomColor(); // Change color on bounce
    }
    if (dvdLogo.y + dvdLogo.dy > canvas.height - dvdLogo.height || dvdLogo.y + dvdLogo.dy < 0) {
        dvdLogo.dy = -dvdLogo.dy; // Reverse vertical direction
        dvdLogo.color = getRandomColor(); // Change color on bounce
    }

    // Update position
    dvdLogo.x += dvdLogo.dx;
    dvdLogo.y += dvdLogo.dy;
}

// Function to calculate the probability of hitting a corner
function calculateProbability() {
    const cornerWidth = dvdLogo.width;
    const cornerHeight = dvdLogo.height;
    const cornerArea = (cornerWidth * cornerHeight) * 4; // Four corners
    const totalArea = canvas.width * canvas.height;
    const probability = (cornerArea / totalArea) * 100;
    return probability.toFixed(2);
}

// Function to update the probability display
function updateProbabilityDisplay() {
    const probability = calculateProbability();
    probabilityDisplay.textContent = `Probability: ${probability}%`;
}

// Animation loop
let animationId; // To keep track of the animation frame

function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update the logo
    drawLogo();
    updatePosition();
    updateProbabilityDisplay();

    // Request the next animation frame
    animationId = requestAnimationFrame(animate);
}

// Function to initialize or reset the simulation
function initializeSimulation() {
    // Reset logo properties based on input values
    dvdLogo.width = parseInt(widthInput.value);
    dvdLogo.height = parseInt(heightInput.value);
    dvdLogo.x = Math.random() * (canvas.width - dvdLogo.width);
    dvdLogo.y = Math.random() * (canvas.height - dvdLogo.height);
    dvdLogo.color = getRandomColor();

    // Optionally, reset velocities if desired
    dvdLogo.dx = 3;
    dvdLogo.dy = 3;

    // Start the animation
    cancelAnimationFrame(animationId); // Stop any existing animation
    animate();
}

// Event listener for the restart button
restartBtn.addEventListener('click', initializeSimulation);

// Event listener for changes in logo size inputs
widthInput.addEventListener('change', initializeSimulation);
heightInput.addEventListener('change', initializeSimulation);

// Start the initial animation
animate();