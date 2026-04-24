import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

describe("ContactForm", () => {
  it("renders name field", () => {
    render(<ContactForm applicationId="app-1" />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it("shows validation error when name is empty", async () => {
    render(<ContactForm applicationId="app-1" />);
    fireEvent.click(screen.getByRole("button", { name: /add contact/i }));
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  it("submits successfully with valid data", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    render(<ContactForm applicationId="app-1" />);
    await userEvent.type(screen.getByLabelText(/name/i), "Jane Smith");
    fireEvent.click(screen.getByRole("button", { name: /add contact/i }));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/contacts",
        expect.objectContaining({ method: "POST" }),
      );
    });
  });
});
