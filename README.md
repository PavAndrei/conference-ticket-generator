# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://www.frontendmentor.io/solutions/responsive-ticket-generator-app-with-react-aAiVst3fVa)
- Live Site URL: [Add live site URL here](https://conference-ticket-generator-peach-rho.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [React](https://reactjs.org/) - JS library

### What I learned

# During this project I deepened my understanding of:

- Implementing custom drag-and-drop file upload using native browser APIs

- Managing file input state manually with DataTransfer

- Reusing form logic and validation across multiple inputs

- Providing accessible error messages and real-time validation feedback

- Creating responsive layouts with Tailwind

- Handling file previews efficiently and cleaning up memory via URL.revokeObjectURL

```js
const handleDrop = (e, name) => {
  const droppedFile = e.dataTransfer.files[0];
  const preview = URL.createObjectURL(droppedFile);

  setInputs((prev) =>
    prev.map((inp) =>
      inp.name === name ? { ...inp, file: droppedFile, preview } : inp
    )
  );
};
```

### Continued development

In the future, I plan to:

- Extract form logic and drag-n-drop into custom hooks and stores for reuse

- Improve accessibility by adding more ARIA roles and dynamic descriptions

- Add ticket download as PDF

- Connect the form to a backend to save ticket data

### Useful resources

- [MDN](https://developer.mozilla.org/ru/docs/Web/API/DataTransfer)

## Author

- GitHub - [GitHub](https://github.com/PavAndrei/)
- Frontend Mentor - [FrontendMentor](https://www.frontendmentor.io/profile/PavAndrei)
