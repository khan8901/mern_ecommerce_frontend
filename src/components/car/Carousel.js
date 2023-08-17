import React, { useState } from "react";
import "./carousel.scss";
import { useEffect } from "react";

const Carousel = () => {
  const [currentItem, setCurrentItem] = useState(0);

  let data = [
    {
      _id: 1,
      title: "1 Airpods Wireless Bluetooth Headphone.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5_ZU2n-vbqrdNVN-IMSdEQTSiobtpmW6owrkDRraZytESTulFw-2yaC5t3rzu2pTchs&usqp=CAU",
      price: "14,999",
    },
    {
      _id: 2,
      title: "2 Airpods Wireless Bluetooth Headphone.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5_ZU2n-vbqrdNVN-IMSdEQTSiobtpmW6owrkDRraZytESTulFw-2yaC5t3rzu2pTchs&usqp=CAU",
      price: "15,999",
    },
    {
      _id: 3,
      title: "3 Airpods Wireless Bluetooth Headphone.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5_ZU2n-vbqrdNVN-IMSdEQTSiobtpmW6owrkDRraZytESTulFw-2yaC5t3rzu2pTchs&usqp=CAU",
      price: "15,999",
    },
    {
      _id: 4,
      title: "4 Airpods Wireless Bluetooth Headphone.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5_ZU2n-vbqrdNVN-IMSdEQTSiobtpmW6owrkDRraZytESTulFw-2yaC5t3rzu2pTchs&usqp=CAU",
      price: "15,999",
    },
    {
      _id: 5,
      title: "5 Airpods Wireless Bluetooth Headphone.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5_ZU2n-vbqrdNVN-IMSdEQTSiobtpmW6owrkDRraZytESTulFw-2yaC5t3rzu2pTchs&usqp=CAU",
      price: "15,999",
    },
    {
      _id: 6,
      title: "6 Airpods Wireless Bluetooth Headphone.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5_ZU2n-vbqrdNVN-IMSdEQTSiobtpmW6owrkDRraZytESTulFw-2yaC5t3rzu2pTchs&usqp=CAU",
      price: "15,999",
    },
  ];

  const handleNext = () => {
    setCurrentItem((prevItem) =>
      prevItem === data.length - 1 ? 0 : prevItem + 1
    );
  };
  useEffect(() => {
    setInterval(() => {
      handleNext();
    }, 5000);
  }, []);

  const handlePrev = () => {
    setCurrentItem((prevItem) =>
      prevItem === 0 ? data.length - 1 : prevItem - 1
    );
  };

  return (
    <div className="container">
      <div className="carousel-container">
        <button className="arrow-button left" onClick={handlePrev}>
          &lt;
        </button>
        <div className="carousel-image">
          <img src={data[currentItem].image} alt={data[currentItem].title} />
          <div className="carousel-caption">
            <h2>{data[currentItem].title}</h2>
            <p>{data[currentItem].price}</p>
          </div>
        </div>
        <button className="arrow-button right" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
