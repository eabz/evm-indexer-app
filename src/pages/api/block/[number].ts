import { NextApiRequest, NextApiResponse } from 'next'

export default async function async(req: NextApiRequest, res: NextApiResponse) {
  const number = req.query.number as string

  const data = await getApiBlock(parseInt(number))

  res.json(data)
}

export const getApiBlock = async (number: number) => {
  return
}
