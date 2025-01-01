import { Manager } from "socket.io-client";

export const connectToServer = () => {
  //busca servidor con socket io
  const manager = new Manager("http://localhost:4000/socket.io/socket.io.js");

  //por defecto se conecta al namespace root
  const socket = manager.socket("/");
};
