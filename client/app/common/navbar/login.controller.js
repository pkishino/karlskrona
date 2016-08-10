class LoginComponentController {
    constructor() {
        this.name = 'loginComponent';
        this.email = null;
        this.password = null;
        var vm = this;
    }
    authenticate() {
        var vm = this;
        this.auth.$signInWithEmailAndPassword(this.email, this.password).then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            vm.close();

        }).catch(function(error) {
            console.error("Authentication failed:", error);
        });
    }
}
export default LoginComponentController;
