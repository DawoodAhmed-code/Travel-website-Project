import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Tour } from '../types';
import { INITIAL_TOURS } from '../data/seedData';

const TOURS_COLLECTION = 'tours';

export async function getAllTours(includeUnpublished: boolean = false): Promise<Tour[]> {
  try {
    const toursRef = collection(db, TOURS_COLLECTION);
    const q = includeUnpublished
      ? query(toursRef)
      : query(toursRef, where('published', '==', true));
    
    const snapshot = await getDocs(q);
    
    // If database is completely empty on first launch, auto-seed default tours
    if (snapshot.empty && !includeUnpublished) {
      console.log('Tours collection is empty, seeding initial Pakistani tours...');
      await seedDefaultTours();
      // Re-fetch
      const retrySnap = await getDocs(query(toursRef, where('published', '==', true)));
      return retrySnap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Tour, 'id'>) }));
    }

    const tours = snapshot.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<Tour, 'id'>)
    }));

    // Sort client-side by featured first, then rating
    return tours.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, TOURS_COLLECTION);
  }
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  try {
    const toursRef = collection(db, TOURS_COLLECTION);
    const q = query(toursRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      // Check if it exists by ID
      const byId = await getDoc(doc(db, TOURS_COLLECTION, slug));
      if (byId.exists()) {
        return { id: byId.id, ...(byId.data() as Omit<Tour, 'id'>) };
      }
      return null;
    }
    const d = snapshot.docs[0];
    return { id: d.id, ...(d.data() as Omit<Tour, 'id'>) };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${TOURS_COLLECTION}/slug/${slug}`);
  }
}

export async function createTour(tourData: Omit<Tour, 'id'>): Promise<string> {
  const tourId = tourData.slug || `tour-${Date.now()}`;
  try {
    const newDocRef = doc(db, TOURS_COLLECTION, tourId);
    await setDoc(newDocRef, {
      ...tourData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return tourId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${TOURS_COLLECTION}/${tourId}`);
  }
}

export async function updateTour(id: string, updates: Partial<Tour>): Promise<void> {
  try {
    const tourRef = doc(db, TOURS_COLLECTION, id);
    await updateDoc(tourRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${TOURS_COLLECTION}/${id}`);
  }
}

export async function deleteTour(id: string): Promise<void> {
  try {
    const tourRef = doc(db, TOURS_COLLECTION, id);
    await deleteDoc(tourRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${TOURS_COLLECTION}/${id}`);
  }
}

export async function seedDefaultTours(): Promise<void> {
  try {
    for (const tour of INITIAL_TOURS) {
      const tourDoc = doc(db, TOURS_COLLECTION, tour.slug);
      await setDoc(tourDoc, tour);
    }
    console.log('Seeded Pakistani tour packages successfully.');
  } catch (error) {
    console.warn('Seeding failed or permissions restricted:', error);
  }
}
