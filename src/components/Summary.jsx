import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../data/questions.js';

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}% <br/></span>
          <span className="text">skipped</span>
          <span className="sup-text">
            (
              {skippedAnswers.length} question
              {skippedAnswers.length > 1 ? 's' : ''}
              )
          </span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
          <span className="sup-text">
            (
              {correctAnswers.length} question
              {correctAnswers.length > 1 ? 's' : ''}
              )
          </span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
          <span className="sup-text">
            (
              {userAnswers.length - correctAnswers.length} question
              {userAnswers.length - correctAnswers.length > 1 ? 's' : ''}
              )
          </span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer ';
let correctAnswer = QUESTIONS[index].answers[0];
let displayCorrectAnswerer =false
          if (answer === null) {
            cssClass += 'skipped';
            displayCorrectAnswerer = true
          } else if (answer === correctAnswer) {
            cssClass += 'correct';
          } else {
            cssClass += 'wrong';
            displayCorrectAnswerer = true
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
             {displayCorrectAnswerer && <p className="user-answer correct">Right answer: {correctAnswer}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
