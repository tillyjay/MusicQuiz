"use client";

import React, { useEffect, useState } from 'react';
import { answerQuestion } from '../actions/answerQuestion';

//functional component that takes a list of questions as props
const QuizComponent = ({ questions }) => {

    //initialize state variables for current question, it's index, 
    //user's score, selected answer, it's index, shuffled answers, 
    //quiz starting, and quiz completion
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentQuestionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); 
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    //initialize current question when questions are loaded and quiz has not started
    useEffect(() => {
        if (questions.length >  0 && !quizStarted) {
            setCurrentQuestion(questions[0]);
        }
    }, [questions, quizStarted]);

    //update shuffled answers when current question changes
    useEffect(() => {
        if (currentQuestion) {
            const allAnswers = [currentQuestion.correct_answer, ...(currentQuestion.incorrect_answers || [])];
            const shuffled = allAnswers.sort(() => Math.random() -  0.5);
            //update shuffled answers state
            setShuffledAnswers(shuffled); 
        }
    }, [currentQuestion]);

    //handle when user clicks an answer
    const handleAnswerClick = (answer, index) => {
        setSelectedAnswer(answer);
        setSelectedAnswerIndex(index); 
    };

    //handle form submission when user clicks next question
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('answer', selectedAnswer);
        formData.append('questionIndex', currentQuestionIndex);
        //call answerQuestion action with current state and form data,
        //then update score and move to next question
        const updatedState = await answerQuestion({ questions, questionAnswers: [], score }, formData);
        setScore(updatedState.score);
        nextQuestion();
    };

    //move to next question
    const nextQuestion = () => {
        const nextIndex = currentQuestionIndex +   1;
        if (nextIndex < questions.length) {
            setCurrentQuestion(questions[nextIndex]);
            setQuestionIndex(nextIndex);
            //reset selected answer index for new question
            setSelectedAnswerIndex(null); 
        } else {
            setQuizCompleted(true); 
        }
    };

    //return null to not render anything if there are no questions
    if (!currentQuestion) {
        return null; 
    }

    const restartQuiz = () => {
    //reset all state variables to initial values
        setCurrentQuestion(questions[0]);
        setQuestionIndex(0);
        setScore(0);
        setSelectedAnswer('');
        setSelectedAnswerIndex(null);
        setShuffledAnswers([]);
        setQuizCompleted(false);
        //quiz is in started state
        setQuizStarted(true); 
    };

    //start quiz when user clicks start quiz button
    const startQuiz = () => {
        setQuizStarted(true); 
    };

    //render welcome message and start quiz button if quiz has not started
    if (!quizStarted) {
        return (
            <div className="container marginTop mx-auto max-w-screen-md my-20 flex flex-col justify-start items-center p-4">
                <h1 className="text-4xl text-center font-bold text-white min-w-[400px] max-w-[800px]">Welcome to the Music Quiz App</h1>
                <button className="mt-8 min-w-[400px] max-w-[800px] text-xl font-bold text-white bg-violet-800 py-6 rounded-2xl" onClick={startQuiz}>Start Quiz</button>
            </div>
        );
    }

    //render quiz questions and answers if quiz has started
    return (
        <div className="container mx-auto max-w-screen-md my-0 flex flex-col justify-start items-center p-4 w-[700px] mx-auto">
            {quizCompleted ? (
                <>
                    <h1 className="text-4xl text-center font-bold text-white mt-20">Congratulations!</h1>
                    <p className="w-4/12 min-w-[400px] max-w-[1000px] text-xl font-bold text-green-300 py-6 text-center border-4 border-green-300 rounded-2xl p-4 mt-6">You scored {score} out of {questions.length}</p>
                    <button className="w-4/12 mt-3 min-w-[400px] max-w-[1000px] text-xl font-bold text-white bg-violet-800 py-6 rounded-2xl mt-6" onClick={restartQuiz}>Restart Quiz</button> 
                </>
            ) : (
                <>
                <h1 className="text-4xl text-center font-bold text-white mb-8">Music Quiz</h1>
                <div className="text-2xl text-purple-400 font-bold mb-6 ">Score: {score}/{questions.length}</div>
                <form  className="w-full" onSubmit={handleSubmit}>
                    <div className="mt-8 min-w-[400px] max-w-[800px] text-xl font-bold text-green-300 py-6 text-center border-4 border-green-300 rounded-2xl p-4 min-w-full">
                    {currentQuestionIndex +   1}.{currentQuestion.question}
                    </div>
                    {shuffledAnswers.map((answer, index) => (
                        <div
                            key={index}
                            onClick={() => handleAnswerClick(answer, index)}
                            className={`cursor-pointer my-2 pl-5 text-lg py-2 rounded-lg min-w-full ${index === selectedAnswerIndex ? "font-extrabold border-4 border-green-300 bg-white" : "font-semibold bg-white text-black-100"}`}>
                            {answer}
                        </div>
                    ))}
                    <button className="w-full mt-3 min-w-[400px] max-w-[1000px] text-xl font-bold text-white bg-violet-800 py-6 rounded-2xl" type="submit" disabled={selectedAnswerIndex === null}>
                    {currentQuestionIndex === questions.length -   1 ? "Finish Quiz" : "Next Question"}
                    </button>
                </form>
            </>
            )}
        </div>
    );
    
};

export default QuizComponent;
