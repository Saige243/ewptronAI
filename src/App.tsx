import './App.css';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress';

function Ewptron() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(false)
  const [lastAnswer, setLastAnswer] = useState<string>('')

  const [promptArr, setPromptArr] = React.useState<Array<any>>([])

  function getAxiosResponse() {
    setLoading(true)
    const axios = require('axios');
    const data = JSON.stringify({
      "prompt": prompt,
      "temperature": 0,
      "max_tokens": 80,
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

    interface Response {
      response?: string,
      data?: {
        choices: Array<any>
      }
    }

    axios(config)
      .then(function (response: Response) {
        const answer: string = response?.data?.choices[0].text
        setLoading(false)
        setHistory(true)
        setPromptArr([...promptArr, { prompt, answer }])
        setLastAnswer(answer)
      })
      .catch(function (error: string) {
        console.log(error);
      });
  }

  useEffect(() => {
  }, [promptArr]);

  return (
    <div className="App">
      <Box sx={{ width: '100%' }}>
        {loading && <LinearProgress />}
      </Box>
      <h1>🤖 Hello there! I'm Ewptron.🤖</h1>
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
            size="medium"
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
              marginBottom: 2,
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
        marginRight: 7
      }}>
        <p>
          {history &&
            Object.values(promptArr).map((valueName, i) => (
              <>
                <li key={i}>
                  🤔: {valueName.prompt}
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

export default Ewptron;