import { Manager, Socket } from "socket.io-client";

let socket: Socket;
export const connectToServer = (token: string) => {
  //busca servidor con socket io
  const manager = new Manager("http://localhost:4000/socket.io/socket.io.js", {
    extraHeaders: {
      authentication: token,
    },
  });

  //se eliminan los anteriores listeners al crear nueva sesion del mismo user
  socket?.removeAllListeners();

  //se crea un nuevo socket al conectar. por defecto se conecta al namespace root
  socket = manager.socket("/");

  addListeners();
};

const addListeners = () => {
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
