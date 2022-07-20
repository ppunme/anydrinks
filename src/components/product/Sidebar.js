import React from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import "./Sidebar.css";

const Sidebar = ({
  productList,
  handleCheckbox,
  handleCheckType,
  handleSlider,
  lowerBound,
  upperBound,
  value,
}) => {
  // Get brands name for filter
  const brandArr = [...new Set(productList.map((data) => data.brand))];
  const typeArr = [...new Set(productList.map((data) => data.type))];

  return (
    <div className="sidebar d-flex row">
      <div className="filtered-checkbox col-12 col-sm-6 col-md-12 mb-2">
        <div className="filtered-title text-uppercase mb-3">Brand</div>
        <div className="filtered-list-brand ps-2">
          {brandArr.map((brand, index) => (
            <div className="form-check check-item" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                id={brand.replace(" ", "-")}
                value={brand}
                onClick={handleCheckbox}
              />
              <label
                className="form-check-label"
                htmlFor={brand.replace(" ", "-")}
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="filtered-checkbox col-12 col-sm-6 col-md-12 mb-2">
        <div className="filtered-title text-uppercase mb-3">Type</div>
        <div className="filtered-list-type ps-2">
          {typeArr.map((type, index) => (
            <div className="form-check check-item" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                id={type.replace(" ", "-")}
                value={type}
                onClick={handleCheckType}
              />
              <label
                className="form-check-label"
                htmlFor={type.replace(" ", "-")}
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 col-sm-5 col-md-12 p-3">
        <div className="filtered-title mb-2">Alcohol</div>
        <div>
          <Range
            allowCross={false}
            value={value}
            max={10}
            onChange={handleSlider}
          />
          <div className="row">
            <div className="col">{lowerBound} %</div>
            <div className="col text-center">-</div>
            <div className="col text-end">{upperBound} %</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
