from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS
import json

from transformers import CLIPProcessor, CLIPModel
import numpy as np

app = Flask(__name__)
CORS(app)

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
uri = "mongodb+srv://sl207020:c6Gnni3LwAH6DQWq@notecluster.qeytuf9.mongodb.net/?retryWrites=true&w=majority&appName=NoteCluster"
client = MongoClient(uri, server_api=ServerApi("1"))
notes_collection = client.CosmicDB.notes


"""Identify the indices in previous notes array exceeding similarity threshold
    
    Args:
        note_content (str): text content of saved note
        prev_note_texts (list[str]): text content of other notes in the network graph
        
    Return:
        match_idxs (list): matching indices"""


def calc_matches(note_content, prev_note_texts, thold):
    match_idxs = []
    threshold = thold
    note_tokens = processor(
        text=[note_content],
        images=None,
        # text_embeds=prev_note_texts,
        return_tensors="pt",
    )
    note_embed = model.get_text_features(**note_tokens)
    note_embed = note_embed.detach().cpu().numpy()
    note_embed = note_embed / np.linalg.norm(note_embed, axis=0)

    prev_note_tokens = processor(
        text=prev_note_texts, images=None, return_tensors="pt", padding=True
    )
    prev_note_embeds = model.get_text_features(**prev_note_tokens)
    prev_note_embeds = prev_note_embeds.detach().cpu().numpy()

    for idx, prev_note_embed in enumerate(prev_note_embeds):
        print(np.dot(note_embed, prev_note_embed))
        if np.dot(note_embed, prev_note_embed) >= threshold:
            match_idxs.append(idx)
    print(match_idxs)
    return match_idxs


@app.route("/changeNode", methods=["POST"])
def changeNode():
    prev_notes = []
    note_content = request.form.get("content")
    note_id = request.form.get("id")

    # read each note obj existing in graph
    for key in request.form.keys():
        if key.startswith("object"):
            note_str = request.form.get(key)
            note_obj = json.loads(note_str)
            if str(note_obj["id"]) != note_id:
                prev_notes.append(note_obj)

    if prev_notes and note_content and note_id:
        prev_note_texts = [note["content"] for note in prev_notes]
        for note in prev_note_texts:
            print(note)
        match_idxs = calc_matches(note_content, prev_note_texts)
        new_edges = [
            f"{note_id}-{prev_notes[idx]['id']}" for idx in match_idxs
        ]  # e.g. [1-2, 1-5, 1-6]
        return jsonify(new_edges), 200

    return jsonify({"error": "No notes provided"}), 400


"""Compute all edges by comparing each note with all other notes"""


@app.route("/calcAllEdges", methods=["POST"])
def calcAllEdges():
    note_texts = []
    note_ids = []
    edges = []
    for key in request.form.keys():
        if key.startswith("object"):
            note_str = request.form.get(key)
            note_obj = json.loads(note_str)
            note_texts.append(note_obj["content"])
            note_ids.append(note_obj["id"])
    thold = int(request.form.get("thold"))

    for _ in range(len(note_texts)):
        target_note = note_texts.pop(0)
        target_id = note_ids.pop(0)
        match_idxs = calc_matches(target_note, note_texts, thold)
        new_edges = [f"{target_id}-{note_ids[idx]}" for idx in match_idxs]
        edges += new_edges
        note_texts.append(target_note)
        note_ids.append(target_id)

    return jsonify(edges), 200


"""Add new note to database"""


@app.route("/addNote", methods=["POST"])
def addNote():
    note = request.form.get("note")
    note = json.loads(note)
    print(note)
    try:
        notes_collection.insert_one(note)
        return "", 200
    except Exception as e:
        print(e)
    return "", 400


@app.route("/updateNote", methods=["POST"])
def updateNote():
    note = request.form.get("note")
    note = json.loads(note)
    query_filter = {"id": note["id"]}
    update_operation = {
        "$set": {
            "title": note["title"],
            "content": note["content"],
            "category": note["category"],  # fix category bug - None str default?
        }
    }
    try:
        notes_collection.update_one(query_filter, update_operation)
        return "", 200
    except Exception as e:
        print(e)
    return "", 400


"""Fetch all notes"""


@app.route("/getNotes")
def getNotes():
    try:
        notes = notes_collection.find({})

        if notes:
            notes = list(notes)  # convert cursor to list
            for note_dict in notes:
                if "_id" in note_dict:  # remove db object ids
                    del note_dict["_id"]
            return jsonify(notes), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 502

    return jsonify({"error": "No existing notes found"}), 404


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
