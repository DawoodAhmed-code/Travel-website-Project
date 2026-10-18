import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { ContactMessage } from '../types';

const CONTACT_COLLECTION = 'contact_messages';
const NEWSLETTER_COLLECTION = 'newsletter_subscribers';

export async function submitContactMessage(
  data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>
): Promise<string> {
  const messageId = `msg-${Date.now()}`;
  try {
    const docRef = doc(db, CONTACT_COLLECTION, messageId);
    const fullMsg: ContactMessage = {
      ...data,
      id: messageId,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    await setDoc(docRef, fullMsg);
    return messageId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${CONTACT_COLLECTION}/${messageId}`);
  }
}

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  try {
    const ref = collection(db, CONTACT_COLLECTION);
    const snap = await getDocs(ref);
    const list = snap.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<ContactMessage, 'id'>)
    }));
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, CONTACT_COLLECTION);
  }
}

export async function subscribeNewsletter(email: string): Promise<void> {
  const cleanEmail = email.trim().toLowerCase();
  const subId = cleanEmail.replace(/[^a-zA-Z0-9]/g, '_');
  try {
    const docRef = doc(db, NEWSLETTER_COLLECTION, subId);
    await setDoc(docRef, {
      email: cleanEmail,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${NEWSLETTER_COLLECTION}/${subId}`);
  }
}
