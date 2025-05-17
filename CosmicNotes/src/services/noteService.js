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

export async function computeAllEdges(noteList, thold){
  const formData = new FormData();
  noteList.forEach((noteObj, idx) =>
    formData.append(`object${idx}`, JSON.stringify(noteObj))
  );
  formData.append("thold", thold.toString());
  try {
    const response = await fetch(`${API_URL}/calcAllEdges`, {
      method: "POST",
      body: formData,
    });
    const edges = await response.json();
    return edges;
  } catch {
    return [];
  }
}

export async function saveNote(noteToSave, operation) {
  const formData = new FormData();
  formData.append("note", JSON.stringify(noteToSave));
  await fetch(`${API_URL}/${operation}Note`, {
    method: "POST",
    body: formData,
  });
}

export async function getNotes() {
  const response = await fetch(`${API_URL}/getNotes`);
  const noteList = await response.json();
  return noteList;
}
