import { crud } from '../../src/objects/crud';
import { MCPObject } from '../../src/objects/schemas';

describe("CRUD Operations", () => {
  beforeEach(() => {
    // Clear the in-memory store before each test to ensure isolation
    crud.clear();
  });

  it("should create and read an MCPObject", () => {
    const testObject: Omit<MCPObject, "hash"> = {
      objectType: "color_palette",
      name: "Test Color Palette",
      generationMethod: "manual",
      baseColor: "#FFFFFF",
      palette: {
        primary: "#FF0000",
        secondary: "#00FF00",
        accent: "#0000FF",
        neutral: "#CCCCCC",
      },
      semantic: {
        background: "#FFFFFF",
        surface: "#F0F0F0",
        text: {
          primary: "#333333",
          secondary: "#666666",
          disabled: "#999999",
        },
        border: {
          default: "#AAAAAA",
          subtle: "#DDDDDD",
        },
        feedback: {
          success: "#00FF00",
          warning: "#FFFF00",
          error: "#FF0000",
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: "user",
        tags: ["test"],
        usageCount: 0,
        suitability: {
          lightMode: true,
          darkMode: false,
          highContrast: true,
        },
      },
    };

    const createdObject = crud.create(testObject);
    expect(createdObject).toHaveProperty("hash");
    expect(createdObject.objectType).toBe("color_palette");

    const readObject = crud.read(createdObject.hash);
    expect(readObject).toEqual(createdObject);
  });

  it("should return undefined if object not found during read", () => {
    const readObject = crud.read("nonexistent-hash");
    expect(readObject).toBeUndefined();
  });

  it("should update an existing MCPObject", () => {
    const testObject: Omit<MCPObject, "hash"> = {
      objectType: "color_palette",
      name: "Original Name",
      generationMethod: "manual",
      baseColor: "#FFFFFF",
      palette: {
        primary: "#FF0000",
        secondary: "#00FF00",
        accent: "#0000FF",
        neutral: "#CCCCCC",
      },
      semantic: {
        background: "#FFFFFF",
        surface: "#F0F0F0",
        text: {
          primary: "#333333",
          secondary: "#666666",
          disabled: "#999999",
        },
        border: {
          default: "#AAAAAA",
          subtle: "#DDDDDD",
        },
        feedback: {
          success: "#00FF00",
          warning: "#FFFF00",
          error: "#FF0000",
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: "user",
        tags: ["test"],
        usageCount: 0,
        suitability: {
          lightMode: true,
          darkMode: false,
          highContrast: true,
        },
      },
    };
    const createdObject = crud.create(testObject);

    const updatedName = "Updated Name";
    const updatedObject = crud.update(createdObject.hash, { name: updatedName });

    expect(updatedObject).toBeDefined();
    expect(updatedObject?.name).toBe(updatedName);
    expect(crud.read(createdObject.hash)?.name).toBe(updatedName);
  });

  it("should return undefined if object not found during update", () => {
    const updatedObject = crud.update("nonexistent-hash", { name: "New Name" });
    expect(updatedObject).toBeUndefined();
  });

  it("should delete an MCPObject", () => {
    const testObject: Omit<MCPObject, "hash"> = {
      objectType: "color_palette",
      name: "Deletable Object",
      generationMethod: "manual",
      baseColor: "#FFFFFF",
      palette: {
        primary: "#FF0000",
        secondary: "#00FF00",
        accent: "#0000FF",
        neutral: "#CCCCCC",
      },
      semantic: {
        background: "#FFFFFF",
        surface: "#F0F0F0",
        text: {
          primary: "#333333",
          secondary: "#666666",
          disabled: "#999999",
        },
        border: {
          default: "#AAAAAA",
          subtle: "#DDDDDD",
        },
        feedback: {
          success: "#00FF00",
          warning: "#FFFF00",
          error: "#FF0000",
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: "user",
        tags: ["test"],
        usageCount: 0,
        suitability: {
          lightMode: true,
          darkMode: false,
          highContrast: true,
        },
      },
    };
    const createdObject = crud.create(testObject);

    const isDeleted = crud.delete(createdObject.hash);
    expect(isDeleted).toBe(true);
    expect(crud.read(createdObject.hash)).toBeUndefined();
  });

  it("should return false if object not found during delete", () => {
    const isDeleted = crud.delete("nonexistent-hash");
    expect(isDeleted).toBe(false);
  });

  it("should list all MCPObjects", () => {
    const obj1: Omit<MCPObject, "hash"> = {
      objectType: "color_palette",
      name: "Obj1",
      generationMethod: "manual",
      baseColor: "#FF0000",
      palette: {
        primary: "#FF0000",
        secondary: "#00FF00",
        accent: "#0000FF",
        neutral: "#CCCCCC",
      },
      semantic: {
        background: "#FFFFFF",
        surface: "#F0F0F0",
        text: {
          primary: "#333333",
          secondary: "#666666",
          disabled: "#999999",
        },
        border: {
          default: "#AAAAAA",
          subtle: "#DDDDDD",
        },
        feedback: {
          success: "#00FF00",
          warning: "#FFFF00",
          error: "#FF0000",
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: "user",
        tags: ["test"],
        usageCount: 0,
        suitability: {
          lightMode: true,
          darkMode: false,
          highContrast: true,
        },
      },
    };
    const obj2: Omit<MCPObject, "hash"> = {
      objectType: "typography_scale",
      name: "Obj2",
      fontFamily: "Arial",
      scaleRatio: 1.2,
      hierarchy: {
        h1: { fontSize: "2rem", fontWeight: 700, lineHeight: 1.2 },
        h2: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.3 },
        h3: { fontSize: "1.2rem", fontWeight: 500, lineHeight: 1.4 },
        h4: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.5 },
        body: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 },
        caption: { fontSize: "0.8rem", fontWeight: 400, lineHeight: 1.7 },
        label: { fontSize: "0.7rem", fontWeight: 500, lineHeight: 1.8 },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: "ai",
        tags: ["test"],
        usageCount: 0,
      },
    };

    const createdObj1 = crud.create(obj1);
    const createdObj2 = crud.create(obj2);

    const allObjects = crud.list();
    expect(allObjects.length).toBe(2);
    expect(allObjects).toContainEqual(createdObj1);
    expect(allObjects).toContainEqual(createdObj2);
  });

  it("should clear all MCPObjects from the store", () => {
    const testObject: Omit<MCPObject, "hash"> = {
      objectType: "color_palette",
      name: "Clearable Object",
      generationMethod: "manual",
      baseColor: "#FFFFFF",
      palette: {
        primary: "#FF0000",
        secondary: "#00FF00",
        accent: "#0000FF",
        neutral: "#CCCCCC",
      },
      semantic: {
        background: "#FFFFFF",
        surface: "#F0F0F0",
        text: {
          primary: "#333333",
          secondary: "#666666",
          disabled: "#999999",
        },
        border: {
          default: "#AAAAAA",
          subtle: "#DDDDDD",
        },
        feedback: {
          success: "#00FF00",
          warning: "#FFFF00",
          error: "#FF0000",
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: "user",
        tags: ["test"],
        usageCount: 0,
        suitability: {
          lightMode: true,
          darkMode: false,
          highContrast: true,
        },
      },
    };
    crud.create(testObject);
    expect(crud.list().length).toBe(1);

    crud.clear();
    expect(crud.list().length).toBe(0);
  });
  it("should merge nested metadata updates without dropping fields", () => {
    const baseObject: Omit<MCPObject, "hash"> = {
      objectType: "color_palette",
      name: "Nested Update Source",
      generationMethod: "manual",
      baseColor: "#FFFFFF",
      palette: {
        primary: "#FF0000",
        secondary: "#00FF00",
        accent: "#0000FF",
        neutral: "#CCCCCC",
      },
      semantic: {
        background: "#FFFFFF",
        surface: "#F0F0F0",
        text: {
          primary: "#333333",
          secondary: "#666666",
          disabled: "#999999",
        },
        border: {
          default: "#AAAAAA",
          subtle: "#DDDDDD",
        },
        feedback: {
          success: "#00FF00",
          warning: "#FFFF00",
          error: "#FF0000",
        },
      },
      metadata: {
        createdAt: new Date().toISOString(),
        createdBy: "user",
        tags: ["initial"],
        usageCount: 5,
        suitability: {
          lightMode: true,
          darkMode: false,
          highContrast: true,
        },
      },
    };

    const createdObject = crud.create(baseObject);
    const originalMetadata = createdObject.metadata;

    const updatedObject = crud.update(createdObject.hash, {
      metadata: {
        tags: ["updated"],
      },
    });

    expect(updatedObject).toBeDefined();
    expect(updatedObject?.metadata.tags).toEqual(["updated"]);
    expect(updatedObject?.metadata.createdAt).toBe(originalMetadata.createdAt);
    expect(updatedObject?.metadata.createdBy).toBe(originalMetadata.createdBy);
    expect(updatedObject?.metadata.usageCount).toBe(originalMetadata.usageCount);
    expect(updatedObject?.metadata.suitability).toEqual(originalMetadata.suitability);
  });

});


