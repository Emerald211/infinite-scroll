// create ELEMENT
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photoArray = [];

// Unsplash Photo Api
const count = 10;
const apiKey = 'TtIbIXhI6yAs0wNTj1KgOyGW8oSkP7cPhR3hDJFZ8LM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded = totalImages){
        ready = true;
        loader.hidden = true;
    }
}
// Create Element for links photos
function displayPhoto() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    console.log ('total images', totalImages);

    photoArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html)
        item.setAttribute('target', '_blank');
        
        // Create image for photo
        const img = document.createElement('img')
        img.setAttribute('src', photo.urls.regular)
        img.setAttribute('alt', photo.alt_description)
        img.setAttribute('title', photo.alt_description)

        // add evernt listener for the img
        img.addEventListener('load', imageLoaded);
        
        // put <img> inside <a> then put both in imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}
// Get Photo from unsplash
async function getPhoto() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhoto();
    } catch (error) {
        // catch error
    }
}

// check to see if scrolling effect works at the bottom of the page
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhoto();
        
    }
})

// On load
getPhoto();