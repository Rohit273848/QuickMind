import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Groq } from "groq-sdk";
import { MistralAI } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, AIMessage, trimMessages } from "langchain";



// 🔥 Advanced Idea (VERY POWERFUL)

// You can do:

// Gemini → main chat  
// Mistral → code  
// Groq → fast responses  

// 👉 Dynamic model switching 🚀





// gimini
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GOOGLE_API_KEY,
});


//groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


//mistral
//top madel "codestral-latest"
const llm = new MistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
    // other params...
})

export async function generateResponse(messages) {


    const recentMessages = messages.slice(-10)
    // gimini
    try {
        const response = await model.invoke(recentMessages.map(msg => {
            if (msg.role == "user") {
                return new HumanMessage(msg.content);
            } else {
                return new AIMessage(msg.content);
            }
        }))
        return response.text;
    } catch (err) {
        console.error("AI Error:", err);
    }

    


    // groq
    // const chatCompletion = await groq.chat.completions.create({
    //     messages: [
    //       { role: 'system', content: 'You are a helpful assistant.' },
    //       { role: 'user', content: 'Explain JWT authentication' }
    //     ],
    //     model: 'llama-3.3-70b-versatile',
    //   });

    //   console.log(chatCompletion.choices[0].message.content);



    // mistral
    // const completion = await llm.invoke("hello")
    // console.log(completion);
    // return completion;

}

export async function generateChatTitle(inputText) {
    const title = await llm.invoke([
        new SystemMessage(`You are an expert at generating concise, meaningful titles.

Your task is to create a short, clear, and specific title for a conversation.

Rules:
- Maximum 5 words
- Capture the main intent of the user
- Use simple, natural language
- Prefer action-oriented titles (e.g., "Build Chatbot Backend")
- Avoid vague words like "chat", "discussion", "question"
- Do not include punctuation at the end
- Do not add explanations or extra text

Return only the title.`),
        new HumanMessage(inputText)
    ])

    return title;
}