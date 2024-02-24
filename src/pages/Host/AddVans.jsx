import { useState } from "react";
import vanImgPlaceholder from "../../assets/imgs/van-img-placeholder.png";

const AddVans = () => {
  const [newVan, setNewVan] = useState({
    img: null,
    name: "",
    price: 0,
    description: "",
    type: "simple",
  });
  const [imgTypeError, setImgTypeError] = useState(null);

  const onImgSelected = (e) => {
    const file = e.target.files[0];
    if (file.type && !file.type.startsWith("image/")) {
      setImgTypeError(true);
      return;
    }

    setImgTypeError(null);
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setNewVan((prev) => ({ ...prev, imageUrl: e.target.result }));
    });
    reader.addEventListener("error", (e) => {
      setImgTypeError(true);
      console.error("Error occurred while reading the file:", e.target.error);
    });

    reader.readAsDataURL(file);
  };

  const handleVanTypeCLicked = (e) => {
    const radioInput = e.target.querySelector('input[type="radio"]');
    if (radioInput) {
      radioInput.click();
    }
  };

  const handleNewVanChanges = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    if (type !== "file") {
      setNewVan((prev) => ({ ...prev, [name]: value }));
    } else {
      onImgSelected(e);
    }
  };
  console.log(newVan);

  return (
    <section className="add-vans container">
      <h1>Add new Van</h1>
      <label className="choose-van-img">
        <div
          className="img-container"
          style={{ padding: newVan.imageUrl && "0px" }}
        >
          <img
            src={newVan.imageUrl ? newVan.imageUrl : vanImgPlaceholder}
            style={newVan.imageUrl && { width: "100%", height: "100%" }}
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
          name="img"
          id="vanImgInput"
          accept=".png, .jpg, .jpeg, .svg"
          // onChange={onImgSelected}
          onChange={handleNewVanChanges}
        />
      </label>

      <input
        type="text"
        name="name"
        id="vanName"
        placeholder="Enter van name"
        onChange={handleNewVanChanges}
      />

      <input
        type="number"
        name="price"
        id="vanPrice"
        placeholder="Enter van price"
        onChange={handleNewVanChanges}
      />
      <textarea
        name="description"
        id="vanDescription"
        rows="4"
        placeholder="Enter the description"
        onChange={handleNewVanChanges}
      ></textarea>

      <h2>Choose item type</h2>
      <ul className="vans-type-list">
        <li onClick={handleVanTypeCLicked}>
          <label htmlFor="simple">simple</label>
          <input
            type="radio"
            name="type"
            id="simple"
            value={"simple"}
            checked={newVan.type === "simple"}
            onChange={handleNewVanChanges}
          />
        </li>
        <li onClick={handleVanTypeCLicked}>
          <label htmlFor="rugged">rugged</label>
          <input
            type="radio"
            name="type"
            id="rugged"
            value={"rugged"}
            checked={newVan.type === "rugged"}
            onChange={handleNewVanChanges}
          />
        </li>
        <li onClick={handleVanTypeCLicked}>
          <label htmlFor="luxury">luxury</label>
          <input
            type="radio"
            name="type"
            id="luxury"
            value={"luxury"}
            checked={newVan.type === "luxury"}
            onChange={handleNewVanChanges}
          />
        </li>
      </ul>

      <button className="add-van-btn">add van</button>
    </section>
  );
};

export default AddVans;
