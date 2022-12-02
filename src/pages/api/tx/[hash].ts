import { NextApiRequest, NextApiResponse } from 'next'

import { getTransaction } from '@/graph/fetcher'
import { HASURA_HEADERS } from '@/graph/utils'
import { Transaction } from '@/types/models/Transaction'

/**
 * @swagger
 * /api/tx/{hash}:
 *   get:
 *     tags: [Blockchain Data]
 *     parameters:
 *     - in: path
 *       name: hash
 *       schema:
 *          type: string
 *       required: true
 *       description: Hash of the transaction to fetch
 *     responses:
 *       200:
 *         description: An array with the information of the transaction hash for all chains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Transaction'
 */

export default async function async(req: NextApiRequest, res: NextApiResponse<Transaction[]>) {
  const hash = req.query.hash as string

  const data = await getApiTransaction(hash)

  res.json(data)
}

export const getApiTransaction = async (hash: string): Promise<Transaction[]> => {
  const { txs } = await getTransaction(hash, {}, HASURA_HEADERS)

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
    logs: tx.logs_aggregate.nodes,
    success: tx.receipt.success,
    timestamp: tx.timestamp,
    contract_interacted: tx.contract_interaction ? tx.contract_interaction.contract : undefined,
    contract_created: tx.contract_creation ? tx.contract_creation.contract : undefined,
  }))
}
