export interface IChatsResponse {
    conversations: {
        id:             string;
        profileOneId:   string;
        profileTwoId:   string;
        profileOne:     {
            name : string;
        }
        profileTwo:     {
            name : string;
        }
        directMessages: {
            content:   string;
        createdAt: string;
        }[]
    }[]
}


export interface ISelectedConversation {
    id:             string;
    profileOneId:   string;
    profileTwoId:   string;
    profileOne:     {
        name : string;
    }
    profileTwo:     {
        name : string;
    }
    directMessages: {
        content:   string;
    createdAt: string;
    }[]
}



