import React, { useEffect, useState } from "react";
import "./AnimFooter.css";
import ReactSlider from "react-slider";
import Select from "react-select";

export default function AnimFooter({ model, canvas }) {
  const [currentAnimation, setCurrentAnimation] = useState(null);
  const [sliderData, setSliderData] = useState({
    min: 0,
    max: 10,
    current: 0,
  });
  const [animations, setAnimations] = useState({});
  const [value, setValue] = useState("Select Animation");

  useEffect(() => {
    if (!canvas) return;
  }, [canvas]);

  useEffect(() => {
    if (!currentAnimation) return;
    console.log(currentAnimation);
    const interval = setInterval(() => {
      tellTime();
    }, [60]);
    setSliderData({
      min: 0,
      max: currentAnimation.duration,
      current: 0,
    });
  }, [currentAnimation]);

  function tellTime() {
    if (!currentAnimation) return;
    if (!currentAnimation.isRunning()) return;

    const maxX = currentAnimation._clip.duration * 100;
    const current = currentAnimation.time * 100;
    setSliderData({
      min: 0,
      max: maxX,
      current: current,
    });
  }

  useEffect(() => {
    if (!model) return;

    const animationList = [];
    model.animations.map((animation) => {
      animationList.push({
        value: animation,
        label: animation.name,
      });
    });
    setAnimations(animationList);
    setValue("Select Animation");
  }, [model]);

  const handlePlayAnimationButton = () => {
    if (!currentAnimation) return;
    if (currentAnimation.paused || !currentAnimation.isRunning()) {
      currentAnimation.paused = false;
      currentAnimation.play();
    } else {
      currentAnimation.stop();
    }
  };

  const handleSelectAnimation = (event) => {
    setCurrentAnimation(canvas.mixer.clipAction(event.value));
    setValue(event.value);
  };

  function handleChangeSlider(event) {
    setSliderData({
      min: sliderData.min,
      max: sliderData.max,
      current: event,
    });
    currentAnimation.play();
    currentAnimation.paused = true;
    currentAnimation.time = event / 100;
  }

  const colourStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: "#111",
        borderColor: "var(--bg-main)",
        borderWidth: "2px"
      }
    },
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#111"
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor:"#111",
        color: '#FFF',
        fontSize: "0.8em",

        "&:hover": {
          borderColor: "red",
          color: "#df7126"
        }
      };
    },
    singleValue: (styles) => ({
      ...styles,
      color: "white"
    }),
  };

  return (
    <div className="footer">
      <div className="footer-left">
        <Select
          className="select"
          menuPlacement="top"
          options={animations}
          onChange={handleSelectAnimation}
          styles={colourStyles}
        />
        <button className="playButton" onClick={handlePlayAnimationButton}>
          Play
        </button>
      </div>
      <div className="footer-middle">
        <ReactSlider
          className="horizontal-slider"
          min={sliderData.min}
          max={sliderData.max}
          value={sliderData.current}
          onChange={handleChangeSlider}
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
        />
      </div>

      <div className="footer-right"></div>
    </div>
  );
}
