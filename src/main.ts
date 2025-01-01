import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h1>Websocket - Client </h1>
   <p id="server-status">Offline</p>
  </div>
`;

connectToServer();
