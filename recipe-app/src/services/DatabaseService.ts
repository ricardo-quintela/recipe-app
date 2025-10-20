import Database from "../database/Database";

class DatabaseService {
    private readonly version = 1;
    public readonly database = new Database(this.version);
}

export default new DatabaseService();
