import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { BookingEnquiry, EnquiryStatus } from '../types';

const ENQUIRIES_COLLECTION = 'booking_enquiries';

export async function createBookingEnquiry(
  enquiryData: Omit<BookingEnquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<BookingEnquiry> {
  const enquiryId = `ENQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const fullEnquiry: BookingEnquiry = {
    ...enquiryData,
    id: enquiryId,
    status: 'Pending',
    createdAt: now,
    updatedAt: now,
  };

  try {
    const docRef = doc(db, ENQUIRIES_COLLECTION, enquiryId);
    await setDoc(docRef, fullEnquiry);
    return fullEnquiry;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${ENQUIRIES_COLLECTION}/${enquiryId}`);
  }
}

export async function getUserEnquiries(userId: string): Promise<BookingEnquiry[]> {
  try {
    const ref = collection(db, ENQUIRIES_COLLECTION);
    const q = query(ref, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const enquiries = snapshot.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<BookingEnquiry, 'id'>)
    }));

    return enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${ENQUIRIES_COLLECTION}?userId=${userId}`);
  }
}

export async function getAllEnquiries(): Promise<BookingEnquiry[]> {
  try {
    const ref = collection(db, ENQUIRIES_COLLECTION);
    const snapshot = await getDocs(ref);
    const enquiries = snapshot.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<BookingEnquiry, 'id'>)
    }));

    return enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, ENQUIRIES_COLLECTION);
  }
}

export async function updateEnquiryStatus(
  enquiryId: string,
  status: EnquiryStatus,
  adminNotes?: string
): Promise<void> {
  try {
    const docRef = doc(db, ENQUIRIES_COLLECTION, enquiryId);
    const updates: Partial<BookingEnquiry> = {
      status,
      updatedAt: new Date().toISOString()
    };
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }
    await updateDoc(docRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${ENQUIRIES_COLLECTION}/${enquiryId}`);
  }
}
