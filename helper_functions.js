function openNav() {
  document.getElementById("sidebar").style.width = "25%";
  document.getElementById("sidebar_button").style.display = "none";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("sidebar_button").style.display = "block";
}

function update_index() {
  let selected = document.querySelector('input[name="boot_roms"]:checked').value;
  localStorage.setItem("selected_bootrom", selected);
}

function download(filename, array) {
  var blob = URL.createObjectURL(new Blob([array.buffer], {type: 'application/octet-stream'}));
  var element = document.createElement('a');
  element.setAttribute('href', blob);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}