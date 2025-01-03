import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Box, TextField, Button, Typography } from "@mui/material";
import { getToken, joinChat, sendMessageToChat } from "../../../../../util/httpsForUser/https";
import { useParams } from "react-router-dom";
import { useWorkgroup } from "../WorkgroupCustomHook/useWorkgroup";

const Chat = ({ userName="noor" }) => {
    const {workgroupId} = useParams();
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const { data: workgroupData, isLoading } = useWorkgroup(workgroupId);
    console.log(workgroupData)
    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:5001/hub/chat", {
                    accessTokenFactory: getToken, 
                })
                .withAutomaticReconnect()
                .build();
            connection.on("ReceiveMessage", (user, message) => {
                setMessages((prev) => [...prev, { user, message }]);
            });

            await connection.start();
            setConnection(connection);
        };

        connectToHub();

        return () => {
            connection?.stop();
        };
    }, []);

    const joinGroup = async () => {
        try {
            // استخدام الدالة joinWorkgroup من https.js
            await joinChat({ workgroupId });
            connection.invoke("JoinWorkgroup", workgroupId); // الاتصال مع SignalR
        } catch (error) {
            console.error("Join group failed", error);
        }
    };

    const sendMessage = async (message) => {
        try {
            // استخدام الدالة sendMessageToChat من https.js
            await sendMessageToChat({ workgroupId, message });
        } catch (error) {
            console.error("Message sending failed", error);
        }
    };

    if (isLoading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Welcome, {userName}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={joinGroup}>
                    Join Workgroup
                </Button>
            </Box>
            <MessageList messages={messages} />
            <MessageInput sendMessage={sendMessage} />
        </Box>
    );
};

export default Chat;
