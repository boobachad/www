import { ImageResponse } from "next/og"

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    if (!resource[1]) throw new Error('Resource URL is undefined');
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error("failed to load font data")
}

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams, protocol, host } = new URL(request.url)
  const title = searchParams.get("title")
  const text = title ? `boobachad's blog • ${title}` : "boobachad's blog"

  const imageResponse = await fetch(`${protocol}//${host}/pic1.jpg`);
  const imageData = await imageResponse.arrayBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111",
          fontFamily: "Inter",
          padding: "40px",
          position: "relative",
        }}
      >
        <img
          // @ts-ignore
          src={imageData}
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            maxWidth: "90%",
          }}
        >
          <span
            style={{
              color: "#ff6b35",
              fontSize: 48,
              flexShrink: 0,
            }}
          >
            *
          </span>
          <h1
            style={{
              fontSize: 48,
              color: "#fff",
              margin: 0,
              lineHeight: 1.2,
              wordBreak: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
            }}
          >
            {text}
          </h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await loadGoogleFont("Inter", text),
          style: "normal",
        },
      ],
    }
  )
}
