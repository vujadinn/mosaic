import Home from "../pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { MockContext, Context, createMockContext } from "../prisma/context";
import { updateTile } from "../prisma/functions";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe("Mosaic", () => {
  it("renders home componenet", () => {
    const { container } = render(<Home />);
    expect(container.childElementCount).toEqual(1);
  });

  it("test db - should update the tile ", async () => {
    const tile = {
      x: 1,
      y: 1,
      color: "cyan",
    };

    await expect(updateTile(tile)).resolves.toEqual({
      x: 1,
      y: 1,
      color: "cyan",
    });
  });
});
