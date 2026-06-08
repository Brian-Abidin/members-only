const delButton = document.getElementById("delete-btn");
const deleteModal = document.getElementById("delete-modal");
const closeBtn = document.getElementById("close-btn");
const submitBtn = document.getElementById("submit-btn");

// header document elements
const dropBtn = document.getElementById("drop-btn");
const dropdown = document.getElementById("dropdown");

function toggleDropdown() {
  if (dropdown.style.display === "flex") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "flex";
  }
}

if (dropBtn) {
  dropBtn.addEventListener("click", toggleDropdown);
}

console.log(dropdown, "SDFSEFSF");

if (dropBtn) {
  window.addEventListener("click", (event) => {
    if (dropBtn !== event.target) {
      dropdown.style.display = "none";
    }
  });
}

function closeModal() {
  console.log("hello");
  if (deleteModal.style.display === "flex") {
    deleteModal.style.display = "none";
  } else {
    deleteModal.style.display = "flex";
  }
}

if (delButton) {
  delButton.addEventListener("click", closeModal);

  deleteModal.addEventListener("click", (event) => {
    if (deleteModal === event.target) deleteModal.style.display = "none";
  });
}
