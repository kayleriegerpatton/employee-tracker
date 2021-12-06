// question validation
const validateInput = (input) => {
  if (!input) {
    return "Field is required.";
  }
  return true;
};

module.exports = { validateInput };
