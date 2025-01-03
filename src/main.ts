import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h1>Websocket - Client </h1>
   <p id="server-status">Offline</p>
   <label for="email">Email:</label>
    <input type="email" id="email" placeholder="example@example.com"/>
   <label for="password">Password:</label>
   <input type="password" id="password" placeholder="Type your password"/>

   <button id="jwt-token">Connect</button>
   <ul id="clients-ul">
   </ul>

   <form id="message-form">
    <input type="text" id="message-input" placeholder="message"/>
    <button type="submit">Send</button
   </form>

   <h3>Messages</h3>
   <ul id="messages-ul">

   </ul>
  </div>
`;

if (localStorage.getItem("jwt")) {
  const jwt = localStorage.getItem("jwt")!;
  connectToServer(jwt);
}

const btnConnect = document.querySelector("#jwt-token")!;

btnConnect.addEventListener("click", async () => {
  const emailInput = document.querySelector<HTMLInputElement>("#email")!.value;
  const passwordInput =
    document.querySelector<HTMLInputElement>("#password")!.value;

  if (!emailInput || !passwordInput) return;

  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: emailInput, password: passwordInput }),
  });

  const data = await response.json();
  const { token } = data;

  localStorage.setItem("jwt", token);

  connectToServer(token);
});
