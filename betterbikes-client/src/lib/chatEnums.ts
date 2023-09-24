//enum events for chat

export const enum ChatEvents {  
 CONNECTED_EVENT = "connected",
    DISCONNECTED_EVENT = "disconnected",
    JOIN_ROOM_EVENT = "join_room",
    LEAVE_ROOM_EVENT = "leave_room",
    SEND_MESSAGE_EVENT = "send_message",
    RECEIVE_MESSAGE_EVENT = "receive_message",
    TYPING_EVENT = "typing",
    STOP_TYPING_EVENT = "stop_typing",
    USER_JOINED_EVENT = "user_joined",
    USER_LEFT_EVENT = "user_left",
    ERROR_EVENT = "error",
    RECONNECT_EVENT = "reconnect",
    RECONNECTING_EVENT = "reconnecting",
    RECONNECT_ERROR_EVENT = "reconnect_error",
    RECONNECT_FAILED_EVENT = "reconnect_failed",
    CONNECT_ERROR_EVENT = "connect_error",
    CONNECT_TIMEOUT_EVENT = "connect_timeout",
    CONNECT_EVENT = "connect",
    DISCONNECT_EVENT = "disconnect",
}

export const enum NotificationEvents {
    NEW_MESSAGE = "new_message",
    NEW_NOTIFICATION = "new_notification",
    NEW_USER = "new_user",
    NEW_RENT_REQUEST = "rent_request",

}