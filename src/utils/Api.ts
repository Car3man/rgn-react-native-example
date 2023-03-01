import axios, {AxiosInstance} from "axios";
import Consts from "./Consts";
import Auth, {AuthData} from "./Auth";

class Api {
    _axiosInstance : AxiosInstance;

    constructor() {
        const api = this;
        this._axiosInstance = axios.create();
        this._axiosInstance.interceptors.request.use(async function (config) {
            const authData = await Auth.getAuthData();
            config.headers.setAuthorization(`Bearer ${authData.idToken}`);
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        this._axiosInstance.interceptors.response.use(function (response) {
            return response;
        }, async function (error) {
            const originalRequest = error.config;
            if (originalRequest._retry) {
                return Promise.reject(error);
            }

            if (error.response.status !== 403 && error.response.status !== 500) {
                return Promise.reject(error);
            }

            const authData = await Auth.getAuthData();
            if (!authData.refreshToken) {
                return Promise.reject(error);
            }

            const refreshTokensResult = await api.refreshTokens(authData.refreshToken);

            await Auth.setAuthData({
                userId: refreshTokensResult.userId,
                idToken: refreshTokensResult.idToken,
                refreshToken: refreshTokensResult.refreshToken
            } as AuthData);

            originalRequest._retry = true;
            return api._axiosInstance(originalRequest);
        });
    }

    async signInWithCustomToken(customToken: string) {
        const response = await this._axiosInstance.post(Consts.SignInWithCustomTokenEndpoint, {
            customToken: customToken,
        });

        const data = response.data;
        const userId = data.userId as string;
        const idToken = data.idToken as string;
        const refreshToken = data.refreshToken as string;

        return {
            userId: userId,
            idToken: idToken,
            refreshToken: refreshToken,
        };
    };

    async signUpAnonymously() {
        const response = await this._axiosInstance.post(Consts.SignUpAnonymouslyEndpoint, {
            appPackageName: Consts.ProjectId
        });
        const data = response.data;
        const userId = data.userId as string;
        const customToken = data.customToken as string;

        return {
            userId: userId,
            customToken: customToken,
        };
    };

    async refreshTokens(refreshToken: string) {
        const response = await this._axiosInstance.post(Consts.RefreshTokensEndpoint, {
            refreshToken: refreshToken
        });
        const data = response.data;
        const userId = data.userId as string;
        const newIdToken = data.idToken as string;
        const newRefreshToken = data.refreshToken as string;

        return {
            userId: userId,
            idToken: newIdToken,
            refreshToken: newRefreshToken,
        };
    }

    async getVirtualItemsByAppId() {
        return await this._axiosInstance.post(Consts.GetVirtualItemsByAppIdEndpoint, {
            data: {
                appPackageName: Consts.ProjectId
            }
        });
    };

    async getUserWallets() {
        return await this._axiosInstance.post(Consts.GetUserWalletsEndpoint, {
            data: {
                version: 2
            }
        });
    };

    async isUserHavePrimaryWallet() {
        return await this._axiosInstance.post(Consts.IsUserHavePrimaryWalletEndpoint, {
            data: {
                version: 2
            }
        });
    };

    async createUserWallet(password: string) {
        const authData = await Auth.getAuthData();
        return await this._axiosInstance.post(Consts.CreateWalletEndpoint, {
            data: {
                token: authData.idToken,
                password: password,
                version: 2
            }
        });
    };

    async getUserCurrencies() {
        return await this._axiosInstance.post(Consts.GetUserCurrenciesEndpoint, {
            data: {}
        });
    };
}

export default new Api;