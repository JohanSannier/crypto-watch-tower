import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { favListDisplay } from "../features/favListSlice";
import { showStableCoins } from "../features/stableCoinSlice";

const TableFilters = () => {
  const dispatch = useDispatch();
  const [showStable, setShowStable] = useState(true);
  const [showFavList, setShowFavList] = useState(false);

  useEffect(() => {
    dispatch(showStableCoins(showStable));
    dispatch(favListDisplay(showFavList));
  }, [dispatch, showStable, showFavList]);

  return (
    <div className="table-filters">
      <div className="table-filters-container">
        <div className="stable-checkbox-container">
          <input
            type="checkbox"
            id="stableCoin"
            defaultChecked={true}
            onChange={() => setShowStable(!showStable)}
          />
          <label htmlFor="stableCoin">
            {showStable ? "Avec stable coins" : "Sans stable coins"}
          </label>
        </div>
        <div
          className={showFavList ? "no-list-btn" : "no-list-btn active"}
          onClick={() => setShowFavList(false)}
        >
          <p>Aucune liste</p>
        </div>
        <div
          className={showFavList ? "fav-list active" : "fav-list"}
          onClick={() => setShowFavList(true)}
        >
          <p>Liste des favoris</p>
          <img src="./assets/star-full.svg" alt="Icone des favoris" />
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
