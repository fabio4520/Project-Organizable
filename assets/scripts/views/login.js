import { renderInput } from "../components/input.js"
import DOMHandler from "../dom-handler.js";
import { login } from "../services/session-services.js";
import SignupPage from "./signup.js";
// import { HomePage } from "./home.js"
// import STORE from "../store.js";

function renderLogin() {
  const { loginError } = LoginPage.state;
  return `
  <header class="container is-max-desktop">
  <a class="navbar-item" href="../../index.html">
    <h1>{ Organizable }</h1>
  </a>
  </header>
  <main class="container is-max-desktop">
  <!-- form -->
  <form action="" class="form">
    <div class="formBody">
    <h2 class="titleSection">Login</h2>
    ${renderInput({
      label: "Username",
      icon: `<i class="fa fa-user" aria-hidden="true"></i>`,
      id: "username",
      required: true,
      placeholder: "username",
      error: loginError
    })}

    ${renderInput({
      label: "Password",
      icon: `<i class="fas fa-key"></i>`,
      id: "password",
      required: true,
      error: loginError,
      type: "password",
      placeholder: "******"
    })}
      ${
        loginError
          ? `<p class="tag is-danger is-light"> 😨 ${loginError}</p>`
          : ""
      }
      <p>you don't have an account? <a id="signup-btn2" href="#">signup</a></p>
    </div>

    <div class="linksFooter field">
      <div class="control">
        <a id="signup-btn" class="button is-link is-light">Signup</a>
      </div>
      <div class="control">
        <button
          type="submit"
          class="button is-link"
          id="submit-btn"
        />Login</button>
      </div>
    </div>
  </form>
  </main>`;
}

function listenSignup() {
  const signupBtn = document.querySelector("#signup-btn")
  signupBtn.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(SignupPage);
    LoginPage.state.loginError = null;
  })
  const signupBtn2 = document.querySelector("#signup-btn2")
  signupBtn2.addEventListener("click", (event) => {
    event.preventDefault();
    DOMHandler.load(SignupPage);
    LoginPage.state.loginError = null;
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
      const user = await login(credentials);
      console.log(user);

      setTimeout(function () {
        // loadingPage();
        setTimeout(async () => {
          // await STORE.fetchTasks();
          // DOMHandler.load(HomePage);
        }, 500);
      }, 500);
    } catch (error) {
      LoginPage.state.loginError = error.message;
      setTimeout(function () {
        DOMHandler.reload();
      }, 1000);
    }
  });
}

const LoginPage = {
  toString() {
    return renderLogin();
  },
  addListeners() {
    return listenSignup(), listenSubmit();
  },
  state: {
    loginError: null,
  },
};

export default LoginPage;
