import { doc, updateDoc, arrayUnion, increment, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const saveQuizScore = async (userId, quizData) => {
  if (!userId) {
    console.log('No user logged in, score not saved');
    return;
  }

  try {
    const userRef = doc(db, 'users', userId);
    
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      console.error('User document does not exist');
      return;
    }

    const scoreData = {
      score: quizData.score,
      totalQuestions: quizData.totalQuestions,
      correctAnswers: quizData.correctAnswers,
      categoryId: quizData.categoryId,
      category: quizData.category,
      difficulty: quizData.difficulty || 'mixed',
      date: new Date().toISOString(),
      timeSpent: quizData.timeSpent || 0
    };

    await updateDoc(userRef, {
      totalScore: increment(quizData.score),
      quizzesCompleted: increment(1),
      scores: arrayUnion(scoreData),
      lastQuizDate: new Date().toISOString()
    });

    console.log('Score saved successfully!');
    return scoreData;
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

export const getUserStats = async (userId) => {
  if (!userId) return null;

  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
};

export const getLeaderboard = async (limit = 50) => {
  try {
    const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
    
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('totalScore', 'desc'), limit);
    const querySnapshot = await getDocs(q);
    
    const leaderboard = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.totalScore > 0) { 
        leaderboard.push({
          id: doc.id,
          ...data
        });
      }
    });
    
    return leaderboard;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};
