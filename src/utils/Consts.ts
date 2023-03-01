export default class Consts {
    static ProjectId = "BOIPzHkOu95pVBHPPvZ5";
    static IsEmulator = false;

    static SignInWithCustomTokenEndpoint = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/user-signInWithCustomToken" :
        "https://us-central1-readysandbox.cloudfunctions.net/user-signInWithCustomToken";
    static SignUpAnonymouslyEndpoint = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/user-signUpAnonymously" :
        "https://us-central1-readysandbox.cloudfunctions.net/user-signUpAnonymously";
    static RefreshTokensEndpoint = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/user-refreshTokens" :
        "https://us-central1-readysandbox.cloudfunctions.net/user-refreshTokens";
    static GetVirtualItemsByAppIdEndpoint = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/virtualItemsV2-getByAppId" :
        "https://us-central1-readysandbox.cloudfunctions.net/virtualItemsV2-getByAppId";
    static GetUserCurrenciesEndpoint = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/user-getUserCurrenciesV2" :
        "https://us-central1-readysandbox.cloudfunctions.net/user-getUserCurrenciesV2";
    static GetUserWalletsEndpoint = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/wallets-getUserWallets" :
        "https://us-central1-readysandbox.cloudfunctions.net/wallets-getUserWallets";
    static IsUserHavePrimaryWalletEndpoint = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/wallets-isUserHavePrimaryWallet" :
        "https://us-central1-readysandbox.cloudfunctions.net/wallets-isUserHavePrimaryWallet";
    static CreateWalletEndpoint = this.IsEmulator ?
        "http://192.168.1.166:5001/readysandbox/us-central1/wallets-createWallet" :
        "https://us-central1-readysandbox.cloudfunctions.net/wallets-createWallet";
}