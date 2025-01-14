import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Box, TextField, Button, Typography } from "@mui/material";
import { getMessages, joinChat, leaveChat, queryClient, sendMessageToChat } from "../../../../../util/httpsForUser/https";
import { useParams } from "react-router-dom";
import { useWorkgroup } from "../WorkgroupCustomHook/useWorkgroup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const ChatPage = ({ userName = "noor" }) => {
    const { workgroupId } = useParams();
    const [connection, setConnection] = useState(null);
    const [liveMessages, setLiveMessages] = useState([]);
    const { data: workgroupData, isLoading } = useWorkgroup(workgroupId);
    // React Query for fetching messages
    const { data: messages, isLoading: messegesLoading, error } = useQuery({
        queryKey: ['messeges'],
        queryFn: () => getMessages({ workgroupId }),
    });
    // React Query mutations
    const { mutate: joinChatMutation } = useMutation({
        mutationFn: joinChat,
        onSuccess: () => {
            toast.success('Join Successfully')
        },
        onError: (error) => {
            console.error('Error joining chat:', error);
        },
    });
    //
    const joinChatRoom = async (workgroupId) => {
        try {
            //
            const conn = new HubConnectionBuilder()
                .withUrl("http://spcs.somee.com/chathub", { //http://spcs.somee.com/chathub
                    accessTokenFactory: () => localStorage.getItem("token"), // Adjust based on your auth setup
                })
                .configureLogging(LogLevel.Information)
                .build();

                conn.on("JoinGroup", (workgroupId) => {
                    // setLiveMessages((prev) => [...prev, { user, message }]);
                    console.log(workgroupId)
                });
                await conn.start();
                await conn.invoke('JoinGroup', {workgroupId})

                setConnection(conn);
        } catch (e) {
            console.log("conn error: " + e);
        }
    }
    //
    const { mutate: mutateLeave } = useMutation({
        mutationFn: leaveChat,
        onSuccess: () => {
            toast.success('Leave Successfully')
        },
    });
    //
    const { mutate: sendMessageMutation } = useMutation({
        mutationFn: sendMessageToChat,
        onSuccess: () => {
            queryClient.invalidateQueries(['messeges'])
            toast.success('messeges send Successfully')
        },
        onError: (error) => {
            console.error('Error sending message:', error);
        },
    });
    // Handle sending a message
    const handleSendMessage = async (message) => {
        if (connection) {
            await connection.invoke("SendMessage", `Group-${workgroupId}`, userName, message);
        }
        sendMessageMutation({ workgroupId, message });
    };
    // SignalR setup
    // useEffect(() => {
    //     const connectToHub = async () => {
    //         const hubConnection = new HubConnectionBuilder()
    //             .withUrl("http://spcs.somee.com/chathub", {
    //                 accessTokenFactory: () => localStorage.getItem("token"), // Adjust based on your auth setup
    //             })
    //             .withAutomaticReconnect()
    //             .build();

    //         hubConnection.on("ReceiveMessage", (user, message) => {
    //             setLiveMessages((prev) => [...prev, { user, message }]);
    //         });

    //         await hubConnection.start();
    //         setConnection(hubConnection);
    //     };

    //     connectToHub();

    //     return () => {
    //         connection?.stop();
    //     };
    // }, []);
    //
    const handleJoinChat = () => {
        // joinChatMutation({ workgroupId });
        joinChatRoom(workgroupId)
        // connection?.invoke("JoinGroup", `Group-${workgroupId}`);
    };
    //
    const handleLeaveChat = () => {
        leaveChatMutation({ workgroupId });
        connection?.invoke("LeaveGroup", `Group-${workgroupId}`);
    };

    if (messegesLoading) {
        return <Typography>Loading...</Typography>
    }
    // console.log(messages)

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Welcome, {userName}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handleJoinChat}>
                    Join Workgroup
                </Button>
                <Button variant="contained" color="primary" onClick={handleLeaveChat}>
                    leave
                </Button>
            </Box>
            <MessageList messages={[...messages, ...liveMessages]} />
            <MessageInput sendMessage={handleSendMessage} />
        </Box>
    );
};

export default ChatPage;
