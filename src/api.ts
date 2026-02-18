const API_KEY = 'x5Bf1fdtQsMGu0bmdcZbaO2Ac5l0zyhbhumdmiI8';
const API_URL = 'https://quizapi.io/api/v1/questions';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const url = `${API_URL}?apiKey=${API_KEY}&limit=10&tags=JavaScript`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.map((item: any) => {
      const options: string[] = [];
      const answerKeyMap: Record<string, string> = {}; 

      Object.entries(item.answers).forEach(([key, value]) => {
        if (value) {
          options.push(value as string);
          answerKeyMap[key] = value as string; 
        }
      });

      let correctAnswerText = "";
      for (const [key, isCorrect] of Object.entries(item.correct_answers)) {
        if (isCorrect === "true") {
    
          const answerKey = key.replace("_correct", "");
          correctAnswerText = answerKeyMap[answerKey] || "";
          break;
        }
      }

      if (!correctAnswerText && options.length > 0) {
        correctAnswerText = options[0];
      }

      return {
        id: item.id,
        question: item.question,
        options: options,
        correctAnswer: correctAnswerText,
      };
    });
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return [];
  }
};