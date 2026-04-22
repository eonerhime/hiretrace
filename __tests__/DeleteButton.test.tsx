import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteButton from "@/components/DeleteButton";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

describe("DeleteButton", () => {
  it("renders the delete button", () => {
    render(<DeleteButton applicationId="test-id" />);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("shows confirmation step on first click", async () => {
    render(<DeleteButton applicationId="test-id" />);
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /yes, delete/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("cancels and returns to initial state", () => {
    render(<DeleteButton applicationId="test-id" />);
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls DELETE endpoint on confirm", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    render(<DeleteButton applicationId="test-id" />);
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    fireEvent.click(screen.getByRole("button", { name: /yes, delete/i }));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/applications/test-id",
        expect.objectContaining({ method: "DELETE" }),
      );
    });
  });
});
