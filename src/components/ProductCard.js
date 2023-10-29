import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";

// This component is used to display the cart items

function ProductCard({ data, addToCart }) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  return (
    <div className="col mb-5">
      <div className="card h-100 product-card">
        <img className="product-image" src={data.thumbnail} alt="..." />
        <div className="card-header title-rating-div">
          <h3 className="product-name">{data.title}</h3>
          <p className="product-rating">⭐{data.rating}</p>
        </div>
        <div className="card-body product-card-body">
          <p className="product-description">{data.description}</p>
          <div className="price-category-div">
            <p className="product-price">
              <span>&#36; - </span>
              {data.price}
            </p>
            <p className="product-category">{data.category}</p>
          </div>
        </div>
        <div className="card-footer product-cart-footer bg-transparent">
          <button
            className="btn btn-primary btn-addCart"
            onClick={() => addToCart(data)}
          >
            Add to Cart
          </button>
          <div className="like-dislike-div">
            <Badge className="btn-like" badgeContent={like} color="success">
              <ThumbUpRoundedIcon
                color="action"
                onClick={() => {
                  setLike(like + 1);
                }}
              />
            </Badge>
            <Badge className="btn-dislike" badgeContent={dislike} color="error">
              <ThumbDownRoundedIcon
                color="action"
                onClick={() => {
                  setDislike(dislike + 1);
                }}
              />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
