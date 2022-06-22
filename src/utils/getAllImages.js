import firebase from "firebase/app";
import "firebase/storage";
import { firebaseImageFolder } from './target_classes'
export const getAllImages = async () =>{
    const imageRefs = await firebase
    .storage()
    .ref()
    .child(firebaseImageFolder)
    .listAll();
    const urls = await Promise.all(
    imageRefs.items.map((ref) => ref.getDownloadURL())
    );
    return urls;
}