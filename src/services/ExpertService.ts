import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where,
  orderBy,
  limit,
  onSnapshot,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Expert } from '../types';

class ExpertService {
  private expertsRef = collection(db, 'experts');

  async getAllExperts() {
    const snapshot = await getDocs(this.expertsRef);
    return {
      experts: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Expert)
    };
  }

  async getById(id: string): Promise<Expert | null> {
    const docRef = doc(this.expertsRef, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Expert;
  }

  async addExpert(expert: Omit<Expert, 'id'>) {
    const docRef = await addDoc(this.expertsRef, expert);
    return { id: docRef.id, ...expert };
  }

  async updateExpert(id: string, expert: Partial<Expert>) {
    const docRef = doc(this.expertsRef, id);
    await updateDoc(docRef, expert);
    return { id, ...expert };
  }

  async getExpertsBySpecialty(specialty: string) {
    const q = query(
      this.expertsRef,
      where('specialty', '==', specialty),
      orderBy('cases', 'desc')
    );
    const snapshot = await getDocs(q);
    return {
      experts: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Expert)
    };
  }

  onExpertsChanged(
    filters: { specialty?: string } = {},
    callback: (experts: Expert[]) => void
  ): () => void {
    let q = query(this.expertsRef, orderBy('cases', 'desc'));

    if (filters.specialty) {
      q = query(q, where('specialty', '==', filters.specialty));
    }

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const experts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Expert[];
      callback(experts);
    });
  }

  async getAll(pageSize = 100): Promise<{
    experts: Expert[];
    lastDoc: any;
  }> {
    const q = query(
      this.expertsRef,
      orderBy('cases', 'desc'),
      limit(pageSize)
    );

    const snapshot = await getDocs(q);
    return {
      experts: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Expert),
      lastDoc: snapshot.docs[snapshot.docs.length - 1]
    };
  }
}

export const expertService = new ExpertService(); 