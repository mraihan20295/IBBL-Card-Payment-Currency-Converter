// CellFin Virtual Mastercard Currency Converter JavaScript
class CellFinCurrencyConverter {
  constructor() {
    this.usdInput = document.getElementById("usdAmount");
    this.exchangeRateInput = document.getElementById("exchangeRate");
    this.baseAmountEl = document.getElementById("baseAmount");
    this.bankChargeEl = document.getElementById("bankCharge");
    this.vatAmountEl = document.getElementById("vatAmount");
    this.totalAmountEl = document.getElementById("totalAmount");
    this.summaryUSDEl = document.getElementById("summaryUSD");
    this.summaryTotalEl = document.getElementById("summaryTotal");
    this.usdErrorEl = document.getElementById("usdError");
    this.rateErrorEl = document.getElementById("rateError");
    this.calculationCard = document.getElementById("calculationCard");

    // Constants for calculation
    this.BANK_CHARGE_RATE = 0.03; // 3%
    this.VAT_RATE = 0.15; // 15%

    this.init();
  }

  init() {
    // Add event listeners for real-time calculation
    this.usdInput.addEventListener("input", () => this.handleInputChange());
    this.exchangeRateInput.addEventListener("input", () =>
      this.handleInputChange()
    );

    // Add blur event for validation
    this.usdInput.addEventListener("blur", () => this.validateUSDAmount());
    this.exchangeRateInput.addEventListener("blur", () =>
      this.validateExchangeRate()
    );

    // Prevent negative values and limit decimal places
    this.usdInput.addEventListener("keydown", (e) => this.handleNumberInput(e));
    this.exchangeRateInput.addEventListener("keydown", (e) =>
      this.handleNumberInput(e)
    );

    // Initial calculation
    this.calculate();
  }

  handleInputChange() {
    this.clearErrors();
    this.calculate();
  }

  handleNumberInput(e) {
    // Allow: backspace, delete, tab, escape, enter, decimal point
    if (
      [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }
    // Ensure that it's a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  }

  validateUSDAmount() {
    const value = parseFloat(this.usdInput.value);
    let isValid = true;

    if (this.usdInput.value === "") {
      return true; // Allow empty value
    }

    if (isNaN(value) || value < 0) {
      this.showError("usdError", "Please enter a valid positive amount");
      isValid = false;
    } else if (value > 10000) {
      this.showError(
        "usdError",
        "Amount too large. Please enter a smaller amount"
      );
      isValid = false;
    } else if (value < 0.01 && value > 0) {
      this.showError("usdError", "Minimum amount is $0.01");
      isValid = false;
    }

    return isValid;
  }

  validateExchangeRate() {
    const value = parseFloat(this.exchangeRateInput.value);
    let isValid = true;

    if (this.exchangeRateInput.value === "") {
      this.showError("rateError", "Exchange rate is required");
      return false;
    }

    if (isNaN(value) || value <= 0) {
      this.showError("rateError", "Please enter a valid exchange rate");
      isValid = false;
    } else if (value < 50 || value > 200) {
      this.showError("rateError", "Exchange rate seems unusual. Please verify");
      isValid = false;
    }

    return isValid;
  }

  showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  clearErrors() {
    this.usdErrorEl.textContent = "";
    this.rateErrorEl.textContent = "";
  }

  calculate() {
    const usdAmount = parseFloat(this.usdInput.value) || 0;
    const exchangeRate = parseFloat(this.exchangeRateInput.value) || 0;

    // Perform calculations
    const calculations = this.performCalculations(usdAmount, exchangeRate);

    // Update UI
    this.updateDisplay(calculations);

    // Add visual feedback for calculation
    this.addCalculationFeedback();
  }

  performCalculations(usdAmount, exchangeRate) {
    // Base conversion: USD amount × Exchange rate
    const baseAmount = usdAmount * exchangeRate;

    // Bank charge: Base amount × 3%
    const bankCharge = baseAmount * this.BANK_CHARGE_RATE;

    // VAT on bank charge: Bank charge × 15%
    const vatAmount = bankCharge * this.VAT_RATE;

    // Total amount: Base + Bank charge + VAT
    const totalAmount = baseAmount + bankCharge + vatAmount;

    return {
      usdAmount,
      exchangeRate,
      baseAmount,
      bankCharge,
      vatAmount,
      totalAmount,
    };
  }

  updateDisplay(calculations) {
    const { usdAmount, baseAmount, bankCharge, vatAmount, totalAmount } =
      calculations;

    // Format numbers with proper currency formatting
    this.baseAmountEl.textContent = this.formatBDT(baseAmount);
    this.bankChargeEl.textContent = this.formatBDT(bankCharge);
    this.vatAmountEl.textContent = this.formatBDT(vatAmount);
    this.totalAmountEl.textContent = this.formatBDT(totalAmount);

    // Update summary
    this.summaryUSDEl.textContent = this.formatUSD(usdAmount);
    this.summaryTotalEl.textContent = this.formatBDT(totalAmount);

    // Add visual feedback for non-zero amounts
    if (totalAmount > 0) {
      this.calculationCard.classList.add("has-calculation");
    } else {
      this.calculationCard.classList.remove("has-calculation");
    }
  }

  formatBDT(amount) {
    if (amount === 0) return "৳ 0.00";
    return `৳ ${amount.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  formatUSD(amount) {
    if (amount === 0) return "$0.00";
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  addCalculationFeedback() {
    // Add a subtle animation to indicate calculation update
    this.calculationCard.classList.remove("calculating");
    void this.calculationCard.offsetWidth; // Trigger reflow
    this.calculationCard.classList.add("calculating");

    // Remove the class after animation
    setTimeout(() => {
      this.calculationCard.classList.remove("calculating");
    }, 300);
  }

  // Public method to get current calculation results
  getCurrentCalculation() {
    const usdAmount = parseFloat(this.usdInput.value) || 0;
    const exchangeRate = parseFloat(this.exchangeRateInput.value) || 0;
    return this.performCalculations(usdAmount, exchangeRate);
  }

  // Public method to set values programmatically
  setValues(usdAmount, exchangeRate) {
    this.usdInput.value = usdAmount;
    this.exchangeRateInput.value = exchangeRate;
    this.calculate();
  }

  // Public method to reset the calculator
  reset() {
    this.usdInput.value = "";
    this.exchangeRateInput.value = "123.00";
    this.clearErrors();
    this.calculate();
  }
}

// Utility functions for additional features
class CalculatorUtils {
  static copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(textArea);
        return Promise.resolve();
      } catch (err) {
        document.body.removeChild(textArea);
        return Promise.reject(err);
      }
    }
  }

  static showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "12px 20px",
      borderRadius: "8px",
      color: "white",
      fontSize: "14px",
      fontWeight: "500",
      zIndex: "1000",
      opacity: "0",
      transform: "translateY(-20px)",
      transition: "all 0.3s ease",
    });

    // Set background color based on type
    const colors = {
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FF9800",
      error: "#F44336",
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }, 10);

    // Remove after delay
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(-20px)";
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  static formatCalculationSummary(calculation) {
    const {
      usdAmount,
      exchangeRate,
      baseAmount,
      bankCharge,
      vatAmount,
      totalAmount,
    } = calculation;

    return `CellFin Virtual Mastercard - Currency Conversion Summary
        
USD Amount: $${usdAmount.toFixed(2)}
Exchange Rate: ৳${exchangeRate.toFixed(2)} per USD

Calculation Breakdown:
• Base Amount: ৳${baseAmount.toFixed(2)}
• Bank Charge (3%): ৳${bankCharge.toFixed(2)}
• VAT on Charge (15%): ৳${vatAmount.toFixed(2)}

Total BDT Required: ৳${totalAmount.toFixed(2)}

Generated by CellFin Virtual Mastercard Currency Converter
Islami Bank Bangladesh Limited`;
  }
}

// Add calculation animation styles
const style = document.createElement("style");
style.textContent = `
.calculating {
    transform: scale(1.02);
    transition: transform 0.3s ease;
}

.has-calculation .calculation-badge {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
}

.notification {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
`;
document.head.appendChild(style);

// Initialize the calculator when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the main calculator
  window.cellfinCalculator = new CellFinCurrencyConverter();

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl+R or Cmd+R to reset (prevent default browser refresh)
    if ((e.ctrlKey || e.metaKey) && e.key === "r") {
      e.preventDefault();
      window.cellfinCalculator.reset();
      CalculatorUtils.showNotification("Calculator reset", "info");
    }

    // Ctrl+C or Cmd+C to copy calculation summary (when not in input)
    if (
      (e.ctrlKey || e.metaKey) &&
      e.key === "c" &&
      !e.target.matches("input, textarea")
    ) {
      e.preventDefault();
      const calculation = window.cellfinCalculator.getCurrentCalculation();
      const summary = CalculatorUtils.formatCalculationSummary(calculation);
      CalculatorUtils.copyToClipboard(summary)
        .then(() =>
          CalculatorUtils.showNotification(
            "Calculation copied to clipboard",
            "success"
          )
        )
        .catch(() =>
          CalculatorUtils.showNotification(
            "Failed to copy to clipboard",
            "error"
          )
        );
    }
  });

  // Add touch support for mobile devices
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device");
  }

  // Performance optimization: debounce calculation updates
  let calculationTimeout;
  const originalHandleInputChange = window.cellfinCalculator.handleInputChange;
  window.cellfinCalculator.handleInputChange = function () {
    clearTimeout(calculationTimeout);
    calculationTimeout = setTimeout(() => {
      originalHandleInputChange.call(this);
    }, 100);
  };

  console.log(
    "CellFin Virtual Mastercard Currency Converter initialized successfully"
  );
});

// Export for testing or external access
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CellFinCurrencyConverter, CalculatorUtils };
}
