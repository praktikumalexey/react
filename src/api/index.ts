import { IIngredient } from "~/types";
import { INGRDIENTS } from "~/constants";

export const getIngredients = async (): Promise<{
  data?: IIngredient[];
  error?: unknown;
}> => {
  try {
    const response = await fetch(INGRDIENTS);
    const json = await response.json();
    const data: Array<IIngredient> = json.data as Array<IIngredient>;
    return { data };
  } catch (error) {
    return { error };
  }
};
