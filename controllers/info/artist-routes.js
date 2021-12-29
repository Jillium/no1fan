const router = require('express').Router();
const fetch = require('node-fetch');

// renders the artist info page 
// info/artist
router.use('/:id', async (req, res) => {
    // gets artist id for the page 
    let artistID = req.params.id;
    // gets artist info
    const artistResponse = await fetch(`https://api.deezer.com/artist/${artistID}`);
    const artistName = await artistResponse.json();
    


    // gets album info
    const albumResponse = await fetch(`https://api.deezer.com/artist/${artistID}/albums`);
    const artistAlbums = await albumResponse.json();
    // gets recommended artist info
    const recommendedResponse = await fetch(`https://api.deezer.com/artist/${artistID}/related`);
    const recommended = await recommendedResponse.json();
    console.log(recommended.data.length);
    // pulls the artist bio for the page 
    let searchName = artistName.name;
    const artistBioResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchName}&api_key=${process.env.LASTFM_API_KEY}&format=json`);
    const artistBio = await artistBioResponse.json();

    // pulls recommended artists into an array
    let recommendedArray = [];
    for (let i = 0; i < recommended.data.length; i++) {
        recommendedArray.push(recommended.data[i]);
    }
    
    // // selects a random recommended artist from the array
    // const myRecommendation = recommendedArray[Math.floor(Math.random() * recommendedArray.length)];

    // passes data to handle bars to render in html 
    const artistData = { name: artistName.name, picture: artistName.picture_big, Shows: 'Awesome Shows', artistAlbums, artistBio: artistBio, recommendedArray };
    res.render('artist-info', {  name: artistName.name, picture: artistName.picture_big, Shows: 'Awesome Shows', artistAlbums, artistBio: artistBio, recommendedArray, loggedIn: req.session.loggedIn });


});




module.exports = router;