import React, { useReducer } from "react";
import {
  ADD_ITEM,
  REMOVE_ITEM,
  DELETE_ITEM,
  RESET_CART,
  cartReducer,
} from "./cartReducer";

const CartContext = React.createContext();

export function CartProvider({ children }) {
  const products = [
    {
      id: 1,
      brand: "Cerveza Huerca",
      title: "La Bonita",
      desc: "A delicious American IPA beer with a deep copper color, moderate bitterness and a lot of hops in its aroma, a very fresh flavor and unmatched for its ingredients of the highest quality.",
      alcohol: 6,
      price: 49.0,
      ibu: 50,
      type: "IPA",
      img: "https://images.unsplash.com/photo-1613169251614-4ed9d5d478c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 2,
      brand: "Grupo Modelo",
      title: "Modelo Especial",
      desc: "Modelo Especial is made with filtered water, malted barley, hops, corn and yeast. Modelo Especial is a rich, full-flavored pilsner beer brewed with premium two-row barley malt that gives it a slightly sweet, well-balanced taste with a light hops character and crisp finish.",
      alcohol: 4.5,
      price: 48.95,
      ibu: 18,
      type: "Lager",
      img: "https://images.unsplash.com/photo-1634247028962-74ee8b43a834?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 3,
      brand: "Heineken (Italia)",
      title: "Birra Messina Cristalli di Sale",
      desc: "Sed do tempor incididunt ut labore et dolore magna aliqua",
      alcohol: 8,
      price: 15.5,
      ibu: 20,
      type: "Lager",
      img: "https://images.unsplash.com/photo-1611591696571-63a14d0f1060?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2488&q=80",
    },
    {
      id: 4,
      brand: "Corona",
      title: "Corona Extra",
      desc: "Corona Extra Mexican Beer is a crisp, clean and well balanced cerveza with fruity-honey aromas and a touch of malt, making it a great tailgating beer, beach drink or barbecue refreshment.",
      alcohol: 4,
      price: 22.5,
      ibu: 18,
      type: "Lager",
      img: "https://images.unsplash.com/photo-1613904985222-0d534430bdbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },

    {
      id: 5,
      brand: "Jabalina Brewing Company",
      title: "American IPA",
      desc: "Yellow beer, dry, medium bitterness and intensely hoppy. The malts play a supporting role and the clean fermentation profile gives them great drinkability, allowing the aromas and flavors of citrus and resinous and stone fruit to stand out, provided by the bravo, centennial, columbus, simcoe and citra hops. The world will always remember the brave and hop lovers",
      alcohol: 6.4,
      price: 18.95,
      ibu: 64,
      type: "IPA",
      img: "https://images.unsplash.com/photo-1595545542741-a3d69c80cecf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=770&q=80",
    },
    {
      id: 6,
      brand: "Jabalina Brewing Company",
      title: "Sour Guayaba Maracuyá & Lima",
      desc: "Light, refreshing beer with a noticeable acidity achieved by the addition of a lactic culture. In flavor and aroma, it explodes in tropical fruits due to the generous addition of passion fruit, guava and lime in ripening. GOLD medal in the Fruit Ame Sour category in the Argentina Cup of Craft Beers 2020. Best of Show 3 cities cup and Gold medal 3 cities cup.",
      alcohol: 3.2,
      price: 22.5,
      ibu: "N/A",
      type: "Sour",
      img: "https://images.unsplash.com/photo-1595545524312-c5d33e7bdd98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=685&q=80",
    },

    {
      id: 7,
      brand: "Jabalina Brewing Company",
      title: "Citrus Hazy IPA",
      desc: "Yellow beer with the typical cloudiness of the style. In the mouth it has a low bitterness and a silkiness achieved by the use of oats together with a medium dry finish that invites you to take one more. In flavor and aroma it explodes in citrus, tropical and stone fruits achieved by the addition of a generous amount of simcoe, citra and mosaic hops together with natural grapefruit juice. An ideal beer for flavor fundamentalists.",
      alcohol: 6,
      price: 22.5,
      ibu: 50,
      type: "IPA",
      img: "https://images.unsplash.com/photo-1595545524301-f354b7294c3b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=770&q=80",
    },
    {
      id: 8,
      brand: "Commonwealth Brewery",
      title: "Kalik",
      desc: "Sed do eiusmodConsectetur adipiscing elit.",
      alcohol: 4.2,
      price: 22.5,
      ibu: "N/A",
      type: "Lager",
      img: "https://images.unsplash.com/photo-1579883463827-40dff935fea1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=606&q=80",
    },

    {
      id: 9,
      brand: "York Brewery",
      title: "Yorkshire Terrier Ale",
      desc: "Sed do eiusmodConsectetur adipiscing elit.",
      alcohol: 4.2,
      price: 30.25,
      type: "Ale",
      img: "https://images.unsplash.com/photo-1561836505-f28d7f69bc1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=728&q=80",
    },
    {
      id: 10,
      brand: "Olipop",
      title: "Strawberry Vanilla",
      desc: "eiusmodConsectetur adipiscing elit.",
      alcohol: 0,
      price: 12.0,
      type: "Tonic",
      img: "https://images.unsplash.com/photo-1620631442557-ba85b70585de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1086&q=80",
    },
    {
      id: 11,
      brand: "Cerveza Huerca",
      title: "Huerca Canija",
      desc: "PREMIUM IPA-type beer, with bright copper tones with its enjoyable bitterness and incredible fresh aroma, combine a special flavor experience with a lot of character.",
      alcohol: 6.5,
      price: 22.5,
      ibu: 70,
      type: "IPA",
      img: "https://images.unsplash.com/photo-1634604536807-3dcaf9a6b688?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=930&q=80",
    },
    {
      id: 12,
      brand: "Camden Town Brewery",
      title: "Hells Lager",
      desc: "Sed do eiusmodConsectetur adipiscing elit.",
      alcohol: 9,
      price: 12.5,
      type: "Lager",
      img: "https://images.unsplash.com/photo-1590617027523-fe81f175e76c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 13,
      brand: "Salladsmagasinet",
      title: "Kusken",
      desc: "Salladsmagasinet",
      alcohol: 7,
      price: 20.0,
      type: "Ale",
      img: "https://images.unsplash.com/photo-1580683553616-7e65c167eebb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      id: 14,
      brand: "Anheuser-Busch",
      title: "Budweiser",
      desc: "Sed do eiusmodConsectetur adipiscing elit.",
      alcohol: 5.5,
      price: 22.5,
      ibu: 12,
      type: "Lager",
      img: "https://images.unsplash.com/photo-1587669284207-e8ee0fc74144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    },
    {
      id: 15,
      brand: "Anheuser-Busch",
      title: "Bud Light",
      desc: "Sed do eiusmodConsectetur adipiscing elit.",
      alcohol: 6,
      price: 22.5,
      ibu: 6,
      type: "Lager",
      img: "https://images.unsplash.com/photo-1605306792171-9394b91eb0d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=814&q=80",
    },
    {
      id: 16,
      brand: "Birra Peroni",
      title: "Nastro Azzurro",
      desc: '"Peroni" Original and "Peroni Nastro Azzuro" are two different beers. Ensure you are checking into the correct one. Peroni Nastro Azzurro is 5.1% in alcohol by volume, subject to slight variations in different parts of the world. The beer was crafted with typical Italian care, and designed with the Mediterranean palate in mind. Roberto is the third generation from the Cavalli family to be master brewers for Birra Peroni, ensuring the high quality and standards of the beer. Italian passion, attention to detail and craftsmanship are the ingredients that now, and forever, will ensure the superior and authentic Italian taste of Peroni Nastro Azzurro.',
      alcohol: 5.1,
      price: 5.0,
      ibu: 24,
      type: "Lager",
      img: "https://images.unsplash.com/photo-1610478920392-95888b4a0bb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 17,
      brand: "Aegis Brewing",
      title: "Aegis",
      desc: "Sed do eiusmodConsectetur adipiscing elit.",
      alcohol: 4,
      price: 5.0,
      type: "Lager",
      img: "https://images.unsplash.com/photo-1614766443743-821231098e64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
    },
  ];

  const initialState = {
    cart: [],
    totalAmount: 0,
  };

  const [cartState, dispatch] = useReducer(cartReducer, initialState); // (reducer, initialState)

  const addItemToCart = (product) => {
    dispatch({ type: ADD_ITEM, product: product });
  };

  const removeItemFromCart = (itemId) => {
    dispatch({ type: REMOVE_ITEM, itemId: itemId });
  };

  const deleteItemFromCart = (itemId) => {
    dispatch({ type: DELETE_ITEM, itemId: itemId });
  };

  const resetCart = () => {
    dispatch({ type: RESET_CART });
  };

  const value = {
    products,
    cart: cartState.cart,
    totalAmount: cartState.totalAmount,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    resetCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
