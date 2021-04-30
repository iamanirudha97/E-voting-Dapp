console.log('File loaded')
let web3
let votingSM
let lotteryStatus
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
          name: 'registerCandidate',
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
    let data = votingSM.methods
      .getElectionStatus()
      .call()
      .then((status) => {
        lotteryStatus = status
        console.log({ status })
        if (status == true) {
          document.getElementById('lotteryStatus').defaultValue = 'Active'
          document.getElementById('btn-startStopLottery').value =
            'Stop Election/Voting'
        } else {
          document.getElementById('lotteryStatus').defaultValue = 'Inactive'
          document.getElementById('btn-startStopLottery').value =
            'Start Election/Voting'
        }
      })
  } else {
    window.alert('Not connected to a Web3 Wallet')
  }
}
let handleToggleTransaction = async () => {
  if (!web3) {
    window.alert('Not connected to a Web3 Wallet')
  } else {
    const addresses = await web3.eth.getAccounts()
    const senderAddress = addresses[0]
    console.log(senderAddress)
    let ownerCall = votingSM.methods
      .owner()
      .call()
      .then((owner) => {
        if (owner != senderAddress) {
          window.alert('Only contract owner/admin can perform this action')
        } else {
          let data = votingSM.methods
            .toggleElectionStatus()
            .send({
              from: senderAddress,
            })
            .then((data)=>{
              window.alert('Toggle successful');
            })
        }
      })
  }
}

let handleRegisterCandidate = async (aadhaar, name, age, party) => {
  if (!web3) {
    window.alert('Not connected to a Web3 Wallet')
  } else {
    const addresses = await web3.eth.getAccounts()
    const senderAddress = addresses[0]
    console.log(senderAddress)
    let ownerCall = votingSM.methods
      .owner()
      .call()
      .then((owner) => {
        if (owner != senderAddress) {
          window.alert('Only contract owner/admin can perform this action')
        } else {
          votingSM.methods
            .registerCandidate(aadhaar, name, age, party)
            .send({
              from: senderAddress,
            })
            .on('receipt', (receipt) => {
              console.log({ receipt })
              window.alert('Candidate Added.')
            })
        }
      })
  }
}
let handleGetWinner = async () => {
  if (!web3) {
    window.alert('Not connected to a Web3 Wallet')
  } else {
    const addresses = await web3.eth.getAccounts()
    const senderAddress = addresses[0]
    votingSM.methods
      .showLastWinner()
      .call({
        from: senderAddress
      })
      .then((data) => {
        window.alert(data);
      })
      .catch((err) => {
        window.alert(err);
      })
  }
}

initContract()
document.getElementById('btn-startStopLottery').onmousedown = function () {
  handleToggleTransaction()
}

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

const candAadhaar = document.getElementById('input-amount')
candAadhaar.setAttribute('placeholder', 325773416826)
const candName = document.getElementById('full-name')
candName.setAttribute('placeholder', 'Candidate Name')
const candAge = document.getElementById('age')
candAge.setAttribute('placeholder', 40)
const candParty = document.getElementById('party')
candParty.setAttribute('placeholder', 'Independent')

document.getElementById('btn-register').onmousedown = function () {
  if (
    validate(candAadhaar.value.toString()) &&
    candAge.value > 35 &&
    candAadhaar.value.length == 12
  ) {
    handleRegisterCandidate(
      candAadhaar.value,
      candName.value,
      candAge.value,
      candParty.value,
    )
  } else {
    window.alert('Invalid Inputs.')
  }
}

document.getElementById('btn-getWinner').onmousedown = function () {
  handleGetWinner();
}