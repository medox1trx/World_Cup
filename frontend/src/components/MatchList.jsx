import React, { useState, useMemo } from "react";
import MatchCard from "./MatchCard";
import { filterMatches, sortMatches } from "../utils/matchUtils";

const MatchList = ({ matches }) => {
	// états de filtre/tri
	const [criteria, setCriteria] = useState({
		phase: "",
		group: "",
		team: "",
		startDate: "",
		endDate: ""
	});
	// ne propose plus 'date' ; par défaut on ne trie pas ou sur l'équipe à domicile
	const [sortBy, setSortBy] = useState("");
	const [order, setOrder] = useState("asc");

	const visible = useMemo(() => {
		let result = filterMatches(matches, criteria);
		result = sortMatches(result, sortBy, order);
		return result;
	}, [matches, criteria, sortBy, order]);

	return (
		<div>
			{/* contrôles de filtre / tri (sélecteur de phase, équipe, etc.) */}
			{/* sélectionner sortBy = 'home','away','phase' ou 'group' */}
			{visible.map((m) => (
				<MatchCard key={m.id} match={m} />
			))}
		</div>
	);
};

export default MatchList;
