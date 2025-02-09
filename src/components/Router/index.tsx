import { Route, Routes } from "react-router";
import MainPage from "@/pages/MainPage";
import App from "@/components/app/App";
import LoginPage from "@/pages/LoginPage";
import ChatPage from "@/pages/ChatPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />}></Route>
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="chat" element={<ChatPage />} />
    </Routes>
  );
}

export default Router;
