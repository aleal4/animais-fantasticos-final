import AnimaNumeros from "./anima-numeros.js";

export default function fetchAnimais(url, target) {
  // Create div contained info of animal totals
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  // Put every animal on DOM
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  // animate numbers of each animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros("[data-numero]", ".numeros", "ativo");
    animaNumeros.init();
  }
  // pull animais from JSON & create each animal useing criarAnimais()
  async function criarAnimais() {
    try {
      // Fetch and wait response
      const animaisResponse = await fetch(url);
      // Tranform answer into JSON
      const animaisJSON = await animaisResponse.json();
      // After JSON transofmr active to fill and animate numbers
      animaisJSON.forEach((animal) => {
        preencherAnimais(animal);
      });
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
