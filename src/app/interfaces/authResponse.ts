export interface AuthResponse {
    id: String;
    userName: String;
    completeName: String;
    email: string;
    isAuthSuccessful: boolean;
    token: string;
    provider: string;
    externalLogin:boolean;
}