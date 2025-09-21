import { renderHook, act } from "@testing-library/react";
import { useChessGame } from "../useChessGame";

global.fetch = jest.fn();

describe("useChessGame", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
});

it("initializes with starting fen and white to move", () => {
    const { result } = renderHook(() => useChessGame());

    expect(result.current.fen).toContain(" w ");
    expect(result.current.turn).toBe("w");
});