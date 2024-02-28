import { useContext, useState } from "react";
import vanImgPlaceholder from "../../assets/imgs/van-img-placeholder.png";
import { storeNewVanInDB } from "../../api";
import { AuthContext } from "../../components/AuthProvider";

const AddVans = () => {
  const { user } = useContext(AuthContext);
  const [newVan, setNewVan] = useState({
    imageUrl: null,
    name: "",
    price: 0,
    description: "",
    type: "simple",
  });
  const [errors, setErrors] = useState({});

  const onImgSelected = (e) => {
    const file = e.target.files[0];
    if (file.type && !file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, imgType: true }));
      return;
    }

    setErrors((prev) => ({ ...prev, imgType: null }));
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setNewVan((prev) => ({ ...prev, imageUrl: e.target.result }));
    });

    reader.addEventListener("error", (e) => {
      setErrors((prev) => ({
        ...prev,
        img: "Error occurred while reading the file",
      }));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newVan.name === "") {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
    }

    if (newVan.price <= 0) {
      setErrors((prev) => ({ ...prev, price: "Price is required" }));
    }
    
    if (newVan.description === "") {
      setErrors((prev) => ({
        ...prev,
        description: "Description is required",
      }));
    }

    if (Object.keys(errors).length === 0) {
      storeNewVanInDB(user.userId, newVan);
    }
  };

  return (
    <section className="add-vans container">
      <h1>Add new Van</h1>
      <form action="post" onSubmit={handleSubmit}>
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
          {errors.imgType && (
            <span className="add-van-errors">
              Sorry, we couldn't process your file. It appears that the file you
              uploaded is not an image or its format is not supported.
            </span>
          )}
          <input
            type="file"
            name="img"
            id="vanImgInput"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={handleNewVanChanges}
          />
          {errors.img && <span className="add-van-errors">{errors.img}</span>}
        </label>

        <div>
          <input
            type="text"
            name="name"
            id="vanName"
            placeholder="Enter van name"
            onChange={handleNewVanChanges}
          />
          {errors.name && <span className="add-van-errors">{errors.name}</span>}
        </div>

        <div>
          <input
            type="number"
            name="price"
            id="vanPrice"
            placeholder="Enter van price"
            onChange={handleNewVanChanges}
          />
          {errors.price && (
            <span className="add-van-errors">{errors.price}</span>
          )}
        </div>

        <div>
          <textarea
            name="description"
            id="vanDescription"
            rows="4"
            placeholder="Enter the description"
            onChange={handleNewVanChanges}
          ></textarea>
          {errors.description && (
            <span className="add-van-errors">{errors.description}</span>
          )}
        </div>
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
        <button className="add-van-btn" type="submit">
          add van
        </button>
      </form>
    </section>
  );
};

export default AddVans;
