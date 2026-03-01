from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app)  # permet d'appeler l'API depuis ton frontend

# 👉 ROUTE PRINCIPALE
@app.route("/")
def home():
    return render_template("index.html")

# 🔐 Mot de passe admin hashé (ex: MD5/SHA256)
ADMIN_HASH = generate_password_hash("MAE2026")

# Stockage temporaire (remplacer par DB en prod)
crm_data = []
missions_data = []
demandes_data = []

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    pwd = data.get("password")
    if not pwd or not check_password_hash(ADMIN_HASH, pwd):
        return jsonify({"success": False, "message": "Mot de passe incorrect"}), 401
    return jsonify({"success": True, "message": "Accès validé"})

# Exemples d'API pour CRUD
@app.route("/crm", methods=["GET", "POST", "DELETE"])
def crm():
    if request.method == "GET":
        return jsonify(crm_data)
    data = request.json
    if request.method == "POST":
        crm_data.append(data)
        return jsonify({"success": True})
    if request.method == "DELETE":
        crm_data.clear()
        return jsonify({"success": True})

@app.route("/missions", methods=["GET", "POST", "DELETE"])
def missions():
    if request.method == "GET":
        return jsonify(missions_data)
    data = request.json
    if request.method == "POST":
        missions_data.append(data)
        return jsonify({"success": True})
    if request.method == "DELETE":
        missions_data.clear()
        return jsonify({"success": True})

@app.route("/demandes", methods=["GET", "POST", "DELETE"])
def demandes():
    if request.method == "GET":
        return jsonify(demandes_data)
    data = request.json
    if request.method == "POST":
        demandes_data.append(data)
        return jsonify({"success": True})
    if request.method == "DELETE":
        demandes_data.clear()
        return jsonify({"success": True})

if __name__ == "__main__":
    app.run()
