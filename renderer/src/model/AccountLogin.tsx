class AccountLogin {
  accountUsername: string;
  accountPassword: string;

  constructor(accountUsername: string, accountPassword: string) {
    this.accountUsername = accountUsername;
    this.accountPassword = accountPassword;
  }

  toJson(){
    return {
        accountUsername: this.accountUsername,
        accountPassword: this.accountPassword
    }
  }
}

export default AccountLogin;
