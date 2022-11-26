class Calcul {

  
  constructor(part1, operateur, part2) {
    this.part1 = part1;
    this.operateur = operateur;
    this.part2 = part2;
    if (operateur === "*") {
      this.result = part1 * part2;
    } else if (operateur === '+') {
      this.result = part1 + part2;
    } else if (operateur === '-') {
      this.result = part1 - part2;
    } else if (operateur === '/') {
      this.result = part1 / part2;
    }
  }

  toString() {
    return this.part1 + " " +  this.operateur + " " + this.part2;
  }


}

class Game {
  lastCalculs = [];
  results = [];
  tables = [5,8,11,17,35];

  static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor(quantity) {
    this.validateButton = document.getElementById("validate-button");
    this.resultInput = document.getElementById('result');
    this.multiplication = document.getElementById("multiplication");
    this.alreadyMade = document.getElementById("already-made");
    this.quantityMax = quantity;
    this.validateButton.addEventListener("click", (event) => {
      if (this.resultInput.value) {
        game.validate()
      }
    });
    window.addEventListener('keyup', (event) => {
      console.log('into click', event)
      if (event.key === 'Enter' ) {
        if (this.resultInput.value) {
          game.validate()
        }
      }
    });
    document.getElementById("reload").addEventListener("click", (event) => {
      var calcsaved = localStorage.getItem("calculs");
      if (!calcsaved) {
        calcsaved = [];
      } else {
        calcsaved = JSON.parse(calcsaved);
      }
      calcsaved.push(this.lastCalculs);
      localStorage.setItem("calculs", JSON.stringify(calcsaved))
      document.location = document.location;
    })
    document.getElementById("responses-to-hidden").classList.add("hidden");
    document.getElementById("answer").classList.remove("hidden");
    this.beginTime = new Date().getTime();
  }

  showResults() {
    var trueResponses = 0;
    document.getElementById("responses-to-hidden").classList.remove("hidden");
    document.getElementById("answer").classList.add("hidden");
    document.getElementById("responses").textContent = "";

    this.lastCalculs.forEach((calcul, index) => {
      calcul.resultGiven = this.results[index];
      const pTag = document.createElement("p");
      const spanCalcul = document.createElement("span");
      const spanYourResponse = document.createElement("span");
      const spanFalseResponse = document.createElement("span");
      spanCalcul.textContent = calcul.toString() + " = ";
      spanYourResponse.textContent = this.results[index];
      pTag.appendChild(spanCalcul);
      pTag.appendChild(spanYourResponse);
      if (this.results[index] == calcul.result) {
        spanYourResponse.classList.add("correct")
        trueResponses++;
      }
      else {
        spanFalseResponse.textContent = calcul.result;
        spanYourResponse.classList.add("not-correct");
        spanFalseResponse.classList.add("correction");
        pTag.appendChild(spanFalseResponse);
      }
      document.getElementById("responses").appendChild(pTag);
    })
    this.alreadyMade.textContent = trueResponses + "/" + this.lastCalculs.length + " en " + ((new Date().getTime() - this.beginTime) / 1000) + " s "
  }

  validate() {
    this.results.push(this.resultInput.value); 
    if (this.lastCalculs.length !== this.quantityMax) {
      this.showNewCalcul();
    } else {
      this.showResults();
    }
  }

  showNewCalcul() {
    const calcul = new Calcul(this.tables[Game.random(0, this.tables.length-1)], "*", Game.random(1, 20));
    this.lastCalculs.push(calcul);
    this.multiplication.textContent = calcul.toString();
    this.alreadyMade.textContent = this.lastCalculs.length + "/" + this.quantityMax;
    this.resultInput.value = "";
    this.resultInput.focus();
  }
}

const game = new Game(15);
game.showNewCalcul();


