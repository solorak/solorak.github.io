function openNav() {
  document.getElementById("sidebar").style.width = "25%";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
}

function update_index() {
  let selected = document.querySelector('input[name="boot_roms"]:checked').value;
  localStorage.setItem("bootrom_selected", selected);
}