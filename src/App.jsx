import './App.css';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress';

// import LoadingButton from '@mui/lab/LoadingButton';
// import SendIcon from '@mui/icons-material/Send';

function App() {
  const [aiResult, setAiResult] = useState('')
  const [answer, setAnswer] = useState('')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false);


  function getAxiosResponse() {
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

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data.choices[0].text)
        setAnswer(response.data.choices[0].text)
        setAiResult(answer)
        setLoading(true)

        console.log(response.data);
        // console.log(answer)
        // console.log(aiResult)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  useEffect(() => {
    setAiResult(answer)
    console.log(answer)
    console.log(aiResult)
  }, [answer, aiResult, loading]);

  return (
    <div className="App">
      <Box sx={{ width: '100%' }}>
        {loading && <LinearProgress />}
      </Box>
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
            label="Let's hear it."
            multiline
            size="large"
            maxRows={8}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{
              marginBottom: 3
            }}
          // value={value}
          // onChange={handleChange}
          />
          <h2>🤖 :</h2>
          <p>{aiResult}</p>
          {/* <LoadingButton
            onClick={getAxiosResponse}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            Submit
        </LoadingButton> */}
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
    </div>
  );
}

export default App;
