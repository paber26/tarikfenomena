require("dotenv").config()

const API_KEY = process.env.GEMINI_API_KEY

const ENDPOINT = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent"

async function main() {
  try {
    const response = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Jelaskan apa itu database secara sederhana dalam 2 paragraf lengkap dengan bahasa yang mudah dipahami."
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 10000
        }
      })
    })

    const data = await response.json()

    console.log("=== FULL RESPONSE ===")
    console.log(JSON.stringify(data, null, 2))

    if (data.candidates) {
      console.log("\n=== TEXT OUTPUT ===")
      console.log(data.candidates[0].content.parts[0].text)
    }
  } catch (error) {
    console.error("ERROR:", error)
  }
}

main()
