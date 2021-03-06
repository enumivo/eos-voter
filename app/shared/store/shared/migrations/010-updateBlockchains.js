import { uniq } from 'lodash';

const update = (blockchains) => {
  // If prior state had no array, return one
  if (!blockchains) return [];
  // Otherwise update it
  const newBlockchains = [];
  blockchains.forEach((blockchain) => {
    const chain = Object.assign({}, blockchain);
    // Ensure array exists for value
    if (!chain.excludeFeatures) {
      chain.excludeFeatures = [];
    }
    newBlockchains.push(chain);
  });
  return newBlockchains;
};

export default { update };
