import './App.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'


function App() {
  // const { Configuration, OpenAIApi } = require("openai");
  const [result, setResult] = useState('')
  const [answer, setAnswer] = useState('')
  // const configuration = new Configuration({
  //   apiKey: "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",
  // });
  const OpenAI = require('openai-api');

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const openai = new OpenAI('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');

  function getOpenAiResponse() {
    (async () => {
      const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: 'Is it working?!',
        maxTokens: 9,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n', "testing"]
      });

      console.log(gptResponse.data);
    })();
  }

  function submitForm() {
    setAnswer(result)
    getOpenAiResponse()
  }

  return (
    <div className="App">
      <h1>🤖 Hi! I'm Charles.🤖</h1>
      <h3>Ask me anything. I'll cut to the chase.</h3>
      <Box
        sx={{
          width: "100%",
          justifyContent: "center"
        }}
      >
        <FormControl
          sx={{
            width: "90%"
          }}
        >
          <h3>🤔 :</h3>
          <TextField
            id="outlined-multiline-flexible"
            label="Ask me anything!"
            multiline
            size="large"
            maxRows={8}
            onChange={(e) => setResult(e.target.value)}
            sx={{
              marginBottom: 3
            }}
          // value={value}
          // onChange={handleChange}
          />
          <h2>🤖 :</h2>
          {answer}
          <Button
            sx={{
              marginTop: 3
            }}
            variant="outlined"
            onClick={getOpenAiResponse}
          >
            Submit
          </Button>
        </FormControl>
        <h2></h2>
      </Box>
    </div>
  );
}

export default App;
