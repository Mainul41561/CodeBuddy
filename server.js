const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();
const port = 3000;


app.use(cors({
  origin: "*",
}));
app.use(express.static("public"));
app.use(express.json());



app.post("/get-response", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post("https://api.openai.com/v1/engines/davinci-codex/completions", {
      prompt: message,
      max_tokens: 50,
    }, {
      headers: {
        "Authorization": "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",
        "Content-Type": "application/json",
      },
    });

    const chatbotResponse = response.data.choices[0].text.trim();
    res.send("hello")
    res.send(chatbotResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
});

// Routing the server to the font file
app.get("/fonts/DMSans-Regular.ttf", (req, res) => {
  res.sendFile(__dirname + "/fonts/DMSans-Regular.ttf");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





//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
//npm init -y
//npm install express axios
// node server.js