import React from "react";
import "./FeynmanTechnique.css";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";
import { useState } from "react";
import axios from "axios";
const REACT_APP_OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const model = "gpt-3.5-turbo";
const FeynmanTechnique = () => {
  const [text, setText] = useState("Let us hear your stories...");
  const [lang, setLang] = useState("vie");
  const [responseObj, setResponseObj] = useState(null);
  const switchLang = () => {
    if (lang === "vie") {
      return (
        <button
          className="langbtn --vie"
          onClick={() => {
            setLang("eng");
          }}>
          VIE
        </button>
      );
    } else if (lang === "eng") {
      return (
        <button
          className="langbtn --eng"
          onClick={() => {
            setLang("vie");
          }}>
          ENG
        </button>
      );
    }
  };
  console.log(text);
  const sendToChatGPT = async (message) => {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: model,
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );

    setResponseObj(
      JSON.parse(
        response.data.choices[0].message.content.replace(/\r?\n|\r/g, "")
      )
    );
  };
  console.log(responseObj);

  return (
    <>
      <div className="FeynmanTechnique">
        <div className="TextareaContainer">
          <HighlightWithinTextarea
            spellCheck={false}
            highlight={
              responseObj
                ? [
                  {
                      highlight: responseObj?.TuPhucTap,
                      className: "red --wordZIndex",
                    },
                    {
                      highlight: responseObj?.CauPhucTap,
                      className: "blue --sentenceZIndex",
                    },
                  ]
                : []
            }
            value={text}
            onChange={(value) => setText(value)}
          />
        </div>
        <div className="ReviewPanelContainer">
          {responseObj && (
            <>
              <div className="ReviewPanel">
                <div className="ReadingEaseContainer">
                  <h3>Độ phức tạp: {responseObj?.MucDoPhucTap}</h3>
                  <p>OK, hướng tới 10</p>
                  {switchLang()}
                </div>
                <div className="ComplexityContainer">
                <hr/>
                  <p className="ComplexityComponent blue">Có <span className="ComplexitySentenceCount">{responseObj?.CauPhucTap?.length}</span> câu phức tạp</p>
                  <p className="ComplexityComponent red">Có <span className="ComplexityWordCount">{responseObj?.TuPhucTap?.length}</span> từ phức tạp</p>
                </div>
                <div className="SuggestionsContainer">
                  {responseObj?.TuPhucTap.map((word, index) => {
                    return(<>
                    <hr/>
                      <div className="SuggestionsComponent" key={index}>
                        <h4>{word}</h4>
                        <p style={{margin: "0.5rem 0"}}>Từ thay thế: <span className="SuggestionWord">{responseObj?.TuThayThe[index]}</span></p>
                      </div>
                    
                    </>);
                  })}
                </div>
              </div>
              </>
          )}
              <button
                className="submitChatGPTButton"
                onClick={() => {
                  if (lang === "vie") {
                    let requestContent = `Tôi muốn bạn đánh giá mức độ dễ đọc của đoạn văn bản sau trên thang điểm 10, và chỉ ra những từ phức tạp rồi đưa cho tôi những từ đơn giản hơn có thể thay thế nó, và cuối cùng là chỉ ra những câu phức tạp và đưa cho tôi những câu đơn giản hơn có thể thay thế chúng. Văn bản phức tạp: [${text}]. Phản hồi của bạn nên được đưa dưới dạng JSON (Javascript) theo mẫu sau:
      '{
        "MucDoPhucTap": "[Mức độ]/10",
        "TuPhucTap": "[Từ phức tạp ( dạng Array )]",
        "TuThayThe": "[Từ thay thế ( dạng Array )]",
        "CauPhucTap": "[Câu phức tạp ( dạng Array )]",
        "CauThayThe": "[Câu thay thế ( dạng Array )]",
      }'
      `;
                    sendToChatGPT(requestContent);
                  } else if (lang === "eng") {
                  }
                }}>
                Kiểm tra
              </button>
            
        </div>
      </div>
    </>
  );
};

export default FeynmanTechnique;
