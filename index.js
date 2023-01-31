import init, {init_js} from "./wasm/solgb_wasm.js";

init().then(() => {

    if (window.navigator.userAgent.includes("Firefox")) {
        alert(
            "This site does not work in firefox due to the inability to import from web workers. See the following bug for more information:" + 
            "\nhttps://bugzilla.mozilla.org/show_bug.cgi?id=1572644"
        )
    }

    const handle = init_js();
    
    update_bootroms();

    const load_button = document.getElementById("load rom");
    load_button.addEventListener("click", () => {
        handle.load().then(() => {
            closeNav();
            handle.set_volume(volume_slider.value);
        });
    });

    const load_bootrom_button = document.getElementById("load boot rom");
    load_bootrom_button.addEventListener("click", () => {
        handle.load_bootrom().then(() => {
            update_bootroms();
        });
    });

    const volume_slider = document.getElementById("volume_slider");
    volume_slider.addEventListener("input", () => {
        handle.set_volume(volume_slider.value);
        localStorage.setItem("master_volume", volume_slider.value);
    });
    document.getElementById("volume_slider").value = localStorage.getItem("master_volume");


    const upload_exram = document.getElementById("upload_exram");
    upload_exram.addEventListener("click", () => {
        handle.load_save();
    });

    const download_exram = document.getElementById("download_exram");
    download_exram.addEventListener("click", () => {
        var name = handle.get_name()
        var data = new Uint8Array(JSON.parse(localStorage.getItem(name)));
        download(name + ".sav", data);
    });

    const export_exram = document.getElementById("export_exram");
    export_exram.addEventListener("click", () => {
        var data = handle.export_saves();
        var data = new Uint8Array(JSON.parse(data));
        download("gb_export.zip", data);
    });
});

function update_bootroms() {
    document.getElementById("boot_roms").innerHTML = "";
    let boot_roms = localStorage.getItem("boot_roms");
    if (boot_roms != null) {
        let boot_rom_names = JSON.parse(boot_roms).map(rom =>
            "<div class='radio_div'>" +
            "<input type=radio id='" + rom.name + "' value='" + rom.name + "' name='boot_roms' onclick='update_index()'/>" +
            "<label for='" + rom.name + "'>" + rom.name + "</label>" +
            "</div>"
        );
        boot_rom_names.forEach(boot_rom_name => {
            document.getElementById("boot_roms").innerHTML += boot_rom_name;
        });
        let checked_item = localStorage.getItem("selected_bootrom");
        document.getElementById(checked_item).checked = true;
    }
}