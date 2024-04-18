import Product from "../Product.jsx";
import ProductMenu from "../ProductMenu.jsx";

function Home({products, setCart, cart}) {
    return <ProductMenu cart={cart} products={products} setCart={setCart}/>
}

export default Home