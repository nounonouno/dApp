import { Core } from '@self.id/core'
const SID = require('@self.id/web')
const { EthereumAuthProvider, SelfID, WebClient } = SID

async function webClient({
  ceramicNetwork = 'testnet-clay',
  connectNetwork = 'testnet-clay',
  address = '',
  provider = null,
  client = null
} = {}) {
  let ethereum = window.ethereum;

  // If theres no ethereum wallet alert user!
  if (!ethereum) return {
    error: "No ethereum wallet detected"
  }

  // If theres no ceramic client initiate one.
  if (!client) {
    console.log('no client')
    client = new WebClient({
      ceramic: ceramicNetwork,
      connectNetwork
    })
  }

  // Get use addres from the wallet.
  if (!address) {
    [address] = await ethereum.request({ method: 'eth_requestAccounts' })
  }

  // If theres no EthAuthProvider create one
    // This is going to be used by the ceramic client
    // probably to get the did ID of the user based on
    // the given address.
  if (!provider) {
    console.log('no prov', address);
    provider = new EthereumAuthProvider(window.ethereum, address)
  }

  // Authenticates by making you sign something.
  console.log('using client')
  await client.authenticate(provider)
  console.log('done')

  // Creates selfId instance
  const selfId = new SelfID({ client })
  console.log(selfId)

  // Extract user ID from the selfId instance
  const id = selfId.did._id

  // Return   
    // 1. Ceramic client
    // 2. The extracted ID
    // 3. The user's selfID instance
  return {
    client, id, selfId, error: null
  }
}

const networks = {
  ethereum: 'ethereum',
  bitcoin: 'bitcoin',
  cosmos: 'cosmos',
  kusama: 'kusama'
}

const caip10Links = {
  ethereum: "@eip155:1",
  bitcoin: '@bip122:000000000019d6689c085ae165831e93',
  cosmos: '@cosmos:cosmoshub-3',
  kusama: '@polkadot:b0a8d493285c2df73290dfb7e61f870f'
}

/*
CAIP-10 Account IDs is a blockchain agnostic way to describe an account on any blockchain. This may be an externally owned key-pair account, or a smart contract account. Ceramic uses CAIP-10s as a way to lookup the DID of a user using a caip10-link streamType in Ceramic. Learn more in the Ceramic documentation.
*/
async function getRecord({
  ceramicNetwork = 'testnet-clay',
  network = 'ethereum',
  client = null,
  schema = 'basicProfile',
  address = null
} = {}) {
  let ethereum = window.ethereum;
  let record;

  // If theres no eth client complain!
  if (!ethereum) return {
    error: "No ethereum wallet detected"
  }

  // Difference between WebClient and Core?
    // Initiate Core ceramic client
  if (!client) {
    client = new Core({ ceramic: ceramicNetwork })
  }

  // Get user's address.
  if (!address) {
   [address] = await ethereum.request({ method: 'eth_requestAccounts' })
  }
  
  // With chosen network get the caip10Links
  const capLink = caip10Links[network]

  // Get the user's DID using the given address
  const did = await client.getAccountDID(`${address}${capLink}`)
  
  // Get record using the user's did and schema
  record = await client.get(schema, did)
  console.log('record: ', record)

  // Return record
  return {
    record, error: null
  }
}

export {
  webClient,
  getRecord
}