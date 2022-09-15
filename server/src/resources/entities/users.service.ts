import type { User } from "../../../types/users";
import users from "../../../data/users.json";

import { writeFileSync } from "fs";
import { EntityError } from "~~/types/exceptions";

const userRoles = ["sale", "account-manager", "trader", "client", "contact"];

class UserService {
  maxUser = 0;
  usersMap = new Map<number, User>(
    users.map((user: User) => {
      return [user.id, user];
    })
  );

  init() {
    this.maxUser = 0;
    for (const [id] of this.usersMap) {
      if (id > this.maxUser) {
        this.maxUser = id;
      }
    }
  }

  checkUser(user: User): EntityError[] {
    const errors: EntityError[] = [];

    if (user.firstname.length == 0 || user.firstname.length > 55) {
      errors.push({
        field: "firstname",
        error: "invalid size (must be beetween >= 0 and < 55)",
      });
    }

    if (user.lastname.length == 0 || user.lastname.length > 55) {
      errors.push({
        field: "lastname",
        error: "invalid size (must be beetween >= 0 and < 55)",
      });
    }

    if (user.email.length == 0 || user.email.length > 55) {
      errors.push({
        field: "email",
        error: "invalid size (must be beetween >= 0 and < 55)",
      });
    }

    if (!userRoles.includes(user.role)) {
      errors.push({ field: "role", error: "invalid value" });
    }

    return errors;
  }

  findAll(): User[] {
    return Array.from(this.usersMap.values());
  }

  findOne(id: number): User | undefined {
    return this.usersMap.get(id);
  }

  create(user: User): User | void {
    user.id = 0;

    if (this.usersMap.get(user.id)) {
      return user;
    }

    this.maxUser++;
    user.id = this.maxUser;
    this.usersMap.set(user.id, user);

    writeFileSync(
      "./data/users.json",
      JSON.stringify(this.findAll(), null, 2),
      {
        flag: "w",
      }
    );

    return user;
  }

  update(user: User): User {
    this.usersMap.set(user.id, user);

    writeFileSync(
      "./data/users.json",
      JSON.stringify(this.findAll(), null, 2),
      {
        flag: "w",
      }
    );

    return user;
  }
}

export const userService = new UserService();
