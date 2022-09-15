import { Router } from "express";
import { userService } from "~/resources/entities/users.service";
import { generateError } from "../../utils/utils";
import {
  InvalidValueException,
  NotFoundException,
  RandomException,
} from "~/utils/exceptions";

function registerController(EntitiesController: Router) {
  EntitiesController.get("/users", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }

    res.status(200).json(userService.findAll());
  });

  EntitiesController.get("/users/:id", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }

    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
      throw new InvalidValueException(req.path, req.method, undefined);
    }

    const user = userService.findOne(id);
    if (user) {
      return res.status(200).json(user);
    }

    throw new NotFoundException(req.path, req.method);
  });

  EntitiesController.post("/users", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }

    const errs = userService.checkUser(req.body);
    if (errs.length) {
      throw new InvalidValueException(req.path, req.method, errs);
    }

    res.status(201).json(userService.create(req.body));
  });

  EntitiesController.put("/users/:id", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }

    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
      throw new InvalidValueException(req.path, req.method, undefined);
    }

    if (req.body.id != id) {
      throw new InvalidValueException(req.path, req.method, [
        { field: "id", error: "invalid id" },
      ]);
    }

    const errs = userService.checkUser(req.body);
    if (errs.length) {
      throw new InvalidValueException(req.path, req.method, errs);
    }

    res.status(200).json(userService.update(req.body));
  });
}

export { registerController };
