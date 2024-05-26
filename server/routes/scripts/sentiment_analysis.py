import sys
import numpy as np
import pandas as pd
import string
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report

# Download NLTK resources
# nltk.download('punkt')
# nltk.download('stopwords')

# Load the dataset
df1 = pd.read_csv("routes/scripts/IMDB Dataset.csv")

# Select the first 500 rows for simplicity
df = df1.iloc[:500]

# Preprocessing function
def preprocess_text(text):
    text = text.lower()
    text = ''.join([char for char in text if char not in string.punctuation])
    text = ''.join([char for char in text if not char.isdigit()])
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    stemmer = PorterStemmer()
    stemmed_tokens = [stemmer.stem(word) for word in tokens]
    final_text = ' '.join(stemmed_tokens)
    return final_text

# Apply preprocessing to the 'review' column
df_copy = df.copy()
df_copy['review'] = df_copy['review'].apply(preprocess_text)

# TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer(max_features=1000)
X_train_tfidf = tfidf_vectorizer.fit_transform(df['review'])
y_train = df['sentiment']

# Train the SVM model
svm_model = SVC(kernel='linear')
svm_model.fit(X_train_tfidf, y_train)

# User Input Handling and Prediction
def predict_sentiment(user_input):
    preprocessed_input = preprocess_text(user_input)
    input_vector = tfidf_vectorizer.transform([preprocessed_input])
    prediction = svm_model.predict(input_vector)
    return prediction[0]
# Read user input from stdin and predict sentiment

if __name__ == "__main__":
    sentiment = predict_sentiment(sys.argv[1].strip())
    # sentiment = predict_sentiment("")
    print(sentiment)
    sys.stdout.flush()