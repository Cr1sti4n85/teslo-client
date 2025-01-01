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

  //los metodos "on" son listeners que escuchan eventos del servidor
  socket.on("connect", () => {
    serverStatus.textContent = "Online";
  });

  socket.on("disconnect", () => {
    serverStatus.textContent = "Offline";
  });
};
