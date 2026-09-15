"use client";

import { useState, FormEvent } from "react";
import styles from "./Sorteio.module.css";

export type Participant = {
  username: string;
  profilePic: string | null;
  fullName: string | null;
};

export type SorteioProps = {
  /** URL base da API de comentários (sem trailing slash) */
  apiBaseUrl?: string;
  /** Usuários que devem ser excluídos do sorteio (ex: dono do post) */
  excludedUsernames?: string[];
};

const DEFAULT_API =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "https://nutri-back-two.vercel.app";

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
    <div className={styles.container} data-testid="sorteio-container">
      <div className={styles.header}>
        <h1>Sorteio Instagram</h1>
        <p>Cole o link do post e sorteie entre os comentários</p>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleScrape}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="https://www.instagram.com/p/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              data-testid="url-input"
              aria-label="URL do post do Instagram"
            />
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={loading}
              data-testid="buscar-btn"
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </form>

        {error && (
          <p className={styles.error} data-testid="error-message">
            {error}
          </p>
        )}
        {loading && (
          <p className={styles.loading} data-testid="loading">
            Carregando comentários... isso pode levar alguns segundos
          </p>
        )}
      </div>

      {participants.length > 0 && (
        <div className={styles.card} data-testid="participants-section">
          <div className={styles.stats}>
            <h2>Participantes</h2>
            <span data-testid="participants-count">
              {participants.length} únicos
            </span>
          </div>

          <div className={styles.participantsGrid}>
            {participants.map((p) => (
              <div
                key={p.username}
                className={styles.participantCard}
                data-testid={`participant-${p.username}`}
              >
                {p.profilePic ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.profilePic}
                    alt={p.username}
                    className={styles.avatar}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const next = target.nextElementSibling as HTMLElement | null;
                      if (next) next.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={styles.avatarPlaceholder}
                  style={{ display: p.profilePic ? "none" : "flex" }}
                >
                  {p.username.charAt(0).toUpperCase()}
                </div>
                <span className={styles.username}>@{p.username}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {participants.length > 0 && (
        <div className={styles.card}>
          <button
            className={`${styles.btn} ${styles.btnSuccess}`}
            onClick={handleRaffle}
            disabled={spinning}
            data-testid="sortear-btn"
          >
            {spinning ? "Sorteando..." : "Sortear Vencedor"}
          </button>

          {spinning && (
            <div className={`${styles.winnerBox} ${styles.spinning}`}>
              <p>Escolhendo o vencedor...</p>
            </div>
          )}

          {winner && !spinning && (
            <div className={styles.winnerBox} data-testid="winner-box">
              <h2>🎉 Temos um vencedor!</h2>
              {winner.profilePic ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={winner.profilePic}
                  alt={winner.username}
                  className={styles.winnerAvatar}
                />
              ) : (
                <div
                  className={styles.avatarPlaceholder}
                  style={{
                    width: 100,
                    height: 100,
                    fontSize: 40,
                    margin: "0 auto 16px",
                  }}
                >
                  {winner.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className={styles.winnerUsername}>@{winner.username}</div>
              {winner.fullName && (
                <div className={styles.winnerName}>{winner.fullName}</div>
              )}
            </div>
          )}
        </div>
      )}

      {!loading && participants.length === 0 && !error && (
        <div className={`${styles.card} ${styles.empty}`}>
          <p>Cole a URL de um post do Instagram para começar</p>
        </div>
      )}
    </div>
  );
}
