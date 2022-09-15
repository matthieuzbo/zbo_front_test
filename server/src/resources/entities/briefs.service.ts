import type { Brief } from "~~/types/briefs";
import briefs from "~~/data/briefs.json";

import { writeFileSync } from "fs";
import { userService } from "~/resources/entities/users.service";
import { EntityError } from "~~/types/exceptions";

const statuses = [
  "to_assign",
  "to_setup",
  "production",
  "ending",
  "report_to_send",
];

class BriefService {
  maxBrief = 0;
  briefsMap = new Map<number, Brief>(
    briefs.map((brief: Brief) => {
      return [brief.id, brief];
    })
  );

  init() {
    this.maxBrief = 0;
    for (const [id] of this.briefsMap) {
      if (id > this.maxBrief) {
        this.maxBrief = id;
      }
    }
  }

  checkBrief(brief: Brief): EntityError[] {
    const errors: EntityError[] = [];

    if (brief.name.length == 0 || brief.name.length > 255) {
      errors.push({
        field: "name",
        error: "invalid size (must be beetween >= 0 and < 255)",
      });
    }

    if (brief.budget < 0) {
      errors.push({ field: "budget", error: "must be >= 0" });
    }

    if (
      brief.amId !== null &&
      brief.amId > 0 &&
      !userService.findOne(brief.amId)
    ) {
      errors.push({ field: "amId", error: "cannot get it" });
    }

    if (
      brief.traderId !== null &&
      brief.traderId > 0 &&
      !userService.findOne(brief.traderId)
    ) {
      errors.push({ field: "traderId", error: "cannot get it" });
    }

    if (!statuses.includes(brief.status)) {
      errors.push({ field: "status", error: "invalid value" });
    }

    if (!this.validDate(brief.startDate)) {
      errors.push({ field: "startDate", error: "invalid value" });
    }

    if (!this.validDate(brief.endDate)) {
      errors.push({ field: "endDate", error: "invalid value" });
    }

    return errors;
  }

  findAll(): Brief[] {
    return Array.from(this.briefsMap.values());
  }

  findOne(id: number): Brief | undefined {
    return this.briefsMap.get(id);
  }

  create(brief: Brief): Brief | void {
    brief.id = 0;

    if (this.briefsMap.get(brief.id)) {
      return brief;
    }

    this.maxBrief++;
    brief.id = this.maxBrief;
    this.briefsMap.set(brief.id, brief);

    writeFileSync(
      "./data/briefs.json",
      JSON.stringify(this.findAll(), null, 2),
      {
        flag: "w",
      }
    );

    return brief;
  }

  update(brief: Brief): Brief {
    this.briefsMap.set(brief.id, brief);

    writeFileSync(
      "./data/briefs.json",
      JSON.stringify(this.findAll(), null, 2),
      {
        flag: "w",
      }
    );

    return brief;
  }

  validDate(date: undefined | string): boolean {
    return date != undefined && date != "" && !isNaN(new Date(date).getTime());
  }
}

export const briefService = new BriefService();

