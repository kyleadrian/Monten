module.exports = {
  reduceBy
};

function reduceBy(array) {
  const reduction = array.reduce((total, { element }) => {
    if (!total[element]) {
      total[element] = 1;
    }

    total[element] += 1;
    return total;
  }, {});

  return reduction;
}
