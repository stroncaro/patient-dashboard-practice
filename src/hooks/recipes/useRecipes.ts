import { RecipeList } from "../../models/recipe";
import { RecipeService } from "../../services/services";

interface RecipeHook {
  createRecipe: (
    user: number,
    patient: number,
    content: string
  ) => Promise<number>;
  getRecipes: (user?: number, patient?: number) => Promise<RecipeList>;
  deleteRecipe: (id: number) => Promise<void>;
}

const useRecipes: () => RecipeHook = () => {
  const service = RecipeService.instance;

  const createRecipe = service.createRecipe;
  const getRecipes = service.getRecipes;
  const deleteRecipe = service.deleteRecipe;

  return {
    createRecipe,
    getRecipes,
    deleteRecipe,
  };
};

export default useRecipes;
