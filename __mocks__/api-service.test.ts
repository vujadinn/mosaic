import { makeSetColor } from "../services/api-service";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: "success" }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("function for setting the tile color ", async () => {
  const cbFunction = (url: string) => {
    console.log("url", url);
  };
  const tiles = [
    {
      x: 1,
      y: 1,
      color: "cyan",
    },
  ];
  const cbFunctionMock = jest.fn(cbFunction);
  const asyncFn = makeSetColor(tiles, cbFunctionMock);
  await asyncFn("cyan", 1, 1);
  expect(cbFunctionMock.mock.calls.length).toBe(1);
});
