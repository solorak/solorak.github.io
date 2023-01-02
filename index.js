import init, {init_js} from "./wasm/solgb_wasm.js";

init().then(() => {

    init_js();

    // let handle = null;
    // const play_button = document.getElementById("start");
    // play_button.addEventListener("click", event => {
    //     init_js();
    // });
    // const stop_button = document.getElementById("stop");
    // stop_button.addEventListener("click", event => {
    //     if (handle != null) {
    //         handle.free();
	//         handle = null;
    //     }
    // });
});
