import { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import Product from "./Product";
import Pagination from "./Pagination";
import CartContext from "../../components/store/CartContext";
import "./Products.css";

const Products = () => {
  const ITEM_PER_PAGE = 12;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showOffcanvas, setShowOffcanvas] = useState();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [checked, setChecked] = useState([]);
  const [checkedType, setCheckedType] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(10);
  const [value, setValue] = useState([0, 10]);

  const cartContext = useContext(CartContext);

  useEffect(() => {
    const productArr = cartContext.products;
    setProducts(productArr);

    var ftProduct = cartContext.products;
    //ftProduct = productArr;

    if (search) {
      ftProduct = ftProduct.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (checked.length > 0) {
      ftProduct = ftProduct.filter((product) =>
        checked.some((brand) => [product.brand].flat().includes(brand))
      );
    }

    if (checkedType.length > 0) {
      console.log(checkedType);
      ftProduct = ftProduct.filter((product) =>
        checkedType.some((type) => [product.type].flat().includes(type))
      );
      console.log(ftProduct);
    }

    if (lowerBound > 0 || upperBound < 10) {
      ftProduct = ftProduct.filter(
        (product) => product.alcohol >= value[0] && product.alcohol <= value[1]
      );
    }

    setFilteredProducts(ftProduct);
    setTotalPages(Math.ceil(ftProduct.length / ITEM_PER_PAGE));
    setLoading(false);
  }, [
    cartContext.products,
    search,
    checked,
    checkedType,
    lowerBound,
    upperBound,
    value,
  ]);

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      console.log(e.target.value);
      setChecked([...checked, e.target.value]);
    } else {
      setChecked(checked.filter((id) => id !== e.target.value));
    }
  };

  const handleCheckType = (e) => {
    if (e.target.checked) {
      console.log(e.target.value);
      setCheckedType([...checkedType, e.target.value]);
    } else {
      console.log("else");
      setCheckedType(checkedType.filter((id) => id !== e.target.value));
    }
  };

  const onSliderChange = (value) => {
    setValue(value);
    setLowerBound(value[0]);
    setUpperBound(value[1]);
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;
    setSort(sortBy);
  };

  if (sort === "sortByPriceLH") {
    products.sort((first, second) => (first.price > second.price ? 1 : -1));
  } else if (sort === "sortByPriceHL") {
    products.sort((first, second) => (first.price < second.price ? 1 : -1));
  } else if (sort === "alphabet") {
    products.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Pagination
  const handlePage = (num) => {
    setCurrentPage(num);
  };

  // Check window size to show/hide filter toggle button
  const windowResizeHandler = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", windowResizeHandler, true);
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      setShowOffcanvas(true);
    } else {
      setShowOffcanvas(false);
    }
  }, [windowWidth]);

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="d-none d-md-block col-md-3"></div>
        <div className="col-12 col-sm-8 col-md-6 mb-3">
          <div className="search-bar input-group search">
            <input
              type="text"
              className="form-control"
              placeholder="Search.."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
        {showOffcanvas && (
          <>
            <div className="col-6 col-sm-1 d-block d-md-none mb-3 filter">
              <div
                className="filter-button d-flex justify-content-center align-items-center h-100"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasFilter"
                aria-controls="offcanvasTop"
              >
                <span className="d-block d-sm-none me-2">Filter</span>
                <i className="bi bi-sliders d-flex align-items-center"></i>
              </div>
            </div>
            <div
              className="offcanvas offcanvas-top d-block d-md-none"
              tabIndex="-1"
              id="offcanvasFilter"
              aria-labelledby="offcanvasTopLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close text-reset ms-auto"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body pt-0">
                <Sidebar
                  productList={products}
                  handleCheckbox={handleCheckbox}
                  handleCheckType={handleCheckType}
                  handleSlider={onSliderChange}
                  lowerBound={lowerBound}
                  upperBound={upperBound}
                  value={value}
                />
              </div>
            </div>
          </>
        )}

        <div className="col-6 col-sm-3 mb-3">
          <select
            className="form-select float-end sort-dropdown"
            aria-label="Default select example"
            onChange={handleSort}
          >
            <option value="alphabet" defaultValue>
              A to Z
            </option>
            <option value="sortByPriceLH">Price: Low to High</option>
            <option value="sortByPriceHL">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="row d-none d-md-block"></div>
      <div className="row">
        <div className="col-md-3 col-xl-2 d-none d-md-block ps-3">
          <Sidebar
            productList={products}
            handleCheckbox={handleCheckbox}
            handleCheckType={handleCheckType}
            handleSlider={onSliderChange}
            lowerBound={lowerBound}
            upperBound={upperBound}
            value={value}
          />
        </div>
        <div className="col-12 col-md-9 col-xl-10">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status"></div>
            </div>
          ) : (
            <>
              <div className="d-flex mb-3">
                <div className="me-auto align-self-center">
                  {filteredProducts.length} items found
                </div>
                {filteredProducts.length > 0 && (
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePage={handlePage}
                  />
                )}
              </div>

              <Product
                productList={filteredProducts}
                currentPage={currentPage}
                itemPerPage={ITEM_PER_PAGE}
              />
              {filteredProducts.length > 0 && (
                <div className="d-flex justify-content-end">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePage={handlePage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
