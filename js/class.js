

// Class CRUD

const getClasses = () => {
    return db.collection(collection_class).get();
}

const getClass = (id) => {
    return db.collection(collection_class).doc(id).get();
}

const saveClass = async (duration, begins, ends, capacity, gym, customers, trainers, activated = true) => {
    db.collection(collection_class).add({
        duration,
        begins,
        ends,
        capacity,
        gym,
        customers,
        trainers,
        activated
    }).then(async (docRef) => {
        console.log("Document written with ID: ", docRef.id);
        let gym1 = await getGym(gym);
        console.log(gym1)
        let gym_data = gym1.data();
        gym_data.classes.push(docRef.id);
        updateGym(gym, gym_data);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
}

const updateClass = (id, updatedClass) => {
    db.collection(collection_class).doc(id).update(updatedClass);
}

const deleteClass = (id) => {
    db.collection(collection_class).doc(id).delete();
}

//diagram 
const isActivatedClass = async (id) => {
    const cls = await getClass(id);
    const cls_data = cls.data(); 
    return cls_data.activated;
}

const deActivateClass = async (id) => {
    const cls = await getClass(id);
    const cls_data = cls.data(); 
    cls_data.activated = !cls_data.activated;
    updateClass(id, cls_data);
}