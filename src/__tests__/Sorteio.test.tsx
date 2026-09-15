import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sorteio from "@/components/Sorteio";

const mockParticipants = [
  {
    username: "livialima_lyu",
    profilePic: "https://example.com/a.jpg",
    fullName: null,
  },
  {
    username: "karine.marques60",
    profilePic: null,
    fullName: null,
  },
  {
    username: "nutripolianacampos",
    profilePic: null,
    fullName: null,
  },
];

describe("Sorteio", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renderiza formulário inicial", () => {
    render(<Sorteio apiBaseUrl="https://api.test" />);

    expect(screen.getByTestId("sorteio-container")).toBeInTheDocument();
    expect(screen.getByTestId("url-input")).toBeInTheDocument();
    expect(screen.getByTestId("buscar-btn")).toBeInTheDocument();
    expect(
      screen.getByText(/Cole a URL de um post do Instagram/i)
    ).toBeInTheDocument();
  });

  it("mostra erro se URL vazia", async () => {
    const user = userEvent.setup();
    render(<Sorteio apiBaseUrl="https://api.test" />);

    await user.click(screen.getByTestId("buscar-btn"));

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      /Cole a URL do post/i
    );
  });

  it("busca participantes e remove excluídos", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        participants: mockParticipants,
        total: 3,
      }),
    });

    const user = userEvent.setup();
    render(
      <Sorteio
        apiBaseUrl="https://api.test"
        excludedUsernames={["nutripolianacampos"]}
      />
    );

    await user.type(
      screen.getByTestId("url-input"),
      "https://www.instagram.com/p/DdFpla0AjYW"
    );
    await user.click(screen.getByTestId("buscar-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("participants-section")).toBeInTheDocument();
    });

    expect(screen.getByTestId("participants-count")).toHaveTextContent(
      "2 únicos"
    );
    expect(
      screen.getByTestId("participant-livialima_lyu")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("participant-nutripolianacampos")
    ).not.toBeInTheDocument();
  });

  it("mostra erro da API", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Falha ao obter comentários" }),
    });

    const user = userEvent.setup();
    render(<Sorteio apiBaseUrl="https://api.test" />);

    await user.type(
      screen.getByTestId("url-input"),
      "https://www.instagram.com/p/abc"
    );
    await user.click(screen.getByTestId("buscar-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toHaveTextContent(
        /Falha ao obter comentários/i
      );
    });
  });

  it("sorteia um vencedor", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        participants: mockParticipants.filter(
          (p) => p.username !== "nutripolianacampos"
        ),
        total: 2,
      }),
    });

    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Sorteio
        apiBaseUrl="https://api.test"
        excludedUsernames={["nutripolianacampos"]}
      />
    );

    await user.type(
      screen.getByTestId("url-input"),
      "https://www.instagram.com/p/DdFpla0AjYW"
    );
    await user.click(screen.getByTestId("buscar-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("sortear-btn")).toBeInTheDocument();
    });

    await user.click(screen.getByTestId("sortear-btn"));

    jest.advanceTimersByTime(2300);

    await waitFor(() => {
      expect(screen.getByTestId("winner-box")).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
