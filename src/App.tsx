import React, { useEffect, useState } from "react";
import { IIngredient } from "~/types";
import { getIngredients } from "~/api";

function App(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<IIngredient[]>();

  useEffect(() => {
    async function init() {
      const { data, error } = await getIngredients();
      if (error) {
        return;
      }
      setState(data);
      setLoading(false);
    }
    init();
  });

  return <div>{loading ? <>Загрузка</> : <>{JSON.stringify(state)}</>}</div>;
}

export default App;
