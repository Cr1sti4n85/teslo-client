import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h1>Websocket - Client </h1>
   <p id="server-status">Offline</p>

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

connectToServer();
