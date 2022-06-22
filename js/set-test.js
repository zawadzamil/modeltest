
// set time max linit
var numElementMax = document.getElementById('time-input');
numElementMax.addEventListener('change', Max);
numElementMax.addEventListener('input', Max);
numElementMax.addEventListener('keyup', Max);
function Max() {
   if (this.max) this.value = Math.min(parseInt(this.max), parseInt(this.value) || 0);
}
// set time min linit
var numElementMin = document.getElementById('time-input');
numElementMin.addEventListener('change', Min);
numElementMin.addEventListener('input', Min);
numElementMin.addEventListener('keyup', Min);
function Min() {
   if (this.Min) this.value = Math.min(parseInt(this.Min), parseInt(this.value) || 0);
}