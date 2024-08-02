import Recipe, { RecipeList } from "../../models/recipe";
import delay from "../../utils/delay";
import { MockPatientService } from "../patients/patients";
import { MockUserService } from "../users/users";

export interface RecipeService {
  createRecipe: (
    user: number,
    patient: number,
    content: string
  ) => Promise<number>;
  getRecipes: (user?: number, patient?: number) => Promise<RecipeList>;
  deleteRecipe: (id: number) => Promise<void>;
}

const SERVER_DELAY = 1;

export class MockRecipeService implements RecipeService {
  private static _instance: RecipeService;
  static get instance() {
    MockRecipeService._instance ??= new MockRecipeService();
    return MockRecipeService._instance as RecipeService;
  }

  private _recipes: RecipeList;
  private _nextId: number;

  constructor() {
    this._recipes = [];
    this._nextId = 0;
  }

  async createRecipe(
    user: number,
    patient: number,
    content: string
  ): Promise<number> {
    const results = await Promise.all([
      MockUserService.instance.getUserExists(user),
      MockPatientService.getInstance().getPatientExists(patient),
    ]);

    if (!results[0] || !results[1]) {
      throw new Error("Invalid user and/or patient id");
    }

    await delay(SERVER_DELAY);
    const id = this._getNextId();
    const recipe = new Recipe(id, user, patient, content);
    this._recipes.push(recipe);
    return id;
  }

  async getRecipes(user?: number, patient?: number): Promise<RecipeList> {
    await delay(SERVER_DELAY);

    if (user !== undefined) {
      if (patient !== undefined) {
        return this._recipes.filter(
          (recipe) => recipe.userId === user && recipe.patientId === patient
        );
      } else {
        return this._recipes.filter((recipe) => recipe.userId === user);
      }
    } else {
      if (patient !== undefined) {
        return this._recipes.filter((recipe) => recipe.patientId === patient);
      } else {
        return this._recipes;
      }
    }
  }

  async deleteRecipe(id: number): Promise<void> {
    await delay(SERVER_DELAY);

    const index = this._recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) {
      throw new Error(`Invalid recipe id: ${id}`);
    }

    this._recipes = [
      ...this._recipes.slice(0, index),
      ...this._recipes.slice(index + 1),
    ];
  }

  private _getNextId(): number {
    return this._nextId++;
  }
}
