import React, { useState, useEffect } from "react";
import styles from "./banner.module.scss";

const Banner = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const bannerImages = [
    "https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://images.ctfassets.net/mmeshd7gafk1/6PclelFmjCaqhqp9Sa2RAi/4d67af4ca8f40407b06917311fc826fb/BCorp_HPDesktopUK_V3.png",
    "https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://images.ctfassets.net/mmeshd7gafk1/79rdnKQoRxpSz5XweedLXe/3c24511a6f66fc60348514c61f94be26/UK_BackUp_HP_Desktop_V2__1___1___1_.png",
    "https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://images.ctfassets.net/mmeshd7gafk1/23MbUqa99SRRv5KgajT3N8/2995b8032be0bf4ed5249d9098e5b25d/US_Refurbished_VS_Used_HP_Desktop_V3.jpeg",
    "https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://images.ctfassets.net/mmeshd7gafk1/6k3fQ3uWC5Y19yqH8sCGpU/6467a4e522f762c08850e3f7ea5ff6d7/Copy_of_ComparisonTool_HP_Desktop_V3-1__2___1_.png",
  ];

  const handleNext = () => {
    setCurrentItem((prevItem) =>
      prevItem === bannerImages.length - 1 ? 0 : prevItem + 1
    );
  };

  const handlePrev = () => {
    setCurrentItem((prevItem) =>
      prevItem === 0 ? bannerImages.length - 1 : prevItem - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.carouselContainer}>
        <button
          className={`${styles.arrowButton} ${styles.left}`}
          onClick={handlePrev}
        >
          &lt;
        </button>
        <div className={styles.carouselImage}>
          <img src={bannerImages[currentItem]} alt="img" />
        </div>
        <button
          className={`${styles.arrowButton} ${styles.right}`}
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Banner;
