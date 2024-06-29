console.log("Hello from synth.js!");
var AudioContext = window.AudioContext || window.webkitAudioContext;

document.addEventListener('DOMContentLoaded', (event) => {
    let context;
    try {
        context = new AudioContext();
    } catch (e) {
        alert("Web audio API not supported in this browser");
    }
    const masterVolume = context.createGain();
    masterVolume.connect(context.destination);
    
    const startButton = document.querySelector('#start');
    const stopButton = document.querySelector('#stop');
    const volumeControl = document.querySelector('#volume-control');
    masterVolume.gain.value = .1;
    
    volumeControl.addEventListener('input', changeVolume);
    
    function changeVolume() {
        masterVolume.gain.value = this.value;
    }
    
    const waveforms = document.getElementsByName('waveform');
    let waveform;
    
    function setWaveform() {
        for(var i = 0; i < waveforms.length; i++) {
            if(waveforms[i].checked) {
                waveform = waveforms[i].value;
            }
        }
    }
    
    startButton.addEventListener('click', function() {
        const oscillator = context.createOscillator();
        oscillator.frequency.setValueAtTime(220, 0);
        oscillator.connect(masterVolume);
        oscillator.start(0);
        oscillator.type = waveform;
        stopButton.addEventListener('click', function() {
            oscillator.stop(0);
            delete oscillator;
        });
        waveforms.forEach((waveformInput) => {
            waveformInput.addEventListener('change', function() {
                setWaveform();
                oscillator.type = waveform;
            });
        });
    });

})