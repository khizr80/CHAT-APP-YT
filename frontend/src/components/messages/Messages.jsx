import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  const previousMessagesLength = useRef(messages.length);

  useEffect(() => {
    if (messages.length > previousMessagesLength.current) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      previousMessagesLength.current = messages.length;
    }
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => {
          if (typeof message !== 'object' && message !== null) {
            console.log('Index:', index, 'Message:', message); // Log index and message
          }

          const isLastMessage = index === messages.length - 1;
          return (
            <div key={message._id} ref={isLastMessage ? lastMessageRef : null}>
              <Message message={message} />
            </div>
          );
        })}

      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
