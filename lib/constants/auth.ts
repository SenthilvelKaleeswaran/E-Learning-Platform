const SignInFields = [
  {
    id: "email",
    type: "email",
    name: "email",
    label: "Email Address",
    placeHolder: "Enter your Email Address",
    required: true,
  },
  {
    id: "password",
    type: "password",
    name: "password",
    label: "Password",
    placeHolder: "Enter your Password",
    required: true,
  },
];

const SignUpFields = [
  {
    id: "email",
    type: "email",
    name: "email",
    label: "Email Address",
    placeHolder: "Enter your Email Address",
    required: true,
  },
  {
    id: "password",
    type: "password",
    name: "password",
    label: "Password",
    placeHolder: "Enter your Password",
    required: true,
  },
  {
    id: "confirm-password",
    type: "password",
    name: "confirm-password",
    label: "Re-enter Password",
    placeHolder: "Re-enter your Password",
    required: true,
  },
];

export { SignInFields, SignUpFields };
