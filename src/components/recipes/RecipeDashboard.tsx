import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { RecipeList } from "../../models/recipe";
import useRecipes from "../../hooks/recipes/useRecipes";

const RecipeDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  const { getRecipes } = useRecipes();
  const [recipes, setRecipes] = useState<RecipeList>([]);
  const [working, setWorking] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setWorking(true);
      getRecipes(user.id as number)
        .then((recipes) => setRecipes(recipes))
        .catch((error) => console.error(error))
        .finally(() => setWorking(false));
    }
  }, []);

  return (
    <div className="w-1/2">
      {!user && (
        <>
          <div className="my-4">
            <h1 className="text-3xl font-bold">Content not accessible</h1>
            <hr />
          </div>
          <p>Must be logged in</p>
        </>
      )}
      {user && (
        <>
          <div className="my-4">
            <h1 className="text-3xl font-bold">Your recipes</h1>
            <hr />
          </div>
          <div>
            {working && <p>Loading...</p>}
            {!working && recipes.length === 0 && <p>You have no recipes</p>}
            {!working && recipes.length > 0 && (
              <ul>
                {recipes.map((recipe, i) => (
                  // TODO: properly render recipes, grouped by patient
                  <li key={i}>{recipe.content}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDashboard;
