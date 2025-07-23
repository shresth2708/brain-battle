# Brain Battle🏆

A modern, interactive trivia quiz app built with React, Vite, and Firebase that challenges your knowledge across multiple categories!

## 🌟 Features

### Quiz Experience
- **9 Different Categories**: From General Knowledge to Science & Technology
- **Dynamic Questions**: Powered by Open Trivia Database API
- **Timer Challenge**: 30 seconds per question to keep you on your toes
- **Interactive UI**: Clean, responsive design that works on all devices
- **Score Tracking**: Earn points for correct answers

### User Management
- **Firebase Authentication**: Secure email/password registration and login
- **Personal Profiles**: Track your progress and statistics
- **Score History**: View all your past quiz attempts with detailed breakdowns

### Leaderboard System
- **Global Rankings**: See how you stack up against other players
- **Real-time Updates**: Scores are automatically saved and ranked
- **Personal Stats**: View your total score, quizzes completed, and average performance
- **Achievement Tracking**: Monitor your improvement over time

## 📱 Pages

1. **Home** - Choose from 9 quiz categories and start your challenge
2. **Quiz** - Interactive quiz experience with timer and score tracking
3. **Leaderboard** - Global rankings and personal score history
4. **Authentication** - Sign up or sign in to track your progress
5. **About** - Learn about the Brain Battleexperience
6. **Services** - Explore our quiz services
7. **Blog** - Read articles about trivia and knowledge
8. **Contact** - Get in touch with our team

## 🔧 Technologies Used

- **Frontend**: React 19, Vite, React Router
- **Backend**: Firebase (Authentication & Firestore)
- **API**: Open Trivia Database
- **Styling**: Custom CSS with responsive design
- **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd capstonensts2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config to `src/firebase/config.js`
   - See `FIREBASE_RULES.md` for security rules setup

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to the URL displayed in the terminal (usually `http://localhost:5173`)

## 🏗️ Building for Production

```bash
npm run build
npm run preview  # Preview the production build locally
```

## 🎯 How to Play

1. **Sign Up/Sign In** (optional but recommended for score tracking)
2. **Choose a Category** from the home page
3. **Answer Questions** within the 30-second timer
4. **View Your Results** and see how you performed
5. **Check the Leaderboard** to see your global ranking
6. **Try Again** to improve your score!

## 📊 Quiz Categories

1. **General Knowledge** - A mix of everything!
2. **Science & Nature** - Physics, chemistry, biology, and more
3. **History** - Travel back in time with historical facts
4. **Movies & TV** - For film buffs and binge-watchers
5. **Sports** - From football to F1
6. **Geography** - Explore the world!
7. **Art & Literature** - Books, paintings, and famous authors
8. **Technology** - Computers, internet, and inventions
9. **Music** - From classical to pop culture

## 🔐 Privacy & Security

- User authentication is handled securely through Firebase
- Only authenticated users can save scores
- Personal data is protected with Firestore security rules
- No personal information is shared on the leaderboard except display names

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## 📝 License

This project is open source and available under the MIT License.

---

**Ready to test your knowledge? Start playing Brain Battletoday! 🧠✨**
