const convertTimestamp = (timestamp) => {
  return timestamp.toUTCString();
};

module.exports = {
  convertTimestamp,
};
