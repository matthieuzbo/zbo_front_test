import { Router } from "express";
import { briefService } from "~/resources/entities/briefs.service";
import { generateError } from "../../utils/utils";
import {
  InvalidValueException,
  NotFoundException,
  RandomException,
} from "~/utils/exceptions";

function registerController(EntitiesController: Router) {
  EntitiesController.get("/briefs", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }

    res.status(200).json(briefService.findAll());
  });

  EntitiesController.get("/briefs/:id", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }

    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
      throw new InvalidValueException(req.path, req.method, undefined);
    }

    const brief = briefService.findOne(id);
    if (brief) {
      return res.status(200).json(brief);
    }

    throw new NotFoundException(req.path, req.method);
  });

  EntitiesController.post("/briefs", (req, res) => {
    if (generateError()) {
      throw new RandomException(req.path, req.method);
    }

    const errs = briefService.checkBrief(req.body);
    if (errs.length) {
      throw new InvalidValueException(req.path, req.method, errs);
    }

    res.status(201).json(briefService.create(req.body));
  });

  EntitiesController.put("/briefs/:id", (req, res) => {
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

    const errs = briefService.checkBrief(req.body);
    if (errs.length) {
      throw new InvalidValueException(req.path, req.method, errs);
    }

    res.status(200).json(briefService.update(req.body));
  });
}

export { registerController };
