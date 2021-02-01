import React, { useState } from 'react';
import dbInterno from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import Link from '../../src/components/Link';
import Lottie from 'react-lottie';
import animationData from '../../src/assets/spiner_lottie.json'
import { motion } from 'framer-motion';

function LoadingWidget() {
  const [animationState, setAnimaationState] = useState({
    isStoped: false, isPaused: false
  });
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    }
  };

  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
          <Lottie options={defaultOptions}
              height={'100%'}
              width={'100%'}
              style={{justifySelf:'center'}}              
              isStopped={animationState.isStopped}
              isPaused={animationState.isPaused}/> 
      </Widget.Content>
    </Widget>
  );
}

function ResultgWidget({ results }) {
  return (
    <>
      <Widget>
        <Widget.Header>
          Resultado
        </Widget.Header>

        <Widget.Content>
          <p>Você acertou 
            {' '}
            {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;

            if (isAcerto) {
              return somatoriaAtual + 1;
            }

            return somatoriaAtual;

          },0)}
          {/* Ou também poderiamos fazer results.filter((x) => x).length  
          -- Vai retornar apenas um array de elementos true*/}
          {' '} 
          perguntas</p>
          <ul>
            {results.map((result,index) => (
            <li key={`result_${index}`}>
              #{index + 1 > 9 ? index + 1 : `0${index + 1}`}
              {' '} 
              Resultado:
              {result === true ? 'Acertou' : 'Errou'}
            </li>
            ))}
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
            <h1>Ficou afim de jogar outro jogo?</h1>
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
    </>    
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult
}) {
  
  const questionId = `question__${questionIndex}`;
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const [selecttedAlternative, setSelecttedAlternative] = useState(undefined);
  const isCorrect = selecttedAlternative === question.answer;
  const hasAlternativeSelected = selecttedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href='/' />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect)
              onSubmit();
              setIsQuestionSubmited(false);
              setSelecttedAlternative(undefined);
            }, 3000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selecttedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  // style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelecttedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected} >
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <p>Você acertou</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou</p>}

         </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage({dbExterno}) {
  
  let db = dbInterno;

  if (dbExterno != null) {
    db = dbExterno;
  }

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result
    ]);
  }

  // // [React chama de: Efeitos || Effects]
  // // React.useEffect
  // // atualizado === willUpdate
  // // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 4000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />)}

       {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultgWidget results={results} />} 
      </QuizContainer>
    </QuizBackground>
  );
}