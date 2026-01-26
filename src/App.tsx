import { RouterProvider } from "react-router";
import router from "./router/router.tsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }, []);

    return <RouterProvider router={router} />;
}

export default App;
