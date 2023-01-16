import React, { useState } from "react";
import "./Carousel.css"; 
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
// Reference documentation: https://reactstrap.github.io/?path=/docs/components-carousel--carousel

const MyCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const items = [
    {
      src: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
      altText: "Card 1",
      caption: "Content for card 1",
      buttonText: "Button 1",
      buttonLink: "https://www.example1.com",
      englishTitle: "Demon Slayer",
      japaneseTitle: "Kimtesu no Yaiba",
      synopsis:
        "Ever since the death of his father, the burden of supporting the family has fallen upon Tanjirou Kamado's shoulders. Though living impoverished on a remote mountain, the Kamado family are able to enjoy a relatively peaceful and happy life. One day, Tanjirou decides to go down to the local village to make a little money selling charcoal. On his way back, night falls, forcing Tanjirou to take shelter in the house of a strange man, who warns him of the existence of flesh-eating demons that lurk in the woods at night.",
    },
    {
      src: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
      altText: "Card 1",
      caption: "Content for card 1",
      buttonText: "Button 1",
      buttonLink: "https://www.example1.com",
      englishTitle: "Full Metal Alchemist: Brotherhood",
      japaneseTitle: "Hagane no Renkinjutsushi: Fullmetal Alchemist",
      synopsis:
        "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse's body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse's soul in the physical realm by binding it to a hulking suit of armor. The brothers are rescued by their neighbor Pinako Rockbell and her granddaughter Winry. Known as a bio-mechanical engineering prodigy, Winry creates prosthetic limbs for Edward by utilizing 'automail,' a tough, versatile metal used in robots and combat armor. After years of training, the Elric brothers set off on a quest to restore their bodies by locating the Philosopher's Stone—a powerful gem that allows an alchemist to defy the traditional laws of Equivalent Exchange.  As Edward becomes an infamous alchemist and gains the nickname 'Fullmetal,' the boys' journey embroils them in a growing conspiracy that threatens the fate of the world.",
    },
    {
      src: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
      altText: "Card 1",
      caption: "Content for card 1",
      buttonText: "Button 1",
      buttonLink: "https://www.example1.com",
      englishTitle: "Hunter x Hunter",
      japaneseTitle: "HUNTER×HUNTER",
      synopsis:
        "Hunters devote themselves to accomplishing hazardous tasks, all from traversing the world's uncharted territories to locating rare items and monsters. Before becoming a Hunter, one must pass the Hunter Examination—a high-risk selection process in which most applicants end up handicapped or worse, deceased. Ambitious participants who challenge the notorious exam carry their own reason. What drives 12-year-old Gon Freecss is finding Ging, his father and a Hunter himself. Believing that he will meet his father by becoming a Hunter, Gon takes the first step to walk the same path. During the Hunter Examination, Gon befriends the medical student Leorio Paladiknight, the vindictive Kurapika, and ex-assassin Killua Zoldyck. While their motives vastly differ from each other, they band together for a common goal and begin to venture into a perilous world.",
    },
  ];

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className="container px-4 py-6">
          <div className="flex flex-wrap justify-center">
            <div className="row featurette">
              <div className="col-lg-6 col-md-6 col-sm-1 order-2">
                <h2 className="featurette-heading fw-bold 1h-1">
                  {item.englishTitle}</h2>
                  <h2 className="text-muted">{item.japaneseTitle}</h2>
                <p className ="lead" align="left">
                  {item.synopsis}
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-1 order-1">
                <img src={item.src} alt={item.altText} height="680px" width="450px" />
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-caption d-none d-md-block">
          <p>{item.caption}</p>
          <a href={item.buttonLink} className="btn btn-primary">
            {item.buttonText}
          </a>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        className="carousel-indicators"
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default MyCarousel;
