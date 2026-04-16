import { Groq } from "groq-sdk";
import { MistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "langchain";
import { web_search } from "./wedSearch.service.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// groq (fast responses)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// gemini (title only)
const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

// mistral (web answers)
const llm = new MistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
  const recentMessages = messages.slice(-10);
  const lastMessage = recentMessages[recentMessages.length - 1]?.content || "";

  const shouldSearch = /latest|news|news|today|current|2026|recent/i.test(lastMessage);

  try {
    // 🔥 WEB SEARCH FLOW
    if (shouldSearch) {
      const rawResults = await web_search.invoke({ query: lastMessage });

      let results = [];
      try {
        results = JSON.parse(rawResults);
      } catch {
        results = [];
      }

      const formattedResults = results
        .slice(0, 5)
        .map(
          (r, i) => `
${i + 1}. ${r.title}
${r.content}
Source: ${r.url}
`
        )
        .join("\n");

      const response = await llm.invoke([
        new SystemMessage(`
You are an AI assistant like Perplexity.

STRICT FORMATTING RULES:
- Always return clean Markdown
- Use ## headings
- Use bullet points
- Keep it structured and readable

RESPONSE FORMAT:

## Title

## Summary
- Point 1
- Point 2

## Details

IMPORTANT:
- Do NOT include sources in the answer
- Sources are handled separately

        `),

        new HumanMessage(`
User Question:
${lastMessage}

Web Results:
${formattedResults}
        `),
      ]);

      // 🔥 FIX 1: Ensure text extraction
      let answer = "No response generated";

      if (typeof response === "string") {
        answer = response;
      } else if (response?.content) {
        if (Array.isArray(response.content)) {
          answer = response.content.map(c => c.text).join("\n");
        } else {
          answer = response.content;
        }
      }


      return {
        answer,
        sources: results.slice(0, 5),
      };
    }

    // 🔥 NORMAL CHAT FLOW (GROQ)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
You are a helpful AI assistant.

FORMAT RULES:
- Use Markdown
- Use bullet points
- Keep answers clean
          `,
        },
        ...recentMessages.map((msg) => ({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content,
        })),
      ],
      model: "llama-3.3-70b-versatile",
    });

    const answer =
      chatCompletion?.choices?.[0]?.message?.content ||
      "No response generated";

    return {
      answer,
      sources: [], // 🔥 FIX 2: ALWAYS return sources
    };
  } catch (err) {
    console.error("AI Error:", err);

    // 🔥 FIX 3: Always return safe object
    return {
      answer: "Something went wrong while generating response.",
      sources: [],
    };
  }
}

// 🔥 TITLE FUNCTION (UNCHANGED BUT SAFE)
export async function generateChatTitle(inputText) {
  try {
    const response = await gemini.invoke([
      new SystemMessage(`You are an expert at generating concise titles.
Return only a short title (max 5 words).`),
      new HumanMessage(inputText),
    ]);

    return response.text?.trim() || inputText.slice(0, 20);
  } catch (error) {
    console.error("Title Error:", error);
    return inputText.slice(0, 20);
  }
}