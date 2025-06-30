// Add Start Button functionality
const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('startScreen');
const mainContent = document.getElementById('mainContent');

// Reasons for love
const reasons = [
  "You always make me smile and laugh even on my worst days",
  "You never fail to make me happy",
  "You believe in me more than I believe in myself😗",
  "You give the best hugs and kisses in the world🥺",
  "You’re kind to everyone in my family",
  "Being with you feels like home🏠",
  "You make everything more fun when we're together🥹",
  "Every hour feels like seconds to me",
  "You have the most beautiful smile in the world❤️",
  "Your smell is addictive🤤",
];

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentReason = "";

// DOM elements for displaying reasons and favorites
const reasonDisplay = document.getElementById('reasonDisplay');
const generateBtn = document.getElementById('generateBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const favoritesListContainer = document.getElementById('favoritesListContainer');
const favoritesList = document.getElementById('favoritesList');

// Render favorites on page load
if (favorites.length > 0) {
  favoritesListContainer.style.display = 'block';
  favorites.forEach(addFavoriteToDOM);
}

// Handle Start Button click
startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none'; // Hide the Start Screen
  mainContent.style.display = 'block'; // Show the main content
});

// Generate a random reason
generateBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * reasons.length);
  currentReason = reasons[randomIndex];
  reasonDisplay.textContent = currentReason;
});

// Handle adding/removing from favorites
favoriteBtn.addEventListener('click', () => {
  if (!currentReason) return;

  const index = favorites.indexOf(currentReason);

  if (index === -1) {
    // Add to favorites
    favorites.push(currentReason);
    addFavoriteToDOM(currentReason);
  } else {
    // Remove from favorites
    favorites.splice(index, 1);
    removeFavoriteFromDOM(currentReason);
  }

  // Save to localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
});

// Function to add a favorite to the DOM
function addFavoriteToDOM(reason) {
  favoritesListContainer.style.display = 'block';

  const li = document.createElement('li');
  li.textContent = reason;
  li.classList.add('fade-in');
  li.setAttribute('data-reason', reason);

  // Add remove-on-click functionality
  li.addEventListener('click', () => {
    const index = favorites.indexOf(reason);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      li.remove();

      if (favorites.length === 0) {
        favoritesListContainer.style.display = 'none';
      }
    }
  });

  favoritesList.appendChild(li);
}

// Function to remove a favorite from the DOM
function removeFavoriteFromDOM(reason) {
  const items = document.querySelectorAll('#favoritesList li');
  items.forEach(li => {
    if (li.getAttribute('data-reason') === reason) {
      li.remove();
    }
  });

  if (favorites.length === 0) {
    favoritesListContainer.style.display = 'none';
  }
}