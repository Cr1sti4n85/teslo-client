import { Manager, Socket } from "socket.io-client";

export const connectToServer = () => {
  //busca servidor con socket io
  const manager = new Manager("http://localhost:4000/socket.io/socket.io.js");

  //por defecto se conecta al namespace root
  const socket = manager.socket("/");

  addListeners(socket);
};

const addListeners = (socket: Socket) => {
  //el signo de exclamacion indica qu ese valor siempre existe y no hay que manjar los valores nulos
  const serverStatus = document.querySelector("#server-status")!;

  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input")!;

  const clientsUl = document.querySelector<HTMLUListElement>("#clients-ul")!;
  const messagesUl = document.querySelector<HTMLUListElement>("#messages-ul")!;

  //los metodos "on" son listeners que escuchan eventos del servidor
  socket.on("connect", () => {
    serverStatus.textContent = "Online";
  });

  socket.on("disconnect", () => {
    serverStatus.textContent = "Offline";
  });

  //recibe el evento "clients-updated" del servidor
  socket.on("clients-updated", (clients: string[]) => {
    let clientsHtml = "";

    clients.forEach((clientId) => {
      clientsHtml += `<li>${clientId}</li>`;
    });

    clientsUl.innerHTML = clientsHtml;
  });

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    //envia el mensaje al servidor
    socket.emit("message-from-client", { message: messageInput.value });

    messageInput.value = "";
  });

  //REcibir mensajes desde el servidor
  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      console.log(payload);

      const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>: ${payload.message}
      
      </li>
      `;

      const li = document.createElement("li");
      li.innerHTML = newMessage;
      messagesUl.append(li);
    }
  );
};
