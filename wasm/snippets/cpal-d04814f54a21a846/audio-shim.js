export function copy_audio_buffer(dest, src, channel) {
    // Turn the array view into owned memory.
    var standalone = [...src];
    // Make it a Float32Array.
    var buffer = new Float32Array(standalone);

    // Copy the data.
    dest.copyToChannel(buffer, channel);
}