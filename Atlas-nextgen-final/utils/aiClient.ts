export async function generate(prompt: string){
  // In production wire up OpenAI or other provider
  return { text: `AI fallback: ${prompt.slice(0,200)}` }
}
