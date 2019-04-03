const alphabet = "abcdefghijklmnopqrstuvwxyz";
const alphabetUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letters = "0123456789";
const symbols = "``-=~!@#$%^&*()_+,./<>?;:[]{}/|";

let passwordLength = document.getElementById("nr-carateri");
let nomeServizio = document.getElementById("nome-servizio");
const copyButton = document.getElementById("copia");
const saveButton = document.getElementById("save");
const generaButton = document.getElementById("genera");
const copyText = document.getElementById("textGenerated");
const sliderValue = document.getElementById("slider-value");
const contOutput = document.getElementById("cont-output");
let myList = JSON.parse(localStorage.getItem("list")) || [];
console.log(myList);

class Stuff {
  constructor(nome, password) {
    this.name = nome;
    this.password = password;
  }
  do(){
    console.log(this);
  }
}

let generatorString = alphabet + symbols + alphabetUppercase + letters;
// sliderValue.textContent = document.getElementById("nr-carateri").value;
function generatePassword() {
  let generatedPassword = "";
  for (let index = 1; index <= passwordLength.value; index++) {
    x = Math.round(Math.random() * generatorString.length) - 1;
    if (x != -1) {
      generatedPassword += generatorString[x];
    }
    // console.log(string[x], 'POSITION: ' + x);
  }
  copyText.value = generatedPassword;
}

function copia() {
  copyText.select();
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
}
passwordLength.onchange = function() {
  sliderValue.textContent = this.value;
};

copyButton.onclick = copia;
generaButton.onclick = generatePassword;

saveButton.onclick = e => {
  if (nomeServizio.value !== "" && copyText.value !== "") {
    const newPass = new Stuff(nomeServizio.value, copyText.value);
    myList.push(newPass);
    localStorage.setItem("list", JSON.stringify(myList));
    console.log(myList);
    getArrayAndDisplay();
  }
};

//function get local storage

function getArrayAndDisplay() {
  let li = "";
  myList.forEach(service => {
    li +=
      ' <li class="list"> ' + service.name + ' ' + service.password + "</li>";
  });
  contOutput.innerHTML = li;
  li = "";
}



// not ok
 getArrayAndDisplay();
contOutput.addEventListener('click', (e) =>{
  if(e.target.classList.contains('list')){
    e.target.remove();
    myList[1].do();
  }
});

