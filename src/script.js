import { AuthErrorCodes } from "firebase/auth";
export const newUi = document.querySelector('.newState');
export const logOutBtn = document.querySelector('.logOut');
export const main = document.querySelector('.mainPage');
export const visitorList = document.querySelector('.visitorList')


export  const logInView = () =>{
       newUi.style.display = 'block';
       main.style.display = 'none';
  }
  
export  const logOutView = () =>{
    newUi.style.display = 'none';
    main.style.display = 'block';
   
  }



  export const renderVisitorCard = (visitor) => {
    const visitorCard = document.createElement('div');
    const heading = document.createElement('h2');
    heading.innerText = 'I love'
    visitorCard.classList.add('visitor-card');
    visitorCard.setAttribute('draggable','true');
    visitorCard.innerHTML = `
      <p>${visitor.firstName} ${visitor.surName}</p>
      <p>${visitor.emailAddress} </p>
    `;
    return visitorCard;
  };