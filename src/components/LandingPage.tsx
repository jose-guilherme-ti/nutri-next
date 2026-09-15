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
import Counter from "@/components/Counter";
import Sorteio from "@/components/Sorteio";
import "@/styles/landing.css";

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
    const items = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .stagger"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function LandingPage() {
  useReveal();
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const sorteio = searchParams.get("sorteio");

  const go = () =>
    window.open(
      "https://wa.me/5571996553137?text=Olá!%20Quero%20saber%20como%20funciona%20o%20acompanhamento%20nutricional.",
      "_blank"
    );

  return (
    <div className="page">
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#top">
            <span>Nutri</span> Poliana Campos
          </a>
          <nav className={menu ? "navlinks open" : "navlinks"}>
            <a href="#metodo" onClick={() => setMenu(false)}>
              Método
            </a>
            <a href="#resultados" onClick={() => setMenu(false)}>
              Resultados
            </a>
            <a href="#sobre" onClick={() => setMenu(false)}>
              Sobre
            </a>
            <a href="#faq" onClick={() => setMenu(false)}>
              Dúvidas
            </a>
            {sorteio && (
              <a href="#sorteio" onClick={() => setMenu(false)}>
                Sorteio
              </a>
            )}
            <button className="navcta" onClick={go}>
              Quero começar <ArrowRight size={16} />
            </button>
          </nav>
          <button
            className="menubtn"
            onClick={() => setMenu(!menu)}
            aria-label="Menu"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroGlow" />
          <div className="container heroGrid">
            <div className="heroCopy reveal-left">
              <div className="eyebrow">
                <span className="dot" /> ATENDIMENTO ONLINE E PRESENCIAL
              </div>
              <h1>
                Emagreça com estratégia, <em>sem viver de dieta.</em>
              </h1>
              <p className="heroText">
                Um acompanhamento nutricional pensado para a sua rotina, seus
                objetivos e a sua realidade — sem terrorismo alimentar e sem
                fórmulas prontas.
              </p>
              <div className="heroActions">
                <button className="primary" onClick={go}>
                  Quero transformar minha alimentação <ArrowRight />
                </button>
                <a className="secondary" href="#metodo">
                  <Play size={16} fill="currentColor" /> Conheça o método
                </a>
              </div>
              <div className="trust">
                <div className="avatars">
                  <span>AM</span>
                  <span>JC</span>
                  <span>MR</span>
                  <span>+</span>
                </div>
                <div>
                  <div className="stars">★★★★★</div>
                  <strong>+500 pacientes acompanhados</strong>
                  <small>
                    Experiências e resultados construídos com acompanhamento.
                  </small>
                </div>
              </div>
            </div>
            <div className="heroVisual reveal-right">
              <div className="imageCard">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Apresentacao.jpeg"
                  alt="Nutricionista em ambiente profissional"
                />
                <div className="floatingCard">
                  <div className="checkCircle">
                    <Check size={17} />
                  </div>
                  <div>
                    <strong>Plano personalizado</strong>
                    <span>Feito para a sua rotina</span>
                  </div>
                </div>
                <div className="leaf">✦</div>
              </div>
            </div>
          </div>
        </section>

        <section className="problem reveal">
          <div className="container">
            <div className="sectionIntro center">
              <span className="kicker">SE ISSO PARECE COM VOCÊ...</span>
              <h2>
                Você não precisa de <em>mais uma dieta.</em>
              </h2>
              <p>
                Talvez o problema não seja falta de força de vontade. Pode ser
                que você ainda não tenha encontrado uma estratégia que respeite
                a sua vida.
              </p>
            </div>
            <div className="problemGrid stagger">
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
                <article className="problemCard reveal" key={n}>
                  <span>{n}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="method reveal" id="metodo">
          <div className="container">
            <div className="twoCol">
              <div className="methodImage reveal-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85"
                  alt="Alimentação saudável"
                />
                <div className="miniStat">
                  <Sparkles size={18} />
                  <div>
                    <strong>Individualidade</strong>
                    <span>Sem plano genérico</span>
                  </div>
                </div>
              </div>
              <div className="methodCopy reveal-right">
                <span className="kicker">O MÉTODO</span>
                <h2>
                  Nutrição que <em>se adapta a você.</em>
                </h2>
                <p>
                  O acompanhamento começa entendendo onde você está hoje. A
                  partir daí, construímos uma estratégia possível de manter — e
                  ajustamos conforme sua evolução.
                </p>
                <div className="steps">
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
                    <div className="step reveal" key={n}>
                      <b>{n}</b>
                      <div>
                        <h3>{t}</h3>
                        <p>{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="textButton" onClick={go}>
                  Quero conhecer meu plano <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="results reveal" id="resultados">
          <div className="container">
            <div className="sectionIntro center light">
              <span className="kicker">RESULTADOS REAIS</span>
              <h2>
                Pequenas mudanças. <em>Grandes diferenças.</em>
              </h2>
              <p>
                Exemplos ilustrativos com dados fictícios para demonstração
                desta landing page.
              </p>
            </div>
            <div className="resultStats reveal">
              <div>
                <Counter target={500} suffix="+" />
                <span>pessoas acompanhadas</span>
              </div>
              <div>
                <Counter target={92} suffix="%" />
                <span>relatam maior organização alimentar</span>
              </div>
              <div>
                <Counter target={4.9} suffix="/5" decimals={1} />
                <span>avaliação média dos atendimentos</span>
              </div>
            </div>
            <div className="testimonials stagger">
              {testimonials.map((x) => (
                <article className="testimonial reveal" key={x.name}>
                  <div className="quote">“</div>
                  <div className="stars">★★★★★</div>
                  <p>{x.text}</p>
                  <div className="person">
                    <div className="avatar">{x.name[0]}</div>
                    <div>
                      <strong>{x.name}</strong>
                      <span>{x.tag}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about reveal" id="sobre">
          <div className="container twoCol aboutGrid">
            <div className="aboutCopy reveal-left">
              <span className="kicker">SOBRE A PROFISSIONAL</span>
              <h2>
                Prazer, eu sou a <em>Poliana.</em>
              </h2>
              <p className="lead">
                Nutricionista clínica apaixonada por transformar a relação das
                pessoas com a alimentação.
              </p>
              <p>
                Minha abordagem é baseada em escuta, ciência e praticidade.
                Acredito que um bom plano alimentar precisa funcionar no papel
                e, principalmente, funcionar na vida real.
              </p>
              <div className="credentials">
                <div>
                  <ShieldCheck />
                  <strong>Atendimento humanizado</strong>
                </div>
                <div>
                  <ShieldCheck />
                  <strong>Estratégia individualizada</strong>
                </div>
                <div>
                  <ShieldCheck />
                  <strong>Acompanhamento contínuo</strong>
                </div>
              </div>
            </div>
            <div className="aboutPhoto reveal-right">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Profissional.jpeg" alt="Profissional de nutrição" />
            </div>
          </div>
        </section>

        <section className="offer reveal">
          <div className="container">
            <div className="offerBox reveal">
              <div>
                <span className="kicker">PRÓXIMO PASSO</span>
                <h2>Chega de começar de novo.</h2>
                <p>
                  Comece um acompanhamento que considera você por inteiro e
                  constrói uma estratégia possível para a sua rotina.
                </p>
                <div className="offerList">
                  <span>
                    <Check /> Consulta individualizada
                  </span>
                  <span>
                    <Check /> Plano alimentar personalizado
                  </span>
                  <span>
                    <Check /> Acompanhamento e ajustes
                  </span>
                  <span>
                    <Check /> Suporte para suas dúvidas
                  </span>
                </div>
              </div>
              <div className="offerCta">
                <span>Vagas para novos acompanhamentos</span>
                <strong>Vamos conversar?</strong>
                <button className="primary" onClick={go}>
                  Quero começar agora <ArrowRight />
                </button>
                <small>
                  Sem compromisso. Você recebe todas as informações antes de
                  decidir.
                </small>
              </div>
            </div>
          </div>
        </section>

        <section className="faq reveal" id="faq">
          <div className="container faqGrid">
            <div>
              <span className="kicker">DÚVIDAS FREQUENTES</span>
              <h2>
                Antes de começar, <em>vamos esclarecer.</em>
              </h2>
              <p>Se ainda ficou alguma dúvida, fale diretamente comigo.</p>
              <button className="textButton" onClick={go}>
                Falar no WhatsApp <MessageCircle size={17} />
              </button>
            </div>
            <div className="faqList reveal-right">
              {faqs.map(([q, a], i) => (
                <div
                  className={"faqItem " + (faq === i ? "active" : "")}
                  key={q}
                >
                  <button onClick={() => setFaq(faq === i ? null : i)}>
                    <span>{q}</span>
                    <ChevronDown />
                  </button>
                  {faq === i && <p>{a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {sorteio && (
          <section className="method reveal" id="sorteio">
            <Sorteio
              apiBaseUrl={
                process.env.NEXT_PUBLIC_API_URL ||
                "https://nutri-back-two.vercel.app"
              }
              excludedUsernames={["nutripolianacampos"]}
            />
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="container footerTop">
          <div>
            <a className="brand" href="#top">
              <span>Nutri</span> Poliana Campos
            </a>
            <p>
              Nutrição personalizada para uma vida mais leve, saudável e
              possível.
            </p>
          </div>
          <div className="footerLinks">
            <a href="#metodo">Método</a>
            <a href="#resultados">Resultados</a>
            <a href="#sobre">Sobre</a>
            <a href="#faq">Dúvidas</a>
          </div>
          <div className="social">
            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>
            <button onClick={go} aria-label="WhatsApp">
              <MessageCircle />
            </button>
          </div>
        </div>
        <div className="container footerBottom">
          <span>
            © 2026 Nutri Poliana. Dados e depoimentos desta demonstração são
            fictícios.
          </span>
          <span>CRN 00000 • Salvador/BA</span>
        </div>
      </footer>
      <button className="whatsapp" onClick={go}>
        <MessageCircle fill="currentColor" /> <span>Fale comigo</span>
      </button>
    </div>
  );
}
