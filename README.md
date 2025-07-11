### CosmicNotes
A dark-themed, nonlinear notetaking application featuring a graphical visualization of the semantic similarity between notes.

<img width="1001" height="518" alt="Screenshot 2025-07-11 at 5 27 01 PM" src="https://github.com/user-attachments/assets/b8b3fbcc-9d85-43fd-af24-45a7acf7562b" />
<img width="502" height="682" alt="Screenshot 2025-07-11 at 5 27 45 PM" src="https://github.com/user-attachments/assets/b4b729f7-8f75-463f-8ea0-2fb2d590f418" />
<img width="502" height="720" alt="Screenshot 2025-07-11 at 5 28 53 PM" src="https://github.com/user-attachments/assets/e81c6f79-c48e-45e7-baae-34c84351090f" />

## Features
- **Note Creation and Categorisation**: Notes can be created and categorised by users.
- **Note Storage**: Notes are automatically stored in a document-oriented database for use between sessions.
- **List and Graph view**: Notes can be viewed and edited from either the regular list view or the network graph visualization of notes
- **Vector comparison**: Note images (in the future) and text are embedded and compared using pretrained version of the Contrastive Learning Image Pretrained (CLIP) machine learning model.
- **Dynamic graph updates and Thresholding**: Edges of related nodes are recomputed and rerendered when notes are added, edited, or when users adjust the similarity threshold of the graph visualization.

## Technology Stack
- **Frontend**: React, JavaScript, CSS
- **Backend**: Flask, Python, `transformers`
- **Database**: MongoDB

## Project Structure
```
├── backend
│   └── app.py                                                # Main Flask application and API endpoint
├── CosmicNotes/                                              # React application
│   └── ...
└── README.md
```
