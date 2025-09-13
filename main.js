const resultContainer = document.querySelector(".container-result");
const form = document.querySelector("form");
const clearBtn = document.querySelector(".clear-all");
const submitBtn = document.querySelector(".submit-btn");

/* 
function calculatedResult() {
  resultContainer.innerHTML = "";
  let section1 = document.createElement("section");
  let h3Section1 = document.createElement("h3");
  let pSection1 = document.createElement("p");
  let section2 = document.createElement("section");
  let div1Section2 = document.createElement("div");
  let pdiv1Section2 = document.createElement("p");
  let h3div1Section2 = document.createElement("h3");
  let div2Section2 = document.createElement("div");
  let pdiv2Section2 = document.createElement("p");
  let h3div2Section2 = document.createElement("h3");

  section1.classList.add("container-result-header");
  section2.classList.add("results-section");
  div1Section2.classList.add("monthly-payment");
  div2Section2.classList.add("total-payment");
  h3div1Section2.classList.add("result-amount-monthly");
  h3div2Section2.classList.add("result-amount-yearly");

  h3Section1.textContent = "Your Results";
  pSection1.textContent = `Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.`;
  pdiv1Section2.textContent = "Your monthly repayments";
  h3div1Section2.textContent = "£0,000";
  pdiv2Section2.textContent = "Total you'll repay over the term";
  h3div2Section2.textContent = "£0,000";

  section1.appendChild(h3Section1);
  section1.appendChild(pSection1);
  div1Section2.appendChild(pdiv1Section2);
  div1Section2.appendChild(h3div1Section2);
  div2Section2.appendChild(pdiv2Section2);
  div2Section2.appendChild(h3div2Section2);
  section2.appendChild(div1Section2);
  section2.appendChild(div2Section2);

  resultContainer.appendChild(section1);
  resultContainer.appendChild(section2);

  resultContainer.classList.remove("result-home");
} */

function errorTextAdd(element) {
  const errorText = element.parentElement.parentElement.children[1];
  element.parentElement.style.marginBottom = "0px";
  element.parentElement.parentElement.style.marginBottom = ".8rem";
  errorText.innerText = "This field is required";
  errorText.style.color = "hsl(4, 69%, 50%)";
  errorText.style.fontSize = ".75rem";
}

function errorTextRemove(element) {
  const errorText = element.parentElement.parentElement.children[1];
  errorText.innerText = "";
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const principal = document.getElementById("mortgageAmount").value;
  const years = document.getElementById("mortgageTerm").value;
  const interestRate = document.getElementById("interestRate").value;
  const radioDiv = document.querySelector(".radio-div");
  const selectedRadio = document.querySelector(
    'input[name="repaymentType"]:checked'
  );

  const principalInvalid = principal.trim() === "";
  const yearsInvalid = years.trim() === "";
  const interestInvalid = interestRate.trim() === "";

  function calculatedResult(monthlyPayment, totalPayment) {
    resultContainer.innerHTML = "";
    let section1 = document.createElement("section");
    let h3Section1 = document.createElement("h3");
    let pSection1 = document.createElement("p");
    let section2 = document.createElement("section");
    let div1Section2 = document.createElement("div");
    let pdiv1Section2 = document.createElement("p");
    let h3div1Section2 = document.createElement("h3");
    let div2Section2 = document.createElement("div");
    let pdiv2Section2 = document.createElement("p");
    let h3div2Section2 = document.createElement("h3");

    section1.classList.add("container-result-header");
    section2.classList.add("results-section");
    div1Section2.classList.add("monthly-payment");
    div2Section2.classList.add("total-payment");
    h3div1Section2.classList.add("result-amount-monthly");
    h3div2Section2.classList.add("result-amount-yearly");

    h3Section1.textContent = "Your Results";
    pSection1.textContent = `Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.`;
    pdiv1Section2.textContent = "Your monthly repayments";
    h3div1Section2.textContent = monthlyPayment.toFixed(2);
    pdiv2Section2.textContent = "Total you'll repay over the term";
    h3div2Section2.textContent = totalPayment.toFixed(2);

    section1.appendChild(h3Section1);
    section1.appendChild(pSection1);
    div1Section2.appendChild(pdiv1Section2);
    div1Section2.appendChild(h3div1Section2);
    div2Section2.appendChild(pdiv2Section2);
    div2Section2.appendChild(h3div2Section2);
    section2.appendChild(div1Section2);
    section2.appendChild(div2Section2);

    resultContainer.appendChild(section1);
    resultContainer.appendChild(section2);

    return resultContainer.classList.remove("result-home");
  }

  if ("mortgageAmount") {
    const element = document.getElementById("mortgageAmount");
    if (element.value === "") {
      element.parentElement.style.borderColor = "red";
      element.parentElement.firstElementChild.style.backgroundColor = "red";
      element.parentElement.firstElementChild.style.color = "white";
      element.parentElement.firstElementChild.style.opacity = ".9";
      errorTextAdd(element);
    }
  }

  document.getElementById("mortgageAmount").addEventListener("input", () => {
    const element = document.getElementById("mortgageAmount");
    element.parentElement.firstElementChild.style.backgroundColor = "";
    element.parentElement.firstElementChild.style.color = "";
    element.parentElement.style.borderColor = "";
    errorTextRemove(element);
  });

  function checkError(input) {
    if (input) {
      const element = document.getElementById(input);
      if (element.value === "") {
        element.parentElement.style.borderColor = "red";
        element.parentElement.children[1].style.backgroundColor = "red";
        element.parentElement.children[1].style.color = "white";
        element.parentElement.children[1].style.opacity = ".9";
        errorTextAdd(element);
      }
    }
    document.getElementById(input).addEventListener("input", () => {
      const element = document.getElementById(input);
      element.parentElement.style.borderColor = "";
      element.parentElement.children[1].style.backgroundColor = "";
      element.parentElement.children[1].style.color = "";
      errorTextRemove(element);
    });
  }

  checkError("mortgageTerm");
  checkError("interestRate");

  //Radio button confirmation
  document.querySelectorAll('input[name="repaymentType"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const radioChild = radioDiv.children[2];
      radioChild.innerText = "";
    });
  });

  if (!document.querySelector('input[name="repaymentType"]:checked')) {
    const radioChild = radioDiv.children[2];
    radioChild.innerText = "This field is required";
    radioChild.style.color = "red";
    radioChild.style.fontSize = ".75rem";
    console.log(radioChild);
  } else if (selectedRadio.value === "repayment") {
    if (!principalInvalid && !yearsInvalid && !interestInvalid) {
      {
        /*      const element = document.getElementById("mortgageAmount");
      element.parentElement.style.borderColor = "";
      element.parentElement.firstElementChild.style.backgroundColor = "";
      element.parentElement.firstElementChild.style.color = "";

      function removeError(input) {
        const element = document.getElementById(input);
        element.parentElement.style.borderColor = "";
        element.parentElement.children[1].style.backgroundColor = "";
        element.parentElement.children[1].style.color = "";
      }
      removeError("mortgageTerm");
      removeError("interestRate"); */
      }

      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = years * 12;
      const monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      const totalPayment = monthlyPayment * numberOfPayments;
      /* Calculated result */
      calculatedResult(monthlyPayment, totalPayment);
    }
  } else {
    let monthlyInterest = (principal * (interestRate / 100)) / 12;
    let totalPayment = ((principal * (interestRate / 100)) / 12) * years * 12;
    calculatedResult(monthlyInterest, totalPayment);
  }
});

clearBtn.addEventListener("click", function (e) {
  e.preventDefault;
  document.getElementById("mortgageAmount").value = "";
  document.getElementById("mortgageTerm").value = "";
  document.getElementById("interestRate").value = "";

  const radioDiv = document.querySelector(".radio-div");
  const radioChild = radioDiv.children[2];
  radioChild.innerText = "";

  const label = document.querySelector('input[name="repaymentType"]:checked');
  if (label) {
    label.checked = false;
  }

  const element = document.getElementById("mortgageAmount");
  element.parentElement.style.borderColor = "";
  element.parentElement.firstElementChild.style.backgroundColor = "";
  element.parentElement.firstElementChild.style.color = "";
  errorTextRemove(element);

  function removeError(input) {
    const element = document.getElementById(input);
    element.parentElement.style.borderColor = "";
    element.parentElement.children[1].style.backgroundColor = "";
    element.parentElement.children[1].style.color = "";
    errorTextRemove(element);
  }
  removeError("mortgageTerm");
  removeError("interestRate");

  {
    resultContainer.innerHTML = `
        <div class="" style="margin-top: 50px" >
        <div style="display: flex; justify-content: center; align-items:center;">
                    <img
                      src="./assets/images/illustration-empty.svg"
                      alt="Empty result"
                    />
                    </div>
          <h3 style="text-align: center;">Result shown here</h3>
          <p class="p" style="text-align: center;">
            Complete the form an click "Calculate Repayments" to see what your
            monthly repayment would be.
          </p>
          
        </div>
    `;
  }
});
