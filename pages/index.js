import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import db from '../db.json';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <Widget.Form onSubmit={(e) => {
              e.preventDefault();                         
              router.push(`/quiz?name=${name}`)
            }}> 
              <input 
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder='-DIGITE SEU NOME-'
              /> 
              <button type='submit' disabled={name.length === 0} >
              Bora Jogar {name}
              </button>
            </Widget.Form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <p>Quiz da massa</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl='https://github.com/sandrolaxx' />
    </QuizBackground>
  );
}
