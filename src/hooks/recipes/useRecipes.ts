import { RecipeList } from "../../models/recipe";
import { RecipeService } from "../../services/services";

interface RecipeHook {
  createRecipe: (
    user: number,
    patient: number,
    content: string
  ) => Promise<number>;
  getRecipes: (user?: number, patient?: number) => Promise<RecipeList>;
  updateRecipe: (id: number, content: string) => Promise<void>;
  deleteRecipe: (id: number) => Promise<void>;
}

const useRecipes: () => RecipeHook = () => {
  const service = RecipeService.instance;

  return {
    createRecipe: service.createRecipe.bind(service),
    getRecipes: service.getRecipes.bind(service),
    updateRecipe: service.updateRecipe.bind(service),
    deleteRecipe: service.deleteRecipe.bind(service),
  };
};

export default useRecipes;
