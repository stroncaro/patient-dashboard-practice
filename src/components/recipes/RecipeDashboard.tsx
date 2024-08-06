import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Recipe, { RecipeList } from "../../models/recipe";
import useRecipes from "../../hooks/recipes/useRecipes";
import RecipeForm from "./RecipeForm";
import User from "../../models/user";
import ModalBox from "../common/ModalBox";
import usePatients from "../../hooks/patients/usePatients";
import { PatientList } from "../../models/patient";

type RecipeListMap = { [key: string]: RecipeList };

function _createPatientNameToRecipeMap(
  recipes: RecipeList,
  patients: PatientList
): RecipeListMap {
  const patientId_recipes_map: RecipeListMap = recipes.reduce(
    (prev: RecipeListMap, recipe) => {
      if (prev[recipe.patientId]) {
        prev[recipe.patientId].push(recipe);
      } else {
        prev[recipe.patientId] = [recipe];
      }
      return prev;
    },
    {}
  );

  const patientName_recipes_map: RecipeListMap = Object.keys(
    patientId_recipes_map
  ).reduce((prev, id) => {
    const patient = patients.find((patient) => patient.id === Number(id));
    if (patient) {
      return { ...prev, [patient.getFullName()]: patientId_recipes_map[id] };
    } else {
      return prev;
    }
  }, {});

  return patientName_recipes_map;
}

const RecipeDashboard: React.FC = () => {
  // const { user } = useContext(AuthContext);
  /* TODO: remove. This is for testing purposes only! */
  const user = new User(0, "admin", "");

  const { getRecipes, createRecipe } = useRecipes();
  const { patients, fetchPatientPageAsync } = usePatients();
  const [recipes, setRecipes] = useState<RecipeList>([]);
  const [working, setWorking] = useState<boolean>(false);
  const [form, setForm] = useState<boolean>(false);
  const [disableFormInteraction, setDisableFormInteraction] =
    useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setWorking(true);
      Promise.all([getRecipes(user.id as number), fetchPatientPageAsync()])
        .then(([recipes, _]) => setRecipes(recipes))
        .catch((error) => console.error(error))
        .finally(() => setWorking(false));
    }
  }, []);

  const patientRecipeMap = _createPatientNameToRecipeMap(recipes, patients);

  const handleFormSubmit: (
    patientId: number,
    content: string
  ) => Promise<void> = async (patientId, content) => {
    setDisableFormInteraction(true);

    try {
      await createRecipe((user as User).id as number, patientId, content);
    } catch (error) {
      throw error;
    } finally {
      setDisableFormInteraction(false);
    }

    setForm(false);
    setWorking(true);
    const recipes = await getRecipes((user as User).id as number);
    setRecipes(recipes);
    setWorking(false);
  };

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
                {Object.entries(patientRecipeMap).map(
                  ([patientName, patientRecipes], i) => (
                    <ul key={i} className="list-disc list-inside">
                      <div className="hover:bg-primary px-2 italic">
                        {patientName} ({patientRecipes.length})
                      </div>
                      {patientRecipes.map((recipe, j) => (
                        <li key={`${i},${j}`} className="px-2 hover:bg-primary">
                          {recipe.content}
                        </li>
                      ))}
                    </ul>
                  )
                )}
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
          <RecipeForm
            patients={patients}
            onSubmit={handleFormSubmit}
            disableSubmit={disableFormInteraction}
            disableInput={disableFormInteraction}
          />
        </ModalBox>
      )}
    </div>
  );
};

export default RecipeDashboard;
