const colors = require("colors");
colors.setTheme({
  success: ["bgGreen", "black"],
  warning: ["bgBrightYellow", "black"],
  fail: ["bgRed", "white", "bold"],
  message: ["bgBrightCyan", "black"],
});

// question validation
const validateInput = (input) => {
  if (!input) {
    return "Field is required.".warning;
  }
  return true;
};

module.exports = { validateInput };
