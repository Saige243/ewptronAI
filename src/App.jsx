import './App.css';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress';


function App() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(false)
  const [lastAnswer, setLastAnswer] = useState('')

  const [promptArr, setPromptArr] = useState([])
  const [aiArr, setAiArr] = useState([])

  function getAxiosResponse() {
    setLoading(true)
    const axios = require('axios');
    const data = JSON.stringify({
      "prompt": prompt,
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
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        const answer = response.data.choices[0].text
        setLoading(false)
        setHistory(true)
        // setPromptArr([...promptArr, { prompt }])
        setPromptArr([...promptArr, { prompt, answer }])
        // setAiArr([...aiArr, { answer }])
        setLastAnswer(answer)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log(lastAnswer)
    console.log(promptArr)
    console.log(aiArr)
  }, [promptArr]);

  return (
    <div className="App">
      <Box sx={{ width: '100%' }}>
        {loading && <LinearProgress />}
      </Box>
      <h1>🤖 Hi! I'm Ewptron.🤖</h1>
      <h3>Ask me anything.</h3>
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
            label="Let's hear it."
            multiline
            size="large"
            maxRows={8}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{
              marginBottom: 3
            }}
          />
          {history &&
            <>
              <h2>🤖 :</h2>
              <p>{lastAnswer}</p>
            </>
          }
          <Button
            sx={{
              marginTop: 3,
            }}
            variant="outlined"
            onClick={getAxiosResponse}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
      <ul style={{
        textAlign: "left",
        margin: 1
      }}>
        <p>
          {history &&
            Object.values(promptArr).map((valueName, i) => (
              <>
                <li key={i}>
                  😀: {valueName.prompt}
                </li>
                <li
                  style={{
                    paddingBottom: "1rem"
                  }}
                >
                  🤖: {valueName.answer}
                </li>
              </>
            ))
          }
        </p>
      </ul>
    </div>
  );
}

export default App;