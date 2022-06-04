import { renderInput } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import { deleteUser, editUser } from "../services/user-services.js";
import STORE from "../store.js";
import goodByePage from "./goodByePage.js";
import LoginPage from "./login.js";
import { Layout } from "./main.js";

let currentUser = STORE.currentUser;

function renderProfile() {
  currentUser = STORE.currentUser
  const { EditError, EditSuccess } = ProfilePage.state;
  // const { EditSuccess } = ProfilePage.state.EditSuccess;
  return `
  <h2>My Profile</h2>
  <form action="" class="form">
    <div class="formBody">
      ${renderInput({
        label: "USERNAME",
        icon: `<i class="fa fa-user" aria-hidden="true"></i>`,
        id: "username",
        required: true,
        value: currentUser.username,
        error: EditError
      })}
      
      ${renderInput({
        label: "EMAIL",
        icon: `<i class="fa fa-envelope" aria-hidden="true"></i>`,
        id: "email",
        required: true,
        value: currentUser.email,
        error: EditError
      })}


      ${renderInput({
        label: "FIRST NAME",
        icon: `<i class="fa-solid fa-book-open"></i>`,
        id: "firstName",
        required: true,
        value: currentUser.firstName,
        error: EditError
      })}


      ${renderInput({
        label: "LAST NAME",
        icon: `<i class="fa-solid fa-book-open"></i>`,
        id: "lastName",
        required: true,
        value: currentUser.lastName,
        error: EditError
      })}

      ${
        EditError
          ? `<p class="tag is-danger is-light"> 😨 ${EditError}</p>`
          : ""
      }
      ${
        EditSuccess
          ? `<p class="tag is-success is-light">Profile updated!</p>`
          : ""
      }
    </div>

    <div class="linksFooter field">
      <div class="control">
        <button
          type="submit"
          class="button is-success"
          id="submit-btn"
        />Update My Profile</button>
        
      </div>
      <div class="control">
      <a id="delete-btn" class="button is-danger is-light">Delete my account</a>
      </div>
    </div>
  </form>
    `;
}

function listenDelete () {
  const delBtn = document.querySelector("#delete-btn")
  try {
    delBtn.addEventListener("click", async (event) => {
      try {
        delBtn.classList.toggle("is-loading")
        event.preventDefault();
        const id = STORE.currentUser.id
        await deleteUser(id)
        STORE.currentUser = null
        setTimeout(function () {
          goodByePage();
          setTimeout(() => {
            DOMHandler.load(LoginPage);
          }, 1000);
        }, 500); 
      } catch (error) {
        console.log(error);
      }
    })
  } catch (error) {
    // console.log(error);
  }

}

function listenUpdate() {
  try {
    const form = document.querySelector(".form");
    form.addEventListener("submit", async (event) => {
      document.querySelector("#submit-btn").classList.toggle("is-loading");
      try {
        event.preventDefault();
        // const { username, email, first_name, last_name } = event.target; // is not working
        const credentials = {
          username: event.target.username.value,
          email: event.target.email.value,
          first_name: event.target.firstName.value,
          last_name: event.target.lastName.value
        };
        const id = STORE.currentUser.id;
        STORE.currentUser = { 
          id: id,
          username: credentials.username,
          email: credentials.email,
          firstName: credentials.first_name,
          lastName: credentials.last_name
        }

        console.log(STORE.currentUser);
        await editUser(id, credentials);
        ProfilePage.state.EditSuccess = true
        DOMHandler.reload();

      } catch (error) {
        ProfilePage.state.EditError = error.message;
        setTimeout(function () {
          DOMHandler.reload();
        }, 800);
      }
    });
  } catch (error) {
    // console.log(error);
  }
  
}

const ProfilePage = {
  toString() {
    return renderProfile();
  },
  addListeners() {
    listenUpdate(), listenDelete()
  },
  state: {
    EditError: null,
    EditSuccess: null
  },
};

export {
  ProfilePage
};
