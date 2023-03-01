import Utils from "./Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthData {
    userId: string,
    idToken: string,
    refreshToken: string
}

class Auth {
    _initialLoading: Boolean = false;
    _authData: AuthData = {} as AuthData;
    _callbacks: Map<string, Array<Function>> = new Map([["idToken", []]]);

    constructor() {
        this.loadFromStorage()
            .then(() => {
                this._initialLoading = true;
                console.log("auth data successfully loaded from local storage");
            })
            .catch(() => {
                console.log("error to load auth data from local storage");
            });
    }

    private async loadFromStorage() {
        const authorization = await AsyncStorage.getItem("authorization");
        if (!authorization) {
            return;
        }

        const authData = JSON.parse(authorization as string);
        if (!authData) {
            return;
        }

        this._authData = authData;
    }

    async getAuthData(): Promise<AuthData> {
        while (!this._initialLoading) {
            await Utils.waitForTime(100);
        }
        return this._authData;
    }

    async setAuthData(authData: AuthData) {
        const oldAuthData = this._authData;
        this._authData = authData;
        await AsyncStorage.setItem("authorization", JSON.stringify(this._authData));

        if (oldAuthData.idToken !== this._authData.idToken) {
            const listeners = this._callbacks.get("idToken") as Array<Function>;
            listeners.forEach((callback) => {
               callback();
            });
        }
    }

    addEventListener(name: string, callback: Function) {
        const listeners = this._callbacks.get(name) as Array<Function>;
        listeners.push(callback);
    }

    removeAllListeners() {
        this._callbacks = new Map<string, Array<Function>>([["idToken", []]]);
    }
}

export default new Auth();