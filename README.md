# Nutri Poliana Campos — Next.js + Material UI

Landing page + sorteio de comentários do Instagram.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Material UI v6** (`@mui/material`) + Emotion + Roboto
- **Storybook 10**
- **Jest** + React Testing Library
- **Cypress**

## Setup

```bash
npm install
cp .env.example .env.local   # se existir
npm run dev
```

| URL | Conteúdo |
|-----|----------|
| http://localhost:3000 | Landing completa |
| http://localhost:3000/?sorteio=true | Landing + sorteio |
| http://localhost:3000/sorteio | Só o sorteio (MUI) |

## Material UI

Pacotes instalados:

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
npm install @mui/icons-material
npm install @mui/material-nextjs   # integração App Router
```

- Tema customizado em `src/theme/theme.ts` (verde da marca)
- Provider em `src/components/ThemeRegistry.tsx`
- Componente `Sorteio` 100% MUI (Card, TextField, Button, Avatar, Chip, Alert…)

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Next.js |
| `npm run storybook` | Storybook |
| `npm test` | Jest |
| `npm run cypress` | Cypress UI |

## Sorteio

- Remove `nutripolianacampos` automaticamente
- API: `NEXT_PUBLIC_API_URL` ou `https://nutri-back-two.vercel.app`
