import React from 'react'
import Box from '@mui/material/Box'


export default function History(props) {
  return (
    <Box
      sx={{
        textAlign: 'left',
        marginTop: 6,
        marginLeft: 4
      }}
    >
      <p>😀 :{props.prompt}</p>
      <p>🤖 :{props.aiResult}</p>
    </Box>
  )
}
