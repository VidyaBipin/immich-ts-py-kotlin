from flask import Flask
import os
from sentence_transformers import SentenceTransformer, util
from transformers import pipeline
from PIL import Image

model = SentenceTransformer('clip-ViT-B-32')
classifier = pipeline(task="image-classification",
                      model="google/mobilenet_v2_1.0_224")

server = Flask(__name__)
is_dev = os.getenv('NODE_ENV') == 'development'


@server.route("/")
def hello():
    preds = classifier(
        'upload/3e54a230-5daa-4983-b356-af4fd65292aa/thumb/WEB/bf7d976f-4cbc-4991-a006-b11c0811781c.jpeg')
    preds = [{"score": round(pred["score"], 4), "label": pred["label"]}
             for pred in preds]
    print(*preds, sep="\n", flush=True)
    return "Immich Machine Learning 12!\n"


@server.route("/test")
def test():
    img_emb = model.encode(Image.open(
        'upload/3e54a230-5daa-4983-b356-af4fd65292aa/thumb/WEB/bf7d976f-4cbc-4991-a006-b11c0811781c.jpeg'))
    print(img_emb, flush=True)
    # # Encode text descriptions
    text_emb = model.encode(['Couch', 'rug', 'car', 'living room'])

    # # Compute cosine similarities
    cos_scores = util.cos_sim(img_emb, text_emb)

    return f'Score = {cos_scores}\n'


if __name__ == "__main__":
    server.run(debug=is_dev, host='0.0.0.0', port=5000)
