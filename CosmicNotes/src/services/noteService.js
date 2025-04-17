const API_URL = "http://localhost:5000";

export async function computeNewEdges(noteToSave, noteList) {
  const formData = new FormData();
  formData.append("content", noteToSave.content);
  formData.append("id", noteToSave.id.toString());
  noteList.forEach((noteObj, idx) =>
    formData.append(`object${idx}`, JSON.stringify(noteObj))
  );
  try {
    const response = await fetch(`${API_URL}/changeNode`, {
      method: "POST",
      body: formData,
    });
    const newEdges = await response.json();
    return newEdges;
  } catch {
    return [];
  }
}
