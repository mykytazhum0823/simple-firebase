

// gym CRUD

const getGyms = () => {
    return db.collection(collection_gym).get();
}

const getGym = (id) => {
    return db.collection(collection_gym).doc(id).get();
}

const saveGym = (name, owner, trainers = [], classes = [], membership = [], qr = '', activated = true) => {
    db.collection(collection_gym).add({
        name,
        owner,
        trainers,
        classes,
        membership,
        qr,
        activated
    }).then((docRef) => {

    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

const updateGym = (id, updatedGym) => {
    db.collection(collection_gym).doc(id).update(updatedGym);
}

const deleteGym = (id) => {
    db.collection(collection_gym).doc(id).delete();
}

const isActivatedGym = async (id) => {
    const gym = await getGym(id);
    const gym_data = gym.data(); 
    return gym_data.activated;
}

const deActivateGym = async (id) => {
    const gym = await getGym(id);
    const gym_data = gym.data(); 
    gym_data.activated = !gym_data.activated;
    updateGym(id, gym_data);
}