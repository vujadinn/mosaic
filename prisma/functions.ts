import prisma from "./client";

interface UpdateTile {
  x: number;
  y: number;
  color: string;
}

export async function updateTile(tile: UpdateTile) {
  return await prisma.mosaicTile.update({
    where: {
      x_y: {
        x: tile.x,
        y: tile.y,
      },
    },
    data: {
      x: tile.x,
      y: tile.y,
      color: tile.color,
    },
  });
}
