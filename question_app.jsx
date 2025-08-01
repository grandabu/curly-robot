import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function QuestionApp() {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const addChoice = () => setChoices([...choices, ""]);

  const saveQuestion = () => {
    if (!questionText || choices.some((c) => c === "") || correctIndex === null) return;

    const newQuestion = {
      text: questionText,
      choices,
      correctIndex,
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setChoices(["", ""]);
    setCorrectIndex(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold">Create a Question</h2>
          <Textarea
            placeholder="Enter your question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          {choices.map((choice, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder={`Choice ${index + 1}`}
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
              />
              <input
                type="radio"
                name="correct"
                checked={correctIndex === index}
                onChange={() => setCorrectIndex(index)}
              />
              <span>Correct</span>
            </div>
          ))}

          <Button variant="outline" onClick={addChoice}>
            + Add Choice
          </Button>

          <Button onClick={saveQuestion}>Save Question</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Saved Questions</h2>
        {questions.map((q, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold">Q{idx + 1}: {q.text}</p>
              <ul className="list-disc list-inside">
                {q.choices.map((choice, i) => (
                  <li
                    key={i}
                    className={
                      i === q.correctIndex ? "text-green-600 font-medium" : ""
                    }
                  >
                    {choice}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
