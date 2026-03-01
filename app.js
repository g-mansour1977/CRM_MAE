// ➜ Ajouter mission
async function addMission() {
  await fetch("/missions", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      nom: m_nom.value,
      matricule: m_matricule.value,
      dest: m_dest.value,
      date: m_date.value,
      type: m_type.value
    })
  });

  loadMissions();
}

// ➜ Charger missions
async function loadMissions() {
  const res = await fetch("/missions");
  const data = await res.json();

  const table = document.getElementById("mission_table");
  table.innerHTML = `
    <tr>
      <th>Agent</th>
      <th>Matricule</th>
      <th>Destination</th>
      <th>Dates</th>
      <th>Type</th>
    </tr>
  `;

  data.forEach(m => {
    table.innerHTML += `
      <tr>
        <td>${m.nom}</td>
        <td>${m.matricule}</td>
        <td>${m.dest}</td>
        <td>${m.date}</td>
        <td>${m.type}</td>
      </tr>
    `;
  });
}

// ➜ Vérification admin (DOIT être en dehors)
async function checkAdmin() {
  const pwd = prompt("🔐 Accès administrateur requis");
  if (!pwd) return false;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: pwd })
  });

  if (!res.ok) {
    alert("⛔ Mot de passe incorrect");
    return false;
  }

  return true;
}


