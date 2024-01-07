
    // scripts.js
document.addEventListener('DOMContentLoaded', function () {
    // ... Existing code
  
    // Sample artworks data (replace this with actual data from a database)
    const artworksData = [
        { id: 1, artist: 'Pablo Picasso', title: 'Guernica', price: 200000000, imageUrl: 'https://www.un.org/ungifts/sites/www.un.org.ungifts/files/unny066l.jpg' },
        { id: 2, artist: 'Vincent Van Gogh', title: 'The Starry Night', price: 100000000, imageUrl: 'https://media.mutualart.com/Images/2022_05/21/21/213644477/70fa8141-97ee-4890-a8b7-5e375bf80047_570.Jpeg' },
        // Add more artworks as needed
    ];
  
    const artworksSection = document.getElementById('artworks');
  
    // Function to display artworks
    function displayArtworks() {
      artworksSection.innerHTML = '';
  
      artworksData.forEach((artwork) => {
        const artworkListing = document.createElement('div');
        artworkListing.classList.add('artwork-listing');
        artworkListing.innerHTML = `
          <img src="${artwork.imageUrl}" alt="${artwork.title}">
          <h3>${artwork.title}</h3>
          <p>Artist: ${artwork.artist}</p>
          <p>Price: $${artwork.price}</p>
          <button onclick="commissionArtwork(${artwork.id})">Commission</button>
        `;
  
        artworksSection.appendChild(artworkListing);
      });
    }
  
    // Call the function to display artworks
    displayArtworks();
  
    // Function to handle commissioning artwork
    window.commissionArtwork = function (artworkId) {
      const selectedArtwork = artworksData.find((artwork) => artwork.id === artworkId);
  
      // Populate commission form with selected artwork details
      document.getElementById('artworkName').value = selectedArtwork.title;
      document.getElementById('artistName').value = selectedArtwork.artist;
      document.getElementById('budget').value = selectedArtwork.price;
  
      // Scroll to the commission form section
      document.getElementById('commission-form').scrollIntoView({ behavior: 'smooth' });
    };
  
    // ... Existing code
  });