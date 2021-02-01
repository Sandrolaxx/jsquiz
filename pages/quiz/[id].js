import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizPage from '.';

export default function QuizDaMassa({ dbExterno }) {
  return(
    <div>
      <ThemeProvider theme={dbExterno.theme}>
        <QuizPage dbExterno={dbExterno}/>
      </ThemeProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [projectName, gitHubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
    .then((respostaServer) => {
      
      if (respostaServer.ok) {
        return respostaServer.json();
      }

      throw new Error('Falha ao realizar a conversão dos dados!');
    })
    .then((respostaConvertidaJson) => {
      return respostaConvertidaJson;
    })
    .catch((error) =>{
      console.log(error)
    })

  return { 
    props: {
      dbExterno,
    }
  }
}