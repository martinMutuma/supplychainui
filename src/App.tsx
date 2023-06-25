import { Container } from "react-bootstrap";
import MainLayout from "./layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import appRoutes from "./routes";

function App() {
  var appComponentRoutes = appRoutes.filter((x) => x.component);
  return (
    <>
      <MainLayout>
        <Container>
          <Routes>
            {appComponentRoutes?.map((appComponentRoute, index) => {
              return (
                <Route
                  key={index}
                  path={appComponentRoute.path}
                  Component={appComponentRoute?.component}
                ></Route>
              );
            })}
          </Routes>
        </Container>
      </MainLayout>
    </>
  );
}

export default App;
