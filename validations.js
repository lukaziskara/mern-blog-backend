import { body } from "express-validator";

export const registerValidation = [
  body("email", "bad format of email").isEmail(),
  body("password", "must be min 5 symbol").isLength({ min: 5 }),
  body("fullName", "write name").isLength({ min: 3 }),
  body("avatarUrl", "bad link for avatar").optional().isURL(),
];

export const loginValidation = [
  body("email", "bad format of email").isEmail(),
  body("password", "must be min 5 symbol").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "enter title of post").isLength({min:3}).isString(),
  body("text", "enter text of post").isLength({ min: 3 }).isString(),
  body("tags", "incorrect format of tags(enter array)").optional().isString(),
  body("imageUrl", "bad link for for image").optional().isString(),
];