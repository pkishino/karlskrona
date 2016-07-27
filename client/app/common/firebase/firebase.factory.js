let FirebaseFactory = function() {
    const config = {
        apiKey: "AIzaSyBbS0TVtTSSBiIup-LahxxY773efpz6qFA",
        authDomain: "dive-karlskrona.firebaseapp.com",
        databaseURL: "https://dive-karlskrona.firebaseio.com",
        storageBucket: "dive-karlskrona.appspot.com"
    };

    let initialize = () => {
        try{
        	return firebase.app();
        }catch(err){
        	return firebase.initializeApp(config);
        }
    };

    return { initialize };
};

export default FirebaseFactory;
