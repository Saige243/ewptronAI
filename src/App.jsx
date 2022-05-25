import './App.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'


function App() {
  const [result, setResult] = useState('')
  const [answer, setAnswer] = useState('')

  function getAxiosResponse() {
    const axios = require('axios');
    const data = JSON.stringify({
      "prompt": "Do you prefer TS Eliot or William Carlos Williams?",
      "temperature": 0,
      "max_tokens": 60,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0
    });

    const config = {
      method: 'post',
      url: 'https://api.openai.com/v1/engines/text-davinci-002/completions',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <h1>🤖 Hi! I'm Ewptron.🤖</h1>
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
            onClick={getAxiosResponse}
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
