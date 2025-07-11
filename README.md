### CosmicNotes
A dark-themed, nonlinear notetaking application featuring a graphical visualization of the semantic similarity between notes.


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
