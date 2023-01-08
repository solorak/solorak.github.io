import init, {init_js} from "./wasm/solgb_wasm.js";

init().then(() => {

    const handle = init_js();
    update_bootroms();

    const load_button = document.getElementById("load rom");
    load_button.addEventListener("click", () => {
        handle.load().then(() => {
            closeNav();
        });
    });

    const load_bootrom_button = document.getElementById("load boot rom");
    load_bootrom_button.addEventListener("click", () => {
        handle.load_bootrom().then(() => {
            update_bootroms();
        });
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
        let checked_item = localStorage.getItem("bootrom_selected");
        document.getElementById(checked_item).checked = true;
    }
}