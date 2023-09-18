import React from "react";
import "./Features.css";
import Feynman from "../../Assests/Feynman.svg";
import GroupStudy from "../../Assests/GroupStudy.jpg";
import StudyMethods from "../../Assests/StudyMethods.jpg";
import { ReactComponent as GreaterThan } from "../../Assests/greaterthan-circle-svgrepo-com.svg";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Features = () => {
  const CarouselChildArray = [
    {
      imgURL: Feynman,
      header: "Kỹ thuật Feynman",
      contents:
        "Richard Feynman là một nhà vật lý học đạt giải Nobel, và ông cũng là một nhà giáo vĩ đại. Kỹ thuật Feynman là một phương pháp học tập biến một kiến thức phức tạp trở nên thật dễ hiểu. Hãy để CoStudy giúp bạn tận dụng phương pháp này một cách thật hiệu quả! ",
    },
    {
      imgURL: GroupStudy,
      header: "Học tập hợp tác",
      contents:
        "Học nhóm và thuyết trình là hai phương pháp học tập vô cùng quen thuộc và hiệu quả. Tuy nhiên không phải ai cũng biết những bí mật làm nên một bài thuyết trình hay một phiên học nhóm thành công, hãy để CoStudy hỗ trợ bạn.",
    },
    {
      imgURL: StudyMethods,
      header: "Hệ thống phương pháp",
      contents:
        "Bằng cách kết hợp có hệ thống các phương pháp học đa dạng, CoStudy đã giúp học sinh tận dụng được sức mạnh của các phương pháp học hiệu quả nhất nhằm hiểu sâu và nhớ lâu bài học.",
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
                    <GreaterThan
                      width={50}
                      style={{ transform: "rotateZ(180deg)" }}
                    />
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
