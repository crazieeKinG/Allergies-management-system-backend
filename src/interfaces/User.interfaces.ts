interface UserInterface {
    id: string;
    name: string;
    dateOfBirth: string;
    email: string;
    password: string;
    address: string;
}

export type UserToInsert = Omit<UserInterface, "id">;

export default UserInterface;
