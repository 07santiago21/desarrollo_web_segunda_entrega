export interface User {
    user_id: number;
    username: string;
    password: string;
    email: string;
    bio?: string;
    is_owner: boolean;
    profile_picture?: string;
}
