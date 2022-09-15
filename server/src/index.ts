import cors from "cors";
import express from "express";
import { config } from "~/config";
import { EntitiesController } from "~/resources/entities/entities.controller";
import { ExceptionsHandler } from "~/middlewares/exceptions.handler";
import { UnknownRoutesHandler } from "~/middlewares/unknownRoutes.handler";
import { userService } from "~/resources/entities/users.service";
import { briefService } from "~/resources/entities/briefs.service";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/entity", EntitiesController);
app.get("/", (req, res) => {
  res.json({ message: "Ok" });
});
app.all("*", UnknownRoutesHandler);
app.use(ExceptionsHandler);

// Start server
app.listen(config.API_PORT, () => {
  userService.init();
  briefService.init();
  console.log("Server running on port", config.API_PORT);
});
