import { NextApiRequest } from 'next'
import { NextApiResponseServerIO } from '@/lib/socket'
import { initializeSocket } from '@/lib/socket'

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === 'POST') {
    // Initialize socket if not already initialized
    const io = initializeSocket(res)
    res.end()
  }
} 