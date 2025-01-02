import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h1>Websocket - Client </h1>
   <p id="server-status">Offline</p>

   <ul id="clients-ul">
    <li>Pupy Daiper</li>
   </ul>

   <form id="message-form">
    <input type="text" id="message-input" placeholder="message"/>
    <button type="submit">Send</button
   </form>
  </div>
`;

connectToServer();
