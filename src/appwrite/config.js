import conf from "../conf/conf";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    database;
    storage;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client);
    }

    async createEvent({ eventname, slug, content, NumberOfSeats, eventVenue, eventdate, featuredimage, userId, eventstatus }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDBid,
                conf.appwriteCollectionId,
                slug,
                {
                    eventname, eventdate, content, NumberOfSeats, eventVenue, featuredimage, eventstatus, userId
                }
            )
        } catch (error) {
            console.log("Appwrite servies :: createEvent :: error", error);
        }
    }
    async createUserDetails({ userId, eventDetails }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDBid,
                conf.appwriteUserCollectionId,
                {
                    userId, eventDetails
                }
            )
        } catch (error) {
            console.log("Appwrite servies :: createUserDetails :: error", error);
        }
    }

    async updateEvent(slug, { eventname, content, NumberOfSeats, eventdate, eventVenue, featuredimage, eventstatus }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDBid,
                conf.appwriteCollectionId,
                slug, {
                eventname, content, NumberOfSeats, eventdate, eventVenue, featuredimage, eventstatus
            }
            )
        } catch (error) {
            console.log("Appwrite servies :: updateEvent :: error", error);
        }
    }

    async deleteEvent(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDBid,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite servies :: deleteEvent :: error", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDBid,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite servies :: getPost :: error", error);
            return false;
        }
    }

    // For passing the keys in query first we need to list down the key in indexes section in appwrite
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDBid,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite servies :: getPosts :: error", error);
        }
    }

    //File upload and delete functionality

    //this uploadFile will return fileId which will be used when stored in db
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite servies :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite servies :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }

}

const service = new Service()
export default service