// userModel.ts

class User {
    id: number;
    name: string;
    email: string;
    line_id: string|null;

    constructor(id: number, name: string, email: string, line_id: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.line_id = line_id;
    }
}

export default User;