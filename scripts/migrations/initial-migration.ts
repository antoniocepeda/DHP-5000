/**
 * Initial Firestore Migration Script
 * Executed on: 2024-03-24
 * 
 * This script was used for the initial migration of data to Firestore.
 * - Migrated tickets to questions collection
 * - Created message subcollections
 * - Migrated experts collection
 * 
 * Keep for reference and potential future migrations.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { tickets } from '../src/data/tickets';
import { experts } from '../src/data/experts';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "dhp-5000.firebaseapp.com",
  projectId: "dhp-5000",
  storageBucket: "dhp-5000.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateData() {
  console.log('🚀 Starting migration...');

  // Migrate questions
  console.log('\n📝 Migrating questions...');
  for (const ticket of tickets) {
    try {
      // Prepare messages if they exist
      const messages = ticket.messages || [];
      // Remove messages from main document (will be added as subcollection)
      const { messages: _, ...questionData } = ticket;

      // Create question document
      const questionRef = doc(db, 'questions', ticket.id);
      await setDoc(questionRef, {
        ...questionData,
        submittedAt: Timestamp.fromDate(new Date(ticket.submittedAt)),
        updatedAt: ticket.updatedAt ? Timestamp.fromDate(new Date(ticket.updatedAt)) : null
      });
      console.log(`✅ Migrated question: ${ticket.id}`);

      // Add messages as subcollection
      if (messages.length > 0) {
        for (const message of messages) {
          const messageRef = doc(collection(db, 'questions', ticket.id, 'messages'));
          await setDoc(messageRef, {
            ...message,
            timestamp: Timestamp.fromDate(new Date(message.timestamp))
          });
        }
        console.log(`📨 Added ${messages.length} messages to question ${ticket.id}`);
      }
    } catch (error) {
      console.error(`❌ Error migrating question ${ticket.id}:`, error);
    }
  }

  // Migrate experts
  console.log('\n👨‍⚕️ Migrating experts...');
  for (const expert of experts) {
    try {
      await setDoc(doc(db, 'experts', expert.id), expert);
      console.log(`✅ Migrated expert: ${expert.id}`);
    } catch (error) {
      console.error(`❌ Error migrating expert ${expert.id}:`, error);
    }
  }

  console.log('\n✨ Migration complete!');
}

// Run migration
migrateData().catch(console.error);
