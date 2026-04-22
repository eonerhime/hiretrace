import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplicationForm from "@/components/ApplicationForm";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
  }),
}));

describe("ApplicationForm", () => {
  it("renders all required fields", () => {
    render(<ApplicationForm mode="create" />);
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add application/i }),
    ).toBeInTheDocument();
  });

  it("shows validation error when company is empty", async () => {
    render(<ApplicationForm mode="create" />);
    fireEvent.click(screen.getByRole("button", { name: /add application/i }));
    await waitFor(() => {
      expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
    });
  });

  it("shows validation error when role is empty", async () => {
    render(<ApplicationForm mode="create" />);
    await userEvent.type(screen.getByLabelText(/company/i), "Acme");
    fireEvent.click(screen.getByRole("button", { name: /add application/i }));
    await waitFor(() => {
      expect(screen.getByText(/role is required/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid URL", async () => {
    render(<ApplicationForm mode="create" />);
    await userEvent.type(screen.getByLabelText(/company/i), "Acme");
    await userEvent.type(screen.getByLabelText(/role/i), "Engineer");
    await userEvent.type(screen.getByLabelText(/job url/i), "not-a-url");
    fireEvent.click(screen.getByRole("button", { name: /add application/i }));
    await waitFor(() => {
      expect(screen.getByText(/valid url/i)).toBeInTheDocument();
    });
  });

  it("submits successfully with valid data", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    render(<ApplicationForm mode="create" />);
    await userEvent.type(screen.getByLabelText(/company/i), "Acme Corp");
    await userEvent.type(screen.getByLabelText(/role/i), "Senior Engineer");
    fireEvent.click(screen.getByRole("button", { name: /add application/i }));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/applications",
        expect.objectContaining({ method: "POST" }),
      );
    });
  });

  it("shows 'Save Changes' button in edit mode", () => {
    render(
      <ApplicationForm
        mode="edit"
        applicationId="test-id"
        defaultValues={{ company: "Acme", role: "Engineer" }}
      />,
    );
    expect(
      screen.getByRole("button", { name: /save changes/i }),
    ).toBeInTheDocument();
  });
});
