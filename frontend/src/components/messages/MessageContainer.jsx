import MessageInput from "./MessageInput";
import Messages from "./Messages";

// Uncommented NoChatSelected and imported required dependencies
import { TiMessages } from 'react-icons/ti';

const NoChatSelected = () => {
    // const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 john ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};

const MessageContainer = () => {
    const noChatSelected = true; // Assuming this is a state or prop indicating if a chat is selected

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {noChatSelected ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John Doe</span>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;
