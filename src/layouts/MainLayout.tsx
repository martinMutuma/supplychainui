import { Container } from "react-bootstrap";
import { ChildrenType } from "../apptypes";
import Footer from "../components/Footer";
import TopBarMenu from "../components/TopBarMenu";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IsUserLoggeIn } from "../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MainLayout = ({ children }: ChildrenType) => {
  const loggedInUser = useAppSelector((state) => state.loggedInUser);
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedInUser.isLoggedIn) {
      if (currentPath != "/login") {
        navigate("/login");
      }
    }
  }, []);

  const diapatchAction = useAppDispatch();
  useEffect(() => {
    diapatchAction(IsUserLoggeIn());
  }, []);

  return (
    <>
      <TopBarMenu />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;
