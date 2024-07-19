export class SignUp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.submitForm();
  }

  submitForm() {
    const button = this.shadowRoot.querySelector(".container__button");
    button.addEventListener("click", (e) => {
      e.preventDefault();
      this.clearErrors();

      const fullNameInput = this.shadowRoot.querySelector(
        ".container__input-fullname"
      );
      const userNameInput = this.shadowRoot.querySelector(
        ".container__input-username"
      );
      const passwordInput = this.shadowRoot.querySelector(
        ".container__input-password"
      );

      const fullName = fullNameInput.value;
      const userName = userNameInput.value;
      const password = passwordInput.value;

      let hasError = false;

      if (!fullName) {
        this.errorsMessage(fullNameInput, "Full Name is required");
        hasError = true;
      }
      if (!userName) {
        this.errorsMessage(userNameInput, "User Name is required");
        hasError = true;
      }
      if (!password) {
        this.errorsMessage(passwordInput, "Password is required");
        hasError = true;
      }

      if (hasError) {
        return;
      }

      const newUserData = { fullName, userName, password };
      console.log(newUserData);

      fetch("http://localhost:9000/users", {
        method: "POST",
        body: JSON.stringify(newUserData),
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((response) => console.log(`the fetch response: ${response}`))
        .catch((error) => {
          console.error("error", error);          
        });
    });
  }

  clearErrors() {
    const errorElements = this.shadowRoot.querySelectorAll(
      ".container__error-input"
    );
    errorElements.forEach((error) => error.remove());
  }

  errorsMessage(inputElemnt, message) {
    const errorElement = document.createElement("div");
    errorElement.className = "container__error-input";
    errorElement.innerHTML = `${message}`;
    const parentElement = inputElemnt.parentNode;
    parentElement.insertBefore(errorElement, inputElemnt.nextSibling);
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
        <style>${this.styles()}</style>
        <div class='container'>
            <h2 class="container__h1">Signup</h2>
            <p class="container__p">you are not registred yet?</p>
            <form class="container__Form">
                <input type="text" class="container__input container__input-fullname" placeholder="Full Name">
                <input type="text" class="container__input container__input-username" placeholder="User Name">
                <input type="password" class="container__input container__input-password" placeholder="Password">
                
                <button type="submit" class="container__button">Sing Up</button>
            </form>
        </div>
    `;
  }
  styles() {
    return /*css*/ `
        .container{
            color: #000;
            width : 250px;
            background: #fff;
            display:flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-radius:10px;
            padding:10px;
        }
        .container__h1{
            margin:0;
            padding:10px;
            font-weight:bold;
            font-size:1.6rem
        }
        .container__p{
            margin:0;
            padding:10px;
            font-size:1rem;
            color:#666
        }
        .container__form{
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            justify-content: center;
            width:100%;
        }
        .container__input{
            border: 2px solid transparent;
            width: 15em;
            height: 2.5em;
            padding-left: 0.8em;
            outline: none;
            overflow: hidden;
            background-color: #F3F3F3;
            border-radius: 10px;
            margin-top:10px;
            transition: all 0.5s;
        }
        .container__input:hover,
        .container__input:focus{
          border:2px solid #4A9DEC;
          box-shadow: 0px 0px 0px 7px rgb(74, 157,236, 20%);
          background-color: white;
        }
        .container__button {
          border: 2px solid transparent;
          outline: none;
          background-color: #4a9dec;
          padding: 10px;
          border-radius: 10px;
          color: #fff;
          font-size: 16px;
          cursor:pointer;
          margin-top:10px;
        }
        .container__button:hover,
        .container__button:focus{
          border:2px solid #4A9DEC;
          box-shadow: 0px 0px 0px 7px rgb(74, 157,236, 20%);
        }
        .container__error-input{
          font-size: .8rem;
          color: red;
          position: relative;
          right: 40px;
        }
    `;
  }
}

customElements.define("sign-up", SignUp);
