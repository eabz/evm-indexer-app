import { NextApiRequest, NextApiResponse } from 'next'

import { getAddressUniqueContractInteractions, getAddressUniqueTokens, getTransactionHistory } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { Token } from '@/types/models/Token'
import { TransactionHistory } from '@/types/models/TransactionHistory'

export default async function async(req: NextApiRequest, res: NextApiResponse) {
  const address = req.query?.slug?.[0]
  const request = req.query?.slug?.[1]

  if (!address) {
    res.status(500)
    res.json({ error: 'Invalid address' })
    return
  }

  if (!request) {
    res.status(500)
    res.json({ error: 'Invalid request' })
    return
  }

  if (request !== 'history' && request !== 'tokens' && request !== 'interactions') {
    res.status(500)
    res.json({ error: 'Invalid request' })
    return
  }

  if (request === 'history') {
    const limit = req.query.limit as string
    const page = req.query.page as string

    const history = await getAddressHistory(address, limit, page)

    res.status(200)
    res.json(history)

    return
  }

  if (request === 'tokens') {
    const tokens = await getAddressTokens(address)
    res.status(200)
    res.json(tokens)
    return
  }

  if (request === 'interactions') {
    const interactions = await getAddressContractsInteracted(address)
    res.status(200)
    res.json(interactions)
    return
  }

  res.json({ success: true })
}

/**
 * @swagger
 * /api/{address}/history:
 *   get:
 *     tags: [Address Information]
 *     parameters:
 *     - in: path
 *       name: address
 *       schema:
 *          type: string
 *       required: true
 *       description: The address to fetch the data
 *     - in: query
 *       name: limit
 *       schema:
 *          type: interger
 *       required: false
 *       description: Limit the amount of transactions to get (max 20)
 *     - in: query
 *       name: page
 *       schema:
 *          type: interger
 *       required: false
 *       description: The page to fetch the transactions
 *     responses:
 *       200:
 *         description: An array of all the transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Transaction'
 */
async function getAddressHistory(address: string, limit: string, page: string): Promise<TransactionHistory[]> {
  let limitNumber = limit ? parseInt(limit) : 1000

  if (limitNumber > 1000) {
    limitNumber = 1000
  }

  const offset = page && page !== '0' ? ((parseInt(page) - 1) * limitNumber).toFixed(0) : undefined

  const pageNumber = parseInt(offset ?? '0')

  const { txs } = await getTransactionHistory(address, limitNumber, pageNumber, {}, HASURA_HEADERS)

  return txs.map((tx) => ({
    block_number: tx.block_number,
    chain: tx.chain,
    from_address: tx.from_address,
    gas_price: tx.gas_price,
    gas_used: tx.gas_used,
    hash: tx.hash,
    input: tx.input,
    max_fee_per_gas: tx.max_fee_per_gas,
    max_priority_fee_per_gas: tx.max_priority_fee_per_gas,
    to_address: tx.to_address,
    transaction_index: tx.transaction_index,
    transaction_type: tx.transaction_type,
    value: tx.value,
    token_tranfers: tx.token_transfers_aggregate.nodes,
    success: tx.receipt.success,
    timestamp: tx.timestamp,
    contract_interacted: tx.contract_interaction ? tx.contract_interaction.contract : undefined,
  }))
}

/**
 * @swagger
 * /api/{address}/tokens:
 *   get:
 *     tags: [Address Information]
 *     parameters:
 *     - in: path
 *       name: address
 *       schema:
 *          type: string
 *       required: true
 *       description: The address to fetch the data
 *     responses:
 *       200:
 *         description: An array of string of tokens interacted with this address
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Token'
 */
async function getAddressTokens(address: string): Promise<Token[]> {
  const { token_transfers } = await getAddressUniqueTokens(address, {}, HASURA_HEADERS)
  console.log(token_transfers)
  return token_transfers.map((token) => ({
    address: token.token,
    chain: token.token_details.chain,
    decimals: token.token_details.decimals,
    name: token.token_details.name,
    symbol: token.token_details.symbol,
  }))
}

/**
 * @swagger
 * /api/{address}/interactions:
 *   get:
 *     tags: [Address Information]
 *     parameters:
 *     - in: path
 *       name: address
 *       schema:
 *          type: string
 *       required: true
 *       description: The address to fetch the data
 *     responses:
 *       200:
 *         description: An array of string of contracts interacted with this address
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

async function getAddressContractsInteracted(address: string): Promise<string[]> {
  const { contract_interactions } = await getAddressUniqueContractInteractions(address, {}, HASURA_HEADERS)

  return contract_interactions.map((interaction) => interaction.contract)
}
