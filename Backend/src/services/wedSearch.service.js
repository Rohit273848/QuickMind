
import { tool } from "langchain";
import * as z from "zod"

import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVITY_API});



export const web_search = tool(
    async ({query})=>{
        const response = await tvly.search(query);
       return JSON.stringify(response.results)
    },{
        name:"web_search",
        description: "Search the web for latest information",
        schema:z.object({
            query:z.string().describe("Search query"),
        })
    }
)

