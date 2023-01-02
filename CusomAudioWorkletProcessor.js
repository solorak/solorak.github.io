import init, { GameboyAudio } from "./wasm-audio/wasm_audio.js";

class CustomAudioWorkletProcessor extends AudioWorkletProcessor {
    contructor() {
        super()

        this.port.onmessage = (event) => this.onmessage(event.data);
    }

    onmessage(event) {
        if (event.type === "send-wasm-module") {
            // PitchNode has sent us a message containing the Wasm library to load into
            // our context as well as information about the audio device used for
            // recording.
            init(WebAssembly.compile(event.wasmBytes)).then(() => {
              this.port.postMessage({ type: 'wasm-module-loaded' });
            });
          } else if (event.type === 'init-detector') {
            const { sampleRate, numAudioSamplesPerAnalysis } = event;
      
            // Store this because we use it later to detect when we have enough recorded
            // audio samples for our first analysis.
            this.numAudioSamplesPerAnalysis = numAudioSamplesPerAnalysis;
      
            this.detector = WasmPitchDetector.new(sampleRate, numAudioSamplesPerAnalysis);
      
            // Holds a buffer of audio sample values that we'll send to the Wasm module
            // for analysis at regular intervals.
            this.samples = new Array(numAudioSamplesPerAnalysis).fill(0);
            this.totalSamples = 0;
          }
    }
}

registerProcessor('gb-player-processor', CustomAudioWorkletProcessor)