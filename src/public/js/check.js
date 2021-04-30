console.log('File loaded')
let web3
let votingSM
let initContract = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    await ethereum.enable()
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
  }
  if (web3) {
    votingSM = new web3.eth.Contract(
      [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'string',
              name: 'aadhaarNumber',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'fullName',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'age',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'partyName',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'bool',
              name: 'registered',
              type: 'bool',
            },
          ],
          name: 'CandidateAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'string',
              name: 'aadhaar',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'fullName',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'age',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'partyName',
              type: 'string',
            },
          ],
          name: 'CandidateRegistered',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'timestamp',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'winnerName',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'winnerParty',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'winnerAge',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'winnerVoteCount',
              type: 'uint256',
            },
          ],
          name: 'ElectionEnded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'timestamp',
              type: 'uint256',
            },
          ],
          name: 'ElectionStarted',
          type: 'event',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: '_aadhaar',
              type: 'string',
            },
          ],
          name: 'getVoterDetails',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: '_aadhaar',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_name',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: '_age',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: '_partyName',
              type: 'string',
            },
          ],
          name: 'register',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: '_aadhaar',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_name',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: '_age',
              type: 'uint256',
            },
          ],
          name: 'registerVoter',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'toggleElectionStatus',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: '_aadhaarVoter',
              type: 'string',
            },
            {
              internalType: 'string',
              name: '_aadhaarCandidate',
              type: 'string',
            },
          ],
          name: 'voteForCandidate',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'string',
              name: 'aadhaarVoter',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'aadhaarCandidate',
              type: 'string',
            },
          ],
          name: 'VoteProcessed',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'string',
              name: 'aadhaarNumber',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'fullName',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'age',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'partyName',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'bool',
              name: 'registered',
              type: 'bool',
            },
          ],
          name: 'VoterAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'voter',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'aadhaar',
              type: 'string',
            },
          ],
          name: 'VoterNotFound',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'string',
              name: 'aadhaar',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'fullName',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'age',
              type: 'uint256',
            },
          ],
          name: 'VoterRegistered',
          type: 'event',
        },
        {
          inputs: [],
          name: 'getCandidateList',
          outputs: [
            {
              internalType: 'string[]',
              name: '',
              type: 'string[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getElectionStatus',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'showLastWinner',
          outputs: [
            {
              components: [
                {
                  internalType: 'string',
                  name: 'aadhaarNumber',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'fullName',
                  type: 'string',
                },
                {
                  internalType: 'uint256',
                  name: 'age',
                  type: 'uint256',
                },
                {
                  internalType: 'string',
                  name: 'partyName',
                  type: 'string',
                },
                {
                  internalType: 'bool',
                  name: 'registered',
                  type: 'bool',
                },
                {
                  internalType: 'uint256',
                  name: 'voteCount',
                  type: 'uint256',
                },
              ],
              internalType: 'struct Voting.Candidate',
              name: '',
              type: 'tuple',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'votingStatus',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      '0x0357EB8c14661fc2acc6A40293DA117db597BF8e',
    )
    console.log({ votingSM })
  } else {
    window.alert('Not connected to a Web3 Wallet')
  }
}
let handleWinnerCheckTransaction = async (aadhaar, name, age) => {
  if (!web3) {
    window.alert('Not connected to a Web3 Wallet')
  } else {
    const addresses = await web3.eth.getAccounts()
    const senderAddress = addresses[0]
    console.log(senderAddress)
    let data = votingSM.methods
      .registerVoter(aadhaar, name, age)
      .send(
        {
          from: senderAddress
        }
      )
      .then((winners) => {
        window.alert('Registration Successfull');
        window.location = '/vote';
      })
      .catch((err)=>{
        window.alert(err);
      })
  }
}
initContract()

const d = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
]

// permutation table
const p = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
]

// validates Aadhar number received as string
function validate(aadharNumber) {
  let c = 0
  let invertedArray = aadharNumber.split('').map(Number).reverse()

  invertedArray.forEach((val, i) => {
    c = d[c][p[i % 8][val]]
  })

  return c === 0
}

const defaultAmount = 325773416826
const inputAmount = document.getElementById('input-amount')
inputAmount.setAttribute('placeholder', defaultAmount)
const inputName = document.getElementById('input-name')
inputName.setAttribute('placeholder', 'Anirudha Dudhasagare')
const inputAge = document.getElementById('input-age')
inputAge.setAttribute('placeholder', '18')
document.getElementById('btn-checkToken').onclick = function () {
  if(validate(inputAmount.value) && inputAmount.value.length == 12 && inputAge.value >= 18){
    handleWinnerCheckTransaction(inputAmount.value, inputName.value, inputAge.value)
  }
  else{
    window.alert('Invalid Inputs');
  }
}
