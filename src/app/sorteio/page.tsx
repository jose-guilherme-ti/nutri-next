import Sorteio from "@/components/Sorteio";

export default function SorteioPage() {
  return (
    <main>
      <Sorteio
        apiBaseUrl=""
        excludedUsernames={["nutripolianacampos"]}
      />
    </main>
  );
}
