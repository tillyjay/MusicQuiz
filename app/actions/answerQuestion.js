// answerQuestion.js

"use server"

export async function answerQuestion(initialState, formData) {
    //extract current question index and the user's answer from form data
    const questionIndex = parseInt(formData.get("questionIndex"));
    const userAnswer = formData.get("answer");

    //get correct answer from questions array using question index
    const correctAnswer = initialState.questions[questionIndex].correct_answer;

    //determine if user's answer is correct
    const isCorrect = userAnswer === correctAnswer;

    //update questionAnswers array in initialState
    //if answer is correct, add true to array otherwise, add false
    initialState.questionAnswers[questionIndex] = isCorrect;

    //update score based on correctness of answer
    if (isCorrect) {
        initialState.score = (initialState.score ||  0) +  1;
    }

    //return updated initialState, including questionAnswers array and updated score
    return initialState;
}
