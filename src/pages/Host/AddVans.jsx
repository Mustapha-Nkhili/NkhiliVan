import { useContext, useRef, useState } from "react";
import vanImgPlaceholder from "../../assets/imgs/van-img-placeholder.png";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { nanoid } from "nanoid";
import { AuthContext } from "../../components/AuthProvider";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVans = () => {
  const toastId = useRef(null);
  const { user } = useContext(AuthContext);
  const [newVan, setNewVan] = useState({
    imageUrl: null,
    name: "",
    price: null,
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

  const notify = (toastId, message, type) => {
    const options = {
      render: message,
      type: type,
      isLoading: false,
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    };

    toast.update(toastId, options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (newVan.name === "") {
      errors.name = "Name is required";
    }

    if (newVan.price <= 0) {
      errors.price = "Price is required";
    }

    if (newVan.description === "") {
      errors.description = "Description is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        toastId.current = toast.loading("Please wait...");

        const result = await setDoc(doc(db, "vans", nanoid()), {
          name: newVan.name,
          description: newVan.description,
          hostId: user.userId,
          price: newVan.price,
          imageUrl: newVan.imageUrl,
          type: newVan.type,
        });

        notify(toastId.current, "New van successfully added", "success");

        setNewVan({
          imageUrl: null,
          name: "",
          price: null,
          description: "",
          type: "simple",
        });

        return result;
      } catch (error) {
        notify(
          toastId.current,
          "Image size limit exceeded! Max: 1MB. Try compressing or selecting a smaller file",
          "error"
        );
        setNewVan(prev => ({...prev, imageUrl: null}))
      }
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
          <span>JPG, PNG, SVG (1MB max)</span>
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
            value={newVan.name}
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
            value={newVan.price}
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
            value={newVan.description}
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
      <ToastContainer></ToastContainer>
    </section>
  );
};

export default AddVans;
