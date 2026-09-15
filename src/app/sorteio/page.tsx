import Sorteio from "@/components/Sorteio";

export default function SorteioPage() {
  return (
    <main>
      <Sorteio
        apiBaseUrl={
          process.env.NEXT_PUBLIC_API_URL ||
          "https://nutri-back-two.vercel.app"
        }
        excludedUsernames={["nutripolianacampos"]}
      />
    </main>
  );
}
