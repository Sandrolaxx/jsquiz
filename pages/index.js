import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import db from '../db.json';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const audioTrack = useRef();

  //Ia fazer tocar a música mas da pal no webpack :C
  function handlePlay() {
    audioTrack.current.volume = 0.3;
    audioTrack.current.play();
  }

  return (
    <QuizBackground backgroundImage={db.bg} onLoad={handlePlay}>
      <audio ref= { audioTrack } src='../src/assets/song.mp3' track="The Rebel Path Ciello"/>
      <QuizContainer>
        <QuizLogo />
        <Widget
         as={motion.section}
         variants={{
          show: { opacity: 1, y:'0' },
          hidden: { opacity: 0, y:'100%' }
         }}
         initial='hidden'
         animate='show'
         transition={{ delay: 0, duration: 1 }}
        >          
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <Widget.Form onSubmit={(e) => {
              e.preventDefault();                         
              router.push(`/quiz?name=${name}`)
            }}> 
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
               <Button type="submit"
                       disabled={name.length === 0} >
                {`Jogar ${name}`}
              </Button>
            </Widget.Form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, y:'0' },
          hidden: { opacity: 0, y:'100%' }
          }}
          initial='hidden'
          animate='show'
          transition={{ delay: 0.10, duration: 1 }}
        >
          <Widget.Content>
            <h1>Outros Quizzes de Jogos</h1>

            <ul>
            {db.external.map((linkExterno, index) => {
              const [projectName, gitHubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');
              
              return (
                <>
                <h3>
                {db.external[index] === 'https://imersao-react-project.brenonortega.vercel.app/' ? 
                    'Dark souls III' : 'World Of Warcraft'}
                </h3>
                <li key={projectName}>
                  <Widget.Topic
                    as={Link} 
                    href={`quiz/${projectName}___${gitHubUser}`}
                  >
                    {`${projectName}/${gitHubUser}`}
                  </Widget.Topic>
                </li>
                </>
                );
            })}
            </ul>

          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, y:'0' },
          hidden: { opacity: 0, y:'100%' }
          }}
          initial='hidden'
          animate='show'
          transition={{ delay: 0.10, duration: 1 }}
        >
          <Widget.Content>
          <>
            <h1>Ficou afim de jogar um jogo?</h1>
            <p>Então da uma olha no Projeto Gabriellix! 
                Um jogo desenvolvido na incrivél semana
                GameDev da Alura.
            </p>
            <Widget.Topic
              as={Link} 
              href={`https://gabrielix-semana-alura-game-dev.netlify.app/`}
            >
              Jogo da Bruxinha Gabriellix
            </Widget.Topic>
          </>
          </Widget.Content>
        </Widget>

        <Footer 
          as={motion.footer}
          variants={{
            show: { opacity: 1, y:'0' },
          hidden: { opacity: 0, y:'100%' }
          }}
          initial='hidden'
          animate='show'
          transition={{ delay: 0.15, duration: 1 }}
        />
      </QuizContainer>
      <GitHubCorner projectUrl='https://github.com/sandrolaxx' />
    </QuizBackground>
  );
}
