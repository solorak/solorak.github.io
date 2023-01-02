import init, {init_js} from "./wasm/solgb_wasm.js";

init().then(() => {

    let handle = init_js();

    const load_button = document.getElementById("load rom");
    load_button.addEventListener("click", () => {
        handle.load();
    });

    const load_bootrom_button = document.getElementById("load boot rom");
    load_bootrom_button.addEventListener("click", () => {
        handle.load_bootrom();
    });

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
