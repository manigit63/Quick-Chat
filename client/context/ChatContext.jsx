import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [message, setMessage] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessage, setUnseenMessage] = useState({});

  const { socket, axios } = useContext(AuthContext);

  //function to get all users for sidebar

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessage(data.unseenMessages || {});
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to get message for selected users

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessage(Array.isArray(data.messages) ? data.messages : []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to send message to selected users

  const sendMessages = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessage((prevMessages) =>
          Array.isArray(prevMessages)
            ? [...prevMessages, data.newMessage]
            : [data.newMessage]
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to get msg in real time for selected user

  const subscribeToMessage = async () => {
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessage((prevMessages) => [...prevMessages, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessage((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  //function to unsubscribe from messages

  const unsubscribeFromMessages = async () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessage();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    message,
    users,
    selectedUser,
    getUsers,
    setMessage,
    sendMessages,
    setSelectedUser,
    unseenMessage,
    setUnseenMessage,
    getMessages,
  };

  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};
