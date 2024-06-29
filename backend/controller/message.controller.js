import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; // Corrected spelling here
        const senderId = req.user._id;  // Corrected this line

        console.log(senderId);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] } // Corrected spelling here
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId] // Corrected spelling here
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId, // Corrected spelling here
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(200).json(newMessage);
    } catch (error) {
        console.log("error in sending message", error.message);
        res.status(500).json({ message: error.message });
    }
};
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};