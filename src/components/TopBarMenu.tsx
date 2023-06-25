import { ReactElement } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import appRoutes from "../routes";
import { LinkContainer } from "react-router-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { LogoutCurrentUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const TopBarMenu = (): ReactElement => {
  const loggedInUser = useAppSelector((state) => state.loggedInUser);
  const diapatchAction = useAppDispatch();
  const navigate = useNavigate();
  const topBarMenus = appRoutes.filter(
    (approute) => approute.showInTopMenu && !approute.publicRoute
  );

  const toppublicBarMenus = appRoutes.filter(
    (approute) => approute.showInTopMenu && approute.publicRoute
  );

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    diapatchAction(LogoutCurrentUser());
    navigate("/login");
  };
  return (
    <Navbar className="mb-2 border-bottom" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-dark text-decoration-none">
            Supply Chain
          </Navbar.Brand>
        </LinkContainer>
        {loggedInUser.isLoggedIn && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav "
              className="justify-content-center"
            >
              <Nav className="">
                {topBarMenus?.map((appRoute, index) => {
                  return (
                    <LinkContainer key={index} to={appRoute.path}>
                      <Nav.Link className="nav-link px-2 link-secondary">
                        {appRoute.title}
                      </Nav.Link>
                    </LinkContainer>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
          </>
        )}
        {!loggedInUser.isLoggedIn && (
          <>
            <Nav className="">
              {toppublicBarMenus?.map((appRoute, index) => {
                return (
                  <LinkContainer key={index} to={appRoute.path}>
                    <Nav.Link className="nav-link px-2 link-secondary">
                      {appRoute.title}
                    </Nav.Link>
                  </LinkContainer>
                );
              })}
            </Nav>
          </>
        )}
        {loggedInUser.isLoggedIn && (
          <>
            <Navbar.Text>{loggedInUser.username}:</Navbar.Text>
            <Nav className="ustify-content-end">
              <Nav.Link title="Logout" onClick={handleLogout}>
                {" "}
                Logout
              </Nav.Link>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default TopBarMenu;
