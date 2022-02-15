const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable Button 
const toggleButton = () => {
    button.disabled = !button.disabled;
}


// Passing our joke to our voiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '24cb66a35b044bb3b73bfe83bdf498fe',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes From Jokes API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.setup ? joke = `${data.setup} ... ${data.delivery}` : joke = data.joke;
        // Calling Text To Speech Func
        tellMe(joke);

        // Disable Button 
        toggleButton();
    } catch (error) {
        console.log('whoops', error);
    }
}


// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);