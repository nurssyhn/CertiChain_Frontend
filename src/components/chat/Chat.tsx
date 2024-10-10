import { Button, Container, Group, rem, ScrollArea, Flex } from "@mantine/core";
import Logo from "../Logo";
import Prompt from "./Prompt";
import Control from "../sidebar/Control";
import { useState, useEffect, useRef } from "react";
import ChatbotMessage from "./ChatbotMessage";
import UserMessage from "./UserMessage";

interface Props {
  opened: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function Chat({ opened, onClick }: Props) {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    [],
  );
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:8000/ws");
    ws.current.onmessage = (event) => {
      addMessage(event.data, false);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const addMessage = (text: string, isUser: boolean) => {
    setMessages((prevMessages) => [...prevMessages, { text, isUser }]);
  };

  const handleSendMessage = (message: string) => {
    if (ws.current) {
      ws.current.send(message);
      addMessage(message, true);
    }
  };

  return (
    <Container
      p="md"
      fluid
      bg="gray.0"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        height: "100vh",
      }}
    >
      <Group align="center" justify="space-between">
        <Group gap="xl">
          <Control
            lightHidden={opened}
            opened={opened}
            onClick={onClick}
            justify="start"
          />
          <Logo width={rem(117)} height={rem(26)} />
        </Group>
      </Group>
      <ScrollArea mt={rem(100)}>
        <Flex mx={rem(50)} direction="column" gap="md">
          {messages.map((message, index) =>
            message.isUser ? (
              <UserMessage key={index} text={message.text} />
            ) : (
              <ChatbotMessage key={index} text={message.text} />
            ),
          )}
          <div ref={messagesEndRef} />
          <form
            style={{
              position: "sticky",
              bottom: rem(0),
            }}
          >
            <Prompt onSendMessage={handleSendMessage} />
          </form>
        </Flex>
      </ScrollArea>
    </Container>
  );
}
