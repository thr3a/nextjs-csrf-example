import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    res.status(200).json({ status: 'success' });
  } else {
    res.status(405).json({ status: 'ng' });
  }
}
