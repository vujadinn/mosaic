// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MosaicTile, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MosaicTile[]>
) {
  const prisma = new PrismaClient();

  if (req.method === 'POST') {
    const body = JSON.parse(req.body)
    await prisma.mosaicTile.update({
      where: {
        x_y: {
          x: body.x,
          y: body.y
        }
      },
      data: {
        x: body.x,
        y: body.y,
        color: body.color,
      },
    })
  }

  const tiles = await prisma.mosaicTile.findMany({});
  res.status(200).json(tiles);
}
