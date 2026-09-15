"use client";

import { useState, FormEvent } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import InstagramIcon from "@mui/icons-material/Instagram";

export type Participant = {
  username: string;
  profilePic: string | null;
  fullName: string | null;
};

export type SorteioProps = {
  apiBaseUrl?: string;
  excludedUsernames?: string[];
};

const DEFAULT_API =
  typeof window !== "undefined"
    ? "" // mesma origem → /api/comments
    : "";

export default function Sorteio({
  apiBaseUrl = DEFAULT_API,
  excludedUsernames = ["nutripolianacampos"],
}: SorteioProps) {
  const [url, setUrl] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [winner, setWinner] = useState<Participant | null>(null);
  const [spinning, setSpinning] = useState(false);

  const handleScrape = async (e: FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Cole a URL do post do Instagram");
      return;
    }

    setLoading(true);
    setError("");
    setParticipants([]);
    setWinner(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.details || "Erro ao buscar comentários"
        );
      }

      const excluded = excludedUsernames.map((u) => u.toLowerCase());
      const list: Participant[] = (data.participants || []).filter(
        (p: Participant) => !excluded.includes(p.username.toLowerCase())
      );

      setParticipants(list);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro de conexão com o servidor";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRaffle = () => {
    if (participants.length === 0) return;

    setSpinning(true);
    setWinner(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      setWinner(participants[randomIndex]);
      setSpinning(false);
    }, 2200);
  };

  return (
    <Box
      data-testid="sorteio-container"
      sx={{
        maxWidth: 800,
        mx: "auto",
        px: 2,
        py: 5,
      }}
    >
      <Stack spacing={1} alignItems="center" sx={{ mb: 4, textAlign: "center" }}>
        <InstagramIcon color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="h4" component="h1" fontWeight={700}>
          Sorteio Instagram
        </Typography>
        <Typography color="text.secondary">
          Cole o link do post e sorteie entre os comentários
        </Typography>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleScrape}
            sx={{
              display: "flex",
              gap: 1.5,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              fullWidth
              size="medium"
              placeholder="https://www.instagram.com/p/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              inputProps={{
                "data-testid": "url-input",
                "aria-label": "URL do post do Instagram",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <SearchIcon />
                )
              }
              data-testid="buscar-btn"
              sx={{ minWidth: 140, whiteSpace: "nowrap" }}
            >
              {loading ? "Buscando..." : "Buscar"}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }} data-testid="error-message">
              {error}
            </Alert>
          )}
          {loading && (
            <Alert severity="info" sx={{ mt: 2 }} data-testid="loading">
              Carregando comentários... isso pode levar alguns segundos
            </Alert>
          )}
        </CardContent>
      </Card>

      {participants.length > 0 && (
        <Card sx={{ mb: 3 }} data-testid="participants-section">
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="h6" component="h2">
                Participantes
              </Typography>
              <Chip
                label={`${participants.length} únicos`}
                color="primary"
                variant="outlined"
                data-testid="participants-count"
              />
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 2,
                maxHeight: 400,
                overflowY: "auto",
              }}
            >
              {participants.map((p) => (
                <Stack
                  key={p.username}
                  alignItems="center"
                  spacing={1}
                  data-testid={`participant-${p.username}`}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    height: "100%",
                    transition: "transform 0.15s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  <Avatar
                    src={p.profilePic || undefined}
                    alt={p.username}
                    sx={{ width: 56, height: 56 }}
                  >
                    {p.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    textAlign="center"
                    sx={{ wordBreak: "break-all" }}
                  >
                    @{p.username}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {participants.length > 0 && (
        <Card>
          <CardContent>
            <Button
              fullWidth
              variant="contained"
              color="success"
              size="large"
              onClick={handleRaffle}
              disabled={spinning}
              startIcon={
                spinning ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <EmojiEventsIcon />
                )
              }
              data-testid="sortear-btn"
              sx={{ py: 1.5, fontSize: "1rem" }}
            >
              {spinning ? "Sorteando..." : "Sortear Vencedor"}
            </Button>

            {spinning && (
              <Box sx={{ textAlign: "center", py: 3 }}>
                <Typography color="text.secondary">
                  Escolhendo o vencedor...
                </Typography>
              </Box>
            )}

            {winner && !spinning && (
              <Box data-testid="winner-box" sx={{ textAlign: "center", py: 3 }}>
                <Typography
                  variant="h5"
                  color="success.main"
                  fontWeight={700}
                  gutterBottom
                >
                  Temos um vencedor!
                </Typography>
                <Avatar
                  src={winner.profilePic || undefined}
                  alt={winner.username}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    mb: 2,
                    border: 4,
                    borderColor: "success.main",
                    boxShadow: "0 4px 15px rgba(0, 200, 83, 0.3)",
                    fontSize: 40,
                  }}
                >
                  {winner.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5" fontWeight={700}>
                  @{winner.username}
                </Typography>
                {winner.fullName && (
                  <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                    {winner.fullName}
                  </Typography>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {!loading && participants.length === 0 && !error && (
        <Card>
          <CardContent>
            <Typography color="text.secondary" textAlign="center" sx={{ py: 2 }}>
              Cole a URL de um post do Instagram para começar
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
