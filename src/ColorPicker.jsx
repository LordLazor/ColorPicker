import { useState } from 'react';

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
  const [focusedIndex, setFocusedIndex] = useState(null);

  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
  ];

  const handleClick = (color) => {
    setSelectedColor(color);
  };

  const handleMouseEnter = (hex) => {
    setSelectedColor({ hex, name: null });
  };

  const handleMouseLeave = () => {
    setSelectedColor({ hex: null, name: null });
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleKeyDown = (event, index) => {

    if (event.key === 'ArrowRight') {

        setFocusedIndex((prevIndex) => (prevIndex + 1) % colors.length);
      
    } else if (event.key === 'ArrowLeft') {

        setFocusedIndex((prevIndex) => (prevIndex - 1 + colors.length) % colors.length);
    }

    else if (event.key === 'Enter') {

        setSelectedColor(colors[focusedIndex]);
    }
  };

  return (
    <div className="color-picker">
      <h1>Color Picker</h1>
      <div className="color-list">

        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-item ${focusedIndex === index ? 'focused' : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleClick(color)}
            onMouseEnter={() => handleMouseEnter(color.hex)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
          >
            {selectedColor.hex === color.hex && (
              <span className="color-code">{selectedColor.name || color.hex}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;