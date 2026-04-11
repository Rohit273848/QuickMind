import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Groq } from "groq-sdk";
import { MistralAI } from "@langchain/mistralai"

//gimini
// const model = new ChatGoogleGenerativeAI({
//     model: "gemini-2.5-flash",
//     apiKey: process.env.GOOGLE_API_KEY,
// });


//groq
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


//mistral
const llm = new MistralAI({
    model: "codestral-latest",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
  })

export async function testapi() {

    
//gimini
    // model.invoke("Explain JWT authentication").then((response) => {
    //     console.log(response.text);

    // })


// groq
    // const chatCompletion = await groq.chat.completions.create({
    //     messages: [
    //       { role: 'system', content: 'You are a helpful assistant.' },
    //       { role: 'user', content: 'Explain JWT authentication' }
    //     ],
    //     model: 'llama-3.3-70b-versatile',
    //   });
    
    //   console.log(chatCompletion.choices[0].message.content);
   


//mistral
// const inputText = "Explain JWT authentication"
// const completion = await llm.invoke(inputText)

// console.log(completion);

   
}