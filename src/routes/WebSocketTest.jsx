import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function WebSocketTester() {
  const clientRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);

  const log = (type, content) => {
    setLogs(prev => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        type,
        content
      }
    ]);
  };

  const connect = () => {
    const socket = new SockJS("http://localhost:8081/websocket");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        setConnected(true);
        log("SYSTEM", "Connected");

        // 👇 subscribe to topic
        client.subscribe("/topic/messages", (msg) => {
          log("RECEIVED", msg.body);
        });
      },
      onStompError: (frame) => {
        log("ERROR", frame.body);
      }
    });

    client.activate();
    clientRef.current = client;
  };

  const disconnect = () => {
    clientRef.current?.deactivate();
    setConnected(false);
    log("SYSTEM", "Disconnected");
  };

  const sendMessage = () => {
    if (!connected || !message.trim()) return;

    clientRef.current.publish({
      destination: "/app/chat",
      body: message
    });

    log("SENT", message);
    setMessage("");
  };

  useEffect(() => {
    return () => clientRef.current?.deactivate();
  }, []);

  return (
    <div style={styles.container}>
      <h2>SockJS WebSocket Tester</h2>

      <button onClick={connected ? disconnect : connect}>
        {connected ? "Disconnect" : "Connect"}
      </button>

      <div style={styles.status}>
        Status:{" "}
        <span style={{ color: connected ? "green" : "red" }}>
          {connected ? "CONNECTED" : "DISCONNECTED"}
        </span>
      </div>

      <div style={styles.row}>
        <input
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} disabled={!connected}>
          Send
        </button>
      </div>

      <div style={styles.log}>
        {logs.map((l, i) => (
          <div key={i}>
            <b>[{l.time}] {l.type}:</b> {l.content}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 700, margin: "40px auto", fontFamily: "Arial" },
  row: { display: "flex", gap: 10, marginTop: 10 },
  input: { flex: 1, padding: 8 },
  status: { margin: "10px 0" },
  log: {
    height: 300,
    overflowY: "auto",
    background: "#f5f5f5",
    padding: 10,
    borderRadius: 4
  }
};
