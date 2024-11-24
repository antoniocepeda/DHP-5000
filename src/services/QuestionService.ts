import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  addDoc, 
  Timestamp,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Question } from '../types';

export class QuestionService {
  private questionsRef = collection(db, 'questions');

  // CRUD Operations
  async getById(id: string): Promise<Question | null> {
    const docRef = doc(this.questionsRef, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Question;
  }

  async create(question: Omit<Question, 'id'>): Promise<string> {
    const docRef = await addDoc(this.questionsRef, {
      ...question,
      submittedAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  }

  async update(id: string, data: Partial<Question>): Promise<void> {
    const docRef = doc(this.questionsRef, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  }

  // Query Methods
  async getByStatus(status: string, pageSize = 100, lastDoc?: any): Promise<{
    questions: Question[];
    lastDoc: any;
  }> {
    let q = query(
      this.questionsRef,
      where('status', '==', status),
      orderBy('submittedAt', 'desc'),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    return {
      questions: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Question),
      lastDoc: snapshot.docs[snapshot.docs.length - 1]
    };
  }

  async getByAssignee(assignee: string): Promise<Question[]> {
    const q = query(
      this.questionsRef,
      where('assignedTo', '==', assignee),
      orderBy('submittedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Question);
  }

  // Real-time Updates
  onQuestionUpdated(id: string, callback: (question: Question) => void): () => void {
    const docRef = doc(this.questionsRef, id);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() } as Question);
      }
    });
  }

  onQuestionsChanged(
    filters: { status?: string; assignee?: string } = {},
    callback: (questions: Question[]) => void
  ): () => void {
    let q = query(this.questionsRef, orderBy('submittedAt', 'desc'));

    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.assignee) {
      q = query(q, where('assignedTo', '==', filters.assignee));
    }

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const questions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
      callback(questions);
    });
  }

  async getByUserId(userId: string) {
    try {
      const q = query(
        this.questionsRef,
        where('userId', '==', userId),
        orderBy('submittedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return {
        questions: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Question)
      };
    } catch (error: any) {
      // Handle index not ready error
      if (error.code === 'failed-precondition') {
        console.warn('Index not ready, falling back to unordered query');
        const q = query(
          this.questionsRef,
          where('userId', '==', userId)
        );
        const snapshot = await getDocs(q);
        return {
          questions: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Question)
        };
      }
      throw error;
    }
  }

  async getByProviderId(providerId: string) {
    try {
      const q = query(
        this.questionsRef,
        where('providerId', '==', providerId),
        orderBy('submittedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return {
        questions: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Question)
      };
    } catch (error: any) {
      // Handle index not ready error
      if (error.code === 'failed-precondition') {
        console.warn('Index not ready, falling back to unordered query');
        const q = query(
          this.questionsRef,
          where('providerId', '==', providerId)
        );
        const snapshot = await getDocs(q);
        return {
          questions: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Question)
        };
      }
      throw error;
    }
  }

  async getByAssignedTo(assignedTo: string) {
    const q = query(
      this.questionsRef,
      where('assignedTo', '==', assignedTo),
      orderBy('submittedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return {
      questions: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Question)
    };
  }
}

export const questionService = new QuestionService(); 