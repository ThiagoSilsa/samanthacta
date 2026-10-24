// external
import { ImageResponse } from "next/og";

// data
import { profile } from "@/data/profile";
import { site } from "@/data/site";

export const alt = "Samantha Albuquerque — portfólio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem de Open Graph gerada em código, não um arquivo binário.
 *
 * Usa a paleta do site e o par tipográfico não está disponível aqui (o `ImageResponse` só
 * carrega fonte enviada explicitamente), então a composição fica com a família padrão — o
 * que importa no card de WhatsApp e LinkedIn é a hierarquia e a cor, não a serifa.
 *
 * Texto em português: é a língua da cliente e do público principal. Imagem de OG por idioma
 * exigiria uma rota por locale, o que não se paga agora.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        backgroundColor: "#f3e5c2",
        color: "#1d120e",
        padding: 72,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: 4,
          color: "#490b0c",
        }}
      >
        PORTFÓLIO
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 88, lineHeight: 1.05 }}>{site.name}</div>
        <div style={{ marginTop: 20, fontSize: 34, color: "#462e24" }}>
          Estudante de Psicologia · UFF Niterói
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 26, color: "#462e24" }}>
        {profile.email}
      </div>
    </div>,
    size,
  );
}
