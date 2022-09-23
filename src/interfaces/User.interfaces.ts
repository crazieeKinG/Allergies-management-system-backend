interface UserInterface {
    id: string;
    fullName: string;
    dateOfBirth: string;
    email: string;
    password: string;
    address: string;
}

export type UserToInsert = Omit<UserInterface, "id">;

export interface UserCredentials {
    email: string;
    password: string;
}

export default UserInterface;