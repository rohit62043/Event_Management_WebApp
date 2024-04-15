import conf from "../conf/conf";
import { Client, ID, Account } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //Direct Login karwa do
                return this.login(email, password);
            }
            else {
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite servies :: createAccount :: error", error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite servies :: login :: error", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite servies :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSession();
        } catch (error) {
            console.log("Appwrite servies :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;