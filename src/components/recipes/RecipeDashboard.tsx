import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Recipe, { RecipeList } from "../../models/recipe";
import useRecipes from "../../hooks/recipes/useRecipes";
import RecipeForm from "./RecipeForm";
import User from "../../models/user";
import ModalBox from "../common/ModalBox";
import usePatients from "../../hooks/patients/usePatients";
import Patient, { PatientList } from "../../models/patient";

import { IoTrashBin as IconBin } from "react-icons/io5";
import { FaPen as IconPen } from "react-icons/fa6";

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

type RecipeDashboardFormState = "none" | "add" | "edit";

const RecipeDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  const { getRecipes, createRecipe, deleteRecipe, updateRecipe } = useRecipes();
  const { patients, fetchPatientPageAsync } = usePatients();
  const [recipes, setRecipes] = useState<RecipeList>([]);
  const [working, setWorking] = useState<boolean>(false);
  const [form, setForm] = useState<RecipeDashboardFormState>("none");
  const [formInitialPatient, setFormInitialPatient] = useState<Patient | null>(
    null
  );
  const [formInitialRecipe, setFormInitialRecipe] = useState<Recipe | null>(
    null
  );
  const [disableFormInteraction, setDisableFormInteraction] =
    useState<boolean>(false);

  const [selectedRecipe, setSelectedRecipe] = useState<{
    patientIndex: number;
    recipeIndex: number;
  } | null>(null);

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
    content: string,
    recipeId?: number
  ) => Promise<void> = async (patientId, content, recipeId) => {
    setDisableFormInteraction(true);

    try {
      switch (form) {
        case "add":
          await createRecipe((user as User).id as number, patientId, content);
          break;
        case "edit":
          if (!recipeId) {
            throw new Error(
              "Invalid state: trying to edit a recipe without providing recipe id"
            );
          }
          await updateRecipe(recipeId, content);
      }
    } catch (error) {
      throw error;
    } finally {
      setDisableFormInteraction(false);
    }

    setForm("none");
    setWorking(true);
    const recipes = await getRecipes((user as User).id as number);
    setRecipes(recipes);
    setWorking(false);
  };

  const handleRecipeClick = (patientIndex: number, recipeIndex: number) => {
    if (
      selectedRecipe &&
      selectedRecipe.patientIndex === patientIndex &&
      selectedRecipe.recipeIndex === recipeIndex
    ) {
      setSelectedRecipe(null);
    } else {
      setSelectedRecipe({
        patientIndex: patientIndex,
        recipeIndex: recipeIndex,
      });
    }
  };

  // const handleRecipeViewClick;
  const handleRecipeEditClick = (recipe: Recipe) => {
    const patient = patients.find((p) => p.id === recipe.patientId);
    if (!patient) return;

    setFormInitialPatient(patient);
    setFormInitialRecipe(recipe);
    setForm("edit");
  };

  const handleRecipeDeleteClick = (recipe: Recipe) => {
    setWorking(true);
    deleteRecipe(recipe.id)
      .then(() => getRecipes((user as User).id as number))
      .then((recipes) => setRecipes(recipes))
      .catch((error) => console.error(error))
      .finally(() => setWorking(false));
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
                  ([patientName, patientRecipes], patientIndex) => (
                    <ul key={patientIndex} className="list-disc list-inside">
                      <div className="hover:bg-primary px-2 italic">
                        {patientName} ({patientRecipes.length})
                      </div>
                      {patientRecipes.map((recipe, recipeIndex) => (
                        <li
                          key={`${patientIndex},${recipeIndex}`}
                          className="w-full px-2 hover:bg-primary flex items-center before:content-['●'] before:mr-4"
                          onClick={() =>
                            handleRecipeClick(patientIndex, recipeIndex)
                          }
                        >
                          {recipe.content}
                          {selectedRecipe &&
                            selectedRecipe.patientIndex === patientIndex &&
                            selectedRecipe.recipeIndex === recipeIndex && (
                              <div className="flex gap-1 text-xs ml-auto [&>button]:w-5 [&>button]:h-5 [&>button]:bg-black [&>button]:text-white [&>button]:rounded [&>button]:border [&>button]:border-black [&>button:hover]:bg-white [&>button:hover]:text-black [&>button]:flex [&>button]:justify-center [&>button]:items-center">
                                <button
                                  type="button"
                                  onClick={() => handleRecipeEditClick(recipe)}
                                >
                                  <IconPen />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRecipeDeleteClick(recipe)
                                  }
                                >
                                  <IconBin />
                                </button>
                              </div>
                            )}
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
                onClick={() => setForm("add")}
              >
                +
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal Form */}
      {form !== "none" && (
        <ModalBox
          title={form === "add" ? "Add Recipe" : "Edit Recipe"}
          onClose={() => setForm("none")}
        >
          <RecipeForm
            {...(formInitialPatient
              ? { patient: formInitialPatient }
              : { patients: patients })}
            recipe={formInitialRecipe ?? undefined}
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
