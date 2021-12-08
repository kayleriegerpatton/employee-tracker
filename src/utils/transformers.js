const transformDepartments = (result) => {
  return result.map((dept) => {
    return {
      name: dept.name,
      value: dept.name,
    };
  });
};

module.exports = { transformDepartments };
