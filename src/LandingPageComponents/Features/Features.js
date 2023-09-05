import React from "react";
import "./Features.css";
import AI from "../../Assests/AI.jpg";
import GroupStudy from "../../Assests/GroupStudy.jpg";
import StudyMethods from "../../Assests/StudyMethods.jpg";
import { ReactComponent as GreaterThan } from "../../Assests/greaterthan-circle-svgrepo-com.svg";
import { useRef, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Features = () => {
  const CarouselChildArray = [
    {
      imgURL: AI,
      header: "Trí tuệ nhân tạo",
      contents:
        "Cổ nhân có câu: 'Kẻ thức thời mới là trang tuấn kiệt', hãy tham gia vào nền tảng học tập đầy sôi động - Voila! để tận dụng những tính năng mạnh mẽ trong đó có ChatGPT - công nghệ AI làm thế giới chao đảo.",
    },
    {
      imgURL: GroupStudy,
      header: "Học tập hợp tác",
      contents:
        "Học nhóm và thuyết trình là hai phương pháp học tập vô cùng quen thuộc và hiệu quả. Tuy nhiên không phải ai cũng biết những bí mật làm nên một bài thuyết trình hay một phiên học nhóm thành công, hãy để Voila! hỗ trợ bạn.",
    },
    {
      imgURL: StudyMethods,
      header: "Phương pháp học tập hiệu quả",
      contents:
        "Bằng cách kết hợp có hệ thống các phương pháp tiếp cận đa dạng, Voila! đã giúp học sinh có thể tận dụng được sức mạnh cộng gộp của các phương pháp này nhằm hiểu sâu và nhớ lâu khái niệm đang học.",
    },
  ];

  return (
    <div className="FeaturesContainer" id="Features">
      <div className="Features">
        <h1>Tính Năng</h1>
        <div className="FeaturesCarouselContainer">
          <Carousel
            autoPlay
            useKeyboardArrows={true}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            renderArrowPrev={(clickHandler, hasNext) => {
              return (
                <button
                  onClick={clickHandler}
                  className="CarouselNavBtn CarouselNavLeftBtn">
                  <div>
                    <GreaterThan width={50}  style={{ transform: 'rotateZ(180deg)'}}/>
                  </div>
                </button>
              );
            }}
            renderArrowNext={(clickHandler, hasNext) => {
              return (
                <button
                  onClick={clickHandler}
                  className="CarouselNavBtn CarouselNavRightBtn">
                  <div>
                    <GreaterThan width={50} />
                  </div>
                </button>
              );
            }}>
            {CarouselChildArray.map((obj) => {
              return (
                <div key={`${obj.header}`} className="FeaturesCarouselChild">
                  <div className="FeaturesIMGContainer">
                    <img src={obj.imgURL} alt="" className="FeaturesIMG" />
                  </div>
                  <div className="FeaturesTextContainer">
                    <h3 className="FeaturesHeader"> {obj.header}</h3>

                    <p className="FeaturesContents"> {obj.contents}</p>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Features;
