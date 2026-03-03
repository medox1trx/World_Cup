// utilitaires pour filtrer / trier des tableaux de matchs

// renvoie une version « normalisée » d'une chaîne pour comparaison
function normalize(str = "") {
	return str
		.toString()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}

/**
 * Filtre une liste de matchs selon des critères optionnels.
 * criteria peut contenir :
 *   { phase, group, team, startDate, endDate }
 * startDate et endDate peuvent être des Date ou des chaînes
 * ISO ; seules les rencontres dont la date est incluse dans
 * l'intervalle sont conservées.
 */
export function filterMatches(matches = [], criteria = {}) {
	const { phase = "", group = "", team = "", startDate, endDate } = criteria;
	const start = startDate ? new Date(startDate) : null;
	const end = endDate ? new Date(endDate) : null;

	return matches.filter((m) => {
		if (phase && normalize(m.phase.name) !== normalize(phase)) return false;
		if (group && normalize(m.group.name) !== normalize(group)) return false;
		if (team) {
			const home = normalize(m.home_team);
			const away = normalize(m.away_team);
			if (!home.includes(normalize(team)) && !away.includes(normalize(team)))
				return false;
		}
		if (start || end) {
			const d = new Date(m.match_datetime);
			if (start && d < start) return false;
			if (end && d > end) return false;
		}
		return true;
	});
}

/**
 * Trie une copie du tableau en fonction d'une clé et d'un ordre.
 * sortKey peut être 'home', 'away', 'phase' ou 'group' ; toute autre valeur
 * laisse le tableau dans son ordre d'origine. order doit valoir 'asc' ou 'desc'.
 */
export function sortMatches(matches = [], sortKey = "", order = "asc") {
	const multiplier = order === "desc" ? -1 : 1;

	return [...matches].sort((a, b) => {
		switch (sortKey) {
			case "home":
				return (
					normalize(a.home_team).localeCompare(normalize(b.home_team)) *
					multiplier
				);
			case "away":
				return (
					normalize(a.away_team).localeCompare(normalize(b.away_team)) *
					multiplier
				);
			case "phase":
				return (
					normalize(a.phase.name).localeCompare(normalize(b.phase.name)) *
					multiplier
				);
			case "group":
				return (
					normalize(a.group.name).localeCompare(normalize(b.group.name)) *
					multiplier
				);
			default:
				// pas de tri actif
				return 0;
		}
	});
}
