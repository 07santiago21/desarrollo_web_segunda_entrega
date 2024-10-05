export interface SignalUser {
    user_id: number| null;
    username: string;
    password: string;
    email: string;
    bio?: string;
    is_owner: boolean | null;
    profile_picture?: string;
}