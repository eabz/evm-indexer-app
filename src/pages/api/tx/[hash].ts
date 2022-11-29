import { NextApiRequest, NextApiResponse } from 'next'

export default async function async(req: NextApiRequest, res: NextApiResponse) {
  const hash = req.query.hash as string

  const data = await getApiTransaction(hash)

  res.json(data)
}

export const getApiTransaction = async (hash: string) => {
  return
}
