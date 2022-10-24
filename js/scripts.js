//Selecioando os elementos
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

//Classe
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  //Adicionar digitos no visor da calculadora
  addDigit(digit) {
    //Verifica se já existe um ponto no current operation
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  //Processa todas as operações da calculadora
  processOperation(operation) {
    //verifica se o current é vazio
    if(this.currentOperationText.innerText === "" && operation !== "C"){
        //Mudança de operação
        if(this.previousOperationText.innerText !== ""){
            this.changeOperation(operation);
        }
        return;
    }
    
    //get current and previous value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearOperation();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  //Atualiza os valores que são exibidos no visor da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //Verifica se o valor é zero, se for adiciona o valor de current
      if (previous === 0) {
        operationValue = current;
      }

      //Adiciona o valor de current para previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  changeOperation(operation){
    const mathOperation = ["+", "-", "*", "/"];
    
    if(!mathOperation.includes(operation)){
        return;
    }

    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;

  }

  //Deleta o ultimo digito
  processDelOperator(){
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
  }

  //Apaga o current operation
  processClearCurrentOperation(){
    this.currentOperationText.innerText = "";
  }

  //Apaga todas as operações
  processClearOperation(){
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  //Processa a função do botão de igual
  processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

//Objeto
const calc = new Calculator(previousOperationText, currentOperationText);

//Eventos
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
