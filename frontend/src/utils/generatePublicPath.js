export const generatePublicPath = (filename) => {
  return `${process.env.REACT_APP_SERVER_URL}${filename}`;
};
