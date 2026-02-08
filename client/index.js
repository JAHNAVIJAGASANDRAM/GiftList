const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const name = niceList[0];

  const merkleTree = new MerkleTree(niceList);

  // 🔑 THIS IS THE FIX
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  console.log({ name });
  console.log({ prooflength: proof.length });

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });

  console.log({ gift });
}

main();
