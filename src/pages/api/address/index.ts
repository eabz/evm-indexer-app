import { NextApiRequest, NextApiResponse } from 'next'

export default async function async(_req: NextApiRequest, res: NextApiResponse) {
  res.redirect('/')
}
