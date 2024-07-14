import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = () => {
    const { loading, conversations } = useGetConversations();

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {conversations.map((conversation) => (
                <Conversation
                    key={conversation._id} // Ensure unique key
                    conversation={conversation} // Use lowercase 'conversation' for prop name
                />
            ))}
            {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
        </div>
    );
};

export default Conversations;
