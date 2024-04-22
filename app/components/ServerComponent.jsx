 import QuizComponent from './QuizComponent.jsx';

//define URL for fetching multiple choice trivia questions from the Open Trivia Database API
const triviaURL = 'https://opentdb.com/api.php?amount=13&category=12&type=multiple';

//fetch trivia questions from the API
const fetchQuestions = async () => {
  
  const response = await fetch(triviaURL);
  //parse the response into JSON
  const data = await response.json();

  //iterate over questions, replace special characters in each field
  data.results.forEach((question) => {
    //replace special characters in question text
    question.question = question.question.replace(/&quot;/g, '"');
    question.question = question.question.replace(/&#039;/g, "'");
    question.question = question.question.replace(/&amp;/g, '&');
    question.question = question.question.replace(/&eacute;/g, 'é');

    //replace special characters in correct answer
    question.correct_answer = question.correct_answer.replace(/&quot;/g, '"');
    question.correct_answer = question.correct_answer.replace(/&#039;/g, "'");
    question.correct_answer = question.correct_answer.replace(/&amp;/g, '&');
    question.correct_answer = question.correct_answer.replace(/&eacute;/g, 'é');

    //replace special characters in each incorrect answers
    question.incorrect_answers = question.incorrect_answers.map(answer => {
    return answer.replace(/&quot;/g, '"')
                  .replace(/&#039;/g, "'")
                  .replace(/&amp;/g, '&')
                  .replace(/&eacute;/g, 'é');
    });

});

  //return the modified results array
  return data.results;
};

//define ServerComponent as an async function that fetches trivia questions 
//returns a QuizComponent with questions as a prop
const ServerComponent = async () => {
  const questions = await fetchQuestions();

  return <QuizComponent questions={questions} />;
};

export default ServerComponent;
