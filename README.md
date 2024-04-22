This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, run the development server:
```bash
npm run dev
```
# Music Quiz App 
This project is a music quiz app that dynamically pulls questions from an API to make the quiz fresh every time and tracks the user's score. This fun little app is built with Next JS and styled with Tailwind to give the app a simplistic ease of use with built in controls like how the user is not able to move to the next question until they have selected an answer from the current page. Once completed the user is provided with their score out of 13 and has the option to the start the quiz over with brand new questions. 



## Features
- A server component that fetches a list of questions and answers from a JSON file or an API and passes them as props to a client component. 
- A client component that renders the questions and answers and allows the user to select an answer and submit the quiz. 
- A server action that checks the user's answers, returns the score and feedback, and attaches it to an action prop on a form element. 
- A client component that displays the score and feedback and allows the user to restart the quiz. 



## Technologies Used
  - React
  - Next JS
  - Tailwind
  - Bootstrap

 

## Lessons Learned 
- Create server components and client components. 
- Use the use server directive to write server actions that access server-side resources and perform data fetching and mutations. 
- Use the default export to export server components from the file. 
- How to use server actions from client components by importing them and attaching them to an action prop on a form element. 
- How to use server components as props from client components by using the useServer hook to get the result of the server component. 
- Use React hooks, browser features, and interactivity from client components. 



## Future Improvements 
- Add a percentage component that displays the precent the user obtained out of 100.
- Allow the user to select how many questions long the user would like the quiz to be.



# Images 
### Quiz Start
![Screenshot 2024-04-22 152303](https://github.com/tillyjay/Quiz-App/assets/97525044/f40331e8-2d51-44f7-942f-504b5357a74f)

### Quiz in Progress
![Screenshot 2024-04-22 152325](https://github.com/tillyjay/Quiz-App/assets/97525044/18d112cb-5235-4e76-ad8f-6c917176ed59)

### Quiz Completion
![Screenshot 2024-04-22 152506](https://github.com/tillyjay/Quiz-App/assets/97525044/ec8e1201-0b30-4024-b03e-18924db908c3)













