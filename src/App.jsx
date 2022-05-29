import './App.css';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress';
import History from './Components/History'

function App() {
  const [aiResult, setAiResult] = useState('')
  const [answer, setAnswer] = useState('')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(false)

  const [promptArr, setPromptArr] = useState([])
  const [aiArr, setAiArr] = useState([])

  function getAxiosResponse() {
    setLoading(true)
    const axios = require('axios');
    const data = JSON.stringify({
      "prompt": prompt,
      "temperature": 0,
      "max_tokens": 20,
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
        setAnswer(response.data.choices[0].text)
        setAiResult(answer)
        setLoading(false)
        setHistory(true)
        // setAiArr([...aiArr, { aiResult }])
        setPromptArr([...promptArr, { prompt }])
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  useEffect(() => {
    setAiResult(answer)
    setAiArr([...aiArr, { answer }])
    console.log(promptArr)
    console.log(aiArr)
  }, [answer, aiResult, loading]);

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
          <h2>🤖 :</h2>
          <p>{aiResult}</p>
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
      {history &&
        <ul className="todo-list">
          {Object.entries(promptArr).map(([key, value]) => (
            <p>{key}</p>
          ))}
        </ul>}
      {/* {history &&
        <History
          prompt={prompt}
          aiResult={aiResult}
        />} */}
    </div>
  );
}

export default App;
