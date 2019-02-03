module.exports.delete = (msg) => {
  msg.delete(10000)
  .catch(console.error);
};
