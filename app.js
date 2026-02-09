async function addMission() {
  await fetch("http://127.0.0.1:5000/missions", {
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

async function loadMissions() {
  const res = await fetch("http://127.0.0.1:5000/missions");
  const data = await res.json();
  // afficher tableau

 // 🔐 Authentification admin via backend Flask
async function checkAdmin() {
    const pwd = prompt("🔐 Accès administrateur requis");
    if (!pwd) return false;

    const res = await fetch("http://127.0.0.1:5000/login", {
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


}
