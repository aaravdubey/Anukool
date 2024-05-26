import sys
import pickle
import pandas as pd
import os
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import tokenizer_from_json

script_dir = os.path.dirname(os.path.abspath(__file__))
tokenizer_path = os.path.join(script_dir, "tokenizer.pkl")

with open(tokenizer_path, "rb") as f:
    tokenizer = pickle.load(f)

model = load_model(os.path.join(script_dir, "model.h5"))
df = pd.read_csv(os.path.join(script_dir, "Tweets.csv"))
tweet_df = df[["text", "airline_sentiment"]]
tweet_df = tweet_df[tweet_df["airline_sentiment"] != "neutral"]
sentiment_label = tweet_df.airline_sentiment.factorize()


def predict_sentiment(text):
    tw = tokenizer.texts_to_sequences([text])
    tw = pad_sequences(tw, maxlen=200)
    prediction = int(model.predict(tw).round().item())
    sentiment = sentiment_label[1][prediction]
    return sentiment


if __name__ == "__main__":
    # sentiment = predict_sentiment(sys.argv[1].strip())
    sentiment = predict_sentiment(
        "Terribly good service, flying with them again"
    )
    print(sentiment.encode(sys.stdout.encoding, errors='replace').decode())
    sys.stdout.flush()
