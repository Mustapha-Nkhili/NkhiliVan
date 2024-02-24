import { useState } from "react";
import vanImgPlaceholder from "../../assets/imgs/van-img-placeholder.png";

const AddVans = () => {
  const [imgTypeError, setImgTypeError] = useState(null);
  const [vanImg, setVanImg] = useState(null);

  const onImgSelected = (e) => {
    const file = e.target.files[0];
    if (file.type && !file.type.startsWith("image/")) {
      setImgTypeError(true);
      return;
    }

    setImgTypeError(null);
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setVanImg(e.target.result);
    });
    reader.addEventListener("error", (e) => {
      console.error("Error occurred while reading the file:", e.target.error);
    });

    reader.readAsDataURL(file);
  };

  const handleVanTypeCLicked = (e) => {
    e.target.querySelector('input[type="radio"]').checked = true;
  };

  return (
    <section className="add-vans container">
      <h1>Add new Van</h1>
      <label className="choose-van-img">
        <div className="img-container" style={{ padding: vanImg && "0px" }}>
          <img
            src={vanImg ? vanImg : vanImgPlaceholder}
            style={vanImg && { width: "100%", height: "100%" }}
            alt="this is the van img placeholder picture"
          />
        </div>
        <p>Click to upload image</p>
        <span>JPG, PNG, SVG (2MB max)</span>
        {imgTypeError && (
          <span className="img-type-error">
            Sorry, we couldn't process your file. It appears that the file you
            uploaded is not an image or its format is not supported.
          </span>
        )}
        <input
          type="file"
          name="van-img"
          id="vanImgInput"
          accept=".png, .jpg, .jpeg, .svg"
          onChange={onImgSelected}
        />
      </label>

      <input
        type="text"
        name="van-name"
        id="vanName"
        placeholder="Enter van name"
      />

      <input
        type="text"
        name="van-price"
        id="vanPrice"
        placeholder="Enter van price"
      />
      <textarea
        name="van-description"
        id="vanDescription"
        rows="4"
        placeholder="Enter the description"
      ></textarea>

      <h2>Choose item type</h2>
      <ul className="vans-type-list">
        <li onClick={handleVanTypeCLicked}>
          <label htmlFor="simple">simple</label>
          <input
            type="radio"
            name="van-type"
            id="simple"
            value={"simple"}
            checked
          />
        </li>
        <li onClick={handleVanTypeCLicked}>
          <label htmlFor="rugged">rugged</label>
          <input type="radio" name="van-type" id="rugged" value={"rugged"} />
        </li>
        <li onClick={handleVanTypeCLicked}>
          <label htmlFor="luxury">luxury</label>
          <input type="radio" name="van-type" id="luxury" value={"luxury"} />
        </li>
      </ul>

      <button className="add-van-btn">add van</button>
    </section>
  );
};

export default AddVans;
