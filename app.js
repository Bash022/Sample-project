//Init SpeechSynth API
const synth = window.speechSynthesis

//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#task-form');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const button = document.querySelector('#butn');



loadEventListeners();

function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getVoiceInput);
    // Add task event
    textForm.addEventListener('submit', addVoice);

}

function getVoiceInput(){    
    let voices;
    
    if(sessionStorage.getItem('voices') === null){
        voices = [];
    }else{
        voices = JSON.parse(sessionStorage.getItem('voices'));
    }
}

function addVoice(e){
    if (textInput.value === '') {
        alert('Enter a value');
    
    } else {
        storeTaskInSessionStorage(textInput.value);
    }

    e.preventDefault();
}


function storeTaskInSessionStorage(voice){
    let voices;
    if(sessionStorage.getItem('voices') === null){
        voices = [];
    } else{
        voices = JSON.parse(sessionStorage.getItem('voices'));
    }
    voices.push(voice);
    sessionStorage.setItem('voices', JSON.stringify(voices));


   }

//Init the voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    // loop through voices and create an option for each one
    voices.forEach(voice => {
        // Create option element
        const option = document.createElement('option');
        //Fill option with voice and language
        option.textContent = voice.name +'('+ voice.lang +')';

        //Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);

    });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
    //check if speaking
    if(synth.speaking) {
        console.error('Already speaking....');
        return;
    }
    if(textInput.value !== '') {
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value)
        ;
        //Speak end
        speakText.onend = e => {
            console.log('Done speaking...');
        }

        //Speak Error
        speakText.onerror = e => {
            console.log('Something Went Wrong');
        }

        //Selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0]
        .getAttribute('data-name');

        // Loop Through Voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });


        //Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //Speak
        synth.speak(speakText);
    }
};

//EVENT LISTENERS

//Text form submit
textForm.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate Value Change
rate.addEventListener('change', e => rateValue.textContent = 
rate.value)

//Pitch Value Change
pitch.addEventListener('change', e => pitchValue.textContent = 
pitch.value)

// Voice select change
voiceSelect.addEventListener('change', e => speak());