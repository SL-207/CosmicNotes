from flask import Flask, request, jsonify
from flask_cors import CORS
import json

from transformers import CLIPProcessor, CLIPModel
import numpy as np

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

app = Flask(__name__)
CORS(app)


"""Identify the indices in previous notes array exceeding similarity threshold
    
    Args:
        note_content (str): text content of added note
        prev_note_texts (list[str]): text content of other notes in the network graph
        
    Return:
        match_idxs (list): matching indices"""


def calc_matches(note_content, prev_note_texts):
    match_idxs = []
    threshold = 40
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


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
