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
const test = document.getElementById("test");
const deleteModal = document.getElementById("delete-modal");
const closeBtn = document.getElementById("close-btn");
const submitBtn = document.getElementById("submit-btn");

function closeModal() {
  if (deleteModal.style.display === "none") {
    deleteModal.style.display = "flex";
  } else {
    deleteModal.style.display = "none";
  }
}

if (test) {
  test.addEventListener("click", () => {
    if (deleteModal.style.display === "none") {
      deleteModal.style.display = "flex";
    } else {
      deleteModal.style.display = "none";
    }
    console.log("hello");
  });
}

if (delButton) {
  delButton.addEventListener("click", () => {
    if (test.style.display === "none") {
      test.style.display = "block";
    } else {
      test.style.display = "none";
    }
    console.log("hello");
  });
}
