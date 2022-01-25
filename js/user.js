// Users CRUD

const getUsers = () => {
    return db.collection(collection_user).get();
}

const getUser = (id) => {
    return db.collection(collection_user).doc(id).get();
}

const saveUser = (uid, username, password, type, mobile, membership, activated = true) => {
    db.collection(collection_user).doc(uid).set({
        username,
        password,
        type,
        mobile,
        membership,
        activated
    });
}

const updateUser = (id, updatedUser) => {
    db.collection(collection_user).doc(id).update(updatedUser);
}

const deleteUser = (id) => {
    db.collection(collection_user).doc(id).delete();
}

const isActivatedUser = async (id) => {
    const usr = await getUser(id);
    const usr_data = usr.data(); 
    return usr.activated;
}

const deActivatedUser = async (id) => {
    const usr = await getUser(id);
    const usr_data = usr.data(); 
    usr_data.activated = !usr_data.activated;
    updateUser(id, usr_data);
}

const signUpWithEmailAndPassword = (email, password, type, mobile, membership) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        
        try {
            user = userCredential.user;
            saveUser(user.uid, email, password, type, mobile, membership);
            // Set custom user claims on this newly created user.
            
        } catch (error) {
            console.log(error);
        }
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        // ..
    });
}

const signInWithEmailAndPassword = async (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        var user_profile = getUser(user.uid);
        return user_profile.data();
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}