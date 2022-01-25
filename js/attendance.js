const attend = async (uid, classId) => {
    //is activated
    if(!isActivatedClass(classId)) {
        console.log("none-activated");
        return;
    }
    // const uid = firebase.auth().currentUser.uid;
    try {
        let cls1 = await getClass(classId);
        let cls_data = cls1.data(); 
        if(cls_data.trainers.length >= cls_data.capacity){//validate capacity
            console.log("class's full!");
            return;
        }
        if (!cls_data.trainers.includes(uid)) cls_data.trainers.push(uid);
        await updateClass(classId, cls_data);
        await saveAttendance(uid, cls_data.gym);
        
    } catch (error) {
        // handle error
        console.log(error);
    }
}
const saveAttendance = (customer, gym, timestamp = new Date()) => {
    db.collection(collection_attendance).doc().set({
        customer,
        gym,
        timestamp
    });
}