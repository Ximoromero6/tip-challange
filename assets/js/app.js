document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calculatorTipForm");
  const billInput = document.getElementById("billTotal");
  const peopleInput = document.getElementById("peopleTotal");
  const buttons = document.querySelectorAll(".tip_button");
  const tipAmountDisplay = document.querySelector(".tip-amount-person h3");
  const totalPerPersonDisplay = document.querySelector(".total-person h3");
  const resetBtn = document.getElementById("resetBtn");

  let selectedTip = 0;
  let customButton = document.querySelector(".tip_button.custom");
  const originalCustomButton = customButton.cloneNode(true);

  const peopleInputContainer = document.querySelector(
    ".field-container.people"
  );
  const peopleError = document.querySelector(".people-error");

  function restoreCustomButton() {
    if (!(customButton instanceof HTMLButtonElement)) {
      const newButton = originalCustomButton.cloneNode(true);

      newButton.addEventListener("click", handleTipSelection);

      customButton.replaceWith(newButton);
      customButton = newButton;
    }
  }

  function handleTipSelection(evt) {
    buttons.forEach((btn) => btn.classList.remove("selected"));
    resetBtn.disabled = false;

    if (evt.target === customButton) {
      let input = document.createElement("input");
      input.type = "number";
      input.className = "custom-input";
      input.min = "0";

      input.addEventListener("click", (e) => {
        buttons.forEach((btn) => btn.classList.remove("selected"));
        e.stopPropagation();
      });

      input.addEventListener("input", () => {
        selectedTip = parseFloat(input.value) || 0;
        calculateTip();
      });

      customButton.replaceWith(input);
      customButton = input;
      input.focus();
    } else {
      evt.target.classList.add("selected");

      selectedTip = parseFloat(evt.target.getAttribute("data-tip")) || 0;
      calculateTip();
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", handleTipSelection);
  });

  function calculateTip() {
    resetBtn.disabled = false;
    const bill = parseFloat(billInput.value) || 0;
    const people = parseInt(peopleInput.value) || 0;
    const tipPercentage = parseFloat(selectedTip) || 0;

    if (people <= 0) {
      showPeopleError(true);
      return;
    }

    showPeopleError(false);

    const tipAmount = (bill * tipPercentage) / 100;
    const totalAmount = bill + tipAmount;
    const tipPerPerson = tipAmount / people;
    const totalPerPerson = totalAmount / people;

    tipAmountDisplay.textContent = `€${tipPerPerson.toFixed(2)}`;
    totalPerPersonDisplay.textContent = `€${totalPerPerson.toFixed(2)}`;
  }

  form.addEventListener("input", calculateTip);

  //Reset button
  resetBtn.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "";
    selectedTip = 0;
    buttons.forEach((btn) => btn.classList.remove("selected"));
    tipAmountDisplay.textContent = "€0.00";
    totalPerPersonDisplay.textContent = "€0.00";
    resetBtn.disabled = true;

    //Restore custom button in case was changed
    showPeopleError(false);
    restoreCustomButton();
  });

  /**
   *
   * @param {Boolean} hasError
   * Function to show an error on the people's input if it's empty
   */

  function showPeopleError(hasError) {
    if (hasError) {
      peopleInputContainer.classList.add("error");
      peopleError.textContent = "Can't be zero";
      peopleError.style.display = "block";
    } else {
      peopleInputContainer.classList.remove("error");
      peopleError.style.display = "none";
    }
  }
});
