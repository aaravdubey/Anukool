# %%
import numpy as np
import pandas as pd  

# %%
import string 
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# %%
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report


# %%
nltk.download('punkt')
nltk.download('stopwords')

# %%
# Load the dataset
df1 = pd.read_csv("IMDB Dataset.csv")

# Select the first 500 rows for simplicity
df = df1.iloc[:500]
df

# %%

# Preprocessing function
def preprocess_text(text):
    # Conversion to Lower case
    text = text.lower()

    # Removal of punctuation marks from the text
    text = ''.join([char for char in text if char not in string.punctuation])

    # Removal of numeric numbers from the text
    text = ''.join([char for char in text if not char.isdigit()])

    # Conversion to Word tokenize
    tokens = word_tokenize(text)

    # Removal of stopwords from the text
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]

    # Applying stemming
    stemmer = PorterStemmer()
    stemmed_tokens = [stemmer.stem(word) for word in tokens]
    final_text = ' '.join(stemmed_tokens)
    
    return final_text

# Apply preprocessing to the 'review' column
df['review'] = df['review'].apply(lambda x: preprocess_text(x))


# %%

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(df['review'], df['sentiment'], test_size=0.2, random_state=42)

# TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer(max_features=1000)
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
X_test_tfidf = tfidf_vectorizer.transform(X_test)


# %%

# Train the SVM model
svm_model = SVC(kernel='linear')
svm_model.fit(X_train_tfidf, y_train)


# %%

# Evaluate the model
y_pred = svm_model.predict(X_test_tfidf)
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
print("Classification Report:")
print(classification_report(y_test, y_pred))


# %%

# User Input Handling and Prediction
def predict_sentiment(user_input):
    preprocessed_input = preprocess_text(user_input)
    input_vector = tfidf_vectorizer.transform([preprocessed_input])
    prediction = svm_model.predict(input_vector)
    return prediction[0]


# %%

# Ask for user input and predict sentiment
user_text = input("Enter your text: ")
sentiment = predict_sentiment(user_text)
print("Predicted sentiment:", sentiment)



