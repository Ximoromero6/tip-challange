document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tip_button");
  let customButton = document.querySelector(".tip_button.custom");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("selected"));

      if (button === customButton) {
        let input = document.createElement("input");
        input.type = "number";
        input.className = "custom-input";
        input.addEventListener("click", (e) => e.stopPropagation());
        customButton.replaceWith(input);
        input.focus();
       /*  input.addEventListener("blur", () => {
          customButton.classList.add("selected");
          input.replaceWith(customButton);
        }); */
      } else {
        button.classList.add("selected");
      }
    });
  });
});
