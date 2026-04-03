import "dotenv/config";

const scanImageWithAI = async (base64Image) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Identify the main product or objects in this image. Provide a comma-separated list of 3-5 product names or categories that would be good recommendations for someone interested in this item. Keep it concise." },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 100,
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );

    const data = await response.json();
    if (!data.choices || !data.choices.length) {
       // Fallback for demo if API fails/no key
       return "Smart Watch, Wireless Earbuds, Mechanical Keyboard, Gaming Mouse";
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error("OpenAI Vision Error:", error.message);
    return "Smart Watch, Wireless Earbuds, Mechanical Keyboard, Gaming Mouse";
  }
};

export default scanImageWithAI;
