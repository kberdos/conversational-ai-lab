import { Post } from "./types";
import { db } from "@/firebaseClient";
import { collection, doc, getDoc, addDoc, updateDoc, query, where, orderBy, limit, startAfter, getDocs, getCountFromServer } from "firebase/firestore";
import { dummyPost, dummyBlog } from "./types";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

  export const getPostData = async (id: string): Promise<Post> => {
    const ref = doc(db, "posts", id);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      return docSnap.data() as Post;
    } else {
      throw new Error("Post does not exist");
    }
  };
  
  export const createBlog = async (uid: string) => {
      const ref = await addDoc(collection(db, "posts"), 
      {
        ...dummyBlog,
        uid: uid,
      });
      // set the id of the post to the id of the document
      await updatePost(ref.id, {...dummyBlog, id: ref.id, uid: uid});
      return ref.id;
  };
  
  export const updatePost = async (id: string, newPost: Post) => {
    const ref = doc(db, "posts", id);
    const docSnap = await getDoc(ref);
    await updateDoc(ref, {
      ...newPost,
      lastUpdated: Timestamp.now(),
    });
  }

  export const getNPosts = async(pageSize: number, lastDocumentSnapShot : QueryDocumentSnapshot | null) =>{
    const collectionRef = collection(db, "posts");

    const queryConditions = [
      where("postType", "==", "blog"),
      orderBy("lastUpdated", 'desc'),
      limit(pageSize),
    ]
    if(lastDocumentSnapShot){
      //@ts-ignore
      queryConditions.push(startAfter(lastDocumentSnapShot))
    }
    const queriesCount = await getCountFromServer(query(collectionRef, where("postType", "==", "blog")));
    let q = query(collectionRef, ...queryConditions);
    try{
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // No more documents to load
        console.log('No more documents');
        return {
          documents: [],
          lastDocumentSnapShot: null,
          queriesCount: 0,
        };
      } else {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        const newLastDocumentSnapShot = querySnapshot.docs[querySnapshot.docs.length - 1];
        return {
          documents,
          lastDocumentSnapShot: newLastDocumentSnapShot,
          queriesCount: queriesCount.data().count,
        };
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
      return {
        documents: [],
        lastDocumentSnapShot: null,
        queriesCount: 0,
      };
    }

  }