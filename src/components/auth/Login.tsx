import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginUserDataType } from "../../apptypes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LoginCurrentUserTK } from "../../features/auth/authThunk";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const loggedInUser = useAppSelector((state) => state.loggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginUserDataType>();

  const diapatch = useAppDispatch();
  const navigate = useNavigate();

  const onLoginFormSubmit: SubmitHandler<LoginUserDataType> = (data) => {
    diapatch(LoginCurrentUserTK(data));
  };

  if (loggedInUser.isLoggedIn && loggedInUser.access) {
    navigate("/home");
  }

  return (
    <>
      <Form
        className="position-absolute top-50 start-50 translate-middle"
        onSubmit={handleSubmit(onLoginFormSubmit)}
      >
        <Card className=" " style={{ width: "22rem" }}>
          <Card.Body>
            <Card.Title as="h5" className="mb-3 text-center">
              Login
            </Card.Title>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                isValid={
                  errors.username && touchedFields.username ? false : true
                }
                type="text"
                placeholder="Enter username"
                value="martin"
                {...register("username", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                isValid={
                  errors.password && touchedFields.password ? false : true
                }
                type="password"
                placeholder="Password"
                value="zx1234"
                {...register("password", { required: true })}
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button variant="success" className="float-end" type="submit">
              Login
            </Button>
          </Card.Footer>
        </Card>
      </Form>
    </>
  );
};

export default Login;
