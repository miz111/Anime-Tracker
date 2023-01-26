import React, { useState } from "react";

const Card = ({ image, title, text }) => (
  <div className="card">
    <img src={image} alt={title} />
    <h2>{title}</h2>
    <p>{text}</p>
  </div>
);

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const cards = [
    {
      image: "image1.jpg",
      title: "Card 1",
      text: "This is the first card in the carousel.",
    },
    {
      image: "image2.jpg",
      title: "Card 2",
      text: "This is the second card in the carousel.",
    },
    {
      image: "image3.jpg",
      title: "Card 3",
      text: "This is the third card in the carousel.",
    },
  ];

  const handlePrevious = () => {
    setIndex(index === 0 ? cards.length - 1 : index - 1);
  };

  const handleNext = () => {
    setIndex(index === cards.length - 1 ? 0 : index + 1);
  };

  return (
    <div className="carousel">
      <button onClick={handlePrevious}>Previous</button>
      <Card {...cards[index]} />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Carousel;
