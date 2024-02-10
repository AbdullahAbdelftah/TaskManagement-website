import {config} from "dotenv" 
config()
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.API_KEY // This is also the default, can be omitted
});
async function gpt(msg){
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": msg}],
      });
      return chatCompletion.choices[0].message.content;
}
export {gpt}