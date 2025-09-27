import { z } from 'zod';
import { MCPObjectSchema, MCPObject } from './schemas';
import { generateHash } from '../utils/hash';
import { deepMerge, DeepPartial } from '../utils/deep-merge';

// In-memory storage for demonstration purposes
const inMemoryStore: Map<string, MCPObject> = new Map();

export const crud = {
  /**
   * Creates a new MCPObject and stores it.
   * @param objectData The data for the MCPObject to create. The hash will be generated automatically.
   * @returns The created MCPObject with its hash.
   */
  create: (objectData: Omit<MCPObject, 'hash'>): MCPObject => {
    const hash = generateHash(objectData); // Use the utility function
    const newObject: MCPObject = { ...objectData, hash };
    const validationResult = MCPObjectSchema.safeParse(newObject);
    if (!validationResult.success) {
      throw new Error(`Validation failed: ${validationResult.error.message}`);
    }
    inMemoryStore.set(hash, newObject);
    return newObject;
  },

  /**
   * Reads an MCPObject by its hash.
   * @param hash The hash of the object to retrieve.
   * @returns The MCPObject if found, otherwise undefined.
   */
  read: (hash: string): MCPObject | undefined => {
    return inMemoryStore.get(hash);
  },

  /**
   * Updates an existing MCPObject.
   * @param hash The hash of the object to update.
   * @param updates Partial data to update the object with.
   * @returns The updated MCPObject if found and updated, otherwise undefined.
   */
  update: (hash: string, updates: DeepPartial<Omit<MCPObject, 'hash'>>): MCPObject | undefined => {
    const existingObject = inMemoryStore.get(hash);
    if (!existingObject) {
      return undefined;
    }

    const mergedObject = deepMerge<MCPObject>(existingObject, updates as DeepPartial<MCPObject>);
    const updatedObject: MCPObject = { ...mergedObject, hash: existingObject.hash };
    const validationResult = MCPObjectSchema.safeParse(updatedObject);
    if (!validationResult.success) {
      throw new Error(`Validation failed: ${validationResult.error.message}`);
    }
    inMemoryStore.set(hash, updatedObject);
    return updatedObject;
  },

  /**
   * Deletes an MCPObject by its hash.
   * @param hash The hash of the object to delete.
   * @returns True if the object was deleted, false otherwise.
   */
  delete: (hash: string): boolean => {
    return inMemoryStore.delete(hash);
  },

  /**
   * Lists all stored MCPObjects.
   * @returns An array of all MCPObjects.
   */
  list: (): MCPObject[] => {
    return Array.from(inMemoryStore.values());
  },

  /**
   * Clears all objects from the store.
   */
  clear: (): void => {
    inMemoryStore.clear();
  },
};










