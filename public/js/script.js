// import { getAllMessages } from "../../db/queries";

// const time = document.getElementsByClassName("time");

// console.log("helllooo");

// async function getAllMessagesDates() {
//   const messages = await getAllMessages();
//   const messagesDatesArr = messages.map((message) => message.absolute_time);
//   return messagesDatesArr;
// }

// function findTimePassed() {
//   const dates = getAllMessagesDates();
//   const now = new Date();
//   const timePassedArr = [];
//   for (let i = 0; i < dates.length; i += 1) {
//     const timePassed = (now - new Date(dates[i])) * (1000 * 60 * 60 * 24); // days
//     timePassedArr.push(timePassed);
//   }
//   console.log(timePassedArr, "DFSFDSf");
//   return timePassedArr;
// }

// const timePassedArr = findTimePassed();

// for (let i = 0; i < time.length; i += 1) {
//   time[i].textContent = timePassedArr[i];
// }

const delButton = document.getElementById("delete-btn");
const deleteModal = document.getElementById("delete-modal");
const closeBtn = document.getElementById("close-btn");
const submitBtn = document.getElementById("submit-btn");

function closeModal() {
  console.log("hello");
  if (deleteModal.style.display === "flex") {
    deleteModal.style.display = "none";
  } else {
    deleteModal.style.display = "flex";
  }
}

deleteModal.addEventListener("click", (event) => {
  if (deleteModal === event.target) deleteModal.style.display = "none";
});

if (delButton) {
  delButton.addEventListener("click", closeModal);
}
