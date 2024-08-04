import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { RecipeList } from "../../models/recipe";
import useRecipes from "../../hooks/recipes/useRecipes";
import RecipeForm from "./RecipeForm";
import User from "../../models/user";
import ModalBox from "../common/ModalBox";
import usePatients from "../../hooks/patients/usePatients";

const RecipeDashboard: React.FC = () => {
  // const { user } = useContext(AuthContext);
  /* TODO: remove. This is for testing purposes only! */
  const user = new User(0, "carlos", "");

  const { getRecipes } = useRecipes();
  const { patients, fetchPatientPageAsync } = usePatients();
  const [recipes, setRecipes] = useState<RecipeList>([]);
  const [working, setWorking] = useState<boolean>(false);
  const [form, setForm] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setWorking(true);
      Promise.all([getRecipes(user.id as number), fetchPatientPageAsync()])
        .then(([recipes, _]) => setRecipes(recipes))
        .catch((error) => console.error(error))
        .finally(() => setWorking(false));
    }
  }, []);

  return (
    <div className="w-1/2">
      {/* Ask for login */}
      {!user && (
        <>
          <div className="my-4">
            <h1 className="text-3xl font-bold">Content not accessible</h1>
            <hr />
          </div>
          <p>Must be logged in</p>
        </>
      )}

      {/* Content */}
      {user && (
        <>
          {/* Title */}
          <div className="my-4">
            <h1 className="text-3xl font-bold">Your recipes</h1>
            <hr />
          </div>

          {/* List */}
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

          {/* Button area */}
          {!working && (
            <div className="m-4 flex justify-end">
              <button
                className="btn btn-md bg-secondary border border-black text-white font-bold"
                // TODO: set actual onClick function, this is for testing
                onClick={() => setForm(true)}
              >
                +
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal Form */}
      {form && (
        <ModalBox title="Add Recipe" onClose={() => setForm(false)}>
          <RecipeForm patients={patients} onSubmit={() => {}} />
        </ModalBox>
      )}
    </div>
  );
};

export default RecipeDashboard;
