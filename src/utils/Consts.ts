export default class Consts {
    static ProjectId = "jXwpQx2Qyio20XPUkWjM";
    static IsEmulator = true;

    static SignInWithCustomTokenEndpoint = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/user-signInWithCustomToken" :
        "https://us-central1-readysandbox.cloudfunctions.net/user-signInWithCustomToken";
    static SignUpAnonymouslyEndpoint = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/user-signUpAnonymously" :
        "https://us-central1-readysandbox.cloudfunctions.net/user-signUpAnonymously";
    static RefreshTokens = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/user-refreshTokens" :
        "https://us-central1-readysandbox.cloudfunctions.net/user-refreshTokens";
    static GetVirtualItemsByAppId = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/virtualItemsV2-getByAppId" :
        "https://us-central1-readysandbox.cloudfunctions.net/virtualItemsV2-getByAppId";
    static GetUserCurrencies = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/user-getUserCurrenciesV2" :
        "https://us-central1-readysandbox.cloudfunctions.net/user-getUserCurrenciesV2";
}