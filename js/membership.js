
// Membership CRUD

const getMemberships = () => {
    return db.collection(collection_membership).get();
}

const getMembership = (id) => {
    return db.collection(collection_membership).doc(id).get();
}

const saveMembership = (name, description, price) => {
    db.collection(collection_membership).doc().set({
        name,
        description,
        price
    });
}

const updateMembership = (id, updatedMembership) => {
    db.collection(collection_membership).doc(id).update(updatedMembership);
}

const deleteMembership = (id) => {
    db.collection(collection_membership).doc(id).delete();
}