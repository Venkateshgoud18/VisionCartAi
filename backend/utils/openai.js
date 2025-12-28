import "dotenv/config";

const getOpenAIAPIResponce = async (messages) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: messages }
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );

    const data = await response.json();

    // 🔴 ADD THIS LOG
    console.log("OpenAI raw response:", JSON.stringify(data, null, 2));

    // ✅ SAFETY CHECK
    if (!data.choices || !data.choices.length) {
      throw new Error(data.error?.message || "No choices returned");
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error("OpenAI API Error:", error.message);
    throw new Error("OpenAI request failed");
  }
};

export default getOpenAIAPIResponce;
