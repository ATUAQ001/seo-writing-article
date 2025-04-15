
const apiKey = "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"; // Replace with your OpenAI API Key

document.getElementById("seoForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const keyword = document.getElementById("keyword").value;
  const language = document.getElementById("language").value;
  const tone = document.getElementById("tone").value;
  const wordCount = document.getElementById("wordCount").value;

  const prompt = `Write a ${tone.toLowerCase()} SEO-optimized article in ${language} about "${keyword}" in approximately ${wordCount} words. Include an engaging title, meta description, and subheadings.`;

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: parseInt(wordCount) * 2,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const result = data.choices[0].text.trim();

    document.getElementById("result").innerText = result;
    document.getElementById("output").style.display = "block";
  } catch (error) {
    alert("Error generating content. Please check your API key and try again.");
    console.error(error);
  }
});

function downloadText() {
  const text = document.getElementById("result").innerText;
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "seo-article.txt";
  a.click();
}
