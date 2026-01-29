import { data } from "@/data";

describe("data object", () => {
  describe("1. Top-level structure", () => {
    it("should be correctly exported", () => {
      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
      expect(data).not.toBeNull();
    });

    it("should contain expected top-level keys", () => {
      expect(data).toHaveProperty("introduction");
      expect(data).toHaveProperty("projects");
      expect(data).toHaveProperty("experience");
      expect(data).toHaveProperty("skills");
      expect(data).toHaveProperty("contact");
      expect(data).toHaveProperty("funFacts");
    });

    it("should have all required top-level keys and no extra keys", () => {
      const expectedKeys = [
        "introduction",
        "projects",
        "experience",
        "skills",
        "contact",
        "funFacts",
      ];
      const actualKeys = Object.keys(data);

      expectedKeys.forEach((key) => {
        expect(actualKeys).toContain(key);
      });

      expect(actualKeys.length).toBe(expectedKeys.length);
    });

    it("should have a valid introduction string", () => {
      expect(data.introduction).toBeDefined();
      expect(typeof data.introduction).toBe("string");
      expect(data.introduction.trim().length).toBeGreaterThan(0);
    });
  });

  describe("2. Projects array structure", () => {
    it("should have projects as an array", () => {
      expect(Array.isArray(data.projects)).toBe(true);
    });

    it("should have at least one project", () => {
      expect(data.projects.length).toBeGreaterThan(0);
    });

    it("should have expected structure for each project", () => {
      data.projects.forEach((project) => {
        expect(project).toHaveProperty("id");
        expect(project).toHaveProperty("title");
        expect(project).toHaveProperty("description");
        expect(project).toHaveProperty("technologies");
        expect(project).toHaveProperty("githubUrl");

        // Type checks
        expect(typeof project.id).toBe("string");
        expect(typeof project.title).toBe("string");
        expect(typeof project.description).toBe("string");
        expect(Array.isArray(project.technologies)).toBe(true);
        expect(typeof project.githubUrl).toBe("string");
      });
    });

    it("should have non-empty required string fields for each project", () => {
      data.projects.forEach((project) => {
        expect(project.id.trim().length).toBeGreaterThan(0);
        expect(project.title.trim().length).toBeGreaterThan(0);
        expect(project.description.trim().length).toBeGreaterThan(0);
      });
    });

    it("should have valid technologies array for each project", () => {
      data.projects.forEach((project) => {
        expect(project.technologies.length).toBeGreaterThan(0);
        project.technologies.forEach((tech) => {
          expect(typeof tech).toBe("string");
          expect(tech.trim().length).toBeGreaterThan(0);
        });
      });
    });

    it("should have unique project IDs", () => {
      const ids = data.projects.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have valid URL format for githubUrl when provided", () => {
      data.projects.forEach((project) => {
        if (project.githubUrl && project.githubUrl.trim().length > 0) {
          expect(project.githubUrl).toMatch(/^https?:\/\//);
          expect(project.githubUrl).toContain("github.com");
        }
      });
    });
  });

  describe("3. Experience array structure", () => {
    it("should have experience as an array", () => {
      expect(Array.isArray(data.experience)).toBe(true);
    });

    it("should have at least one experience entry", () => {
      expect(data.experience.length).toBeGreaterThan(0);
    });

    it("should have expected structure for each experience entry", () => {
      data.experience.forEach((exp) => {
        expect(exp).toHaveProperty("id");
        expect(exp).toHaveProperty("company");
        expect(exp).toHaveProperty("position");
        expect(exp).toHaveProperty("startDate");
        expect(exp).toHaveProperty("endDate");
        expect(exp).toHaveProperty("description");
        expect(exp).toHaveProperty("technologies");

        // Type checks
        expect(typeof exp.id).toBe("string");
        expect(typeof exp.company).toBe("string");
        expect(typeof exp.position).toBe("string");
        expect(typeof exp.startDate).toBe("string");
        // endDate can be undefined for ongoing positions
        if (exp.endDate !== undefined) {
          expect(typeof exp.endDate).toBe("string");
        }
        expect(Array.isArray(exp.description)).toBe(true);
        exp.description.forEach((desc) => {
          expect(typeof desc).toBe("string");
        });
        expect(Array.isArray(exp.technologies)).toBe(true);
      });
    });

    it("should have non-empty required string fields for each experience entry", () => {
      data.experience.forEach((exp) => {
        expect(exp.id.trim().length).toBeGreaterThan(0);
        expect(exp.company.trim().length).toBeGreaterThan(0);
        expect(exp.position.trim().length).toBeGreaterThan(0);
        expect(exp.description.length).toBeGreaterThan(0);
        exp.description.forEach((desc) => {
          expect(desc.trim().length).toBeGreaterThan(0);
        });
      });
    });

    it("should have valid technologies array for each experience entry", () => {
      data.experience.forEach((exp) => {
        expect(exp.technologies.length).toBeGreaterThan(0);
        exp.technologies.forEach((tech) => {
          expect(typeof tech).toBe("string");
          expect(tech.trim().length).toBeGreaterThan(0);
        });
      });
    });

    it("should have valid date format for startDate (YYYY-MM)", () => {
      const datePattern = /^\d{4}-\d{2}$/;

      data.experience.forEach((exp) => {
        expect(exp.startDate).toMatch(datePattern);
      });
    });

    it("should have valid date format for endDate when present (YYYY-MM)", () => {
      const datePattern = /^\d{4}-\d{2}$/;

      data.experience.forEach((exp) => {
        if (exp.endDate !== undefined) {
          expect(exp.endDate).toMatch(datePattern);
        }
      });
    });

    it("should have endDate after startDate when both dates are present", () => {
      data.experience.forEach((exp) => {
        if (exp.endDate !== undefined) {
          const startDate = new Date(exp.startDate);
          const endDate = new Date(exp.endDate);
          expect(endDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
        }
      });
    });

    it("should have valid month values (01-12) for startDate", () => {
      data.experience.forEach((exp) => {
        const [, month] = exp.startDate.split("-");
        const monthNum = parseInt(month, 10);
        expect(monthNum).toBeGreaterThanOrEqual(1);
        expect(monthNum).toBeLessThanOrEqual(12);
      });
    });

    it("should have valid month values (01-12) for endDate when present", () => {
      data.experience.forEach((exp) => {
        if (exp.endDate !== undefined) {
          const [, month] = exp.endDate.split("-");
          const monthNum = parseInt(month, 10);
          expect(monthNum).toBeGreaterThanOrEqual(1);
          expect(monthNum).toBeLessThanOrEqual(12);
        }
      });
    });

    it("should have unique experience IDs", () => {
      const ids = data.experience.map((e) => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe("4. Skills array structure", () => {
    it("should have skills as an array", () => {
      expect(Array.isArray(data.skills)).toBe(true);
    });

    it("should have at least one skill", () => {
      expect(data.skills.length).toBeGreaterThan(0);
    });

    it("should have expected structure for each skill", () => {
      data.skills.forEach((skill) => {
        expect(skill).toHaveProperty("name");
        expect(skill).toHaveProperty("level");
        expect(skill).toHaveProperty("category");

        // Type checks
        expect(typeof skill.name).toBe("string");
        expect(typeof skill.level).toBe("string");
        expect(typeof skill.category).toBe("string");
      });
    });

    it("should have valid skill levels", () => {
      const validLevels = ["beginner", "intermediate", "advanced", "expert"];

      data.skills.forEach((skill) => {
        expect(validLevels).toContain(skill.level);
      });
    });

    it("should have valid skill categories", () => {
      const validCategories = ["frontend", "backend", "tools", "design"];

      data.skills.forEach((skill) => {
        expect(validCategories).toContain(skill.category);
      });
    });

    it("should have non-empty skill names", () => {
      data.skills.forEach((skill) => {
        expect(skill.name.trim().length).toBeGreaterThan(0);
      });
    });

    it("should have unique skill names", () => {
      const names = data.skills.map((s) => s.name.toLowerCase());
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });

  describe("5. Contact object structure", () => {
    it("should have contact as an object", () => {
      expect(typeof data.contact).toBe("object");
      expect(data.contact).not.toBeNull();
      expect(Array.isArray(data.contact)).toBe(false);
    });

    it("should have expected properties", () => {
      expect(data.contact).toHaveProperty("name");
      expect(data.contact).toHaveProperty("email");
      expect(data.contact).toHaveProperty("linkedIn");
      expect(data.contact).toHaveProperty("github");
      expect(data.contact).toHaveProperty("address");
    });

    it("should have correct types for all properties", () => {
      expect(typeof data.contact.name).toBe("string");
      expect(typeof data.contact.email).toBe("string");
      expect(typeof data.contact.linkedIn).toBe("string");
      expect(typeof data.contact.github).toBe("string");
      expect(typeof data.contact.address).toBe("string");
    });

    it("should have non-empty contact properties", () => {
      expect(data.contact.name.trim().length).toBeGreaterThan(0);
      expect(data.contact.email.trim().length).toBeGreaterThan(0);
      expect(data.contact.linkedIn.trim().length).toBeGreaterThan(0);
      expect(data.contact.github.trim().length).toBeGreaterThan(0);
      expect(data.contact.address.trim().length).toBeGreaterThan(0);
    });

    it("should have valid email format", () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(data.contact.email).toMatch(emailPattern);
    });

    it("should have valid LinkedIn URL format", () => {
      expect(data.contact.linkedIn).toMatch(/^https?:\/\//);
      expect(data.contact.linkedIn).toContain("linkedin.com");
      expect(data.contact.linkedIn).toContain("/in/");
    });

    it("should have valid GitHub URL format", () => {
      expect(data.contact.github).toMatch(/^https?:\/\//);
      expect(data.contact.github).toContain("github.com");
    });
  });

  describe("6. FunFacts array structure", () => {
    it("should have funFacts as an array", () => {
      expect(Array.isArray(data.funFacts)).toBe(true);
    });

    it("should have at least one fun fact", () => {
      expect(data.funFacts.length).toBeGreaterThan(0);
    });

    it("should have expected structure for each fun fact", () => {
      data.funFacts.forEach((funFact) => {
        expect(funFact).toHaveProperty("id");
        expect(funFact).toHaveProperty("fact");

        // Type checks
        expect(typeof funFact.id).toBe("string");
        expect(typeof funFact.fact).toBe("string");
      });
    });

    it("should have non-empty required string fields for each fun fact", () => {
      data.funFacts.forEach((funFact) => {
        expect(funFact.id.trim().length).toBeGreaterThan(0);
        expect(funFact.fact.trim().length).toBeGreaterThan(0);
      });
    });

    it("should have unique fun fact IDs", () => {
      const ids = data.funFacts.map((f) => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
