import { useState } from "react";
import "./App.css";
import { fetchQuestions, Question } from "./api";
import AiBgImage from "./Ai.png";
import AiBgImage2 from "./Ai-2.png";

// --- Components ---

// 1. Start Screen
const StartScreen = ({ onStart, loading }: { onStart: () => void; loading: boolean }) => (
  <div className="w-full h-screen bg-[#4242E0] relative overflow-hidden text-[#EBEFF2]">
    <img 
      src={AiBgImage2} 
      alt="Background Decoration"
      className="absolute pointer-events-none origin-center"
      style={{
        width: '129.38vw', height: 'auto', top: '-81.59vh', left: '-48.90vw',
        transform: 'rotate(-155.32deg)', opacity: 0.4, border: '1px solid #EBEFF2' 
      }}
    />
    <div className="absolute flex flex-col items-end" style={{ top: '36.53%', right: '16%', textAlign: 'right', zIndex: 10 }}>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16.2vw', fontWeight: 400, lineHeight: '76%', letterSpacing: '0%', margin: 0, color: '#EBEFF2', textTransform: 'uppercase' }}>
        QUIZZLER
      </h1>
      <div className="flex items-center justify-end gap-3" style={{ marginTop: '4vh', fontFamily: "'Sora', sans-serif", color: '#EBEFF2' }}>
        <span style={{ fontSize: 'max(14px, 0.87vw)', opacity: 0.8, fontWeight: 400 }}>BY:</span>
        <div className="flex items-center gap-2" style={{ fontSize: 'max(16px, 1.39vw)', fontWeight: 400 }}>
          <svg className="w-[1.2em] h-[1.2em]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          <span>Olivia Wang/</span>
        </div>
      </div>
      <button onClick={onStart} disabled={loading} className="group flex items-center justify-end gap-2 transition-opacity hover:opacity-80" style={{ marginTop: '6vh', fontFamily: "'Sora', sans-serif", fontSize: '1.85vw', fontWeight: 400, color: '#EBEFF2', cursor: loading ? 'wait' : 'pointer' }}>
        {loading ? <span>Loading...</span> : <>Let's start the quiz<span className="group-hover:translate-x-1 transition-transform">→</span></>}
      </button>
    </div>
  </div>
);

// 2. Quiz Screen
const QuizScreen = ({ questions, onFinish }: { questions: Question[]; onFinish: (score: number) => void; }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const currentQuestion = questions[currentIndex];
  const progress = currentIndex + 1;
  const total = questions.length;
  const optionLabels = ["A", "B", "C", "D"];

  const handleNext = () => {
    if (!selectedOption) return;
    let newScore = score;
    if (selectedOption === currentQuestion.correctAnswer) { newScore = score + 1; setScore(newScore); }
    if (currentIndex < total - 1) { setCurrentIndex((prev) => prev + 1); setSelectedOption(null); } else { onFinish(newScore); }
  };

  return (
    <div className="w-full h-screen bg-[#EBEFF2] relative overflow-hidden text-[#4242E0]">
      <img src={AiBgImage} alt="Background Decoration" className="absolute pointer-events-none origin-center" style={{ width: '83.36%', height: 'auto', transform: 'rotate(-155.32deg)', opacity: 0.3, top: '-43.6%', left: '-51.74%', border: '1px solid #4242E0' }} />
      <div className="absolute flex items-center gap-2 font-bold" style={{ top: '3.5%', left: '87.96%', width: '9%', height: 'auto', fontFamily: "'Sora', sans-serif", fontSize: 'max(12px, 0.9vw)' }}>
        <svg className="w-full h-full max-w-[24px] max-h-[24px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
        <span className="whitespace-nowrap">Olivia Wang/</span>
      </div>
      <div className="absolute flex flex-col items-center" style={{ top: '10.92%', left: '25.23%', width: '49.54%', zIndex: 10 }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '5.56vw', lineHeight: '100%', fontWeight: 400, textTransform: 'uppercase', margin: 0, marginBottom: '1.8vh' }}>Question {progress}/{total}</h2>
        <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '2.08vw', lineHeight: '1.2', textAlign: 'center', fontWeight: 400 }}>{currentQuestion.question}</p>
      </div>
      
      <div className="absolute flex flex-col justify-between" style={{ top: '42.08%', left: '29.75%', width: '40.51%', height: '39.84%', zIndex: 10 }}>
        {currentQuestion.options.map((opt, idx) => {
           const isSelected = selectedOption === opt;
           return (
             <button key={idx} onClick={() => setSelectedOption(opt)} 
                className="w-full flex items-center px-4 transition-all duration-200 group text-left relative" 
                style={{ 
                    border: '2px solid #4242E0', 
                    backgroundColor: isSelected ? '#4242E0' : 'transparent', 
                    height: '22%', 
                    fontFamily: "'Sora', sans-serif", 
                    fontSize: '1.39vw', 
                    color: isSelected ? '#FFFFFF' : '#4242E0' 
                }}
             >
                <div className="flex-shrink-0 flex items-center justify-center rounded-full mr-[1.5vw] transition-colors" 
                    style={{ 
                        width: '2.89vw', 
                        height: '2.89vw', 
                        backgroundColor: isSelected ? 'transparent' : '#4242E0', 
                        border: isSelected ? '2px solid #FFFFFF' : '2px solid #4242E0',
                        color: '#FFFFFF', 
                        fontFamily: "'Bebas Neue', sans-serif", 
                        fontSize: '1.74vw' 
                    }}
                >
                    {optionLabels[idx]}
                </div>
                <span style={{ fontSize: '1.39vw', lineHeight: '100%' }}>{opt}</span>
             </button>
           )
        })}
      </div>
      
      <button onClick={handleNext} disabled={!selectedOption} className="absolute flex items-center justify-center transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed" style={{ top: '85.77%', left: '44.97%', width: '8.68%', height: '6.71%', backgroundColor: 'rgba(66, 66, 224, 0.1)', fontFamily: "'Sora', sans-serif", fontSize: '1.74vw', color: '#4242E0', zIndex: 10 }}>{currentIndex === total - 1 ? "Finish" : "Next"}</button>
    </div>
  );
};

// 3. Result Screen
const ResultScreen = ({ score, total, onRetry }: { score: number, total: number, onRetry: () => void }) => (
  <div className="w-full h-screen bg-[#4242E0] relative overflow-hidden font-sans">
    <img src={AiBgImage2} alt="Background Decoration" className="absolute pointer-events-none origin-center" style={{ width: '129.38vw', height: 'auto', top: '-81.59vh', left: '-48.90vw', transform: 'rotate(-155.32deg)', opacity: 0.4, border: '1px solid #EBEFF2' }} />
    <div className="absolute" style={{ width: '44.79vw', height: '110.56vh', top: '-8.5vh', left: '47.51vw', backgroundColor: '#EBEFF2', zIndex: 10 }}></div>
    <div className="absolute flex items-start justify-center" style={{ width: '41.49vw', height: '42.97vh', top: '21.75vh', left: '48.84vw', fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: '23.15vw', lineHeight: '100%', letterSpacing: '-0.05em', textAlign: 'center', color: '#4242E0', zIndex: 20 }}>
        {score}/{total}
    </div>
    <div className="absolute flex items-start justify-end" style={{ width: '37.73vw', height: '32.23vh', top: '22.75vh', left: '5.03vw', fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: '17.36vw', lineHeight: '100%', letterSpacing: '0%', textAlign: 'right', textTransform: 'uppercase', color: '#EBEFF2', zIndex: 20 }}>
        BRAVO!
    </div>
    <div className="absolute flex items-start justify-end" style={{ width: '38.83vw', height: '13.43vh', top: '45.1vh', left: '3.93vw', fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: '7.23vw', lineHeight: '100%', letterSpacing: '0%', textAlign: 'right', textTransform: 'uppercase', color: '#EBEFF2', zIndex: 20 }}>
        YOU HAVE SCORED
    </div>
    <button onClick={onRetry} className="absolute underline hover:opacity-80 transition-opacity" style={{ width: '17.48vw', height: '40px', top: '60vh', left: '25.28vw', fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: '1.85vw', lineHeight: '100%', textAlign: 'center', color: '#EBEFF2', zIndex: 20 }}>
        Wanna Play Again?
    </button>
  </div>
);

// --- Main App Logic ---

function App() {
  const [gameState, setGameState] = useState<"start" | "playing" | "finished">("start");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);
    const data = await fetchQuestions();
    if (data && data.length > 0) { setQuestions(data); setGameState("playing"); } 
    else { alert("Failed to load questions. Please check your network or API Key."); }
    setIsLoading(false);
  };

  const handleFinish = (score: number) => { setFinalScore(score); setGameState("finished"); };
  const handleRetry = () => { setFinalScore(0); setQuestions([]); setGameState("start"); };

  return (
    <main className="w-full h-full font-sans antialiased">
      {gameState === "start" && <StartScreen onStart={handleStart} loading={isLoading} />}
      {gameState === "playing" && questions.length > 0 && <QuizScreen questions={questions} onFinish={handleFinish} />}
      {gameState === "finished" && <ResultScreen score={finalScore} total={questions.length} onRetry={handleRetry} />}
    </main>
  );
}

export default App;