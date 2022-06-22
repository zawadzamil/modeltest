
// set time max linit
var numElement = document.getElementById('time');
numElement.addEventListener('change', Max);
numElement.addEventListener('input', Max);
numElement.addEventListener('keyup', Max);
function Max() {
   if (this.max) this.value = Math.min(parseInt(this.max), parseInt(this.value) || 0);
}