"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Instagram,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Counter from "@/components/Counter";
import Sorteio from "@/components/Sorteio";

const GREEN = "#173f35";
const GREEN_DARK = "#0f3028";
const CREAM = "#f6f2e9";
const ORANGE = "#c87942";
const INK = "#17211e";
const MUTED = "#6b746f";
const LINE = "#ddd8cc";
const SERIF = 'var(--font-playfair), "Playfair Display", Georgia, serif';
const SANS = 'var(--font-dm-sans), "DM Sans", Arial, sans-serif';

const testimonials = [
  {
    name: "Mariana, 34 anos",
    text: "Pela primeira vez consegui emagrecer sem viver pensando em dieta. O plano cabe na minha rotina e o acompanhamento fez toda diferença.",
    tag: "-8,4 kg em 4 meses",
  },
  {
    name: "Camila, 41 anos",
    text: "Eu achava que precisava cortar tudo. Aprendi a organizar minha alimentação e hoje tenho muito mais segurança para fazer minhas escolhas.",
    tag: "-6,1 kg em 12 semanas",
  },
  {
    name: "Juliana, 29 anos",
    text: "O atendimento é muito humano. Não recebi uma dieta pronta: ela entendeu minha rotina e ajustou tudo para a minha realidade.",
    tag: "Mais energia e disposição",
  },
];

const faqs: [string, string][] = [
  [
    "Preciso cortar carboidratos para emagrecer?",
    "Não. A estratégia é individualizada. A quantidade e a distribuição dos alimentos são ajustadas aos seus objetivos, rotina, preferências e contexto clínico.",
  ],
  [
    "O atendimento pode ser online?",
    "Sim. As consultas podem ser realizadas por videochamada, com acompanhamento e orientações digitais.",
  ],
  [
    "Vou receber uma dieta pronta?",
    "O plano é construído de forma personalizada, considerando horários, preferências, rotina, objetivos e dificuldades.",
  ],
  [
    "Quanto tempo dura o acompanhamento?",
    "O tempo varia de acordo com o objetivo e a evolução. O importante é criar uma estratégia sustentável e revisar o plano conforme necessário.",
  ],
  [
    "Como faço para começar?",
    "Clique em qualquer botão de atendimento e envie uma mensagem. A equipe explica as opções disponíveis e os próximos passos.",
  ],
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const reveal = (direction: "up" | "left" | "right" = "up") => ({
  opacity: 0,
  transform:
    direction === "left"
      ? "translateX(-45px)"
      : direction === "right"
        ? "translateX(45px)"
        : "translateY(34px)",
  transition:
    "opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1)",
  "&[data-visible=true]": { opacity: 1, transform: "none" },
  "@media (prefers-reduced-motion: reduce)": {
    opacity: 1,
    transform: "none",
    transition: "none",
  },
});

const stagger = {
  "& > *": {
    opacity: 0,
    transform: "translateY(28px)",
    transition:
      "opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1)",
  },
  "&[data-visible=true] > *": { opacity: 1, transform: "none" },
  "&[data-visible=true] > *:nth-of-type(1)": { transitionDelay: ".05s" },
  "&[data-visible=true] > *:nth-of-type(2)": { transitionDelay: ".16s" },
  "&[data-visible=true] > *:nth-of-type(3)": { transitionDelay: ".27s" },
  "@media (prefers-reduced-motion: reduce)": {
    "& > *": { opacity: 1, transform: "none", transition: "none" },
  },
};

const hoverLift = {
  transition:
    "transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease, border-color .35s ease",
};

const PrimaryButton = ({
  children,
  ...props
}: React.ComponentProps<typeof Button>) => (
  <Button
    variant="contained"
    disableElevation
    {...props}
    sx={{
      bgcolor: GREEN,
      color: "#fff",
      borderRadius: "100px",
      px: 2.4,
      py: 1.6,
      fontWeight: 700,
      fontSize: 14,
      gap: 1,
      fontFamily: SANS,
      transition: ".22s ease",
      "&:hover": {
        bgcolor: GREEN_DARK,
        transform: "translateY(-3px) scale(1.01)",
        boxShadow: "0 10px 25px rgba(23,63,53,.2)",
      },
      ...props.sx,
    }}
  >
    {children}
  </Button>
);

export default function LandingPage() {
  useReveal();
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const sorteio = searchParams.get("sorteio");

  const go = () =>
    window.open(
      "https://wa.me/5571996553137?text=Olá!%20Quero%20saber%20como%20funciona%20o%20acompanhamento%20nutricional.",
      "_blank",
    );

  const navItems = [
    ["Método", "#metodo"],
    ["Resultados", "#resultados"],
    ["Sobre", "#sobre"],
    ["Dúvidas", "#faq"],
    ...(sorteio ? [["Sorteio", "#sorteio"]] : []),
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: INK,
        bgcolor: "#fff",
        fontFamily: SANS,
        html: { scrollBehavior: "smooth" },
      }}
    >
      <Box
        component="header"
        sx={{
          height: { xs: 68, md: 78 },
          bgcolor: "rgba(246,242,233,.95)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 20,
          borderBottom: "1px solid rgba(23,63,53,.07)",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            width: {
              xs: "calc(100% - 28px)",
              md: "min(1140px, calc(100% - 40px))",
            },
            height: "100%",
            mx: "auto",
            px: "0 !important",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            <Link
              href="#top"
              underline="none"
              sx={{
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: -0.8,
                color: INK,
                fontFamily: SANS,
              }}
            >
              <Box component="span" sx={{ color: ORANGE }}>
                Nutri
              </Box>{" "}
              Poliana Campos
            </Link>
            <Stack
              component="nav"
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "stretch", md: "center" }}
              gap={{ xs: 2.5, md: 3.75 }}
              sx={{
                display: { xs: menu ? "flex" : "none", md: "flex" },
                position: { xs: "absolute", md: "static" },
                top: { xs: 68, md: "auto" },
                left: { xs: 0, md: "auto" },
                right: { xs: 0, md: "auto" },
                bgcolor: { xs: CREAM, md: "transparent" },
                p: { xs: 2.5, md: 0 },
                borderBottom: { xs: `1px solid ${LINE}`, md: 0 },
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {navItems.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenu(false)}
                  underline="none"
                  sx={{ color: "#45504b", "&:hover": { color: GREEN } }}
                >
                  {label}
                </Link>
              ))}
              <Button
                onClick={go}
                endIcon={<ArrowRight size={16} />}
                sx={{
                  bgcolor: GREEN,
                  color: "#fff",
                  borderRadius: "100px",
                  px: 2.5,
                  py: 1.4,
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: GREEN_DARK,
                    transform: "translateY(-3px) scale(1.01)",
                    boxShadow: "0 10px 25px rgba(23,63,53,.2)",
                  },
                }}
              >
                Quero começar
              </Button>
            </Stack>
            <IconButton
              onClick={() => setMenu(!menu)}
              aria-label="Menu"
              sx={{ display: { xs: "inline-flex", md: "none" }, color: INK }}
            >
              {menu ? <X /> : <Menu />}
            </IconButton>
          </Stack>
        </Container>
      </Box>

      <Box component="main" id="top">
        <Box
          component="section"
          sx={{
            bgcolor: CREAM,
            minHeight: { md: 690 },
            position: "relative",
            overflow: "hidden",
            py: { xs: 7, md: 0 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 520,
              height: 520,
              borderRadius: "50%",
              bgcolor: "#e9dfcd",
              right: -180,
              top: 30,
              filter: "blur(2px)",
            }}
          />
          <Container
            maxWidth={false}
            sx={{
              width: {
                xs: "calc(100% - 28px)",
                md: "min(1140px, calc(100% - 40px))",
              },
              minHeight: { md: 690 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.05fr .95fr" },
              alignItems: "center",
              gap: { xs: 5, md: 6.25 },
              position: "relative",
              mx: "auto",
              px: "0 !important",
            }}
          >
            <Box
              sx={{
                ...reveal("left"),
                textAlign: { xs: "center", md: "left" },
              }}
              data-reveal
            >
              <Stack
                direction="row"
                justifyContent={{ xs: "center", md: "flex-start" }}
                alignItems="center"
                gap={1}
                sx={{
                  mb: 2.5,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.7,
                  color: ORANGE,
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: ORANGE,
                  }}
                />{" "}
                ATENDIMENTO ONLINE E PRESENCIAL
              </Stack>
              <Typography
                component="h1"
                sx={{
                  fontFamily: SERIF,
                  fontSize: "clamp(46px,5.5vw,72px)",
                  lineHeight: 1.08,
                  letterSpacing: -1.5,
                  fontWeight: 600,
                  m: 0,
                }}
              >
                Emagreça com estratégia,{" "}
                <Box component="em" sx={{ fontStyle: "italic", color: ORANGE }}>
                  sem viver de dieta.
                </Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "#5f6964",
                  maxWidth: 590,
                  mx: { xs: "auto", md: 0 },
                  my: 3.1,
                }}
              >
                Um acompanhamento nutricional pensado para a sua rotina, seus
                objetivos e a sua realidade — sem terrorismo alimentar e sem
                fórmulas prontas.
              </Typography>
              <Stack
                direction="row"
                gap={2.25}
                alignItems="center"
                flexWrap="wrap"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <PrimaryButton onClick={go} endIcon={<ArrowRight />}>
                  Quero transformar minha alimentação
                </PrimaryButton>
                <Link
                  href="#metodo"
                  underline="none"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    color: GREEN,
                    fontWeight: 700,
                    "&:hover": { color: ORANGE },
                  }}
                >
                  <Play size={16} fill="currentColor" /> Conheça o método
                </Link>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
                gap={1.6}
                mt={4.25}
                textAlign="left"
              >
                <Stack direction="row" sx={{ flexShrink: 0 }}>
                  {["AM", "JC", "MR", "+"].map((x, i) => (
                    <Box
                      key={x}
                      sx={{
                        width: 31,
                        height: 31,
                        ml: i ? -0.9 : 0,
                        borderRadius: "50%",
                        bgcolor: "#d9c4a6",
                        border: `2px solid ${CREAM}`,
                        display: "grid",
                        placeItems: "center",
                        fontSize: 8,
                        fontWeight: 800,
                        color: GREEN,
                      }}
                    >
                      {x}
                    </Box>
                  ))}
                </Stack>
                <Box>
                  <Typography
                    sx={{ color: "#d28a4f", letterSpacing: 2, fontSize: 12 }}
                  >
                    ★★★★★
                  </Typography>
                  <Typography
                    component="strong"
                    sx={{ display: "block", fontSize: 12, mt: 0.4 }}
                  >
                    +500 pacientes acompanhados
                  </Typography>
                  <Typography
                    component="small"
                    sx={{ display: "block", fontSize: 10, color: "#777" }}
                  >
                    Experiências e resultados construídos com acompanhamento.
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box
              sx={{
                ...reveal("right"),
                display: "flex",
                justifyContent: "center",
                order: { xs: -1, md: 0 },
              }}
              data-reveal
            >
              <Box
                sx={{
                  width: { xs: 280, sm: 310, md: 450 },
                  height: { xs: 390, sm: 420, md: 565 },
                  position: "relative",
                  ...hoverLift,
                  "&:hover": { transform: "translateY(-5px) rotate(.3deg)" },
                  "&:hover img": { filter: "saturate(.95)" },
                }}
              >
                <Box
                  component="img"
                  src="/Apresentacao.jpeg"
                  alt="Nutricionista em ambiente profissional"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "220px 220px 22px 22px",
                    filter: "saturate(.8)",
                  }}
                />
                <Paper
                  sx={{
                    position: "absolute",
                    left: { xs: -18, md: -35 },
                    bottom: 45,
                    bgcolor: "#fff",
                    p: "15px 18px",
                    borderRadius: "15px",
                    display: "flex",
                    gap: 1.4,
                    alignItems: "center",
                    boxShadow: "0 15px 45px #173f3520",
                    ...hoverLift,
                    "&:hover": {
                      transform: "translateY(-6px) scale(1.02)",
                      boxShadow: "0 20px 45px rgba(23,63,53,.18)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: "#dfece6",
                      color: GREEN,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Check size={17} />
                  </Box>
                  <Box>
                    <Typography
                      component="strong"
                      sx={{ display: "block", fontSize: 12 }}
                    >
                      Plano personalizado
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        display: "block",
                        fontSize: 12,
                        color: "#8a918d",
                        mt: 0.4,
                      }}
                    >
                      Feito para a sua rotina
                    </Typography>
                  </Box>
                </Paper>
                <Box
                  sx={{
                    position: "absolute",
                    right: { xs: -10, md: -30 },
                    top: 40,
                    color: ORANGE,
                    fontSize: 50,
                    transform: "rotate(15deg)",
                  }}
                >
                  ✦
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box
          component="section"
          sx={{ py: { xs: 9.5, md: 12.5 }, bgcolor: "#fff", ...reveal() }}
          data-reveal
        >
          <Container
            maxWidth={false}
            sx={{
              width: {
                xs: "calc(100% - 28px)",
                md: "min(1140px, calc(100% - 40px))",
              },
              mx: "auto",
              px: "0 !important",
            }}
          >
            <SectionIntro
              kicker="SE ISSO PARECE COM VOCÊ..."
              title={
                <>
                  Você não precisa de <Box component="em">mais uma dieta.</Box>
                </>
              }
              text="Talvez o problema não seja falta de força de vontade. Pode ser que você ainda não tenha encontrado uma estratégia que respeite a sua vida."
            />
            <Box
              data-reveal
              sx={{
                ...stagger,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
                gap: 2.5,
                mt: 6.9,
              }}
            >
              {[
                [
                  "01",
                  "Começa toda segunda-feira",
                  "Você consegue seguir por alguns dias, mas logo a rotina aperta e tudo volta ao ponto inicial.",
                ],
                [
                  "02",
                  "Sente culpa depois de comer",
                  "A alimentação virou uma lista de proibidos, excessos e compensações.",
                ],
                [
                  "03",
                  "Não sabe o que realmente funciona",
                  "São tantas informações na internet que fica difícil saber o que faz sentido para você.",
                ],
              ].map(([n, t, d]) => (
                <Paper
                  key={n}
                  component="article"
                  elevation={0}
                  sx={{
                    border: `1px solid ${LINE}`,
                    p: { xs: 3.25, md: 4.4 },
                    borderRadius: "18px",
                    bgcolor: "#fff",
                    ...hoverLift,
                    "&:hover": {
                      transform: "translateY(-9px)",
                      boxShadow: "0 18px 45px rgba(23,63,53,.10)",
                      borderColor: "#cfc7b8",
                    },
                  }}
                >
                  <Typography
                    sx={{ fontFamily: SERIF, color: "#b5aa96", fontSize: 20 }}
                  >
                    {n}
                  </Typography>
                  <Typography
                    component="h3"
                    sx={{ fontFamily: SERIF, fontSize: 24, mt: 2.75, mb: 1.25 }}
                  >
                    {t}
                  </Typography>
                  <Typography
                    sx={{ color: MUTED, lineHeight: 1.7, fontSize: 14 }}
                  >
                    {d}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Container>
        </Box>

        <Box
          component="section"
          id="metodo"
          sx={{ py: { xs: 9.5, md: 12.5 }, bgcolor: CREAM, ...reveal() }}
          data-reveal
        >
          <Container
            maxWidth={false}
            sx={{
              width: {
                xs: "calc(100% - 28px)",
                md: "min(1140px, calc(100% - 40px))",
              },
              mx: "auto",
              px: "0 !important",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 5.5, md: 10.6 },
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  ...reveal("left"),
                  height: { xs: 440, md: 620 },
                  position: "relative",
                }}
                data-reveal
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85"
                  alt="Alimentação saudável"
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    maxWidth: 513,
                    height: { xs: "100%", md: 719 },
                    borderRadius: "20px",
                    boxShadow: "0 4px 10px rgba(0,0,0,.1)",
                  }}
                />
                <Paper
                  sx={{
                    position: "absolute",
                    bottom: 30,
                    right: { xs: 10, md: -30 },
                    bgcolor: "#fff",
                    borderRadius: "15px",
                    p: "17px 20px",
                    display: "flex",
                    gap: 1.25,
                    boxShadow: "0 15px 40px #173f3518",
                    ...hoverLift,
                    "&:hover": {
                      transform: "translateY(-6px) scale(1.02)",
                      boxShadow: "0 20px 45px rgba(23,63,53,.18)",
                    },
                  }}
                >
                  <Sparkles size={18} color={ORANGE} />
                  <Box>
                    <Typography
                      component="strong"
                      sx={{ display: "block", fontSize: 12 }}
                    >
                      Individualidade
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        display: "block",
                        fontSize: 12,
                        color: "#7b837f",
                        mt: 0.4,
                      }}
                    >
                      Sem plano genérico
                    </Typography>
                  </Box>
                </Paper>
              </Box>
              <Box sx={{ ...reveal("right") }} data-reveal>
                <Kicker>O MÉTODO</Kicker>
                <Heading>
                  Nutrição que <Box component="em">se adapta a você.</Box>
                </Heading>
                <Typography sx={{ color: MUTED, lineHeight: 1.75 }}>
                  O acompanhamento começa entendendo onde você está hoje. A
                  partir daí, construímos uma estratégia possível de manter — e
                  ajustamos conforme sua evolução.
                </Typography>
                <Box sx={{ my: 3.75 }}>
                  {[
                    [
                      "01",
                      "Avaliação completa",
                      "Entendemos rotina, hábitos, preferências, objetivos e principais desafios.",
                    ],
                    [
                      "02",
                      "Estratégia personalizada",
                      "Você recebe um plano alimentar prático, flexível e alinhado ao seu momento.",
                    ],
                    [
                      "03",
                      "Acompanhamento próximo",
                      "A evolução é acompanhada e a estratégia é ajustada quando necessário.",
                    ],
                  ].map(([n, t, d]) => (
                    <Box
                      key={n}
                      sx={{
                        ...reveal(),
                        display: "flex",
                        gap: 2.5,
                        py: 2.1,
                        borderBottom: "1px solid #d8d1c4",
                        ...hoverLift,
                        "&:hover": { transform: "translateX(7px)" },
                      }}
                      data-reveal
                    >
                      <Typography
                        component="b"
                        sx={{
                          fontFamily: SERIF,
                          fontSize: 18,
                          color: "#aaa18f",
                        }}
                      >
                        {n}
                      </Typography>
                      <Box>
                        <Typography
                          component="h3"
                          sx={{ m: 0, mb: 0.5, fontSize: 16, fontWeight: 700 }}
                        >
                          {t}
                        </Typography>
                        <Typography
                          sx={{
                            m: 0,
                            color: "#7a817d",
                            fontSize: 13,
                            lineHeight: 1.6,
                          }}
                        >
                          {d}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <TextButton onClick={go}>
                  Quero conhecer meu plano <ArrowRight size={17} />
                </TextButton>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box
          component="section"
          id="resultados"
          sx={{
            py: { xs: 9.5, md: 12.5 },
            bgcolor: GREEN,
            color: "#fff",
            ...reveal(),
          }}
          data-reveal
        >
          <Container
            maxWidth={false}
            sx={{
              width: {
                xs: "calc(100% - 28px)",
                md: "min(1140px, calc(100% - 40px))",
              },
              mx: "auto",
              px: "0 !important",
            }}
          >
            <SectionIntro
              light
              kicker="RESULTADOS REAIS"
              title={
                <>
                  Pequenas mudanças.{" "}
                  <Box component="em">Grandes diferenças.</Box>
                </>
              }
              text="Exemplos ilustrativos com dados fictícios para demonstração desta landing page."
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
                borderTop: "1px solid #ffffff2b",
                borderBottom: "1px solid #ffffff2b",
                my: 6.25,
                py: 3.75,
                gap: { xs: 3.1, md: 0 },
              }}
            >
              {[
                [500, "+", "pessoas acompanhadas"],
                [92, "%", "relatam maior organização alimentar"],
                [4.9, "/5", "avaliação média dos atendimentos"],
              ].map(([target, suffix, label], i) => (
                <Box
                  key={String(label)}
                  sx={{
                    textAlign: "center",
                    borderRight: {
                      xs: 0,
                      md: i < 2 ? "1px solid #ffffff2b" : 0,
                    },
                    borderBottom: {
                      xs: i < 2 ? "1px solid #ffffff2b" : 0,
                      md: 0,
                    },
                    pb: { xs: i < 2 ? 2.5 : 0, md: 0 },
                  }}
                >
                  <Box sx={{ fontFamily: SERIF, fontSize: 42 }}>
                    <Counter
                      target={target as number}
                      suffix={suffix as string}
                      decimals={target === 4.9 ? 1 : undefined}
                    />
                  </Box>
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      fontSize: 12,
                      color: "#bfcac5",
                      mt: 0.6,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              data-reveal
              sx={{
                ...stagger,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
                gap: 2.25,
              }}
            >
              {testimonials.map((x) => (
                <Paper
                  key={x.name}
                  component="article"
                  elevation={0}
                  sx={{
                    background: "#fff",
                    color: INK,
                    p: 3.75,
                    borderRadius: "17px",
                    position: "relative",
                    ...hoverLift,
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 18px 45px rgba(0,0,0,.16)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: SERIF,
                      fontSize: 55,
                      lineHeight: 0.5,
                      color: "#d8cdb9",
                    }}
                  >
                    “
                  </Typography>
                  <Typography
                    sx={{ color: "#d28a4f", letterSpacing: 2, fontSize: 12 }}
                  >
                    ★★★★★
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: SERIF,
                      fontSize: 16,
                      lineHeight: 1.6,
                      minHeight: 110,
                    }}
                  >
                    {x.text}
                  </Typography>
                  <Stack direction="row" gap={1.25} alignItems="center">
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        bgcolor: "#e4d4c1",
                        display: "grid",
                        placeItems: "center",
                        color: GREEN,
                        fontWeight: 700,
                      }}
                    >
                      {x.name[0]}
                    </Box>
                    <Box>
                      <Typography
                        component="strong"
                        sx={{ display: "block", fontSize: 11 }}
                      >
                        {x.name}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          display: "block",
                          fontSize: 11,
                          color: "#d07c42",
                          mt: 0.4,
                        }}
                      >
                        {x.tag}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Container>
        </Box>

        <Box
          component="section"
          id="sobre"
          sx={{ py: { xs: 9.5, md: 12.5 }, bgcolor: "#fff", ...reveal() }}
          data-reveal
        >
          <Container
            maxWidth={false}
            sx={{
              width: {
                xs: "calc(100% - 28px)",
                md: "min(1140px, calc(100% - 40px))",
              },
              mx: "auto",
              px: "0 !important",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 5.5, md: 12.5 },
                alignItems: "center",
              }}
            >
              <Box sx={{ ...reveal("left") }} data-reveal>
                <Kicker>SOBRE A PROFISSIONAL</Kicker>
                <Heading>
                  Prazer, eu sou a <Box component="em">Poliana.</Box>
                </Heading>
                <Typography
                  sx={{ fontFamily: SERIF, fontSize: 23, color: GREEN }}
                >
                  Nutricionista clínica apaixonada por transformar a relação das
                  pessoas com a alimentação.
                </Typography>
                <Typography sx={{ color: MUTED, lineHeight: 1.75 }}>
                  Minha abordagem é baseada em escuta, ciência e praticidade.
                  Acredito que um bom plano alimentar precisa funcionar no papel
                  e, principalmente, funcionar na vida real.
                </Typography>
                <Stack gap={1.6} mt={3.5}>
                  {[
                    "Atendimento humanizado",
                    "Estratégia individualizada",
                    "Acompanhamento contínuo",
                  ].map((x) => (
                    <Stack
                      key={x}
                      direction="row"
                      alignItems="center"
                      gap={1.25}
                      sx={{ fontSize: 13 }}
                    >
                      <ShieldCheck size={18} color={ORANGE} />
                      <strong>{x}</strong>
                    </Stack>
                  ))}
                </Stack>
              </Box>
              <Box
                sx={{
                  ...reveal("right"),
                  height: { xs: 440, md: 719 },
                  ...hoverLift,
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 50px rgba(23,63,53,.12)",
                  },
                }}
                data-reveal
              >
                <Box
                  component="img"
                  src="/Profissional.jpeg"
                  alt="Profissional de nutrição"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "20px",
                    boxShadow: "0 4px 10px rgba(0,0,0,.1)",
                  }}
                />
              </Box>
            </Box>
          </Container>
        </Box>

        <Box
          component="section"
          sx={{ py: { xs: 9.5, md: 12.5 }, bgcolor: CREAM, ...reveal() }}
          data-reveal
        >
          <Container
            maxWidth={false}
            sx={{
              width: {
                xs: "calc(100% - 28px)",
                md: "min(1140px, calc(100% - 40px))",
              },
              mx: "auto",
              px: "0 !important",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                bgcolor: GREEN,
                color: "#fff",
                borderRadius: "25px",
                p: { xs: "35px 25px", md: "65px" },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.25fr .75fr" },
                gap: { xs: 4.5, md: 7.5 },
                ...hoverLift,
                "&:hover": { boxShadow: "0 24px 60px rgba(23,63,53,.16)" },
              }}
            >
              <Box>
                <Kicker>PRÓXIMO PASSO</Kicker>
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: SERIF,
                    fontSize: { xs: 38, md: 48 },
                    mt: 1.5,
                    mb: 1.5,
                  }}
                >
                  Chega de começar de novo.
                </Typography>
                <Typography
                  sx={{ color: "#c8d1cd", lineHeight: 1.7, maxWidth: 570 }}
                >
                  Comece um acompanhamento que considera você por inteiro e
                  constrói uma estratégia possível para a sua rotina.
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 1.6,
                    mt: 3.5,
                  }}
                >
                  {[
                    "Consulta individualizada",
                    "Plano alimentar personalizado",
                    "Acompanhamento e ajustes",
                    "Suporte para suas dúvidas",
                  ].map((x) => (
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={0.9}
                      key={x}
                      sx={{ fontSize: 13, color: "#e7eeeb" }}
                    >
                      <Check size={15} color="#d99a65" />
                      {x}
                    </Stack>
                  ))}
                </Box>
              </Box>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "#fff",
                  color: INK,
                  borderRadius: "18px",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    color: ORANGE,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Vagas para novos acompanhamentos
                </Typography>
                <Typography
                  component="strong"
                  sx={{ fontFamily: SERIF, fontSize: 30, my: 1 }}
                >
                  Vamos conversar?
                </Typography>
                <PrimaryButton onClick={go} sx={{ justifyContent: "center" }}>
                  Quero começar agora <ArrowRight />
                </PrimaryButton>
                <Typography
                  component="small"
                  sx={{
                    fontSize: 10,
                    color: "#818783",
                    textAlign: "center",
                    mt: 1.6,
                  }}
                >
                  Sem compromisso. Você recebe todas as informações antes de
                  decidir.
                </Typography>
              </Paper>
            </Paper>
          </Container>
        </Box>

        <Box
          component="section"
          id="faq"
          sx={{ py: { xs: 9.5, md: 12.5 }, bgcolor: "#fff", ...reveal() }}
          data-reveal
        >
          <Container
            maxWidth={false}
            sx={{
              width: {
                xs: "calc(100% - 28px)",
                md: "min(1140px, calc(100% - 40px))",
              },
              mx: "auto",
              px: "0 !important",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: ".8fr 1.2fr" },
                gap: { xs: 5.5, md: 12.5 },
              }}
            >
              <Box>
                <Kicker>DÚVIDAS FREQUENTES</Kicker>
                <Heading>
                  Antes de começar, <Box component="em">vamos esclarecer.</Box>
                </Heading>
                <Typography sx={{ color: MUTED, lineHeight: 1.75 }}>
                  Se ainda ficou alguma dúvida, fale diretamente comigo.
                </Typography>
                <TextButton onClick={go}>
                  Falar no WhatsApp <MessageCircle size={17} />
                </TextButton>
              </Box>
              <Box
                sx={{ borderTop: `1px solid ${LINE}`, ...reveal("right") }}
                data-reveal
              >
                {faqs.map(([q, a], i) => (
                  <Accordion
                    key={q}
                    expanded={faq === i}
                    onChange={() => setFaq(faq === i ? null : i)}
                    disableGutters
                    elevation={0}
                    sx={{
                      borderBottom: `1px solid ${LINE}`,
                      "&:before": { display: "none" },
                      bgcolor: "transparent",
                      "&:hover": { bgcolor: "#faf8f3" },
                      transition: "background .25s ease",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ChevronDown />}
                      sx={{
                        minHeight: 0,
                        py: 2.75,
                        px: 0,
                        "& .MuiAccordionSummary-content": { m: 0, ml: 2.5 },
                        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":
                          { color: ORANGE, transform: "rotate(180deg)" },
                      }}
                    >
                      <Typography fontWeight={700}>{q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        px: 0,
                        pt: 0,
                        pb: 2.75,
                        ml: 2.5,
                        mr: 4.4,
                        color: MUTED,
                        fontSize: 14,
                        lineHeight: 1.7,
                      }}
                    >
                      {a}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>
          </Container>
        </Box>

        {sorteio && (
          <Box
            component="section"
            id="sorteio"
            sx={{ py: { xs: 9.5, md: 12.5 }, bgcolor: CREAM, ...reveal() }}
            data-reveal
          >
            <Sorteio apiBaseUrl="" excludedUsernames={["nutripolianacampos"]} />
          </Box>
        )}
      </Box>

      <Box
        component="footer"
        sx={{ bgcolor: "#122f28", color: "#fff", pt: 6.9, pb: 2.5 }}
      >
        <Container
          maxWidth={false}
          sx={{
            width: {
              xs: "calc(100% - 28px)",
              md: "min(/*  */1140px, calc(100% - 40px))",
            },
            mx: "auto",
            px: "0 !important",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1.5fr 1fr .4fr",
              },
              gap: 5,
              alignItems: "start",
            }}
          >
            <Box>
              <Link
                href="#top"
                underline="none"
                sx={{
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: -0.8,
                  color: "#fff",
                }}
              >
                <Box component="span" sx={{ color: ORANGE }}>
                  Nutri
                </Box>{" "}
                Poliana Campos
              </Link>
              <Typography
                sx={{
                  color: "#aebcb7",
                  fontSize: 13,
                  maxWidth: 330,
                  lineHeight: 1.6,
                }}
              >
                Nutrição personalizada para uma vida mais leve, saudável e
                possível.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", md: "1fr" },
                gap: 1.25,
                fontSize: 13,
                color: "#c4cfca",
              }}
            >
              {[
                ["Método", "#metodo"],
                ["Resultados", "#resultados"],
                ["Sobre", "#sobre"],
                ["Dúvidas", "#faq"],
              ].map(([x, h]) => (
                <Link
                  key={h}
                  href={h}
                  underline="none"
                  sx={{ color: "inherit" }}
                >
                  {x}
                </Link>
              ))}
            </Box>
            <Stack direction="row" gap={1.1}>
              <IconButton
                component="a"
                href="#"
                aria-label="Instagram"
                sx={socialSx}
              >
                <Instagram />
              </IconButton>
              <IconButton onClick={go} aria-label="WhatsApp" sx={socialSx}>
                <MessageCircle />
              </IconButton>
            </Stack>
          </Box>
          <Box
            sx={{
              borderTop: "1px solid #ffffff18",
              mt: 5,
              pt: 2.25,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
              gap: 1,
              color: "#82918b",
              fontSize: 10,
            }}
          >
            <span>
              © 2026 Nutri Poliana. Dados e depoimentos desta demonstração são
              fictícios.
            </span>
            <span>CRN 00000 • Salvador/BA</span>
          </Box>
        </Container>
      </Box>

      <Button
        onClick={go}
        startIcon={<MessageCircle fill="currentColor" />}
        sx={{
          position: "fixed",
          right: 22,
          bottom: 22,
          bgcolor: "#1ca86b",
          color: "#fff",
          borderRadius: "100px",
          px: 2.25,
          py: 1.6,
          fontWeight: 700,
          boxShadow: "0 8px 25px #0003",
          zIndex: 30,
          transition: ".22s ease",
          "&:hover": {
            bgcolor: "#1ca86b",
            transform: "translateY(-4px) scale(1.03)",
            boxShadow: "0 12px 30px rgba(28,168,107,.35)",
          },
          "@media(max-width:850px)": {
            minWidth: 50,
            width: 50,
            height: 50,
            p: 0,
            "& .MuiButton-startIcon": { m: 0 },
            "& .MuiButton-startIcon + *": { display: "none" },
          },
        }}
      >
        Fale comigo
      </Button>
    </Box>
  );
}

const socialSx = {
  width: 38,
  height: 38,
  border: "1px solid #ffffff25",
  borderRadius: "50%",
  color: "#fff",
  transition: ".2s ease",
  "& svg": { width: 17 },
  "&:hover": {
    transform: "translateY(-3px)",
    bgcolor: "#ffffff18",
    borderColor: "#ffffff55",
  },
};

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="span"
      sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.7, color: ORANGE }}
    >
      {children}
    </Typography>
  );
}
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="h2"
      sx={{
        fontFamily: SERIF,
        lineHeight: 1.08,
        letterSpacing: -1.5,
        fontSize: "clamp(38px,4.3vw,55px)",
        fontWeight: 600,
        mt: 1.6,
        mb: 2.25,
      }}
    >
      {children}
    </Typography>
  );
}
function TextButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        p: 0,
        mt: 2.5,
        color: GREEN,
        fontWeight: 700,
        "&:hover": { bgcolor: "transparent", color: ORANGE },
      }}
    >
      {children}
    </Button>
  );
}
function SectionIntro({
  kicker,
  title,
  text,
  light = false,
}: {
  kicker: string;
  title: React.ReactNode;
  text: string;
  light?: boolean;
}) {
  return (
    <Box sx={{ maxWidth: 700, mx: "auto", textAlign: "center" }}>
      <Kicker>{kicker}</Kicker>
      <Heading>{title}</Heading>
      <Typography
        sx={{ color: light ? "#bfcac5" : MUTED, lineHeight: 1.7, fontSize: 16 }}
      >
        {text}
      </Typography>
    </Box>
  );
}
