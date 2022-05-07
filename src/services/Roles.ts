const isValidRole = (role: string) => {
  switch (role) {
    case "ADMIN":
      return true;
    case "TESTE":
      return true;
    default:
      return false;
  }
};

export { isValidRole };
