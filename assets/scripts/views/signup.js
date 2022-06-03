import { renderInput } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login.js";
import { login } from "../services/session-services.js";
import { createUser } from "../services/user-services.js";
import { Layout } from "./main.js";
import STORE from "../store.js";

function renderSignup() {
  const { SignupError } = SignupPage.state;
  return `
  <header class="container is-max-desktop">
<a class="navbar-item" href="../../index.html">
  <h1>{ Organizable }</h1>
</a>
</header>
<main class="container is-max-desktop signupView">
<!-- form -->
<form action="" class="form">
  <div class="formBody">
  <h2 class="titleSection">Sign up</h2>
    ${renderInput({
      label: "USERNAME",
      icon: `<i class="fa fa-user" aria-hidden="true"></i>`,
      id: "username",
      required: true,
      placeholder: "Ironman",
      error: SignupError
    })}
    
    ${renderInput({
      label: "EMAIL",
      icon: `<i class="fa fa-envelope" aria-hidden="true"></i>`,
      id: "email",
      required: true,
      placeholder: "tony_stark@mail.com",
      error: SignupError
    })}


    ${renderInput({
      label: "FIRST NAME",
      icon: `<i class="fa-solid fa-book-open"></i>`,
      id: "firstName",
      required: true,
      placeholder: "Tony",
      error: SignupError
    })}


    ${renderInput({
      label: "LAST NAME",
      icon: `<i class="fa-solid fa-book-open"></i>`,
      id: "lastName",
      required: true,
      placeholder: "Stark",
      error: SignupError
    })}

    ${renderInput({
      label: "Password",
      icon: `<i class="fas fa-key"></i>`,
      id: "password",
      required: true,
      error: SignupError,
      type: "password",
      placeholder: "******"
    })}
    ${
      SignupError
        ? `<p class="tag is-danger is-light"> 😨 ${SignupError}</p>`
        : ""
    }
    <p>you already have an account? <a id="login-btn2" href="#">login</a></p>
  </div>

  <div class="linksFooter field">
    <div class="control">
      <a id="login-btn" class="button is-success is-light">Login</a>
    </div>
    <div class="control">
      <button
        type="submit"
        class="button is-success"
        id="submit-btn"
      />Create Account</button>
    </div>
  </div>
</form>
</main>`;
}

function listenLoginBtn() {
  const loginBtn = document.querySelector("#login-btn")
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(LoginPage);
    SignupPage.state.loginError = null;
  })
  const loginBtn2 = document.querySelector("#login-btn2")
  loginBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(LoginPage);
    SignupPage.state.loginError = null;
  })
}

function listenSubmit() {
  const form = document.querySelector(".form");
  form.addEventListener("submit", async (event) => {
    document.querySelector("#submit-btn").classList.toggle("is-loading");
    try {
      event.preventDefault();
      const { username, password } = event.target;
      const credentials = {
        username: username.value,
        password: password.value,
      };

      await createUser(credentials);
      const currUser = await login(credentials);
      console.log(currUser);

      setTimeout(function () {
        // loadingPage();
        setTimeout(async () => {
          await STORE.fetchBoards();
          DOMHandler.load(Layout);
        }, 500);
      }, 500);
    } catch (error) {
      SignupPage.state.SignupError = error.message;
      setTimeout(function () {
        DOMHandler.reload();
      }, 800);
    }
  });
}

const SignupPage = {
  toString() {
    return renderSignup();
  },
  addListeners() {
    return listenLoginBtn(), listenSubmit();
  },
  state: {
    SignupError: null,
  },
};

export default SignupPage;
